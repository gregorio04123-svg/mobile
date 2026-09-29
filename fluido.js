/* =====================================================================
 * Pilares · fluido
 * ---------------------------------------------------------------------
 * Movimiento y gestos con los criterios de Apple (Designing Fluid
 * Interfaces): todo arranca desde donde está en pantalla, hereda la
 * velocidad del dedo y se puede agarrar a mitad de camino.
 *
 *  - Resortes con los dos parámetros de Apple: amortiguamiento
 *    (1 = sin rebote) y respuesta (qué tan rápido llega, en segundos).
 *  - Hojas que suben desde abajo y se cierran arrastrando.
 *  - Deslizar entre días, deslizar libreticas, jalar para actualizar.
 *  - Encabezados de vidrio con el contenido pasando por debajo.
 *
 * Aquí solo hay presentación. Las decisiones (cerrar, saldar, cambiar
 * de día…) las toma la app a través de window.PilaresApp.
 * ================================================================== */
(function (global) {
  'use strict';

  var doc = global.document;
  var reducido = false;
  var mqMovimiento = global.matchMedia ? global.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function leerReducido() { reducido = !!(mqMovimiento && mqMovimiento.matches); }
  leerReducido();
  if (mqMovimiento) {
    if (mqMovimiento.addEventListener) mqMovimiento.addEventListener('change', leerReducido);
    else if (mqMovimiento.addListener) mqMovimiento.addListener(leerReducido);
  }

  function app() { return global.PilaresApp; }
  function ahora() { return global.performance ? global.performance.now() : Date.now(); }

  /* ------------------------------------------------------------------
   * 1. Física
   * ---------------------------------------------------------------- */
  // Sin rebote: lo que la app mueve sola.
  var SUAVE = { amortiguamiento: 1, respuesta: 0.35 };
  // Un poco de rebote: solo cuando el dedo lanzó algo con impulso.
  var LANZADO = { amortiguamiento: 0.85, respuesta: 0.35 };
  var SALIDA = { amortiguamiento: 1, respuesta: 0.3 };

  /** Resorte que parte de `desde` con `velocidad` (unidades/s). Devuelve un
   *  control para interrumpirlo y leer su valor y velocidad actuales. */
  function resorte(o) {
    var w0 = 2 * Math.PI / o.respuesta;
    var k = w0 * w0, c = 2 * o.amortiguamiento * w0;
    var x = o.desde, v = o.velocidad || 0, t0 = null, vivo = true;
    // Tolerancia en las unidades animadas: píxeles por defecto; 0..1 pide menos.
    var tolX = o.tolerancia || 0.4, tolV = tolX * 30;
    var control = {
      valor: function () { return x; },
      velocidad: function () { return v; },
      parar: function () { vivo = false; },
    };
    function terminar() { vivo = false; x = o.hasta; v = 0; o.paso(x); if (o.fin) o.fin(); }
    if (reducido) { terminar(); return control; }

    function cuadro(t) {
      if (!vivo) return;
      if (t0 === null) t0 = t;
      var dt = Math.min(0.064, (t - t0) / 1000);
      t0 = t;
      var pasos = Math.max(1, Math.ceil(dt * 240)), h = dt / pasos;
      for (var i = 0; i < pasos; i++) {
        v += (-k * (x - o.hasta) - c * v) * h;
        x += v * h;
      }
      if (Math.abs(x - o.hasta) < tolX && Math.abs(v) < tolV) { terminar(); return; }
      o.paso(x);
      global.requestAnimationFrame(cuadro);
    }
    global.requestAnimationFrame(cuadro);
    return control;
  }

  /** Dónde terminaría algo lanzado a `v` px/s (la curva de iOS). */
  function proyectar(v) { var d = 0.998; return (v / 1000) * d / (1 - d); }

  /** Resistencia progresiva al pasarse de un borde. */
  function goma(exceso, dimension) {
    var c = 0.55, s = exceso < 0 ? -1 : 1, e = Math.abs(exceso);
    return s * (e * dimension * c) / (dimension + c * e);
  }

  function rastreador() {
    var m = [];
    return {
      agregar: function (x, y, t) {
        m.push({ x: x, y: y, t: t });
        while (m.length > 2 && t - m[0].t > 100) m.shift();
      },
      velocidad: function () {
        if (m.length < 2) return { x: 0, y: 0 };
        var a = m[0], b = m[m.length - 1], dt = (b.t - a.t) / 1000;
        if (dt <= 0) return { x: 0, y: 0 };
        return { x: (b.x - a.x) / dt, y: (b.y - a.y) / dt };
      },
    };
  }

  /** Estilo que sobrevive a los redibujos de la app (ver runtime.js). */
  function fijar(el, props) {
    el.__fijo = el.__fijo || {};
    for (var k in props) {
      if (props[k] === null) { delete el.__fijo[k]; el.style.removeProperty(k); }
      else { el.__fijo[k] = props[k]; el.style.setProperty(k, props[k]); }
    }
  }

  function animar(el, o) {
    if (el.__anim) el.__anim.parar();
    el.__anim = resorte(o);
    return el.__anim;
  }

  /** Espera a que la app redibuje (su redibujo va en el siguiente cuadro). */
  function trasRedibujo(fn) { global.requestAnimationFrame(fn); }

  /* ------------------------------------------------------------------
   * 2. Hojas (ventana de actividad y panel ⚙)
   * ---------------------------------------------------------------- */
  function hojaDe(tipo) { return doc.querySelector('[data-hoja="' + tipo + '"]'); }

  function ponerHoja(hoja, y) {
    hoja.__y = y;
    fijar(hoja, { transform: 'translate3d(0,' + y.toFixed(2) + 'px,0)' });
    var fondo = hoja.closest('[data-hoja-fondo]');
    var velo = fondo && fondo.querySelector('[data-hoja-velo]');
    if (velo) {
      var alto = hoja.offsetHeight || 1;
      fijar(velo, { opacity: String(Math.max(0, Math.min(1, 1 - y / alto))) });
    }
  }

  function moverHoja(hoja, hasta, velocidad, params, fin) {
    return animar(hoja, {
      desde: hoja.__y || 0, hasta: hasta, velocidad: velocidad || 0,
      amortiguamiento: params.amortiguamiento, respuesta: params.respuesta,
      paso: function (v) { ponerHoja(hoja, v); }, fin: fin,
    });
  }

  function abrirHojasNuevas() {
    var hojas = doc.querySelectorAll('[data-hoja]');
    for (var i = 0; i < hojas.length; i++) {
      var h = hojas[i];
      if (h.__viva) continue;
      h.__viva = true;
      ponerHoja(h, h.offsetHeight || 700);
      moverHoja(h, 0, 0, SUAVE);
    }
  }

  function animarSalida(tipo) {
    return new Promise(function (listo) {
      var h = hojaDe(tipo);
      if (!h) { listo(); return; }
      moverHoja(h, h.offsetHeight || 700, 0, SALIDA, listo);
    });
  }

  /* ── Menú contextual: crece desde el día que se mantuvo presionado ─── */
  function ponerMenu(m, p) {
    m.__p = p;
    fijar(m, { opacity: String(Math.max(0, Math.min(1, p))), transform: 'scale(' + (0.86 + 0.14 * p).toFixed(4) + ')' });
  }

  function abrirMenusNuevos() {
    Array.prototype.forEach.call(doc.querySelectorAll('[data-menu]'), function (m) {
      if (m.__vivo) return;
      m.__vivo = true;
      ponerMenu(m, 0);
      animar(m, { desde: 0, hasta: 1, amortiguamiento: 1, respuesta: 0.28, tolerancia: 0.002, paso: function (p) { ponerMenu(m, p); } });
    });
  }

  function cerrarMenu() {
    return new Promise(function (listo) {
      var m = doc.querySelector('[data-menu]');
      if (!m) { listo(); return; }
      animar(m, { desde: m.__p === undefined ? 1 : m.__p, hasta: 0, amortiguamiento: 1, respuesta: 0.2, tolerancia: 0.002, paso: function (p) { ponerMenu(m, p); }, fin: listo });
    });
  }

  /* ------------------------------------------------------------------
   * 3. Encabezados de vidrio: el contenido arranca debajo de ellos
   * ---------------------------------------------------------------- */
  var observador = global.ResizeObserver
    ? new global.ResizeObserver(function (lista) { lista.forEach(function (e) { ajustarCabecera(e.target); }); })
    : null;

  function ajustarCabecera(cab) {
    var padre = cab.parentElement;
    var zona = padre && padre.querySelector(':scope > [data-desplaza]');
    if (!zona) return;
    if (zona.__padBase === undefined) zona.__padBase = parseFloat(global.getComputedStyle(zona).paddingTop) || 0;
    fijar(zona, { 'padding-top': (cab.offsetHeight + zona.__padBase) + 'px' });
  }

  function medirCabeceras() {
    var cabs = doc.querySelectorAll('[data-cabecera]');
    for (var i = 0; i < cabs.length; i++) {
      if (!cabs[i].__observada) { cabs[i].__observada = true; if (observador) observador.observe(cabs[i]); }
      ajustarCabecera(cabs[i]);
    }
  }

  /* ------------------------------------------------------------------
   * 4. Aviso inferior con "Deshacer"
   * ---------------------------------------------------------------- */
  var aviso = null, avisoTimer = null, avisoVencer = null, avisoDeshacer = null;

  function crearAviso() {
    aviso = doc.createElement('div');
    aviso.className = 'fl-aviso';
    aviso.setAttribute('role', 'status');
    aviso.innerHTML = '<span class="fl-aviso-txt"></span><button type="button" class="fl-aviso-btn"></button>';
    aviso.querySelector('button').addEventListener('click', function () {
      var f = avisoDeshacer;
      avisoVencer = null; avisoDeshacer = null;
      clearTimeout(avisoTimer);
      ocultarAviso();
      if (f) f();
    });
    doc.body.appendChild(aviso);
  }

  function colocarAviso() {
    var pantalla = doc.getElementById('screen');
    // Encima de la barra de pestañas o, en el chat, de la barra de escribir;
    // nunca por debajo de lo que se ve (en iOS instalada el fondo puede quedar sin pintar).
    var pie = doc.querySelector('[data-vidrio="barra"]') || doc.querySelector('[data-chat-redactar]');
    var r = pantalla.getBoundingClientRect();
    var base = Math.min(pie ? pie.getBoundingClientRect().top : r.bottom, global.innerHeight);
    aviso.style.left = (r.left + 14) + 'px';
    aviso.style.width = (r.width - 28) + 'px';
    aviso.style.bottom = (global.innerHeight - base + 12) + 'px';
  }

  function ponerAviso(p) {
    aviso.__p = p;
    aviso.style.opacity = String(Math.max(0, Math.min(1, p)));
    aviso.style.transform = 'translate3d(0,' + ((1 - p) * 18).toFixed(2) + 'px,0) scale(' + (0.96 + 0.04 * p).toFixed(4) + ')';
  }

  function mostrarAviso(texto, accion, alDeshacer, alVencer) {
    // Si había otro pendiente, se confirma ya: nunca se pierden dos a la vez.
    if (avisoVencer) { var previo = avisoVencer; avisoVencer = null; clearTimeout(avisoTimer); previo(); }
    if (!aviso) crearAviso();
    aviso.querySelector('.fl-aviso-txt').textContent = texto;
    var boton = aviso.querySelector('.fl-aviso-btn');
    boton.textContent = accion || '';
    boton.style.display = accion ? '' : 'none';   // aviso informativo, sin acción
    avisoDeshacer = alDeshacer; avisoVencer = alVencer;
    aviso.style.display = 'flex';
    colocarAviso();
    // Si el aviso acompaña un cambio de pantalla (salir de un chat), se recoloca
    // tras ese redibujo: la barra de abajo pudo cambiar.
    trasRedibujo(function () { if (aviso.style.display !== 'none') colocarAviso(); });
    animar(aviso, { desde: aviso.__p || 0, hasta: 1, amortiguamiento: 1, respuesta: 0.3, tolerancia: 0.002, paso: ponerAviso });
    avisoTimer = setTimeout(function () {
      var f = avisoVencer;
      avisoVencer = null; avisoDeshacer = null;
      ocultarAviso();
      if (f) f();
    }, 5000);
  }

  function ocultarAviso() {
    if (!aviso) return;
    animar(aviso, {
      desde: aviso.__p || 1, hasta: 0, amortiguamiento: 1, respuesta: 0.25, tolerancia: 0.002, paso: ponerAviso,
      fin: function () { aviso.style.display = 'none'; },
    });
  }

  /* ------------------------------------------------------------------
   * 5. Indicador de "jalar para actualizar"
   * ---------------------------------------------------------------- */
  var indicador = null;
  var UMBRAL_JALAR = 64, REPOSO_JALAR = 52;

  function crearIndicador() {
    indicador = doc.createElement('div');
    indicador.className = 'fl-jalar';
    indicador.setAttribute('aria-hidden', 'true');
    indicador.innerHTML = '<svg viewBox="0 0 28 28" width="28" height="28">' +
      '<circle cx="14" cy="14" r="10" class="fl-jalar-fondo"></circle>' +
      '<circle cx="14" cy="14" r="10" class="fl-jalar-arco" transform="rotate(-90 14 14)"></circle></svg>';
    doc.body.appendChild(indicador);
  }

  function colocarIndicador(zona) {
    if (!indicador) crearIndicador();
    var cab = zona.parentElement && zona.parentElement.querySelector(':scope > [data-cabecera]');
    var rz = zona.getBoundingClientRect();
    var tope = cab ? cab.getBoundingClientRect().bottom : rz.top;
    indicador.__tope = tope;
    indicador.style.left = (rz.left + rz.width / 2 - 14) + 'px';
    indicador.style.display = 'block';
  }

  function ponerIndicador(d) {
    var p = Math.max(0, Math.min(1, d / UMBRAL_JALAR));
    indicador.style.top = (indicador.__tope + Math.max(0, d / 2 - 14)).toFixed(1) + 'px';
    indicador.style.opacity = String(Math.min(1, d / 28));
    var arco = indicador.querySelector('.fl-jalar-arco');
    if (!indicador.classList.contains('fl-gira')) arco.style.strokeDashoffset = String(62.83 * (1 - p * 0.85));
    indicador.classList.toggle('fl-listo', p >= 1);
  }

  /* ------------------------------------------------------------------
   * 6. Gestos: un solo rastreador para toque y mouse
   * ---------------------------------------------------------------- */
  var gesto = null;
  var UMBRAL = 10;
  var RETRASO_LEVANTAR = 420;   // lo que dura "mantener presionado"
  var suprimirClick = false, ultimoToque = 0;

  function ignorable(t) {
    return !t.closest || t.closest('input, textarea, select, [data-sin-gesto]');
  }

  function empezar(x, y, target, tactil) {
    if (ignorable(target)) { gesto = null; return; }
    if (gesto && gesto.timer) clearTimeout(gesto.timer);
    var hoja = target.closest('[data-hoja]');
    var g = gesto = {
      x0: x, y0: y, tactil: tactil, estado: 'duda', r: rastreador(),
      hoja: hoja,
      dias: hoja ? null : target.closest('[data-deslizar-dias]'),
      zona: hoja ? null : target.closest('[data-desplaza]'),
      dia: hoja ? null : target.closest('[data-dia]'),
    };
    g.r.agregar(x, y, ahora());
    // Un día de la semana: si el dedo se queda quieto, se "levanta".
    if (g.dia) g.timer = setTimeout(function () { levantarDia(g); }, RETRASO_LEVANTAR);
  }

  function mover(x, y, ev) {
    var g = gesto;
    if (!g) return;
    g.r.agregar(x, y, ahora());
    var dx = x - g.x0, dy = y - g.y0, adx = Math.abs(dx), ady = Math.abs(dy);

    if (g.estado === 'duda') {
      var alTope = g.zona && g.zona.scrollTop <= 0;
      // Jalar hacia abajo desde el tope: se toma el control temprano para
      // que iOS no haga su propio rebote.
      if (alTope && dy > 4 && ady > adx * 1.2 && ev && ev.cancelable) ev.preventDefault();
      if (Math.max(adx, ady) < UMBRAL) return;
      // Se movió antes de tiempo: no era mantener presionado.
      if (g.timer) { clearTimeout(g.timer); g.timer = null; }

      if (g.hoja && dy > 0 && ady > adx && g.hoja.scrollTop <= 0) empezarHoja(g);
      else if (g.dias && adx > ady) empezarDias(g);
      else if (alTope && dy > 0 && ady > adx) empezarJalar(g);
      else { gesto = null; return; }
    }
    if (ev && ev.cancelable) ev.preventDefault();
    g.mover(dx, dy);
  }

  function terminar(cancelado) {
    var g = gesto;
    gesto = null;
    if (g && g.timer) { clearTimeout(g.timer); g.timer = null; }
    if (!g || g.estado !== 'activo') return;
    // El dedo se levantó sobre algún botón: ese toque no cuenta.
    suprimirClick = true;
    setTimeout(function () { suprimirClick = false; }, 400);
    g.fin(cancelado ? { x: 0, y: 0 } : g.r.velocidad());
  }

  doc.addEventListener('touchstart', function (e) {
    ultimoToque = Date.now();
    if (e.touches.length !== 1) { if (gesto && gesto.estado === 'activo') terminar(true); gesto = null; return; }
    empezar(e.touches[0].clientX, e.touches[0].clientY, e.target, true);
  }, { passive: true });
  doc.addEventListener('touchmove', function (e) {
    if (!gesto || e.touches.length !== 1) return;
    mover(e.touches[0].clientX, e.touches[0].clientY, e);
  }, { passive: false });
  doc.addEventListener('touchend', function () { ultimoToque = Date.now(); terminar(false); }, { passive: true });
  doc.addEventListener('touchcancel', function () { terminar(true); }, { passive: true });

  // Mouse (computador). Se ignora el mouse que el celular simula tras un toque.
  doc.addEventListener('mousedown', function (e) {
    if (e.button !== 0 || Date.now() - ultimoToque < 800) return;
    empezar(e.clientX, e.clientY, e.target, false);
  });
  doc.addEventListener('mousemove', function (e) { if (gesto && !gesto.tactil) mover(e.clientX, e.clientY, e); });
  doc.addEventListener('mouseup', function () { if (gesto && !gesto.tactil) terminar(false); });

  doc.addEventListener('click', function (e) {
    if (suprimirClick) { suprimirClick = false; e.stopPropagation(); e.preventDefault(); return; }
    // Tocar el área oscura alrededor de una hoja la cierra.
    var velo = e.target.closest && e.target.closest('[data-hoja-velo]');
    if (velo && app()) {
      var fondo = velo.closest('[data-hoja-fondo]');
      if (fondo) app().cerrarHoja(fondo.getAttribute('data-hoja-fondo'));
    }
  }, true);

  // iOS solo aplica :active (la respuesta al presionar) si hay un oyente táctil.
  doc.addEventListener('touchstart', function () {}, { passive: true });

  /* ── Hoja: arrastrar hacia abajo para cerrar ─────────────────────── */
  function empezarHoja(g) {
    var h = g.hoja;
    g.estado = 'activo';
    if (h.__anim) h.__anim.parar();
    var base = h.__y || 0, alto = h.offsetHeight || 1;
    g.mover = function (dx, dy) {
      var y = base + dy;
      if (y < 0) y = goma(y, alto);
      ponerHoja(h, y);
    };
    g.fin = function (v) {
      var y = h.__y || 0, tipo = h.getAttribute('data-hoja');
      if (y + proyectar(v.y) > alto * 0.5) {
        moverHoja(h, alto, v.y, SALIDA, function () { if (app()) app().cerrarHoja(tipo, true); });
      } else {
        moverHoja(h, 0, v.y, v.y < -50 || Math.abs(v.y) > 300 ? LANZADO : SUAVE);
      }
    };
  }

  /* ── Días: deslizar para pasar al anterior o al siguiente ────────── */
  function empezarDias(g) {
    var el = g.dias, a = app();
    if (!a) { gesto = null; return; }
    var ancho = el.offsetWidth || 1, dia = a.diaActivo(), ultimo = a.totalDias() - 1;
    g.estado = 'activo';
    if (el.__anim) el.__anim.parar();
    var base = el.__x || 0;

    function poner(x, opacidad) {
      el.__x = x;
      var props = { transform: 'translate3d(' + x.toFixed(2) + 'px,0,0)' };
      if (opacidad !== undefined) props.opacity = String(opacidad);
      fijar(el, props);
    }
    function limpiar() { el.__x = 0; fijar(el, { transform: null, opacity: null }); }

    g.mover = function (dx) {
      var x = base + dx;
      var puede = (x > 0 && dia > 0) || (x < 0 && dia < ultimo);
      if (!puede) x = goma(x, ancho) * 0.5;
      poner(x);
    };
    g.fin = function (v) {
      var x = el.__x || 0, destino = x + proyectar(v.x), dir = 0;
      if (destino > ancho * 0.3 && dia > 0) dir = -1;
      else if (destino < -ancho * 0.3 && dia < ultimo) dir = 1;
      if (!dir) {
        animar(el, { desde: x, hasta: 0, velocidad: v.x, amortiguamiento: LANZADO.amortiguamiento, respuesta: LANZADO.respuesta, paso: function (p) { poner(p); }, fin: limpiar });
        return;
      }
      // Sale hacia donde iba el dedo; el día nuevo entra desde el otro lado.
      animar(el, {
        desde: x, hasta: -dir * ancho, velocidad: v.x, amortiguamiento: 1, respuesta: 0.26,
        paso: function (p) { poner(p); },
        fin: function () {
          a.cambiarDia(dir);
          trasRedibujo(function () {
            var entrada = dir * ancho * 0.35;
            poner(entrada, 0);
            animar(el, {
              desde: entrada, hasta: 0, amortiguamiento: 1, respuesta: 0.32,
              paso: function (p) { poner(p, 1 - Math.abs(p) / Math.abs(entrada)); },
              fin: limpiar,
            });
          });
        },
      });
    };
  }

  /* ── Día de la semana: arrastrar intercambia, soltar quieto abre menú ── */
  function levantarDia(g) {
    if (gesto !== g || g.estado !== 'duda' || !app()) return;
    var a = app(), cel = g.dia;
    var i = +cel.getAttribute('data-dia');
    var celdas = Array.prototype.slice.call(doc.querySelectorAll('[data-dia]'));
    var objetivo = null, movido = false, escala = 1, dx = 0, dy = 0;
    g.estado = 'activo';
    g.timer = null;

    function poner() {
      fijar(cel, { transform: 'translate3d(' + dx.toFixed(1) + 'px,' + (dy * 0.25).toFixed(1) + 'px,0) scale(' + escala.toFixed(4) + ')' });
    }
    function marcar(nuevo) {
      if (objetivo === nuevo) return;
      if (objetivo) fijar(objetivo, { outline: null, 'outline-offset': null });
      objetivo = nuevo;
      if (objetivo) fijar(objetivo, { outline: '2px solid rgba(206,127,85,.85)', 'outline-offset': '2px' });
    }
    function soltar() {
      fijar(cel, { transform: null, 'z-index': null, 'box-shadow': null });
    }

    // Se levanta: crece un poco y proyecta sombra, como en iOS.
    fijar(cel, { 'z-index': '5', 'box-shadow': '0 12px 26px rgba(0,0,0,.5)' });
    animar(cel, { desde: 1, hasta: 1.1, amortiguamiento: 1, respuesta: 0.22, tolerancia: 0.002, paso: function (s) { escala = s; poner(); } });

    g.mover = function (mx, my) {
      dx = mx; dy = my;
      if (Math.abs(mx) > 8 || Math.abs(my) > 8) movido = true;
      poner();
      var r = cel.getBoundingClientRect(), cx = r.left + r.width / 2, hallado = null;
      celdas.forEach(function (c) {
        if (c === cel) return;
        var rc = c.getBoundingClientRect();
        if (cx >= rc.left && cx <= rc.right) hallado = c;
      });
      marcar(movido ? hallado : null);
    };
    g.fin = function () {
      var destino = objetivo;
      marcar(null);
      if (destino) {
        if (cel.__anim) cel.__anim.parar();
        a.intercambiarDias(i, +destino.getAttribute('data-dia'));
        trasRedibujo(soltar);
      } else if (!movido) {
        if (cel.__anim) cel.__anim.parar();
        soltar();
        a.abrirMenuDia(i, cel.getBoundingClientRect());
      } else {
        // Se soltó en ningún lado: vuelve a su sitio.
        var x0 = dx, y0 = dy;
        animar(cel, {
          desde: 1, hasta: 0, amortiguamiento: LANZADO.amortiguamiento, respuesta: 0.3, tolerancia: 0.002,
          paso: function (p) { dx = x0 * p; dy = y0 * p; escala = 1 + 0.1 * p; poner(); },
          fin: soltar,
        });
      }
    };
  }

  /* ── Jalar para actualizar ───────────────────────────────────────── */
  function empezarJalar(g) {
    var zona = g.zona, a = app();
    if (!a || zona.__actualizando) { gesto = null; return; }
    g.estado = 'activo';
    if (zona.__anim) zona.__anim.parar();
    var alto = zona.clientHeight || 600;
    colocarIndicador(zona);

    function poner(d) {
      zona.__d = d;
      fijar(zona, { transform: d > 0.5 ? 'translate3d(0,' + d.toFixed(2) + 'px,0)' : null });
      ponerIndicador(d);
    }
    function volver() {
      animar(zona, {
        desde: zona.__d || 0, hasta: 0, amortiguamiento: 1, respuesta: 0.35, paso: poner,
        fin: function () { indicador.style.display = 'none'; indicador.classList.remove('fl-gira', 'fl-listo'); zona.__actualizando = false; },
      });
    }

    g.mover = function (dx, dy) { poner(Math.max(0, goma(dy, alto))); };
    g.fin = function () {
      var d = zona.__d || 0;
      if (d < UMBRAL_JALAR) { volver(); return; }
      zona.__actualizando = true;
      animar(zona, { desde: d, hasta: REPOSO_JALAR, amortiguamiento: 1, respuesta: 0.3, paso: poner });
      indicador.classList.add('fl-gira');
      var inicio = Date.now();
      Promise.resolve()
        .then(function () { return a.refrescar(); })
        .catch(function () {})
        .then(function () { setTimeout(volver, Math.max(0, 500 - (Date.now() - inicio))); });
    };
  }

  /* ------------------------------------------------------------------
   * 7. Enganche con la app
   * ---------------------------------------------------------------- */
  function trasRender() {
    medirCabeceras();
    abrirHojasNuevas();
    abrirMenusNuevos();
  }

  global.addEventListener('resize', function () { if (aviso && aviso.style.display === 'flex') colocarAviso(); });

  global.Fluido = {
    trasRender: trasRender,
    animarSalida: animarSalida,
    cerrarMenu: cerrarMenu,
    aviso: mostrarAviso,
    fijar: fijar,
  };
})(window);
