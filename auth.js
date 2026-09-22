/* =====================================================================
 * Pilares · sesion
 * ---------------------------------------------------------------------
 * Puerta de entrada. Antes de montar nada comprueba si hay sesion de
 * Supabase: si la hay arranca Pilares, si no muestra el acceso por
 * enlace magico.
 *
 * Flujo implicito, no PKCE. PKCE guarda un "code_verifier" en el
 * localStorage del navegador que pide el enlace y lo exige de vuelta
 * para canjear el codigo por una sesion. En un telefono el correo casi
 * nunca se abre en ese mismo navegador -- Outlook, Gmail y compania
 * abren los enlaces en su propio navegador embebido, que es otro
 * almacenamiento -- asi que el canje fallaba, no habia sesion y la app
 * volvia a pedir el correo: un bucle. Con el flujo implicito el token
 * viaja en el fragmento de la URL y se puede canjear desde cualquier
 * navegador.
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
      flowType: 'implicit',
    },
  });

  var pantalla = document.getElementById('acceso');
  var caja     = document.getElementById('acceso-caja');
  var form     = document.getElementById('acceso-form');
  var campo    = document.getElementById('acceso-correo');
  var boton    = document.getElementById('acceso-enviar');
  var aviso    = document.getElementById('acceso-aviso');
  var estado   = document.getElementById('acceso-estado');
  var montado  = false;

  function mostrarAviso(texto, tono) {
    aviso.textContent = texto || '';
    aviso.style.color = tono === 'error' ? '#C46461'
                      : tono === 'ok'    ? '#57B9A0'
                      : '#8E9AAE';
  }

  /* Traduce los errores que vienen del servidor a algo entendible. */
  function traducir(err) {
    var m = (err && (err.message || err)) || '';
    var c = (err && err.code) || '';
    if (/rate limit/i.test(m) || c === 'over_email_send_rate_limit') {
      return 'Supabase limita cuantos correos se envian por hora y ya se alcanzo el tope. Espera un rato y vuelve a intentar.';
    }
    if (/expired/i.test(m) || c === 'otp_expired') {
      return 'Ese enlace ya se uso o vencio. Pide uno nuevo.';
    }
    if (/invalid/i.test(m)) {
      return 'El enlace no es valido. Pide uno nuevo.';
    }
    return m || 'No se pudo completar el acceso.';
  }

  function verFormulario(mensaje, tono) {
    estado.style.display = 'none';
    caja.style.display = '';
    pantalla.style.display = 'flex';
    document.getElementById('screen').style.display = 'none';
    if (mensaje) mostrarAviso(mensaje, tono || 'error');
  }

  function verVerificando() {
    caja.style.display = 'none';
    estado.style.display = '';
    pantalla.style.display = 'flex';
    document.getElementById('screen').style.display = 'none';
  }

  /* La app se monta una sola vez por carga: el runtime no sabe
     desmontarse, asi que al cerrar sesion se recarga la pagina. */
  function arrancarApp(sesion) {
    pantalla.style.display = 'none';
    document.getElementById('screen').style.display = '';
    if (montado) return;
    montado = true;
    global.PilaresBoot(sesion && sesion.user ? sesion.user.email : '');
  }

  /* Si el enlace vino con error, Supabase lo deja en el fragmento.
     Sin esto el usuario solo veria el formulario otra vez, sin pista
     de que fallo. */
  function errorEnUrl() {
    var crudo = (global.location.hash || '').replace(/^#/, '') ||
                (global.location.search || '').replace(/^\?/, '');
    if (!crudo || crudo.indexOf('error') === -1) return null;
    var p = new URLSearchParams(crudo);
    var desc = p.get('error_description') || p.get('error');
    if (!desc) return null;
    return traducir({ message: decodeURIComponent(desc.replace(/\+/g, ' ')),
                      code: p.get('error_code') || '' });
  }

  function limpiarUrl() {
    if (global.history && global.history.replaceState) {
      global.history.replaceState({}, document.title, global.location.pathname);
    }
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
      if (res.error) mostrarAviso(traducir(res.error), 'error');
      else mostrarAviso('Listo, revisa ' + correo + '. Si el enlace no te deja entrar, copialo y abrelo en Safari o Chrome.', 'ok');
    }).catch(function () {
      mostrarAviso('Sin conexion con el servidor.', 'error');
    }).then(function () {
      boton.disabled = false;
      boton.textContent = 'Enviarme el enlace';
    });
  });

  db.auth.onAuthStateChange(function (evento, sesion) {
    if (sesion) { arrancarApp(sesion); return; }
    // Solo recargar si veniamos de una sesion viva. Si nunca se monto la
    // app, un SIGNED_OUT es el estado normal de "aun no has entrado":
    // recargar ahi crearia un bucle infinito cuando la URL trae un token
    // que no sirve.
    if (evento === 'SIGNED_OUT' && montado) global.location.reload();
  });

  /* Arranque. Si la URL trae un token, supabase-js lo procesa dentro de
     getSession(), asi que mientras tanto se ve "verificando" en vez del
     formulario parpadeando. */
  var fallo = errorEnUrl();
  if (fallo) {
    limpiarUrl();
    verFormulario(fallo, 'error');
  } else {
    var traeToken = /access_token|refresh_token|[?&#]code=/.test(
      global.location.hash + global.location.search);
    if (traeToken) verVerificando();

    // La URL se limpia despues de getSession(), nunca antes: getSession
    // espera a que el cliente termine de leer el token del fragmento, y
    // borrarlo en ese intervalo dejaria fuera a un enlace valido.
    db.auth.getSession().then(function (res) {
      if (traeToken) limpiarUrl();
      if (res.data && res.data.session) {
        arrancarApp(res.data.session);
      } else {
        verFormulario(traeToken
          ? 'El enlace no pudo abrir la sesion. Pide uno nuevo y abrelo en Safari o Chrome.'
          : '', 'error');
      }
    }).catch(function () {
      verFormulario('No se pudo contactar al servidor.', 'error');
    });
  }

  global.PilaresAuth = {
    db: db,
    cerrarSesion: function () { db.auth.signOut(); },
    usuario: function () { return db.auth.getUser(); },
  };
})(window);
