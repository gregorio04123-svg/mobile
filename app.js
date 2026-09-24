const MINT = '#57B9A0', MINT_D = '#5EA37D', GREEN = '#5EA37D', AMBER = '#CE7F55', RED = '#C46461', GREY = '#8E9AAE';

const ROUTINES = {
  E: { dia: 1, group: 'Espalda', abbr: 'ESPALD', ex: [
    { name: 'Dominadas', group: 'ESPALDA', type: 'COMPUESTO', sets: 4, reps: 8, rest: '3:00', drops: false, desc: 'Agarre prono ancho. Lleva el esternón a la barra y baja con control, escápulas deprimidas.' },
    { name: 'Remo en T', group: 'ESPALDA', type: 'COMPUESTO', sets: 4, reps: 8, rest: '3:00', drops: false, desc: 'Torso firme, sin balanceo. Tira hacia el abdomen bajo y aprieta un segundo arriba.' },
    { name: 'Jalón al Pecho', group: 'ESPALDA', type: 'COMPUESTO', sets: 3, reps: 8, rest: '2:00', drops: true, desc: 'Pecho arriba, codos hacia las caderas. Los descensos bajan el peso sin descanso al fallar.' },
    { name: 'Remo en Polea', group: 'ESPALDA', type: 'COMPUESTO', sets: 4, reps: 8, rest: '2:00', drops: true, desc: 'Espalda neutra, recorrido completo. Estira al frente sin redondear la lumbar.' },
    { name: 'Pull Over', group: 'ESPALDA', type: 'AISLAMIENTO', sets: 3, reps: 8, rest: '1:30', drops: true, desc: 'Codos semirrígidos. Siente el dorsal estirarse arriba y cierra hasta el muslo.' },
    { name: 'Hombro Posterior', group: 'HOMBRO', type: 'AISLAMIENTO', sets: 3, reps: 8, rest: '1:00', drops: true, desc: 'Codos a la altura del hombro, sin trapecio. Peso ligero y contracción marcada.' },
  ] },
  P: { dia: 2, group: 'Pecho', abbr: 'PECHO', ex: [
    { name: 'Inclinado en Smith', group: 'PECHO', type: 'COMPUESTO', sets: 4, reps: 8, rest: '3:00', drops: false, desc: 'Banco a 30°, escápulas retraídas. Barra a la clavícula, codos a 45° del torso.' },
    { name: 'Inclinado Mancuernas', group: 'PECHO', type: 'COMPUESTO', sets: 2, reps: 8, rest: '2:30', drops: false, desc: 'Recorrido completo sin choque arriba. Controla la bajada tres segundos.' },
    { name: 'Fondos', group: 'PECHO', type: 'COMPUESTO', sets: 4, reps: 8, rest: '2:30', drops: false, desc: 'Torso inclinado al frente para cargar pecho. Baja hasta sentir estiramiento.' },
    { name: 'Aperturas', group: 'PECHO', type: 'AISLAMIENTO', sets: 4, reps: 8, rest: '1:30', drops: true, desc: 'Codo fijo y ligeramente flexionado. Junta por delante del pecho, no de la cara.' },
    { name: 'Press Militar en Smith', group: 'HOMBRO', type: 'COMPUESTO', sets: 4, reps: 8, rest: '2:30', drops: false, desc: 'Core y glúteo activos. Barra sobre la línea media al bloquear.' },
    { name: 'Elevaciones Laterales Polea', group: 'HOMBRO', type: 'AISLAMIENTO', sets: 4, reps: 8, rest: '1:15', drops: true, desc: 'Sube hasta la línea del hombro, muñeca neutra. Sin impulso de cadera.' },
    { name: 'Extensión desde Abajo', group: 'TRÍCEP', type: 'AISLAMIENTO', sets: 3, reps: 8, rest: '1:00', drops: true, desc: 'Codos pegados al costado. Extensión completa y retorno controlado.' },
  ] },
  L: { dia: 3, group: 'Pierna', abbr: 'PIERNA', ex: [
    { name: 'Peso Muerto', group: 'PIERNA', type: 'COMPUESTO', sets: 3, reps: 8, rest: '3:30', drops: false, desc: 'Cadera atrás, espalda neutra, barra pegada a la pierna. Sin redondear la lumbar.' },
    { name: 'Sentadilla en Hack', group: 'PIERNA', type: 'COMPUESTO', sets: 3, reps: 8, rest: '3:00', drops: false, desc: 'Pies a la anchura de hombros, baja hasta paralela. Rodillas siguiendo la punta del pie.' },
    { name: 'Extensiones de Cuádricep', group: 'PIERNA', type: 'AISLAMIENTO', sets: 3, reps: 8, rest: '1:30', drops: true, desc: 'Pausa de un segundo arriba. Los descensos bajan el peso sin descanso al fallar.' },
    { name: 'Curl Acostado', group: 'PIERNA', type: 'AISLAMIENTO', sets: 3, reps: 8, rest: '1:30', drops: true, desc: 'Cadera pegada al banco. Aprieta el isquio arriba y baja lento.' },
    { name: 'Aducción', group: 'PIERNA', type: 'AISLAMIENTO', sets: 4, reps: 8, rest: '1:00', drops: true, desc: 'Rango completo sin rebote. Mantén la espalda apoyada.' },
    { name: 'Pantorrilla', group: 'PIERNA', type: 'AISLAMIENTO', sets: 4, reps: 8, rest: '1:00', drops: true, desc: 'Estiramiento máximo abajo, pausa arriba. Sin rebotar con el tendón.' },
    { name: 'Abdomen Rueda', group: 'ABDOMEN', type: 'COMPUESTO', sets: 4, reps: 8, rest: '45s', drops: false, desc: 'Pelvis en retroversión, sin arquear la lumbar. Avanza solo lo que puedas controlar.' },
  ] },
  H: { dia: 4, group: 'Hombro', abbr: 'HOMBRO', ex: [
    { name: 'Press Militar en Máquina', group: 'HOMBRO', type: 'COMPUESTO', sets: 4, reps: 8, rest: '2:30', drops: false, desc: 'Espalda apoyada, recorrido completo sin bloquear de golpe.' },
    { name: 'Elevaciones Laterales Máquina', group: 'HOMBRO', type: 'AISLAMIENTO', sets: 4, reps: 8, rest: '1:15', drops: true, desc: 'Codo guía el movimiento hasta la línea del hombro. Sin encoger el trapecio.' },
    { name: 'Elevaciones Lateral en Polea', group: 'HOMBRO', type: 'AISLAMIENTO', sets: 4, reps: 8, rest: '1:15', drops: true, desc: 'Polea por detrás del cuerpo, tensión constante en todo el rango.' },
    { name: 'Hombro Posterior', group: 'HOMBRO', type: 'AISLAMIENTO', sets: 3, reps: 8, rest: '1:00', drops: true, desc: 'Codos a la altura del hombro. Contracción marcada, peso ligero.' },
    { name: 'Polea a la Frente', group: 'HOMBRO', type: 'AISLAMIENTO', sets: 4, reps: 8, rest: '1:00', drops: true, desc: 'Sube a la altura de los ojos sin balanceo. Deltoides anterior.' },
    { name: 'Extensión desde Arriba', group: 'TRÍCEP', type: 'AISLAMIENTO', sets: 4, reps: 8, rest: '1:30', drops: true, desc: 'Codos apuntando al frente y fijos. Estira la cabeza larga del tríceps.' },
    { name: 'Extensión desde Abajo', group: 'TRÍCEP', type: 'AISLAMIENTO', sets: 3, reps: 8, rest: '1:00', drops: true, desc: 'Codos al costado, extensión completa y retorno controlado.' },
    { name: 'Curl Martillo', group: 'BÍCEP', type: 'AISLAMIENTO', sets: 4, reps: 8, rest: '1:15', drops: false, desc: 'Agarre neutro para braquial. Sin balanceo de cadera.' },
  ] },
};

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

