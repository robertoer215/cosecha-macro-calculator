// ══ VALIDACIÓN DE ENTRADA ══
// Guardrail: lo que entra por un webhook público no se toca sin comprobarlo.
const body = $input.first().json.body || $input.first().json || {};
const err = [];
const m = body.macros_objetivo || {};
const num = (v, k, min, max) => {
  const n = Number(v);
  if (!Number.isFinite(n)) { err.push(`${k}: no es un número`); return 0; }
  if (n < min || n > max) { err.push(`${k}: ${n} fuera de rango [${min}, ${max}]`); return 0; }
  return n;
};
const meta = {
  kcal: m.kcal == null ? null : num(m.kcal, 'kcal', 0, 5000),
  prot: num(m.prot, 'prot', 0, 400),
  carb: num(m.carb, 'carb', 0, 800),
  gras: num(m.gras, 'gras', 0, 300)
};
const sel = Array.isArray(body.seleccion) ? body.seleccion : [];
if (!sel.length) err.push('seleccion: hace falta al menos un módulo');
if (sel.length > 8) err.push(`seleccion: ${sel.length} módulos, el máximo es 8`);
const seleccion = sel.map((s, i) => {
  if (!s || typeof s.id !== 'string' || !/^[A-Z]\d{2}$/.test(s.id)) { err.push(`seleccion[${i}].id inválido`); return null; }
  // El tamaño es OPCIONAL: si viene, se clava; si no, lo resuelve el porcionador.
  let t = s.tamano;
  if (t != null && ![0.5, 1, 1.5, 2, 3, 4].includes(Number(t))) { err.push(`seleccion[${i}].tamano ${t}: debe ser 0.5, 1, 1.5, 2, 3 o 4`); return null; }
  return { id: s.id, tamano: t == null ? null : Number(t) };
}).filter(Boolean);
const ids = seleccion.map(s => s.id);
if (new Set(ids).size !== ids.length) err.push('seleccion: hay ids repetidos');
// Tope de módulos DISTINTOS por categoría (la letra del id): con porciones múltiples
// un segundo módulo cubre cualquier meta y un tercero solo dispara la búsqueda.
const porCat = {};
ids.forEach(i => { porCat[i[0]] = (porCat[i[0]] || 0) + 1; });
const CAT = { P: 'proteína', C: 'carbohidrato', V: 'vegetal', G: 'grasa' };
Object.entries(porCat).forEach(([c, n]) => { if (n > 2) err.push(`seleccion: ${n} módulos de ${CAT[c] || c}; el máximo son 2 por categoría`); });
const sin = ((body.restricciones || {}).sin || []).map(x => String(x).toLowerCase().trim()).filter(Boolean);

// ── de dónde sale la meta ──
// Los macros llegan SIEMPRE por comida; lo que cambia es quién los puso: la
// fórmula con el perfil del cliente, o el cliente mismo (por comida o para todo
// el día repartido en `comidas`). Opcionales: sin ellos se asume la fórmula, que
// es lo que mandaba la app antes de este campo.
const ORIGENES = ['formula', 'manual_comida', 'manual_dia'];
let metaOrigen = 'formula';
if (body.meta_origen != null) {
  if (typeof body.meta_origen !== 'string' || !ORIGENES.includes(body.meta_origen)) err.push(`meta_origen: debe ser ${ORIGENES.join(', ')}`);
  else metaOrigen = body.meta_origen;
}
let comidas = null;
if (body.comidas != null) {
  const c = Number(body.comidas);
  if (!Number.isInteger(c) || c < 1 || c > 8) err.push('comidas: debe ser un entero entre 1 y 8');
  else comidas = c;
}

// ── el upsell: la app REPITE la llamada al aceptar la propuesta de cierre ──
// Dos campos opcionales, pero si vienen se comprueban: el flag tiene que ser un
// booleano de verdad (ni "true" ni 1) y el pedido previo, un id con la forma que
// emite este mismo flujo. Con el flag en true el pedido previo es obligatorio:
// un upsell sin pedido al que responder no se puede registrar.
const upsellAceptado = body.upsell_aceptado === true;
if (body.upsell_aceptado != null && typeof body.upsell_aceptado !== 'boolean') err.push('upsell_aceptado: debe ser true o false');
// Solo texto: String([...]) convertiría un array con un id válido en un id válido.
// La forma es EXACTA, la que emite este flujo: fecha de 14 dígitos y de 1 a 8 ids
// de módulo (letra + dos dígitos), sin sufijo vacío ni ids inventados.
let pedidoPrevio = '';
if (body.pedido_id_previo != null) {
  if (typeof body.pedido_id_previo !== 'string') err.push('pedido_id_previo: debe ser texto');
  else pedidoPrevio = body.pedido_id_previo.trim();
}
if (pedidoPrevio && !/^PED-\d{14}-(?:[A-Z]\d{2}){1,8}$/.test(pedidoPrevio)) err.push('pedido_id_previo: no tiene la forma PED-AAAAMMDDhhmmss-ids');
if (upsellAceptado && !pedidoPrevio) err.push('pedido_id_previo: obligatorio cuando upsell_aceptado es true');

return [{ json: {
  ok: err.length === 0,
  errores: err,
  meta, seleccion, sin,
  meta_origen: metaOrigen,
  comidas,
  upsell_aceptado: upsellAceptado,
  pedido_id_previo: pedidoPrevio,
  // id de pedido determinista por contenido + hora, sin Math.random
  pedido_id: 'PED-' + new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14) + '-' + ids.join(''),
  t0: Date.now(),
  recibido: body
}}];
