/* =====================================================================
 * Pilares · alto real de la pantalla
 * ---------------------------------------------------------------------
 * El marco de la app (#screen) se dibuja con la altura que publica el
 * sistema. En una PWA instalada en iOS ese valor llega corto: el motor
 * descuenta la franja de la barra de estado del viewport de maquetacion
 * (window.innerHeight, 100dvh, position:fixed + inset:0) pero sigue
 * pintando la pagina desde el borde superior de la pantalla y sigue
 * reportando env(safe-area-inset-top) > 0.
 *
 * Resultado: el contenido empieza en el pixel 0, la cabecera se separa
 * con su propio padding y abajo queda una franja muerta del alto exacto
 * de la barra de estado, justo debajo de la barra de pestanas.
 *
 * Aqui se mide esa diferencia y, solo cuando coincide con la altura de
 * la barra de estado (la firma del fallo), se publica en --app-height el
 * alto verdadero de la pantalla. En cualquier otro caso se respeta lo
 * que diga el sistema, asi que nunca se estira de mas ni se recorta la
 * barra de pestanas en navegadores sanos.
 * ================================================================== */
(function (global) {
  'use strict';

  var root = document.documentElement;
  var TOLERANCIA = 4;        // px de margen al comparar la diferencia
  var pendiente = null;

  /* La app esta instalada (sin barras del navegador dentro del viewport). */
  function esInstalada() {
    var mm = global.matchMedia;
    if (mm && (mm('(display-mode: standalone)').matches ||
               mm('(display-mode: fullscreen)').matches ||
               mm('(display-mode: minimal-ui)').matches)) return true;
    return global.navigator.standalone === true;
  }

  /* Alto que reserva el sistema arriba, leido del propio env(). */
  function franjaSuperior() {
    var sonda = document.createElement('div');
    sonda.style.cssText = 'position:absolute;top:0;left:0;width:0;visibility:hidden;' +
                          'pointer-events:none;height:env(safe-area-inset-top,0px)';
    document.body.appendChild(sonda);
    var alto = sonda.getBoundingClientRect().height;
    sonda.parentNode.removeChild(sonda);
    return alto;
  }

  /* Alto fisico de la pantalla en la orientacion actual. */
  function altoPantalla() {
    var s = global.screen || {};
    if (!s.width || !s.height) return 0;
    var largo = Math.max(s.width, s.height);
    var corto = Math.min(s.width, s.height);
    return (global.innerWidth <= global.innerHeight) ? largo : corto;
  }

  /* Alto que publica el sistema, tomando el mayor de las tres fuentes. */
  function altoViewport() {
    var vv = global.visualViewport;
    return Math.max(
      global.innerHeight || 0,
      root.clientHeight || 0,
      vv ? Math.round(vv.height) : 0
    );
  }

  function aplicar() {
    pendiente = null;

    var viewport = altoViewport();
    if (!viewport) return;

    var alto = viewport;

    if (esInstalada()) {
      var pantalla = altoPantalla();
      var franja = franjaSuperior();
      var faltante = pantalla - viewport;
      // Solo se corrige cuando lo que falta es exactamente la barra de
      // estado: esa es la firma del fallo y nada mas.
      if (faltante > 0 && franja > 0 && Math.abs(faltante - franja) <= TOLERANCIA) {
        alto = pantalla;
      }
    }

    root.style.setProperty('--app-height', alto + 'px');
  }

  function programar() {
    if (pendiente !== null) return;
    pendiente = global.requestAnimationFrame(aplicar);
  }

  aplicar();

  global.addEventListener('resize', programar);
  global.addEventListener('orientationchange', programar);
  global.addEventListener('pageshow', programar);
  if (global.visualViewport) global.visualViewport.addEventListener('resize', programar);
})(window);
