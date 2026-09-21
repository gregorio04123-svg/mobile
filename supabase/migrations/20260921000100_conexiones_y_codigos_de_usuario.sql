-- =====================================================================
-- Fase 2 · Amigos
-- Codigo corto por usuario (SANTI-4F2A) + tabla de conexiones.
-- =====================================================================

-- 1. Codigo corto -----------------------------------------------------
alter table public.perfiles add column if not exists codigo text;

create or replace function public.generar_codigo(p_nombre text)
returns text
language plpgsql volatile security definer set search_path = ''
as $$
declare
  base text; intento text; i int := 0;
begin
  -- Quita tildes, deja solo letras, toma las primeras 5 en mayuscula.
  base := upper(regexp_replace(
            translate(coalesce(nullif(trim(p_nombre), ''), 'USUARIO'),
                      'áéíóúàèìòùÁÉÍÓÚñÑüÜçÇ', 'aeiouaeiouAEIOUnNuUcC'),
            '[^A-Za-z]', '', 'g'));
  base := left(nullif(base, ''), 5);
  if base is null or base = '' then base := 'USER'; end if;

  loop
    intento := base || '-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 4));
    exit when not exists (select 1 from public.perfiles where codigo = intento);
    i := i + 1;
    if i > 50 then raise exception 'no se pudo generar un codigo unico'; end if;
  end loop;

  return intento;
end;
$$;

revoke execute on function public.generar_codigo(text) from public, anon, authenticated;

update public.perfiles set codigo = public.generar_codigo(nombre) where codigo is null;

create unique index if not exists perfiles_codigo_unico on public.perfiles (codigo);
alter table public.perfiles alter column codigo set not null;

-- El codigo lo asigna el servidor: nadie se lo elige ni lo cambia.
create or replace function public.proteger_codigo()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.codigo := coalesce(new.codigo, public.generar_codigo(new.nombre));
  else
    new.codigo := old.codigo;
  end if;
  new.actualizado_en := now();
  return new;
end;
$$;

drop trigger if exists tr_proteger_codigo on public.perfiles;
create trigger tr_proteger_codigo
  before insert or update on public.perfiles
  for each row execute function public.proteger_codigo();

-- 2. Conexiones entre usuarios ---------------------------------------
create table if not exists public.conexiones (
  id              uuid primary key default gen_random_uuid(),
  solicitante_id  uuid not null references auth.users(id) on delete cascade,
  destinatario_id uuid not null references auth.users(id) on delete cascade,
  estado          text not null default 'pendiente'
                    check (estado in ('pendiente', 'aceptada', 'rechazada')),
  creado_en       timestamptz not null default now(),
  respondido_en   timestamptz,
  constraint conexiones_no_uno_mismo check (solicitante_id <> destinatario_id)
);

-- Un solo vinculo por pareja, sin importar quien invito a quien.
create unique index if not exists conexiones_par_unico
  on public.conexiones (least(solicitante_id, destinatario_id),
                        greatest(solicitante_id, destinatario_id));
create index if not exists conexiones_solicitante_idx  on public.conexiones (solicitante_id);
create index if not exists conexiones_destinatario_idx on public.conexiones (destinatario_id);

alter table public.conexiones enable row level security;

create policy "conexiones propias (lectura)" on public.conexiones
  for select using ((select auth.uid()) in (solicitante_id, destinatario_id));

create policy "invitar" on public.conexiones
  for insert with check ((select auth.uid()) = solicitante_id);

-- Solo el invitado responde la solicitud.
create policy "responder invitacion" on public.conexiones
  for update using ((select auth.uid()) = destinatario_id)
  with check ((select auth.uid()) = destinatario_id);

create policy "deshacer conexion" on public.conexiones
  for delete using ((select auth.uid()) in (solicitante_id, destinatario_id));

-- 3. Helpers usados por las politicas de agenda y finanzas ------------
-- SECURITY DEFINER: consultar conexiones desde otra politica no debe
-- volver a disparar RLS (seria recursion infinita).
create or replace function public.son_amigos(a uuid, b uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.conexiones c
    where c.estado = 'aceptada'
      and ((c.solicitante_id = a and c.destinatario_id = b)
        or (c.solicitante_id = b and c.destinatario_id = a))
  );
$$;
grant execute on function public.son_amigos(uuid, uuid) to authenticated;

-- Busqueda puntual: solo coincidencia exacta de codigo, para no
-- exponer la tabla de perfiles completa a nadie.
create or replace function public.buscar_por_codigo(p_codigo text)
returns table (id uuid, nombre text, codigo text)
language sql stable security definer set search_path = ''
as $$
  select p.id, p.nombre, p.codigo
  from public.perfiles p
  where p.codigo = upper(trim(p_codigo))
    and p.id <> (select auth.uid())
  limit 1;
$$;
revoke execute on function public.buscar_por_codigo(text) from public, anon;
grant execute on function public.buscar_por_codigo(text) to authenticated;

-- 4. Los amigos ven el nombre del otro --------------------------------
drop policy if exists "perfiles de amigos (lectura)" on public.perfiles;
create policy "perfiles de amigos (lectura)" on public.perfiles
  for select using (public.son_amigos((select auth.uid()), id));

-- 5. El alta de usuario tambien genera el codigo ----------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare v_nombre text;
begin
  v_nombre := coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1));

  insert into public.perfiles (id, nombre, codigo)
  values (new.id, v_nombre, public.generar_codigo(v_nombre));

  insert into public.cuadernos (user_id, nombre, orden)
  select new.id, nombre, orden
  from (values
    ('Probabilidad', 1), ('Negocios y ventas', 2), ('Gerencia de proyectos', 3),
    ('Analisis numerico', 4), ('Gestion humana', 5), ('Administracion financiera', 6)
  ) as base(nombre, orden);

  return new;
end;
$$;
