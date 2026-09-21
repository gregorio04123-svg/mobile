-- =====================================================================
-- Endurece permisos de las funciones agregadas en las migraciones
-- 000100/000200/000300. CREATE FUNCTION otorga EXECUTE a PUBLIC por
-- defecto en Postgres; ninguna de estas 6 estaba pensada para llamarse
-- directo via /rest/v1/rpc/... y el advisor de seguridad de Supabase
-- las marco como expuestas de mas.
-- =====================================================================

-- Funciones de trigger: Postgres las dispara sin exigirle al usuario
-- que dispara el trigger permiso de EXECUTE sobre la funcion, asi que
-- revocar del todo no rompe nada.
revoke execute on function public.proteger_codigo()              from public, anon, authenticated;
revoke execute on function public.validar_cuaderno_actividad()   from public, anon, authenticated;
revoke execute on function public.proteger_libreta()             from public, anon, authenticated;
revoke execute on function public.recalcular_libreta()           from public, anon, authenticated;

-- Helpers usados dentro de politicas RLS: solo necesitan ser
-- ejecutables por usuarios con sesion, nunca por anonimos.
revoke execute on function public.son_amigos(uuid, uuid)   from public, anon;
grant  execute on function public.son_amigos(uuid, uuid)   to authenticated;

revoke execute on function public.es_parte_libreta(uuid)   from public, anon;
grant  execute on function public.es_parte_libreta(uuid)   to authenticated;
