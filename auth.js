/* =====================================================================
 * Pilares · sesion
 * ---------------------------------------------------------------------
 * Puerta de entrada de la app. Antes de montar nada comprueba si hay
 * sesion de Supabase: si la hay arranca Pilares, si no muestra la
 * pantalla de acceso por enlace magico.
 *
 * El enlace del correo devuelve al usuario a esta misma pagina con el
 * token en el fragmento de la URL; supabase-js lo detecta solo
 * (detectSessionInUrl) y dispara onAuthStateChange, asi que aqui no hay
 * que leer la URL a mano.
 * ================================================================== */
(function (global) {
  'use strict';

  var SUPABASE_URL = 'https://muawlxszfibohwhwnsng.supabase.co';
  // Clave publicable: esta pensada para viajar en el navegador. Lo que
  // protege los datos son las politicas RLS, no esconder esta cadena.
  var SUPABASE_KEY = 'sb_publishable_2KSrLx1N8Wt9wZp_FOOOaQ_2qVG6fAA';

  var db = global.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  });

  var pantalla = document.getElementById('acceso');
  var form     = document.getElementById('acceso-form');
  var campo    = document.getElementById('acceso-correo');
  var boton    = document.getElementById('acceso-enviar');
  var aviso    = document.getElementById('acceso-aviso');
  var montado  = false;

  function mostrarAviso(texto, tono) {
    aviso.textContent = texto;
    aviso.style.color = tono === 'error' ? '#C46461'
                      : tono === 'ok'    ? '#57B9A0'
                      : '#8E9AAE';
  }

  function mostrarAcceso() {
    pantalla.style.display = 'flex';
    document.getElementById('screen').style.display = 'none';
  }

  function ocultarAcceso() {
    pantalla.style.display = 'none';
    document.getElementById('screen').style.display = '';
  }

  /* La app se monta una sola vez por carga: el runtime no sabe
     desmontarse, asi que al cerrar sesion se recarga la pagina. */
  function arrancarApp(sesion) {
    ocultarAcceso();
    if (montado) return;
    montado = true;
    global.PilaresBoot(sesion && sesion.user ? sesion.user.email : '');
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var correo = (campo.value || '').trim();
    if (!correo) { mostrarAviso('Escribe tu correo.', 'error'); return; }

    boton.disabled = true;
    boton.textContent = 'Enviando...';
    mostrarAviso('');

    db.auth.signInWithOtp({
      email: correo,
      options: { emailRedirectTo: global.location.origin },
    }).then(function (res) {
      if (res.error) {
        mostrarAviso(res.error.message || 'No se pudo enviar el enlace.', 'error');
      } else {
        mostrarAviso('Listo. Te llego un enlace a ' + correo + '. Abrelo desde este mismo telefono.', 'ok');
      }
    }).catch(function () {
      mostrarAviso('Sin conexion con el servidor.', 'error');
    }).then(function () {
      boton.disabled = false;
      boton.textContent = 'Enviarme el enlace';
    });
  });

  db.auth.onAuthStateChange(function (evento, sesion) {
    if (sesion) arrancarApp(sesion);
    else if (evento === 'SIGNED_OUT') global.location.reload();
  });

  db.auth.getSession().then(function (res) {
    if (res.data && res.data.session) arrancarApp(res.data.session);
    else mostrarAcceso();
  }).catch(function () {
    mostrarAcceso();
    mostrarAviso('No se pudo contactar al servidor.', 'error');
  });

  global.PilaresAuth = {
    db: db,
    cerrarSesion: function () { db.auth.signOut(); },
    usuario: function () { return db.auth.getUser(); },
  };
})(window);
