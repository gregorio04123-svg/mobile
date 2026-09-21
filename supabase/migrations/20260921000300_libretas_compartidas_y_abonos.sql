-- =====================================================================
-- Fase 4 · Libretas compartidas + abonos parciales
-- Una libreta puede apuntar a otro usuario (contraparte_id). Las dos
-- partes la ven, las dos registran abonos y pueden marcarla pagada,
-- pero solo quien la creo cambia el monto o la borra.
-- =====================================================================

alter table public.libretas
  add column if not exists nota           text not null default '',
  add column if not exists vence_el       date,
  add column if not exists actualizado_en timestamptz not null default now();

create index if not exists libretas_user_idx        on public.libretas (user_id);
create index if not exists libretas_contraparte_idx on public.libretas (contraparte_id);

-- 1. Abonos parciales -------------------------------------------------
create table if not exists public.abonos (
  id             uuid primary key default gen_random_uuid(),
  libreta_id     uuid not null references public.libretas(id) on delete cascade,
  monto          numeric not null check (monto > 0),
  nota           text not null default '',
  registrado_por uuid references auth.users(id) on delete set null,
  creado_en      timestamptz not null default now()
);
create index if not exists abonos_libreta_idx on public.abonos (libreta_id);

alter table public.abonos enable row level security;

create or replace function public.es_parte_libreta(p_libreta uuid)
returns boolean language sql stable security definer set search_path = ''
as $fn$
  select exists (
    select 1 from public.libretas l
    where l.id = p_libreta
      and (select auth.uid()) in (l.user_id, l.contraparte_id)
  );
$fn$;
grant execute on function public.es_parte_libreta(uuid) to authenticated;

create policy "abonos: ver los de mis libretas" on public.abonos
  for select using (public.es_parte_libreta(libreta_id));

create policy "abonos: registrar" on public.abonos
  for insert with check (
    public.es_parte_libreta(libreta_id) and (select auth.uid()) = registrado_por
  );

create policy "abonos: corregir el propio" on public.abonos
  for update using ((select auth.uid()) = registrado_por)
  with check ((select auth.uid()) = registrado_por);

create policy "abonos: borrar el propio" on public.abonos
  for delete using ((select auth.uid()) = registrado_por);

-- 2. Politicas de libretas -------------------------------------------
drop policy if exists "libretas propias" on public.libretas;
drop policy if exists "libretas de la contraparte (solo lectura)" on public.libretas;

create policy "libretas: ver las que me involucran" on public.libretas
  for select using ((select auth.uid()) in (user_id, contraparte_id));

create policy "libretas: crear" on public.libretas
  for insert with check (
    (select auth.uid()) = user_id
    and (contraparte_id is null or public.son_amigos((select auth.uid()), contraparte_id))
  );

create policy "libretas: actualizar (ambas partes)" on public.libretas
  for update using ((select auth.uid()) in (user_id, contraparte_id))
  with check ((select auth.uid()) in (user_id, contraparte_id));

create policy "libretas: borrar (solo quien la creo)" on public.libretas
  for delete using ((select auth.uid()) = user_id);

-- 3. La contraparte no puede reescribir el trato ----------------------
create or replace function public.proteger_libreta()
returns trigger language plpgsql security definer set search_path = ''
as $fn$
begin
  if (select auth.uid()) is distinct from old.user_id then
    new.user_id        := old.user_id;
    new.contraparte_id := old.contraparte_id;
    new.monto          := old.monto;
    new.deudor         := old.deudor;
    new.prestamista    := old.prestamista;
    new.mine           := old.mine;
    new.creado_en      := old.creado_en;
  end if;
  new.actualizado_en := now();
  new.pagado_en := case when new.paid and not old.paid then now()
                        when not new.paid then null
                        else old.pagado_en end;
  return new;
end;
$fn$;

drop trigger if exists tr_proteger_libreta on public.libretas;
create trigger tr_proteger_libreta
  before update on public.libretas
  for each row execute function public.proteger_libreta();

-- 4. Saldo y cierre automatico ---------------------------------------
create or replace view public.v_libretas
with (security_invoker = true) as
  select l.*,
         coalesce(a.abonado, 0)           as abonado,
         l.monto - coalesce(a.abonado, 0) as saldo
  from public.libretas l
  left join (
    select libreta_id, sum(monto) as abonado
    from public.abonos group by libreta_id
  ) a on a.libreta_id = l.id;

grant select on public.v_libretas to authenticated;

-- Cuando los abonos cubren el monto, la libreta se marca pagada sola.
create or replace function public.recalcular_libreta()
returns trigger language plpgsql security definer set search_path = ''
as $fn$
declare v_libreta uuid; v_monto numeric; v_abonado numeric;
begin
  v_libreta := coalesce(new.libreta_id, old.libreta_id);

  select l.monto into v_monto from public.libretas l where l.id = v_libreta;
  select coalesce(sum(a.monto), 0) into v_abonado
    from public.abonos a where a.libreta_id = v_libreta;

  update public.libretas
     set paid      = (v_abonado >= v_monto),
         pagado_en = case when v_abonado >= v_monto then now() else null end
   where id = v_libreta
     and paid is distinct from (v_abonado >= v_monto);

  return null;
end;
$fn$;

drop trigger if exists tr_recalcular_libreta on public.abonos;
create trigger tr_recalcular_libreta
  after insert or update or delete on public.abonos
  for each row execute function public.recalcular_libreta();
