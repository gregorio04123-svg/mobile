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
  // Clave pública VAPID (Web Push). La privada vive en Vault, en Supabase.
  var VAPID_PUBLICA = 'BD2mpc_TALmqNCpa1M6xRybU0zr5HHN7eaT7k_lEpL6WpwfWCKE-NNa03TUY_sEpr4-h2L4J6hlGFyVLDoBURSo';

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
  // Fecha del dispositivo (no la de UTC del servidor, que en Colombia va 5 h adelante).
  function fechaLocal(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
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

  /** Avisa si la sesion deja de valer (p. ej. la cuenta se borro). Los
   *  fallos de red no cierran la sesion: solo un rechazo del servidor. */
  function alPerderSesion(fn) {
    sb.auth.onAuthStateChange(function (evento) { if (evento === 'SIGNED_OUT') fn(); });
  }

  /* ------------------------------------------------------------------
   * Lectura: todo lo del usuario, con la forma que usa la app
   * ---------------------------------------------------------------- */
  async function cargar(uid) {
    var q = await Promise.all([
      sb.from('perfiles').select('nombre,codigo,avisos_leidos_hasta,tipos_actividad').eq('id', uid).single(),
      // Trae mis cuadernos y los de mis amigos (para asignarles actividades).
      sb.from('cuadernos').select('id,user_id,nombre,orden,creado_en').order('orden').order('creado_en'),
      sb.from('archivos').select('id,cuaderno_id,nombre,tamano,creado_en').eq('user_id', uid).order('creado_en'),
      // Las mias y las que yo asigne a amigos.
      sb.from('actividades').select('id,user_id,cuaderno_id,tipo,fecha,asunto,asignado_por,nota,con_urgencia,grupo_id,lote').order('fecha'),
      sb.from('sesiones').select('fecha,grupo,abbr,dia,ejercicios,grupo_id').eq('user_id', uid).gte('fecha', haceDias(120)),
      // Las que cree y las que otra persona compartio conmigo.
      sb.from('libretas').select('id,user_id,contraparte_id,deudor,prestamista,monto,mine,paid,nota,vence_el,enviada,gasto,creado_en').order('creado_en', { ascending: false }),
      sb.from('abonos').select('id,libreta_id,monto,nota,registrado_por,creado_en').order('creado_en'),
      sb.rpc('mis_conexiones'),
      sb.from('grupos').select('id,nombre,abbr,color,musculo,orden,ejercicios').eq('user_id', uid).order('orden').order('creado_en'),
      sb.from('rutinas').select('plan').eq('user_id', uid).maybeSingle(),
      // Rutinas que un amigo me envió y aún no respondo.
      sb.from('rutinas_compartidas').select('id,de_id,de_nombre,tipo,contenido,creado_en,grupo_id,lote').eq('para_id', uid).order('creado_en'),
      // Los últimos avisos (los de prueba no se listan).
      sb.from('avisos').select('id,tipo,titulo,cuerpo,ref,fecha,creado_en').eq('user_id', uid).neq('tipo', 'prueba')
        .order('creado_en', { ascending: false }).limit(30),
      // Un renglón por conversación: último mensaje y cuántos no he leído.
      sb.rpc('mis_chats'),
      // Mis grupos de amigos y las libreticas de grupo en las que estoy.
      sb.rpc('mis_grupos'),
      sb.rpc('libretas_grupo_de'),
      // Los nombres que les puse a mis amigos (solo yo los veo).
      sb.from('apodos').select('amigo_id,apodo'),
    ]);
    for (var i = 0; i < q.length; i++) if (q[i].error) throw q[i].error;

    var apodos = {};
    (q[15].data || []).forEach(function (a) { apodos[a.amigo_id] = a.apodo; });
    var perfil = q[0].data || {};
    var grupos = (q[8].data || []).map(function (g) {
      return { id: g.id, nombre: g.nombre, abbr: g.abbr, color: g.color, musculo: g.musculo, ejercicios: g.ejercicios || [] };
    });
    var plan = (q[9].data && Array.isArray(q[9].data.plan) && q[9].data.plan.length === 7)
      ? q[9].data.plan : [null, null, null, null, null, null, null];
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
      // g y lote (actividad de grupo) solo se leen: nunca viajan en `filas`.
      return { id: a.id, c: a.cuaderno_id, tipo: a.tipo, fecha: a.fecha, asunto: a.asunto || [],
               owner: a.user_id, por: a.asignado_por, nota: a.nota || '', urg: a.con_urgencia !== false,
               g: a.grupo_id || null, lote: a.lote || null };
    });

    var logs = {};
    q[4].data.forEach(function (s) {
      logs[s.fecha] = { fecha: s.fecha, gid: s.grupo_id, group: s.grupo, abbr: s.abbr, dia: s.dia, ex: s.ejercicios || [] };
    });

    var abonos = {};
    q[6].data.forEach(function (a) {
      (abonos[a.libreta_id] = abonos[a.libreta_id] || []).push({
        id: a.id, monto: String(Math.round(+a.monto)), nota: a.nota || '',
        por: a.registrado_por, fecha: fechaLocal(a.creado_en),
      });
    });

    var libs = q[5].data.map(function (l) {
      return { id: l.id, owner: l.user_id, contra: l.contraparte_id, deudor: l.deudor, prestamista: l.prestamista,
               monto: String(Math.round(+l.monto)), mine: l.mine, paid: l.paid, nota: l.nota || '',
               vence: l.vence_el || '', enviada: !!l.enviada, gasto: !!l.gasto, en: l.creado_en, abonos: abonos[l.id] || [] };
    });

    // nombre: el que tiene en Pilares (el que ven los demás); apodo: el mío para él.
    var amigos = (q[7].data || []).map(function (c) {
      return { conexion: c.conexion_id, id: c.otro_id, nombre: c.nombre, codigo: c.codigo,
               estado: c.estado, yo: c.soy_solicitante, apodo: apodos[c.otro_id] || '' };
    });

    return {
      profile: { nombre: perfil.nombre || '', tipos: Array.isArray(perfil.tipos_actividad) ? perfil.tipos_actividad : null },
      avisosLeidos: perfil.avisos_leidos_hasta || null,
      chats: (q[12].data || []).map(chatDe),
      gAmigos: (q[13].data || []).map(grupoDe),
      libsG: (q[14].data || []).map(libretaGrupoDe),
      avisos: (q[11].data || []).map(function (a) {
        return { id: a.id, tipo: a.tipo, titulo: a.titulo, cuerpo: a.cuerpo || '', ref: a.ref, fecha: a.fecha, creado: a.creado_en };
      }),
      codigo: perfil.codigo || '',
      cuadernos: cuadernos, files: files, acts: acts, logs: logs, libs: libs,
      amigos: amigos, cuadAmigos: cuadAmigos, grupos: grupos, plan: plan,
      invRutinas: (q[10].data || []).map(function (r) {
        return { id: r.id, de: r.de_id, deNombre: r.de_nombre, tipo: r.tipo, contenido: r.contenido, creado: r.creado_en,
                 grupo: r.grupo_id || null, lote: r.lote || null };
      }),
    };
  }

  function chatDe(c) {
    return { otro: c.otro_id, tipo: c.tipo, texto: c.texto || '', datos: c.datos || null, de: c.de_id, en: c.creado_en,
             sinLeer: c.sin_leer || 0, sinLeerTexto: c.sin_leer_texto || 0 };
  }

  function grupoDe(g) {
    var u = g.ult;
    return {
      id: g.id, nombre: g.nombre || '', unido: g.unido_en,
      miembros: (g.miembros || []).map(function (m) { return { id: m.id, nombre: m.nombre || '', unido: m.unido }; }),
      ult: u ? { tipo: u.tipo, texto: u.texto || '', datos: u.datos || null, de: u.de_id, deNombre: u.de_nombre || '', en: u.creado_en } : null,
      sinLeer: g.sin_leer || 0, sinLeerTexto: g.sin_leer_texto || 0,
    };
  }

  function libretaGrupoDe(l) {
    return {
      id: l.id, grupo: l.grupo_id, grupoNombre: l.grupo_nombre || '', creador: l.creado_por, creadorNombre: l.creador_nombre || '',
      total: Math.round(+l.total), nota: l.nota || '', en: l.creado_en,
      partes: (l.partes || []).map(function (p) {
        return {
          id: p.id, nombre: p.nombre || '', monto: Math.round(+p.monto), pagado: !!p.pagado_en,
          abonos: (p.abonos || []).map(function (a) { return { id: a.id, monto: Math.round(+a.monto), en: a.creado_en }; }),
        };
      }),
    };
  }

  /** Crea la rutina base si a la cuenta le falta (no hace nada si ya tiene). */
  async function sembrarRutina() {
    var r = await sb.rpc('sembrar_mi_rutina');
    if (r.error) throw r.error;
  }

  /* ------------------------------------------------------------------
   * Escritura: estado de la app -> filas -> diferencias -> Supabase
   * ---------------------------------------------------------------- */
  var TABLAS = ['perfiles', 'cuadernos', 'archivos', 'actividades', 'sesiones', 'libretas', 'abonos', 'grupos', 'rutinas'];
  // Altas y cambios de padres a hijos; bajas de hijos a padres.
  var ORDEN_BAJAS = ['abonos', 'libretas', 'sesiones', 'actividades', 'archivos', 'cuadernos', 'grupos'];

  /** d = { profile, cuadernos, files, acts, sesiones, libs } */
  function filas(d, uid) {
    var t = {};
    TABLAS.forEach(function (k) { t[k] = {}; });

    var p = d.profile || {};
    var perfil = { nombre: p.nombre || '' };
    if (Array.isArray(p.tipos) && p.tipos.length) perfil.tipos_actividad = p.tipos;
    t.perfiles[uid] = perfil;

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
      // La urgencia solo viaja si se leyó del servidor o se eligió aquí: una copia
      // local vieja no la trae y no debe pisar la que el servidor ya tiene.
      if (a.urg !== undefined) t.actividades[a.id].con_urgencia = !!a.urg;
    });

    Object.keys(d.sesiones || {}).forEach(function (fecha) {
      var s = d.sesiones[fecha];
      t.sesiones[fecha] = { user_id: uid, fecha: fecha, grupo: s.group || '', abbr: s.abbr || '',
                            dia: s.dia || 0, ejercicios: s.ex || [], grupo_id: s.gid || null };
    });

    // Grupos y plan solo cuentan si ya se leyeron del servidor (ver app.js).
    if (d.rutinaLista) {
      (d.grupos || []).forEach(function (g, i) {
        t.grupos[g.id] = { id: g.id, user_id: uid, nombre: g.nombre || '', abbr: g.abbr || '', color: g.color || '#57B9A0',
                           musculo: g.musculo || '', orden: i, ejercicios: g.ejercicios || [] };
      });
      if (Array.isArray(d.plan) && d.plan.length === 7) t.rutinas[uid] = { user_id: uid, plan: d.plan };
    }

    (d.libs || []).forEach(function (l) {
      t.libretas[l.id] = { id: l.id, user_id: l.owner || uid, contraparte_id: l.contra || null,
                           deudor: l.deudor || '', prestamista: l.prestamista || '', monto: +l.monto || 0,
                           mine: !!l.mine, paid: !!l.paid, nota: l.nota || '', vence_el: l.vence || null };
      // Enviada solo viaja si se conoce (una copia local vieja no la trae).
      if (l.enviada !== undefined) t.libretas[l.id].enviada = !!l.enviada;
      // Gasto: libretica propia (gris), sin contraparte.
      if (l.gasto !== undefined) t.libretas[l.id].gasto = !!l.gasto;
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
    } else if (t === 'rutinas') {
      r = await sb.from('rutinas').upsert(fila, { onConflict: 'user_id' });
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

  /** El nombre que le pongo a un amigo; vacío lo quita (vuelve a su nombre). */
  async function guardarApodo(amigoId, apodo) {
    var r = apodo
      ? await sb.from('apodos').upsert({ amigo_id: amigoId, apodo: apodo }, { onConflict: 'dueno_id,amigo_id' })
      : await sb.from('apodos').delete().eq('amigo_id', amigoId);
    if (r.error) {
      if (r.error.code === '42501') throw new Error('Solo puedes ponerle nombre a tus amigos.');
      throw new Error(mensajeDe(r.error));
    }
  }

  /* ------------------------------------------------------------------
   * Rutinas entre amigos
   * ---------------------------------------------------------------- */
  var ERRORES_RUTINA = {
    no_amigos: 'Ya no son amigos.',
    semana_vacia: 'Tu semana no tiene grupos asignados.',
    sin_grupo: 'Ese grupo aún no está guardado. Intenta de nuevo en un momento.',
  };

  /** Envía mi semana (grupoId nulo) o uno de mis grupos. El servidor toma la
   *  foto de lo guardado: solo grupos y ejercicios, nunca pesos. */
  async function compartirRutina(amigoId, grupoId) {
    var r = await sb.rpc('compartir_rutina', { p_para: amigoId, p_grupo: grupoId || null });
    if (r.error) throw new Error(ERRORES_RUTINA[r.error.message] || mensajeDe(r.error));
  }

  /** Aceptada o rechazada, la invitación se borra. */
  async function borrarInvitacionRutina(id) {
    var r = await sb.from('rutinas_compartidas').delete().eq('id', id);
    if (r.error) throw new Error(mensajeDe(r.error));
  }

  /* ------------------------------------------------------------------
   * Chat entre amigos
   * ---------------------------------------------------------------- */
  var POR_PAGINA = 60;

  /** Mensaje de la base de datos con la forma que usa la app. */
  function mensajeApp(m) {
    return { id: m.id, de: m.de_id, para: m.para_id, tipo: m.tipo, texto: m.texto || '', ref: m.ref || null,
             datos: m.datos || null, en: m.creado_en };
  }

  /** Los últimos mensajes con un amigo (o los anteriores a una fecha), del más viejo al más nuevo. */
  async function mensajes(uid, otro, antesDe) {
    var q = sb.from('mensajes').select('id,de_id,para_id,tipo,texto,ref,datos,creado_en')
      .or('and(de_id.eq.' + uid + ',para_id.eq.' + otro + '),and(de_id.eq.' + otro + ',para_id.eq.' + uid + ')')
      .order('creado_en', { ascending: false }).limit(POR_PAGINA);
    if (antesDe) q = q.lt('creado_en', antesDe);
    var r = await q;
    if (r.error) throw new Error(mensajeDe(r.error));
    return { lista: r.data.map(mensajeApp).reverse(), hayMas: r.data.length === POR_PAGINA };
  }

  /** El id lo pone la app: así el eco del tiempo real no duplica el mensaje. */
  async function enviarMensaje(uid, id, para, texto) {
    var r = await sb.from('mensajes').insert({ id: id, de_id: uid, para_id: para, texto: texto });
    // Ya estaba guardado (un reintento de algo que sí había llegado): cuenta como enviado.
    if (r.error && r.error.code !== '23505') throw new Error(mensajeDe(r.error));
  }

  async function marcarChatLeido(otro) {
    var r = await sb.rpc('marcar_chat_leido', { p_otro: otro });
    if (r.error) throw r.error;
    return r.data;
  }

  /* ------------------------------------------------------------------
   * Grupos de amigos: chat y libreticas de grupo (todo pasa por el servidor)
   * ---------------------------------------------------------------- */
  var ERRORES_GRUPO = {
    sin_sesion: 'Tu sesión se cerró. Vuelve a entrar.',
    nombre_grupo: 'El nombre del grupo debe tener de 1 a 40 letras.',
    sin_miembros: 'Elige al menos un amigo.',
    muchos_miembros: 'Un grupo puede tener hasta 50 personas.',
    no_amigo: 'Solo puedes agregar a tus amigos.',
    no_miembro: 'Ya no estás en este grupo.',
    total: 'Escribe el total.',
    nota: 'El concepto es muy largo.',
    partes: 'Revisa quiénes consumieron y cuánto le toca a cada uno.',
    suma: 'Lo repartido debe dar exactamente el total.',
    no_deudor: 'Solo quien debe registra lo que paga.',
    monto: 'Escribe un monto válido.',
    pagada: 'Tu parte ya está pagada.',
    excede: 'Es más de lo que te falta por pagar.',
    no_abono: 'Ese abono ya no existe.',
    no_creador: 'Solo quien la creó puede borrarla.',
    tipo: 'Elige un tipo de actividad.',
    fecha: 'Elige la fecha.',
    cuaderno: 'Ese cuaderno ya no existe. Elige otro.',
    temas: 'Son demasiados temas.',
    sin_otros: 'En este grupo solo estás tú.',
    semana_vacia: 'Tu semana no tiene grupos asignados.',
    sin_grupo: 'Ese grupo aún no está guardado. Intenta de nuevo en un momento.',
  };
  async function rpcGrupo(nombre, args) {
    var r = await sb.rpc(nombre, args);
    if (r.error) throw new Error(ERRORES_GRUPO[r.error.message] || mensajeDe(r.error));
    return r.data;
  }

  function mensajeGrupoApp(m) {
    return { id: m.id, g: m.grupo_id, de: m.de_id, deNombre: m.de_nombre || '', tipo: m.tipo, texto: m.texto || '',
             ref: m.ref || null, datos: m.datos || null, en: m.creado_en };
  }

  /** Los últimos mensajes del grupo (o los anteriores a una fecha), del más viejo al más nuevo. */
  async function mensajesGrupo(grupo, antesDe) {
    var q = sb.from('mensajes_grupo').select('id,grupo_id,de_id,de_nombre,tipo,texto,ref,datos,creado_en')
      .eq('grupo_id', grupo).order('creado_en', { ascending: false }).limit(POR_PAGINA);
    if (antesDe) q = q.lt('creado_en', antesDe);
    var r = await q;
    if (r.error) throw new Error(mensajeDe(r.error));
    return { lista: r.data.map(mensajeGrupoApp).reverse(), hayMas: r.data.length === POR_PAGINA };
  }

  async function enviarMensajeGrupo(uid, id, grupo, texto) {
    var r = await sb.from('mensajes_grupo').insert({ id: id, grupo_id: grupo, de_id: uid, texto: texto });
    if (r.error && r.error.code !== '23505') throw new Error(mensajeDe(r.error));
  }

  async function misGrupos() { return ((await rpcGrupo('mis_grupos', {})) || []).map(grupoDe); }
  async function marcarGrupoLeido(grupo) { return rpcGrupo('marcar_grupo_leido', { p_grupo: grupo }); }
  async function crearGrupo(nombre, ids) { return rpcGrupo('crear_grupo', { p_nombre: nombre, p_miembros: ids }); }
  async function agregarAGrupo(grupo, ids) { return rpcGrupo('agregar_a_grupo', { p_grupo: grupo, p_miembros: ids }); }
  async function salirDeGrupo(grupo) { return rpcGrupo('salir_de_grupo', { p_grupo: grupo }); }
  async function renombrarGrupo(grupo, nombre) { return rpcGrupo('renombrar_grupo', { p_grupo: grupo, p_nombre: nombre }); }

  /** partes: [{ id, monto }]; la suma debe ser exactamente el total. */
  async function crearLibretaGrupo(grupo, total, nota, partes) {
    return rpcGrupo('crear_libreta_grupo', { p_grupo: grupo, p_total: total, p_nota: nota, p_partes: partes });
  }
  async function abonarLibretaGrupo(libreta, monto) { return rpcGrupo('abonar_libreta_grupo', { p_libreta: libreta, p_monto: monto }); }
  async function borrarAbonoGrupo(abono) { return rpcGrupo('borrar_abono_grupo', { p_abono: abono }); }
  async function borrarLibretaGrupo(libreta) { return rpcGrupo('borrar_libreta_grupo', { p_libreta: libreta }); }
  /** Sin ids: las mías (las que creé o en las que debo). Con ids: esas, si las puedo ver. */
  /** Una actividad en la agenda de todos los del grupo (también la mía). */
  async function crearActividadGrupo(grupo, a) {
    return rpcGrupo('crear_actividad_grupo', { p_grupo: grupo, p_tipo: a.tipo, p_urgencia: a.urg !== false, p_fecha: a.fecha,
                                               p_temas: a.asunto || [], p_cuaderno: a.c || null });
  }
  /** Mi semana (rgrupo nulo) o uno de mis grupos de rutina, a cada uno del grupo. */
  async function compartirRutinaGrupo(grupo, rgrupo) {
    return rpcGrupo('compartir_rutina_grupo', { p_grupo: grupo, p_rgrupo: rgrupo || null });
  }
  async function libretasGrupo(ids) {
    return ((await rpcGrupo('libretas_grupo_de', { p_ids: ids || null })) || []).map(libretaGrupoDe);
  }

  /* ------------------------------------------------------------------
   * Tiempo real: aviso inmediato cuando un amigo cambia algo tuyo
   * ---------------------------------------------------------------- */
  // Solo lo que otra persona puede tocar. Los filtros hacen que cada quien
  // reciba lo suyo (y gaste menos mensajes del plan); insert/update pasan
  // ademas por la seguridad por fila. Los delete no admiten filtro: llegan
  // solo con el id y la app decide si le importan.
  function escuchar(uid, alCambiar) {
    var de = function (col) { return col + '=eq.' + uid; };
    var enlaces = [
      ['conexiones', 'INSERT', de('destinatario_id')],   // me invitan
      ['conexiones', 'UPDATE', de('solicitante_id')],    // aceptan mi solicitud
      ['conexiones', 'DELETE'],
      ['actividades', 'INSERT', de('user_id')],          // me asignan algo
      ['actividades', 'UPDATE', de('user_id')],
      ['actividades', 'UPDATE', de('asignado_por')],     // editan lo que asigne
      ['actividades', 'DELETE'],
      ['libretas', 'INSERT', de('contraparte_id')],      // me comparten una
      ['libretas', 'UPDATE', de('contraparte_id')],
      ['libretas', 'UPDATE', de('user_id')],             // saldan una mia
      ['libretas', 'DELETE'],
      ['abonos', 'INSERT'],
      ['abonos', 'DELETE'],
      ['rutinas_compartidas', 'INSERT', de('para_id')],  // me envían una rutina
      ['rutinas_compartidas', 'DELETE'],
      ['avisos', 'INSERT', de('user_id')],               // aviso nuevo para mí
      ['mensajes', 'INSERT', de('para_id')],             // me escriben
      ['mensajes', 'INSERT', de('de_id')],               // lo que escribo (o mi otro dispositivo)
      // Grupos: la seguridad por fila deja pasar solo lo de mis grupos
      // (desde que entré) y las libreticas de grupo que puedo ver.
      ['mensajes_grupo', 'INSERT'],
      ['abonos_grupo', 'INSERT'],
      ['abonos_grupo', 'DELETE'],
      ['libretas_grupo', 'DELETE'],
    ];
    var canal = sb.channel('pilares-' + uid);
    enlaces.forEach(function (e) {
      var cfg = { event: e[1], schema: 'public', table: e[0] };
      if (e[2]) cfg.filter = e[2];
      canal.on('postgres_changes', cfg, function (p) {
        alCambiar(e[0], p.eventType, p.new || {}, p.old || {});
      });
    });
    canal.subscribe();
    return canal;
  }

  function dejarDeEscuchar(canal) {
    if (canal) sb.removeChannel(canal);
  }

  /* ------------------------------------------------------------------
   * Notificaciones (Web Push)
   * ---------------------------------------------------------------- */
  var registroSW = null;
  function registrarSW() {
    if (!('serviceWorker' in navigator)) return Promise.resolve(null);
    if (!registroSW) {
      registroSW = navigator.serviceWorker.register('sw.js')
        .then(function () { return navigator.serviceWorker.ready; })
        .catch(function (e) { console.warn('[pilares] service worker', e); return null; });
    }
    return registroSW;
  }

  function esIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
  function instalada() {
    return navigator.standalone === true || (global.matchMedia && global.matchMedia('(display-mode: standalone)').matches);
  }
  function pushSoportado() {
    return 'serviceWorker' in navigator && 'PushManager' in global && 'Notification' in global;
  }

  function bytesDe(b64) {
    var s = global.atob((b64 + '='.repeat((4 - b64.length % 4) % 4)).replace(/-/g, '+').replace(/_/g, '/'));
    var out = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  }

  /** 'instalar' (iPhone sin la app en inicio), 'no' (este navegador no puede),
   *  'pedir' (aún no activadas), 'bloqueado' (permiso negado) o 'activo'. */
  async function estadoPush() {
    if (!pushSoportado()) return esIOS() && !instalada() ? 'instalar' : 'no';
    if (Notification.permission === 'denied') return 'bloqueado';
    if (Notification.permission !== 'granted') return 'pedir';
    var reg = await registrarSW();
    if (!reg) return 'no';
    return (await reg.pushManager.getSubscription()) ? 'activo' : 'pedir';
  }

  async function guardarSuscripcion(sub) {
    var j = sub.toJSON();
    var r = await sb.rpc('guardar_suscripcion', { p_endpoint: j.endpoint, p_p256dh: j.keys.p256dh, p_auth: j.keys.auth });
    if (r.error) throw new Error(mensajeDe(r.error));
  }

  /** Pide el permiso (tiene que venir de un toque) y guarda este dispositivo. */
  async function activarPush() {
    if (!pushSoportado()) throw new Error('Este navegador no permite notificaciones.');
    // Lo primero, sin esperar nada antes: Safari solo muestra la pregunta
    // si viene directo del toque.
    var permiso = await Notification.requestPermission();
    if (permiso !== 'granted') return permiso === 'denied' ? 'bloqueado' : 'pedir';
    var reg = await registrarSW();
    if (!reg) throw new Error('Este navegador no permite notificaciones.');
    var sub = await reg.pushManager.getSubscription();
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: bytesDe(VAPID_PUBLICA) });
    await guardarSuscripcion(sub);
    return 'activo';
  }

  /** Al abrir la app con el permiso ya dado: este dispositivo queda a nombre
   *  de la cuenta que está dentro (y se renueva si el navegador cambió algo). */
  async function renovarPush() {
    if (!pushSoportado() || Notification.permission !== 'granted') return;
    var reg = await registrarSW();
    var sub = reg && await reg.pushManager.getSubscription();
    if (sub) await guardarSuscripcion(sub);
  }

  /** Al cerrar sesión: este dispositivo deja de recibir los avisos de la cuenta. */
  async function soltarPush() {
    try {
      if (!pushSoportado()) return;
      var reg = await registrarSW();
      var sub = reg && await reg.pushManager.getSubscription();
      if (sub) await sb.from('suscripciones_push').delete().eq('endpoint', sub.endpoint);
    } catch (e) {}
  }

  /** La campanita apagada: este dispositivo deja de recibirlas (el permiso
   *  queda dado, así que volver a prenderlas no pregunta otra vez). */
  async function desactivarPush() {
    if (!pushSoportado()) return 'no';
    var reg = await registrarSW();
    var sub = reg && await reg.pushManager.getSubscription();
    if (!sub) return 'pedir';
    var r = await sb.from('suscripciones_push').delete().eq('endpoint', sub.endpoint);
    if (r.error) throw new Error(mensajeDe(r.error));
    await sub.unsubscribe();
    return 'pedir';
  }

  /** Devuelve la hora del servidor hasta la que ya se vieron los avisos. */
  /* ------------------------------------------------------------------
   * Atajo del iPhone: la clave con la que la app Atajos guarda en tu cuenta
   * ---------------------------------------------------------------- */
  async function miClaveAtajo() {
    var r = await sb.rpc('mi_clave_atajo');
    if (r.error) throw new Error(mensajeDe(r.error));
    return r.data || '';
  }

  async function nuevaClaveAtajo() {
    var r = await sb.rpc('nueva_clave_atajo');
    if (r.error) throw new Error(mensajeDe(r.error));
    return r.data || '';
  }

  async function marcarAvisosLeidos() {
    var r = await sb.rpc('marcar_avisos_leidos');
    if (r.error) throw r.error;
    return r.data;
  }

  /** Número en el ícono de la app (si el sistema lo permite). */
  function ponerGlobo(n) {
    try {
      if (n > 0 && navigator.setAppBadge) navigator.setAppBadge(n).catch(function () {});
      else if (navigator.clearAppBadge) navigator.clearAppBadge().catch(function () {});
    } catch (e) {}
  }

  /* ------------------------------------------------------------------
   * Respaldo: todo lo tuyo, tal como esta en la base de datos
   * ---------------------------------------------------------------- */
  /** Todas las filas de una consulta: el servidor entrega máximo 1000 por vez. */
  async function todas(consulta) {
    var filas = [];
    for (var desde = 0; ; desde += 1000) {
      var r = await consulta().range(desde, desde + 999);
      if (r.error) return r;
      filas = filas.concat(r.data || []);
      if (!r.data || r.data.length < 1000) return { data: filas, error: null };
    }
  }

  async function exportar(uid, usuario) {
    var q = await Promise.all([
      sb.from('perfiles').select('nombre,codigo,tipos_actividad,creado_en').eq('id', uid).single(),
      sb.from('cuadernos').select('id,nombre,orden,creado_en').eq('user_id', uid).order('orden'),
      sb.from('archivos').select('id,cuaderno_id,nombre,tamano,creado_en').eq('user_id', uid).order('creado_en'),
      todas(function () { return sb.from('actividades').select('id,user_id,cuaderno_id,tipo,fecha,asunto,asignado_por,nota,con_urgencia,creado_en').order('fecha').order('id'); }),
      // Todo el historial del gimnasio, no solo los ultimos 120 dias.
      todas(function () { return sb.from('sesiones').select('fecha,grupo,abbr,dia,ejercicios,actualizado_en').eq('user_id', uid).order('fecha'); }),
      todas(function () { return sb.from('libretas').select('id,user_id,contraparte_id,deudor,prestamista,monto,mine,paid,pagado_en,nota,vence_el,enviada,gasto,creado_en,actualizado_en').order('creado_en').order('id'); }),
      todas(function () { return sb.from('abonos').select('id,libreta_id,monto,nota,registrado_por,creado_en').order('creado_en').order('id'); }),
      sb.rpc('mis_conexiones'),
      sb.from('grupos').select('id,nombre,abbr,color,musculo,orden,ejercicios').eq('user_id', uid).order('orden'),
      sb.from('rutinas').select('plan').eq('user_id', uid).maybeSingle(),
      todas(function () { return sb.from('mensajes').select('id,de_id,para_id,tipo,texto,datos,creado_en').order('creado_en').order('id'); }),
      sb.rpc('mis_grupos'),
      sb.rpc('libretas_grupo_de'),
      todas(function () { return sb.from('mensajes_grupo').select('id,grupo_id,de_id,de_nombre,tipo,texto,datos,creado_en').order('creado_en').order('id'); }),
      sb.from('apodos').select('amigo_id,apodo'),
    ]);
    for (var i = 0; i < q.length; i++) if (q[i].error) throw q[i].error;
    var apodos = {};
    (q[14].data || []).forEach(function (a) { apodos[a.amigo_id] = a.apodo; });

    return {
      app: 'Pilares', formato: 1, exportado_en: new Date().toISOString(),
      usuario: usuario, id: uid,
      perfil: q[0].data,
      // apodo: el nombre que tú le pusiste (solo tú lo ves).
      amigos: (q[7].data || []).map(function (c) {
        return { id: c.otro_id, nombre: c.nombre, apodo: apodos[c.otro_id] || null, codigo: c.codigo, estado: c.estado };
      }),
      cuadernos: q[1].data, archivos: q[2].data, actividades: q[3].data,
      sesiones_gimnasio: q[4].data, libreticas: q[5].data, abonos: q[6].data,
      grupos_rutina: q[8].data,
      // Índice 0 = domingo … 6 = sábado; null = descanso.
      plan_semanal: q[9].data ? q[9].data.plan : null,
      // de_id / para_id: tu id o el de un amigo (ver "amigos").
      mensajes_chat: q[10].data,
      grupos_amigos: (q[11].data || []).map(function (g) {
        return { id: g.id, nombre: g.nombre, miembros: (g.miembros || []).map(function (m) { return { id: m.id, nombre: m.nombre }; }) };
      }),
      libreticas_de_grupo: q[12].data || [],
      mensajes_grupos: q[13].data,
    };
  }

  global.Nube = {
    cliente: sb, uuid: uuid, usuarioDe: usuarioDe,
    sesion: sesion, entrar: entrar, crear: crear, salir: salir, alPerderSesion: alPerderSesion,
    cargar: cargar, sembrarRutina: sembrarRutina, filas: filas, pendientes: pendientes, sincronizar: sincronizar,
    buscarCodigo: buscarCodigo, invitar: invitar, aceptar: aceptar, borrarConexion: borrarConexion, guardarApodo: guardarApodo,
    compartirRutina: compartirRutina, borrarInvitacionRutina: borrarInvitacionRutina,
    mensajes: mensajes, enviarMensaje: enviarMensaje, marcarChatLeido: marcarChatLeido, mensajeDe: mensajeApp,
    mensajesGrupo: mensajesGrupo, enviarMensajeGrupo: enviarMensajeGrupo, mensajeGrupoDe: mensajeGrupoApp,
    misGrupos: misGrupos, marcarGrupoLeido: marcarGrupoLeido, crearGrupo: crearGrupo, agregarAGrupo: agregarAGrupo,
    salirDeGrupo: salirDeGrupo, renombrarGrupo: renombrarGrupo,
    crearLibretaGrupo: crearLibretaGrupo, abonarLibretaGrupo: abonarLibretaGrupo, borrarAbonoGrupo: borrarAbonoGrupo,
    borrarLibretaGrupo: borrarLibretaGrupo, libretasGrupo: libretasGrupo,
    crearActividadGrupo: crearActividadGrupo, compartirRutinaGrupo: compartirRutinaGrupo,
    registrarSW: registrarSW, estadoPush: estadoPush, activarPush: activarPush, renovarPush: renovarPush,
    soltarPush: soltarPush, desactivarPush: desactivarPush, marcarAvisosLeidos: marcarAvisosLeidos, ponerGlobo: ponerGlobo,
    escuchar: escuchar, dejarDeEscuchar: dejarDeEscuchar, exportar: exportar,
    miClaveAtajo: miClaveAtajo, nuevaClaveAtajo: nuevaClaveAtajo,
  };
})(window);