// Ciclo de rutinas anclado al calendario: espalda → pecho → pierna → hombro.
const ROT = ['E', 'P', 'L', 'H'];

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
    r: ROT[((dayIndex(date) % 4) + 4) % 4],
  };
});
function fmtMoney(v) {
  const digits = String(v).replace(/\D/g, '');
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Sesión en blanco para un día de la tira semanal. */
function freshDay(w) {
  const r = ROUTINES[w.r];
  return {
    fecha: w.fecha, group: r.group, abbr: r.abbr, dia: r.dia,
    ex: r.ex.map((e, j) => ({
      id: w.fecha + '-' + j, name: e.name, group: e.group, type: e.type,
      sets: e.sets, reps: e.reps, rest: e.rest, drops: e.drops, desc: e.desc,
      done: Array(e.sets).fill(false),
      weights: Array(e.sets).fill(''),
      d1: Array(e.sets).fill(''), d2: Array(e.sets).fill(''),
    })),
  };
}

// Partes del estado que son datos del usuario (lo demás es interfaz).
const DATA_KEYS = ['logs', 'days', 'cuadernos', 'files', 'acts', 'libs', 'profile'];
const FRESH_JSON = WEEK.map(w => JSON.stringify(freshDay(w)));
const USUARIO_OK = /^[a-z0-9._-]{3,24}$/;
const NUBE_TXT = {
  ok: ['Guardado', MINT], guardando: ['Guardando…', AMBER],
  pendiente: ['Sin conexión · se guardará', AMBER], error: ['Un cambio no se guardó', RED],
};

function vacio() {
  return {
    logs: {}, days: WEEK.map(freshDay), cuadernos: [], files: {}, acts: [], libs: [],
    profile: { nombre: '', altura: '', peso: '', sexo: '' },
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
    });
  }

  /* ── Datos del servidor → estado ─────────────────────────────────── */
  desdeDatos(d) {
    // Las sesiones se guardan por fecha, no por posición: así la semana
    // puede correrse un día sin arrastrar el entrenamiento anterior.
    const logs = d.logs || {};
    return {
      logs,
      days: WEEK.map(w => {
        const prev = logs[w.fecha];
        return (prev && Array.isArray(prev.ex) && prev.ex.length) ? prev : freshDay(w);
      }),
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
      if (d && (s.logs[w.fecha] || JSON.stringify(d) !== FRESH_JSON[i])) sesiones[w.fecha] = d;
    });
    return { profile: s.profile, cuadernos: s.cuadernos, files: s.files, acts: s.acts, libs: s.libs, sesiones };
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
        data: { profile: s.profile, cuadernos: s.cuadernos, files: s.files, acts: s.acts, libs: s.libs, logs: this.snapshot().sesiones },
        base: this.base, codigo: s.codigo, amigos: s.amigos, cuadAmigos: s.cuadAmigos,
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
      }));
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
    this.uid = null; this.base = null; this.__sig = null; this.respaldoArchivo = null;
  }

  estadoFuera() {
    return Object.assign(vacio(), {
      auth: 'fuera', authMode: 'entrar', aNombre: '', aClave: '', authErr: '', authBusy: false,
      me: null, codigo: '', amigos: [], cuadAmigos: {}, amigoCodigo: '', amigoMsg: '', importMsg: '',
      nube: 'ok', respaldo: '', respaldoMsg: '', panel: false, modal: null, tab: 'home', openCuaderno: null, openLib: null,
      activeDay: 1, expanded: null,
    });
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
    if (tabla === 'conexiones') {
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
      const antes = this.huella();
      const d = await Nube.cargar(uid);
      if (uid !== this.uid) return;                 // cerró sesión mientras tanto
      if (this.base && this.huella() !== antes) { this.releer = true; return; }   // editaron mientras llegaba
      this.setState(Object.assign(this.desdeDatos(d), {
        auth: 'dentro', cargaError: '', codigo: d.codigo, amigos: d.amigos, cuadAmigos: d.cuadAmigos, nube: 'ok',
      }));
      this.base = Nube.filas(this.snapshot(), uid);
      this.__sig = DATA_KEYS.map(k => this.state[k]);
      this.guardarCache();
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
      for (let i = 0; i < 6 && this.hayPendientes(); i++) {
        await this.subir();
        if (this.hayPendientes()) await new Promise(r => setTimeout(r, 700));
      }
      if (this.hayPendientes()) throw new Error('pendiente');
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
    const d = ICONS[name];
    if (!d) return null;
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
      const sec = e.group !== day.group.toUpperCase();
      const col = sec ? AMBER : MINT;
      const full = dc >= e.sets;
      const tier = TIER[e.name] || e.type;
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
        onName: ev => { const v = ev.target.value; self.mut(d => { d[s.activeDay].ex.find(q => q.id === e.id).name = v; }); },
        onSets: ev => { const v = Math.max(1, Math.min(10, parseInt(ev.target.value, 10) || 1)); self.mut(d => { const x = d[s.activeDay].ex.find(q => q.id === e.id); const old = x.sets; x.sets = v; const fit = (arr, f) => { while (arr.length < v) arr.push(f); while (arr.length > v) arr.pop(); }; fit(x.done, false); fit(x.weights, x.weights[old - 1] || ''); fit(x.d1, ''); fit(x.d2, ''); }); },
        onReps: ev => { const v = Math.max(1, Math.min(50, parseInt(ev.target.value, 10) || 1)); self.mut(d => { d[s.activeDay].ex.find(q => q.id === e.id).reps = v; }); },
        onRest: ev => { const v = ev.target.value; self.mut(d => { d[s.activeDay].ex.find(q => q.id === e.id).rest = v; }); },
      };
    });

    const week = WEEK.map((d, i) => {
      const on = i === s.activeDay;
      return {
        dow: d.dow, n: String(d.n), abbr: (s.days[i].abbr || '').slice(0, 3),
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
        deudor: l.deudor, prestamista: l.prestamista, monto: fmtMoney(l.monto),
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
      isHome: s.tab === 'home', isEjercicio: s.tab === 'ejercicio', isEstudio: s.tab === 'estudio', isFinanzas: s.tab === 'finanzas',
      editOn: s.edit, panelOn: s.panel, modalOn: !!m, restOn: s.restOn,
      goEjercicio: () => self.setState({ tab: 'ejercicio' }),
      goEstudio: () => self.setState({ tab: 'estudio', estudioTab: 'agenda', openCuaderno: null }),
      goFinanzas: () => self.setState({ tab: 'finanzas' }),
      openPanel: () => self.setState({ panel: true }),
      closePanel: () => self.setState({ panel: false, respaldo: s.respaldo === 'preparando' ? 'preparando' : '', respaldoMsg: s.respaldo === 'preparando' ? s.respaldoMsg : '' }),
      toggleEdit: () => self.setState(st => ({ edit: !st.edit })),

      ringColor: pct >= 100 ? GREEN : ac, ringOffset: 188.5 * (1 - pct / 100), pctText: pct + '%',
      dayColor: DAY_COLOR[day.group] || ac,
      dayChipBg: (DAY_COLOR[day.group] || ac) + '1F',
      dayStateTxt: pct >= 100 ? 'COMPLETO' : (doneSets > 0 ? pct + '% HECHO' : 'SIN EMPEZAR'),
      finanzasSummary: cobrar.length + ' POR COBRAR · ' + pagar.length + ' POR PAGAR',
      canReset: doneSets > 0,
      resetDay: () => self.mut(d => d[s.activeDay].ex.forEach(e => { e.done = e.done.map(() => false); })),
      dayGroup: day.group, dayHeader: w.dow + ' ' + w.n + ' ' + w.mes, dayNum: String(day.dia),
      seriesText: doneSets + ' de ' + totalSets + ' series',
      exCountText: day.ex.length + ' ej · ' + (pct >= 100 ? 'Sesión completa' : 'Compuestos 1º'),
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
      estudioKicker: s.openCuaderno ? '‹ CUADERNOS' : 'ESTUDIO · ' + misActs.length + ' ACTIVIDADES',
      estudioKickerColor: s.openCuaderno ? '#CE7F55' : '#8E9AAE',
      estudioTitle: openC ? openC.nombre : 'Estudio',
      backCuadernos: () => { if (s.openCuaderno) self.setState({ openCuaderno: null }); },
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
      closeModal: () => self.setState({ modal: null }),
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
      saveAct: () => self.setState(st => {
        const mm = st.modal;
        if (mm.id) return { acts: st.acts.map(a => a.id === mm.id ? { ...a, c: mm.c, tipo: mm.tipo, fecha: mm.fecha, asunto: mm.asunto } : a), modal: null };
        const para = mm.para || me;
        return { acts: st.acts.concat([{ id: Nube.uuid(), c: mm.c, tipo: mm.tipo, fecha: mm.fecha, asunto: mm.asunto.length ? mm.asunto : ['Sin temas'],
                                          owner: para, por: para === me ? null : me, nota: '' }]), modal: null };
      }),
      deleteAct: () => self.setState(st => ({ acts: st.acts.filter(a => a.id !== st.modal.id), modal: null })),

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
          bg: i % 2 ? MINT : AMBER, estado: ok ? 'AMIGO' : 'ESPERANDO RESPUESTA', estadoColor: ok ? MINT : '#8E9AAE',
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
Pilares.mount({
  template: 'dc-template',
  root: 'screen',
  Component: Component,
  props: {
    acento: 'Naranja',          // 'Naranja' | 'Menta'
    pantallaInicial: 'Home',    // 'Home' | 'Ejercicio' | 'Estudio' | 'Finanzas'
    modoEdicion: false,
    ocultarCompletados: true,
  },
});
