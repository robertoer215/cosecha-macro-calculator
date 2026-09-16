// ══ MOTOR DETERMINISTA — réplica exacta de js/calc.js de la app ══
// Ni un número de aquí sale de un modelo de lenguaje. Si esto y la app
// discrepan, es un bug que hay que ver, no un redondeo que tolerar.
// Tope de porciones por categoría: réplica de MAX_PORCIONES de data.js. A partir
// de 2 el módulo se repite ("3 porciones" = tres raciones Estándar).
const MAX_PORCIONES = { proteina: 3, carbohidrato: 4, vegetal: 2, grasa: 2 };
const MAX_MODULOS_CAT = 2;
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
  const wp = PESO_MACRO.prot / den('prot'), wc = PESO_MACRO.carb / den('carb'), wg = PESO_MACRO.gras / den('gras');
  const fijos = opts.fijos || {};
  const opciones = items.map(it => (fijos[it.id] != null ? [fijos[it.id]] : tamanosPermitidos(it)).map(f => {
    const m = mac(it, f);
    return { f, prot: m.prot, carb: m.carb, gras10: Math.round(m.gras * 10), kcal: m.kcal, precio: precioDe(it, f) };
  }));
  const total = opciones.reduce((a, d) => a * d.length, 1);
  // Encuentro en el medio: réplica exacta de js/calc.js. Mismo espacio de búsqueda,
  // mismo óptimo; con ocho módulos 1,7 M de cruces en milisegundos, donde la
  // enumeración plana tumbaba el task runner de n8n (>30 s) con el mismo plato.
  const enumerar = doms => {
    let acc = [{ prot: 0, carb: 0, gras10: 0, kcal: 0, precio: 0, fs: [] }];
    for (const dom of doms) {
      const sig = [];
      for (const a of acc) for (const o of dom)
        sig.push({ prot: a.prot + o.prot, carb: a.carb + o.carb, gras10: a.gras10 + o.gras10,
                   kcal: a.kcal + o.kcal, precio: a.precio + o.precio, fs: a.fs.concat(o.f) });
      acc = sig;
    }
    return acc;
  };
  const corte = Math.ceil(opciones.length / 2);
  const A = enumerar(opciones.slice(0, corte)), B = enumerar(opciones.slice(corte));
  let mejorCoste = Infinity, mejorPrecio = Infinity, ia = -1, ib = -1;
  for (let i = 0; i < A.length; i++) {
    const a = A[i]; const pa = a.prot - meta.prot, ca = a.carb - meta.carb;
    for (let j = 0; j < B.length; j++) {
      const b = B[j];
      const dp = pa + b.prot, dc = ca + b.carb, dg = (a.gras10 + b.gras10) / 10 - meta.gras;
      const coste = wp * (dp < 0 ? -dp : dp) + wc * (dc < 0 ? -dc : dc) + wg * (dg < 0 ? -dg : dg);
      if (coste < mejorCoste - 1e-9 || (coste - mejorCoste < 1e-9 && coste - mejorCoste > -1e-9 && a.precio + b.precio < mejorPrecio)) {
        mejorCoste = coste; mejorPrecio = a.precio + b.precio; ia = i; ib = j;
      }
    }
  }
  const a = A[ia], b = B[ib];
  const factores = a.fs.concat(b.fs);
  const gras = (a.gras10 + b.gras10) / 10;
  const macros = { kcal: a.kcal + b.kcal, prot: a.prot + b.prot, carb: a.carb + b.carb, gras };
  const desviacion = { prot: macros.prot - meta.prot, carb: macros.carb - meta.carb, gras: gras - meta.gras };
  const tamanos = {};
  items.forEach((it, i) => { tamanos[it.id] = factores[i]; });
  return {
    tamanos, macros, desviacion, precio: mejorPrecio, coste: mejorCoste,
    dentroDeUmbral: Math.abs(desviacion.prot) <= UMBRAL_G && Math.abs(desviacion.carb) <= UMBRAL_G && Math.abs(desviacion.gras) <= UMBRAL_G,
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
    // Tamaños de TODAS las líneas si se acepta: si aceptar reajusta otra línea, el
    // agente lo dice con este dato en vez de inventarse un mecanismo.
    tamanos_resultantes: Object.fromEntries(Object.entries(mejor.r.tamanos).map(([id, f]) => [id, ETIQUETA[f]])),
    // Los totales que quedarían al aceptar, ya calculados: sin esto el modelo
    // los sumaba de cabeza (64 + 48 = 112) y el auditor le tumbaba el texto.
    macros_resultantes: mejor.r.macros,
    desviacion_resultante: mejor.r.desviacion,
    dentro_de_umbral: mejor.r.dentroDeUmbral
  };
}
