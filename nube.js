/* =====================================================================
 * Pilares · nube
 * ---------------------------------------------------------------------
 * Cuentas con usuario + contrasena (sin correo) y guardado en Supabase.
 *
 * El estado de la app se convierte en filas de la base de datos y se
 * compara contra la ultima version que el servidor ya tiene: solo viajan
 * las filas que cambiaron. Si no hay conexion, los cambios quedan
 * pendientes y se reintentan solos.
 * ================================================================== */
(function (global) {
  'use strict';

  var URL_SB = 'https://muawlxszfibohwhwnsng.supabase.co';
  // Clave publica: esta hecha para ir en el navegador. Lo que protege los
  // datos son las politicas de seguridad por fila de la base de datos.
  var CLAVE_PUBLICA = 'sb_publishable_2KSrLx1N8Wt9wZp_FOOOaQ_2qVG6fAA';
  // Correo interno de cada cuenta. El dominio .invalid esta reservado y no
  // existe, asi que nunca se envia ni se recibe nada ahi.
  var DOMINIO = 'usuarios.pilares.invalid';

  var sb = global.supabase.createClient(URL_SB, CLAVE_PUBLICA, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: 'pilares.sesion' },
  });

  function correoDe(usuario) {
    var u = String(usuario || '').trim();
    // Las cuentas creadas antes con correo real siguen entrando con el correo.
    return u.indexOf('@') >= 0 ? u.toLowerCase() : u.toLowerCase() + '@' + DOMINIO;
  }

  function usuarioDe(email) {
    email = email || '';
    var sufijo = '@' + DOMINIO;
    return email.slice(-sufijo.length) === sufijo ? email.slice(0, -sufijo.length) : email;
  }

  function uuid() {
    if (global.crypto && global.crypto.randomUUID) return global.crypto.randomUUID();
    var b = global.crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    var h = Array.prototype.map.call(b, function (x) { return (x + 256).toString(16).slice(1); }).join('');
    return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
  }

  function pad(n) { return String(n).padStart(2, '0'); }
  function haceDias(n) {
    var d = new Date(); d.setDate(d.getDate() - n);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  /* ------------------------------------------------------------------
   * Cuentas
   * ---------------------------------------------------------------- */
  function mensajeDe(err) {
    var m = (err && err.message) || '';
    if (/invalid login/i.test(m)) return 'Usuario o contraseña incorrectos.';
    if (/fetch|network/i.test(m)) return 'Sin conexión. Revisa tu internet e intenta de nuevo.';
    if (/rate limit|too many/i.test(m)) return 'Demasiados intentos. Espera un momento.';
    return m || 'Algo salió mal. Intenta de nuevo.';
  }

  async function sesion() {
    var r = await sb.auth.getSession();
    return r.data ? r.data.session : null;
  }

  async function entrar(usuario, clave) {
    var r = await sb.auth.signInWithPassword({ email: correoDe(usuario), password: clave });
    if (r.error) throw new Error(mensajeDe(r.error));
    return r.data.session;
  }

  async function crear(usuario, nombre, clave) {
    var resp, body = {};
    try {
      resp = await fetch(URL_SB + '/functions/v1/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: CLAVE_PUBLICA },
        body: JSON.stringify({ usuario: usuario, nombre: nombre, clave: clave }),
      });
      body = await resp.json();
    } catch (e) {
      throw new Error('Sin conexión. Revisa tu internet e intenta de nuevo.');
    }
    if (!resp.ok) throw new Error(body.error || 'No se pudo crear la cuenta.');
    return entrar(usuario, clave);
  }

  async function salir() {
    try { await sb.auth.signOut(); } catch (e) {}
  }

  /* ------------------------------------------------------------------
   * Lectura: todo lo del usuario, con la forma que usa la app
   * ---------------------------------------------------------------- */
  async function cargar(uid) {
    var q = await Promise.all([
      sb.from('perfiles').select('nombre,altura,peso,sexo,codigo').eq('id', uid).single(),
      // Trae mis cuadernos y los de mis amigos (para asignarles actividades).
      sb.from('cuadernos').select('id,user_id,nombre,orden,creado_en').order('orden').order('creado_en'),
      sb.from('archivos').select('id,cuaderno_id,nombre,tamano,creado_en').eq('user_id', uid).order('creado_en'),
      // Las mias y las que yo asigne a amigos.
      sb.from('actividades').select('id,user_id,cuaderno_id,tipo,fecha,asunto,asignado_por,nota').order('fecha'),
      sb.from('sesiones').select('fecha,grupo,abbr,dia,ejercicios').eq('user_id', uid).gte('fecha', haceDias(120)),
      // Las que cree y las que otra persona compartio conmigo.
      sb.from('libretas').select('id,user_id,contraparte_id,deudor,prestamista,monto,mine,paid,nota,vence_el,creado_en').order('creado_en', { ascending: false }),
      sb.from('abonos').select('id,libreta_id,monto,nota,registrado_por,creado_en').order('creado_en'),
      sb.rpc('mis_conexiones'),
    ]);
    for (var i = 0; i < q.length; i++) if (q[i].error) throw q[i].error;

    var perfil = q[0].data || {};
    var cuadernos = [], cuadAmigos = {};
    q[1].data.forEach(function (c) {
      var item = { id: c.id, nombre: c.nombre };
      if (c.user_id === uid) cuadernos.push(item);
      else (cuadAmigos[c.user_id] = cuadAmigos[c.user_id] || []).push(item);
    });

    var files = {};
    q[2].data.forEach(function (f) {
      (files[f.cuaderno_id] = files[f.cuaderno_id] || []).push({ id: f.id, n: f.nombre, s: f.tamano });
    });

    var acts = q[3].data.map(function (a) {
      return { id: a.id, c: a.cuaderno_id, tipo: a.tipo, fecha: a.fecha, asunto: a.asunto || [],
               owner: a.user_id, por: a.asignado_por, nota: a.nota || '' };
    });

    var logs = {};
    q[4].data.forEach(function (s) {
      logs[s.fecha] = { fecha: s.fecha, group: s.grupo, abbr: s.abbr, dia: s.dia, ex: s.ejercicios || [] };
    });

    var abonos = {};
    q[6].data.forEach(function (a) {
      (abonos[a.libreta_id] = abonos[a.libreta_id] || []).push({
        id: a.id, monto: String(Math.round(+a.monto)), nota: a.nota || '',
        por: a.registrado_por, fecha: String(a.creado_en).slice(0, 10),
      });
    });

    var libs = q[5].data.map(function (l) {
      return { id: l.id, owner: l.user_id, contra: l.contraparte_id, deudor: l.deudor, prestamista: l.prestamista,
               monto: String(Math.round(+l.monto)), mine: l.mine, paid: l.paid, nota: l.nota || '',
               vence: l.vence_el || '', abonos: abonos[l.id] || [] };
    });

    var amigos = (q[7].data || []).map(function (c) {
      return { conexion: c.conexion_id, id: c.otro_id, nombre: c.nombre, codigo: c.codigo,
               estado: c.estado, yo: c.soy_solicitante };
    });

    return {
      profile: { nombre: perfil.nombre || '', altura: perfil.altura || '', peso: perfil.peso || '', sexo: perfil.sexo || '' },
      codigo: perfil.codigo || '',
      cuadernos: cuadernos, files: files, acts: acts, logs: logs, libs: libs,
      amigos: amigos, cuadAmigos: cuadAmigos,
    };
  }

  /* ------------------------------------------------------------------
   * Escritura: estado de la app -> filas -> diferencias -> Supabase
   * ---------------------------------------------------------------- */
  var TABLAS = ['perfiles', 'cuadernos', 'archivos', 'actividades', 'sesiones', 'libretas', 'abonos'];
  // Altas y cambios de padres a hijos; bajas de hijos a padres.
  var ORDEN_BAJAS = ['abonos', 'libretas', 'sesiones', 'actividades', 'archivos', 'cuadernos'];

  /** d = { profile, cuadernos, files, acts, sesiones, libs } */
  function filas(d, uid) {
    var t = {};
    TABLAS.forEach(function (k) { t[k] = {}; });

    var p = d.profile || {};
    t.perfiles[uid] = { nombre: p.nombre || '', altura: p.altura || '', peso: p.peso || '', sexo: p.sexo || '' };

    (d.cuadernos || []).forEach(function (c, i) {
      t.cuadernos[c.id] = { id: c.id, user_id: uid, nombre: c.nombre || '', orden: i };
    });

    Object.keys(d.files || {}).forEach(function (cid) {
      if (!t.cuadernos[cid]) return;
      d.files[cid].forEach(function (f) {
        t.archivos[f.id] = { id: f.id, user_id: uid, cuaderno_id: cid, nombre: f.n || '', tamano: f.s || '' };
      });
    });

    (d.acts || []).forEach(function (a) {
      t.actividades[a.id] = { id: a.id, user_id: a.owner || uid, cuaderno_id: a.c || null, tipo: a.tipo,
                              fecha: a.fecha, asunto: a.asunto || [], asignado_por: a.por || null, nota: a.nota || '' };
    });

    Object.keys(d.sesiones || {}).forEach(function (fecha) {
      var s = d.sesiones[fecha];
      t.sesiones[fecha] = { user_id: uid, fecha: fecha, grupo: s.group || '', abbr: s.abbr || '',
                            dia: s.dia || 0, ejercicios: s.ex || [] };
    });

    (d.libs || []).forEach(function (l) {
      t.libretas[l.id] = { id: l.id, user_id: l.owner || uid, contraparte_id: l.contra || null,
                           deudor: l.deudor || '', prestamista: l.prestamista || '', monto: +l.monto || 0,
                           mine: !!l.mine, paid: !!l.paid, nota: l.nota || '', vence_el: l.vence || null };
      (l.abonos || []).forEach(function (a) {
        t.abonos[a.id] = { id: a.id, libreta_id: l.id, monto: +a.monto || 0, nota: a.nota || '',
                           registrado_por: a.por || uid };
      });
    });

    // Como texto: comparar dos versiones es comparar cadenas.
    TABLAS.forEach(function (k) {
      Object.keys(t[k]).forEach(function (id) { t[k][id] = JSON.stringify(t[k][id]); });
    });
    return t;
  }

  function pendientes(base, actual) {
    var ops = [];
    TABLAS.forEach(function (tabla) {
      var b = base[tabla] || {}, a = actual[tabla] || {};
      Object.keys(a).forEach(function (id) {
        if (!(id in b)) ops.push({ tipo: 'alta', tabla: tabla, id: id, fila: a[id] });
        else if (b[id] !== a[id]) ops.push({ tipo: 'cambio', tabla: tabla, id: id, fila: a[id] });
      });
    });
    ORDEN_BAJAS.forEach(function (tabla) {
      var b = base[tabla] || {}, a = actual[tabla] || {};
      Object.keys(b).forEach(function (id) {
        if (!(id in a)) ops.push({ tipo: 'baja', tabla: tabla, id: id });
      });
    });
    return ops;
  }

  async function ejecutar(op, uid) {
    var fila = op.fila ? JSON.parse(op.fila) : null;
    var t = op.tabla, r;

    if (t === 'perfiles') {
      r = await sb.from('perfiles').update(fila).eq('id', uid);
    } else if (t === 'sesiones') {
      r = op.tipo === 'baja'
        ? await sb.from('sesiones').delete().eq('user_id', uid).eq('fecha', op.id)
        : await sb.from('sesiones').upsert(fila, { onConflict: 'user_id,fecha' });
    } else if (op.tipo === 'alta') {
      r = await sb.from(t).insert(fila);
    } else if (op.tipo === 'cambio') {
      // update y no upsert: la otra parte de una libreta o de una actividad
      // compartida puede editarla, pero las reglas no le dejan insertarla.
      delete fila.id;
      r = await sb.from(t).update(fila).eq('id', op.id);
    } else {
      r = await sb.from(t).delete().eq('id', op.id);
    }
    return r.error;
  }

  function reintentable(err) {
    // Sin codigo = no hubo respuesta del servidor; PGRST30x = sesion vencida.
    return !err.code || /^PGRST30/.test(err.code) || /jwt|fetch|network/i.test(err.message || '');
  }

  function copiar(base) {
    var c = {};
    TABLAS.forEach(function (k) { c[k] = Object.assign({}, base[k] || {}); });
    return c;
  }

  /** Envia las diferencias en orden. Devuelve la nueva base (lo que el
   *  servidor ya tiene), si se corto por red y cuantos cambios rechazo. */
  async function sincronizar(base, actual, uid) {
    var nueva = copiar(base);
    var ops = pendientes(base, actual);
    var rechazados = 0;

    for (var i = 0; i < ops.length; i++) {
      var op = ops[i], err;
      try { err = await ejecutar(op, uid); } catch (e) { err = { message: String(e && e.message || e) }; }

      if (err && reintentable(err)) return { base: nueva, red: true, rechazados: rechazados };
      if (err) {
        // Rechazo definitivo (p. ej. permisos): no se reintenta en bucle; la
        // app vuelve a leer del servidor para quedar alineada.
        rechazados++;
        console.warn('[pilares] no se guardo', op.tabla, op.tipo, err.message || err);
      }
      if (op.tipo === 'baja') delete nueva[op.tabla][op.id];
      else nueva[op.tabla][op.id] = op.fila;
    }
    return { base: nueva, red: false, rechazados: rechazados };
  }

  /* ------------------------------------------------------------------
   * Amigos
   * ---------------------------------------------------------------- */
  async function buscarCodigo(codigo) {
    var r = await sb.rpc('buscar_por_codigo', { p_codigo: codigo });
    if (r.error) throw new Error(mensajeDe(r.error));
    return (r.data || [])[0] || null;
  }

  async function invitar(uid, otroId) {
    var r = await sb.from('conexiones').insert({ solicitante_id: uid, destinatario_id: otroId });
    if (r.error) {
      if (r.error.code === '23505') throw new Error('Ya hay una solicitud entre ustedes.');
      throw new Error(mensajeDe(r.error));
    }
  }

  async function aceptar(conexionId) {
    var r = await sb.from('conexiones').update({ estado: 'aceptada' }).eq('id', conexionId);
    if (r.error) throw new Error(mensajeDe(r.error));
  }

  async function borrarConexion(conexionId) {
    var r = await sb.from('conexiones').delete().eq('id', conexionId);
    if (r.error) throw new Error(mensajeDe(r.error));
  }

  global.Nube = {
    cliente: sb, uuid: uuid, usuarioDe: usuarioDe,
    sesion: sesion, entrar: entrar, crear: crear, salir: salir,
    cargar: cargar, filas: filas, pendientes: pendientes, sincronizar: sincronizar,
    buscarCodigo: buscarCodigo, invitar: invitar, aceptar: aceptar, borrarConexion: borrarConexion,
  };
})(window);
