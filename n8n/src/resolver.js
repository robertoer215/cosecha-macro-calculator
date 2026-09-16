// ══ RESOLUCIÓN DETERMINISTA DEL PLATO ══
// Aquí se produce TODO lo numérico de la respuesta. El agente no escribe ni un
// dígito: solo redacta, y el nodo de verificación comprueba que no se inventó
// ninguna cifra. Es lo que hace el sistema defendible.
const v = $('Validar entrada').first().json;
if (!v.ok) return [{ json: { ...v, abortar: true } }];

// ── el catálogo, tal como vino del Sheets (fuente única de verdad) ──
const filas = $('Leer catálogo').first().json.values || [];
const head = filas[0];
const catalogo = filas.slice(1).filter(r => r && r[0]).map(r => {
  const o = {}; head.forEach((h, i) => { o[h] = r[i]; });
  return {
    id: o.id, nombre: o.nombre, categoria: o.categoria,
    g: Number(o.g_estandar), kcal: Number(o.kcal),
    prot: Number(o.prot), carb: Number(o.carb), gras: Number(o.gras),
    precio_pequena: Number(o.precio_pequena), precio_estandar: Number(o.precio_estandar), precio_grande: Number(o.precio_grande),
    alergenos: String(o.alergenos || '').toLowerCase(),
    alergenos_fuente: o.alergenos_fuente || '',
    tags: String(o.tags || '').toLowerCase(),
    disponible: String(o.disponible || 'si').toLowerCase() === 'si'
  };
});
__MOTOR__

// ── consultar_menu: lookup determinista con filtros duros ──
function consultarMenu(f) {
  f = f || {};
  return catalogo.filter(it => {
    if (f.categoria && it.categoria !== f.categoria) return false;
    if (f.solo_disponibles !== false && !it.disponible) return false;
    if (f.sin && f.sin.length && f.sin.some(a => it.alergenos.includes(a))) return false;
    if (f.tag && !it.tags.includes(f.tag)) return false;
    return true;
  });
}

const porId = id => catalogo.find(c => c.id === id);
const avisos = [];

// ── los módulos pedidos, con los filtros duros aplicados ──
const items = [], fijos = {}, rechazados = [];
for (const s of v.seleccion) {
  const it = porId(s.id);
  if (!it) { rechazados.push({ id: s.id, motivo: 'no existe en el catálogo' }); continue; }
  if (!it.disponible) { rechazados.push({ id: s.id, nombre: it.nombre, motivo: 'no disponible hoy' }); continue; }
  const choca = v.sin.filter(a => it.alergenos.includes(a));
  if (choca.length) { rechazados.push({ id: s.id, nombre: it.nombre, motivo: `contiene ${choca.join(', ')}` }); continue; }
  // Un tamaño por encima del tope de su categoría no se clava en silencio: se rechaza
  // con su motivo, y el módulo entra libre para que el porcionador lo resuelva.
  if (s.tamano != null && !tamanosPermitidos(it).includes(s.tamano)) {
    rechazados.push({ id: s.id, nombre: it.nombre, motivo: `tamaño ${s.tamano} supera el tope de ${MAX_PORCIONES[it.categoria]} porciones para ${it.categoria}; se resolvió automáticamente` });
    items.push(it);
    continue;
  }
  items.push(it);
  if (s.tamano != null) fijos[it.id] = s.tamano;
}
if (v.sin.length) {
  avisos.push('Los alérgenos del catálogo están derivados del nombre del plato y NO han sido verificados por cocina: no uses esta respuesta como garantía alérgica.');
}

if (!items.length) {
  return [{ json: { ...v, abortar: true, errores: ['ningún módulo de la selección es utilizable'], rechazados, avisos } }];
}

// ── porcionar: recalcula y CONFIRMA lo que la app ya resolvió ──
const r = porcionar(items, v.meta, { fijos });
const ETQ = ETIQUETA;

// ── armar_ticket: aplica los precios del catálogo y totaliza ──
const lineas = items.map(it => {
  const f = r.tamanos[it.id];
  const m = mac(it, f);
  return { id: it.id, nombre: it.nombre, categoria: it.categoria, tamano: ETQ[f], g: m.g,
           macros: { kcal: m.kcal, prot: m.prot, carb: m.carb, gras: m.gras },
           precio: precioDe(it, f) };
});

// ── calculadora: verifica la suma antes de cerrar ──
const suma = lineas.reduce((a, l) => ({
  kcal: a.kcal + l.macros.kcal, prot: a.prot + l.macros.prot,
  carb: a.carb + l.macros.carb, gras: Math.round((a.gras + l.macros.gras) * 10) / 10,
  total: a.total + l.precio
}), { kcal: 0, prot: 0, carb: 0, gras: 0, total: 0 });

const cuadra = suma.kcal === r.macros.kcal && suma.prot === r.macros.prot
            && suma.carb === r.macros.carb && Math.abs(suma.gras - r.macros.gras) < 1e-9
            && suma.total === r.precio;
if (!cuadra) avisos.push('DISCREPANCIA: la suma de las líneas no cuadra con el porcionado. Gana la suma de las líneas.');

// ── propuesta de cierre: el error, el valor percibido y el upsell, a la vez ──
let propuesta = null;
if (!r.dentroDeUmbral) {
  const candidatos = consultarMenu({ sin: v.sin }).filter(c => !items.some(i => i.id === c.id));
  propuesta = proponerCierre(items, v.meta, candidatos, { fijos });
}

const numeros = {};
lineas.forEach(l => { numeros[l.id] = { g: l.g, precio: l.precio, ...l.macros }; });

return [{ json: {
  ...v, abortar: false, rechazados, avisos,
  lineas,
  macros_totales: { kcal: suma.kcal, prot: suma.prot, carb: suma.carb, gras: suma.gras },
  desviacion: r.desviacion,
  dentro_de_umbral: r.dentroDeUmbral,
  total: suma.total,
  propuesta_cierre: propuesta,
  combinaciones_evaluadas: r.combinacionesEvaluadas,
  suma_cuadra: cuadra,
  catalogo_filas: catalogo.length,
  // universo de cifras legítimas: la verificación comprobará contra esto
  numeros_permitidos: numeros
}}];
