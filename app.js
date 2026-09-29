const MINT = '#57B9A0', MINT_D = '#5EA37D', GREEN = '#5EA37D', AMBER = '#CE7F55', RED = '#C46461', GREY = '#8E9AAE';

const ICONS = {
  'Dominadas': [['p','M3 4h16',1.8],['c',11,8,2],['p','M11 10v5l-2 4M11 15l2 4'],['p','M7 6v5M15 6v5']],
  'Remo en T': [['p','M3 11h10',1.8],['c',16,8,2],['p','M16 10v4'],['p','M13 11l3-3M16 14l2 3'],['p','M3 9l10 2-10 2']],
  'Jalón al Pecho': [['p','M4 3h14',1.8],['p','M6 3l-1 5M16 3l1 5'],['p','M5 8h12',1.8],['c',11,11,2],['p','M11 13v6'],['p','M8 16l3 3 3-3']],
  'Remo en Polea': [['c',7,8,2],['p','M7 10v4M5 17h4'],['p','M7 12l4-2h7',1.8],['p','M18 8v4',1.8],['p','M16 8h4M16 12h4']],
  'Pull Over': [['p','M3 13h16',1.8],['c',11,10,2],['p','M9 9C9 6 11 4 13 5'],['p','M11 12v4M8 16h6']],
  'Hombro Posterior': [['c',11,6,2],['p','M11 8v4'],['p','M4 9l7 3M18 9l-7 3',1.8],['p','M4 9l-1-3M18 9l1-3']],
  'Inclinado en Smith': [['p','M3 7h16',1.8],['c',11,4,1.5],['p','M5 7l-2 8M17 7l2 8'],['p','M9 7v5l-2 5M13 7v5l2 5']],
  'Inclinado Mancuernas': [['p','M3 8h4M15 8h4',2],['p','M5 6h2v4H5zM15 6h2v4h-2z',1.3],['c',11,5,2],['p','M7 9l4 3 4-3']],
  'Fondos': [['p','M3 5v12M19 5v12',1.8],['c',11,7,2],['p','M11 9v3M7 9h8'],['p','M9 12l2 5 2-5']],
  'Aperturas': [['c',11,6,2],['p','M11 8v4'],['p','M3 11c2-1 5 1 8 1s6-2 8-1',1.8],['p','M3 9l-1 3M19 9l1 3']],
  'Press Militar en Smith': [['c',11,5,2],['p','M11 7v4'],['p','M5 11h12',1.8],['p','M5 9v4M17 9v4',1.8],['p','M11 11v6M8 17h6']],
  'Elevaciones Laterales Polea': [['c',11,6,2],['p','M11 8v5M8 17h6'],['p','M4 14l7-3',1.8],['p','M18 14l-7-3',1.8],['p','M4 16V12M18 16V12']],
  'Extensión desde Abajo': [['c',9,5,2],['p','M9 7l2 4M11 11h5'],['p','M16 8v6',1.8],['p','M14 8h4M14 14h4'],['p','M9 7l-2 9M7 16h4']],
  'Peso Muerto': [['c',11,4,2],['p','M11 6v5l-2 7M11 11l2 7'],['p','M4 11h14',1.8],['p','M3 9h3v4H3zM16 9h3v4h-3z',1.3]],
  'Sentadilla en Hack': [['c',11,4,2],['p','M11 6v4l-3 5M11 10l3 5'],['p','M5 8h12',1.8],['p','M3 8v2M19 8v2']],
  'Extensiones de Cuádricep': [['c',8,5,2],['p','M8 7v5'],['p','M8 12l6 4',1.8],['p','M14 13v4M12 16h4'],['p','M3 12h6']],
  'Curl Acostado': [['p','M3 10h16'],['c',6,8,1.8,1.4],['p','M7 9l1 1v4',1.4],['p','M8 14l4-4',1.8],['p','M12 10l4 5',1.6],['p','M16 10h3',1.8]],
  'Aducción': [['c',11,5,2],['p','M11 7v4'],['p','M11 11l-4 6M11 11l4 6',1.8],['p','M4 13h6M12 13h6']],
  'Pantorrilla': [['c',11,4,2],['p','M11 6v6'],['p','M8 6h6',1.8],['p','M9 12c0 3 1 5 2 6'],['p','M13 12c0 3-1 5-2 6M9 18h4']],
  'Abdomen Rueda': [['c',11,13,4],['p','M7 13h8'],['c',11,5,2],['p','M9 7l-2 4M13 7l2 4']],
  'Press Militar en Máquina': [['c',11,5,2],['p','M9 7l2 2 2-2'],['p','M7 9h8',1.8],['p','M7 7v4M15 7v4'],['p','M11 9v9M8 18h6']],
  'Elevaciones Laterales Máquina': [['c',11,6,2],['p','M11 8v4'],['p','M3 12l8-1 8 1',1.8],['p','M3 10v4M19 10v4']],
  'Elevaciones Lateral en Polea': [['c',11,6,2],['p','M11 8v5M8 17h6'],['p','M4 10l7 3M18 10l-7 3',1.8],['p','M4 8v4M18 8v4']],
  'Polea a la Frente': [['c',11,6,2],['p','M11 8v5M8 17h6'],['p','M8 10l3-3 3 3',1.8],['p','M5 3h5M12 3h5']],
  'Extensión desde Arriba': [['c',11,4,2],['p','M11 6v3'],['p','M9 9h4',1.8],['p','M9 9l-1 8M13 9l1 8M8 17h6']],
  'Curl Martillo': [['p','M9 4h4v3H9z',1.4],['p','M11 7v6',1.8],['p','M9 13h4v3H9z',1.4],['c',15,10,1.5,1.3],['p','M15 11.5v5',1.3]],
};
const TIER = {
  'Dominadas': 'Compuesto', 'Remo en T': 'Compuesto', 'Jalón al Pecho': 'Máquina', 'Remo en Polea': 'Máquina',
  'Pull Over': 'Aislamiento', 'Hombro Posterior': 'Aislamiento', 'Inclinado en Smith': 'Compuesto',
  'Inclinado Mancuernas': 'Compuesto', 'Fondos': 'Compuesto', 'Aperturas': 'Aislamiento',
  'Press Militar en Smith': 'Compuesto', 'Elevaciones Laterales Polea': 'Aislamiento',
  'Extensión desde Abajo': 'Aislamiento', 'Peso Muerto': 'Compuesto', 'Sentadilla en Hack': 'Compuesto',
  'Extensiones de Cuádricep': 'Máquina', 'Curl Acostado': 'Máquina', 'Aducción': 'Máquina',
  'Pantorrilla': 'Aislamiento', 'Abdomen Rueda': 'Aislamiento', 'Press Militar en Máquina': 'Compuesto',
  'Elevaciones Laterales Máquina': 'Máquina', 'Elevaciones Lateral en Polea': 'Máquina',
  'Polea a la Frente': 'Aislamiento', 'Extensión desde Arriba': 'Aislamiento', 'Curl Martillo': 'Aislamiento',
};
const DAY_COLOR = { Espalda: '#4B7BE5', Pecho: '#E05C5C', Pierna: '#5EA37D', Hombro: '#9B6BD6' };

const MONTHS = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
const MONTHS_SH = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
const DOW_SH = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
const TIPOS = ['Quiz', 'Seguimiento', 'Parcial', 'Final', 'Tarea'];

const DIA_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
// Colores para grupos nuevos (los 4 primeros son los de siempre).
const PALETA = ['#4B7BE5', '#E05C5C', '#5EA37D', '#9B6BD6', '#CE7F55', '#57B9A0', '#D4A843', '#8E9AAE'];
// Plan semanal: índice = día de la semana (0 domingo … 6 sábado), valor = id del grupo o null (descanso).
const PLAN_VACIO = [null, null, null, null, null, null, null];
const TIPOS_EJ = ['Compuesto', 'Máquina', 'Aislamiento'];
const ICONO_GENERICO = [['p', 'M5 11h12', 1.8], ['p', 'M5 7v8M17 7v8', 2.2], ['p', 'M3 9v4M19 9v4', 1.8]];

function iso(y, m, d) { return y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0'); }
function isoOf(d) { return iso(d.getFullYear(), d.getMonth(), d.getDate()); }
function addDays(d, n) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; }
function dayIndex(d) { return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000); }
function dayDiff(a, b) { return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000); }

const NOW = new Date();
const TODAY = isoOf(NOW);

