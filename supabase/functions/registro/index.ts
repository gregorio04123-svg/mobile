// Registro por usuario + contrasena, sin correo.
// La cuenta se crea ya confirmada desde el servidor, asi Supabase nunca
// intenta enviar un correo de verificacion (no hay correo real).
// Endpoint publico a proposito: el registro es abierto.
// Desplegada en Supabase con verify_jwt = false.
import { createClient } from "npm:@supabase/supabase-js@2";

const DOMINIO = "usuarios.pilares.invalid";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Metodo no permitido." }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Solicitud invalida." }, 400);
  }

  const usuario = String(body.usuario ?? "").trim().toLowerCase();
  const nombre = String(body.nombre ?? "").trim().slice(0, 60);
  const clave = String(body.clave ?? "");

  if (!/^[a-z0-9._-]{3,24}$/.test(usuario)) {
    return json({ error: "El usuario debe tener de 3 a 24 caracteres: letras sin tilde, numeros, punto, guion o guion bajo." }, 400);
  }
  if (!nombre) return json({ error: "Escribe tu nombre." }, 400);
  if (clave.length < 6) return json({ error: "La contrasena debe tener al menos 6 caracteres." }, 400);
  if (clave.length > 72) return json({ error: "La contrasena puede tener maximo 72 caracteres." }, 400);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { error } = await admin.auth.admin.createUser({
    email: `${usuario}@${DOMINIO}`,
    password: clave,
    email_confirm: true,
    user_metadata: { full_name: nombre, usuario },
  });

  if (error) {
    const repetido = /already|registered|exists/i.test(error.message);
    if (repetido) return json({ error: "Ese usuario ya existe. Elige otro." }, 409);
    if (/password/i.test(error.message)) return json({ error: "Contrasena no valida: " + error.message }, 400);
    console.error("registro:", error.message);
    return json({ error: "No se pudo crear la cuenta. Intenta de nuevo." }, 500);
  }

  return json({ ok: true });
});
