/* =====================================================================
 * Pilares · runtime
 * ---------------------------------------------------------------------
 * Interpreta la misma plantilla del prototipo (<sc-if>, <sc-for> y los
 * enlaces {{ ... }}) directamente sobre el DOM, sin dependencias ni
 * paso de compilacion.
 *
 * En cada cambio de estado se arma una descripcion liviana del arbol
 * (objetos simples, no nodos del DOM) y luego se fusiona ("morph") contra
 * el DOM vivo: solo se crea o se cambia lo que de verdad cambio. Los nodos
 * que no cambian de identidad se reutilizan, asi no se pierde el foco del
 * teclado, el cursor de texto, la posicion de scroll ni se reinician las
 * animaciones CSS.
 * ===================================================================== */
(function (global) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  /* ------------------------------------------------------------------
   * 1. Shim minimo de React.createElement
   *    La logica original lo usa solo para dibujar los iconos SVG.
   * ---------------------------------------------------------------- */
  function dashCase(name) {
    return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  global.React = {
    createElement: function (tagName, props, children) {
      var el = document.createElementNS(SVG_NS, tagName);
      props = props || {};

      for (var key in props) {
        if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
        var val = props[key];
        if (key === 'key' || val == null || val === false) continue;

        if (key === 'style' && typeof val === 'object') {
          for (var prop in val) el.style.setProperty(dashCase(prop), val[prop]);
          continue;
        }
        // viewBox es de los pocos atributos SVG que conservan camelCase
        el.setAttribute(key === 'viewBox' ? 'viewBox' : dashCase(key), val);
      }

      var kids = arguments.length > 3
        ? Array.prototype.slice.call(arguments, 2)
        : (Array.isArray(children) ? children : [children]);

      for (var i = 0; i < kids.length; i++) {
        if (kids[i] != null && kids[i] !== false) el.appendChild(kids[i]);
      }
      return el;
    }
  };

  /* ------------------------------------------------------------------
   * 2. Clase base de la logica (equivalente a DCLogic del prototipo)
   * ---------------------------------------------------------------- */
  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
    this.__host = null;
  }

  DCLogic.prototype.setState = function (patch) {
    var next = (typeof patch === 'function') ? patch(this.state, this.props) : patch;
    if (!next) return;

    var merged = {}, key;
    for (key in this.state) merged[key] = this.state[key];
    for (key in next) {
      if (Object.prototype.hasOwnProperty.call(next, key)) merged[key] = next[key];
    }
    this.state = merged;                 // estado inmutable, como en React
    if (this.__host) this.__host.invalidate();
  };

  global.DCLogic = DCLogic;

  /* ------------------------------------------------------------------
   * 3. Resolucion de expresiones {{ ... }}
   *    Solo se usan rutas simples: "nombre" o "item.campo". Cada cadena
   *    de la plantilla se analiza una sola vez y queda guardada.
   * ---------------------------------------------------------------- */
  var BINDING = /\{\{\s*([^}]+?)\s*\}\}/g;
  var SINGLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;

  function Scope(parent, name, value, key) {
    this.parent = parent;
    this.name = name;
    this.value = value;
    this.key = key;
  }

  /** "item.campo" → { partes: ['item', 'campo'] }; true/false/null/números → { lit }. */
  function compilarExpr(expr) {
    expr = expr.trim();
    if (expr === 'true') return { lit: true };
    if (expr === 'false') return { lit: false };
    if (expr === 'null') return { lit: null };
    if (/^-?\d+(?:\.\d+)?$/.test(expr)) return { lit: parseFloat(expr) };
    return { partes: expr.split('.') };
  }

  function resolve(c, scope, vals) {
    if (c.partes === undefined) return c.lit;
    var parts = c.partes, head = parts[0], current, found = false;

    for (var sc = scope; sc; sc = sc.parent) {
      if (sc.name === head) { current = sc.value; found = true; break; }
    }
    if (!found) current = vals ? vals[head] : undefined;

    for (var i = 1; i < parts.length; i++) {
      if (current == null) return undefined;
      current = current[parts[i]];
    }
    return current;
  }

  /** La cadena se parte en trozos fijos (texto) y enlaces (expresiones). */
  var COMPILADAS = Object.create(null);
  function compilar(raw) {
    var c = COMPILADAS[raw];
    if (c) return c;
    var only = raw.match(SINGLE);
    if (only) {
      c = { solo: compilarExpr(only[1]) };
    } else {
      var trozos = [], last = 0, m;
      BINDING.lastIndex = 0;
      while ((m = BINDING.exec(raw)) !== null) {
        if (m.index > last) trozos.push(raw.slice(last, m.index));
        trozos.push(compilarExpr(m[1]));
        last = m.index + m[0].length;
      }
      if (last < raw.length) trozos.push(raw.slice(last));
      c = { trozos: trozos };
    }
    COMPILADAS[raw] = c;
    return c;
  }

  /** Devuelve el valor crudo si la cadena es exactamente un enlace,
   *  o la cadena interpolada en cualquier otro caso. */
  function interpolate(raw, scope, vals) {
    var c = compilar(raw);
    if (c.solo) return resolve(c.solo, scope, vals);
    var out = '';
    for (var i = 0; i < c.trozos.length; i++) {
      var t = c.trozos[i];
      if (typeof t === 'string') { out += t; continue; }
      var v = resolve(t, scope, vals);
      if (v != null) out += String(v);
    }
    return out;
  }

  function truthy(v) {
    return !(v == null || v === false || v === 0 || v === '' ||
             (Array.isArray(v) && v.length === 0));
  }

  /* ------------------------------------------------------------------
   * 4. Manejadores de eventos
   *    Se guardan en el nodo (__handlers) y se enlazan una sola vez, para
   *    que el morph pueda reemplazarlos sin volver a suscribirse.
   * ---------------------------------------------------------------- */
  function setHandler(el, type, fn) {
    if (!el.__handlers) el.__handlers = {};
    el.__handlers[type] = fn;
    if (!el.__bound) el.__bound = {};
    if (!el.__bound[type]) {
      el.__bound[type] = true;
      el.addEventListener(type, function (ev) {
        var handler = el.__handlers && el.__handlers[type];
        if (typeof handler === 'function') handler(ev);
      });
    }
  }

  /* ------------------------------------------------------------------
   * 5. Descripcion del arbol a partir de la plantilla
   *    Nodo de texto: { text }. Elemento: { name, ns, attrs, on, value, kids }.
   * ---------------------------------------------------------------- */
  function buildList(tplNodes, out, scope, ctx) {
    for (var i = 0; i < tplNodes.length; i++) build(tplNodes[i], out, scope, ctx);
  }

  /** Un nodo del DOM ya hecho (p. ej. los iconos SVG) pasado a descripcion. */
  function desdeDom(node) {
    if (node.nodeType === 3) return { text: node.nodeValue };
    var attrs = Object.create(null), kids = [], i;
    for (i = 0; i < node.attributes.length; i++) attrs[node.attributes[i].name] = node.attributes[i].value;
    for (i = 0; i < node.childNodes.length; i++) {
      var c = node.childNodes[i];
      if (c.nodeType === 1 || c.nodeType === 3) kids.push(desdeDom(c));
    }
    return { name: node.localName, ns: node.namespaceURI === SVG_NS ? SVG_NS : null, attrs: attrs, on: null, value: undefined, kids: kids };
  }

  function buildText(tpl, out, scope, ctx) {
    var raw = tpl.nodeValue;
    if (raw.indexOf('{{') === -1) { out.push({ text: raw }); return; }
    var trozos = compilar(raw);
    trozos = trozos.solo ? [trozos.solo] : trozos.trozos;
    for (var i = 0; i < trozos.length; i++) {
      var t = trozos[i];
      if (typeof t === 'string') { out.push({ text: t }); continue; }
      var value = resolve(t, scope, ctx.vals);
      if (value != null && value !== false) {
        out.push(value.nodeType ? desdeDom(value) : { text: String(value) });   // nodeType: iconos SVG
      }
    }
  }

  function build(tpl, out, scope, ctx) {
    if (tpl.nodeType === 3) { buildText(tpl, out, scope, ctx); return; }
    if (tpl.nodeType !== 1) return;

    if (tpl.__si !== undefined) {
      if (truthy(interpolate(tpl.__si, scope, ctx.vals))) buildList(tpl.__children, out, scope, ctx);
      return;
    }

    if (tpl.__lista !== undefined) {
      var list = interpolate(tpl.__lista, scope, ctx.vals);
      if (!list || !list.length) return;
      for (var i = 0; i < list.length; i++) {
        buildList(tpl.__children, out, new Scope(scope, tpl.__alias, list[i], scope.key + '/' + tpl.__tid + '#' + i), ctx);
      }
      return;
    }

    var spec = tpl.__spec;
    var key = scope.key + '/' + tpl.__tid;
    var v = { name: tpl.localName, ns: spec.ns, attrs: Object.create(null), on: null, value: undefined, kids: [] };

    for (var a = 0; a < spec.attrs.length; a++) {
      var at = spec.attrs[a];
      if (at.evento) {
        var fn = interpolate(at.raw, scope, ctx.vals);
        if (typeof fn === 'function') {
          (v.on || (v.on = {}))[at.evento] = fn;
          // Marca lo tocable: styles.css le da respuesta inmediata al presionar.
          if (at.evento === 'click') v.attrs['data-toque'] = '';
        }
      } else if (at.valor) {
        var val = interpolate(at.raw, scope, ctx.vals);
        v.value = (val == null ? '' : String(val));
      } else if (at.dyn) {
        var o = interpolate(at.raw, scope, ctx.vals);
        v.attrs[at.name] = (o == null ? '' : String(o));
      } else {
        v.attrs[at.name] = at.raw;
      }
    }

    v.attrs['data-k'] = key;
    buildList(tpl.__children, v.kids, scope, ctx);
    out.push(v);
  }

  /* ------------------------------------------------------------------
   * 6. Fusion de la descripcion contra el DOM vivo
   * ---------------------------------------------------------------- */
  function crear(v) {
    if (v.text !== undefined) { var tx = document.createTextNode(v.text); tx.__txt = v.text; return tx; }
    var el = v.ns === SVG_NS ? document.createElementNS(SVG_NS, v.name) : document.createElement(v.name);
    for (var k in v.attrs) el.setAttribute(k, v.attrs[k]);
    el.__v = v;
    if (v.on) for (var t in v.on) setHandler(el, t, v.on[t]);
    for (var i = 0; i < v.kids.length; i++) el.appendChild(crear(v.kids[i]));
    // value va como propiedad (el atributo no cambia la seleccion) y despues de los hijos (<option>).
    if (v.value !== undefined) { el.__value = v.value; el.value = v.value; }
    return el;
  }

  function mismo(old, v) {
    if (v.text !== undefined) return old.nodeType === 3;
    if (old.nodeType !== 1 || old.localName !== v.name) return false;
    var k = v.attrs['data-k'];
    if (old.__v) return old.__v.attrs['data-k'] === k;
    return old.getAttribute('data-k') === (k === undefined ? null : k);
  }

  function morph(old, v) {
    var a = v.attrs, p = old.__v, k, i, at, t;
    if (p) {
      // Se compara con lo que se pintó la vez pasada (objetos de JS): mucho más
      // barato que leer cada atributo del DOM en cada redibujo.
      var pa = p.attrs;
      for (k in a) if (pa[k] !== a[k]) old.setAttribute(k, a[k]);
      for (k in pa) if (!(k in a)) old.removeAttribute(k);
    } else {
      for (k in a) if (old.getAttribute(k) !== a[k]) old.setAttribute(k, a[k]);
      for (i = old.attributes.length - 1; i >= 0; i--) {
        at = old.attributes[i];
        if (!(at.name in a)) old.removeAttribute(at.name);
      }
    }
    old.__v = v;
    // Estilos que pone una animación o un gesto en curso (fluido.js). Si no
    // se reponen, cada redibujo devolvería el elemento a su sitio de golpe.
    if (old.__fijo) {
      for (var prop in old.__fijo) old.style.setProperty(prop, old.__fijo[prop]);
    }

    if (v.on) for (t in v.on) setHandler(old, t, v.on[t]);
    if (old.__handlers) {
      for (t in old.__handlers) if (!v.on || !(t in v.on)) old.__handlers[t] = null;
    }

    if (v.value !== undefined) {
      old.__value = v.value;
      // No tocar el campo que el usuario esta escribiendo si ya coincide:
      // asi el cursor se queda donde esta.
      if (old.value !== v.value) old.value = v.value;
    }
    morphKids(old, v.kids);
  }

  function morphKids(parent, kids) {
    var old = parent.firstChild;
    for (var i = 0; i < kids.length; i++) {
      var v = kids[i];
      if (!old) { parent.appendChild(crear(v)); continue; }
      var next = old.nextSibling;
      if (mismo(old, v)) {
        if (v.text !== undefined) {
          if (old.__txt !== v.text) { if (old.nodeValue !== v.text) old.nodeValue = v.text; old.__txt = v.text; }
        }
        else morph(old, v);
      } else {
        parent.replaceChild(crear(v), old);
      }
      old = next;
    }
    while (old) {
      var sobra = old;
      old = old.nextSibling;
      parent.removeChild(sobra);
    }
  }

  /* ------------------------------------------------------------------
   * 7. Montaje
   *    La plantilla se recorre una vez: cada elemento guarda sus hijos y
   *    sus atributos ya clasificados (fijos, con enlaces, eventos, value).
   * ---------------------------------------------------------------- */
  function specDe(node) {
    var name = node.localName, svg = node.namespaceURI === SVG_NS, attrs = [];
    for (var a = 0; a < node.attributes.length; a++) {
      var attrName = node.attributes[a].name, raw = node.attributes[a].value, lower = attrName.toLowerCase();

      // El exportador del diseno escribe los manejadores como
      // sc-camel-on-click / sc-camel-on-change; se aceptan ambas formas.
      if (lower === 'onclick' || lower === 'sc-camel-on-click') { attrs.push({ evento: 'click', raw: raw }); continue; }
      if (lower === 'onchange' || lower === 'sc-camel-on-change') {
        // React dispara onChange en cada tecla; en el DOM eso es "input".
        // Para <input type="file"> el evento correcto sigue siendo "change".
        var file = name === 'input' && (node.getAttribute('type') || '').toLowerCase() === 'file';
        attrs.push({ evento: file ? 'change' : 'input', raw: raw });
        continue;
      }
      if (lower === 'value' && (name === 'input' || name === 'select')) { attrs.push({ valor: true, raw: raw }); continue; }
      // style-hover / style-active son notas del exportador: el navegador no las usa
      // (la respuesta al tocar la da [data-toque] en styles.css).
      if (lower === 'as' || lower === 'list' || lower.indexOf('hint-') === 0 || lower === 'style-hover' || lower === 'style-active') continue;

      // El exportador escribe los atributos camelCase de SVG en kebab-case
      // con prefijo (sc-camel-view-box -> viewBox). Sin esto el SVG no escala.
      if (lower.indexOf('sc-camel-') === 0) {
        attrName = lower.slice(9).replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
      }
      // En HTML el navegador guarda los nombres en minúsculas: así se comparan igual.
      if (!svg) attrName = attrName.toLowerCase();
      attrs.push({ name: attrName, raw: raw, dyn: raw.indexOf('{{') !== -1 });
    }
    return { ns: svg ? SVG_NS : null, attrs: attrs };
  }

  /* Los saltos de línea con sangría del archivo (index.html) son nodos de texto
     invisibles: eran casi dos de cada tres nodos de la pantalla. Se quitan solo
     donde el navegador de todos modos no los muestra: dentro de un flex/grid,
     dentro de un SVG o entre dos bloques. */
  var BLOQUES = { div: 1, p: 1, ol: 1, ul: 1, li: 1, h1: 1, h2: 1, h3: 1, section: 1, template: 1, style: 1, script: 1 };
  function esBloque(n) {
    if (!n) return true;
    if (n.nodeType !== 1) return false;
    var nombre = n.localName;
    if (BLOQUES[nombre]) return true;
    if (nombre === 'sc-if' || nombre === 'sc-for') {
      for (var c = n.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3 && /\S/.test(c.nodeValue)) return false;
        if (c.nodeType === 1 && !esBloque(c)) return false;
      }
      return true;
    }
    return false;
  }
  function sinRelleno(lista, padre) {
    var estilo = padre && padre.getAttribute ? (padre.getAttribute('style') || '') : '';
    var flex = /display:\s*(inline-)?(flex|grid)/.test(estilo) || (padre && padre.namespaceURI === SVG_NS);
    return lista.filter(function (n) {
      if (n.nodeType !== 3 || /\S/.test(n.nodeValue) || n.nodeValue.indexOf('\n') === -1) return true;
      if (flex) return false;
      return !(esBloque(n.previousSibling) && esBloque(n.nextSibling));
    });
  }

  function indexTemplate(nodes, padre) {
    var counter = 0;
    var raiz = sinRelleno(nodes, padre);
    (function walk(list, real) {
      for (var i = 0; i < list.length; i++) {
        var node = list[i];
        if (node.nodeType !== 1) continue;
        node.__tid = ++counter;
        var transparente = node.localName === 'sc-if' || node.localName === 'sc-for';
        // sc-if y sc-for no generan elemento: sus hijos van dentro del elemento real de arriba.
        var dentroDe = transparente ? real : node;
        node.__children = sinRelleno(Array.prototype.slice.call(node.childNodes), dentroDe);
        if (node.localName === 'sc-if') node.__si = node.getAttribute('value') || '';
        else if (node.localName === 'sc-for') {
          node.__lista = node.getAttribute('list') || '';
          node.__alias = node.getAttribute('as') || 'item';
        } else node.__spec = specDe(node);
        walk(node.__children, dentroDe);
      }
    })(raiz, padre);
    return raiz;
  }

  function mount(options) {
    var tplEl = document.getElementById(options.template);
    var root = document.getElementById(options.root);

    if (!tplEl || !root) throw new Error('Pilares: falta la plantilla o el contenedor raiz.');

    var tplNodes = indexTemplate(Array.prototype.slice.call(tplEl.content.childNodes), root);

    var component = new options.Component(options.props || {});
    var pending = null;
    var mounted = false;

    var host = {
      component: component,
      invalidate: function () {
        if (pending !== null) return;
        pending = global.requestAnimationFrame(function () {
          pending = null;
          host.render();
        });
      },
      render: function () {
        var vals = component.renderVals();
        var kids = [];
        buildList(tplNodes, kids, new Scope(null, null, null, 'r'), { vals: vals });
        morphKids(root, kids);
        if (mounted && typeof component.componentDidUpdate === 'function') component.componentDidUpdate();
        if (typeof options.onRender === 'function') options.onRender(component, vals);
      }
    };

    component.__host = host;
    host.render();
    mounted = true;
    if (typeof component.componentDidMount === 'function') component.componentDidMount();

    return host;
  }

  global.Pilares = { mount: mount };
})(window);
