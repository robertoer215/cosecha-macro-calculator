// consultar_menu — lookup DETERMINISTA sobre el catálogo del día.
// No es RAG: los macros y los precios son tabla exacta, no texto parecido.
const d = $('Resolver plato').first().json;
let f = {};
try { f = typeof query === 'string' ? JSON.parse(query) : (query || {}); } catch (e) { f = {}; }
const filas = $('Leer catálogo').first().json.values || [];
const head = filas[0];
const cat = filas.slice(1).filter(r => r && r[0]).map(r => { const o = {}; head.forEach((h, i) => { o[h] = r[i]; }); return o; });
const sin = (f.sin || d.sin || []).map(x => String(x).toLowerCase());
const out = cat.filter(it => {
  if (f.categoria && it.categoria !== f.categoria) return false;
  if (String(it.disponible).toLowerCase() !== 'si') return false;
  if (sin.length && sin.some(a => String(it.alergenos).toLowerCase().includes(a))) return false;
  if (f.tag && !String(it.tags).toLowerCase().includes(String(f.tag).toLowerCase())) return false;
  if (f.id && it.id !== f.id) return false;
  return true;
});
return JSON.stringify({ encontrados: out.length, modulos: out,
  aviso_alergenos: 'alergenos derivados del nombre del plato, SIN verificar por cocina' });
