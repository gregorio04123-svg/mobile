// Pilares · enviar-push
// La base de datos la llama (pg_net) cada vez que se crea un aviso o llega
// un mensaje de chat (de un amigo o de un grupo) para alguien con
// dispositivos activos, y envía el push.
//
// - Solo acepta llamadas con la clave compartida guardada en Vault.
// - Cada aviso o mensaje se envía una sola vez (se marca push_en antes de enviar).
// - Las claves VAPID viven en Vault; aquí no hay ningún secreto escrito.
// - Quien escribe sale con el apodo que le puso quien recibe (tabla apodos);
//   los avisos ya llegan con ese nombre desde la base (nombre_para).
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

const SUJETO = "https://mobile-ptof.vercel.app";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Contenido = { id: string; tipo: string; titulo: string; cuerpo: string; url: string };
type Fallo = { status?: number; msg: string };

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
  if (a.tipo === "libreta_grupo" || a.tipo === "abono_grupo") return "./?ir=finanzas" + (a.ref ? "&lg=" + a.ref : "");
  if (a.tipo === "rutina") return "./?ir=ejercicio" + (a.ref ? "&inv=" + a.ref : "");
  if (a.tipo === "grupo") return "./?ir=grupo" + (a.ref ? "&g=" + a.ref : "");
  return "./";
}

function recorte(t: string) { return t.length > 180 ? t.slice(0, 179) + "…" : t; }

function json(cuerpo: unknown, status = 200) {
  return new Response(JSON.stringify(cuerpo), { status, headers: { "Content-Type": "application/json" } });
}

/** Envía el contenido a todos los dispositivos de una persona. */
async function enviarA(para: string, contenido: Contenido) {
  const fallos: Fallo[] = [];
  const { data: subs, error } = await sb.from("suscripciones_push")
    .select("id,endpoint,p256dh,auth").eq("user_id", para);
  if (error) throw error;
  if (!subs || !subs.length) return { enviados: 0, borrados: 0, fallos };

  // Número para el globo del ícono: avisos sin ver + mensajes sin leer.
  const { data: pendientes } = await sb.rpc("pendientes_de", { p_user: para });
  const carga = JSON.stringify({ ...contenido, pendientes: typeof pendientes === "number" ? pendientes : 0 });

  let enviados = 0, borrados = 0;
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
  return { enviados, borrados, fallos };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "metodo" }, 405);
  try {
    const k = await leerClaves();
    if (!k.pilares_push_clave || !igual(req.headers.get("x-pilares-clave") || "", k.pilares_push_clave)) {
      return json({ error: "no autorizado" }, 401);
    }
    const cuerpoPeticion = await req.json().catch(() => ({}));
    const { id, mensaje, mensaje_grupo } = cuerpoPeticion as { id?: string; mensaje?: string; mensaje_grupo?: string };
    const envios: Array<{ para: string; contenido: Contenido }> = [];

    if (typeof mensaje_grupo === "string") {
      if (!UUID.test(mensaje_grupo)) return json({ error: "mensaje_grupo" }, 400);
      // Mensaje de un grupo: título = quien escribe · grupo, cuerpo = el mensaje.
      const { data: m, error: e1 } = await sb.from("mensajes_grupo")
        .update({ push_en: new Date().toISOString() })
        .eq("id", mensaje_grupo).is("push_en", null).eq("tipo", "texto")
        .select("id,grupo_id,de_id,de_nombre,texto,creado_en")
        .maybeSingle();
      if (e1) throw e1;
      if (!m) return json({ ok: true, omitido: "ya enviado" });
      const { data: g } = await sb.from("grupos_amigos").select("nombre").eq("id", m.grupo_id).maybeSingle();
      // Solo a quienes ya estaban en el grupo cuando se escribió (y no a quien lo escribió).
      const { data: miembros, error: e2 } = await sb.from("grupo_miembros")
        .select("user_id").eq("grupo_id", m.grupo_id).neq("user_id", m.de_id).lte("unido_en", m.creado_en);
      if (e2) throw e2;
      const autor = (m.de_nombre || "").trim() || "Alguien", grupo = (g?.nombre || "").trim() || "el grupo";
      // Cada quien ve a quien escribe con el apodo que le puso, si le puso uno.
      const apodos = new Map<string, string>();
      if (miembros && miembros.length) {
        const { data: ap } = await sb.from("apodos").select("dueno_id,apodo")
          .eq("amigo_id", m.de_id).in("dueno_id", miembros.map((x) => x.user_id));
        for (const a of ap || []) apodos.set(a.dueno_id, a.apodo);
      }
      for (const x of miembros || []) {
        envios.push({ para: x.user_id, contenido: {
          id: m.id, tipo: "mensaje", titulo: (apodos.get(x.user_id) || autor) + " · " + grupo,
          cuerpo: recorte(String(m.texto || "")), url: "./?ir=grupo&g=" + m.grupo_id,
        } });
      }
    } else if (typeof mensaje === "string") {
      if (!UUID.test(mensaje)) return json({ error: "mensaje" }, 400);
      // Mensaje de chat: título = quien escribe, cuerpo = el mensaje.
      const { data: m, error: e1 } = await sb.from("mensajes")
        .update({ push_en: new Date().toISOString() })
        .eq("id", mensaje).is("push_en", null).eq("tipo", "texto")
        .select("id,de_id,para_id,texto")
        .maybeSingle();
      if (e1) throw e1;
      if (!m) return json({ ok: true, omitido: "ya enviado" });
      const [{ data: autor }, { data: apodo }] = await Promise.all([
        sb.from("perfiles").select("nombre").eq("id", m.de_id).maybeSingle(),
        // Con el apodo que quien recibe le puso a quien escribe, si le puso uno.
        sb.from("apodos").select("apodo").eq("dueno_id", m.para_id).eq("amigo_id", m.de_id).maybeSingle(),
      ]);
      envios.push({ para: m.para_id, contenido: {
        id: m.id, tipo: "mensaje", titulo: apodo?.apodo || (autor?.nombre || "").trim() || "Un amigo",
        cuerpo: recorte(String(m.texto || "")), url: "./?ir=chat&con=" + m.de_id,
      } });
    } else {
      if (typeof id !== "string" || !UUID.test(id)) return json({ error: "id" }, 400);
      // Aviso: si ya se envió (o no existe), no se repite.
      const { data: aviso, error: e1 } = await sb.from("avisos")
        .update({ push_en: new Date().toISOString() })
        .eq("id", id).is("push_en", null)
        .select("id,user_id,tipo,titulo,cuerpo,ref,fecha")
        .maybeSingle();
      if (e1) throw e1;
      if (!aviso) return json({ ok: true, omitido: "ya enviado" });
      envios.push({ para: aviso.user_id, contenido: {
        id: aviso.id, tipo: aviso.tipo, titulo: aviso.titulo, cuerpo: aviso.cuerpo, url: destino(aviso),
      } });
    }

    let enviados = 0, borrados = 0;
    const fallos: Fallo[] = [];
    for (const e of envios) {
      const r = await enviarA(e.para, e.contenido);
      enviados += r.enviados; borrados += r.borrados; fallos.push(...r.fallos);
    }
    if (fallos.length) console.warn("enviar-push fallos", JSON.stringify(fallos));
    return json({ ok: true, enviados, borrados, fallos });
  } catch (err) {
    console.error("enviar-push", err);
    return json({ error: String((err as Error).message || err) }, 500);
  }
});
