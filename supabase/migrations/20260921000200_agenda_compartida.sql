-- =====================================================================
-- Fase 3 · Agenda compartida
-- Un amigo puede crear una actividad directamente en tu agenda; queda
-- marcada con quien te la asigno.
-- =====================================================================

alter table public.actividades
  add column if not exists asignado_por uuid references auth.users(id) on delete set null,
  add column if not exists nota text not null default '';

create index if not exists actividades_user_fecha_idx   on public.actividades (user_id, fecha);
create index if not exists actividades_asignado_por_idx on public.actividades (asignado_por);

-- Para poder asignar hay que poder ver los cuadernos del amigo.
drop policy if exists "cuadernos de amigos (lectura)" on public.cuadernos;
create policy "cuadernos de amigos (lectura)" on public.cuadernos
  for select using (public.son_amigos((select auth.uid()), user_id));

-- El cuaderno de una actividad debe pertenecer a su dueno, nunca a quien
-- la asigna: si no, el amigo veria una fila que su RLS no le deja leer.
create or replace function public.validar_cuaderno_actividad()
returns trigger language plpgsql security definer set search_path = ''
as $fn$
begin
  if new.cuaderno_id is not null
     and not exists (select 1 from public.cuadernos c
                     where c.id = new.cuaderno_id and c.user_id = new.user_id) then
    raise exception 'el cuaderno % no pertenece al dueno de la actividad', new.cuaderno_id;
  end if;
  return new;
end;
$fn$;

drop trigger if exists tr_validar_cuaderno_actividad on public.actividades;
create trigger tr_validar_cuaderno_actividad
  before insert or update on public.actividades
  for each row execute function public.validar_cuaderno_actividad();

-- Politicas granulares (reemplazan la unica politica FOR ALL previa).
drop policy if exists "actividades propias" on public.actividades;

create policy "actividades: ver las mias y las que asigne" on public.actividades
  for select using (
    (select auth.uid()) = user_id or (select auth.uid()) = asignado_por
  );

create policy "actividades: crear para mi o para un amigo" on public.actividades
  for insert with check (
    ((select auth.uid()) = user_id and asignado_por is null)
    or ((select auth.uid()) = asignado_por
        and public.son_amigos((select auth.uid()), user_id))
  );

create policy "actividades: editar" on public.actividades
  for update using (
    (select auth.uid()) = user_id or (select auth.uid()) = asignado_por
  ) with check (
    (select auth.uid()) = user_id or (select auth.uid()) = asignado_por
  );

create policy "actividades: borrar" on public.actividades
  for delete using (
    (select auth.uid()) = user_id or (select auth.uid()) = asignado_por
  );
