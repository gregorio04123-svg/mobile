// Pilares · enviar-push
// La base de datos la llama (pg_net) cada vez que se crea un aviso para
// alguien con dispositivos activos. Envía el push a esos dispositivos.
//
// - Solo acepta llamadas con la clave compartida guardada en Vault.
// - Cada aviso se envía una sola vez (se marca push_en antes de enviar).
// - Las claves VAPID viven en Vault; aquí no hay ningún secreto escrito.
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

const SUJETO = "https://mobile-ptof.vercel.app";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

let claves: Record<string, string> | null = null;
async function leerClaves() {
  if (claves) return claves;
  const { data, error } = await sb.rpc("claves_push");
  if (error) throw error;
  claves = data as Record<string, string>;
  webpush.setVapidDetails(SUJETO, claves.pilares_vapid_publica, claves.pilares_vapid_privada);
  return claves;
}

function igual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

// A dónde lleva el aviso al tocarlo.
function destino(a: { tipo: string; ref: string | null; fecha: string | null }) {
  if (a.tipo === "actividad" || a.tipo === "recordatorio") return "./?ir=estudio" + (a.fecha ? "&fecha=" + a.fecha : "");
  if (a.tipo === "libreta" || a.tipo === "abono") return "./?ir=finanzas" + (a.ref ? "&libreta=" + a.ref : "");
  if (a.tipo === "rutina") return "./?ir=ejercicio" + (a.ref ? "&inv=" + a.ref : "");
  return "./";
}

function json(cuerpo: unknown, status = 200) {
  return new Response(JSON.stringify(cuerpo), { status, headers: { "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "metodo" }, 405);
  try {
    const k = await leerClaves();
    if (!k.pilares_push_clave || !igual(req.headers.get("x-pilares-clave") || "", k.pilares_push_clave)) {
      return json({ error: "no autorizado" }, 401);
    }
    const { id } = await req.json().catch(() => ({}));
    if (typeof id !== "string" || !UUID.test(id)) return json({ error: "id" }, 400);

    // Se toma el aviso: si ya se envió (o no existe), no se repite.
    const { data: aviso, error: e1 } = await sb.from("avisos")
      .update({ push_en: new Date().toISOString() })
      .eq("id", id).is("push_en", null)
      .select("id,user_id,tipo,titulo,cuerpo,ref,fecha")
      .maybeSingle();
    if (e1) throw e1;
    if (!aviso) return json({ ok: true, omitido: "ya enviado" });

    const { data: subs, error: e2 } = await sb.from("suscripciones_push")
      .select("id,endpoint,p256dh,auth").eq("user_id", aviso.user_id);
    if (e2) throw e2;
    if (!subs || !subs.length) return json({ ok: true, enviados: 0 });

    // Número para el globo del ícono: avisos que aún no ha visto.
    const { data: perfil } = await sb.from("perfiles").select("avisos_leidos_hasta").eq("id", aviso.user_id).maybeSingle();
    const { count } = await sb.from("avisos").select("id", { count: "exact", head: true })
      .eq("user_id", aviso.user_id).neq("tipo", "prueba")
      .gt("creado_en", perfil?.avisos_leidos_hasta || "1970-01-01");

    const carga = JSON.stringify({
      id: aviso.id, tipo: aviso.tipo, titulo: aviso.titulo, cuerpo: aviso.cuerpo,
      url: destino(aviso), pendientes: count || 0,
    });

    let enviados = 0, borrados = 0;
    const fallos: Array<{ status?: number; msg: string }> = [];
    await Promise.all(subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          carga,
          { TTL: 86400, urgency: "high" },
        );
        enviados++;
      } catch (err) {
        const status = (err as { statusCode?: number }).statusCode;
        const detalle = String((err as { body?: string }).body || (err as Error).message || err).slice(0, 200);
        // El dispositivo ya no existe, retiró el permiso o el token no vale: se olvida.
        if (status === 404 || status === 410 || (status === 400 && /Bad(Device|WebPush)Token/.test(detalle))) {
          await sb.from("suscripciones_push").delete().eq("id", s.id);
          borrados++;
        }
        fallos.push({ status, msg: detalle });
      }
    }));
    if (fallos.length) console.warn("enviar-push fallos", JSON.stringify(fallos));
    return json({ ok: true, enviados, borrados, fallos });
  } catch (err) {
    console.error("enviar-push", err);
    return json({ error: String((err as Error).message || err) }, 500);
  }
});