// Tira semanal viva: hoy siempre ocupa la posición 1, igual que en el diseño.
const WEEK = Array.from({ length: 7 }, (_, i) => {
  const date = addDays(NOW, i - 1);
  return {
    dow: DOW_SH[date.getDay()],
    n: date.getDate(),
    mes: MONTHS_SH[date.getMonth()],
    fecha: isoOf(date),
    wd: date.getDay(),
  };
});
function fmtMoney(v) {
  const digits = String(v).replace(/\D/g, '');
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Sesión en blanco para un día: sale del grupo que el plan le asigna
 *  (n = número del grupo, el "DÍA n"). Sin grupo es día de descanso. */
function freshDay(w, g, n) {
  if (!g) return { fecha: w.fecha, gid: null, group: 'Descanso', abbr: 'LIBRE', dia: 0, color: GREY, musculo: '', ex: [] };
  return {
    fecha: w.fecha, gid: g.id, group: g.nombre, abbr: g.abbr, dia: n, color: g.color, musculo: g.musculo,
    ex: (g.ejercicios || []).map((e, j) => ({
      id: w.fecha + '-' + j, tid: e.id, name: e.name, group: e.group, type: e.type,
      sets: e.sets, reps: e.reps, rest: e.rest, drops: e.drops, desc: e.desc,
      done: Array(e.sets).fill(false),
      weights: Array(e.sets).fill(''),
      d1: Array(e.sets).fill(''), d2: Array(e.sets).fill(''),
    })),
  };
}
function frescoPara(w, grupos, plan) {
  const id = (plan || PLAN_VACIO)[w.wd];
  const k = id ? grupos.findIndex(g => g.id === id) : -1;
  return k >= 0 ? freshDay(w, grupos[k], k + 1) : freshDay(w, null);
}
function conProgreso(d) {
  return !!d && (d.ex || []).some(e =>
    (e.done || []).some(Boolean) || (e.weights || []).some(v => v) || (e.d1 || []).some(v => v) || (e.d2 || []).some(v => v));
}
/** Los 7 días de la tira. Lo ya empezado y el pasado registrado se respetan
 *  (nunca se pierden series); todo lo demás sale del plan y los grupos. */
function componerDias(grupos, plan, logs, actuales) {
  return WEEK.map((w, i) => {
    const actual = actuales && actuales[i] && actuales[i].fecha === w.fecha ? actuales[i] : null;
    const previa = actual || (logs || {})[w.fecha];
    if (previa && Array.isArray(previa.ex) && (conProgreso(previa) || (w.fecha < TODAY && previa.ex.length))) return previa;
    return frescoPara(w, grupos, plan);
  });
}
function cap(t) { t = String(t || ''); return t ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : ''; }
// Los ejercicios de siempre guardan el tipo en mayúsculas; su etiqueta fina vive en TIER.
function tierDe(e) { return /^[A-ZÁÉÍÓÚ]+$/.test(e.type || '') ? (TIER[e.name] || cap(e.type)) : (e.type || ''); }
function abreviar(nombre) { return String(nombre || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 6) || 'GRUPO'; }
function cuenta(n, uno, varios) { return n + ' ' + (n === 1 ? uno : varios); }
function primerNombre(n) { return String(n || '').trim().split(/\s+/)[0] || 'tu amigo'; }
// Semana empezando en lunes (índices de día: 0 = domingo).
const DIAS_LUNES = [1, 2, 3, 4, 5, 6, 0];
function entero(v, min, max, def) { const n = parseInt(v, 10); return isNaN(n) ? def : Math.max(min, Math.min(max, n)); }
function recorte(v, max, def) { const x = typeof v === 'string' ? v.trim() : ''; return (x || def || '').slice(0, max); }
/** Destino que trae el enlace de una notificación (?ir=estudio&fecha=…). */
function leerDestino(url) {
  try {
    const u = new URL(url, location.href), ir = u.searchParams.get('ir');
    if (!['estudio', 'finanzas', 'ejercicio'].includes(ir)) return null;
    return { ir, fecha: u.searchParams.get('fecha'), libreta: u.searchParams.get('libreta'), inv: u.searchParams.get('inv') };
  } catch (e) { return null; }
}
function destinoDe(a) {
  if (a.tipo === 'actividad' || a.tipo === 'recordatorio') return { ir: 'estudio', fecha: a.fecha };
  if (a.tipo === 'libreta' || a.tipo === 'abono') return { ir: 'finanzas', libreta: a.ref };
  if (a.tipo === 'rutina') return { ir: 'ejercicio', inv: a.ref };
  return null;
}
const SECCION_AVISO = { actividad: 'ESTUDIO', recordatorio: 'ESTUDIO', libreta: 'FINANZAS', abono: 'FINANZAS', rutina: 'EJERCICIO' };
function hace(ts) {
  const d = new Date(ts), min = Math.round((Date.now() - d.getTime()) / 60000);
  if (!(min >= 0)) return '';
  if (min < 1) return 'AHORA';
  if (min < 60) return 'HACE ' + min + ' MIN';
  if (min < 60 * 24 && d.getDate() === new Date().getDate()) return 'HACE ' + Math.round(min / 60) + ' H';
  if (isoOf(d) === isoOf(addDays(new Date(), -1))) return 'AYER';
  return d.getDate() + ' ' + MONTHS_SH[d.getMonth()];
}

/** Rutina que llega de otra persona (invitación o vista de un amigo): solo
 *  se copian los campos conocidos, con límites, antes de mostrarla o guardarla. */
function sanearRutina(c) {
  c = c && typeof c === 'object' ? c : {};
  const grupos = (Array.isArray(c.grupos) ? c.grupos : []).filter(g => g && typeof g === 'object').slice(0, 20).map(g => {
    const nombre = recorte(g.nombre, 40, 'Grupo');
    return {
      ref: String(g.ref || ''), nombre,
      abbr: recorte(g.abbr, 8) || abreviar(nombre),
      color: /^#[0-9a-f]{6}$/i.test(g.color || '') ? g.color : PALETA[0],
      musculo: recorte(g.musculo, 40, nombre.toUpperCase()),
      ejercicios: (Array.isArray(g.ejercicios) ? g.ejercicios : []).filter(e => e && typeof e === 'object').slice(0, 40).map(e => ({
        name: recorte(e.name, 60, 'Ejercicio'), group: recorte(e.group, 40), type: recorte(e.type, 20, 'Compuesto'),
        sets: entero(e.sets, 1, 10, 3), reps: entero(e.reps, 1, 50, 10), rest: recorte(e.rest, 8, '1:30'),
        drops: e.drops === true, desc: recorte(e.desc, 400),
      })),
    };
  });
  const refs = new Set(grupos.map(g => g.ref));
  const plan = Array.isArray(c.plan) && c.plan.length === 7 ? c.plan.map(r => (r && refs.has(String(r)) ? String(r) : null)) : null;
  return { grupos, plan };
}

// Partes del estado que son datos del usuario (lo demás es interfaz).
const DATA_KEYS = ['logs', 'days', 'cuadernos', 'files', 'acts', 'libs', 'profile', 'grupos', 'plan'];
const USUARIO_OK = /^[a-z0-9._-]{3,24}$/;
const NUBE_TXT = {
  ok: ['Guardado', MINT], guardando: ['Guardando…', AMBER],
  pendiente: ['Sin conexión · se guardará', AMBER], error: ['Un cambio no se guardó', RED],
};

function vacio() {
  return {
    logs: {}, days: componerDias([], PLAN_VACIO, {}, null), cuadernos: [], files: {}, acts: [], libs: [],
    profile: { nombre: '', altura: '', peso: '', sexo: '' },
    grupos: [], plan: PLAN_VACIO.slice(), rutinaLista: false,
  };
}
function norm(t) { return String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim(); }
function leerCache(uid) { try { return JSON.parse(localStorage.getItem('pilares.nube.' + uid)); } catch (e) { return null; } }
// Valor local vs. valor que manda la base (los números pueden llegar como texto).
function mismoValor(a, b) {
  if (a === null || a === undefined) return b === null || b === undefined;
  if (typeof a === 'number') return Number(b) === a;
  if (typeof a === 'object') return JSON.stringify(a) === JSON.stringify(b);
  return a === b;
}

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.uid = null;
    this.base = null;       // lo que el servidor ya tiene (filas en texto)

    this.state = Object.assign(vacio(), {
      auth: 'cargando', cargaError: '',
      authMode: 'entrar', aUsuario: '', aNombre: '', aClave: '', authErr: '', authBusy: false,
      me: null, codigo: '', amigos: [], cuadAmigos: {},
      amigoCodigo: '', amigoMsg: '', amigoBusy: false, copiado: false, importMsg: '',
      nube: 'ok', respaldo: '', respaldoMsg: '',
      tab: (props.pantallaInicial || 'Home').toLowerCase(),
      edit: !!props.modoEdicion,
      panel: false,
      activeDay: 1, expanded: null, showDone: false,
      rest: 0, restTotal: 0, restName: '', restOn: false,
      openCuaderno: null, estudioTab: 'agenda',
      month: NOW.getMonth(), year: NOW.getFullYear(), selDay: NOW.getDate(),
      modal: null,
      showHist: false, openLib: null, abonoMonto: '',
      menuDia: null, rutinaOn: false, rGrupo: null, rEj: null, rCompartir: null,
      invRutinas: [], verRutina: null,
      avisos: [], avisosLeidos: null, avisosAntes: null, avisosTodos: false,
      push: '', pushBusy: false, pushMsg: '',
    });
    this.invPorBorrar = new Set();
    // Si la app se abrió desde una notificación, a dónde hay que ir.
    this.destino = leerDestino(location.href);
    if (this.destino) { try { history.replaceState(null, '', location.pathname); } catch (e) {} }   // invitaciones respondidas que aún no se borran en el servidor
  }

  /* ── Datos del servidor → estado ─────────────────────────────────── */
  desdeDatos(d) {
    // Las sesiones se guardan por fecha, no por posición: así la semana
    // puede correrse un día sin arrastrar el entrenamiento anterior.
    const logs = d.logs || {};
    // Una copia local de la versión anterior no trae grupos ni plan: hasta
    // leerlos del servidor no se recalcula la semana ni se sube nada de rutina
    // (subir un plan vacío borraría el de verdad).
    const lista = Array.isArray(d.grupos);
    const grupos = lista ? d.grupos : [];
    const plan = Array.isArray(d.plan) && d.plan.length === 7 ? d.plan : PLAN_VACIO.slice();
    return {
      logs, grupos, plan, rutinaLista: lista,
      days: lista
        ? componerDias(grupos, plan, logs, null)
        : WEEK.map(w => { const p = logs[w.fecha]; return (p && Array.isArray(p.ex) && p.ex.length) ? p : freshDay(w, null); }),
      cuadernos: d.cuadernos || [], files: d.files || {}, acts: d.acts || [], libs: d.libs || [],
      profile: Object.assign({ nombre: '', altura: '', peso: '', sexo: '' }, d.profile),
    };
  }

  /** Estado → forma que entiende Nube.filas. Un día de la semana se guarda
   *  solo si ya existía o si se tocó (no se suben sesiones en blanco). */
  snapshot() {
    const s = this.state;
    const sesiones = Object.assign({}, s.logs);
    WEEK.forEach((w, i) => {
      const d = s.days[i];
      if (d && (s.logs[w.fecha] || JSON.stringify(d) !== JSON.stringify(frescoPara(w, s.grupos, s.plan)))) sesiones[w.fecha] = d;
    });
    return { profile: s.profile, cuadernos: s.cuadernos, files: s.files, acts: s.acts, libs: s.libs, sesiones,
             grupos: s.grupos, plan: s.plan, rutinaLista: s.rutinaLista };
  }
  huella() { return this.uid ? JSON.stringify(Nube.filas(this.snapshot(), this.uid)) : ''; }
  hayPendientes() {
    return !!(this.uid && this.base) && Nube.pendientes(this.base, Nube.filas(this.snapshot(), this.uid)).length > 0;
  }

  /** Copia local para abrir al instante y seguir funcionando sin señal. */
  guardarCache() {
    if (!this.uid || !this.base) return;
    const s = this.state;
    try {
      localStorage.setItem('pilares.nube.' + this.uid, JSON.stringify({
        data: { profile: s.profile, cuadernos: s.cuadernos, files: s.files, acts: s.acts, libs: s.libs, logs: this.snapshot().sesiones,
                grupos: s.grupos, plan: s.plan },
        base: this.base, codigo: s.codigo, amigos: s.amigos, cuadAmigos: s.cuadAmigos, invRutinas: s.invRutinas,
        avisos: s.avisos, avisosLeidos: s.avisosLeidos,
      }));
    } catch (e) {}
  }

  /* ── Ciclo de vida ───────────────────────────────────────────────── */
  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.restOn && this.state.rest > 0) this.setState(s => ({ rest: s.rest - 1, restOn: s.rest - 1 > 0 }));
    }, 1000);

    // Lo que hagan los amigos llega al instante mientras la app está en
    // pantalla. En segundo plano se suelta la conexión (no gasta cuota del
    // plan) y al volver se lee lo que pasó mientras tanto.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') { this.refrescar(); this.conectarTiempoReal(); }
      else this.desconectarTiempoReal();
    });
    window.addEventListener('online', () => this.subir());
    // Respaldo por si el tiempo real se cae sin avisar.
    this.poll = setInterval(() => {
      if (document.visibilityState === 'visible' && !this.state.modal) this.refrescar();
    }, 300000);

    Nube.registrarSW().then(() => this.actualizarPush());
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', e => {
        const d = e.data && e.data.tipo === 'abrir-aviso' ? leerDestino(e.data.url) : null;
        if (!d) return;
        this.destino = d;
        this.aplicarDestino(false);
        this.refrescar();
      });
    }

    Nube.alPerderSesion(() => this.sesionPerdida());
    Nube.sesion().then(
      ses => { if (ses && ses.user) this.abrirCuenta(ses.user); else this.setState({ auth: 'fuera' }); },
      () => this.setState({ auth: 'fuera' })
    );
  }
  componentWillUnmount() { clearInterval(this.timer); clearInterval(this.poll); this.desconectarTiempoReal(); }

  componentDidUpdate() {
    if (this.state.auth !== 'dentro' || !this.base) return;
    const sig = DATA_KEYS.map(k => this.state[k]);
    if (this.__sig && sig.every((v, i) => v === this.__sig[i])) return;
    this.__sig = sig;
    this.guardarCache();
    clearTimeout(this.tSubir);
    this.tSubir = setTimeout(() => this.subir(), 700);   // agrupa lo que se escribe seguido
  }

  /* ── Sesión ──────────────────────────────────────────────────────── */
  abrirCuenta(user) {
    this.uid = user.id;
    this.__sig = null;
    const me = { id: user.id, usuario: Nube.usuarioDe(user.email) };
    const cache = leerCache(user.id);
    if (cache && cache.data && cache.base) {
      this.base = cache.base;
      this.setState(Object.assign(this.desdeDatos(cache.data), {
        auth: 'dentro', me, codigo: cache.codigo || '', amigos: cache.amigos || [], cuadAmigos: cache.cuadAmigos || {},
        invRutinas: cache.invRutinas || [], avisos: cache.avisos || [], avisosLeidos: cache.avisosLeidos || null,
      }));
      this.aplicarDestino(false);
    } else {
      this.base = null;
      this.setState(Object.assign(vacio(), { auth: 'cargando', cargaError: '', me }));
    }
    this.refrescar();
    this.conectarTiempoReal();
  }

  async autenticar() {
    const s = this.state;
    if (s.authBusy) return;
    const crear = s.authMode === 'crear';
    const usuario = s.aUsuario.trim(), nombre = s.aNombre.trim(), clave = s.aClave;
    let err = '';
    if (!usuario) err = 'Escribe tu usuario.';
    else if (crear && !USUARIO_OK.test(usuario.toLowerCase())) err = 'El usuario debe tener de 3 a 24 caracteres: letras sin tilde, números, punto, guion o guion bajo.';
    else if (crear && !nombre) err = 'Escribe tu nombre.';
    else if (!clave) err = 'Escribe tu contraseña.';
    else if (crear && clave.length < 6) err = 'La contraseña debe tener al menos 6 caracteres.';
    if (err) { this.setState({ authErr: err }); return; }

    this.setState({ authBusy: true, authErr: '' });
    try {
      const ses = crear ? await Nube.crear(usuario.toLowerCase(), nombre, clave) : await Nube.entrar(usuario, clave);
      this.setState({ authBusy: false, aClave: '', aNombre: '' });
      this.abrirCuenta(ses.user);
    } catch (e) {
      this.setState({ authBusy: false, authErr: e.message || 'Algo salió mal. Intenta de nuevo.' });
    }
  }

  async salir() {
    if (this.hayPendientes() &&
        !window.confirm('Hay cambios que aún no llegan a la nube (sin conexión). Si cierras sesión se pierden. ¿Cerrar de todos modos?')) return;
    const uid = this.uid;
    await Nube.soltarPush();
    Nube.ponerGlobo(0);
    this.cerrarLocal();
    try { localStorage.removeItem('pilares.nube.' + uid); } catch (e) {}
    await Nube.salir();
    this.setState(Object.assign(this.estadoFuera(), { aUsuario: '' }));
  }

  /** La sesión dejó de valer sin que la persona saliera. Vuelve a la
   *  entrada y conserva la copia local: lo pendiente se sube al reentrar. */
  sesionPerdida() {
    if (!this.uid) return;            // salida voluntaria: ya se limpió
    this.cerrarLocal();
    this.setState(Object.assign(this.estadoFuera(), { authErr: 'Tu sesión se cerró. Vuelve a entrar.' }));
  }

  cerrarLocal() {
    this.desconectarTiempoReal();
    this.uid = null; this.base = null; this.__sig = null; this.respaldoArchivo = null; this.sembrada = false;
    this.invPorBorrar = new Set();
  }

  estadoFuera() {
    return Object.assign(vacio(), {
      auth: 'fuera', authMode: 'entrar', aNombre: '', aClave: '', authErr: '', authBusy: false,
      me: null, codigo: '', amigos: [], cuadAmigos: {}, amigoCodigo: '', amigoMsg: '', importMsg: '',
      nube: 'ok', respaldo: '', respaldoMsg: '', panel: false, modal: null, tab: 'home', openCuaderno: null, openLib: null,
      activeDay: 1, expanded: null,
      menuDia: null, rutinaOn: false, rGrupo: null, rEj: null, rCompartir: null,
      invRutinas: [], verRutina: null,
      avisos: [], avisosLeidos: null, avisosAntes: null, avisosTodos: false, pushMsg: '',
    });
  }

  /* ── Rutina: plan semanal y grupos ───────────────────────────────── */

  /** Aplica un cambio a grupos y/o plan y recompone la semana. */
  mutGrupos(fn) {
    this.setState(st => {
      const grupos = JSON.parse(JSON.stringify(st.grupos));
      let plan = st.plan.slice();
      const r = fn(grupos, plan) || {};
      if (r.plan) plan = r.plan;
      return Object.assign({ grupos, plan, days: componerDias(grupos, plan, st.logs, st.days) }, r.extra || {});
    });
  }

  /** Modo edición en una tarjeta: el cambio va a la sesión del día y al
   *  ejercicio del grupo, así las próximas semanas ya salen corregidas. */
  editarEjercicioDia(i, sesId, cambio) {
    this.setState(st => {
      const days = JSON.parse(JSON.stringify(st.days));
      const d = days[i], x = d && d.ex.find(q => q.id === sesId);
      if (!x) return null;
      const antes = x.name;
      cambio(x);
      let grupos = st.grupos;
      if (d.gid) {
        grupos = st.grupos.map(g => g.id !== d.gid ? g : {
          ...g,
          ejercicios: g.ejercicios.map(t => (t.id === x.tid || (!x.tid && t.name === antes))
            ? { ...t, name: x.name, sets: x.sets, reps: x.reps, rest: x.rest } : t),
        });
      }
      return { grupos, days: componerDias(grupos, st.plan, st.logs, days) };
    });
  }

  /** Cambia el plan (para todas las semanas) con opción de deshacer. */
  cambiarPlan(nuevo, texto) {
    const previo = this.state.plan.slice();
    const aplicar = plan => this.setState(st => ({ plan, days: componerDias(st.grupos, plan, st.logs, st.days) }));
    aplicar(nuevo);
    if (window.Fluido) Fluido.aviso(texto, 'Deshacer', () => aplicar(previo), null);
  }

  /** Aviso cuando un día afectado ya tiene series: ese día se respeta. */
  notaSiEmpezado(indices) {
    const hay = indices.some(k => WEEK[k].fecha >= TODAY && conProgreso(this.state.days[k]));
    return hay ? ' · Un día ya tenía series: ese cambia desde la próxima semana.' : '';
  }

  intercambiarDias(i, j) {
    const a = WEEK[i].wd, b = WEEK[j].wd;
    if (a === b) return;
    const plan = this.state.plan.slice();
    const t = plan[a]; plan[a] = plan[b]; plan[b] = t;
    const nota = this.notaSiEmpezado([i, j]);
    this.cambiarPlan(plan, cap(DIA_LARGO[a]) + ' y ' + DIA_LARGO[b] + ' intercambiados' + nota);
  }

  asignarDia(i, gid) {
    const wd = WEEK[i].wd;
    if ((this.state.plan[wd] || null) === (gid || null)) return;
    const plan = this.state.plan.slice();
    plan[wd] = gid || null;
    const g = gid ? this.state.grupos.find(x => x.id === gid) : null;
    const nota = this.notaSiEmpezado([i]);
    this.cambiarPlan(plan, cap(DIA_LARGO[wd]) + ': ' + (g ? g.nombre : 'descanso') + nota);
  }

  /** El menú aparece justo debajo del día que se mantuvo presionado. */
  abrirMenuDia(i, rect) {
    const cont = document.querySelector('[data-pantalla="ejercicio"]');
    if (!cont) return;
    const c = cont.getBoundingClientRect(), ancho = 224;
    const cx = rect.left + rect.width / 2 - c.left;
    const x = Math.max(12, Math.min(c.width - ancho - 12, cx - ancho / 2));
    const y = rect.bottom - c.top + 8;
    this.setState({ menuDia: { i, x: Math.round(x), y: Math.round(y), origen: Math.round(cx - x) + 'px 0px' } });
  }

  cerrarMenuDia() {
    if (!window.Fluido) { this.setState({ menuDia: null }); return; }
    Fluido.cerrarMenu().then(() => this.setState({ menuDia: null }));
  }

  elegirMenuDia(gid) {
    const md = this.state.menuDia;
    if (!md) return;
    this.cerrarMenuDia();
    this.asignarDia(md.i, gid);
  }

  abrirRutina(grupoId) { this.setState({ rutinaOn: true, rGrupo: grupoId || null, rEj: null, rCompartir: null, menuDia: null }); }

  nuevoGrupo() {
    const id = Nube.uuid();
    this.mutGrupos(gs => {
      const usados = gs.map(g => g.color);
      const color = PALETA.find(c => !usados.includes(c)) || PALETA[gs.length % PALETA.length];
      gs.push({ id, nombre: 'Grupo nuevo', abbr: 'GRUPO', color, musculo: 'GRUPO NUEVO', ejercicios: [] });
      return { extra: { rGrupo: id, rEj: null } };
    });
  }

  renombrarGrupo(id, nombre) {
    this.mutGrupos(gs => {
      const g = gs.find(x => x.id === id);
      if (!g) return;
      // Los ejercicios del músculo principal siguen al nombre nuevo (así no
      // quedan marcados como "secundarios" por un simple cambio de nombre).
      const mus = String(nombre || '').trim().toUpperCase();
      g.ejercicios.forEach(e => { if (e.group === g.musculo) e.group = mus; });
      g.nombre = nombre; g.musculo = mus; g.abbr = abreviar(nombre);
    });
  }

  borrarGrupo(id) {
    const g = this.state.grupos.find(x => x.id === id);
    if (!g) return;
    const antes = { grupos: this.state.grupos, plan: this.state.plan };
    this.mutGrupos((gs, plan) => {
      gs.splice(gs.findIndex(x => x.id === id), 1);
      return { plan: plan.map(p => p === id ? null : p), extra: { rGrupo: null, rEj: null } };
    });
    if (window.Fluido) {
      Fluido.aviso('Grupo "' + (g.nombre || 'sin nombre') + '" borrado', 'Deshacer', () => this.setState(st => ({
        grupos: antes.grupos, plan: antes.plan, days: componerDias(antes.grupos, antes.plan, st.logs, st.days),
      })), null);
    }
  }

  agregarEjercicio(gid) {
    const eid = Nube.uuid();
    this.mutGrupos(gs => {
      const g = gs.find(x => x.id === gid);
      if (!g) return;
      g.ejercicios.push({ id: eid, name: 'Ejercicio nuevo', group: g.musculo, type: 'Compuesto', sets: 3, reps: 10, rest: '1:30', drops: false, desc: '' });
      return { extra: { rEj: eid } };
    });
  }

  editarEj(gid, eid, fn) {
    this.mutGrupos(gs => {
      const g = gs.find(x => x.id === gid), e = g && g.ejercicios.find(x => x.id === eid);
      if (e) fn(e);
    });
  }

  moverEj(gid, eid, dir) {
    this.mutGrupos(gs => {
      const g = gs.find(x => x.id === gid);
      if (!g) return;
      const k = g.ejercicios.findIndex(x => x.id === eid), j = k + dir;
      if (k < 0 || j < 0 || j >= g.ejercicios.length) return;
      const t = g.ejercicios[k]; g.ejercicios[k] = g.ejercicios[j]; g.ejercicios[j] = t;
    });
  }

  quitarEj(gid, eid) {
    const g = this.state.grupos.find(x => x.id === gid);
    const e = g && g.ejercicios.find(x => x.id === eid);
    if (!e) return;
    const pos = g.ejercicios.indexOf(e);
    this.mutGrupos(gs => { const gg = gs.find(x => x.id === gid); gg.ejercicios.splice(pos, 1); return { extra: { rEj: null } }; });
    if (window.Fluido) {
      Fluido.aviso('"' + (e.name || 'Ejercicio') + '" quitado', 'Deshacer', () => this.mutGrupos(gs => {
        const gg = gs.find(x => x.id === gid);
        if (gg && !gg.ejercicios.some(x => x.id === eid)) gg.ejercicios.splice(Math.min(pos, gg.ejercicios.length), 0, e);
      }), null);
    }
  }

  valsMenu(s) {
    const md = s.menuDia, self = this;
    if (!md) return { menuOn: false };
    const wd = WEEK[md.i].wd, actual = s.plan[wd] || null;
    return {
      menuOn: true, menuX: md.x, menuY: md.y, menuOrigen: md.origen,
      menuTitulo: DIA_LARGO[wd].toUpperCase() + ' · TODAS LAS SEMANAS',
      menuOpciones: s.grupos.map(g => ({ t: g.nombre || 'Sin nombre', color: g.color, check: actual === g.id ? '✓' : '', elegir: () => self.elegirMenuDia(g.id) }))
        .concat([{ t: 'Descanso', color: '#4A566B', check: actual ? '' : '✓', elegir: () => self.elegirMenuDia(null) }]),
      cerrarMenu: () => self.cerrarMenuDia(),
      menuEditar: () => { self.setState({ menuDia: null }); self.abrirRutina(); },
    };
  }

  valsRutina(s) {
    const self = this;
    if (!s.rutinaOn) return { rutinaOn: false };
    const g = s.rGrupo ? s.grupos.find(x => x.id === s.rGrupo) : null;
    const rc = s.rCompartir;
    const base = {
      rutinaOn: true, rCompOn: !!rc, rListaOn: !rc && !g, rEditOn: !rc && !!g,
      rKicker: rc ? '‹ ' + (g ? (g.nombre || 'Grupo').toUpperCase() : 'TU RUTINA') : (g ? '‹ TU RUTINA' : 'TU RUTINA'),
      rKickerColor: rc || g ? AMBER : '#8E9AAE',
      rTitulo: rc ? (rc.gid ? 'Compartir grupo' : 'Compartir semana') : (g ? (g.nombre || 'Sin nombre') : 'Grupos y semana'),
      rVolver: () => {
        if (rc) self.setState({ rCompartir: null });
        else if (g) self.setState({ rGrupo: null, rEj: null });
      },
      cerrarRutina: () => self.cerrarHoja('rutina'),
      rSemana: DIAS_LUNES.map(wd => {
        const gg = s.grupos.find(x => x.id === s.plan[wd]);
        return { dow: DOW_SH[wd], color: gg ? gg.color : '#28324A', abbr: gg ? (gg.abbr || '').slice(0, 3) : 'LIBRE', fg: gg ? '#fff' : '#4A566B' };
      }),
    };
    if (rc) {
      const gc = rc.gid ? s.grupos.find(x => x.id === rc.gid) : null;
      const enSemana = s.grupos.filter(x => s.plan.includes(x.id));
      const amigos = s.amigos.filter(a => a.estado === 'aceptada');
      const vacia = !rc.gid && enSemana.length === 0;
      return Object.assign(base, {
        rCompSemana: !rc.gid,
        rCompQue: rc.gid
          ? '"' + (gc ? gc.nombre || 'Sin nombre' : 'Grupo') + '" con ' + cuenta(gc ? gc.ejercicios.length : 0, 'ejercicio', 'ejercicios') + '.'
          : 'Tu semana con sus ' + cuenta(enSemana.length, 'grupo', 'grupos') + ' y los días de descanso.',
        rCompNota: 'Le llega como invitación. Si la acepta, queda como copia suya: lo que cambie después no afecta la tuya. Solo va la rutina, nunca tus pesos.',
        rCompVacia: vacia,
        rCompSinAmigos: !vacia && amigos.length === 0,
        rCompHayAmigos: !vacia && amigos.length > 0,
        rCompAmigos: vacia ? [] : amigos.map((a, i) => {
          const e = rc.enviados[a.id];
          return {
            nombre: a.nombre, inicial: (a.nombre || '?').charAt(0).toUpperCase(), bg: i % 2 ? MINT : AMBER,
            txt: e === 'enviando' ? 'Enviando…' : e === 'ok' ? 'Enviada ✓' : e === 'error' ? 'Reintentar' : 'Enviar',
            btnBg: e === 'ok' ? 'transparent' : 'rgba(87,185,160,.12)',
            btnBorder: e === 'ok' ? 'transparent' : 'rgba(87,185,160,.34)',
            btnFg: e === 'error' ? RED : MINT,
            enviar: () => self.compartirCon(a.id),
          };
        }),
        rCompMsg: rc.msg || '',
      });
    }
    if (!g) {
      const diasDe = id => s.plan.filter(p => p === id).length;
      return Object.assign(base, {
        rCompartirSemana: () => self.abrirCompartir(null),
        rGrupos: s.grupos.map(gg => {
          const d = diasDe(gg.id);
          return {
            nombre: gg.nombre || 'Sin nombre', color: gg.color,
            meta: cuenta(gg.ejercicios.length, 'EJERCICIO', 'EJERCICIOS') + ' · ' + (d ? cuenta(d, 'DÍA', 'DÍAS') + ' A LA SEMANA' : 'SIN DÍAS ASIGNADOS'),
            abrir: () => self.setState({ rGrupo: gg.id, rEj: null }),
          };
        }),
        rSinGrupos: s.grupos.length === 0,
        rNuevoGrupo: () => self.nuevoGrupo(),
      });
    }
    const chip = on => ({ bg: on ? '#fff' : 'rgba(255,255,255,.05)', border: on ? '#fff' : 'rgba(255,255,255,.09)', fg: on ? '#090C14' : '#8E9AAE' });
    return Object.assign(base, {
      rNombre: g.nombre,
      onRNombre: ev => { const v = ev.target.value; self.renombrarGrupo(g.id, v); },
      rColores: PALETA.map(c => ({
        color: c, anillo: c === g.color ? '0 0 0 2px #0E131F, 0 0 0 4px ' + c : 'none',
        elegir: () => self.mutGrupos(gs => { gs.find(x => x.id === g.id).color = c; }),
      })),
      rEjLabel: 'EJERCICIOS · ' + g.ejercicios.length,
      rSinEj: g.ejercicios.length === 0,
      rEjercicios: g.ejercicios.map((e, k) => {
        const abierto = s.rEj === e.id, ed = fn => self.editarEj(g.id, e.id, fn);
        return {
          num: String(k + 1).padStart(2, '0'), name: e.name || 'Sin nombre',
          meta: e.sets + '×' + e.reps + (e.drops ? ' + DESCENSOS' : '') + ' · ' + (e.rest || '—'),
          abierto, giro: abierto ? '135deg' : '45deg',
          alternar: () => self.setState({ rEj: abierto ? null : e.id }),
          nombre: e.name, onNombre: ev => { const v = ev.target.value; ed(x => { x.name = v; }); },
          sets: String(e.sets), onSets: ev => { const v = Math.max(1, Math.min(10, parseInt(ev.target.value, 10) || 1)); ed(x => { x.sets = v; }); },
          reps: String(e.reps), onReps: ev => { const v = Math.max(1, Math.min(50, parseInt(ev.target.value, 10) || 1)); ed(x => { x.reps = v; }); },
          rest: e.rest, onRest: ev => { const v = ev.target.value; ed(x => { x.rest = v; }); },
          desc: e.desc || '', onDesc: ev => { const v = ev.target.value; ed(x => { x.desc = v; }); },
          tipos: TIPOS_EJ.map(t => Object.assign({ t, pick: () => ed(x => { x.type = t; }) }, chip(tierDe(e) === t))),
          dropsBg: e.drops ? AMBER : 'rgba(255,255,255,.1)', dropsJustify: e.drops ? 'flex-end' : 'flex-start',
          dropsKnob: e.drops ? '#090C14' : '#8E9AAE',
          alternarDrops: () => ed(x => { x.drops = !x.drops; }),
          subirColor: k > 0 ? '#B8C2D2' : '#3A4458', bajarColor: k < g.ejercicios.length - 1 ? '#B8C2D2' : '#3A4458',
          subir: () => self.moverEj(g.id, e.id, -1), bajar: () => self.moverEj(g.id, e.id, 1),
          quitar: () => self.quitarEj(g.id, e.id),
        };
      }),
      rAgregarEj: () => self.agregarEjercicio(g.id),
      rCompartirGrupo: () => self.abrirCompartir(g.id),
      rBorrarGrupo: () => self.borrarGrupo(g.id),
    });
  }

  /* ── Lo que piden los gestos y animaciones (fluido.js) ───────────── */
  cerrarHoja(tipo, yaAnimado) {
    const cerrar = () => this.setState(st => tipo === 'modal' ? { modal: null }
      : tipo === 'rutina' ? { rutinaOn: false, rGrupo: null, rEj: null, rCompartir: null }
      : tipo === 'ver' ? { verRutina: null }
      : {
        panel: false,
        respaldo: st.respaldo === 'preparando' ? 'preparando' : '',
        respaldoMsg: st.respaldo === 'preparando' ? st.respaldoMsg : '',
      });
    if (yaAnimado || !window.Fluido) { cerrar(); return; }
    Fluido.animarSalida(tipo).then(cerrar);
  }

  diaActivo() { return this.state.activeDay; }
  totalDias() { return WEEK.length; }
  cambiarDia(delta) {
    const d = Math.max(0, Math.min(WEEK.length - 1, this.state.activeDay + delta));
    this.setState({ activeDay: d, expanded: null, showDone: false });
  }

  /* ── Tiempo real ─────────────────────────────────────────────────── */
  conectarTiempoReal() {
    if (!this.uid || this.canal || document.visibilityState === 'hidden') return;
    this.canal = Nube.escuchar(this.uid, (tabla, tipo, nuevo, viejo) => this.cambioRemoto(tabla, tipo, nuevo, viejo));
  }

  desconectarTiempoReal() {
    if (this.canal) { Nube.dejarDeEscuchar(this.canal); this.canal = null; }
  }

  /** Llega un aviso de la base de datos. Si ya muestro exactamente eso
   *  (por ejemplo, el eco de un cambio mío) no hago nada; si no, releo. */
  cambioRemoto(tabla, tipo, nuevo, viejo) {
    if (!this.uid) return;
    if (tabla === 'rutinas_compartidas') {
      if (tipo === 'DELETE' && !this.state.invRutinas.some(x => x.id === viejo.id)) return;
    } else if (tabla === 'conexiones') {
      if (tipo === 'DELETE' && !this.state.amigos.some(a => a.conexion === viejo.id)) return;
    } else {
      const mias = Nube.filas(this.snapshot(), this.uid)[tabla] || {};
      if (tipo === 'DELETE') {
        if (!(viejo.id in mias)) return;               // ya no lo tengo: nada que hacer
      } else if (mias[nuevo.id]) {
        const local = JSON.parse(mias[nuevo.id]);
        if (Object.keys(local).every(k => mismoValor(local[k], nuevo[k]))) return;
      }
    }
    clearTimeout(this.tRemoto);
    this.tRemoto = setTimeout(() => this.refrescar(), 300);   // agrupa avisos seguidos
  }

  /* ── Nube: subir cambios y leer lo nuevo ─────────────────────────── */
  async subir() {
    if (!this.uid || !this.base) return;
    if (this.subiendo) { this.resubir = true; return; }
    const uid = this.uid;
    const actual = Nube.filas(this.snapshot(), uid);
    if (!Nube.pendientes(this.base, actual).length) {
      if (this.state.nube !== 'ok') this.setState({ nube: 'ok' });
      this.trasSubir();
      return;
    }
    this.subiendo = true;
    this.setState({ nube: 'guardando' });
    try {
      const r = await Nube.sincronizar(this.base, actual, uid);
      if (uid !== this.uid) return;
      this.base = r.base;
      this.guardarCache();
      if (r.red) {
        this.setState({ nube: 'pendiente' });
        clearTimeout(this.tReintento);
        this.tReintento = setTimeout(() => this.subir(), 15000);
      } else {
        this.setState({ nube: r.rechazados ? 'error' : 'ok' });
        if (r.rechazados) setTimeout(() => this.refrescar(), 500);   // realinear con el servidor
      }
    } finally {
      this.subiendo = false;
      if (this.resubir) { this.resubir = false; this.subir(); }
      else this.trasSubir();
    }
  }

  /** Si una lectura se aplazó porque había cambios sin subir, se hace ahora. */
  trasSubir() {
    if (this.releerTrasSubir && !this.hayPendientes()) {
      this.releerTrasSubir = false;
      this.refrescar();
    }
  }

  async refrescar() {
    if (!this.uid) return;
    if (this.leyendo) { this.releer = true; return; }
    this.leyendo = true;
    const uid = this.uid;
    try {
      if (this.base) {
        await this.subir();
        if (this.hayPendientes()) { this.releerTrasSubir = true; return; }   // no pisar lo local
      }
      for (const id of Array.from(this.invPorBorrar)) {
        try { await Nube.borrarInvitacionRutina(id); this.invPorBorrar.delete(id); } catch (e) {}
      }
      const antes = this.huella();
      let d = await Nube.cargar(uid);
      if (uid !== this.uid) return;                 // cerró sesión mientras tanto
      // Cuenta sin rutina (no debería pasar: el servidor la siembra al crearla).
      if (!d.grupos.length && !this.sembrada) {
        this.sembrada = true;
        await Nube.sembrarRutina();
        d = await Nube.cargar(uid);
        if (uid !== this.uid) return;
      }
      if (this.base && this.huella() !== antes) { this.releer = true; return; }   // editaron mientras llegaba
      this.setState(Object.assign(this.desdeDatos(d), {
        auth: 'dentro', cargaError: '', codigo: d.codigo, amigos: d.amigos, cuadAmigos: d.cuadAmigos, nube: 'ok',
        invRutinas: d.invRutinas.filter(x => !this.invPorBorrar.has(x.id)),
        avisos: d.avisos, avisosLeidos: d.avisosLeidos,
      }));
      this.base = Nube.filas(this.snapshot(), uid);
      this.__sig = DATA_KEYS.map(k => this.state[k]);
      this.guardarCache();
      this.trasLeer();
    } catch (e) {
      console.warn('[pilares] no se pudo leer', e);
      if (this.state.auth === 'cargando') this.setState({ cargaError: 'No pudimos conectar con el servidor. Revisa tu internet.' });
      else this.setState({ nube: 'pendiente' });
    } finally {
      this.leyendo = false;
      if (this.releer) { this.releer = false; setTimeout(() => this.refrescar(), 1500); }
    }
  }

  /* ── Amigos ──────────────────────────────────────────────────────── */
  async agregarAmigo() {
    const cod = this.state.amigoCodigo.trim().toUpperCase();
    if (!cod || this.state.amigoBusy) return;
    this.setState({ amigoBusy: true, amigoMsg: '' });
    try {
      const p = await Nube.buscarCodigo(cod);
      if (!p) throw new Error('No encontramos a nadie con ese código.');
      const ya = this.state.amigos.find(a => a.id === p.id);
      if (ya) throw new Error(ya.estado === 'aceptada' ? p.nombre + ' ya es tu amigo.' : 'Ya hay una solicitud pendiente con ' + p.nombre + '.');
      await Nube.invitar(this.uid, p.id);
      this.setState({ amigoCodigo: '', amigoMsg: 'Solicitud enviada a ' + p.nombre + '. Aparecerá como amigo cuando la acepte.' });
      this.refrescar();
    } catch (e) {
      this.setState({ amigoMsg: e.message || 'No se pudo enviar la solicitud.' });
    } finally {
      this.setState({ amigoBusy: false });
    }
  }

  async conexion(accion, c) {
    try {
      if (accion === 'aceptar') await Nube.aceptar(c.conexion);
      else await Nube.borrarConexion(c.conexion);
      this.setState({ amigoMsg: accion === 'aceptar' ? 'Ahora tú y ' + c.nombre + ' son amigos.' : '' });
    } catch (e) {
      this.setState({ amigoMsg: e.message });
    }
    this.refrescar();
  }

  copiarCodigo() {
    const c = this.state.codigo;
    if (!c || !navigator.clipboard) return;
    navigator.clipboard.writeText(c).then(() => {
      this.setState({ copiado: true });
      setTimeout(() => this.setState({ copiado: false }), 1600);
    }, () => {});
  }

  /* ── Rutinas entre amigos ────────────────────────────────────────── */

  /** Sube lo pendiente y espera a que el servidor lo tenga (lo que se
   *  comparte o exporta se lee de allá). false si no se pudo. */
  async alDia() {
    for (let i = 0; i < 6 && this.hayPendientes(); i++) {
      await this.subir();
      if (this.hayPendientes()) await new Promise(r => setTimeout(r, 700));
    }
    return !this.hayPendientes();
  }

  nombreAmigo(inv) { return (this.state.amigos.find(a => a.id === inv.de) || {}).nombre || inv.deNombre || 'Un amigo'; }

  /** Vista de compartir dentro de "Tu rutina": la semana (gid nulo) o un grupo. */
  abrirCompartir(gid) { this.setState({ rCompartir: { gid: gid || null, enviados: {}, msg: '' } }); }

  async compartirCon(amigoId) {
    const rc = this.state.rCompartir;
    if (!rc || rc.enviados[amigoId] === 'enviando' || rc.enviados[amigoId] === 'ok') return;
    const marcar = (estado, msg) => this.setState(st => st.rCompartir && st.rCompartir.gid === rc.gid
      ? { rCompartir: { ...st.rCompartir, enviados: { ...st.rCompartir.enviados, [amigoId]: estado }, msg: msg || '' } } : null);
    marcar('enviando');
    try {
      if (!(await this.alDia())) throw new Error('Necesitas conexión a internet para compartir.');
      await Nube.compartirRutina(amigoId, rc.gid);
      marcar('ok');
    } catch (e) {
      marcar('error', e.message || 'No se pudo enviar. Intenta de nuevo.');
    }
  }

  async verRutinaAmigo(a) {
    this.setState({ verRutina: { modo: 'amigo', id: a.id, nombre: a.nombre, estado: 'cargando' } });
    try {
      const datos = sanearRutina(await Nube.rutinaDeAmigo(a.id));
      this.setState(st => st.verRutina && st.verRutina.id === a.id ? { verRutina: { ...st.verRutina, estado: 'listo', datos } } : null);
    } catch (e) {
      const error = navigator.onLine === false ? 'Necesitas conexión a internet para ver su rutina.' : (e.message || 'No se pudo cargar su rutina.');
      this.setState(st => st.verRutina && st.verRutina.id === a.id ? { verRutina: { ...st.verRutina, estado: 'error', error } } : null);
    }
  }

  /** Respondida la invitación, desaparece ya; en el servidor se borra en
   *  cuanto haya conexión (si no, en la próxima lectura). */
  quitarInvitacion(id) {
    this.invPorBorrar.add(id);
    this.setState(st => ({ invRutinas: st.invRutinas.filter(x => x.id !== id) }));
    setTimeout(() => this.guardarCache(), 0);
    Nube.borrarInvitacionRutina(id).then(() => this.invPorBorrar.delete(id), () => {});
  }

  /** Aceptar = copia propia: grupos nuevos con ids nuevos (lo que el amigo
   *  cambie después no me afecta). La semana además reemplaza mi plan. */
  aceptarRutina(inv) {
    const s = this.state;
    if (!s.rutinaLista) { if (window.Fluido) Fluido.aviso('Tu rutina aún está cargando. Intenta en un momento.'); return; }
    const c = sanearRutina(inv.contenido);
    const quien = primerNombre(this.nombreAmigo(inv));
    this.cerrarHoja('ver');
    this.quitarInvitacion(inv.id);
    if (!c.grupos.length) { if (window.Fluido) Fluido.aviso('Esa rutina llegó vacía.'); return; }

    // Si ya tengo un grupo con el mismo nombre, la copia lleva el nombre de quien la envió.
    const usados = new Set(s.grupos.map(g => norm(g.nombre)));
    const mapa = {};
    const nuevos = c.grupos.map(g => {
      let nombre = g.nombre;
      for (let n = 1; usados.has(norm(nombre)); n++) nombre = g.nombre + ' · ' + quien + (n > 1 ? ' ' + n : '');
      usados.add(norm(nombre));
      const id = Nube.uuid();
      mapa[g.ref] = id;
      return { id, nombre, abbr: g.abbr, color: g.color, musculo: g.musculo,
               ejercicios: g.ejercicios.map(e => Object.assign({ id: Nube.uuid() }, e)) };
    });
    const semana = inv.tipo === 'semana' && c.plan ? c.plan.map(r => (r && mapa[r]) || null) : null;
    const nota = semana
      ? this.notaSiEmpezado(WEEK.map((w, i) => i).filter(i => (s.plan[WEEK[i].wd] || null) !== semana[WEEK[i].wd]))
      : '';
    const antes = { grupos: s.grupos, plan: s.plan };
    this.mutGrupos(gs => { nuevos.forEach(g => gs.push(g)); return semana ? { plan: semana } : null; });
    if (!window.Fluido) return;
    Fluido.aviso(semana ? 'Semana de ' + quien + ' aplicada' + nota : '"' + nuevos[0].nombre + '" añadido a tu rutina', 'Deshacer',
      () => this.setState(st => ({
        grupos: antes.grupos, plan: antes.plan, days: componerDias(antes.grupos, antes.plan, st.logs, st.days),
      })), null);
  }

  rechazarRutina(inv) {
    this.cerrarHoja('ver');
    this.quitarInvitacion(inv.id);
    if (window.Fluido) Fluido.aviso('Invitación rechazada');
  }

  /** Hoja de solo lectura: la rutina de un amigo o una invitación por responder. */
  valsVer(s) {
    const v = s.verRutina, self = this;
    if (!v) return { verOn: false };
    const inv = v.modo === 'inv' ? v.inv : null;
    const datos = inv ? sanearRutina(inv.contenido) : v.datos;
    const quien = inv ? self.nombreAmigo(inv) : v.nombre;
    const base = {
      verOn: true, vInv: !!inv,
      vKicker: inv ? 'ENVIADA POR ' + quien.toUpperCase() : 'RUTINA DE',
      vTitulo: inv ? (inv.tipo === 'semana' ? 'Su semana' : (datos.grupos[0] ? datos.grupos[0].nombre : 'Grupo')) : quien,
      cerrarVer: () => self.cerrarHoja('ver'),
      vCargando: !inv && v.estado === 'cargando',
      vError: !inv && v.estado === 'error' ? v.error : '',
      vReintentar: () => self.verRutinaAmigo({ id: v.id, nombre: v.nombre }),
      vListo: !!datos,
    };
    if (!datos) return base;
    const plan = datos.plan, porRef = {};
    datos.grupos.forEach(g => { porRef[g.ref] = g; });
    return Object.assign(base, {
      vHaySemana: !!plan,
      vSemana: plan ? DIAS_LUNES.map(wd => {
        const g = porRef[plan[wd]];
        return { dow: DOW_SH[wd], color: g ? g.color : '#28324A', abbr: g ? g.abbr.slice(0, 3) : 'LIBRE', fg: g ? '#fff' : '#4A566B' };
      }) : [],
      vGruposLabel: cuenta(datos.grupos.length, 'GRUPO', 'GRUPOS'),
      vGrupos: datos.grupos.map(g => {
        const dias = plan ? DIAS_LUNES.filter(wd => plan[wd] === g.ref).map(wd => DOW_SH[wd]) : [];
        return {
          nombre: g.nombre, color: g.color,
          meta: cuenta(g.ejercicios.length, 'EJERCICIO', 'EJERCICIOS') + (plan ? ' · ' + (dias.length ? dias.join(', ') : 'SIN DÍAS') : ''),
          ejercicios: g.ejercicios.map((e, k) => ({
            num: String(k + 1).padStart(2, '0'), name: e.name,
            meta: e.sets + '×' + e.reps + (e.drops ? ' + DESCENSOS' : '') + ' · ' + e.rest,
          })),
          sinEj: g.ejercicios.length === 0,
        };
      }),
      vSinGrupos: datos.grupos.length === 0,
      vNota: !inv ? '' : inv.tipo === 'semana'
        ? 'Si la aceptas, tu semana pasa a ser esta y sus grupos se añaden a los tuyos como copia propia. Tus grupos actuales no se borran.'
        : 'Si lo aceptas, se añade a tus grupos como copia propia. Luego lo asignas a un día manteniéndolo presionado en la semana.',
      vAceptar: () => { if (inv) self.aceptarRutina(inv); },
      vRechazar: () => { if (inv) self.rechazarRutina(inv); },
    });
  }

  /** Tarjetas en Ejercicio para las rutinas que me enviaron. */
  valsInv(s) {
    const self = this;
    return {
      hayInv: s.invRutinas.length > 0,
      invCards: s.invRutinas.map(inv => {
        const c = sanearRutina(inv.contenido), g0 = c.grupos[0];
        const quien = primerNombre(self.nombreAmigo(inv)), semana = inv.tipo === 'semana';
        return {
          dots: c.grupos.slice(0, 5).map(g => ({ color: g.color })),
          titulo: semana ? quien + ' te envió su semana' : quien + ' te envió «' + (g0 ? g0.nombre : 'un grupo') + '»',
          meta: semana ? cuenta(c.grupos.length, 'GRUPO', 'GRUPOS') : cuenta(g0 ? g0.ejercicios.length : 0, 'EJERCICIO', 'EJERCICIOS'),
          ver: () => self.setState({ verRutina: { modo: 'inv', inv } }),
        };
      }),
    };
  }

  /* ── Avisos y notificaciones ─────────────────────────────────────── */

  avisosNuevos(desde) {
    const t0 = Date.parse(desde || '') || 0;
    return this.state.avisos.filter(a => Date.parse(a.creado) > t0).length;
  }

  /** Después de cada lectura: número del ícono, zona horaria del
   *  dispositivo, este dispositivo a nombre de la cuenta y enlace pendiente. */
  trasLeer() {
    const s = this.state;
    Nube.ponerGlobo(this.avisosNuevos(s.avisosLeidos));
    let zona = '';
    try { zona = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (zona && s.profile.zona && s.profile.zona !== zona) this.setState(st => ({ profile: { ...st.profile, zona } }));
    if (!this.pushRenovado) {
      this.pushRenovado = true;
      Nube.renovarPush().catch(e => console.warn('[pilares] push', e));
    }
    this.aplicarDestino(true);
  }

  /** Abre la sección de un aviso. Con datos frescos se da por hecho aunque
   *  lo buscado ya no exista; con la copia local se reintenta al leer. */
  aplicarDestino(fresco) {
    const d = this.destino;
    if (!d || this.state.auth !== 'dentro') return;
    if (this.irA(d, true) || fresco) this.destino = null;
  }

  /** true si encontró lo que buscaba (o no buscaba nada en particular). */
  irA(d, cerrarTodo) {
    if (!d) return true;
    const s = this.state;
    const cambios = cerrarTodo ? { panel: false, modal: null, rutinaOn: false, verRutina: null, menuDia: null } : {};
    let hallado = true, libreta = null;
    if (d.ir === 'estudio') {
      Object.assign(cambios, { tab: 'estudio', estudioTab: 'agenda', openCuaderno: null });
      if (/^\d{4}-\d{2}-\d{2}$/.test(d.fecha || '')) {
        const p = d.fecha.split('-').map(Number);
        Object.assign(cambios, { year: p[0], month: p[1] - 1, selDay: p[2] });
      }
    } else if (d.ir === 'finanzas') {
      cambios.tab = 'finanzas';
      const l = d.libreta && s.libs.find(x => x.id === d.libreta);
      if (l && l.paid) cambios.showHist = true;
      else if (l) { cambios.openLib = l.id; libreta = l.id; }
      else hallado = !d.libreta;
    } else if (d.ir === 'ejercicio') {
      cambios.tab = 'ejercicio';
      const inv = d.inv && s.invRutinas.find(x => x.id === d.inv);
      if (inv) cambios.verRutina = { modo: 'inv', inv };
      else hallado = !d.inv;
    } else return true;
    this.setState(cambios);
    if (libreta) {
      setTimeout(() => {
        const el = document.querySelector('[data-lib-id="' + libreta + '"]');
        if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 400);
    }
    return hallado;
  }

  /** Al abrir el panel se ven los avisos: los nuevos quedan marcados solo
   *  mientras el panel siga abierto. */
  abrirPanel() {
    const s = this.state;
    this.setState({ panel: true, avisosAntes: s.avisosLeidos, avisosTodos: false, pushMsg: '' });
    this.actualizarPush();
    if (!this.avisosNuevos(s.avisosLeidos)) return;
    Nube.marcarAvisosLeidos().then(hasta => {
      if (!hasta || !this.uid) return;
      this.setState({ avisosLeidos: hasta });
      setTimeout(() => this.guardarCache(), 0);
      Nube.ponerGlobo(0);
    }, e => console.warn('[pilares] avisos leídos', e));
  }

  async actualizarPush() {
    try {
      const e = await Nube.estadoPush();
      if (e !== this.state.push) this.setState({ push: e });
    } catch (err) { this.setState({ push: 'no' }); }
  }

  async activarNotificaciones() {
    if (this.state.pushBusy) return;
    this.setState({ pushBusy: true, pushMsg: '' });
    try {
      const e = await Nube.activarPush();
      this.setState({ push: e, pushMsg: e === 'activo' ? 'Listo: te llegarán a este dispositivo. Toca Probar para ver una.' : '' });
    } catch (err) {
      this.setState({ pushMsg: err.message || 'No se pudieron activar. Intenta de nuevo.' });
    } finally {
      this.setState({ pushBusy: false });
    }
  }

  async probarNotificacion() {
    if (this.state.pushBusy) return;
    this.setState({ pushBusy: true, pushMsg: '' });
    try {
      await Nube.avisoDePrueba();
      this.setState({ pushMsg: 'Enviada. Debe llegar en unos segundos.' });
    } catch (err) {
      this.setState({ pushMsg: err.message || 'No se pudo enviar la prueba.' });
    } finally {
      this.setState({ pushBusy: false });
    }
  }

  valsAvisos(s) {
    const self = this;
    const antes = Date.parse(s.avisosAntes || '') || 0;
    const nuevos = this.avisosNuevos(s.avisosLeidos);
    const nuevosAlAbrir = s.avisos.filter(a => Date.parse(a.creado) > antes).length;
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const P = {
      instalar: ['Notificaciones en el iPhone', 'Primero agrega Pilares a tu pantalla de inicio: en Safari toca Compartir › Agregar a inicio y ábrela desde el ícono. Necesitas iOS 16.4 o más reciente.', ''],
      no: ['Notificaciones', 'Este navegador no permite notificaciones. Tus avisos igual aparecen aquí.', ''],
      pedir: ['Notificaciones en este dispositivo', 'Actívalas para enterarte aunque la app esté cerrada.', s.pushBusy ? 'Activando…' : 'Activar'],
      bloqueado: ['Notificaciones bloqueadas', ios ? 'Para recibirlas, actívalas en Ajustes › Notificaciones › Pilares.' : 'Para recibirlas, permítelas en la configuración del navegador para este sitio.', ''],
      activo: ['Notificaciones activas', 'Te llegan a este dispositivo.', s.pushBusy ? 'Enviando…' : 'Probar'],
    }[s.push] || ['Notificaciones', 'Revisando este dispositivo…', ''];
    const lista = s.avisosTodos ? s.avisos : s.avisos.slice(0, 5);
    return {
      avisosBadge: nuevos > 0, avisosBadgeTxt: nuevos > 9 ? '9+' : String(nuevos),
      avisosNuevosTxt: nuevosAlAbrir ? cuenta(nuevosAlAbrir, 'NUEVO', 'NUEVOS') : '',
      avisosList: lista.map(a => {
        const nuevo = Date.parse(a.creado) > antes, dest = destinoDe(a);
        return {
          titulo: a.titulo, cuerpo: a.cuerpo, hayCuerpo: !!a.cuerpo,
          cuando: [hace(a.creado), SECCION_AVISO[a.tipo]].filter(Boolean).join(' · '),
          punto: nuevo ? AMBER : 'transparent',
          bg: nuevo ? 'rgba(206,127,85,.07)' : '#121724', border: nuevo ? 'rgba(206,127,85,.26)' : 'rgba(255,255,255,.07)',
          ir: () => { if (!dest) return; self.cerrarHoja('panel'); self.irA(dest, false); },
        };
      }),
      avisosVacio: s.avisos.length === 0,
      avisosMas: s.avisos.length > 5,
      avisosMasTxt: s.avisosTodos ? 'Ver menos' : 'Ver todos (' + s.avisos.length + ')',
      avisosAlternar: () => self.setState(st => ({ avisosTodos: !st.avisosTodos })),
      pushTitulo: P[0], pushTexto: P[1], pushBtn: P[2], pushBtnOn: !!P[2],
      pushGo: () => { if (s.push === 'activo') self.probarNotificacion(); else if (s.push === 'pedir') self.activarNotificaciones(); },
      pushMsg: s.pushMsg,
      horaSel: String(typeof s.profile.hora === 'number' ? s.profile.hora : 19),
      onHora: ev => {
        const v = parseInt(ev.target.value, 10);
        if (v >= 0 && v <= 23) self.setState(st => ({ profile: { ...st.profile, hora: v } }));
      },
    };
  }

  /* ── Respaldo ────────────────────────────────────────────────────── */
  // Dos pasos (preparar, luego descargar) porque el navegador solo deja
  // descargar o compartir justo después de un toque del usuario.
  async prepararRespaldo() {
    if (this.state.respaldo === 'preparando' || !this.uid) return;
    const uid = this.uid, usuario = this.state.me ? this.state.me.usuario : '';
    this.respaldoArchivo = null;
    this.setState({ respaldo: 'preparando', respaldoMsg: '' });
    try {
      // Que el respaldo incluya lo último que se escribió.
      if (!(await this.alDia())) throw new Error('pendiente');
      const datos = await Nube.exportar(uid, usuario);
      if (uid !== this.uid) return;
      const texto = JSON.stringify(datos, null, 2);
      const nombre = 'pilares-respaldo-' + (usuario.replace(/[^a-z0-9._-]/gi, '') || 'cuenta') + '-' + TODAY + '.json';
      this.respaldoArchivo = { nombre, texto };
      const kb = Math.max(1, Math.round(new Blob([texto]).size / 1024));
      const cuenta = (n, uno, varios) => n + ' ' + (n === 1 ? uno : varios);
      this.setState({
        respaldo: 'listo',
        respaldoMsg: 'Listo (' + kb + ' KB): ' + cuenta(datos.actividades.length, 'actividad', 'actividades') + ', ' +
                     cuenta(datos.libreticas.length, 'libretica', 'libreticas') + ' y ' +
                     cuenta(datos.sesiones_gimnasio.length, 'día de gimnasio', 'días de gimnasio') + '. Toca para guardarlo.',
      });
    } catch (e) {
      console.warn('[pilares] respaldo', e);
      this.setState({
        respaldo: 'error',
        respaldoMsg: navigator.onLine === false
          ? 'Necesitas conexión a internet para exportar.'
          : 'No se pudo preparar el respaldo. Intenta de nuevo.',
      });
    }
  }

  descargarRespaldo() {
    const r = this.respaldoArchivo;
    if (!r) return;
    const archivo = new File([r.texto], r.nombre, { type: 'application/json' });
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    // En iPhone se usa la hoja de compartir: desde ahí se elige "Guardar en Archivos".
    if (ios && navigator.canShare && navigator.canShare({ files: [archivo] })) {
      navigator.share({ files: [archivo], title: r.nombre }).catch(err => {
        if (!err || err.name !== 'AbortError') this.bajarArchivo(archivo);
      });
      return;
    }
    this.bajarArchivo(archivo);
  }

  bajarArchivo(archivo) {
    const url = URL.createObjectURL(archivo);
    const a = document.createElement('a');
    a.href = url;
    a.download = archivo.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  /* ── Datos que la app guardaba en el dispositivo antes de las cuentas ── */
  hayDatosLocales() {
    if (!this.uid) return false;
    try { return !!localStorage.getItem('pilares.v1') && !localStorage.getItem('pilares.importado.' + this.uid); } catch (e) { return false; }
  }

  importarLocal() {
    let v = null;
    try { v = JSON.parse(localStorage.getItem('pilares.v1')); } catch (e) {}
    if (!v) return;
    if (!window.confirm('Se subirán a tu cuenta los datos guardados en este dispositivo (rutinas, agenda, cuadernos y libreticas). Hazlo una sola vez. ¿Continuar?')) return;

    const uid = this.uid, s = this.state;
    const mapa = {};
    const cuadernos = s.cuadernos.slice();
    (v.cuadernos || []).forEach(c => {
      const igual = cuadernos.find(x => norm(x.nombre) === norm(c.nombre));
      if (igual) mapa[c.id] = igual.id;
      else { const id = Nube.uuid(); mapa[c.id] = id; cuadernos.push({ id, nombre: c.nombre }); }
    });

    const files = Object.assign({}, s.files);
    Object.keys(v.files || {}).forEach(k => {
      const cid = mapa[k];
      if (!cid) return;
      files[cid] = (files[cid] || []).concat((v.files[k] || []).map(f => ({ id: Nube.uuid(), n: f.n, s: f.s })));
    });

    const nuevasActs = (v.acts || [])
      .filter(a => TIPOS.includes(a.tipo) && /^\d{4}-\d{2}-\d{2}$/.test(a.fecha))
      .map(a => ({ id: Nube.uuid(), c: mapa[a.c] || null, tipo: a.tipo, fecha: a.fecha,
                   asunto: a.asunto || [], owner: uid, por: null, nota: '' }));

    const nuevasLibs = (v.libs || []).map(l => ({
      id: Nube.uuid(), owner: uid, contra: null, deudor: l.deudor || '', prestamista: l.prestamista || '',
      monto: String(l.monto || '').replace(/\D/g, '') || '0', mine: !!l.mine, paid: !!l.paid,
      nota: '', vence: '', abonos: [],
    }));

    // Lo que ya está en la nube manda; del dispositivo solo entra lo que falta.
    const limite = isoOf(addDays(NOW, -120));
    const actuales = this.snapshot().sesiones;
    const logs = Object.assign({}, s.logs);
    let dias = 0;
    Object.keys(v.logs || {}).forEach(f => {
      const d = v.logs[f];
      if (f >= limite && !actuales[f] && d && Array.isArray(d.ex) && d.ex.length) { logs[f] = d; dias++; }
    });
    const days = WEEK.map((w, i) => (!actuales[w.fecha] && logs[w.fecha]) ? logs[w.fecha] : s.days[i]);

    const p = v.profile || {};
    const profile = {
      nombre: s.profile.nombre || p.nombre || '', altura: s.profile.altura || p.altura || '',
      peso: s.profile.peso || p.peso || '', sexo: s.profile.sexo || p.sexo || '',
    };

    try { localStorage.setItem('pilares.importado.' + uid, '1'); } catch (e) {}
    this.setState({
      cuadernos, files, acts: s.acts.concat(nuevasActs), libs: nuevasLibs.concat(s.libs), logs, days, profile,
      importMsg: 'Importado: ' + nuevasActs.length + ' actividades, ' + nuevasLibs.length + ' libreticas y ' + dias + ' días de gimnasio.',
    });
  }

  /* ── Pantallas de acceso (sin sesión) ────────────────────────────── */
  valsAcceso() {
    const s = this.state, self = this, crear = s.authMode === 'crear';
    return {
      appOn: false, authOn: s.auth === 'fuera', loadOn: s.auth === 'cargando',
      loadErr: s.cargaError, loadSpin: !s.cargaError,
      reintentar: () => { self.setState({ cargaError: '' }); self.refrescar(); },
      salir: () => self.salir(),
      authTabs: [['Entrar', 'entrar'], ['Crear cuenta', 'crear']].map(([t, k]) => ({
        t, bg: s.authMode === k ? '#CE7F55' : 'transparent', fg: s.authMode === k ? '#0A0E1A' : '#8E9AAE',
        go: () => self.setState({ authMode: k, authErr: '' }),
      })),
      authCrearOn: crear,
      authSub: crear ? 'Crea tu cuenta con un usuario y una contraseña. No necesitas correo.' : 'Entra con tu usuario y contraseña.',
      aUsuario: s.aUsuario, aNombre: s.aNombre, aClave: s.aClave,
      onAUsuario: ev => { const v = ev.target.value; self.setState({ aUsuario: v }); },
      onANombre: ev => { const v = ev.target.value; self.setState({ aNombre: v }); },
      onAClave: ev => { const v = ev.target.value; self.setState({ aClave: v }); },
      authAuto: crear ? 'new-password' : 'current-password',
      authErr: s.authErr,
      authCta: s.authBusy ? (crear ? 'Creando cuenta…' : 'Entrando…') : (crear ? 'Crear cuenta' : 'Entrar'),
      authBtnBg: s.authBusy ? 'rgba(206,127,85,.55)' : '#CE7F55',
      authGo: () => self.autenticar(),
      authNota: crear
        ? 'Guarda bien tu usuario y tu contraseña: como no hay correo, no hay forma automática de recuperarlos.'
        : 'Cada persona tiene su propia cuenta y sus datos. Con el código de amigo pueden compartir agenda y libreticas.',
    };
  }

  gcolor(g) { return (g === 'TRÍCEP' || g === 'BÍCEP' || g === 'ABDOMEN') ? AMBER : MINT; }
  accent() { return (this.props.acento === 'Menta') ? MINT : AMBER; }
  icon(name, color) {
    const d = ICONS[name] || ICONO_GENERICO;
    const kids = d.map((it, i) => it[0] === 'c'
      ? React.createElement('circle', { key: i, cx: it[1], cy: it[2], r: it[3], stroke: 'currentColor', strokeWidth: it[4] || 1.5, fill: 'none' })
      : React.createElement('path', { key: i, d: it[1], stroke: 'currentColor', strokeWidth: it[2] || 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }));
    return React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none', style: { color, display: 'block' } }, kids);
  }
  dayPct(i) {
    const d = this.state.days[i], t = d.ex.reduce((a, e) => a + e.sets, 0);
    return t ? d.ex.reduce((a, e) => a + e.done.filter(Boolean).length, 0) / t : 0;
  }
  impor(tipo) { return (tipo === 'Final' || tipo === 'Parcial') ? 'ALTA' : (tipo === 'Tarea' ? 'BAJA' : 'MEDIA'); }

  urg(tipo, fecha) {
    if (tipo === 'Tarea') return { color: GREY, tint: 'rgba(142,154,174,.14)', label: 'TAREA' };
    const d = dayDiff(TODAY, fecha);
    if (d <= 2) return { color: RED, tint: 'rgba(196,100,97,.14)', label: 'CRÍTICO' };
    if (d <= 4) return { color: AMBER, tint: 'rgba(206,127,85,.14)', label: 'PRÓXIMO' };
    if (d <= 10) return { color: MINT_D, tint: 'rgba(46,204,113,.14)', label: '1 SEMANA' };
    return { color: '#7FD3BC', tint: 'rgba(90,242,196,.12)', label: 'HOLGADO' };
  }
  plazo(fecha) {
    const d = dayDiff(TODAY, fecha);
    if (d === 0) return 'HOY';
    if (d === 1) return 'MAÑANA';
    if (d < 0) return 'PASÓ';
    return 'EN ' + d + ' DÍAS';
  }
  fechaTxt(fecha) {
    const p = fecha.split('-');
    return parseInt(p[2], 10) + ' ' + MONTHS_SH[parseInt(p[1], 10) - 1];
  }

  mut(fn) { this.setState(s => { const d = JSON.parse(JSON.stringify(s.days)); fn(d); return { days: d }; }); }

  renderVals() {
    const s = this.state, self = this;
    if (s.auth !== 'dentro') return this.valsAcceso();
    const me = this.uid;
    const ac = this.accent();

    const amigosOk = s.amigos.filter(a => a.estado === 'aceptada');
    const nombreDe = id => (s.amigos.find(a => a.id === id) || {}).nombre || 'un amigo';
    const miNombre = s.profile.nombre || (s.me && s.me.usuario) || 'Yo';
    // Mis actividades cuentan en todo; las que asigné a amigos solo se listan.
    const misActs = s.acts.filter(a => !a.owner || a.owner === me);
    const cuadNombre = a => {
      const lista = (!a.owner || a.owner === me) ? s.cuadernos : (s.cuadAmigos[a.owner] || []);
      return (lista.find(c => c.id === a.c) || {}).nombre || '';
    };
    const day = s.days[s.activeDay];
    const w = WEEK[s.activeDay];
    const esDescanso = !day.gid && !day.ex.length;
    const grupoVacio = !!day.gid && !day.ex.length;
    const grupoHoy = day.gid ? s.grupos.find(g => g.id === day.gid) : null;
    const diaColor = esDescanso ? GREY : (day.color || (grupoHoy && grupoHoy.color) || DAY_COLOR[day.group] || ac);
    const totalSets = day.ex.reduce((t, e) => t + e.sets, 0);
    const doneSets = day.ex.reduce((t, e) => t + e.done.filter(Boolean).length, 0);
    const pct = totalSets ? Math.round(doneSets / totalSets * 100) : 0;
    const C = 2 * Math.PI * 40;

    const allDoneEx = day.ex.filter(e => e.sets > 0 && e.done.filter(Boolean).length >= e.sets);
    const hideDone = this.props.ocultarCompletados !== false;
    const pending = day.ex.filter(e => !(e.sets > 0 && e.done.filter(Boolean).length >= e.sets));
    const shown = hideDone ? (s.showDone ? pending.concat(allDoneEx) : pending) : day.ex;

    const exList = shown.map(e => {
      const dc = e.done.filter(Boolean).length;
      // Músculo secundario (p. ej. tríceps en día de pecho) va en ámbar.
      const sec = !!e.group && e.group !== (day.musculo || String(day.group || '').toUpperCase());
      const col = sec ? AMBER : MINT;
      const full = dc >= e.sets;
      const tier = tierDe(e);
      return {
        id: e.id, name: e.name, group: e.group, type: e.type, desc: e.desc, rest: e.rest,
        sets: String(e.sets), reps: String(e.reps), drops: e.drops,
        num: String(day.ex.indexOf(e) + 1).padStart(2, '0'),
        scheme: e.sets + '×' + e.reps + (e.drops ? '+2' : ''), restTxt: e.rest,
        countTxt: dc + '/' + e.sets, countColor: full ? col : '#8E9AAE',
        color: col, icon: self.icon(e.name, full ? GREEN : col),
        iconBg: full ? 'rgba(46,204,113,.12)' : (sec ? 'rgba(206,127,85,.08)' : 'rgba(87,185,160,.08)'),
        iconBorder: full ? 'rgba(46,204,113,.33)' : (sec ? 'rgba(206,127,85,.19)' : 'rgba(87,185,160,.19)'),
        cardBorder: full ? 'rgba(46,204,113,.21)' : '#1D2534',
        cardOpacity: full ? 0.62 : 1,
        nameColor: full ? '#8E9AAE' : '#fff',
        tier, tierColor: tier === 'Compuesto' ? '#FFD23F' : (tier === 'Máquina' ? '#4B7BE5' : '#8E9AAE'),
        tierBg: tier === 'Compuesto' ? 'rgba(255,210,63,.11)' : (tier === 'Máquina' ? 'rgba(75,123,229,.11)' : 'rgba(142,154,174,.11)'),
        grid: e.drops ? '20px 1fr 1fr 1fr 42px' : '20px 1fr 42px',
        open: s.expanded === e.id,
        segs: Array.from({ length: e.sets }, (_, i) => ({ bg: i < dc ? (full ? GREEN : col) : '#28324A' })),
        rows: e.done.map((dn, i) => ({
          label: String(i + 1), weight: e.weights[i], d1: e.d1[i], d2: e.d2[i],
          op: dn ? 0.45 : 1,
          inputBorder: dn ? 'rgba(87,185,160,.27)' : '#28324A',
          checkBg: dn ? MINT : 'transparent',
          checkBorder: dn ? MINT : '#28324A',
          tickTxt: dn ? '✓' : '',
          tickColor: dn ? '#0A0E1A' : '#4A566B',
          toggle: () => self.mut(d => { const x = d[s.activeDay].ex.find(q => q.id === e.id); x.done[i] = !x.done[i]; }),
          onWeight: ev => { const v = ev.target.value; self.mut(d => { d[s.activeDay].ex.find(q => q.id === e.id).weights[i] = v; }); },
          onD1: ev => { const v = ev.target.value; self.mut(d => { d[s.activeDay].ex.find(q => q.id === e.id).d1[i] = v; }); },
          onD2: ev => { const v = ev.target.value; self.mut(d => { d[s.activeDay].ex.find(q => q.id === e.id).d2[i] = v; }); },
        })),
        toggle: () => self.setState({ expanded: s.expanded === e.id ? null : e.id }),
        startRest: () => {
          const p = e.rest.split(':');
          const secs = p.length > 1 ? (+p[0]) * 60 + (+p[1]) : parseInt(e.rest, 10) || 60;
          self.setState({ rest: secs, restTotal: secs, restName: e.name, restOn: true });
        },
        // Modo edición: queda en el grupo para siempre (y en la sesión de hoy).
        onName: ev => { const v = ev.target.value; self.editarEjercicioDia(s.activeDay, e.id, x => { x.name = v; }); },
        onSets: ev => { const v = Math.max(1, Math.min(10, parseInt(ev.target.value, 10) || 1)); self.editarEjercicioDia(s.activeDay, e.id, x => { const old = x.sets; x.sets = v; const fit = (arr, f) => { while (arr.length < v) arr.push(f); while (arr.length > v) arr.pop(); }; fit(x.done, false); fit(x.weights, x.weights[old - 1] || ''); fit(x.d1, ''); fit(x.d2, ''); }); },
        onReps: ev => { const v = Math.max(1, Math.min(50, parseInt(ev.target.value, 10) || 1)); self.editarEjercicioDia(s.activeDay, e.id, x => { x.reps = v; }); },
        onRest: ev => { const v = ev.target.value; self.editarEjercicioDia(s.activeDay, e.id, x => { x.rest = v; }); },
      };
    });

    const week = WEEK.map((d, i) => {
      const on = i === s.activeDay, sd = s.days[i];
      return {
        i, dow: d.dow, n: String(d.n),
        abbr: (sd.gid || sd.ex.length) ? (sd.abbr || '').slice(0, 3) : 'LIBRE',
        bg: on ? '#1C332C' : '#121724', border: on ? 'rgba(87,185,160,.5)' : (i === 1 ? 'rgba(87,185,160,.33)' : '#1D2534'),
        fg: on ? '#9FD8C6' : '#fff', sub: on ? 'rgba(159,216,198,.7)' : '#8E9AAE',
        abbrColor: on ? 'rgba(159,216,198,.75)' : (i === 1 ? ac : '#4A566B'),
        dot: self.dayPct(i) >= 1 ? GREEN : (self.dayPct(i) > 0 ? ac : 'transparent'),
        dotBorder: self.dayPct(i) > 0 ? 'transparent' : (on ? 'rgba(159,216,198,.35)' : '#28324A'),
        select: () => self.setState({ activeDay: i, expanded: null, showDone: false }),
      };
    });

    // ── Estudio
    const cuad = s.cuadernos.map((c, i) => {
      const nf = (s.files[c.id] || []).length;
      return {
        id: c.id, nombre: c.nombre, n: String(i + 1).padStart(2, '0'),
        spine: i % 3 === 1 ? MINT : AMBER, showName: !s.edit,
        meta: nf ? nf + (nf === 1 ? ' ARCHIVO' : ' ARCHIVOS') : 'SIN ARCHIVOS',
        open: () => self.setState({ openCuaderno: c.id }),
        onName: ev => { const v = ev.target.value; self.setState(st => ({ cuadernos: st.cuadernos.map(x => x.id === c.id ? { ...x, nombre: v } : x) })); },
      };
    });
    const openC = s.cuadernos.find(c => c.id === s.openCuaderno);
    const mesKey = iso(s.year, s.month, 1).slice(0, 7);
    const monthActs = misActs.filter(a => a.fecha.slice(0, 7) === mesKey);
    const monthAll = s.acts.filter(a => a.fecha.slice(0, 7) === mesKey);
    const first = new Date(s.year, s.month, 1).getDay();
    const lead = (first + 6) % 7;
    const dim = new Date(s.year, s.month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push({ n: '', bg: 'transparent', border: 'transparent', fg: 'transparent', dots: [], select: () => {} });
    for (let d = 1; d <= dim; d++) {
      const dISO = iso(s.year, s.month, d);
      const dayActs = monthActs.filter(a => a.fecha === dISO);
      const sel = s.selDay === d;
      const isToday = dISO === TODAY;
      cells.push({
        n: String(d), dots: dayActs.slice(0, 3).map(a => ({ c: self.urg(a.tipo, a.fecha).color })),
        bg: sel ? 'rgba(255,255,255,.1)' : (dayActs.length ? 'rgba(255,255,255,.04)' : 'transparent'),
        border: sel ? 'rgba(255,255,255,.35)' : (isToday ? 'rgba(87,185,160,.5)' : 'transparent'),
        fg: isToday ? MINT : (dayActs.length ? '#fff' : '#8E9AAE'),
        select: () => self.setState({ selDay: d }),
      });
    }
    const acts = monthAll.slice().sort((a, b) => a.fecha < b.fecha ? -1 : 1).map(a => {
      const u = self.urg(a.tipo, a.fecha);
      const ajena = a.owner && a.owner !== me;
      return {
        tipo: a.tipo.toUpperCase(), color: u.color, tint: u.tint,
        plazo: a.tipo === 'Tarea' ? 'TAREA' : self.plazo(a.fecha),
        fechaTxt: self.fechaTxt(a.fecha) + ' · ' + s.year,
        asuntos: a.asunto.map(t => ({ t })),
        cuad: cuadNombre(a),
        tag: ajena ? 'PARA ' + nombreDe(a.owner).toUpperCase() : (a.por ? 'DE ' + nombreDe(a.por).toUpperCase() : ''),
        op: ajena ? 0.6 : 1,
        edit: () => self.setState({ modal: { id: a.id, c: a.c, tipo: a.tipo, fecha: a.fecha, asunto: a.asunto.slice(), tema: '', para: a.owner || me, por: a.por } }),
      };
    });

    const m = s.modal;
    const mPara = m ? (m.para || me) : me;
    const mCuads = mPara === me ? s.cuadernos : (s.cuadAmigos[mPara] || []);
    let mCells = [], mUrg = { color: GREY, tint: 'rgba(142,154,174,.14)', label: 'TAREA' };
    if (m) {
      const mp = m.fecha.split('-'), my = +mp[0], mm = +mp[1] - 1;
      const ml = (new Date(my, mm, 1).getDay() + 6) % 7, mdim = new Date(my, mm + 1, 0).getDate();
      for (let i = 0; i < ml; i++) mCells.push({ n: '', bg: 'transparent', border: 'transparent', fg: 'transparent', select: () => {} });
      for (let d = 1; d <= mdim; d++) {
        const dISO = iso(my, mm, d), sel = m.fecha === dISO;
        mCells.push({
          n: String(d), bg: sel ? AMBER : 'rgba(255,255,255,.04)',
          border: sel ? AMBER : 'rgba(255,255,255,.07)', fg: sel ? '#0A0E1A' : '#8E9AAE',
          select: () => self.setState(st => ({ modal: { ...st.modal, fecha: dISO } })),
        });
      }
      mUrg = self.urg(m.tipo, m.fecha);
    }
    const urgNotes = {
      TAREA: 'Las tareas siempre se muestran en gris, sin importar la fecha.',
      CRÍTICO: '2 días o menos de anticipación. Rojo.',
      PRÓXIMO: '4 días de anticipación. Naranja.',
      '1 SEMANA': '1 semana de anticipación. Verde oscuro.',
      HOLGADO: 'Más de 1.5 semanas de anticipación. Verde claro.',
    };

    // ── Finanzas
    // `mine` se guarda desde el punto de vista de quien creó la libretica;
    // la otra parte la ve al revés. El saldo descuenta los abonos.
    const libView = l => {
      const mia = !l.owner || l.owner === me;
      const abonado = (l.abonos || []).reduce((t, a) => t + (+a.monto || 0), 0);
      return { mia, meDeben: mia ? l.mine : !l.mine, abonado, saldo: Math.max(0, (+l.monto || 0) - abonado) };
    };
    const setLib = (id, fn) => self.setState(st => ({ libs: st.libs.map(x => x.id === id ? fn(x) : x) }));
    // Igual que en la base de datos: queda saldada cuando los abonos cubren el monto.
    const conAbonos = (x, abonos) => {
      const ab = abonos.reduce((t, a) => t + (+a.monto || 0), 0);
      return { ...x, abonos, paid: ab >= (+x.monto || 0) };
    };
    const mkLib = l => {
      const v = libView(l);
      const green = v.meDeben;
      const col = green ? MINT : RED;
      const otro = v.mia ? l.contra : l.owner;
      const otroNombre = otro
        ? ((s.amigos.find(a => a.id === otro) || {}).nombre || ((v.mia ? l.mine : !l.mine) ? l.deudor : l.prestamista))
        : '';
      const open = s.openLib === l.id;
      const n = (l.abonos || []).length;
      return {
        id: l.id, deudor: l.deudor, prestamista: l.prestamista, monto: fmtMoney(l.monto),
        montoTxt: '$ ' + fmtMoney(l.monto), color: col,
        bg: green ? 'rgba(46,204,113,.09)' : 'rgba(196,100,97,.08)',
        border: green ? 'rgba(87,185,160,.32)' : 'rgba(196,100,97,.3)',
        tint: green ? 'rgba(87,185,160,.14)' : 'rgba(196,100,97,.14)',
        dirLabel: green ? 'ME DEBEN' : 'YO DEBO',
        opacity: l.paid ? 0.45 : 1,
        paidLabel: l.paid ? 'SALDADA' : 'SALDAR',
        checkBg: l.paid ? MINT : 'transparent',
        checkBorder: l.paid ? MINT : 'rgba(255,255,255,.18)',
        tick: l.paid ? '#0A0E1A' : 'rgba(255,255,255,.18)',
        editable: v.mia, readonly: !v.mia,
        shared: !!otro,
        sharedLabel: otro ? (v.mia ? 'COMPARTIDA CON ' : 'CREADA POR ') + String(otroNombre).toUpperCase() : '',
        hasChips: v.mia && amigosOk.length > 0,
        chips: [{ t: 'Solo yo', id: null }].concat(amigosOk.map(a => ({ t: a.nombre, id: a.id }))).map(c => {
          const on = (l.contra || null) === c.id;
          return {
            t: c.t, bg: on ? '#fff' : 'rgba(255,255,255,.05)', border: on ? '#fff' : 'rgba(255,255,255,.09)', fg: on ? '#090C14' : '#8E9AAE',
            pick: () => setLib(l.id, x => {
              if (!c.id) return { ...x, contra: null };
              return x.mine ? { ...x, contra: c.id, deudor: c.t, prestamista: miNombre }
                            : { ...x, contra: c.id, deudor: miNombre, prestamista: c.t };
            }),
          };
        }),
        togglePaid: () => setLib(l.id, x => ({ ...x, paid: !x.paid })),
        flip: () => { if (v.mia) setLib(l.id, x => x.contra ? { ...x, mine: !x.mine, deudor: x.prestamista, prestamista: x.deudor } : { ...x, mine: !x.mine }); },
        remove: () => { if (v.mia) self.setState(st => ({ libs: st.libs.filter(x => x.id !== l.id) })); },
        onDeudor: ev => { const val = ev.target.value; setLib(l.id, x => ({ ...x, deudor: val })); },
        onPrestamista: ev => { const val = ev.target.value; setLib(l.id, x => ({ ...x, prestamista: val })); },
        onMonto: ev => { const val = ev.target.value.replace(/\D/g, ''); setLib(l.id, x => ({ ...x, monto: val })); },

        resumen: n ? 'ABONADO $' + fmtMoney(v.abonado) + ' · SALDO $' + fmtMoney(v.saldo)
                   : (l.vence ? 'VENCE ' + self.fechaTxt(l.vence).toUpperCase() : 'SIN ABONOS'),
        openTxt: open ? 'CERRAR' : 'ABONOS ›',
        hasBar: n > 0,
        barW: Math.min(100, Math.round(v.abonado / Math.max(1, +l.monto || 0) * 100)) + '%',
        open, toggleOpen: () => self.setState({ openLib: open ? null : l.id, abonoMonto: '' }),
        abonos: (l.abonos || []).map(a => ({
          txt: '$ ' + fmtMoney(a.monto),
          meta: self.fechaTxt(a.fecha).toUpperCase() + ' · ' + (a.por === me ? 'TÚ' : nombreDe(a.por).toUpperCase()),
          mio: a.por === me,
          remove: () => setLib(l.id, x => conAbonos(x, x.abonos.filter(y => y.id !== a.id))),
        })),
        noAbonos: n === 0,
        abonoMonto: fmtMoney(s.abonoMonto),
        onAbono: ev => { const val = ev.target.value.replace(/\D/g, ''); self.setState({ abonoMonto: val }); },
        addAbono: () => {
          const val = +s.abonoMonto || 0;
          if (!val) return;
          setLib(l.id, x => conAbonos(x, (x.abonos || []).concat([{ id: Nube.uuid(), monto: String(val), nota: '', por: me, fecha: TODAY }])));
          self.setState({ abonoMonto: '' });
        },
        nota: l.nota || '', onNota: ev => { const val = ev.target.value; setLib(l.id, x => ({ ...x, nota: val })); },
        vence: l.vence || '', onVence: ev => { const val = ev.target.value; setLib(l.id, x => ({ ...x, vence: val })); },
      };
    };
    const activeLibs = s.libs.filter(l => !l.paid), paidL = s.libs.filter(l => l.paid);

    const cobrar = activeLibs.filter(l => libView(l).meDeben), pagar = activeLibs.filter(l => !libView(l).meDeben);
    const sumMine = cobrar.reduce((t, l) => t + libView(l).saldo, 0);
    const sumOwe = pagar.reduce((t, l) => t + libView(l).saldo, 0);
    const pendAll = misActs.filter(a => dayDiff(TODAY, a.fecha) >= 0);
    const impRank = { ALTA: 0, MEDIA: 1, BAJA: 2 };
    const urgentAcad = pendAll.slice()
      .sort((a, b) => (dayDiff(TODAY, a.fecha) - dayDiff(TODAY, b.fecha)) || (impRank[self.impor(a.tipo)] - impRank[self.impor(b.tipo)]))
      .slice(0, 4)
      .map(a => {
        const u = self.urg(a.tipo, a.fecha), cn = (s.cuadernos.find(c => c.id === a.c) || {}).nombre || '';
        return {
          badge: a.tipo.toUpperCase(), color: u.color, tint: u.tint, imp: 'IMP. ' + self.impor(a.tipo),
          title: a.asunto[0] || 'Sin temas', meta: cn.toUpperCase(),
          right: self.fechaTxt(a.fecha), plazo: self.plazo(a.fecha),
          go: () => self.setState({ tab: 'estudio', estudioTab: 'agenda', openCuaderno: null, month: +a.fecha.split('-')[1] - 1, selDay: +a.fecha.split('-')[2] }),
        };
      })
      ;
    const urgent = urgentAcad
      .concat(pagar.slice().sort((a, b) => libView(b).saldo - libView(a).saldo).slice(0, 2).map(l => ({
        badge: 'DEUDA', color: RED, tint: 'rgba(196,100,97,.14)',
        imp: (libView(l).saldo >= 500000) ? 'IMP. ALTA' : 'IMP. MEDIA',
        title: l.prestamista, meta: 'YO DEBO · LIBRETICA',
        right: '$' + fmtMoney(libView(l).saldo), plazo: 'POR PAGAR',
        go: () => self.setState({ tab: 'finanzas' }),
      })));
    const bars = Array.from({ length: 6 }, (_, i) => {
      const st0 = addDays(NOW, i * 7);
      const st1 = addDays(NOW, i * 7 + 7);
      const a = iso(st0.getFullYear(), st0.getMonth(), st0.getDate()), b = iso(st1.getFullYear(), st1.getMonth(), st1.getDate());
      const n = misActs.filter(x => x.fecha >= a && x.fecha < b).length;
      return { n: String(n), raw: n, label: st0.getDate() + ' ' + MONTHS_SH[st0.getMonth()], i };
    });
    const maxBar = Math.max(1, ...bars.map(b => b.raw));
    bars.forEach(b => {
      b.h = Math.round(12 + (b.raw / maxBar) * 66) + 'px';
      b.bg = b.i === 0 ? AMBER : (b.raw ? 'rgba(206,127,85,.28)' : '#28324A');
      b.fg = b.i === 0 ? AMBER : '#8E9AAE';
    });
    const nextUp = pendAll.slice().sort((a, b) => dayDiff(TODAY, a.fecha) - dayDiff(TODAY, b.fecha))[0];
    const nUrg = nextUp ? self.urg(nextUp.tipo, nextUp.fecha) : { color: GREY, tint: 'rgba(142,154,174,.14)' };
    const nextA = misActs.filter(a => a.tipo !== 'Tarea' && dayDiff(TODAY, a.fecha) >= 0)
      .sort((a, b) => dayDiff(TODAY, a.fecha) - dayDiff(TODAY, b.fecha))[0];
    const nu = nextA ? self.urg(nextA.tipo, nextA.fecha) : { color: GREY, tint: 'rgba(142,154,174,.14)' };
    const nc = nextA ? s.cuadernos.find(c => c.id === nextA.c) : null;

    const tabDefs = [[ 'Ejercicio', 'ejercicio', ['8px','14px','18px'] ], [ 'Estudio', 'estudio', ['16px','16px','16px'] ], [ 'Finanzas', 'finanzas', ['18px','10px','14px'] ]];

    return {
      yes: true,
      appOn: true, authOn: false, loadOn: false,
      ...self.valsRutina(s), ...self.valsMenu(s), ...self.valsVer(s), ...self.valsInv(s), ...self.valsAvisos(s),
      isHome: s.tab === 'home', isEjercicio: s.tab === 'ejercicio', isEstudio: s.tab === 'estudio', isFinanzas: s.tab === 'finanzas',
      editOn: s.edit, panelOn: s.panel, modalOn: !!m, restOn: s.restOn,
      goEjercicio: () => self.setState({ tab: 'ejercicio' }),
      goEstudio: () => self.setState({ tab: 'estudio', estudioTab: 'agenda', openCuaderno: null }),
      goFinanzas: () => self.setState({ tab: 'finanzas' }),
      openPanel: () => self.abrirPanel(),
      closePanel: () => self.cerrarHoja('panel'),
      toggleEdit: () => self.setState(st => ({ edit: !st.edit })),

      ringColor: pct >= 100 ? GREEN : ac, ringOffset: 188.5 * (1 - pct / 100), pctText: pct + '%',
      dayColor: diaColor,
      dayChipBg: diaColor + '1F',
      dayChip: esDescanso ? 'DÍA LIBRE' : 'DÍA ' + (day.dia || '·') + ' · ' + (pct >= 100 ? 'COMPLETO' : (doneSets > 0 ? pct + '% HECHO' : 'SIN EMPEZAR')),
      esDescanso, grupoVacio, hayRutina: day.ex.length > 0,
      abrirRutina: () => self.abrirRutina(),
      dayStateTxt: pct >= 100 ? 'COMPLETO' : (doneSets > 0 ? pct + '% HECHO' : 'SIN EMPEZAR'),
      finanzasSummary: cobrar.length + ' POR COBRAR · ' + pagar.length + ' POR PAGAR',
      canReset: doneSets > 0,
      resetDay: () => self.mut(d => d[s.activeDay].ex.forEach(e => { e.done = e.done.map(() => false); })),
      dayGroup: day.group, dayHeader: w.dow + ' ' + w.n + ' ' + w.mes, dayNum: String(day.dia),
      seriesText: doneSets + ' de ' + totalSets + ' series',
      exCountText: esDescanso ? 'Día de descanso' : day.ex.length + ' ej · ' + (pct >= 100 ? 'Sesión completa' : 'Compuestos 1º'),
      week, exList,
      hasDone: allDoneEx.length > 0 && hideDone,
      doneLabel: allDoneEx.length + ' completado' + (allDoneEx.length === 1 ? '' : 's'),
      doneAction: s.showDone ? 'ocultar' : 'mostrar',
      toggleDone: () => self.setState(st => ({ showDone: !st.showDone })),
      restTxt: Math.floor(s.rest / 60) + ':' + String(s.rest % 60).padStart(2, '0'),
      restName: s.restName,
      restColor: s.rest <= 10 ? AMBER : '#fff',
      restOffset: 552.9 * (1 - (s.restTotal ? Math.max(0, s.rest) / s.restTotal : 0)),
      restTotalTxt: s.restTotal >= 60 ? Math.floor(s.restTotal / 60) + ':' + String(s.restTotal % 60).padStart(2, '0') : s.restTotal + 's',
      restMinus: () => self.setState(st => ({ rest: Math.max(0, st.rest - 15) })),
      restPlus: () => self.setState(st => ({ rest: st.rest + 15 })),
      stopRest: () => self.setState({ restOn: false, rest: 0 }),

      cuadernos: cuad,
      agendaOn: !s.openCuaderno && s.estudioTab === 'agenda',
      cuadListOn: !s.openCuaderno && s.estudioTab === 'cuadernos',
      fileOn: !!s.openCuaderno, segOn: !s.openCuaderno,
      estudioKicker: s.openCuaderno ? 'ESTUDIO · CUADERNO' : 'ESTUDIO · ' + misActs.length + ' ACTIVIDADES',
      estudioTitle: openC ? openC.nombre : 'Estudio',
      cerrarCuaderno: () => self.setState({ openCuaderno: null }),
      segs: [['Agenda', 'agenda'], ['Cuadernos', 'cuadernos']].map(([t, k]) => {
        const on = s.estudioTab === k;
        return { t, bg: on ? '#CE7F55' : 'rgba(255,255,255,.06)', border: on ? '#CE7F55' : 'rgba(255,255,255,.12)', fg: on ? '#0A0E1A' : '#8E9AAE', go: () => self.setState({ estudioTab: k, openCuaderno: null }) };
      }),
      addCuaderno: () => self.setState(st => ({ cuadernos: st.cuadernos.concat([{ id: Nube.uuid(), nombre: 'Cuaderno nuevo' }]), edit: true })),
      files: (s.files[s.openCuaderno] || []).map((fl, i) => {
        const ext = (fl.n.split('.').pop() || 'file').toUpperCase();
        return { n: fl.n, s: fl.s, ext, color: /PDF/.test(ext) ? RED : (/XLS|CSV/.test(ext) ? MINT : AMBER),
          remove: () => self.setState(st => ({ files: { ...st.files, [s.openCuaderno]: st.files[s.openCuaderno].filter((_, k) => k !== i) } })) };
      }),
      noFiles: (s.files[s.openCuaderno] || []).length === 0,
      filesLabel: (s.files[s.openCuaderno] || []).length + ' ARCHIVOS DEL CUADERNO',
      onFiles: ev => {
        const list = Array.from(ev.target.files || []).map(x => ({ id: Nube.uuid(), n: x.name, s: x.size > 1048576 ? (x.size / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(x.size / 1024)) + ' KB' }));
        if (!list.length) return;
        self.setState(st => ({ files: { ...st.files, [st.openCuaderno]: (st.files[st.openCuaderno] || []).concat(list) } }));
      },
      monthLabel: MONTHS[s.month] + ' ' + s.year, dowNames: ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(t => ({ t })),
      cells, acts, noActs: acts.length === 0,
      actsLabel: monthActs.length + ' ACTIVIDADES · ' + MONTHS_SH[s.month],
      prevMonth: () => self.setState(st => ({ month: st.month === 0 ? 11 : st.month - 1, year: st.month === 0 ? st.year - 1 : st.year })),
      nextMonth: () => self.setState(st => ({ month: st.month === 11 ? 0 : st.month + 1, year: st.month === 11 ? st.year + 1 : st.year })),
      legend: [{ c: '#7FD3BC', t: '+1.5 sem' }, { c: MINT_D, t: '1 sem' }, { c: AMBER, t: '4 días' }, { c: RED, t: '≤2 días' }, { c: GREY, t: 'Tarea' }].map(x => x),

      openModal: () => self.setState({ modal: { id: null, c: s.cuadernos[0] ? s.cuadernos[0].id : null, tipo: 'Quiz', fecha: iso(s.year, s.month, s.selDay), asunto: [], tema: '', para: me, por: null } }),
      modalCuads: mCuads.map(c => ({
        t: c.nombre, pick: () => self.setState(st => ({ modal: { ...st.modal, c: c.id } })),
        bg: m && m.c === c.id ? '#fff' : 'rgba(255,255,255,.05)',
        border: m && m.c === c.id ? '#fff' : 'rgba(255,255,255,.09)',
        fg: m && m.c === c.id ? '#090C14' : '#8E9AAE',
      })),
      modalSinCuads: !!m && mCuads.length === 0,
      modalSinCuadsTxt: mPara === me
        ? 'Aún no tienes cuadernos. Puedes crearla así o crear uno en Estudio › Cuadernos.'
        : nombreDe(mPara) + ' no tiene cuadernos; la actividad quedará sin cuaderno.',
      modalParaOn: !!(m && !m.id && amigosOk.length),
      modalPara: [{ t: 'Mí', id: me }].concat(amigosOk.map(a => ({ t: a.nombre, id: a.id }))).map(p => {
        const on = mPara === p.id;
        return {
          t: p.t, bg: on ? '#fff' : 'rgba(255,255,255,.05)', border: on ? '#fff' : 'rgba(255,255,255,.09)', fg: on ? '#090C14' : '#8E9AAE',
          pick: () => self.setState(st => {
            const lista = p.id === me ? st.cuadernos : (st.cuadAmigos[p.id] || []);
            return { modal: { ...st.modal, para: p.id, c: lista[0] ? lista[0].id : null } };
          }),
        };
      }),
      modalDe: !m ? '' : (m.id
        ? (mPara !== me ? 'En la agenda de ' + nombreDe(mPara) + '.' : (m.por ? 'Te la asignó ' + nombreDe(m.por) + '.' : ''))
        : (mPara !== me ? 'Aparecerá en la agenda de ' + nombreDe(mPara) + '.' : '')),
      closeModal: () => self.cerrarHoja('modal'),
      modalTitle: m && m.id ? 'Editar actividad' : 'Nueva actividad',
      modalCuaderno: m ? ((mCuads.find(c => c.id === m.c) || {}).nombre || '') : '',
      modalCta: m && m.id ? 'Guardar' : 'Crear actividad',
      modalEditing: !!(m && m.id),
      modalMonth: m ? MONTHS[+m.fecha.split('-')[1] - 1] + ' ' + m.fecha.split('-')[0] : '',
      modalCells: mCells, modalColor: mUrg.color, modalTint: mUrg.tint,
      modalUrgLabel: 'URGENCIA · ' + mUrg.label, modalUrgNote: urgNotes[mUrg.label] || '',
      modalTema: m ? m.tema : '', modalTemas: m ? m.asunto.map((t, i) => ({ t, remove: () => self.setState(st => ({ modal: { ...st.modal, asunto: st.modal.asunto.filter((_, k) => k !== i) } })) })) : [],
      onTema: ev => { const v = ev.target.value; self.setState(st => ({ modal: { ...st.modal, tema: v } })); },
      addTema: () => self.setState(st => st.modal.tema.trim() ? ({ modal: { ...st.modal, asunto: st.modal.asunto.concat([st.modal.tema.trim()]), tema: '' } }) : null),
      tipos: TIPOS.map(t => ({
        t, pick: () => self.setState(st => ({ modal: { ...st.modal, tipo: t } })),
        bg: m && m.tipo === t ? '#fff' : 'rgba(255,255,255,.05)',
        border: m && m.tipo === t ? '#fff' : 'rgba(255,255,255,.09)',
        fg: m && m.tipo === t ? '#090C14' : '#8E9AAE',
      })),
      // Se guarda al instante; la hoja se va con su animación y luego se cierra.
      saveAct: () => {
        self.setState(st => {
          const mm = st.modal;
          if (mm.id) return { acts: st.acts.map(a => a.id === mm.id ? { ...a, c: mm.c, tipo: mm.tipo, fecha: mm.fecha, asunto: mm.asunto } : a) };
          const para = mm.para || me;
          return { acts: st.acts.concat([{ id: Nube.uuid(), c: mm.c, tipo: mm.tipo, fecha: mm.fecha, asunto: mm.asunto.length ? mm.asunto : ['Sin temas'],
                                            owner: para, por: para === me ? null : me, nota: '' }]) };
        });
        self.cerrarHoja('modal');
      },
      deleteAct: () => {
        const id = s.modal && s.modal.id;
        self.setState(st => ({ acts: st.acts.filter(a => a.id !== id) }));
        self.cerrarHoja('modal');
      },

      libs: activeLibs.map(mkLib), paidLibs: paidL.map(mkLib),
      hasPaid: paidL.length > 0, showHist: s.showHist,
      histLabel: '✓ ' + paidL.length + ' saldada' + (paidL.length === 1 ? '' : 's'),
      histAction: s.showHist ? 'OCULTAR' : 'MOSTRAR',
      toggleHist: () => self.setState(st => ({ showHist: !st.showHist })),
      // Solo se borran las mías; las que otra persona compartió siguen siendo suyas.
      clearHistLabel: 'Eliminar historial · ' + paidL.filter(l => libView(l).mia).length,
      clearHist: () => self.setState(st => ({ libs: st.libs.filter(l => !l.paid || (l.owner && l.owner !== me)), showHist: false })),
      addLib: () => self.setState(st => ({ libs: [{ id: Nube.uuid(), owner: me, contra: null, deudor: 'Nombre del deudor', prestamista: miNombre,
                                                     monto: '0', mine: true, paid: false, nota: '', vence: '', abonos: [] }].concat(st.libs) })),

      ringOffsetSm: 226.2 * (1 - pct / 100),
      todayLine: DOW_SH[NOW.getDay()] + ' ' + NOW.getDate() + ' ' + MONTHS_SH[NOW.getMonth()] + ' · ' + NOW.getFullYear(),
      greeting: 'Hola, ' + miNombre.split(' ')[0],
      homeSub: pendAll.length + ' pendientes académicos' + (nextUp ? ' · próxima ' + self.plazo(nextUp.fecha).toLowerCase() : ''),
      gymLine: day.group === 'Descanso' ? 'Descanso' : (day.group + ' · día ' + day.dia),
      finLine: '$' + fmtMoney(sumMine) + ' por cobrar · $' + fmtMoney(sumOwe) + ' por pagar',
      hasNext: !!nextUp,
      nextBadge: nextUp ? nextUp.tipo.toUpperCase() : '',
      nextColor: nUrg.color, nextTint: nUrg.tint, nextBorder: nUrg.color + '4D',
      nextTitle: nextUp ? (nextUp.asunto.join(' · ') || 'Sin temas registrados') : '',
      nextCuaderno: nextUp ? ((s.cuadernos.find(c => c.id === nextUp.c) || {}).nombre || '') : '',
      nextFecha: nextUp ? self.fechaTxt(nextUp.fecha).toUpperCase() : '',
      nextPlazo: nextUp ? self.plazo(nextUp.fecha) : '',
      goNext: () => { if (!nextUp) return; self.setState({ tab: 'estudio', estudioTab: 'agenda', openCuaderno: null, month: +nextUp.fecha.split('-')[1] - 1, selDay: +nextUp.fecha.split('-')[2] }); },
      kpisEst: [
        { label: 'PENDIENTES', value: String(pendAll.length), color: '#fff', go: () => self.setState({ tab: 'estudio', estudioTab: 'agenda', openCuaderno: null }) },
        { label: 'ESTA SEMANA', value: String(bars[0].raw), color: ac, go: () => self.setState({ tab: 'estudio', estudioTab: 'agenda', openCuaderno: null }) },
        { label: 'CUADERNOS', value: String(s.cuadernos.length), color: MINT, go: () => self.setState({ tab: 'estudio', estudioTab: 'cuadernos', openCuaderno: null }) },
      ],
      urgentAcad,
      dashSub: pendAll.length + ' pendientes académicos · ' + activeLibs.length + ' libreticas activas',
      kpis: [
        { label: 'SERIES HOY', value: doneSets + '/' + totalSets, color: AMBER, sub: day.abbr, border: 'rgba(206,127,85,.3)', go: () => self.setState({ tab: 'ejercicio' }) },
        { label: 'PENDIENTES', value: String(pendAll.length), color: '#fff', sub: nextA ? self.plazo(nextA.fecha) : 'AL DÍA', border: 'rgba(255,255,255,.07)', go: () => self.setState({ tab: 'estudio', estudioTab: 'agenda', openCuaderno: null }) },
        { label: 'POR COBRAR', value: '$' + fmtMoney(sumMine), color: MINT, sub: cobrar.length + ' LIBRETICAS', border: 'rgba(87,185,160,.26)', go: () => self.setState({ tab: 'finanzas' }) },
        { label: 'POR PAGAR', value: '$' + fmtMoney(sumOwe), color: RED, sub: pagar.length + ' LIBRETICAS', border: 'rgba(196,100,97,.26)', go: () => self.setState({ tab: 'finanzas' }) },
      ],
      urgentCount: urgent.length + ' ITEMS',
      urgent,
      bars,
      debtRows: [
        { label: 'Por cobrar', sub: cobrar.length + ' libreticas · me deben', total: '$' + fmtMoney(sumMine), color: MINT, bg: 'rgba(46,204,113,.09)', border: 'rgba(87,185,160,.28)' },
        { label: 'Por pagar', sub: pagar.length + ' libreticas · yo debo', total: '$' + fmtMoney(sumOwe), color: RED, bg: 'rgba(196,100,97,.08)', border: 'rgba(196,100,97,.28)' },
      ],

      pNombre: s.profile.nombre, pAltura: s.profile.altura, pPeso: s.profile.peso,
      onNombre: ev => { const v = ev.target.value; self.setState(st => ({ profile: { ...st.profile, nombre: v } })); },
      onAltura: ev => { const v = ev.target.value; self.setState(st => ({ profile: { ...st.profile, altura: v } })); },
      onPeso: ev => { const v = ev.target.value; self.setState(st => ({ profile: { ...st.profile, peso: v } })); },
      sexos: ['Hombre', 'Mujer', 'Otro'].map(t => ({
        t, pick: () => self.setState(st => ({ profile: { ...st.profile, sexo: t } })),
        bg: s.profile.sexo === t ? '#fff' : 'rgba(255,255,255,.05)',
        border: s.profile.sexo === t ? '#fff' : 'rgba(255,255,255,.09)',
        fg: s.profile.sexo === t ? '#090C14' : '#8E9AAE',
      })),
      profileNote: (s.profile.altura && s.profile.peso
        ? miNombre + ', ' + s.profile.altura + ' cm · ' + s.profile.peso + ' kg. '
        : 'Completa tu altura y peso. ') + 'Volumen sugerido: 12–18 series por grupo a la semana, compuestos primero y 2:00–2:30 de descanso en multiarticulares.',

      meUsuario: s.me ? '@' + s.me.usuario : '',
      meCodigo: s.codigo || '—',
      copiarTxt: s.copiado ? 'COPIADO ✓' : 'COPIAR',
      copiarCodigo: () => self.copiarCodigo(),
      nubeTxt: (NUBE_TXT[s.nube] || NUBE_TXT.ok)[0], nubeColor: (NUBE_TXT[s.nube] || NUBE_TXT.ok)[1],
      amigoCodigo: s.amigoCodigo,
      onAmigoCodigo: ev => { const v = ev.target.value.toUpperCase(); self.setState({ amigoCodigo: v }); },
      agregarAmigo: () => self.agregarAmigo(),
      agregarTxt: s.amigoBusy ? '…' : 'Agregar',
      amigoMsg: s.amigoMsg,
      solicitudes: s.amigos.filter(a => a.estado === 'pendiente' && !a.yo).map(a => ({
        nombre: a.nombre, codigo: a.codigo,
        aceptar: () => self.conexion('aceptar', a),
        rechazar: () => self.conexion('rechazar', a),
      })),
      amigosList: s.amigos.filter(a => a.estado === 'aceptada' || a.yo).map((a, i) => {
        const ok = a.estado === 'aceptada';
        return {
          nombre: a.nombre, codigo: a.codigo, inicial: (a.nombre || '?').charAt(0).toUpperCase(),
          bg: i % 2 ? MINT : AMBER,
          estado: ok ? 'VER SU RUTINA ›' : 'ESPERANDO RESPUESTA · ' + a.codigo, estadoColor: ok ? MINT : '#8E9AAE',
          cursor: ok ? 'pointer' : 'default',
          ver: () => { if (ok) self.verRutinaAmigo(a); },
          quitarTxt: ok ? 'QUITAR' : 'CANCELAR',
          quitar: () => {
            if (ok && !window.confirm('¿Quitar a ' + a.nombre + ' de tus amigos? Las libreticas que ya comparten se conservan.')) return;
            self.conexion('quitar', a);
          },
        };
      }),
      sinAmigos: s.amigos.length === 0,
      amigosCount: amigosOk.length ? amigosOk.length + (amigosOk.length === 1 ? ' AMIGO' : ' AMIGOS') : '',
      hasSolicitudes: s.amigos.some(a => a.estado === 'pendiente' && !a.yo),
      importarOn: !!s.importMsg || self.hayDatosLocales(),
      importarTxt: s.importMsg || 'Importar datos de este dispositivo',
      importarSub: s.importMsg ? 'Ya quedaron en tu cuenta.' : 'Sube a tu cuenta lo que esta app tenía guardado aquí antes de las cuentas. Hazlo una sola vez.',
      importar: () => { if (!s.importMsg) self.importarLocal(); },
      respaldoBtn: s.respaldo === 'preparando' ? 'Preparando respaldo…' : (s.respaldo === 'listo' ? 'Guardar respaldo' : 'Exportar mis datos'),
      respaldoColor: s.respaldo === 'error' ? RED : (s.respaldo === 'listo' ? MINT : '#fff'),
      respaldoSub: s.respaldoMsg || 'Descarga un archivo con todo lo tuyo (gimnasio, agenda, cuadernos, libreticas con abonos y perfil). Guárdalo como respaldo.',
      respaldoGo: () => { if (s.respaldo === 'listo') self.descargarRespaldo(); else self.prepararRespaldo(); },
      salir: () => self.salir(),
      editCardBg: s.edit ? 'rgba(206,127,85,.1)' : '#121724',
      editCardBorder: s.edit ? 'rgba(206,127,85,.34)' : 'rgba(255,255,255,.07)',
      editTitleColor: s.edit ? AMBER : '#fff',
      switchBg: s.edit ? AMBER : 'rgba(255,255,255,.1)',
      switchJustify: s.edit ? 'flex-end' : 'flex-start',
      switchKnob: s.edit ? '#090C14' : '#8E9AAE',

      tabs: tabDefs.map(([label, key, hs]) => {
        const on = s.tab === key;
        return {
          label, h1: hs[0], h2: hs[1], h3: hs[2],
          fg: on ? '#CE7F55' : '#8E9AAE', bg: on ? 'rgba(206,127,85,.12)' : 'transparent',
          border: on ? 'rgba(206,127,85,.26)' : 'transparent',
          go: () => self.setState({ tab: key }),
        };
      }),
    };
  }
}


/* ── Arranque ──────────────────────────────────────────────────────── */
const host = Pilares.mount({
  template: 'dc-template',
  root: 'screen',
  Component: Component,
  onRender: () => { if (window.Fluido) Fluido.trasRender(); },
  props: {
    acento: 'Naranja',          // 'Naranja' | 'Menta'
    pantallaInicial: 'Home',    // 'Home' | 'Ejercicio' | 'Estudio' | 'Finanzas'
    modoEdicion: false,
    ocultarCompletados: true,
  },
});
// Por aquí fluido.js le pide a la app cerrar hojas, cambiar de día o saldar.
window.PilaresApp = host.component;
