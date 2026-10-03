// Cada pilar lleva el color de su barra en el ícono de la app: Ejercicio verde,
// Estudio naranja y Finanzas hueso.
const BONE = '#EDE4D3';
const PILAR_COLOR = {
  ejercicio: { c: '#57B9A0', bg: 'rgba(87,185,160,.12)', border: 'rgba(87,185,160,.28)' },
  estudio: { c: '#CE7F55', bg: 'rgba(206,127,85,.12)', border: 'rgba(206,127,85,.26)' },
  finanzas: { c: BONE, bg: 'rgba(237,228,211,.09)', border: 'rgba(237,228,211,.24)' },
};
const GASTO = '#A7B0BF', MINT = '#57B9A0', MINT_D = '#5EA37D', GREEN = '#5EA37D', AMBER = '#CE7F55', RED = '#C46461', GREY = '#8E9AAE';

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
// Tipos de actividad de una cuenta nueva. Cada quien crea, renombra o borra los suyos.
const TIPOS_BASE = [
  { nombre: 'Quiz', urgencia: true }, { nombre: 'Seguimiento', urgencia: true }, { nombre: 'Parcial', urgencia: true },
  { nombre: 'Final', urgencia: true }, { nombre: 'Tarea', urgencia: false },
];

const DIA_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
// Colores para grupos nuevos (los 4 primeros son los de siempre).
const PALETA = ['#4B7BE5', '#E05C5C', '#5EA37D', '#9B6BD6', '#CE7F55', '#57B9A0', '#D4A843', '#8E9AAE'];
// Tres tipos de gasto: Comida, Ocio y Trabajo (todo lo que no es comida ni ocio).
// Pilares lo deduce del motivo; si la persona lo cambia, lo recuerda para ese mismo motivo.
const TIPOS_GASTO = [
  { k: 'comida', n: 'Comida', c: '#CE7F55', tint: 'rgba(206,127,85,.16)',
    re: /almuerz|\bcena|desayun|comida|\bcomi\b|restaur|\bcafe|\btinto\b|pizza|hamburg|perro caliente|empanada|snack|mecato|mercado|supermerc|\btienda\b|domicilio|rappi|helado|\bpan\b|panader|bebida|gaseosa|\bjugo|\bagua\b|fruta|verdura|\bcarne|pollo|arepa|sushi|postre|dulce|\bonces\b|merienda|galleta|chocolate/ },
  { k: 'ocio', n: 'Ocio', c: '#B49AD0', tint: 'rgba(180,154,208,.16)',
    re: /\bcine|netflix|spotify|youtube|\bjuego|fiesta|salida|concierto|\bbar\b|discoteca|rumba|cerveza|\btrago|licor|paseo|viaje|steam|playstation|xbox|regalo|suscripcion|disney|\bhbo\b|\bprime\b|\bentrada|boleta|\bropa\b|camisa|camiseta|pantalon|zapato|\btenis\b|\bjean|perfume|maquillaje|peluquer|barber/ },
  { k: 'trabajo', n: 'Trabajo', c: '#57B9A0', tint: 'rgba(87,185,160,.16)', re: null },
];
const TIPO_GASTO = { comida: TIPOS_GASTO[0], ocio: TIPOS_GASTO[1], trabajo: TIPOS_GASTO[2] };
function motivoClave(nota) {
  return String(nota || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
}
// Un motivo vacío o que es solo una fecha (atajo mal armado) no dice nada.
function motivoUtil(nota) { const t = motivoClave(nota); return !!t && !/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(t); }
function tipoGasto(l, aprendidos) {
  if (l.cat && TIPO_GASTO[l.cat]) return TIPO_GASTO[l.cat];
  if (!motivoUtil(l.nota)) return TIPO_GASTO.trabajo;
  const t = motivoClave(l.nota);
  if (aprendidos && aprendidos[t]) return TIPO_GASTO[aprendidos[t]];
  return TIPOS_GASTO.find(x => x.re && x.re.test(t)) || TIPO_GASTO.trabajo;
}

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
/** Lista de tipos del perfil, limpia (sin repetidos ni vacíos); la base si no hay. */
function tiposDe(p) {
  const x = p && Array.isArray(p.tipos) ? p.tipos : null;
  if (!x) return TIPOS_BASE;
  const vistos = new Set(), out = [];
  x.forEach(t => {
    const nombre = t && typeof t.nombre === 'string' ? t.nombre.trim().slice(0, 30) : '';
    if (!nombre || vistos.has(norm(nombre))) return;
    vistos.add(norm(nombre));
    out.push({ nombre, urgencia: t.urgencia !== false });
  });
  return out.length ? out.slice(0, 30) : TIPOS_BASE;
}
/** ¿Ya se le envió al amigo? (una copia vieja no lo sabe: las compartidas lo estaban). */
function enviadaDe(l) { return l.enviada === undefined ? !!l.contra : !!l.enviada; }
/** ¿La actividad usa colores de urgencia? (una copia vieja no lo trae: la Tarea no). */
function conUrg(a) { return a.urg === undefined ? a.tipo !== 'Tarea' : a.urg !== false; }
function primerNombre(n) { return String(n || '').trim().split(/\s+/)[0] || 'tu amigo'; }
// Los nombres que les pones a tus amigos (solo tú los ves): id → apodo. Se
// arma en cada dibujo desde s.amigos. Solo cambian lo que se muestra; lo que
// se guarda o se envía lleva siempre el nombre que tiene en Pilares.
let APODOS = {};
function nombreVisto(id, nombre) { return (id && APODOS[id]) || nombre; }
/** Para frases: el apodo completo («Tío Carlos») o el primer nombre. */
function nombreCorto(id, nombre) { return (id && APODOS[id]) || primerNombre(nombre); }
/** El apodo como se guarda: sin espacios de más, máx. 40; igual a su nombre = sin apodo. */
function apodoLimpio(v, nombre) {
  const x = String(v || '').trim().replace(/\s+/g, ' ').slice(0, 40).trim();
  return x === String(nombre || '').trim() ? '' : x;
}
// Semana empezando en lunes (índices de día: 0 = domingo).
const DIAS_LUNES = [1, 2, 3, 4, 5, 6, 0];
function entero(v, min, max, def) { const n = parseInt(v, 10); return isNaN(n) ? def : Math.max(min, Math.min(max, n)); }
function recorte(v, max, def) { const x = typeof v === 'string' ? v.trim() : ''; return (x || def || '').slice(0, max); }
/** Destino que trae el enlace de una notificación (?ir=estudio&fecha=…). */
function leerDestino(url) {
  try {
    const u = new URL(url, location.href), ir = u.searchParams.get('ir');
    if (!['estudio', 'finanzas', 'ejercicio', 'chat', 'grupo'].includes(ir)) return null;
    return { ir, fecha: u.searchParams.get('fecha'), libreta: u.searchParams.get('libreta'), inv: u.searchParams.get('inv'), con: u.searchParams.get('con'),
             g: u.searchParams.get('g'), lg: u.searchParams.get('lg') };
  } catch (e) { return null; }
}
function destinoDe(a) {
  if (a.tipo === 'actividad' || a.tipo === 'recordatorio') return { ir: 'estudio', fecha: a.fecha };
  if (a.tipo === 'libreta' || a.tipo === 'abono') return { ir: 'finanzas', libreta: a.ref };
  if (a.tipo === 'libreta_grupo' || a.tipo === 'abono_grupo') return { ir: 'finanzas', lg: a.ref };
  if (a.tipo === 'rutina') return { ir: 'ejercicio', inv: a.ref, quien: a.titulo };
  if (a.tipo === 'grupo') return { ir: 'grupo', g: a.ref };
  return null;
}
/** «A», «A y B», «A, B y C». */
function listaNombres(ns) {
  const x = ns.filter(Boolean);
  return x.length <= 1 ? (x[0] || '') : x.slice(0, -1).join(', ') + ' y ' + x[x.length - 1];
}
/** Texto de un mensaje del sistema en un grupo (creó, agregó, salió, nombre, borró). */
function textoSistema(m, me) {
  const d = m.datos || {}, yo = m.de === me, quien = nombreCorto(m.de, m.deNombre || 'Alguien');
  if (d.accion === 'crear') return (yo ? 'Creaste' : quien + ' creó') + ' el grupo «' + (d.nombre || '') + '»';
  if (d.accion === 'agregar') {
    const otros = Array.isArray(d.otros) ? d.otros : [], nombres = Array.isArray(d.nombres) ? d.nombres : [];
    if (!yo && otros.includes(me)) return quien + ' te agregó al grupo';
    // nombres va en el mismo orden que otros (los ids).
    const juntos = nombres.length === otros.length;
    return (yo ? 'Agregaste a ' : quien + ' agregó a ') + listaNombres(nombres.map((n, i) => juntos ? nombreCorto(otros[i], n) : primerNombre(n)));
  }
  if (d.accion === 'salir') return (yo ? 'Saliste' : quien + ' salió') + ' del grupo';
  if (d.accion === 'nombre') return (yo ? 'Cambiaste' : quien + ' cambió') + ' el nombre a «' + (d.nombre || '') + '»';
  if (d.accion === 'borrar_libreta') {
    return (yo ? 'Borraste' : quien + ' borró') + ' la libretica ' + (d.nota ? '«' + d.nota + '»' : 'de ' + pesosTxt(d.total));
  }
  if (d.accion === 'actividad') {
    return (yo ? 'Actualizaste' : quien + ' actualizó') + ' «' + (d.tipo || 'la actividad') + '»: ' + fechaLarga(d.fecha).toLowerCase() +
      (d.antes ? ' (antes ' + fechaLarga(d.antes).toLowerCase() + ')' : '');
  }
  return '';
}
/** Vista previa del último mensaje de un grupo en la lista de chats. */
function previewGrupo(u, me) {
  if (!u) return 'Toca para escribirle al grupo';
  if (u.tipo === 'sistema') return textoSistema(u, me);
  const quien = u.de === me ? 'Tú: ' : nombreCorto(u.de, u.deNombre || 'Alguien') + ': ', d = u.datos || {};
  if (u.tipo === 'texto') return quien + u.texto;
  if (u.tipo === 'libreta') return quien + 'Libretica · ' + pesosTxt(d.total) + (d.nota ? ' · ' + d.nota : '');
  if (u.tipo === 'rutina') return quien + (d.tipo === 'semana' ? 'Rutina · semana completa' : 'Rutina · «' + (d.nombre || 'grupo') + '»');
  return quien + 'Actividad · ' + (d.tipo || '') + (d.cuaderno ? ' · ' + d.cuaderno : '');
}
/** Iniciales de un grupo: «Viernes de pizza» → «VP». */
const PALABRAS_VACIAS = ['de', 'del', 'la', 'las', 'los', 'el', 'y', 'e', 'en', 'a', 'al', 'con', 'para', 'por'];
function inicialesDe(nombre) {
  const todas = String(nombre || '').trim().split(/\s+/).filter(Boolean);
  const utiles = todas.filter(w => !PALABRAS_VACIAS.includes(w.toLowerCase()));
  return (utiles.length ? utiles : todas).slice(0, 2).map(w => w.charAt(0).toUpperCase()).join('') || '?';
}
/** Lo que falta de cada parte de una libretica de grupo. */
function saldoParte(p) { return Math.max(0, (p.monto || 0) - (p.abonos || []).reduce((t, a) => t + (a.monto || 0), 0)); }
const MESES_LARGO = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS_LARGO = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
function fechaLarga(f) {
  const p = String(f || '').split('-').map(Number);
  if (p.length !== 3 || !p[0]) return '';
  return DIAS_LARGO[new Date(p[0], p[1] - 1, p[2]).getDay()] + ' ' + p[2] + ' de ' + MESES_LARGO[p[1] - 1];
}
function horaCorta(ts) {
  const d = new Date(ts), h = d.getHours();
  return (h % 12 || 12) + ':' + String(d.getMinutes()).padStart(2, '0') + ' ' + (h < 12 ? 'a. m.' : 'p. m.');
}
/** Separador de días en el chat. */
function diaChat(ts) {
  const d = new Date(ts), k = isoOf(d), hoy = new Date();
  if (k === isoOf(hoy)) return 'Hoy';
  if (k === isoOf(addDays(hoy, -1))) return 'Ayer';
  return fechaLarga(k) + (d.getFullYear() !== hoy.getFullYear() ? ' de ' + d.getFullYear() : '');
}
/** Hora corta en la lista de chats: hoy la hora, ayer "Ayer", esta semana el día. */
function cuandoChat(ts) {
  const d = new Date(ts), hoy = new Date(), dias = dayDiff(isoOf(d), isoOf(hoy));
  if (dias <= 0) return horaCorta(ts);
  if (dias === 1) return 'Ayer';
  if (dias < 7) return DIAS_LARGO[d.getDay()].slice(0, 3);
  return d.getDate() + ' ' + MONTHS_SH[d.getMonth()].toLowerCase();
}
/** Un color fijo por persona para su avatar. */
function colorDe(id) {
  let h = 0;
  for (const ch of String(id || '')) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETA[h % PALETA.length];
}
function pesosTxt(n) { return '$' + fmtMoney(String(Math.round(+n || 0))); }
/** Resumen del último mensaje para la lista de chats. */
function previewChat(c, me) {
  const yo = c.de === me ? 'Tú: ' : '', d = c.datos || {};
  if (c.tipo === 'texto') return yo + c.texto;
  if (c.tipo === 'libreta') return yo + 'Libretica · ' + pesosTxt(d.monto) + (d.nota ? ' · ' + d.nota : '');
  if (c.tipo === 'actividad') return yo + 'Actividad · ' + (d.tipo || '') + (d.cuaderno ? ' · ' + d.cuaderno : '');
  if (c.tipo === 'rutina') return yo + (d.tipo === 'semana' ? 'Rutina · semana completa' : 'Rutina · «' + (d.nombre || 'grupo') + '»');
  return '';
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
    profile: { nombre: '' },
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
      showHist: false, openLib: null, abonoMonto: '', gastosOn: false, finMes: 0, sueldoEdit: false, sueldoInput: '',
      menuDia: null, rutinaOn: false, rGrupo: null, rEj: null, rCompartir: null,
      invRutinas: [], verRutina: null,
      avisos: [], avisosLeidos: null, avisosAntes: null, avisosTodos: false,
      push: '', pushBusy: false, pushMsg: '', pushSuena: false,
      atajoClave: null, atajoCambiar: false, atajoBusy: false, atajoMsg: '',   // null = aún no se sabe
      tipoEd: null,   // editor de un tipo de actividad (Modo edición)
      elegir: null,   // hoja «Elegir amigo»: { tipo: 'lib' | 'para', id, q }
      chats: [],      // un renglón por conversación (último mensaje, sin leer)
      chatCon: null,  // amigo con el chat abierto (o chatG: grupo)
      chatMsgs: {},   // mensajes cargados por amigo (o 'g:' + grupo): { lista, hayMas, cargando, error }
      chatTexto: '', chatHoja: null,
      gAmigos: [],    // mis grupos de amigos (nombre, miembros, último mensaje, sin leer)
      chatG: null,    // grupo con el chat abierto
      libsG: [],      // libreticas de grupo en las que estoy (las creé o debo)
      lgVer: null,    // libretica de grupo abierta en su hoja de detalle
      lgExtra: {},    // libreticas de grupo vistas por id (en las que no participo)
      lgAbono: '', lgBusy: false, lgMsg: '',
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
      // Solo nombre y tipos: altura, peso, sexo y la hora del recordatorio ya no se usan
      // (una copia vieja en el teléfono los traía; aquí se descartan).
      profile: { nombre: (d.profile && d.profile.nombre) || '', tipos: (d.profile && d.profile.tipos) || null,
                 ...(d.profile && d.profile.sueldo !== undefined ? { sueldo: d.profile.sueldo } : {}) },
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
        avisos: s.avisos, avisosLeidos: s.avisosLeidos, chats: s.chats, gAmigos: s.gAmigos, libsG: s.libsG,
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
    // Chat: Enter envía; con el teclado abierto el chat usa solo la parte visible.
    document.addEventListener('keydown', e => {
      const x = e.target;
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && x && x.matches && x.matches('[data-chat-entrada]')) {
        e.preventDefault();
        this.enviarMensaje();
      }
      if (e.key === 'Enter' && !e.isComposing && x && x.matches && x.matches('[data-apodo-entrada]')) {
        e.preventDefault();
        this.guardarApodo();
      }
      if (e.key === 'Enter' && !e.isComposing && x && x.matches && x.matches('[data-amigos-buscar]')) {
        e.preventDefault();
        x.blur();
      }
      if (e.key === 'Enter' && !e.isComposing && x && x.matches && x.matches('[data-elegir-buscar]')) {
        e.preventDefault();
        this.elegirConEnter();
      }
    });
    // El desplazamiento no burbujea: se escucha en captura y se filtra la lista del chat.
    document.addEventListener('scroll', e => {
      const t = e.target;
      if (!t || !t.matches || !t.matches('[data-chat-lista]')) return;
      this.chatMovidoEn = Date.now();
      this.revisarAnteriores();
    }, { capture: true, passive: true });
    if (window.visualViewport) {
      const ajustar = () => this.ajustarTeclado();
      window.visualViewport.addEventListener('resize', ajustar);
      window.visualViewport.addEventListener('scroll', ajustar);
    }
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
    if (this.anclaChat != null) {
      const el = document.querySelector('[data-chat-lista]');
      if (el) el.scrollTop += el.scrollHeight - this.anclaChat;
      this.anclaChat = null;
      setTimeout(() => this.revisarAnteriores(), 0);   // si aún se ve el principio, sigue trayendo
    }
    if (this.bajarPend) {
      const el = document.querySelector('[data-chat-lista]');
      if (el) { el.scrollTop = el.scrollHeight; this.bajarPend = false; }
    }
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
        chats: cache.chats || [], gAmigos: cache.gAmigos || [], libsG: cache.libsG || [],
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
      nube: 'ok', respaldo: '', respaldoMsg: '', panel: false, modal: null, tab: 'home', openCuaderno: null, openLib: null, gastosOn: false, finMes: 0, sueldoEdit: false, sueldoInput: '',
      activeDay: 1, expanded: null, elegir: null, atajoClave: null, atajoCambiar: false, atajoMsg: '',
      menuDia: null, rutinaOn: false, rGrupo: null, rEj: null, rCompartir: null,
      invRutinas: [], verRutina: null,
      avisos: [], avisosLeidos: null, avisosAntes: null, avisosTodos: false, pushMsg: '',
      chats: [], chatCon: null, chatMsgs: {}, chatTexto: '', chatHoja: null,
      gAmigos: [], chatG: null, libsG: [], lgVer: null, lgExtra: {}, lgAbono: '', lgBusy: false, lgMsg: '',
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
            nombre: nombreVisto(a.id, a.nombre), inicial: (nombreVisto(a.id, a.nombre) || '?').charAt(0).toUpperCase(), bg: i % 2 ? MINT : AMBER,
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
    const cerrar = () => this.setState(st => tipo === 'modal' ? { modal: null, tipoEd: null }
      : tipo === 'rutina' ? { rutinaOn: false, rGrupo: null, rEj: null, rCompartir: null }
      : tipo === 'ver' ? { verRutina: null }
      : tipo === 'chat' ? { chatHoja: null }
      : tipo === 'lg' ? { lgVer: null, lgAbono: '', lgMsg: '', lgBusy: false }
      : tipo === 'elegir' ? { elegir: null }
      : tipo === 'gastos' ? { gastosOn: false, openLib: null, sueldoEdit: false }
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
    if (tabla === 'mensajes') { if (tipo === 'INSERT') this.recibirMensaje(nuevo); return; }
    if (tabla === 'mensajes_grupo') { if (tipo === 'INSERT') this.recibirMensajeGrupo(nuevo); return; }
    if (tabla === 'abonos_grupo' || tabla === 'libretas_grupo') {
      // Un borrado llega solo con el id (a todos): importa si es algo que tengo.
      if (tipo === 'DELETE') {
        const s = this.state, todas = s.libsG.concat(Object.values(s.lgExtra).filter(Boolean));
        const conozco = tabla === 'libretas_grupo'
          ? todas.some(l => l.id === viejo.id)
          : todas.some(l => l.partes.some(p => p.abonos.some(a => a.id === viejo.id)));
        if (!conozco) return;
      }
      this.cargarLibsG();
      return;
    }
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
        avisos: d.avisos, avisosLeidos: d.avisosLeidos, chats: d.chats, gAmigos: d.gAmigos, libsG: d.libsG,
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
      if (ya) throw new Error(ya.estado === 'aceptada' ? nombreVisto(ya.id, p.nombre) + ' ya es tu amigo.' : 'Ya hay una solicitud pendiente con ' + p.nombre + '.');
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

  nombrePilares(inv) { return (this.state.amigos.find(a => a.id === inv.de) || {}).nombre || inv.deNombre || 'Un amigo'; }
  nombreAmigo(inv) { return nombreVisto(inv.de, this.nombrePilares(inv)); }

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
    const quien = nombreCorto(inv.de, this.nombrePilares(inv));
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

  /* ── Avisos y notificaciones ─────────────────────────────────────── */

  /** Después de cada lectura: número del ícono, este dispositivo a nombre
   *  de la cuenta y enlace pendiente. */
  trasLeer() {
    const s = this.state;
    this.actualizarGlobo();
    if (s.chatCon) {
      this.cargarChat(s.chatCon);
      if (document.visibilityState === 'visible') this.marcarLeido(s.chatCon);
    } else if (s.chatG) {
      // Salí del grupo desde otro dispositivo: se cierra su chat.
      if (!s.gAmigos.some(g => g.id === s.chatG)) this.cerrarChat();
      else {
        this.cargarChat('g:' + s.chatG);
        if (document.visibilityState === 'visible') this.marcarLeidoGrupo(s.chatG);
      }
    }
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
    const cambios = cerrarTodo ? { panel: false, modal: null, rutinaOn: false, verRutina: null, menuDia: null, chatHoja: null, lgVer: null, elegir: null } : {};
    let hallado = true, libreta = null;
    if (d.ir === 'estudio') {
      Object.assign(cambios, { tab: 'estudio', estudioTab: 'agenda', openCuaderno: null });
      if (/^\d{4}-\d{2}-\d{2}$/.test(d.fecha || '')) {
        const p = d.fecha.split('-').map(Number);
        Object.assign(cambios, { year: p[0], month: p[1] - 1, selDay: p[2] });
      }
    } else if (d.ir === 'finanzas' && d.lg) {
      // Libretica de grupo: Finanzas con su detalle abierto (si ya no existe, la hoja lo dice).
      cambios.tab = 'finanzas';
      this.setState(cambios);
      this.abrirLibretaGrupo(d.lg);
      return true;
    } else if (d.ir === 'grupo') {
      if (d.g && s.gAmigos.some(g => g.id === d.g)) {
        this.setState(cambios);
        this.abrirGrupo(d.g);
        return true;
      }
      hallado = !d.g;
    } else if (d.ir === 'finanzas') {
      cambios.tab = 'finanzas';
      const l = d.libreta && s.libs.find(x => x.id === d.libreta);
      if (l && l.paid) cambios.showHist = true;
      else if (l) { cambios.openLib = l.id; libreta = l.id; }
      else hallado = !d.libreta;
    } else if (d.ir === 'ejercicio' || d.ir === 'chat') {
      // Las rutinas llegan por el chat: se abre la conversación con quien la envió.
      const inv = d.inv && s.invRutinas.find(x => x.id === d.inv);
      if (inv && inv.grupo && s.gAmigos.some(g => g.id === inv.grupo)) {
        this.setState(cambios);
        this.abrirGrupo(inv.grupo);
        this.setState({ verRutina: { modo: 'inv', inv } });
        return true;
      }
      // Ya respondida: el chat con quien la envió, si su nombre no se repite entre tus amigos
      // (el aviso trae el apodo que le pusiste o, si no tiene, su nombre).
      const tocayos = !inv && d.quien ? s.amigos.filter(a => a.estado === 'aceptada' && (a.apodo || a.nombre) === d.quien) : [];
      const con = inv ? inv.de : d.con || (tocayos.length === 1 ? tocayos[0].id : null);
      if (con && s.amigos.some(a => a.id === con && a.estado === 'aceptada')) {
        this.setState(cambios);
        this.abrirChat(con);
        if (inv) this.setState({ verRutina: { modo: 'inv', inv } });
        return true;
      }
      hallado = !(d.inv || d.con);
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

  abrirPanel() {
    this.setState({ panel: true, amigosQ: '', pushMsg: '', pushSuena: false, atajoCambiar: false, atajoMsg: '' });
    this.actualizarPush();
    this.leerClaveAtajo();
  }

  /* ── Atajo del iPhone: la app Atajos pregunta y guarda con esta clave ── */
  async leerClaveAtajo() {
    try { this.setState({ atajoClave: await Nube.miClaveAtajo() }); }
    catch (e) { if (this.state.atajoClave === null) this.setState({ atajoMsg: 'Sin conexión: no se pudo leer la clave.' }); }
  }

  /** Crea la clave; si ya hay una, el primer toque pide confirmar (la vieja deja de servir). */
  async crearClaveAtajo() {
    const s = this.state;
    if (s.atajoBusy) return;
    if (s.atajoClave && !s.atajoCambiar) { this.setState({ atajoCambiar: true, atajoMsg: '' }); return; }
    this.setState({ atajoBusy: true, atajoMsg: '' });
    try {
      const k = await Nube.nuevaClaveAtajo();
      this.setState({ atajoClave: k, atajoCambiar: false,
                      atajoMsg: s.atajoClave ? 'Clave nueva. Cópiala y pégala en el atajo: la anterior ya no sirve.' : '' });
    } catch (e) {
      this.setState({ atajoMsg: e.message || 'No se pudo crear la clave. Revisa tu conexión.' });
    } finally {
      this.setState({ atajoBusy: false });
    }
  }

  async copiarClaveAtajo() {
    const k = this.state.atajoClave;
    if (!k) return;
    try {
      await navigator.clipboard.writeText(k);
      if (window.Fluido) Fluido.aviso('Clave copiada');
    } catch (e) {
      // Sin permiso para copiar: se selecciona para copiarla a mano.
      const x = document.querySelector('[data-atajo-clave]');
      if (x && window.getSelection) { const r = document.createRange(); r.selectNodeContents(x); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); }
      this.setState({ atajoMsg: 'Mantén presionada la clave para copiarla.' });
    }
  }

  valsAtajo(s) {
    const self = this, k = s.atajoClave;
    return {
      atajoListo: !!k, atajoSinClave: k === '', atajoClave: k || '',
      atajoCambiarTxt: s.atajoBusy ? 'Creando…' : (s.atajoCambiar ? 'Toca otra vez' : 'Cambiar'),
      atajoCambiarColor: s.atajoCambiar ? '#E08A87' : '#8E9AAE',
      atajoCrearTxt: s.atajoBusy ? 'Creando…' : 'Crear clave',
      atajoMsg: s.atajoMsg || '',
      crearClaveAtajo: () => self.crearClaveAtajo(), copiarClaveAtajo: () => self.copiarClaveAtajo(),
    };
  }

  async actualizarPush() {
    try {
      const e = await Nube.estadoPush();
      if (e !== this.state.push) this.setState({ push: e });
    } catch (err) { this.setState({ push: 'no' }); }
  }

  /** La campanita: prende o apaga las notificaciones en este dispositivo.
   *  Si el sistema no las deja, explica qué hacer en vez de cambiar. */
  async alternarPush() {
    const s = this.state;
    if (s.pushBusy) return;
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const explica = {
      instalar: 'Para recibirlas en el iPhone, primero agrega Pilares a tu pantalla de inicio (Safari › Compartir › Agregar a inicio) y ábrela desde el ícono. Necesitas iOS 16.4 o más reciente.',
      no: 'Este navegador no permite notificaciones. Tus avisos igual aparecen aquí.',
      bloqueado: ios ? 'Están bloqueadas: actívalas en Ajustes › Notificaciones › Pilares.' : 'Están bloqueadas: permítelas en la configuración del navegador para este sitio.',
    }[s.push];
    if (explica) { this.setState({ pushMsg: explica }); return; }
    if (s.push !== 'activo' && s.push !== 'pedir') return;   // aún revisando
    const prender = s.push === 'pedir';
    this.setState({ pushBusy: true, pushMsg: '' });
    try {
      const e = prender ? await Nube.activarPush() : await Nube.desactivarPush();
      this.setState({ push: e, pushSuena: e === 'activo', pushMsg: e === 'bloqueado' ? explica || 'No diste el permiso. Puedes darlo en los ajustes del celular.' : '' });
      if (window.Fluido && (e === 'activo' || !prender)) Fluido.aviso(e === 'activo' ? 'Notificaciones prendidas en este celular' : 'Notificaciones apagadas en este celular');
    } catch (err) {
      this.setState({ pushMsg: err.message || (prender ? 'No se pudieron prender. Intenta de nuevo.' : 'No se pudieron apagar. Intenta de nuevo.') });
    } finally {
      this.setState({ pushBusy: false });
    }
  }

  /** La ruedita: su número y la campanita (los avisos ya no se listan: llegan
   *  como notificación y el Resumen muestra lo pendiente). */
  valsAvisos(s) {
    const self = this;
    const on = s.push === 'activo';
    // El número de la ruedita: mensajes sin leer + solicitudes de amistad.
    const globo = s.chats.reduce((t, c) => t + (c.sinLeer || 0), 0) + s.gAmigos.reduce((t, g) => t + (g.sinLeer || 0), 0)
      + s.amigos.filter(a => a.estado === 'pendiente' && !a.yo).length;
    return {
      avisosBadge: globo > 0, avisosBadgeTxt: globo > 9 ? '9+' : String(globo),
      // Campanita: naranja y llena = prendidas; gris y tachada = apagadas o no disponibles.
      campanaEstado: on ? (s.pushSuena ? 'suena' : 'on') : 'off', campanaOn: on ? 'true' : 'false',
      campanaLabel: on ? 'Notificaciones prendidas en este celular. Toca para apagarlas.'
        : (s.push === 'pedir' ? 'Notificaciones apagadas. Toca para prenderlas.' : 'Notificaciones no disponibles. Toca para ver por qué.'),
      campanaColor: on ? AMBER : '#8E9AAE', campanaRelleno: on ? 'rgba(206,127,85,.28)' : 'none',
      campanaBg: on ? 'rgba(206,127,85,.14)' : 'rgba(255,255,255,.05)', campanaBorde: on ? 'rgba(206,127,85,.42)' : 'transparent',
      campanaTacha: on ? '0' : '1', campanaOpacidad: s.pushBusy ? '.55' : '1',
      campanaTocar: () => self.alternarPush(),
      pushMsg: s.pushMsg,
    };
  }

  /* ── Chat entre amigos y chat de grupos ──────────────────────────── */
  // Cada conversación se guarda en chatMsgs con su clave: el id del amigo,
  // o 'g:' + el id del grupo.

  textoSinLeer() {
    return this.state.chats.reduce((t, c) => t + (c.sinLeerTexto || 0), 0)
         + this.state.gAmigos.reduce((t, g) => t + (g.sinLeerTexto || 0), 0);
  }
  /** Número del ícono de la app: mensajes sin leer + solicitudes de amistad (igual que la ruedita). */
  actualizarGlobo() { Nube.ponerGlobo(this.textoSinLeer() + this.state.amigos.filter(a => a.estado === 'pendiente' && !a.yo).length); }

  /** Clave de la conversación abierta (o null). */
  hiloAbierto(s) { s = s || this.state; return s.chatG ? 'g:' + s.chatG : s.chatCon; }

  abrirChat(otro) {
    if (!this.state.amigos.some(a => a.id === otro && a.estado === 'aceptada')) return false;
    this.setState(st => ({ chatCon: otro, chatG: null, chatHoja: null, chatTexto: st.chatCon === otro ? st.chatTexto : '' }));
    this.soltarPanel();
    this.cargarChat(otro, true);
    this.marcarLeido(otro);
    return true;
  }

  abrirGrupo(g) {
    if (!this.state.gAmigos.some(x => x.id === g)) return false;
    this.setState(st => ({ chatG: g, chatCon: null, chatHoja: null, chatTexto: st.chatG === g ? st.chatTexto : '' }));
    this.soltarPanel();
    this.cargarChat('g:' + g, true);
    this.marcarLeidoGrupo(g);
    return true;
  }

  cerrarChat() {
    this.soltarTeclado();
    this.setState({ chatCon: null, chatG: null, chatHoja: null, chatTexto: '' });
  }

  /** El chat se abre debajo de la ruedita y la hoja baja: queda el chat a la vista. */
  soltarPanel() { if (this.state.panel) this.cerrarHoja('panel'); }

  /** La flecha del chat: de vuelta a la ruedita, donde están los amigos. */
  volverDelChat() {
    this.cerrarChat();
    this.abrirPanel();
  }

  traerMensajes(clave, antesDe) {
    return clave.startsWith('g:') ? Nube.mensajesGrupo(clave.slice(2), antesDe) : Nube.mensajes(this.uid, clave, antesDe);
  }

  /** Trae los mensajes más recientes; conserva los viejos ya cargados y los míos pendientes. */
  async cargarChat(clave, abajo) {
    const uid = this.uid;
    if (!uid) return;
    const previo = this.state.chatMsgs[clave];
    this.setState(st => ({ chatMsgs: { ...st.chatMsgs, [clave]: { lista: [], hayMas: false, ...(st.chatMsgs[clave] || {}), cargando: true, error: '' } } }));
    try {
      const r = await this.traerMensajes(clave, null);
      if (uid !== this.uid) return;
      const cerca = this.chatAbajo();
      this.setState(st => {
        const prev = st.chatMsgs[clave] || { lista: [], hayMas: false };
        const ids = new Set(r.lista.map(m => m.id));
        const primero = r.lista[0];
        const viejos = primero ? prev.lista.filter(m => !m.estado && m.en < primero.en && !ids.has(m.id)) : [];
        const pendientes = prev.lista.filter(m => m.estado && !ids.has(m.id));
        return { chatMsgs: { ...st.chatMsgs, [clave]: {
          lista: viejos.concat(r.lista, pendientes), hayMas: viejos.length ? prev.hayMas : r.hayMas, cargando: false, error: '',
        } } };
      });
      if (abajo || !previo || cerca) this.bajarChat(true);
      setTimeout(() => { if (this.hiloAbierto() === clave) this.revisarAnteriores(); }, 260);
    } catch (e) {
      this.setState(st => ({ chatMsgs: { ...st.chatMsgs, [clave]: { lista: [], hayMas: false, ...(st.chatMsgs[clave] || {}), cargando: false,
        error: navigator.onLine === false ? 'Sin conexión: no se pudieron cargar los mensajes.' : 'No se pudieron cargar los mensajes.' } } }));
    }
  }

  /** Al subir cerca del principio del chat se traen solos los mensajes anteriores (con una orbe arriba). */
  revisarAnteriores() {
    const el = document.querySelector('[data-chat-lista]');
    if (el && el.scrollTop < 400 && !this.bajarPend) this.cargarAnteriores();
  }

  async cargarAnteriores() {
    const clave = this.hiloAbierto(), hilo = clave && this.state.chatMsgs[clave];
    if (!hilo || !hilo.hayMas || hilo.cargando || this.anteriores) return;
    if (Date.now() - (this.anterioresFallo || 0) < 5000) return;   // tras un fallo, no insistir en cada movimiento
    const primero = hilo.lista.find(m => !m.estado);
    if (!primero) return;
    this.setState(st => ({ chatMsgs: { ...st.chatMsgs, [clave]: { ...st.chatMsgs[clave], cargando: true } } }));
    try {
      const r = await this.traerMensajes(clave, primero.en);
      this.anteriores = { clave, r };
      this.ponerAnteriores();
    } catch (e) {
      this.anterioresFallo = Date.now();
      this.setState(st => ({ chatMsgs: { ...st.chatMsgs, [clave]: { ...st.chatMsgs[clave], cargando: false } } }));
      if (window.Fluido) Fluido.aviso('No se pudieron cargar los mensajes anteriores');
    }
  }

  /** Mete los mensajes anteriores cuando la lista está quieta: así no se corta la inercia del dedo. */
  ponerAnteriores() {
    const p = this.anteriores;
    if (!p) return;
    const el = this.hiloAbierto() === p.clave ? document.querySelector('[data-chat-lista]') : null;
    const quieto = Date.now() - (this.chatMovidoEn || 0);
    if (el && quieto < 140) {
      clearTimeout(this.tAnteriores);
      this.tAnteriores = setTimeout(() => this.ponerAnteriores(), 150 - quieto);
      return;
    }
    this.anteriores = null;
    const h = this.state.chatMsgs[p.clave];
    if (!h) return;
    const ids = new Set(h.lista.map(m => m.id));
    if (el) this.anclaChat = el.scrollHeight;   // componentDidUpdate deja a la vista lo que se estaba leyendo
    this.setState(st => ({ chatMsgs: { ...st.chatMsgs, [p.clave]: {
      ...st.chatMsgs[p.clave], lista: p.r.lista.filter(m => !ids.has(m.id)).concat(st.chatMsgs[p.clave].lista), hayMas: p.r.hayMas, cargando: false,
    } } }));
  }

  /** Mensaje nuevo por tiempo real (de un amigo, o el eco de uno mío). */
  recibirMensaje(n) {
    const me = this.uid;
    if (!me || !n || !n.id) return;
    const m = Nube.mensajeDe(n);
    const otro = m.de === me ? m.para : m.de;
    const s0 = this.state;
    const abierto = s0.chatCon === otro && document.visibilityState === 'visible';
    const cerca = abierto && this.chatAbajo();
    this.setState(st => {
      const hilo = st.chatMsgs[otro];
      const chatMsgs = !hilo ? st.chatMsgs : { ...st.chatMsgs, [otro]: { ...hilo,
        lista: hilo.lista.some(x => x.id === m.id) ? hilo.lista.map(x => x.id === m.id ? m : x) : hilo.lista.concat([m]) } };
      const prev = st.chats.find(c => c.otro === otro) || { sinLeer: 0, sinLeerTexto: 0 };
      const suma = m.de !== me && !abierto ? 1 : 0;
      // El eco de un mensaje ya mostrado no lo vuelve a contar.
      const nuevo = !(hilo && hilo.lista.some(x => x.id === m.id)) && !(prev.en && prev.en >= m.en && prev.de === m.de && prev.texto === m.texto);
      const fila = { otro, tipo: m.tipo, texto: m.texto, datos: m.datos, de: m.de, en: m.en,
                     sinLeer: prev.sinLeer + (nuevo ? suma : 0), sinLeerTexto: prev.sinLeerTexto + (nuevo && m.tipo === 'texto' ? suma : 0) };
      return { chatMsgs, chats: [fila].concat(st.chats.filter(c => c.otro !== otro)) };
    });
    if (abierto && m.de !== me) this.marcarLeido(otro);
    if (abierto) this.bajarChat(cerca);
    this.actualizarGlobo();
    setTimeout(() => this.guardarCache(), 0);
  }

  /** Mensaje nuevo en un grupo (texto, tarjeta o aviso del sistema). */
  recibirMensajeGrupo(n) {
    const me = this.uid;
    if (!me || !n || !n.id) return;
    const m = Nube.mensajeGrupoDe(n), d = m.datos || {};
    const s0 = this.state, g0 = s0.gAmigos.find(x => x.id === m.g);
    // Me agregaron a un grupo, o cambió quién está o su nombre: se relee la lista.
    if (!g0 || m.tipo === 'sistema') this.cargarGrupos();
    if (m.tipo === 'libreta' || d.accion === 'borrar_libreta') this.cargarLibsG();
    if (!g0) return;
    const clave = 'g:' + m.g;
    const abierto = s0.chatG === m.g && document.visibilityState === 'visible';
    const cerca = abierto && this.chatAbajo();
    this.setState(st => {
      const hilo = st.chatMsgs[clave], ya = !!(hilo && hilo.lista.some(x => x.id === m.id));
      const chatMsgs = !hilo ? st.chatMsgs : { ...st.chatMsgs, [clave]: { ...hilo,
        lista: ya ? hilo.lista.map(x => x.id === m.id ? m : x) : hilo.lista.concat([m]) } };
      const prev = st.gAmigos.find(x => x.id === m.g);
      if (!prev) return { chatMsgs };
      const suma = !ya && m.de !== me && m.tipo !== 'sistema' && !abierto ? 1 : 0;
      const fila = { ...prev, ult: { tipo: m.tipo, texto: m.texto, datos: m.datos, de: m.de, deNombre: m.deNombre, en: m.en },
                     sinLeer: prev.sinLeer + suma, sinLeerTexto: prev.sinLeerTexto + (m.tipo === 'texto' ? suma : 0) };
      return { chatMsgs, gAmigos: [fila].concat(st.gAmigos.filter(x => x.id !== m.g)) };
    });
    if (abierto && m.de !== me) this.marcarLeidoGrupo(m.g);
    if (abierto) this.bajarChat(cerca);
    this.actualizarGlobo();
    setTimeout(() => this.guardarCache(), 0);
  }

  marcarLeido(otro) {
    this.setState(st => ({ chats: st.chats.map(c => c.otro === otro ? { ...c, sinLeer: 0, sinLeerTexto: 0 } : c) }));
    this.actualizarGlobo();
    clearTimeout(this.tLeido);
    this.tLeido = setTimeout(() => { Nube.marcarChatLeido(otro).catch(() => {}); }, 400);
  }

  marcarLeidoGrupo(g) {
    this.setState(st => ({ gAmigos: st.gAmigos.map(x => x.id === g ? { ...x, sinLeer: 0, sinLeerTexto: 0 } : x) }));
    this.actualizarGlobo();
    clearTimeout(this.tLeidoG);
    this.tLeidoG = setTimeout(() => { Nube.marcarGrupoLeido(g).catch(() => {}); }, 400);
  }

  /** Relee mis grupos (nombre, miembros, último mensaje, sin leer). */
  cargarGrupos() {
    clearTimeout(this.tGrupos);
    this.tGrupos = setTimeout(async () => {
      const uid = this.uid;
      if (!uid) return;
      try {
        const lista = await Nube.misGrupos();
        if (uid !== this.uid) return;
        const s = this.state, abierto = document.visibilityState === 'visible' ? s.chatG : null;
        this.setState({ gAmigos: lista.map(g => g.id === abierto ? { ...g, sinLeer: 0, sinLeerTexto: 0 } : g) });
        // Salí del grupo (desde otro dispositivo): se cierra su chat.
        if (s.chatG && !lista.some(g => g.id === s.chatG)) this.cerrarChat();
        this.actualizarGlobo();
        this.guardarCache();
      } catch (e) {}
    }, 250);
  }

  /** Relee las libreticas de grupo en las que estoy (y la que esté abierta). */
  cargarLibsG() {
    clearTimeout(this.tLibsG);
    this.tLibsG = setTimeout(async () => {
      const uid = this.uid;
      if (!uid) return;
      try {
        const libsG = await Nube.libretasGrupo(null);
        if (uid !== this.uid) return;
        this.setState({ libsG });
        const v = this.state.lgVer;
        if (v && !libsG.some(l => l.id === v)) this.traerLibretaGrupo(v);
        this.guardarCache();
      } catch (e) {}
    }, 250);
  }

  async enviarMensaje() {
    const s = this.state, clave = this.hiloAbierto(), me = this.uid;
    const texto = (s.chatTexto || '').trim();
    if (!clave || !me || !texto) return;
    if (texto.length > 2000) { if (window.Fluido) Fluido.aviso('El mensaje es muy largo (máximo 2000 letras)'); return; }
    const en = new Date().toISOString();
    const m = s.chatG
      ? { id: Nube.uuid(), g: s.chatG, de: me, deNombre: s.profile.nombre || '', tipo: 'texto', texto, ref: null, datos: null, en, estado: 'enviando' }
      : { id: Nube.uuid(), de: me, para: s.chatCon, tipo: 'texto', texto, ref: null, datos: null, en, estado: 'enviando' };
    this.setState(st => {
      const hilo = st.chatMsgs[clave] || { lista: [], hayMas: false, cargando: false, error: '' };
      const cambios = { chatTexto: '', chatMsgs: { ...st.chatMsgs, [clave]: { ...hilo, lista: hilo.lista.concat([m]) } } };
      if (m.g) {
        const prev = st.gAmigos.find(x => x.id === m.g);
        if (prev) cambios.gAmigos = [{ ...prev, ult: { tipo: 'texto', texto, datos: null, de: me, deNombre: m.deNombre, en } }]
          .concat(st.gAmigos.filter(x => x.id !== m.g));
      } else {
        const prev = st.chats.find(c => c.otro === m.para) || { sinLeer: 0, sinLeerTexto: 0 };
        cambios.chats = [{ ...prev, otro: m.para, tipo: 'texto', texto, datos: null, de: me, en }].concat(st.chats.filter(c => c.otro !== m.para));
      }
      return cambios;
    });
    // Que el teclado siga abierto para escribir el siguiente.
    const entrada = document.querySelector('[data-chat-entrada]');
    if (entrada && document.activeElement !== entrada) entrada.focus();
    this.bajarChat(true);
    await this.subirMensaje(m);
  }

  async subirMensaje(m) {
    const clave = m.g ? 'g:' + m.g : m.para;
    try {
      if (m.g) await Nube.enviarMensajeGrupo(this.uid, m.id, m.g, m.texto);
      else await Nube.enviarMensaje(this.uid, m.id, m.para, m.texto);
      this.estadoMensaje(clave, m.id, null);
    } catch (e) {
      this.estadoMensaje(clave, m.id, 'error');
    }
  }

  reintentarMensaje(clave, id) {
    const h = this.state.chatMsgs[clave], m = h && h.lista.find(x => x.id === id);
    if (!m || m.estado !== 'error') return;
    this.estadoMensaje(clave, id, 'enviando');
    this.subirMensaje(m);
  }

  estadoMensaje(clave, id, estado) {
    this.setState(st => {
      const h = st.chatMsgs[clave];
      if (!h) return null;
      return { chatMsgs: { ...st.chatMsgs, [clave]: { ...h, lista: h.lista.map(x => {
        if (x.id !== id) return x;
        const y = { ...x };
        if (estado) y.estado = estado; else delete y.estado;
        return y;
      }) } } };
    });
  }

  /** ¿La lista del chat está (casi) al final? */
  chatAbajo() {
    const el = document.querySelector('[data-chat-lista]');
    return !el || el.scrollHeight - el.scrollTop - el.clientHeight < 160;
  }

  bajarChat(forzar) {
    if (!forzar) return;
    this.bajarPend = true;   // el pintado espera a rAF: al terminarlo se baja (componentDidUpdate)
    const bajar = () => { const el = document.querySelector('[data-chat-lista]'); if (el) el.scrollTop = el.scrollHeight; };
    setTimeout(bajar, 30);
    setTimeout(bajar, 200);
  }

  /** Con el teclado abierto, el chat ocupa solo la parte visible de la pantalla. */
  ajustarTeclado() {
    const vv = window.visualViewport, el = document.querySelector('[data-chat]');
    if (!vv || !el || !window.Fluido) return;
    const teclado = window.innerHeight - vv.height;
    if ((this.state.chatCon || this.state.chatG) && teclado > 120 && window.innerWidth < 560) {
      const cerca = this.chatAbajo();
      Fluido.fijar(el, { top: Math.round(vv.offsetTop) + 'px', height: Math.round(vv.height) + 'px', bottom: 'auto', '--pie': '8px' });
      this.tecladoAbierto = true;
      if (cerca) this.bajarChat(true);
    } else if (this.tecladoAbierto) {
      this.soltarTeclado();
    }
  }

  soltarTeclado() {
    const el = document.querySelector('[data-chat]');
    if (el && window.Fluido) Fluido.fijar(el, { top: null, height: null, bottom: null, '--pie': null });
    this.tecladoAbierto = false;
  }

  /* Hoja del chat: adjuntar, enviar rutina, nueva libretica, opciones y agregar amigo. */
  hojaChat(vista, extra) { this.setState(st => ({ chatHoja: Object.assign({ vista }, extra || {}) })); }

  async enviarRutinaChat(gid) {
    const otro = this.state.chatCon, grupo = this.state.chatG, h = this.state.chatHoja;
    if ((!otro && !grupo) || !h || h.enviando) return;
    this.setState({ chatHoja: { ...h, enviando: gid || 'semana', msg: '' } });
    try {
      if (!(await this.alDia())) throw new Error('Necesitas conexión a internet para enviarla.');
      if (grupo) await Nube.compartirRutinaGrupo(grupo, gid || null);
      else await Nube.compartirRutina(otro, gid || null);
      this.cerrarHoja('chat');
      if (window.Fluido) Fluido.aviso(grupo ? 'Rutina enviada al grupo' : 'Rutina enviada');
    } catch (e) {
      this.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, enviando: null, msg: e.message || 'No se pudo enviar.' } } : null);
    }
  }

  crearLibretaChat() {
    const s = this.state, h = s.chatHoja, otro = s.chatCon;
    if (!h || !otro) return;
    const a = s.amigos.find(x => x.id === otro);
    if (!a) return;
    const monto = String(h.monto || '').replace(/\D/g, '');
    if (!(+monto > 0)) { this.setState({ chatHoja: { ...h, msg: 'Escribe el monto.' } }); return; }
    const miNombre = s.profile.nombre || (s.me && s.me.usuario) || 'Yo';
    const lib = {
      id: Nube.uuid(), owner: this.uid, contra: otro, mine: !!h.meDebe,
      deudor: h.meDebe ? a.nombre : miNombre, prestamista: h.meDebe ? miNombre : a.nombre,
      monto, paid: false, nota: String(h.nota || '').trim().slice(0, 80), vence: '', enviada: true, abonos: [],
    };
    this.setState(st => ({ libs: [lib].concat(st.libs) }));
    this.cerrarHoja('chat');
    if (window.Fluido) Fluido.aviso('Libretica enviada a ' + nombreCorto(a.id, a.nombre));
  }

  /** "Nueva actividad" para todo el grupo (también queda en mi agenda). */
  abrirActividadGrupo(gid) {
    const s = this.state, t0 = tiposDe(s.profile)[0];
    this.setState({ chatHoja: null, tipoEd: null,
      modal: { id: null, c: s.cuadernos[0] ? s.cuadernos[0].id : null, tipo: t0.nombre, urg: t0.urgencia, fecha: TODAY,
               asunto: [], tema: '', para: this.uid, por: null, grupo: gid } });
  }

  /** La crea el servidor: una copia en la agenda de cada uno, en su cuaderno del mismo nombre. */
  async crearActividadGrupo() {
    const mm = this.state.modal;
    if (!mm || mm.id || !mm.grupo || mm.enviando) return;
    this.setState(st => st.modal ? { modal: { ...st.modal, enviando: true } } : null);
    try {
      // El cuaderno elegido tiene que estar ya en el servidor.
      if (!(await this.alDia())) throw new Error('Necesitas conexión a internet para agendarla.');
      await Nube.crearActividadGrupo(mm.grupo, { tipo: mm.tipo, urg: mm.urg, fecha: mm.fecha, asunto: mm.asunto, c: mm.c });
      this.cerrarHoja('modal');
      if (window.Fluido) Fluido.aviso('Actividad agendada para el grupo');
      this.refrescar();   // trae mi copia
    } catch (e) {
      this.setState(st => st.modal ? { modal: { ...st.modal, enviando: false } } : null);
      if (window.Fluido) Fluido.aviso(e.message || 'No se pudo agendar.');
    }
  }

  /** "Nueva actividad" ya dirigida al amigo del chat. */
  abrirActividadPara(otro) {
    const s = this.state, t0 = tiposDe(s.profile)[0], cuads = s.cuadAmigos[otro] || [];
    this.setState({ chatHoja: null, tipoEd: null,
      modal: { id: null, c: cuads[0] ? cuads[0].id : null, tipo: t0.nombre, urg: t0.urgencia, fecha: TODAY, asunto: [], tema: '', para: otro, por: null } });
  }

  /** Lista de amigos, grupos y chats (en la ruedita, debajo de los avisos). */
  valsAmigos(s) {
    const self = this, me = this.uid;
    const acept = s.amigos.filter(a => a.estado === 'aceptada');
    const porId = {};
    s.chats.forEach(c => { porId[c.otro] = c; });
    // Amigos y grupos juntos, del último mensaje al más viejo.
    const filas = acept.map(a => {
      const c = porId[a.id] || null;
      const visto = nombreVisto(a.id, a.nombre);
      return { en: c ? c.en : '', nombre: visto, busca: norm(visto) + ' ' + norm(a.nombre), v: {
        nombre: visto, inicial: (visto || '?').charAt(0).toUpperCase(), color: colorDe(a.id), radio: '50%', letra: '17px',
        preview: c ? previewChat(c, me) : 'Toca para escribirle', sinLeer: c ? c.sinLeer : 0,
        abrir: () => self.abrirChat(a.id),
      } };
    }).concat(s.gAmigos.map(g => ({ en: g.ult ? g.ult.en : (g.unido || ''), nombre: g.nombre, busca: norm(g.nombre), v: {
      nombre: g.nombre, inicial: inicialesDe(g.nombre), color: colorDe(g.id), radio: '15px', letra: '15px',
      preview: previewGrupo(g.ult, me), sinLeer: g.sinLeer,
      abrir: () => self.abrirGrupo(g.id),
    } }))).sort((x, y) => {
      if (x.en && y.en) return x.en < y.en ? 1 : (x.en > y.en ? -1 : 0);
      if (x.en || y.en) return x.en ? -1 : 1;
      return String(x.nombre).localeCompare(String(y.nombre), 'es');
    });
    const sinLeer = acept.reduce((t, a) => t + ((porId[a.id] || {}).sinLeer || 0), 0) + s.gAmigos.reduce((t, g) => t + (g.sinLeer || 0), 0);
    const solicitudes = s.amigos.filter(a => a.estado === 'pendiente' && !a.yo);
    const esperando = s.amigos.filter(a => a.estado === 'pendiente' && a.yo);
    // Buscador (con más de 4 chats): por apodo, nombre de Pilares o nombre del grupo,
    // sin tildes ni mayúsculas. Mientras se busca solo quedan los chats que coinciden.
    const buscarOn = filas.length > 4, q = buscarOn ? norm(s.amigosQ) : '';
    const vistas = q ? filas.filter(f => f.busca.includes(q)) : filas;
    const ponerQ = v => self.setState({ amigosQ: v });
    return {
      amigosSinLeerTxt: sinLeer ? sinLeer + ' SIN LEER' : '',
      amigosBuscarOn: buscarOn, amigosQ: s.amigosQ || '',
      onAmigosQ: ev => ponerQ(ev.target.value),
      limpiarAmigosQ: () => { ponerQ(''); const x = document.querySelector('[data-amigos-buscar]'); if (x) x.focus(); },
      amigosVacioTxt: q && !vistas.length ? 'Nadie coincide con «' + String(s.amigosQ).trim() + '»' : '',
      // Con búsqueda, la hoja se queda alta: así el buscador no baja detrás del teclado.
      panelAlto: q ? 'calc(100% - env(safe-area-inset-top,0px) - 44px)' : 'auto',
      solicitudes: q ? [] : solicitudes.map(a => ({
        nombre: a.nombre, codigo: a.codigo, inicial: (a.nombre || '?').charAt(0).toUpperCase(), color: colorDe(a.id),
        aceptar: () => self.conexion('aceptar', a),
        rechazar: () => self.conexion('rechazar', a),
      })),
      chatsList: vistas.map(f => {
        const n = f.v.sinLeer || 0;
        return Object.assign({}, f.v, {
          previewColor: n ? '#EDF1F7' : '#8E9AAE', previewPeso: n ? '600' : '500',
          cuando: f.en ? cuandoChat(f.en) : '', cuandoColor: n ? MINT : '#8E9AAE',
          badgeOn: n > 0, badge: n > 99 ? '99+' : String(n),
        });
      }),
      nuevoGrupoOn: acept.length > 0,
      nuevoGrupo: () => self.hojaChat('grupoNuevo', { nombre: '', sel: [] }),
      hayEsperando: !q && esperando.length > 0,
      esperando: esperando.map(a => ({ nombre: a.nombre, codigo: a.codigo, cancelar: () => self.conexion('quitar', a) })),
      sinAmigos: !acept.length && !solicitudes.length && !esperando.length && !s.gAmigos.length,
      abrirAgregar: () => { self.setState({ amigoMsg: '' }); self.hojaChat('agregar'); },
    };
  }

  /** Conversación abierta: con un amigo o con un grupo. */
  valsChat(s) {
    const self = this, me = this.uid;
    const g = s.chatG ? s.gAmigos.find(x => x.id === s.chatG) : null;
    const a = !g && s.chatCon ? s.amigos.find(x => x.id === s.chatCon && x.estado === 'aceptada') : null;
    if (!g && !a) return { chatOn: false };
    const clave = this.hiloAbierto(s);
    const hilo = s.chatMsgs[clave] || { lista: [], hayMas: false, cargando: true, error: '' };
    // Libreticas de grupo que ya se borraron (el mismo chat lo cuenta).
    const borradas = new Set(hilo.lista.filter(m => m.tipo === 'sistema' && m.datos && m.datos.accion === 'borrar_libreta').map(m => m.datos.libreta));
    const items = [];
    let diaPrev = '', dePrev = null;
    hilo.lista.forEach(m => {
      const dia = diaChat(m.en);
      if (dia !== diaPrev) { items.push({ esDia: true, dia }); diaPrev = dia; dePrev = null; }
      if (m.tipo === 'sistema') {
        const t = textoSistema(m, me);
        if (t) items.push({ esSistema: true, texto: t });
        dePrev = null;
        return;
      }
      const mio = m.de === me, seguido = dePrev === m.de;
      dePrev = m.de;
      // En un grupo, el nombre de quien escribe va sobre el primero de sus mensajes seguidos.
      const autorOn = !!g && !mio && !seguido;
      const base = { lado: mio ? 'flex-end' : 'flex-start', sep: seguido ? '2px' : '8px', hora: horaCorta(m.en),
                     autorOn, autor: autorOn ? nombreCorto(m.de, m.deNombre || 'Alguien') : '', autorColor: colorDe(m.de || '') };
      if (m.tipo === 'texto') {
        items.push(Object.assign(base, {
          esTexto: true, texto: m.texto,
          bg: mio ? 'rgba(87,185,160,.16)' : '#121724', borde: mio ? 'rgba(87,185,160,.34)' : 'rgba(255,255,255,.08)',
          radio: mio ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
          pie: m.estado === 'enviando' ? 'Enviando…' : (m.estado === 'error' ? 'No se envió · toca para reintentar' : base.hora),
          pieColor: m.estado === 'error' ? '#E08A87' : '#6B778C',
          tocar: m.estado === 'error' ? () => self.reintentarMensaje(clave, m.id) : () => {},
        }));
        return;
      }
      items.push(Object.assign(base, { esTarjeta: true }, g ? self.tarjetaGrupo(m, mio, s, borradas) : self.tarjetaChat(m, mio, a, s)));
    });
    const listo = !!(s.chatTexto || '').trim();
    const comun = {
      chatOn: true,
      chatItems: items,
      chatVacio: !hilo.cargando && !hilo.error && !hilo.lista.some(m => m.tipo !== 'sistema'),
      chatCargando: !!hilo.cargando && !hilo.lista.length,
      chatError: hilo.error || '',
      chatHayMas: !!hilo.hayMas,
      chatTexto: s.chatTexto,
      onChatTexto: ev => { const v = ev.target.value; self.setState({ chatTexto: v }); },
      chatEnviar: () => self.enviarMensaje(),
      chatEnviarBg: listo ? MINT : 'rgba(255,255,255,.08)',
      chatEnviarFg: listo ? '#0A0E1A' : '#6B778C',
      chatVolver: () => self.volverDelChat(),
    };
    if (g) {
      const otros = g.miembros.filter(x => x.id !== me);
      return Object.assign(comun, {
        chatNombre: g.nombre, chatInicial: inicialesDe(g.nombre), chatColor: colorDe(g.id), chatRadio: '9px', chatLetra: '11px',
        chatSubOn: true,
        chatSub: otros.length ? listaNombres(otros.map(x => nombreCorto(x.id, x.nombre)).concat(['tú'])) : 'Solo tú en el grupo',
        chatVacioTxt: 'Escríbanse aquí. Con el + envías una rutina, repartes una cuenta o agendan una actividad para todos.',
        chatAdjuntarTxt: 'Enviar rutina, libretica o actividad al grupo',
        chatAdjuntar: () => self.hojaChat('adjuntar'),
        chatOpciones: () => self.hojaChat('grupoOpciones', { nombre: g.nombre }),
      });
    }
    // Con apodo, debajo va el nombre que tiene en Pilares (para no perder de vista quién es).
    const visto = nombreVisto(a.id, a.nombre);
    return Object.assign(comun, {
      chatNombre: visto, chatInicial: (visto || '?').charAt(0).toUpperCase(), chatColor: colorDe(a.id), chatRadio: '50%', chatLetra: '13px',
      chatSubOn: visto !== a.nombre, chatSub: visto !== a.nombre ? a.nombre : '',
      chatVacioTxt: 'Escríbele a ' + nombreCorto(a.id, a.nombre) + ', o envíale una rutina, una libretica o una actividad con el +.',
      chatAdjuntarTxt: 'Enviar rutina, libretica o actividad',
      chatAdjuntar: () => self.hojaChat('adjuntar'),
      chatOpciones: () => self.hojaChat('opciones', { apodo: a.apodo || '' }),
    });
  }

  /** Tarjeta de una libretica, actividad o rutina dentro del chat. */
  tarjetaChat(m, mio, a, s) {
    const self = this, d = m.datos || {}, nada = () => {};
    if (m.tipo === 'libreta') {
      const meDeben = mio ? !!d.mine : !d.mine;
      const l = s.libs.find(x => x.id === m.ref);
      let extra = '';
      if (l) {
        const abonado = (l.abonos || []).reduce((t2, x) => t2 + (+x.monto || 0), 0);
        const saldo = Math.max(0, (+l.monto || 0) - abonado);
        extra = l.paid ? 'Saldada ✓' : (abonado ? 'Abonado ' + pesosTxt(abonado) + ' · queda ' + pesosTxt(saldo) : 'Sin abonos todavía');
      }
      return {
        kicker: 'LIBRETICA · ' + (meDeben ? 'TE DEBE' : 'LE DEBES'), color: meDeben ? MINT : RED,
        borde: meDeben ? 'rgba(87,185,160,.32)' : 'rgba(196,100,97,.3)',
        titulo: pesosTxt(d.monto), sub: d.nota || '', extra,
        accion: l ? 'Ver en Finanzas ›' : '',
        tocar: l ? () => self.irA({ ir: 'finanzas', libreta: m.ref }, true) : nada,
      };
    }
    if (m.tipo === 'actividad') {
      const temas = Array.isArray(d.temas) ? d.temas : [];
      return {
        kicker: 'ACTIVIDAD' + (mio ? ' · PARA ' + String(nombreCorto(a.id, a.nombre)).toUpperCase() : ''), color: AMBER,
        borde: 'rgba(206,127,85,.3)',
        titulo: (d.tipo || 'Actividad') + (d.cuaderno ? ' · ' + d.cuaderno : ''),
        sub: fechaLarga(d.fecha), extra: temas.length ? 'Temas: ' + temas.join(', ') : '',
        accion: 'Ver en la agenda ›',
        tocar: () => self.irA({ ir: 'estudio', fecha: d.fecha }, true),
      };
    }
    // Rutina
    const inv = !mio && s.invRutinas.find(x => x.id === m.ref);
    return {
      kicker: 'RUTINA', color: MINT, borde: 'rgba(87,185,160,.32)',
      titulo: d.tipo === 'semana' ? (mio ? 'Tu semana' : 'Su semana') : '«' + (d.nombre || 'Grupo') + '»',
      sub: d.tipo === 'semana' ? cuenta(+d.grupos || 0, 'grupo', 'grupos') : cuenta(+d.ejercicios || 0, 'ejercicio', 'ejercicios'),
      extra: '',
      accion: mio ? 'Enviada' : (inv ? 'Ver y aceptar ›' : 'Ya respondida'),
      tocar: inv ? () => self.setState({ verRutina: { modo: 'inv', inv } }) : nada,
    };
  }

  /** Tarjeta de una libretica de grupo: quien la creó ve lo que le deben;
   *  quien debe, su parte; los demás del grupo, quiénes consumieron. */
  tarjetaGrupo(m, mio, s, borradas) {
    const self = this, me = this.uid, d = m.datos || {}, nada = () => {};
    if (m.tipo === 'actividad') {
      // Con mi copia a la mano se ve como está hoy (quien la creó pudo cambiarla).
      const mia = s.acts.find(a => a.lote === m.ref && (a.owner || me) === me);
      const tipo = mia ? mia.tipo : (d.tipo || 'Actividad'), fecha = mia ? mia.fecha : d.fecha;
      const temas = mia ? mia.asunto.filter(t => t && t !== 'Sin temas') : (Array.isArray(d.temas) ? d.temas : []);
      const cuadN = mia ? ((s.cuadernos.find(c => c.id === mia.c) || {}).nombre || '') : (mio ? (d.cuaderno || '') : '');
      return {
        kicker: 'ACTIVIDAD DEL GRUPO', color: AMBER, borde: 'rgba(206,127,85,.3)',
        titulo: tipo + (cuadN ? ' · ' + cuadN : ''),
        sub: fechaLarga(fecha), extra: temas.length ? 'Temas: ' + temas.join(', ') : '',
        accion: 'Ver en la agenda ›',
        tocar: () => self.irA({ ir: 'estudio', fecha }, true),
      };
    }
    if (m.tipo === 'rutina') {
      const inv = !mio && s.invRutinas.find(x => x.lote && x.lote === m.ref);
      return {
        kicker: 'RUTINA', color: MINT, borde: 'rgba(87,185,160,.32)',
        titulo: d.tipo === 'semana' ? (mio ? 'Tu semana' : 'Su semana') : '«' + (d.nombre || 'Grupo') + '»',
        sub: d.tipo === 'semana' ? cuenta(+d.grupos || 0, 'grupo', 'grupos') : cuenta(+d.ejercicios || 0, 'ejercicio', 'ejercicios'),
        extra: '',
        accion: mio ? 'Enviada al grupo' : (inv ? 'Ver y aceptar ›' : 'Ya respondida'),
        tocar: inv ? () => self.setState({ verRutina: { modo: 'inv', inv } }) : nada,
      };
    }
    const partes = Array.isArray(d.partes) ? d.partes : [];
    const mia = partes.find(p => p.id === me);
    const l = this.libretaGrupoVista(m.ref, s);
    const borrada = borradas.has(m.ref) || l === null;
    const pMia = l && mia ? l.partes.find(p => p.id === me) : null;
    const nombres = listaNombres(partes.map(p => p.id === me ? 'tú' : nombreCorto(p.id, p.nombre)));
    let extra;
    if (borrada) extra = 'Se borró';
    else if (mio) {
      if (l) {
        const falta = l.partes.reduce((t, p) => t + saldoParte(p), 0), pagaron = l.partes.filter(p => p.pagado).length;
        extra = falta ? 'Te falta cobrar ' + pesosTxt(falta) + ' · ' + pagaron + ' de ' + l.partes.length + ' pagaron' : 'Todos pagaron ✓';
      } else extra = 'Entre ' + nombres;
    } else if (mia) {
      extra = 'Te toca ' + pesosTxt(mia.monto) +
        (pMia ? (pMia.pagado ? ' · pagada ✓' : (saldoParte(pMia) < pMia.monto ? ' · te falta ' + pesosTxt(saldoParte(pMia)) : '')) : '');
    } else extra = 'Entre ' + nombres;
    const pagaste = !!(pMia && pMia.pagado), debo = !!mia && !pagaste;
    const color = borrada ? GREY : (mio || pagaste ? MINT : (debo ? RED : '#9AA6BA'));
    return {
      kicker: 'LIBRETICA DE GRUPO' + (borrada ? '' : (mio ? ' · TE DEBEN' : (pagaste ? ' · PAGASTE' : (debo ? ' · TE TOCA' : '')))),
      color,
      borde: borrada ? 'rgba(255,255,255,.08)' : (mio || pagaste ? 'rgba(87,185,160,.32)' : (debo ? 'rgba(196,100,97,.3)' : 'rgba(255,255,255,.1)')),
      titulo: pesosTxt(d.total), sub: d.nota || '', extra,
      accion: borrada ? '' : (mia && !(pMia && pMia.pagado) ? 'Ver y pagar ›' : 'Ver detalle ›'),
      tocar: borrada ? nada : () => self.abrirLibretaGrupo(m.ref),
    };
  }

  /** Hoja del chat. */
  valsChatHoja(s) {
    const self = this, h = s.chatHoja, me = this.uid;
    if (!h) return { chatHojaOn: false };
    const a = s.chatCon ? s.amigos.find(x => x.id === s.chatCon) : null;
    const g = s.chatG ? s.gAmigos.find(x => x.id === s.chatG) : null;
    const quien = a ? nombreCorto(a.id, a.nombre) : '';
    const chip = on => ({ bg: on ? '#fff' : 'rgba(255,255,255,.05)', border: on ? '#fff' : 'rgba(255,255,255,.09)', fg: on ? '#090C14' : '#8E9AAE' });
    const volver = () => self.hojaChat('adjuntar');
    const sub = h.vista === 'rutina' || h.vista === 'libreta' || h.vista === 'grupoLibreta';
    const dest = g ? 'AL GRUPO' : 'A ' + quien.toUpperCase();
    const cta = (on, txt) => ({ bg: on ? MINT : 'rgba(87,185,160,.14)', fg: on ? '#0A0E1A' : 'rgba(87,185,160,.55)', txt });
    const base = {
      chatHojaOn: true, cerrarChatHoja: () => self.cerrarHoja('chat'),
      hjAdjuntar: h.vista === 'adjuntar', hjRutina: h.vista === 'rutina', hjLibreta: h.vista === 'libreta',
      hjOpciones: h.vista === 'opciones', hjAgregar: h.vista === 'agregar',
      hjGrupoNuevo: h.vista === 'grupoNuevo', hjGrupoOpc: h.vista === 'grupoOpciones', hjGrupoLib: h.vista === 'grupoLibreta',
      hjKicker: {
        adjuntar: 'ENVIAR ' + dest, rutina: '‹ ENVIAR ' + dest, libreta: '‹ ENVIAR ' + dest,
        opciones: 'CHAT', agregar: 'AMIGOS', grupoNuevo: 'AMIGOS', grupoOpciones: 'GRUPO', grupoLibreta: '‹ ENVIAR AL GRUPO',
      }[h.vista] || '',
      hjKickerColor: sub ? AMBER : '#8E9AAE',
      hjVolver: sub ? volver : () => {},
      hjTitulo: {
        adjuntar: 'Adjuntar', rutina: 'Rutina', libreta: 'Libretica', opciones: a ? nombreVisto(a.id, a.nombre) : 'Amigo', agregar: 'Agregar amigo',
        grupoNuevo: 'Nuevo grupo', grupoOpciones: g ? g.nombre : 'Grupo', grupoLibreta: 'Libretica de grupo',
      }[h.vista] || '',
      hjMsg: h.msg || '',
    };
    if (h.vista === 'adjuntar' && g) {
      return Object.assign(base, {
        hjOpcionesAdj: [
          { titulo: 'Rutina', sub: 'Tu semana o uno de tus grupos, para todos', color: MINT, ir: () => self.hojaChat('rutina') },
          { titulo: 'Libretica', sub: 'Reparte una cuenta entre el grupo', color: BONE, ir: () => self.hojaChat('grupoLibreta', { total: '', nota: '', partes: {} }) },
          { titulo: 'Actividad', sub: 'Quiz, parcial, salida… en la agenda de todos', color: AMBER, ir: () => self.abrirActividadGrupo(g.id) },
        ],
      });
    }
    if (h.vista === 'adjuntar') {
      return Object.assign(base, {
        hjOpcionesAdj: [
          { titulo: 'Rutina', sub: 'Tu semana o uno de tus grupos', color: MINT, ir: () => self.hojaChat('rutina') },
          { titulo: 'Libretica', sub: 'Lo que ' + quien + ' te debe o le debes', color: BONE, ir: () => self.hojaChat('libreta', { meDebe: true, monto: '', nota: '' }) },
          { titulo: 'Actividad', sub: 'Quiz, parcial, salida… en su agenda', color: AMBER, ir: () => self.abrirActividadPara(s.chatCon) },
        ],
      });
    }
    if (h.vista === 'rutina') {
      const enSemana = s.grupos.filter(gr => s.plan.includes(gr.id));
      const filas = [{ gid: null, titulo: 'Tu semana completa', meta: cuenta(enSemana.length, 'grupo', 'grupos') + ' y tus días de descanso', color: MINT }]
        .concat(s.grupos.map(gr => ({ gid: gr.id, titulo: gr.nombre || 'Sin nombre', meta: cuenta(gr.ejercicios.length, 'ejercicio', 'ejercicios'), color: gr.color })));
      return Object.assign(base, {
        hjRutinas: filas.map(f => {
          const clave = f.gid || 'semana', enviando = h.enviando === clave;
          return { titulo: f.titulo, meta: f.meta, color: f.color, accion: enviando ? 'Enviando…' : 'Enviar', enviar: () => self.enviarRutinaChat(f.gid) };
        }),
        hjRutinaNota: g
          ? 'Les llega a todos los del grupo como tarjeta en este chat. Quien la acepte la tiene como copia suya. Solo va la rutina, nunca tus pesos.'
          : 'Le llega a ' + quien + ' como tarjeta en este chat. Si la acepta, queda como copia suya. Solo va la rutina, nunca tus pesos.',
      });
    }
    if (h.vista === 'libreta') {
      const monto = String(h.monto || '').replace(/\D/g, ''), listo = +monto > 0, c = cta(listo);
      return Object.assign(base, {
        hjDireccion: [['Me debe', true], ['Le debo', false]].map(([t2, v]) => Object.assign({
          t: t2, pick: () => self.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, meDebe: v, msg: '' } } : null),
        }, chip(!!h.meDebe === v))),
        hjMonto: fmtMoney(monto),
        onHjMonto: ev => { const v = ev.target.value.replace(/\D/g, '').slice(0, 12); self.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, monto: v, msg: '' } } : null); },
        hjNota: h.nota || '',
        onHjNota: ev => { const v = ev.target.value; self.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, nota: v } } : null); },
        hjLibColor: h.meDebe ? MINT : RED,
        hjEnviarBg: c.bg, hjEnviarFg: c.fg,
        hjEnviarTxt: 'Enviar a ' + quien,
        hjEnviar: () => self.crearLibretaChat(),
        hjLibNota: listo
          ? 'A ' + quien + ' le llegará: «' + (h.meDebe ? 'Te debe ' : 'Le debes ') + '… ' + pesosTxt(monto) + '». Queda también en Finanzas.'
          : 'Escribe el monto para poder enviarla.',
      });
    }
    if (h.vista === 'opciones') {
      // Cómo le dices: el apodo es privado; vacío vuelve a su nombre de Pilares.
      const actual = a ? a.apodo || '' : '', borrador = h.apodo == null ? actual : String(h.apodo);
      const limpio = apodoLimpio(borrador, a ? a.nombre : '');
      return Object.assign(base, {
        hjAmigoCodigo: a ? a.codigo : '',
        hjApodo: borrador,
        hjApodoPh: a ? a.nombre : '',
        onHjApodo: ev => { const v = ev.target.value; self.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, apodo: v, msg: '' } } : null); },
        hjApodoGuardarOn: limpio !== actual || h.enviando === 'apodo',
        hjApodoGuardarTxt: h.enviando === 'apodo' ? 'Guardando…' : 'Guardar',
        hjApodoGuardar: () => self.guardarApodo(),
        hjApodoNota: !a ? '' : (actual
          ? 'Solo tú ves este nombre. Bórralo y guarda para volver a «' + a.nombre + '».'
          : 'Ponle el nombre que quieras: solo tú lo ves, ' + primerNombre(a.nombre) + ' no se entera.'),
        hjQuitar: () => {
          if (!a || !window.confirm('¿Quitar a ' + nombreVisto(a.id, a.nombre) + ' de tus amigos? Las libreticas que ya comparten se conservan.')) return;
          self.cerrarHoja('chat', true);
          self.cerrarChat();
          self.conexion('quitar', a);
        },
      });
    }
    if (h.vista === 'grupoNuevo') {
      const sel = h.sel || [], nombre = String(h.nombre || '').trim();
      const amigos = s.amigos.filter(x => x.estado === 'aceptada').slice()
        .sort((x, y) => String(nombreVisto(x.id, x.nombre)).localeCompare(String(nombreVisto(y.id, y.nombre)), 'es'));
      const elegidos = amigos.filter(x => sel.includes(x.id)), listo = !!nombre && sel.length > 0 && !h.enviando, c = cta(listo);
      return Object.assign(base, {
        hjGNombre: h.nombre || '',
        onHjGNombre: ev => { const v = ev.target.value; self.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, nombre: v, msg: '' } } : null); },
        hjGAmigos: amigos.map(x => {
          const on = sel.includes(x.id), visto = nombreVisto(x.id, x.nombre);
          return {
            nombre: visto, inicial: (visto || '?').charAt(0).toUpperCase(), color: colorDe(x.id),
            marca: on ? MINT : 'transparent', marcaBorde: on ? MINT : 'rgba(255,255,255,.2)', tick: on ? '#0A0E1A' : 'transparent',
            pick: () => self.setState(st => {
              const hh = st.chatHoja;
              if (!hh) return null;
              const ss = hh.sel || [];
              return { chatHoja: { ...hh, msg: '', sel: ss.includes(x.id) ? ss.filter(y => y !== x.id) : ss.concat([x.id]) } };
            }),
          };
        }),
        hjGCrear: () => self.crearGrupoNuevo(),
        hjGCrearTxt: h.enviando ? 'Creando…' : 'Crear grupo', hjGCrearBg: c.bg, hjGCrearFg: c.fg,
        hjGNota: elegidos.length
          ? 'Con ' + listaNombres(elegidos.map(x => nombreCorto(x.id, x.nombre)).concat(['tú'])) + '. Después cualquiera del grupo puede agregar a sus amigos.'
          : 'Elige al menos un amigo. Después cualquiera del grupo puede agregar a sus amigos.',
      });
    }
    if (h.vista === 'grupoOpciones') {
      if (!g) return base;
      const enGrupo = new Set(g.miembros.map(x => x.id));
      const agregables = s.amigos.filter(x => x.estado === 'aceptada' && !enGrupo.has(x.id))
        .sort((x, y) => String(nombreVisto(x.id, x.nombre)).localeCompare(String(nombreVisto(y.id, y.nombre)), 'es'));
      const nombre = String(h.nombre || '').trim().replace(/\s+/g, ' ');
      const cambiaNombre = !!nombre && nombre !== g.nombre;
      const miembros = g.miembros.slice().sort((x, y) => (x.id === me ? -1 : (y.id === me ? 1 : 0)));
      return Object.assign(base, {
        hjGONombre: h.nombre || '',
        onHjGONombre: ev => { const v = ev.target.value; self.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, nombre: v, msg: '' } } : null); },
        hjGOGuardarOn: cambiaNombre,
        hjGOGuardarTxt: h.enviando === 'nombre' ? 'Guardando…' : 'Guardar',
        hjGOGuardar: () => self.renombrarGrupoActual(),
        hjGOCuantos: cuenta(g.miembros.length, 'PERSONA', 'PERSONAS'),
        hjGOMiembros: miembros.map(x => ({
          nombre: x.id === me ? 'Tú' : nombreVisto(x.id, x.nombre), inicial: (nombreVisto(x.id, x.nombre) || '?').charAt(0).toUpperCase(), color: colorDe(x.id),
          meta: x.unido ? 'Desde el ' + self.fechaTxt(isoOf(new Date(x.unido))).toLowerCase() : '',
        })),
        hjGOAgregarOn: agregables.length > 0,
        hjGOAgregables: agregables.map(x => ({
          nombre: nombreVisto(x.id, x.nombre), inicial: (nombreVisto(x.id, x.nombre) || '?').charAt(0).toUpperCase(), color: colorDe(x.id),
          accion: h.enviando === x.id ? 'Agregando…' : 'Agregar',
          agregar: () => self.agregarAlGrupo(x.id),
        })),
        hjGOSalir: () => self.salirDelGrupo(),
      });
    }
    if (h.vista === 'grupoLibreta') {
      if (!g) return base;
      const otros = g.miembros.filter(x => x.id !== me);
      const partes = h.partes || {}, elegidos = otros.filter(x => partes[x.id] !== undefined);
      const total = +String(h.total || '').replace(/\D/g, '') || 0;
      const suma = elegidos.reduce((t, x) => t + (+partes[x.id] || 0), 0);
      const sinMonto = elegidos.find(x => !(+partes[x.id] > 0));
      let estado, estadoColor;
      if (!total) { estado = 'Escribe el total y elige quiénes consumieron.'; estadoColor = '#8E9AAE'; }
      else if (!elegidos.length) { estado = 'Elige quiénes consumieron.'; estadoColor = '#8E9AAE'; }
      else if (suma > total) { estado = 'Te pasaste por ' + pesosTxt(suma - total) + ': la suma no puede ser mayor que el total.'; estadoColor = '#E08A87'; }
      else if (sinMonto) { estado = 'Falta cuánto le toca a ' + nombreCorto(sinMonto.id, sinMonto.nombre) + '.'; estadoColor = AMBER; }
      else if (suma < total) { estado = 'Repartido ' + pesosTxt(suma) + ' de ' + pesosTxt(total) + ' · faltan ' + pesosTxt(total - suma); estadoColor = AMBER; }
      else { estado = 'Cuadra exacto ✓'; estadoColor = MINT; }
      const listo = total > 0 && elegidos.length > 0 && !sinMonto && suma === total && !h.enviando, c = cta(listo);
      const iguales = total > 0 && elegidos.length > 0;
      return Object.assign(base, {
        hjLGTotal: fmtMoney(String(total || '')),
        onHjLGTotal: ev => { const v = ev.target.value.replace(/\D/g, '').slice(0, 12); self.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, total: v, msg: '' } } : null); },
        hjLGNota: h.nota || '',
        onHjLGNota: ev => { const v = ev.target.value; self.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, nota: v } } : null); },
        hjLGPersonas: otros.map(x => {
          const on = partes[x.id] !== undefined, visto = nombreVisto(x.id, x.nombre);
          return {
            nombre: visto, inicial: (visto || '?').charAt(0).toUpperCase(), color: colorDe(x.id), on,
            marca: on ? MINT : 'transparent', marcaBorde: on ? MINT : 'rgba(255,255,255,.2)', tick: on ? '#0A0E1A' : 'transparent',
            monto: on ? fmtMoney(partes[x.id]) : '',
            pick: () => self.setState(st => {
              const hh = st.chatHoja;
              if (!hh) return null;
              const pp = { ...(hh.partes || {}) };
              if (pp[x.id] !== undefined) delete pp[x.id]; else pp[x.id] = '';
              return { chatHoja: { ...hh, partes: pp, msg: '' } };
            }),
            onMonto: ev => {
              const v = ev.target.value.replace(/\D/g, '').slice(0, 12);
              self.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, partes: { ...(st.chatHoja.partes || {}), [x.id]: v }, msg: '' } } : null);
            },
          };
        }),
        hjLGSinOtros: !otros.length,
        hjLGIgualesOn: iguales,
        hjLGIgualesBg: iguales ? 'rgba(87,185,160,.12)' : 'rgba(255,255,255,.04)',
        hjLGIgualesFg: iguales ? MINT : '#6B778C',
        hjLGIgualesBorde: iguales ? 'rgba(87,185,160,.34)' : 'rgba(255,255,255,.08)',
        hjLGIguales: () => self.partesIguales(),
        hjLGEstado: estado, hjLGEstadoColor: estadoColor,
        hjLGEnviar: () => self.crearLibretaGrupoChat(),
        hjLGEnviarTxt: h.enviando ? 'Enviando…' : 'Enviar al grupo', hjLGEnviarBg: c.bg, hjLGEnviarFg: c.fg,
      });
    }
    return base; // agregar: usa los valores de siempre (código, campo y mensaje)
  }

  /* ── Grupos: crear, renombrar, agregar, salir ────────────────────── */

  /** Guarda cómo le dices al amigo del chat abierto (vacío: vuelve a su nombre). */
  async guardarApodo() {
    const s = this.state, h = s.chatHoja, a = s.chatCon ? s.amigos.find(x => x.id === s.chatCon) : null;
    if (!h || h.vista !== 'opciones' || !a || h.enviando) return;
    const apodo = apodoLimpio(h.apodo == null ? a.apodo : h.apodo, a.nombre);
    if (apodo === (a.apodo || '')) return;
    this.hojaEnviando('apodo');
    try {
      await Nube.guardarApodo(a.id, apodo);
      this.setState(st => ({
        amigos: st.amigos.map(x => x.id === a.id ? { ...x, apodo } : x),
        chatHoja: st.chatHoja ? { ...st.chatHoja, enviando: null, apodo, msg: '' } : null,
      }));
      this.guardarCache();
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      if (window.Fluido) Fluido.aviso(apodo ? 'Ahora le dices «' + apodo + '»' : 'Volvió a llamarse «' + a.nombre + '»');
    } catch (e) {
      this.errorHoja(e, 'No se pudo guardar el nombre.');
    }
  }

  msgHoja(msg) { this.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, msg } } : null); }
  hojaEnviando(v) { this.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, enviando: v, msg: '' } } : null); }
  errorHoja(e, txt) { this.setState(st => st.chatHoja ? { chatHoja: { ...st.chatHoja, enviando: null, msg: (e && e.message) || txt } } : null); }

  async crearGrupoNuevo() {
    const h = this.state.chatHoja;
    if (!h || h.vista !== 'grupoNuevo' || h.enviando) return;
    const nombre = String(h.nombre || '').trim().replace(/\s+/g, ' ');
    if (!nombre) return this.msgHoja('Escribe un nombre para el grupo.');
    if (nombre.length > 40) return this.msgHoja('El nombre puede tener hasta 40 letras.');
    if (!(h.sel || []).length) return this.msgHoja('Elige al menos un amigo.');
    this.hojaEnviando(true);
    try {
      const id = await Nube.crearGrupo(nombre, h.sel);
      const lista = await Nube.misGrupos();
      this.setState({ gAmigos: lista });
      if (window.Fluido) await Fluido.animarSalida('chat');
      this.abrirGrupo(id);
      this.guardarCache();
    } catch (e) {
      this.errorHoja(e, 'No se pudo crear el grupo.');
    }
  }

  async renombrarGrupoActual() {
    const s = this.state, h = s.chatHoja, g = s.gAmigos.find(x => x.id === s.chatG);
    if (!h || !g || h.enviando) return;
    const nombre = String(h.nombre || '').trim().replace(/\s+/g, ' ');
    if (!nombre) return this.msgHoja('Escribe un nombre para el grupo.');
    if (nombre.length > 40) return this.msgHoja('El nombre puede tener hasta 40 letras.');
    if (nombre === g.nombre) return;
    this.hojaEnviando('nombre');
    try {
      await Nube.renombrarGrupo(g.id, nombre);
      this.setState(st => ({
        gAmigos: st.gAmigos.map(x => x.id === g.id ? { ...x, nombre } : x),
        chatHoja: st.chatHoja ? { ...st.chatHoja, enviando: null, nombre, msg: '' } : null,
      }));
      if (window.Fluido) Fluido.aviso('El grupo ahora se llama «' + nombre + '»');
    } catch (e) {
      this.errorHoja(e, 'No se pudo cambiar el nombre.');
    }
  }

  async agregarAlGrupo(id) {
    const s = this.state, h = s.chatHoja, g = s.gAmigos.find(x => x.id === s.chatG);
    if (!h || !g || h.enviando) return;
    const a = s.amigos.find(x => x.id === id);
    this.hojaEnviando(id);
    try {
      await Nube.agregarAGrupo(g.id, [id]);
      const lista = await Nube.misGrupos();
      this.setState(st => ({ gAmigos: lista, chatHoja: st.chatHoja ? { ...st.chatHoja, enviando: null, msg: '' } : null }));
      if (window.Fluido) Fluido.aviso(nombreCorto(id, a ? a.nombre : '') + ' ahora está en el grupo');
    } catch (e) {
      this.errorHoja(e, 'No se pudo agregar.');
    }
  }

  async salirDelGrupo() {
    const s = this.state, g = s.gAmigos.find(x => x.id === s.chatG);
    if (!g || (s.chatHoja && s.chatHoja.enviando)) return;
    if (!window.confirm('¿Salir de «' + g.nombre + '»? Dejarás de ver sus mensajes. Lo que debas o te deban en sus libreticas se conserva en Finanzas.')) return;
    this.hojaEnviando('salir');
    try {
      await Nube.salirDeGrupo(g.id);
      if (window.Fluido) await Fluido.animarSalida('chat');
      this.cerrarChat();
      this.setState(st => ({ gAmigos: st.gAmigos.filter(x => x.id !== g.id) }));
      this.actualizarGlobo();
      this.guardarCache();
      if (window.Fluido) Fluido.aviso('Saliste de «' + g.nombre + '»');
    } catch (e) {
      this.errorHoja(e, 'No se pudo salir del grupo.');
    }
  }

  /* ── Libreticas de grupo ─────────────────────────────────────────── */

  /** "Partes iguales": reparte el total entre los elegidos; los pesos que
   *  sobran de la división van de a uno a los primeros, para que cuadre exacto. */
  partesIguales() {
    const s = this.state, h = s.chatHoja, g = s.gAmigos.find(x => x.id === s.chatG), me = this.uid;
    if (!h || !g) return;
    const total = +String(h.total || '').replace(/\D/g, '') || 0;
    const ids = g.miembros.filter(x => x.id !== me && (h.partes || {})[x.id] !== undefined).map(x => x.id);
    if (!total || !ids.length) return;
    const base = Math.floor(total / ids.length), resto = total - base * ids.length;
    const partes = {};
    ids.forEach((id, i) => { partes[id] = String(base + (i < resto ? 1 : 0)); });
    this.setState({ chatHoja: { ...h, partes, msg: '' } });
  }

  async crearLibretaGrupoChat() {
    const s = this.state, h = s.chatHoja, g = s.gAmigos.find(x => x.id === s.chatG), me = this.uid;
    if (!h || !g || h.enviando) return;
    const total = +String(h.total || '').replace(/\D/g, '') || 0;
    const partes = g.miembros.filter(x => x.id !== me && (h.partes || {})[x.id] !== undefined)
      .map(x => ({ id: x.id, monto: +String(h.partes[x.id] || '').replace(/\D/g, '') || 0 }));
    const suma = partes.reduce((t, p) => t + p.monto, 0);
    if (!total) return this.msgHoja('Escribe el total.');
    if (!partes.length) return this.msgHoja('Elige quiénes consumieron.');
    if (partes.some(p => !(p.monto > 0))) return this.msgHoja('A cada persona elegida le toca un monto mayor que 0.');
    if (suma !== total) return this.msgHoja(suma > total ? 'La suma no puede ser mayor que el total.' : 'Aún falta repartir ' + pesosTxt(total - suma) + '.');
    this.hojaEnviando(true);
    try {
      await Nube.crearLibretaGrupo(g.id, total, String(h.nota || '').trim().slice(0, 80), partes);
      this.setState({ libsG: await Nube.libretasGrupo(null) });
      this.guardarCache();
      if (window.Fluido) await Fluido.animarSalida('chat');
      this.setState({ chatHoja: null });
      this.bajarChat(true);
      if (window.Fluido) Fluido.aviso('Libretica enviada al grupo');
    } catch (e) {
      this.errorHoja(e, 'No se pudo enviar.');
    }
  }

  /** undefined: aún no la conozco; null: ya no existe (o no la puedo ver). */
  libretaGrupoVista(id, s) {
    s = s || this.state;
    const mia = s.libsG.find(l => l.id === id);
    return mia || s.lgExtra[id];
  }

  abrirLibretaGrupo(id) {
    this.setState({ lgVer: id, lgAbono: '', lgMsg: '', lgBusy: false });
    if (!this.state.libsG.some(l => l.id === id)) this.traerLibretaGrupo(id);
  }

  async traerLibretaGrupo(id) {
    try {
      const r = await Nube.libretasGrupo([id]);
      this.setState(st => ({ lgExtra: { ...st.lgExtra, [id]: r[0] || null } }));
    } catch (e) {
      if (this.state.lgVer === id) this.setState({ lgMsg: navigator.onLine === false ? 'Sin conexión: no se pudo cargar.' : 'No se pudo cargar.' });
    }
  }

  /** Solo quien debe registra lo que paga; nunca más de lo que le falta. */
  async abonarLG(todo) {
    const s = this.state, me = this.uid, l = this.libretaGrupoVista(s.lgVer);
    if (!l || s.lgBusy) return;
    const p = l.partes.find(x => x.id === me);
    if (!p) return;
    const saldo = saldoParte(p);
    const monto = todo ? saldo : (+String(s.lgAbono || '').replace(/\D/g, '') || 0);
    if (!(monto > 0)) { this.setState({ lgMsg: 'Escribe cuánto pagaste.' }); return; }
    if (monto > saldo) { this.setState({ lgMsg: 'Es más de lo que te falta (' + pesosTxt(saldo) + ').' }); return; }
    this.setState({ lgBusy: true, lgMsg: '' });
    try {
      const queda = +(await Nube.abonarLibretaGrupo(l.id, monto));
      const libsG = await Nube.libretasGrupo(null);
      this.setState({ libsG, lgBusy: false, lgAbono: '' });
      this.guardarCache();
      if (window.Fluido) Fluido.aviso(queda <= 0 ? 'Pagaste tu parte ✓' : 'Abono registrado · te falta ' + pesosTxt(queda));
    } catch (e) {
      this.setState({ lgBusy: false, lgMsg: e.message || 'No se pudo registrar.' });
    }
  }

  async borrarAbonoLG(a) {
    const s = this.state, l = this.libretaGrupoVista(s.lgVer);
    if (!l || s.lgBusy) return;
    if (!window.confirm('¿Borrar tu abono de ' + pesosTxt(a.monto) + '? ' + nombreCorto(l.creador, l.creadorNombre) + ' se enterará.')) return;
    this.setState({ lgBusy: true, lgMsg: '' });
    try {
      await Nube.borrarAbonoGrupo(a.id);
      const libsG = await Nube.libretasGrupo(null);
      this.setState({ libsG, lgBusy: false });
      this.guardarCache();
      if (window.Fluido) Fluido.aviso('Abono borrado');
    } catch (e) {
      this.setState({ lgBusy: false, lgMsg: e.message || 'No se pudo borrar.' });
    }
  }

  async borrarLG() {
    const s = this.state, l = this.libretaGrupoVista(s.lgVer);
    if (!l || s.lgBusy || l.creador !== this.uid) return;
    if (!window.confirm('¿Borrar la libretica de ' + pesosTxt(l.total) + (l.nota ? ' «' + l.nota + '»' : '') + '? Desaparece para todos y quienes aún deben se enterarán.')) return;
    this.setState({ lgBusy: true, lgMsg: '' });
    try {
      await Nube.borrarLibretaGrupo(l.id);
      if (window.Fluido) await Fluido.animarSalida('lg');
      this.setState(st => ({ libsG: st.libsG.filter(x => x.id !== l.id), lgExtra: { ...st.lgExtra, [l.id]: null },
                             lgVer: null, lgBusy: false, lgAbono: '', lgMsg: '' }));
      this.guardarCache();
      if (window.Fluido) Fluido.aviso('Libretica borrada');
    } catch (e) {
      this.setState({ lgBusy: false, lgMsg: e.message || 'No se pudo borrar.' });
    }
  }

  /** Hoja con el detalle de una libretica de grupo: todos ven todo. */
  valsLG(s) {
    const self = this, me = this.uid, id = s.lgVer;
    if (!id) return { lgOn: false };
    const l = this.libretaGrupoVista(id, s);
    const base = { lgOn: true, lgCerrar: () => self.cerrarHoja('lg'), lgMsg: s.lgMsg || '' };
    if (!l) {
      return Object.assign(base, {
        lgListo: false, lgKicker: 'LIBRETICA DE GRUPO', lgTitulo: l === null ? 'Ya no existe' : 'Cargando…',
        lgVacio: l === null ? 'Quien la creó la borró.' : '',
      });
    }
    const soyCreador = l.creador === me, mia = l.partes.find(p => p.id === me);
    const falta = l.partes.reduce((t, p) => t + saldoParte(p), 0), pagado = l.total - falta;
    const pagaron = l.partes.filter(p => saldoParte(p) <= 0).length;
    const miSaldo = mia ? saldoParte(mia) : 0;
    const orden = l.partes.slice().sort((x, y) => (x.id === me ? -1 : (y.id === me ? 1 : 0)));
    const creador = soyCreador ? 'tú' : nombreCorto(l.creador, l.creadorNombre);
    return Object.assign(base, {
      lgListo: true,
      lgKicker: 'LIBRETICA DE GRUPO · ' + String(l.grupoNombre).toUpperCase(),
      lgTitulo: l.nota || 'Libretica de grupo',
      lgTotal: pesosTxt(l.total),
      lgMeta: (soyCreador ? 'La creaste tú' : 'La creó ' + creador) + ' · ' + self.fechaTxt(isoOf(new Date(l.en))).toLowerCase() + ' · ' + cuenta(l.partes.length, 'persona', 'personas'),
      lgResumen: falta ? 'Pagado ' + pesosTxt(pagado) + ' de ' + pesosTxt(l.total) + ' · ' + pagaron + ' de ' + l.partes.length + ' pagaron' : 'Todos pagaron ✓',
      lgResumenColor: falta ? '#B8C2D2' : MINT,
      lgBarW: Math.round(pagado / Math.max(1, l.total) * 100) + '%',
      lgPartes: orden.map(p => {
        const saldo = saldoParte(p), abonado = p.monto - saldo, yo = p.id === me;
        let estado;
        if (saldo <= 0) estado = yo ? 'Pagaste ✓' : 'Pagó ✓';
        else if (abonado > 0) estado = (yo ? 'Abonaste ' : 'Abonó ') + pesosTxt(abonado) + ' · ' + (yo ? 'te falta ' : 'debe ') + pesosTxt(saldo);
        else estado = yo ? 'Te falta todo' : 'Debe todo';
        return {
          nombre: yo ? 'Tú' : nombreVisto(p.id, p.nombre), inicial: (nombreVisto(p.id, p.nombre) || '?').charAt(0).toUpperCase(), color: colorDe(p.id),
          monto: pesosTxt(p.monto), estado,
          estadoColor: saldo <= 0 ? MINT : (abonado > 0 ? AMBER : '#8E9AAE'),
          barW: Math.round(abonado / Math.max(1, p.monto) * 100) + '%', barColor: saldo <= 0 ? MINT : AMBER,
          fondo: yo ? 'rgba(255,255,255,.045)' : 'rgba(255,255,255,.02)',
          abonosOn: yo && p.abonos.length > 0,
          abonos: yo ? p.abonos.map(a => ({
            txt: pesosTxt(a.monto), meta: self.fechaTxt(isoOf(new Date(a.en))).toUpperCase(),
            borrar: () => self.borrarAbonoLG(a),
          })) : [],
        };
      }),
      lgPagarOn: !!mia && miSaldo > 0,
      lgAbono: fmtMoney(s.lgAbono),
      onLgAbono: ev => { const v = ev.target.value.replace(/\D/g, '').slice(0, 12); self.setState({ lgAbono: v, lgMsg: '' }); },
      lgAbonar: () => self.abonarLG(false),
      lgAbonarTxt: s.lgBusy ? '…' : 'Abonar',
      lgPagarTodo: () => self.abonarLG(true),
      lgPagarTodoTxt: s.lgBusy ? 'Registrando…' : 'Pagar lo que falta · ' + pesosTxt(miSaldo),
      lgBorrarOn: soyCreador,
      lgBorrar: () => self.borrarLG(),
      lgNota: soyCreador
        ? 'Cada persona registra lo que te paga y te llega un aviso. Cuando todos paguen, queda saldada.'
        : (mia ? 'Solo tú registras lo que pagas; ' + creador + ' recibe un aviso con cada abono.' : 'Cada persona registra lo que paga.'),
      lgIrChatOn: s.gAmigos.some(x => x.id === l.grupo) && s.chatG !== l.grupo,
      lgIrChat: () => { self.cerrarHoja('lg', true); self.abrirGrupo(l.grupo); },
    });
  }

  /* ── Elegir amigo (Compartir con / Para) ─────────────────────────── */

  abrirElegir(tipo, id) { this.setState({ elegir: { tipo, id: id || null, q: '' } }); }

  /** Aplica lo elegido (se ve debajo mientras la hoja baja) y cierra. */
  elegir(id) {
    const e = this.state.elegir, me = this.uid;
    if (!e) return;
    if (e.tipo === 'lib') {
      // Elegir a alguien no se la muestra aún: hay que tocar Enviar. Deudor y
      // prestamista llevan el nombre de Pilares: el amigo también los ve.
      this.setState(st => ({ libs: st.libs.map(x => {
        if (x.id !== e.id || (x.contra || null) === id) return x;
        if (!id) return { ...x, contra: null, enviada: false };
        const suyo = (st.amigos.find(a => a.id === id) || {}).nombre || '';
        const mio = st.profile.nombre || (st.me && st.me.usuario) || 'Yo';
        return x.mine ? { ...x, contra: id, enviada: false, deudor: suyo, prestamista: mio }
                      : { ...x, contra: id, enviada: false, deudor: mio, prestamista: suyo };
      }) }));
    } else {
      this.setState(st => {
        if (!st.modal) return null;
        const lista = id === me ? st.cuadernos : (st.cuadAmigos[id] || []);
        return { modal: { ...st.modal, para: id, c: lista[0] ? lista[0].id : null } };
      });
    }
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    this.cerrarHoja('elegir');
  }

  /** Enter en el buscador: con una sola persona en la lista, la elige; si no, guarda el teclado. */
  elegirConEnter() {
    const v = this.valsElegir(this.state);
    if (v.elegirOn && v.elegirQ.trim() && v.elegirFilas.length === 1) v.elegirFilas[0].pick();
    else if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

  valsElegir(s) {
    const e = s.elegir, self = this, me = this.uid;
    if (!e) return { elegirOn: false };
    let actual, propio, titulo;
    if (e.tipo === 'lib') {
      const l = s.libs.find(x => x.id === e.id);
      if (!l) return { elegirOn: false };
      actual = l.contra || null;
      titulo = '¿Con quién la compartes?';
      propio = { id: null, nombre: 'Solo yo', sub: 'Nadie más la ve' };
    } else {
      if (!s.modal) return { elegirOn: false };
      actual = s.modal.para || me;
      titulo = '¿Para quién es?';
      propio = { id: me, nombre: 'Mí', sub: 'En tu agenda' };
    }
    const miNombre = s.profile.nombre || (s.me && s.me.usuario) || 'Yo';
    // Por el nombre que se ve (el apodo, si tiene); debajo, el de Pilares.
    const amigos = s.amigos.filter(a => a.estado === 'aceptada')
      .map(a => ({ id: a.id, nombre: nombreVisto(a.id, a.nombre), real: a.nombre, sub: a.apodo ? a.nombre : '' }))
      .sort((x, y) => String(x.nombre).localeCompare(String(y.nombre), 'es'));
    // Con pocos amigos la lista se ve completa: el buscador sobra.
    const buscarOn = amigos.length > 4;
    const q = buscarOn ? norm(e.q) : '';
    const lista = q ? amigos.filter(a => norm(a.nombre).includes(q) || norm(a.real).includes(q)) : [propio].concat(amigos);
    const ponerQ = v => self.setState(st => st.elegir ? { elegir: { ...st.elegir, q: v } } : null);
    return {
      elegirOn: true, elegirTitulo: titulo,
      elegirAlto: buscarOn ? 'min(640px, calc(100% - env(safe-area-inset-top,0px) - 44px))' : 'auto',
      elegirBuscarOn: buscarOn,
      elegirQ: e.q || '',
      onElegirQ: ev => ponerQ(ev.target.value),
      limpiarElegirQ: () => {
        ponerQ('');
        const x = document.querySelector('[data-elegir-buscar]');
        if (x) x.focus();
      },
      cerrarElegir: () => {
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        self.cerrarHoja('elegir');
      },
      elegirFilas: lista.map(f => {
        const sel = f.id === actual, yo = f === propio;
        return {
          nombre: f.nombre, sub: f.sub || '',
          inicial: String((yo ? miNombre : f.nombre) || '?').charAt(0).toUpperCase(), color: colorDe(yo ? me : f.id),
          sel: sel ? 'true' : 'false',
          fondo: sel ? 'rgba(87,185,160,.1)' : '#121724', borde: sel ? 'rgba(87,185,160,.38)' : 'rgba(255,255,255,.07)',
          marca: sel ? MINT : 'transparent', marcaBorde: sel ? MINT : 'rgba(255,255,255,.2)', tick: sel ? '#0A0E1A' : 'transparent',
          pick: () => self.elegir(f.id),
        };
      }),
      elegirVacio: q && !lista.length ? 'Ningún amigo coincide con «' + String(e.q).trim() + '»' : '',
    };
  }

  /* ── Libreticas: enviar al amigo ─────────────────────────────────── */

  /** El amigo la ve y recibe el aviso (con monto y concepto) solo al enviarla. */
  enviarLibreta(id) {
    const l = this.state.libs.find(x => x.id === id);
    if (!l || !l.contra || enviadaDe(l)) return;
    if (!((+l.monto || 0) > 0)) { if (window.Fluido) Fluido.aviso('Escribe el monto antes de enviarla'); return; }
    const nombre = (this.state.amigos.find(a => a.id === l.contra) || {}).nombre || 'tu amigo';
    this.setState(st => ({ libs: st.libs.map(x => x.id === id ? { ...x, enviada: true } : x) }));
    if (window.Fluido) Fluido.aviso('Libretica enviada a ' + nombreCorto(l.contra, nombre));
  }

  /* ── Tipos de actividad propios ──────────────────────────────────── */

  tipoError(error) { this.setState(st => st.tipoEd ? { tipoEd: { ...st.tipoEd, error } } : null); }

  /** Crea el tipo o guarda el nombre y la urgencia de uno existente. Un
   *  cambio de nombre o urgencia también llega a mis actividades de ese tipo. */
  guardarTipo() {
    const s = this.state, te = s.tipoEd, me = this.uid;
    if (!te) return;
    const nombre = te.nombre.trim().replace(/\s+/g, ' ');
    const lista = tiposDe(s.profile);
    if (!nombre) return this.tipoError('Escribe un nombre para el tipo.');
    if (nombre.length > 30) return this.tipoError('Máximo 30 letras.');
    const igual = lista.find(x => norm(x.nombre) === norm(nombre) && x.nombre !== te.original);
    if (igual) return this.tipoError('Ya tienes un tipo llamado «' + igual.nombre + '».');
    const aviso = (txt, deshacer) => { if (window.Fluido) Fluido.aviso(txt, deshacer ? 'Deshacer' : '', deshacer || null, null); };

    if (te.modo === 'nuevo') {
      if (lista.length >= 30) return this.tipoError('Puedes tener hasta 30 tipos.');
      const tipos = lista.concat([{ nombre, urgencia: te.urgencia }]);
      this.setState(st => ({
        profile: { ...st.profile, tipos },
        modal: st.modal ? { ...st.modal, tipo: nombre, urg: te.urgencia } : st.modal,
        tipoEd: { modo: 'editar', original: nombre, nombre, urgencia: te.urgencia, error: '' },
      }));
      aviso('Tipo «' + nombre + '» creado');
      return;
    }

    const orig = te.original, antes = lista.find(x => x.nombre === orig);
    if (!antes) { this.setState({ tipoEd: null }); return; }
    if (antes.nombre === nombre && antes.urgencia === te.urgencia) return this.tipoError('No hay cambios para guardar.');
    const tipos = lista.map(x => x.nombre === orig ? { nombre, urgencia: te.urgencia } : x);
    const mias = a => a.tipo === orig && (!a.owner || a.owner === me);
    const previas = s.acts.filter(mias).map(a => ({ id: a.id, tipo: a.tipo, urg: a.urg }));
    this.setState(st => ({
      profile: { ...st.profile, tipos },
      acts: st.acts.map(a => mias(a) ? { ...a, tipo: nombre, urg: te.urgencia } : a),
      modal: st.modal && st.modal.tipo === orig ? { ...st.modal, tipo: nombre, urg: te.urgencia } : st.modal,
      tipoEd: { modo: 'editar', original: nombre, nombre, urgencia: te.urgencia, error: '' },
    }));
    aviso('Tipo actualizado' + (previas.length ? ' · ' + cuenta(previas.length, 'actividad', 'actividades') : ''), () => {
      const prev = {};
      previas.forEach(p => { prev[p.id] = p; });
      this.setState(st => ({
        profile: { ...st.profile, tipos: lista },
        acts: st.acts.map(a => prev[a.id] ? { ...a, tipo: prev[a.id].tipo, urg: prev[a.id].urg } : a),
        modal: st.modal && st.modal.tipo === nombre ? { ...st.modal, tipo: orig, urg: antes.urgencia } : st.modal,
        tipoEd: null,
      }));
    });
  }

  /** Borra el tipo de la lista; las actividades que ya lo usan lo conservan. */
  borrarTipo(nombre) {
    const lista = tiposDe(this.state.profile);
    if (lista.length <= 1 || !lista.some(x => x.nombre === nombre)) return;
    const tipos = lista.filter(x => x.nombre !== nombre);
    this.setState(st => ({
      profile: { ...st.profile, tipos },
      tipoEd: null,
      // Una actividad nueva pasa al primer tipo; una existente conserva el suyo.
      modal: st.modal && !st.modal.id && st.modal.tipo === nombre ? { ...st.modal, tipo: tipos[0].nombre, urg: tipos[0].urgencia } : st.modal,
    }));
    if (window.Fluido) {
      Fluido.aviso('Tipo «' + nombre + '» borrado', 'Deshacer', () => this.setState(st => ({ profile: { ...st.profile, tipos: lista } })), null);
    }
  }

  /** Fila Tipo de la ventana de actividad; con Modo edición, más su editor. */
  valsTipos(s) {
    const self = this, m = s.modal;
    if (!m) return { tipos: [], tipoNuevoOn: false, tipoEdOn: false };
    const lista = tiposDe(s.profile);
    const chips = lista.slice();
    // Un tipo que ya no está en mi lista (borrado, o de un amigo) sigue visible en su actividad.
    if (m.tipo && !lista.some(x => x.nombre === m.tipo)) chips.push({ nombre: m.tipo, urgencia: m.urg !== false, ajeno: true });
    const edit = !!s.edit, te = edit ? s.tipoEd : null;
    const chip = on => ({ bg: on ? '#fff' : 'rgba(255,255,255,.05)', border: on ? '#fff' : 'rgba(255,255,255,.09)', fg: on ? '#090C14' : '#8E9AAE' });
    const vals = {
      tiposLabel: edit ? 'TIPO · TOCA UNO PARA EDITARLO' : 'TIPO',
      tipos: chips.map(x => Object.assign({
        t: x.nombre,
        pick: () => self.setState(st => ({
          modal: { ...st.modal, tipo: x.nombre, urg: x.urgencia },
          tipoEd: st.edit && !x.ajeno ? { modo: 'editar', original: x.nombre, nombre: x.nombre, urgencia: x.urgencia, error: '' } : null,
        })),
      }, chip(m.tipo === x.nombre))),
      tipoNuevoOn: edit,
      tipoNuevo: () => self.setState({ tipoEd: { modo: 'nuevo', original: null, nombre: '', urgencia: true, error: '' } }),
      tipoNuevoBorde: te && te.modo === 'nuevo' ? 'rgba(206,127,85,.7)' : 'rgba(206,127,85,.38)',
      tipoEdOn: !!te,
    };
    if (!te) return vals;
    const antes = te.modo === 'editar' ? lista.find(x => x.nombre === te.original) : null;
    const listo = te.modo === 'nuevo'
      ? !!te.nombre.trim()
      : !!antes && !!te.nombre.trim() && (te.nombre.trim() !== antes.nombre || te.urgencia !== antes.urgencia);
    return Object.assign(vals, {
      tipoEdTitulo: te.modo === 'nuevo' ? 'NUEVO TIPO' : 'EDITAR «' + te.original.toUpperCase() + '»',
      tipoEdNombre: te.nombre,
      onTipoEdNombre: ev => { const v = ev.target.value; self.setState(st => st.tipoEd ? { tipoEd: { ...st.tipoEd, nombre: v, error: '' } } : null); },
      tipoUrgOpciones: [['Con urgencia', true], ['Sin urgencia', false]].map(([t, v]) => Object.assign({
        t, pick: () => self.setState(st => st.tipoEd ? { tipoEd: { ...st.tipoEd, urgencia: v, error: '' } } : null),
      }, chip(te.urgencia === v))),
      tipoEdNota: te.urgencia
        ? 'Se colorea según qué tan cerca está la fecha, como un Quiz.'
        : 'Siempre en gris, sin importar la fecha, como una Tarea.',
      tipoEdCta: te.modo === 'nuevo' ? 'Crear tipo' : 'Guardar',
      tipoEdCtaBg: listo ? '#CE7F55' : 'rgba(206,127,85,.18)',
      tipoEdCtaFg: listo ? '#0A0E1A' : 'rgba(206,127,85,.6)',
      tipoEdGuardar: () => self.guardarTipo(),
      tipoEdBorrarOn: te.modo === 'editar' && lista.length > 1,
      tipoEdBorrar: () => self.borrarTipo(te.original),
      tipoEdCerrar: () => self.setState({ tipoEd: null }),
      tipoEdError: te.error,
    });
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
                     cuenta(datos.libreticas.length, 'libretica', 'libreticas') + ', ' +
                     cuenta(datos.sesiones_gimnasio.length, 'día de gimnasio', 'días de gimnasio') + ' y ' +
                     cuenta(datos.mensajes_chat.length, 'mensaje', 'mensajes') + '. Toca para guardarlo.',
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
      .filter(a => typeof a.tipo === 'string' && a.tipo.trim() && /^\d{4}-\d{2}-\d{2}$/.test(a.fecha))
      .map(a => ({ id: Nube.uuid(), c: mapa[a.c] || null, tipo: a.tipo.trim().slice(0, 30), urg: a.tipo !== 'Tarea', fecha: a.fecha,
                   asunto: a.asunto || [], owner: uid, por: null, nota: '' }));

    const nuevasLibs = (v.libs || []).map(l => ({
      id: Nube.uuid(), owner: uid, contra: null, deudor: l.deudor || '', prestamista: l.prestamista || '',
      monto: String(l.monto || '').replace(/\D/g, '') || '0', mine: !!l.mine, paid: !!l.paid,
      nota: '', vence: '', enviada: false, abonos: [],
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
    const profile = { ...s.profile, nombre: s.profile.nombre || p.nombre || '' };

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
      authSub: crear ? 'Crea tu cuenta con un usuario y una contraseña. No necesitas correo.'
        : 'Entra con tu usuario y contraseña.',
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
  impor(a) { return !conUrg(a) ? 'BAJA' : ((a.tipo === 'Final' || a.tipo === 'Parcial') ? 'ALTA' : 'MEDIA'); }

  urg(a) {
    if (!conUrg(a)) return { color: GREY, tint: 'rgba(142,154,174,.14)', label: 'SIN URGENCIA' };
    const d = dayDiff(TODAY, a.fecha);
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

    APODOS = {};
    s.amigos.forEach(a => { if (a.apodo && a.estado === 'aceptada') APODOS[a.id] = a.apodo; });
    const amigosOk = s.amigos.filter(a => a.estado === 'aceptada');
    const nombreDe = id => { const a = s.amigos.find(x => x.id === id); return a ? nombreVisto(a.id, a.nombre) : 'un amigo'; };
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
    // Las copias de grupo de los demás (las que agendé para el grupo) no se listan.
    const monthAll = s.acts.filter(a => a.fecha.slice(0, 7) === mesKey && !(a.lote && a.owner && a.owner !== me));
    const grupoNombre = id => (s.gAmigos.find(g => g.id === id) || {}).nombre || '';
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
        n: String(d), dots: dayActs.slice(0, 3).map(a => ({ c: self.urg(a).color })),
        bg: sel ? 'rgba(255,255,255,.1)' : (dayActs.length ? 'rgba(255,255,255,.04)' : 'transparent'),
        border: sel ? 'rgba(255,255,255,.35)' : (isToday ? 'rgba(87,185,160,.5)' : 'transparent'),
        fg: isToday ? MINT : (dayActs.length ? '#fff' : '#8E9AAE'),
        select: () => self.setState({ selDay: d }),
      });
    }
    const acts = monthAll.slice().sort((a, b) => a.fecha < b.fecha ? -1 : 1).map(a => {
      const u = self.urg(a);
      const ajena = a.owner && a.owner !== me, cn = cuadNombre(a);
      return {
        tipo: a.tipo.toUpperCase(), color: u.color, tint: u.tint,
        plazo: self.plazo(a.fecha),
        fechaTxt: self.fechaTxt(a.fecha) + ' · ' + s.year,
        asuntos: a.asunto.map(t => ({ t })),
        cuad: cn ? '· ' + cn : '',
        tag: a.lote ? 'GRUPO' + (grupoNombre(a.g) ? ' · ' + grupoNombre(a.g).toUpperCase() : '')
          : (ajena ? 'PARA ' + nombreDe(a.owner).toUpperCase() : (a.por ? 'DE ' + nombreDe(a.por).toUpperCase() : '')),
        op: ajena ? 0.6 : 1,
        edit: () => self.setState({ tipoEd: null, modal: { id: a.id, c: a.c, tipo: a.tipo, urg: conUrg(a), fecha: a.fecha, asunto: a.asunto.slice(), tema: '', para: a.owner || me, por: a.por } }),
      };
    });

    const m = s.modal;
    const mPara = m ? (m.para || me) : me;
    // Actividad de grupo: la nueva (m.grupo) o una copia existente (lote).
    const mAct = m && m.id ? s.acts.find(a => a.id === m.id) : null;
    const mLote = !!(mAct && mAct.lote), mFijo = mLote && !!mAct.por;
    const mGrupoNueva = !!(m && !m.id && m.grupo);
    const mGrupoId = mGrupoNueva ? m.grupo : (mLote ? mAct.g : null);
    const mGrupoNom = mGrupoId ? ((s.gAmigos.find(g => g.id === mGrupoId) || {}).nombre || '') : '';
    const mCreador = mFijo
      ? nombreCorto(mAct.por, ((s.gAmigos.find(g => g.id === mAct.g) || { miembros: [] }).miembros.find(x => x.id === mAct.por) || {}).nombre || nombreDe(mAct.por))
      : '';
    const mCuads = mPara === me ? s.cuadernos : (s.cuadAmigos[mPara] || []);
    let mCells = [], mUrg = { color: GREY, tint: 'rgba(142,154,174,.14)', label: 'SIN URGENCIA' };
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
      mUrg = self.urg({ tipo: m.tipo, fecha: m.fecha, urg: m.urg });
    }
    const urgNotes = {
      'SIN URGENCIA': 'Este tipo se muestra en gris, sin importar la fecha.',
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
    // Deudor y prestamista se guardan con el nombre de Pilares (los dos los ven y
    // en la propia se editan tal cual); donde solo se leen, el del otro va con mi apodo.
    const enLib = (l, t) => {
      const otro = (!l.owner || l.owner === me) ? l.contra : l.owner;
      const a = otro && APODOS[otro] ? s.amigos.find(x => x.id === otro) : null;
      return a && String(t || '').trim() === String(a.nombre || '').trim() ? APODOS[otro] : t;
    };
    // Igual que en la base de datos: queda saldada cuando los abonos cubren el monto.
    const conAbonos = (x, abonos) => {
      const ab = abonos.reduce((t, a) => t + (+a.monto || 0), 0);
      return { ...x, abonos, paid: ab >= (+x.monto || 0) };
    };
    // Lo que la persona corrigió a mano vale para los demás gastos con el mismo motivo.
    const gastosMios = s.libs.filter(l => l.gasto && libView(l).mia);
    const aprendidos = {};
    gastosMios.slice().reverse().forEach(l => { if (l.cat && TIPO_GASTO[l.cat] && motivoUtil(l.nota)) aprendidos[motivoClave(l.nota)] = l.cat; });
    const tipoDe = l => tipoGasto(l, aprendidos);
    // Dentro de la hoja de Gastos, el gasto que se abre queda a la vista (la hoja se desplaza sola).
    const verGasto = id => setTimeout(() => {
      const el = document.querySelector('[data-hoja="gastos"] [data-lib-id="' + id + '"]');
      if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 90);
    const valsTipoGasto = l => {
      const tg = tipoDe(l), d = l.en ? isoOf(new Date(l.en)) : TODAY;
      const cuando = d === TODAY ? 'HOY' : (d === isoOf(addDays(NOW, -1)) ? 'AYER' : self.fechaTxt(d).toUpperCase());
      return {
        tipoN: tg.n, tipoC: tg.c, tipoTint: tg.tint, gastoMonto: pesosTxt(l.monto),
        abrirGasto: () => {
          const abrir = s.openLib !== l.id;
          self.setState({ openLib: abrir ? l.id : null, abonoMonto: '' });
          if (abrir) verGasto(l.id);
        },
        gastoNota: motivoUtil(l.nota) ? l.nota.trim() : 'Sin motivo',
        gastoNotaFg: motivoUtil(l.nota) ? '#EDF1F7' : '#8E9AAE',
        gastoMeta: cuando + ' · ' + tg.n.toUpperCase(),
        tiposGasto: TIPOS_GASTO.map(t => {
          const on = t === tg;
          return { n: t.n, c: t.c, on, bg: on ? t.tint : 'rgba(255,255,255,.04)', border: on ? t.c : 'rgba(255,255,255,.09)', fg: on ? t.c : '#8E9AAE',
                   elegir: () => setLib(l.id, x => ({ ...x, cat: t.k })) };
        }),
        tipoAyuda: l.cat ? (motivoUtil(l.nota) ? 'Elegido por ti. Los gastos con este motivo irán aquí.' : 'Elegido por ti.')
                         : (motivoUtil(l.nota) ? 'Pilares lo eligió por el motivo. Toca otro si no es.' : 'Sin motivo va a Trabajo. Escribe el motivo o elige otro.'),
      };
    };
    const mkLib = l => {
      const v = libView(l);
      const green = v.meDeben, gasto = !!l.gasto && v.mia;
      // Gasto: gris neutro, solo monto y motivo (nunca se comparte).
      const col = gasto ? GASTO : (green ? MINT : RED);
      const otro = v.mia ? l.contra : l.owner;
      const otroNombre = otro
        ? ((s.amigos.find(a => a.id === otro) || {}).nombre || ((v.mia ? l.mine : !l.mine) ? l.deudor : l.prestamista))
        : '';
      const open = s.openLib === l.id;
      const n = (l.abonos || []).length;
      const pendiente = v.mia && !!l.contra && !enviadaDe(l);
      const montoOk = (+l.monto || 0) > 0, quien = nombreCorto(otro, otroNombre);
      return {
        id: l.id, deudor: l.deudor, prestamista: l.prestamista, monto: fmtMoney(l.monto),
        deudorVer: enLib(l, l.deudor), prestamistaVer: enLib(l, l.prestamista),
        montoTxt: '$ ' + fmtMoney(l.monto), color: col,
        bg: gasto ? 'rgba(255,255,255,.035)' : (green ? 'rgba(46,204,113,.09)' : 'rgba(196,100,97,.08)'),
        border: gasto ? 'rgba(255,255,255,.12)' : (green ? 'rgba(87,185,160,.32)' : 'rgba(196,100,97,.3)'),
        tint: gasto ? 'rgba(255,255,255,.08)' : (green ? 'rgba(87,185,160,.14)' : 'rgba(196,100,97,.14)'),
        esGasto: gasto, noGasto: !gasto,
        ...(gasto ? valsTipoGasto(l) : {}),
        gastoFecha: l.en ? (isoOf(new Date(l.en)) === TODAY ? 'HOY' : self.fechaTxt(isoOf(new Date(l.en))).toUpperCase()) : 'HOY',
        borrarGasto: () => self.setState(st => ({ libs: st.libs.filter(x => x.id !== l.id) })),
        dirLabel: green ? 'ME DEBEN' : 'YO DEBO',
        opacity: l.paid ? 0.45 : 1,
        paidLabel: l.paid ? 'SALDADA' : 'SALDAR',
        checkBg: l.paid ? MINT : 'transparent',
        checkBorder: l.paid ? MINT : 'rgba(255,255,255,.18)',
        tick: l.paid ? '#0A0E1A' : 'rgba(255,255,255,.18)',
        editable: v.mia, readonly: !v.mia,
        shared: !!otro,
        sharedLabel: !otro ? '' : (!v.mia ? 'CREADA POR ' : (pendiente ? 'PARA ' : 'COMPARTIDA CON ')) + String(nombreVisto(otro, otroNombre)).toUpperCase() + (pendiente ? ' · SIN ENVIAR' : ''),
        sharedDot: pendiente ? AMBER : col,
        enviarOn: pendiente,
        enviarTxt: 'Enviar a ' + quien,
        enviarBg: montoOk ? MINT : 'rgba(87,185,160,.14)',
        enviarFg: montoOk ? '#0A0E1A' : 'rgba(87,185,160,.55)',
        enviarNota: montoOk
          ? quien + ' aún no la ve. Le llegará con el monto' + ((l.nota || '').trim() ? ' y el concepto.' : '.')
          : 'Escribe el monto para poder enviarla.',
        enviar: () => self.enviarLibreta(l.id),
        hayConcepto: !!(l.nota || '').trim(),
        // Con quién se comparte: un botón que abre la hoja «Elegir amigo» (con buscador).
        hasPara: v.mia && amigosOk.length > 0,
        paraNombre: l.contra ? nombreVisto(l.contra, otroNombre) : 'Solo yo',
        paraInicial: String((l.contra ? nombreVisto(l.contra, otroNombre) : miNombre) || '?').charAt(0).toUpperCase(),
        paraColor: colorDe(l.contra || me),
        paraFg: l.contra ? '#EDF1F7' : '#B8C2D2',
        elegirPara: () => self.abrirElegir('lib', l.id),
        togglePaid: () => setLib(l.id, x => ({ ...x, paid: !x.paid })),
        // Tocar la etiqueta: ME DEBEN ↔ YO DEBO.
        flip: () => { if (v.mia) setLib(l.id, x => {
          if (x.contra) return { ...x, mine: !x.mine, deudor: x.prestamista, prestamista: x.deudor };
          return { ...x, mine: !x.mine };
        }); },
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
    // Los gastos viven aparte (Finanzas › Gastos): no cuentan en lo que te deben ni en lo que debes.
    const activeLibs = s.libs.filter(l => !l.paid && !l.gasto), paidL = s.libs.filter(l => l.paid && !l.gasto);

    // ── Gastos personales: una rueda que se llena con lo gastado frente al sueldo,
    // repartida en Comida, Ocio y Trabajo (el tipo con más gasto ocupa más rueda).
    const fechaG = l => (l.en ? new Date(l.en) : NOW);
    const fMes = new Date(NOW.getFullYear(), NOW.getMonth() + (s.finMes || 0), 1);
    const gMes = gastosMios
      .filter(l => { const d = fechaG(l); return d.getFullYear() === fMes.getFullYear() && d.getMonth() === fMes.getMonth(); })
      .sort((a, b) => fechaG(b) - fechaG(a));
    const gTotal = gMes.reduce((t, l) => t + (+l.monto || 0), 0);
    const sueldo = +s.profile.sueldo || 0;
    const porTipo = TIPOS_GASTO.map(t => ({ t, v: gMes.filter(l => tipoDe(l) === t).reduce((a, l) => a + (+l.monto || 0), 0) }));
    const tiposOrd = porTipo.slice().sort((a, b) => b.v - a.v);
    // Geometría de la rueda (viewBox 200×200, r = 84, trazo 14 con puntas redondas).
    const R_G = 84, C_G = 2 * Math.PI * R_G;
    const lleno = sueldo > 0 ? Math.min(1, gTotal / sueldo) : (gTotal > 0 ? 1 : 0);
    const conGasto = tiposOrd.filter(x => x.v > 0);
    // Las puntas redondas invaden 7 a cada lado: con 18 queda un respiro visible de 4.
    const hueco = (conGasto.length > 1 || lleno < 1) ? 18 : 0;
    const arcos = {};
    let inicio = 0;
    conGasto.forEach(x => {
      const largo = C_G * lleno * x.v / Math.max(1, gTotal);
      arcos[x.t.k] = { dash: Math.max(0.001, largo - hueco).toFixed(2) + ' ' + C_G.toFixed(2), off: (-(inicio + hueco / 2)).toFixed(2) };
      inicio += largo;
    });
    const pasado = sueldo > 0 && gTotal > sueldo, mesActual = (s.finMes || 0) === 0;
    const centroMonto = sueldo > 0 ? pesosTxt(Math.abs(sueldo - gTotal)) : pesosTxt(gTotal);

    // Los gastos no cuentan en lo que te deben ni en lo que debes.
    const deudas0 = activeLibs;
    const cobrar = deudas0.filter(l => libView(l).meDeben), pagar = deudas0.filter(l => !libView(l).meDeben);
    // Libreticas de grupo: en las que creé cuenta lo que me falta cobrar; en las que debo, mi parte.
    const lgMias = s.libsG.map(l => {
      const soyCreador = l.creador === me, mia = l.partes.find(p => p.id === me) || null;
      const falta = soyCreador ? l.partes.reduce((t, p) => t + saldoParte(p), 0) : (mia ? saldoParte(mia) : 0);
      return { l, soyCreador, mia, falta };
    }).filter(x => x.soyCreador || x.mia);
    const lgCobrar = lgMias.filter(x => x.soyCreador && x.falta > 0), lgPagar = lgMias.filter(x => !x.soyCreador && x.falta > 0);
    const lgSaldadas = lgMias.filter(x => x.falta <= 0);
    const nCobrar = cobrar.length + lgCobrar.length, nPagar = pagar.length + lgPagar.length;
    const sumMine = cobrar.reduce((t, l) => t + libView(l).saldo, 0) + lgCobrar.reduce((t, x) => t + x.falta, 0);
    const sumOwe = pagar.reduce((t, l) => t + libView(l).saldo, 0) + lgPagar.reduce((t, x) => t + x.falta, 0);
    const mkLG = x => {
      const l = x.l, green = x.soyCreador, col = green ? MINT : RED;
      const base = green ? l.total : x.mia.monto, pagado = base - x.falta;
      const pagaron = l.partes.filter(p => saldoParte(p) <= 0).length;
      return {
        id: l.id, color: col,
        bg: green ? 'rgba(46,204,113,.09)' : 'rgba(196,100,97,.08)',
        border: green ? 'rgba(87,185,160,.32)' : 'rgba(196,100,97,.3)',
        tint: green ? 'rgba(87,185,160,.14)' : 'rgba(196,100,97,.14)',
        dirLabel: green ? 'ME DEBEN' : 'YO DEBO',
        grupo: 'GRUPO · ' + String(l.grupoNombre).toUpperCase(),
        titulo: l.nota || 'Libretica de grupo',
        montoTxt: '$ ' + fmtMoney(String(x.falta)),
        linea: green
          ? 'De ' + pesosTxt(l.total) + ' · ' + pagaron + ' de ' + l.partes.length + ' pagaron'
          : 'Tu parte: ' + pesosTxt(x.mia.monto) + ' de ' + pesosTxt(l.total) + ' · a ' + nombreCorto(l.creador, l.creadorNombre),
        hasBar: pagado > 0, barW: Math.min(100, Math.round(pagado / Math.max(1, base) * 100)) + '%',
        accion: green ? 'VER DETALLE ›' : 'VER Y PAGAR ›',
        abrir: () => self.abrirLibretaGrupo(l.id),
      };
    };
    const pendAll = misActs.filter(a => dayDiff(TODAY, a.fecha) >= 0);
    const impRank = { ALTA: 0, MEDIA: 1, BAJA: 2 };
    const urgentAcad = pendAll.slice()
      .sort((a, b) => (dayDiff(TODAY, a.fecha) - dayDiff(TODAY, b.fecha)) || (impRank[self.impor(a)] - impRank[self.impor(b)]))
      .slice(0, 4)
      .map(a => {
        const u = self.urg(a), cn = (s.cuadernos.find(c => c.id === a.c) || {}).nombre || '';
        return {
          badge: a.tipo.toUpperCase(), color: u.color, tint: u.tint, imp: 'IMP. ' + self.impor(a),
          title: a.asunto[0] || 'Sin temas', meta: cn.toUpperCase(),
          right: self.fechaTxt(a.fecha), plazo: self.plazo(a.fecha),
          go: () => self.setState({ tab: 'estudio', estudioTab: 'agenda', openCuaderno: null, month: +a.fecha.split('-')[1] - 1, selDay: +a.fecha.split('-')[2] }),
        };
      })
      ;
    const deudas = pagar.map(l => ({ saldo: libView(l).saldo, title: enLib(l, l.prestamista), meta: 'YO DEBO · LIBRETICA', go: () => self.setState({ tab: 'finanzas' }) }))
      .concat(lgPagar.map(x => ({ saldo: x.falta, title: nombreVisto(x.l.creador, x.l.creadorNombre), meta: 'YO DEBO · GRUPO ' + String(x.l.grupoNombre).toUpperCase(),
                                   go: () => { self.setState({ tab: 'finanzas' }); self.abrirLibretaGrupo(x.l.id); } })));
    const urgent = urgentAcad
      .concat(deudas.sort((a, b) => b.saldo - a.saldo).slice(0, 2).map(d => ({
        badge: 'DEUDA', color: RED, tint: 'rgba(196,100,97,.14)',
        imp: (d.saldo >= 500000) ? 'IMP. ALTA' : 'IMP. MEDIA',
        title: d.title, meta: d.meta,
        right: '$' + fmtMoney(String(d.saldo)), plazo: 'POR PAGAR',
        go: d.go,
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
    const nUrg = nextUp ? self.urg(nextUp) : { color: GREY, tint: 'rgba(142,154,174,.14)' };
    const nextA = misActs.filter(a => conUrg(a) && dayDiff(TODAY, a.fecha) >= 0)
      .sort((a, b) => dayDiff(TODAY, a.fecha) - dayDiff(TODAY, b.fecha))[0];
    const nu = nextA ? self.urg(nextA) : { color: GREY, tint: 'rgba(142,154,174,.14)' };
    const nc = nextA ? s.cuadernos.find(c => c.id === nextA.c) : null;

    const tabDefs = [[ 'Ejercicio', 'ejercicio', ['8px','14px','18px'] ], [ 'Estudio', 'estudio', ['16px','16px','16px'] ], [ 'Finanzas', 'finanzas', ['18px','10px','14px'] ]];

    const vChat = self.valsChat(s);
    return {
      yes: true,
      appOn: true, authOn: false, loadOn: false,
      ...self.valsRutina(s), ...self.valsMenu(s), ...self.valsVer(s), ...self.valsAvisos(s), ...self.valsAtajo(s),
      ...self.valsAmigos(s), ...vChat, ...self.valsChatHoja(s), ...self.valsLG(s), ...self.valsElegir(s),
      isHome: s.tab === 'home', isEjercicio: s.tab === 'ejercicio', isEstudio: s.tab === 'estudio', isFinanzas: s.tab === 'finanzas',
      barraOn: !vChat.chatOn,
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
      finanzasSummary: nCobrar + ' POR COBRAR · ' + nPagar + ' POR PAGAR',
      // Finanzas › Gastos
      gastosOn: !!s.gastosOn,
      abrirGastos: () => self.setState({ gastosOn: true, finMes: 0, openLib: null, sueldoEdit: false }),
      cerrarGastos: () => self.cerrarHoja('gastos'),
      gMesTxt: MONTHS[fMes.getMonth()] + ' ' + fMes.getFullYear(),
      mesAnt: () => self.setState(st => ({ finMes: (st.finMes || 0) - 1, openLib: null })),
      mesSig: () => self.setState(st => ({ finMes: Math.min(0, (st.finMes || 0) + 1), openLib: null })),
      mesSigOn: !mesActual, mesSigOff: mesActual,
      ruedaArcos: TIPOS_GASTO.map(t => {
        const a = arcos[t.k];
        return { c: t.c, dash: a ? a.dash : '0.001 ' + C_G.toFixed(2), off: a ? a.off : '0', op: a ? 1 : 0 };
      }),
      ruedaCirc: C_G.toFixed(2),
      centroLabel: sueldo > 0 ? (pasado ? 'TE PASASTE' : (mesActual ? 'TE QUEDAN' : 'TE SOBRÓ')) : 'GASTASTE',
      centroMonto, centroColor: pasado ? RED : '#EDF1F7',
      centroTam: centroMonto.length > 11 ? '20px' : (centroMonto.length > 9 ? '23px' : '27px'),
      centroSub: sueldo > 0 ? (pasado ? 'Gastaste ' + pesosTxt(gTotal) : 'de ' + pesosTxt(sueldo)) : (mesActual ? 'este mes' : 'en ' + String(MONTHS[fMes.getMonth()]).toLowerCase()),
      ruedaLabel: (sueldo > 0 ? 'Gastaste ' + Math.round(gTotal / sueldo * 100) + '% de tu sueldo' : 'Gastaste ' + pesosTxt(gTotal)) + ' en ' + String(MONTHS[fMes.getMonth()]).toLowerCase(),
      tiposLeyenda: tiposOrd.map(x => ({ n: x.t.n, c: x.t.c, montoTxt: pesosTxt(x.v), fg: x.v > 0 ? '#EDF1F7' : '#4A566B' })),
      sueldoVer: sueldo > 0 && !s.sueldoEdit, sueldoFalta: !sueldo && !s.sueldoEdit, sueldoEditOn: !!s.sueldoEdit,
      sueldoTxt: pesosTxt(sueldo), sueldoInput: fmtMoney(s.sueldoInput || ''), sueldoQuitarOn: sueldo > 0,
      abrirSueldo: () => self.setState({ sueldoEdit: true, sueldoInput: sueldo ? String(sueldo) : '' }),
      onSueldo: ev => { const v = ev.target.value.replace(/\D/g, '').slice(0, 12); self.setState({ sueldoInput: v }); },
      guardarSueldo: () => self.setState(st => {
        const v = +String(st.sueldoInput || '').replace(/\D/g, '') || 0;
        return { sueldoEdit: false, profile: { ...st.profile, sueldo: v > 0 ? v : null } };
      }),
      cancelarSueldo: () => self.setState({ sueldoEdit: false }),
      quitarSueldo: () => self.setState(st => ({ sueldoEdit: false, profile: { ...st.profile, sueldo: null } })),
      gHayGastos: gMes.length > 0, gVacio: gMes.length === 0,
      gVacioTxt: mesActual ? 'Aún no hay gastos este mes. Anótalos con el atajo del iPhone o con el botón de abajo.' : 'No anotaste gastos en este mes.',
      gLista: gMes.map(mkLib),
      addGasto: () => {
        const id = Nube.uuid();
        self.setState(st => ({ finMes: 0, openLib: id, libs: [{ id, owner: me, contra: null, deudor: miNombre, prestamista: miNombre, monto: '0', mine: true,
          paid: false, nota: '', vence: '', enviada: false, gasto: true, cat: null, en: new Date().toISOString(), abonos: [] }].concat(st.libs) }));
        verGasto(id);
      },
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
      legend: [{ c: '#7FD3BC', t: '+1.5 sem' }, { c: MINT_D, t: '1 sem' }, { c: AMBER, t: '4 días' }, { c: RED, t: '≤2 días' }, { c: GREY, t: 'Sin urgencia' }].map(x => x),

      openModal: () => {
        const t0 = tiposDe(s.profile)[0];
        self.setState({ tipoEd: null, modal: { id: null, c: s.cuadernos[0] ? s.cuadernos[0].id : null, tipo: t0.nombre, urg: t0.urgencia, fecha: iso(s.year, s.month, s.selDay), asunto: [], tema: '', para: me, por: null } });
      },
      modalCuads: mCuads.concat([{ id: null, nombre: 'Sin cuaderno' }]).map(c => ({
        t: c.nombre, pick: () => self.setState(st => ({ modal: { ...st.modal, c: c.id } })),
        bg: m && m.c === c.id ? '#fff' : 'rgba(255,255,255,.05)',
        border: m && m.c === c.id ? '#fff' : 'rgba(255,255,255,.09)',
        fg: m && m.c === c.id ? '#090C14' : '#8E9AAE',
      })),
      modalSinCuads: !!m && mCuads.length === 0,
      modalSinCuadsTxt: mPara === me
        ? 'Aún no tienes cuadernos. Puedes crear uno en Estudio › Cuadernos.'
        : nombreDe(mPara) + ' no tiene cuadernos.',
      modalParaOn: !!(m && !m.id && !m.grupo && amigosOk.length),
      modalParaNombre: mPara === me ? 'Mí' : nombreDe(mPara),
      modalParaSub: mPara === me ? 'En tu agenda' : 'En su agenda',
      modalParaInicial: String((mPara === me ? miNombre : nombreDe(mPara)) || '?').charAt(0).toUpperCase(),
      modalParaColor: colorDe(mPara),
      modalElegirPara: () => self.abrirElegir('para'),
      modalDe: !m ? '' : (mGrupoNueva
        ? 'Para todos en «' + mGrupoNom + '»: aparecerá en la agenda de cada uno, también en la tuya.'
        : (mFijo
          ? 'La agendó ' + mCreador + ' para ' + (mGrupoNom ? '«' + mGrupoNom + '»' : 'el grupo') + '. Solo quien la creó cambia la fecha, el tipo y los temas; tú puedes moverla de cuaderno o quitarla de tu agenda.'
          : (mLote
            ? 'Es del grupo' + (mGrupoNom ? ' «' + mGrupoNom + '»' : '') + ': si cambias la fecha, el tipo o los temas, cambia para todos y les llega un aviso.'
            : (m.id
              ? (mPara !== me ? 'En la agenda de ' + nombreDe(mPara) + '.' : (m.por ? 'Te la asignó ' + nombreDe(m.por) + '.' : ''))
              : (mPara !== me ? 'Aparecerá en la agenda de ' + nombreDe(mPara) + '.' : ''))))),
      modalCuadNotaOn: mGrupoNueva,
      modalCuadNota: 'A cada uno le queda en su cuaderno con el mismo nombre, si tiene uno.',
      modalLibre: !mFijo, modalFijo: mFijo,
      modalFijoTipo: m ? m.tipo : '',
      modalFijoFecha: m ? fechaLarga(m.fecha) : '',
      modalFijoTemas: m ? (m.asunto.filter(t => t && t !== 'Sin temas').join(', ') || 'Sin temas') : '',
      modalBorrarTxt: mLote ? 'QUITAR DE MI AGENDA' : 'ELIMINAR ACTIVIDAD',
      closeModal: () => self.cerrarHoja('modal'),
      modalTitle: m && m.id ? 'Editar actividad' : 'Nueva actividad',
      modalCuaderno: m ? ((mCuads.find(c => c.id === m.c) || {}).nombre || '') : '',
      modalCta: mGrupoNueva ? (m.enviando ? 'Agendando…' : 'Agendar para el grupo') : (m && m.id ? 'Guardar' : 'Crear actividad'),
      modalEditing: !!(m && m.id),
      modalMonth: m ? MONTHS[+m.fecha.split('-')[1] - 1] + ' ' + m.fecha.split('-')[0] : '',
      modalCells: mCells, modalColor: mUrg.color, modalTint: mUrg.tint,
      modalUrgLabel: 'URGENCIA · ' + mUrg.label, modalUrgNote: urgNotes[mUrg.label] || '',
      modalTema: m ? m.tema : '', modalTemas: m ? m.asunto.map((t, i) => ({ t, remove: () => self.setState(st => ({ modal: { ...st.modal, asunto: st.modal.asunto.filter((_, k) => k !== i) } })) })) : [],
      onTema: ev => { const v = ev.target.value; self.setState(st => ({ modal: { ...st.modal, tema: v } })); },
      addTema: () => self.setState(st => st.modal.tema.trim() ? ({ modal: { ...st.modal, asunto: st.modal.asunto.concat([st.modal.tema.trim()]), tema: '' } }) : null),
      ...self.valsTipos(s),
      // Se guarda al instante; la hoja se va con su animación y luego se cierra.
      saveAct: () => {
        const mm0 = self.state.modal;
        if (mm0 && !mm0.id && mm0.grupo) { self.crearActividadGrupo(); return; }
        self.setState(st => {
          const mm = st.modal;
          if (mm.id) return { acts: st.acts.map(a => a.id === mm.id ? { ...a, c: mm.c, tipo: mm.tipo, urg: mm.urg !== false, fecha: mm.fecha, asunto: mm.asunto } : a) };
          const para = mm.para || me;
          return { acts: st.acts.concat([{ id: Nube.uuid(), c: mm.c, tipo: mm.tipo, urg: mm.urg !== false, fecha: mm.fecha, asunto: mm.asunto.length ? mm.asunto : ['Sin temas'],
                                            owner: para, por: para === me ? null : me, nota: '' }]) };
        });
        self.cerrarHoja('modal');
      },
      deleteAct: () => {
        const id = s.modal && s.modal.id;
        if (mLote && !window.confirm(mFijo
          ? '¿Quitarla de tu agenda? A los demás del grupo les seguirá apareciendo.'
          : '¿Quitarla de tu agenda? A los demás del grupo les seguirá apareciendo, y ya no podrás cambiarla para todos.')) return;
        self.setState(st => ({ acts: st.acts.filter(a => a.id !== id) }));
        self.cerrarHoja('modal');
      },

      libs: activeLibs.map(mkLib), paidLibs: paidL.map(mkLib),
      libsGAct: lgCobrar.concat(lgPagar).sort((a, b) => (a.l.en < b.l.en ? 1 : -1)).map(mkLG),
      libsGHist: lgSaldadas.map(x => ({
        titulo: x.l.nota || 'Libretica de grupo',
        meta: 'SALDADA · GRUPO ' + String(x.l.grupoNombre).toUpperCase(),
        montoTxt: pesosTxt(x.soyCreador ? x.l.total : x.mia.monto),
        abrir: () => self.abrirLibretaGrupo(x.l.id),
      })),
      hasPaid: paidL.length + lgSaldadas.length > 0, showHist: s.showHist,
      histLabel: '✓ ' + (paidL.length + lgSaldadas.length) + ' saldada' + (paidL.length + lgSaldadas.length === 1 ? '' : 's'),
      clearHistOn: paidL.some(l => libView(l).mia),
      histAction: s.showHist ? 'OCULTAR' : 'MOSTRAR',
      toggleHist: () => self.setState(st => ({ showHist: !st.showHist })),
      // Solo se borran las mías; las que otra persona compartió siguen siendo suyas.
      clearHistLabel: 'Eliminar historial · ' + paidL.filter(l => libView(l).mia).length,
      clearHist: () => self.setState(st => ({ libs: st.libs.filter(l => !l.paid || (l.owner && l.owner !== me)), showHist: false })),
      addLib: () => self.setState(st => ({ libs: [{ id: Nube.uuid(), owner: me, contra: null, deudor: 'Nombre del deudor', prestamista: miNombre,
                                                     monto: '0', mine: true, paid: false, nota: '', vence: '', enviada: false, abonos: [] }].concat(st.libs) })),

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
      dashSub: pendAll.length + ' pendientes académicos · ' + (activeLibs.length + lgCobrar.length + lgPagar.length) + ' libreticas activas',
      kpis: [
        { label: 'SERIES HOY', value: doneSets + '/' + totalSets, color: MINT, sub: day.abbr, border: 'rgba(87,185,160,.3)', go: () => self.setState({ tab: 'ejercicio' }) },
        { label: 'PENDIENTES', value: String(pendAll.length), color: '#fff', sub: nextA ? self.plazo(nextA.fecha) : 'AL DÍA', border: 'rgba(255,255,255,.07)', go: () => self.setState({ tab: 'estudio', estudioTab: 'agenda', openCuaderno: null }) },
        { label: 'POR COBRAR', value: '$' + fmtMoney(sumMine), color: MINT, sub: nCobrar + ' LIBRETICAS', border: 'rgba(87,185,160,.26)', go: () => self.setState({ tab: 'finanzas' }) },
        { label: 'POR PAGAR', value: '$' + fmtMoney(sumOwe), color: RED, sub: nPagar + ' LIBRETICAS', border: 'rgba(196,100,97,.26)', go: () => self.setState({ tab: 'finanzas' }) },
      ],
      urgentCount: urgent.length + ' ITEMS',
      urgent,
      bars,
      debtRows: [
        { label: 'Por cobrar', sub: nCobrar + ' libreticas · me deben', total: '$' + fmtMoney(sumMine), color: MINT, bg: 'rgba(46,204,113,.09)', border: 'rgba(87,185,160,.28)' },
        { label: 'Por pagar', sub: nPagar + ' libreticas · yo debo', total: '$' + fmtMoney(sumOwe), color: RED, bg: 'rgba(196,100,97,.08)', border: 'rgba(196,100,97,.28)' },
      ],

      pNombre: s.profile.nombre,
      onNombre: ev => { const v = ev.target.value; self.setState(st => ({ profile: { ...st.profile, nombre: v } })); },

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
      importarOn: !!s.importMsg || self.hayDatosLocales(),
      importarTxt: s.importMsg || 'Importar datos de este dispositivo',
      importarSub: s.importMsg ? 'Ya quedaron en tu cuenta.' : 'Sube a tu cuenta lo que esta app tenía guardado aquí antes de las cuentas. Hazlo una sola vez.',
      importar: () => { if (!s.importMsg) self.importarLocal(); },
      respaldoBtn: s.respaldo === 'preparando' ? 'Preparando respaldo…' : (s.respaldo === 'listo' ? 'Guardar respaldo' : 'Exportar mis datos'),
      respaldoColor: s.respaldo === 'error' ? RED : (s.respaldo === 'listo' ? MINT : '#fff'),
      respaldoSub: s.respaldoMsg || 'Descarga un archivo con todo lo tuyo (gimnasio, agenda, cuadernos, libreticas con abonos, chats y perfil). Guárdalo como respaldo.',
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
          fg: on ? PILAR_COLOR[key].c : '#8E9AAE', bg: on ? PILAR_COLOR[key].bg : 'transparent',
          border: on ? PILAR_COLOR[key].border : 'transparent',
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
