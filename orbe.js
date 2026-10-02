/* =====================================================================
 * Pilares · orbe
 * ---------------------------------------------------------------------
 * <pilares-orbe>: el indicador de "cargando" (orbes de Libraries.dev).
 *
 *   <pilares-orbe tam="20" estado="searching"></pilares-orbe>
 *
 *  - tam: 20, 32 o 64 (los tamaños afinados por el motor).
 *  - estado: working, searching, solving, listening, connecting,
 *    weaving, composing, breathing o shaping.
 *  - .tiempo = número: se queda quieta en ese instante (para seguir al
 *    dedo, p. ej. al jalar para actualizar); .tiempo = null: corre sola
 *    desde donde quedó, sin saltos. .instante: el último dibujado.
 *  - Puntos claros (afinación oscura del motor): el tinte de color los
 *    apaga demasiado sobre el fondo de Pilares, por eso no se usa.
 *
 * Rendimiento: un solo requestAnimationFrame para todas; solo se anima
 * la que se ve en pantalla y con la app al frente; con "Reducir
 * movimiento" queda quieta. El motor (orbes-motor.js) se descarga
 * aparte cuando hace falta, sin frenar la carga de la app.
 * El lienzo va en shadow DOM: el morph de runtime.js no lo toca.
 * ================================================================== */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!global.customElements || global.customElements.get('pilares-orbe')) return;

  var ESTADOS = ['working', 'searching', 'solving', 'listening', 'connecting', 'weaving', 'composing', 'breathing', 'shaping'];
  var motor = null, pidiendo = null;
  var todas = new Set(), vivas = new Set(), raf = 0;
  var mq = global.matchMedia ? global.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function reducido() { return !!(mq && mq.matches); }
  function ahora() { return global.performance ? performance.now() : Date.now(); }

  function cargarMotor() {
    if (motor || pidiendo) return;
    pidiendo = import('./orbes-motor.js').then(function (m) {
      // Nombres que exporta el motor: r = resolvePreset, M = MODE_FRAMES, p = paintFrame.
      motor = { preset: m.r, cuadros: m.M, pintar: m.p };
      todas.forEach(function (o) { o.__revisar(); });
    }, function () { pidiendo = null; });
  }

  function bucle(t) {
    raf = 0;
    vivas.forEach(function (o) { o.__dibujar(o.__t0 + (t - o.__n0) / 1000 * o.__vel); });
    if (vivas.size) raf = requestAnimationFrame(bucle);
  }

  var io = global.IntersectionObserver ? new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) { e.target.__visible = e.isIntersecting; e.target.__revisar(); });
  }) : null;

  doc.addEventListener('visibilitychange', function () { todas.forEach(function (o) { o.__revisar(); }); });
  if (mq) {
    var alCambiar = function () { todas.forEach(function (o) { o.__revisar(); }); };
    if (mq.addEventListener) mq.addEventListener('change', alCambiar);
    else if (mq.addListener) mq.addListener(alCambiar);
  }

  class Orbe extends HTMLElement {
    static get observedAttributes() { return ['tam', 'estado']; }

    constructor() {
      super();
      this.__tiempo = null;     // null = corre sola
      this.__t = 0.6;           // último instante dibujado
      this.__t0 = 0; this.__n0 = 0; this.__vel = 1;
      this.__visible = !io;
      this.__cfg = null;
    }

    connectedCallback() {
      // Si alguien puso .tiempo antes de que existiera la clase, se recupera.
      if (Object.prototype.hasOwnProperty.call(this, 'tiempo')) {
        var v = this.tiempo; delete this.tiempo; this.tiempo = v;
      }
      if (!this.__lienzo) {
        var sombra = this.attachShadow({ mode: 'open' });
        sombra.innerHTML = '<style>:host{display:inline-block;flex:none;line-height:0;vertical-align:middle}canvas{display:block}</style>';
        this.__lienzo = doc.createElement('canvas');
        this.__lienzo.setAttribute('aria-hidden', 'true');
        sombra.appendChild(this.__lienzo);
      }
      this.__preparar();
      todas.add(this);
      if (io) io.observe(this);
      cargarMotor();
    }

    disconnectedCallback() {
      todas.delete(this);
      vivas.delete(this);
      if (io) io.unobserve(this);
    }

    attributeChangedCallback() { if (this.__lienzo) this.__preparar(); }

    get instante() { return this.__t; }
    get tiempo() { return this.__tiempo; }
    set tiempo(v) {
      var n = v == null ? null : Number(v);
      if (n === this.__tiempo) return;
      if (n == null) { this.__t0 = this.__t; this.__n0 = ahora(); }   // sigue desde donde está
      this.__tiempo = n;
      this.__revisar();
    }

    __preparar() {
      var tam = parseInt(this.getAttribute('tam'), 10);
      tam = tam === 32 || tam === 64 ? tam : 20;
      var dpr = Math.min(2, global.devicePixelRatio || 1);
      var c = this.__lienzo;
      this.__tam = tam; this.__dpr = dpr;
      if (c.width !== Math.round(tam * dpr)) { c.width = c.height = Math.round(tam * dpr); }
      c.style.width = c.style.height = tam + 'px';
      this.__ctx = c.getContext('2d');
      this.__cfg = null;
      this.__revisar();
    }

    __revisar() {
      var corre = !!motor && this.isConnected && this.__visible && this.__tiempo == null &&
        doc.visibilityState !== 'hidden' && !reducido();
      if (corre) {
        if (!vivas.has(this)) {
          this.__t0 = this.__t; this.__n0 = ahora();
          vivas.add(this);
          if (!raf) raf = requestAnimationFrame(bucle);
        }
      } else {
        vivas.delete(this);
        this.__dibujar(this.__tiempo != null ? this.__tiempo : this.__t);
      }
    }

    __dibujar(t) {
      if (!motor || !this.__ctx) return;
      if (!this.__cfg) {
        var estado = this.getAttribute('estado');
        this.__cfg = motor.preset(ESTADOS.indexOf(estado) >= 0 ? estado : 'searching', this.__tam);
        this.__vel = this.__cfg.speed;
      }
      this.__t = t;
      var ctx = this.__ctx, tam = this.__tam, cfg2 = this.__cfg;
      ctx.setTransform(this.__dpr, 0, 0, this.__dpr, 0, 0);
      ctx.clearRect(0, 0, tam, tam);
      motor.pintar(ctx, motor.cuadros[cfg2.mode](tam, t, cfg2.opts), true);
    }
  }

  global.customElements.define('pilares-orbe', Orbe);

  // El motor se adelanta cuando el teléfono está libre, para que la
  // primera vez que se jale para actualizar la orbe ya esté lista.
  function adelantar() { cargarMotor(); }
  if (global.requestIdleCallback) global.addEventListener('load', function () { requestIdleCallback(adelantar, { timeout: 4000 }); });
  else global.addEventListener('load', function () { setTimeout(adelantar, 1500); });
})(window);
