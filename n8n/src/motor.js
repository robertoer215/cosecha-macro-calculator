// ══ MOTOR DETERMINISTA — réplica exacta de js/calc.js de la app ══
// Ni un número de aquí sale de un modelo de lenguaje. Si esto y la app
// discrepan, es un bug que hay que ver, no un redondeo que tolerar.
// Tope de porciones por categoría: réplica de MAX_PORCIONES de data.js. A partir
// de 2 el módulo se repite ("3 porciones" = tres raciones Estándar).
const MAX_PORCIONES = { proteina: 3, carbohidrato: 4, vegetal: 2, grasa: 2 };
const TODOS = [0.5, 1, 1.5, 2, 3, 4];
function tamanosPermitidos(it) { const tope = MAX_PORCIONES[it.categoria] ?? 1.5; return TODOS.filter(k => k <= tope); }
const ETIQUETA = { 0.5: 'Pequeña', 1: 'Estándar', 1.5: 'Grande', 2: '2 porciones', 3: '3 porciones', 4: '4 porciones' };
const PESO_MACRO = { prot: 2, carb: 1, gras: 1 };
const UMBRAL_G = 4;

// mac(): mismo redondeo que la app. La grasa a 1 decimal, el resto entero.
function mac(it, f) {
  return {
    kcal: Math.round(it.kcal * f),
    prot: Math.round(it.prot * f),
    carb: Math.round(it.carb * f),
    gras: Math.round(it.gras * f * 10) / 10,
    g:    Math.round(it.g * f)
  };
}
// El precio sale del catálogo por tamaño, no de una fórmula: el catálogo es la
// fuente única y sus precios pueden haberse editado a mano.
function precioDe(it, f) {
  // A partir de 2 porciones cada una cuesta lo que la Estándar: misma regla que la app.
  if (f >= 2) return f * it.precio_estandar;
  return f === 0.5 ? it.precio_pequena : f === 1.5 ? it.precio_grande : it.precio_estandar;
}

function porcionar(items, meta, opts) {
  opts = opts || {};
  if (!items || !items.length) return null;
  const den = k => Math.max(meta[k] || 0, 1);
  const fijos = opts.fijos || {};
  const dominios = items.map(it => (fijos[it.id] != null ? [fijos[it.id]] : tamanosPermitidos(it)));
  const total = dominios.reduce((a, d) => a * d.length, 1);
  let mejor = null;
  for (let combo = 0; combo < total; combo++) {
    const factores = new Array(items.length);
    let resto = combo;
    for (let i = 0; i < items.length; i++) {
      const d = dominios[i];
      factores[i] = d[resto % d.length];
      resto = Math.floor(resto / d.length);
    }
    let prot = 0, carb = 0, gras = 0, kcal = 0, pr = 0;
    for (let i = 0; i < items.length; i++) {
      const m = mac(items[i], factores[i]);
      prot += m.prot; carb += m.carb; gras += m.gras; kcal += m.kcal;
      pr += precioDe(items[i], factores[i]);
    }
    gras = Math.round(gras * 10) / 10;
    const desviacion = { prot: prot - meta.prot, carb: carb - meta.carb, gras: gras - meta.gras };
    const coste = PESO_MACRO.prot * Math.abs(desviacion.prot) / den('prot')
                + PESO_MACRO.carb * Math.abs(desviacion.carb) / den('carb')
                + PESO_MACRO.gras * Math.abs(desviacion.gras) / den('gras');
    const mejora = !mejor || coste < mejor.coste - 1e-9
      || (Math.abs(coste - mejor.coste) < 1e-9 && pr < mejor.precio);
    if (mejora) mejor = { coste, precio: pr, factores, macros: { kcal, prot, carb, gras }, desviacion };
  }
  const tamanos = {};
  items.forEach((it, i) => { tamanos[it.id] = mejor.factores[i]; });
  return {
    tamanos, macros: mejor.macros, desviacion: mejor.desviacion,
    precio: mejor.precio, coste: mejor.coste,
    dentroDeUmbral: Math.abs(mejor.desviacion.prot) <= UMBRAL_G
                 && Math.abs(mejor.desviacion.carb) <= UMBRAL_G
                 && Math.abs(mejor.desviacion.gras) <= UMBRAL_G,
    combinacionesEvaluadas: total
  };
}

function proponerCierre(items, meta, candidatos, opts) {
  const base = items && items.length ? porcionar(items, meta, opts) : null;
  if (base && base.dentroDeUmbral) return null;
  if (!candidatos || !candidatos.length) return null;
  const yaEsta = {}; (items || []).forEach(i => { yaEsta[i.id] = true; });
  let mejor = null;
  for (const c of candidatos) {
    if (yaEsta[c.id]) continue;
    const r = porcionar([...(items || []), c], meta, opts);
    if (!mejor || r.coste < mejor.r.coste - 1e-9) mejor = { c, r };
  }
  if (!mejor) return null;
  if (base && mejor.r.coste >= base.coste - 1e-9) return null;
  const tamano = mejor.r.tamanos[mejor.c.id];
  const aporta = mac(mejor.c, tamano);
  let macro = 'carb', ganancia = -Infinity;
  if (base) for (const k of ['prot', 'carb', 'gras']) {
    const g = Math.abs(base.desviacion[k]) - Math.abs(mejor.r.desviacion[k]);
    if (g > ganancia) { ganancia = g; macro = k; }
  }
  return {
    id: mejor.c.id, nombre: mejor.c.nombre, categoria: mejor.c.categoria,
    tamano: ETIQUETA[tamano], g: aporta.g, aporta,
    macro_que_cierra: macro,
    precio_extra: base ? mejor.r.precio - base.precio : mejor.r.precio,
    precio_total_con_propuesta: mejor.r.precio,
    // Los totales que quedarían al aceptar, ya calculados: sin esto el modelo
    // los sumaba de cabeza (64 + 48 = 112) y el auditor le tumbaba el texto.
    macros_resultantes: mejor.r.macros,
    desviacion_resultante: mejor.r.desviacion,
    dentro_de_umbral: mejor.r.dentroDeUmbral
  };
}
