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
const sin = ((body.restricciones || {}).sin || []).map(x => String(x).toLowerCase().trim()).filter(Boolean);

return [{ json: {
  ok: err.length === 0,
  errores: err,
  meta, seleccion, sin,
  // id de pedido determinista por contenido + hora, sin Math.random
  pedido_id: 'PED-' + new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14) + '-' + ids.join(''),
  t0: Date.now(),
  recibido: body
}}];
