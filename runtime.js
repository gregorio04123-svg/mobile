/* =====================================================================
 * Pilares · runtime
 * ---------------------------------------------------------------------
 * Interpreta la misma plantilla del prototipo (<sc-if>, <sc-for> y los
 * enlaces {{ ... }}) directamente sobre el DOM, sin dependencias ni
 * paso de compilacion.
 *
 * El arbol se reconstruye en cada cambio de estado y luego se fusiona
 * ("morph") contra el DOM vivo: los nodos que no cambian de identidad se
 * reutilizan, asi no se pierde el foco del teclado, el cursor de texto,
 * la posicion de scroll ni se reinician las animaciones CSS.
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
   *    Solo se usan rutas simples: "nombre" o "item.campo".
   * ---------------------------------------------------------------- */
  var BINDING = /\{\{\s*([^}]+?)\s*\}\}/g;
  var SINGLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;

  function Scope(parent, name, value, key) {
    this.parent = parent;
    this.name = name;
    this.value = value;
    this.key = key;
  }

  function resolve(expr, scope, vals) {
    expr = expr.trim();
    if (expr === 'true') return true;
    if (expr === 'false') return false;
    if (expr === 'null') return null;
    if (/^-?\d+(?:\.\d+)?$/.test(expr)) return parseFloat(expr);

    var parts = expr.split('.');
    var head = parts[0];
    var current;
    var found = false;

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

  /** Devuelve el valor crudo si la cadena es exactamente un enlace,
   *  o la cadena interpolada en cualquier otro caso. */
  function interpolate(raw, scope, vals) {
    var only = raw.match(SINGLE);
    if (only) return resolve(only[1], scope, vals);
    return raw.replace(BINDING, function (_, expr) {
      var v = resolve(expr, scope, vals);
      return v == null ? '' : String(v);
    });
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
   * 5. Construccion del arbol nuevo a partir de la plantilla
   * ---------------------------------------------------------------- */
  function buildList(tplNodes, target, scope, ctx) {
    for (var i = 0; i < tplNodes.length; i++) build(tplNodes[i], target, scope, ctx);
  }

  function buildText(raw, target, scope, ctx) {
    if (raw.indexOf('{{') === -1) {
      target.appendChild(document.createTextNode(raw));
      return;
    }
    var last = 0, match;
    BINDING.lastIndex = 0;

    while ((match = BINDING.exec(raw)) !== null) {
      if (match.index > last) {
        target.appendChild(document.createTextNode(raw.slice(last, match.index)));
      }
      var value = resolve(match[1], scope, ctx.vals);
      if (value != null && value !== false) {
        target.appendChild(value.nodeType
          ? value                                   // p. ej. los iconos SVG
          : document.createTextNode(String(value)));
      }
      last = match.index + match[0].length;
    }
    if (last < raw.length) {
      target.appendChild(document.createTextNode(raw.slice(last)));
    }
  }

  function build(tpl, target, scope, ctx) {
    if (tpl.nodeType === 3) { buildText(tpl.nodeValue, target, scope, ctx); return; }
    if (tpl.nodeType !== 1) return;

    var name = tpl.localName;

    if (name === 'sc-if') {
      var cond = interpolate(tpl.getAttribute('value') || '', scope, ctx.vals);
      if (truthy(cond)) buildList(tpl.__children, target, scope, ctx);
      return;
    }

    if (name === 'sc-for') {
      var list = interpolate(tpl.getAttribute('list') || '', scope, ctx.vals);
      if (!list || !list.length) return;
      var alias = tpl.getAttribute('as') || 'item';
      for (var i = 0; i < list.length; i++) {
        buildList(
          tpl.__children,
          target,
          new Scope(scope, alias, list[i], scope.key + '/' + tpl.__tid + '#' + i),
          ctx
        );
      }
      return;
    }

    var isSvg = tpl.namespaceURI === SVG_NS;
    var el = isSvg ? document.createElementNS(SVG_NS, name) : document.createElement(name);
    var key = scope.key + '/' + tpl.__tid;
    var hasValue = false, valueText = '';

    for (var a = 0; a < tpl.attributes.length; a++) {
      var attrName = tpl.attributes[a].name;
      var attrRaw = tpl.attributes[a].value;
      var lower = attrName.toLowerCase();

      // El exportador del diseno escribe los manejadores como
      // sc-camel-on-click / sc-camel-on-change; se aceptan ambas formas.
      var isClick = (lower === 'onclick' || lower === 'sc-camel-on-click');
      var isChange = (lower === 'onchange' || lower === 'sc-camel-on-change');

      if (isClick || isChange) {
        var fn = interpolate(attrRaw, scope, ctx.vals);
        if (typeof fn === 'function') {
          var type = 'click';
          if (isChange) {
            // React dispara onChange en cada tecla; en el DOM eso es "input".
            // Para <input type="file"> el evento correcto sigue siendo "change".
            type = (name === 'input' && (tpl.getAttribute('type') || '').toLowerCase() === 'file')
              ? 'change' : 'input';
          }
          setHandler(el, type, fn);
        }
        continue;
      }

      if (lower === 'value' && name === 'input') {
        var v = interpolate(attrRaw, scope, ctx.vals);
        hasValue = true;
        valueText = (v == null ? '' : String(v));
        continue;
      }

      if (lower === 'as' || lower === 'list' || lower.indexOf('hint-') === 0) continue;

      // El exportador escribe los atributos camelCase de SVG en kebab-case
      // con prefijo (sc-camel-view-box -> viewBox). Sin esto el SVG no escala.
      if (lower.indexOf('sc-camel-') === 0) {
        attrName = lower.slice(9).replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
      }

      if (attrRaw.indexOf('{{') === -1) {
        el.setAttribute(attrName, attrRaw);
      } else {
        var out = interpolate(attrRaw, scope, ctx.vals);
        el.setAttribute(attrName, out == null ? '' : String(out));
      }
    }

    el.setAttribute('data-k', key);
    buildList(tpl.__children, el, scope, ctx);

    if (hasValue) { el.__value = valueText; el.value = valueText; }
    target.appendChild(el);
  }

  /* ------------------------------------------------------------------
   * 6. Fusion del arbol nuevo contra el DOM vivo
   * ---------------------------------------------------------------- */
  function sameNode(a, b) {
    if (a.nodeType !== b.nodeType) return false;
    if (a.nodeType === 3) return true;
    if (a.nodeType !== 1) return false;
    if (a.localName !== b.localName) return false;
    return a.getAttribute('data-k') === b.getAttribute('data-k');
  }

  function syncAttributes(oldEl, newEl) {
    var i, attr;
    for (i = newEl.attributes.length - 1; i >= 0; i--) {
      attr = newEl.attributes[i];
      if (oldEl.getAttribute(attr.name) !== attr.value) oldEl.setAttribute(attr.name, attr.value);
    }
    for (i = oldEl.attributes.length - 1; i >= 0; i--) {
      attr = oldEl.attributes[i];
      if (!newEl.hasAttribute(attr.name)) oldEl.removeAttribute(attr.name);
    }
  }

  function syncHandlers(oldEl, newEl) {
    var type;
    if (newEl.__handlers) {
      for (type in newEl.__handlers) setHandler(oldEl, type, newEl.__handlers[type]);
    }
    if (oldEl.__handlers) {
      for (type in oldEl.__handlers) {
        if (!newEl.__handlers || !(type in newEl.__handlers)) oldEl.__handlers[type] = null;
      }
    }
  }

  function morph(oldEl, newEl) {
    syncAttributes(oldEl, newEl);
    syncHandlers(oldEl, newEl);

    if (newEl.__value !== undefined) {
      oldEl.__value = newEl.__value;
      // No tocar el campo que el usuario esta escribiendo si ya coincide:
      // asi el cursor se queda donde esta.
      if (oldEl.value !== newEl.__value) oldEl.value = newEl.__value;
    }
    morphChildren(oldEl, newEl);
  }

  function morphChildren(oldParent, newParent) {
    var oldNode = oldParent.firstChild;
    var newNode = newParent.firstChild;

    while (newNode) {
      var nextNew = newNode.nextSibling;

      if (!oldNode) {
        oldParent.appendChild(newNode);
        newNode = nextNew;
        continue;
      }

      var nextOld = oldNode.nextSibling;

      if (sameNode(oldNode, newNode)) {
        if (oldNode.nodeType === 3) {
          if (oldNode.nodeValue !== newNode.nodeValue) oldNode.nodeValue = newNode.nodeValue;
        } else {
          morph(oldNode, newNode);
        }
      } else {
        oldParent.replaceChild(newNode, oldNode);
      }

      oldNode = nextOld;
      newNode = nextNew;
    }

    while (oldNode) {
      var toRemove = oldNode;
      oldNode = oldNode.nextSibling;
      oldParent.removeChild(toRemove);
    }
  }

  /* ------------------------------------------------------------------
   * 7. Montaje
   * ---------------------------------------------------------------- */
  function indexTemplate(nodes) {
    var counter = 0;
    (function walk(list) {
      for (var i = 0; i < list.length; i++) {
        var node = list[i];
        if (node.nodeType !== 1) continue;
        node.__tid = ++counter;
        node.__children = Array.prototype.slice.call(node.childNodes);
        walk(node.__children);
      }
    })(nodes);
  }

  function mount(options) {
    var tplEl = document.getElementById(options.template);
    var root = document.getElementById(options.root);

    if (!tplEl || !root) throw new Error('Pilares: falta la plantilla o el contenedor raiz.');

    var tplNodes = Array.prototype.slice.call(tplEl.content.childNodes);
    indexTemplate(tplNodes);

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
        var fragment = document.createDocumentFragment();
        buildList(tplNodes, fragment, new Scope(null, null, null, 'r'), { vals: vals });
        morphChildren(root, fragment);
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
