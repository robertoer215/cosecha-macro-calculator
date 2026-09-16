import { FACT_ACTIVIDAD, FACT_OBJETIVO, FACT_MACRO, COSTOS_OPERATIVOS, MARGEN_DIVISOR, SIZES } from './data.js';
export function precio(it, f = 1) {
  return Math.ceil((it.pKg * it.g / 1000) * COSTOS_OPERATIVOS / MARGEN_DIVISOR * f);
}
export function mac(it, f = 1) {
  return {
    kcal: Math.round(it.kcal * f),
    prot: Math.round(it.prot * f),
    carb: Math.round(it.carb * f),
    gras: Math.round(it.gras * f * 10) / 10,
    g:    Math.round(it.g * f)
  };
}
export function recomendarSize(it, meta) {
  const SIZES = [0.5, 1, 1.5];
  let factor;
  if (it.cat === 'proteina')     factor = meta.prot / it.prot;
  else if (it.cat === 'carbohidrato') factor = meta.carb / it.carb;
  else if (it.cat === 'grasa')   factor = meta.gras / it.gras;
  else                           factor = 1;
  factor = Math.max(0.5, Math.min(1.5, factor));
  return SIZES.reduce((prev, curr) =>
    Math.abs(curr - factor) < Math.abs(prev - factor) ? curr : prev
  );
}

export function calcularMeta({ sexo, edad, peso, altura, comidas, objetivo, actividad }) {
  const bmr = sexo === 'masculino'
    ? (10 * peso) + (6.25 * altura) - (5 * edad) + 5
    : (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
  const tdee = bmr * FACT_ACTIVIDAD[actividad];
  const calT = Math.round(tdee * (1 + FACT_OBJETIVO[objetivo]));
  const fm = FACT_MACRO[objetivo];
  const protTotal = Math.round(peso * fm.p);
  const grasTotal = Math.round(peso * fm.g);
  // Carbos = kcal restantes tras proteína y grasa; nunca negativos.
  const carbBrutos = Math.round((calT - (protTotal * 4) - (grasTotal * 9)) / 4);
  const carbTotal = Math.max(0, carbBrutos);
  const prot = Math.round(protTotal / comidas);
  const carb = Math.round(carbTotal / comidas);
  const gras = Math.round(grasTotal / comidas);
  return {
    // kcal derivadas de los macros por comida ya redondeados:
    // así 4·prot + 4·carb + 9·gras === kcal siempre cuadra en pantalla.
    kcal: prot * 4 + carb * 4 + gras * 9,
    prot, carb, gras,
    // aviso tanto si los carbos brutos eran negativos como si la meta por comida quedó en 0 g
    ajusteCarb: carbBrutos < 0 || carb === 0,
    comidas, objetivo, actividad, peso
  };
}

export function metaManualComida({ prot, carb, gras }) {
  return { kcal: Math.round(prot * 4 + carb * 4 + gras * 9), prot, carb, gras, comidas: 1, objetivo: 'manual', actividad: 'manual', peso: 0 };
}

export function metaManualTotal({ protTotal, carbTotal, grasTotal, comidas }) {
  const prot = Math.round(protTotal / comidas);
  const carb = Math.round(carbTotal / comidas);
  const gras = Math.round(grasTotal / comidas);
  // Igual que calcularMeta: kcal derivadas de los macros por comida ya redondeados,
  // para que el panel siempre cuadre aunque las kcal tecleadas no coincidan con los macros.
  return { kcal: prot * 4 + carb * 4 + gras * 9, prot, carb, gras, comidas, objetivo: 'manual', actividad: 'manual', peso: 0 };
}

// ─────────────────────────────────────────────────────────────────────────────
// MODO IA — porcionado conjunto
//
// Sustituye a recomendarSize() para el modo en que el usuario elige QUÉ comer y
// el sistema decide CUÁNTO. recomendarSize mira cada módulo en aislamiento y
// contra un solo macro, así que ignora las contribuciones cruzadas: el guacamole
// aporta carbohidratos, el pollo aporta grasa, los esquites aportan proteína.
// porcionar() recorre TODAS las combinaciones de tamaños de los módulos elegidos
// y devuelve la que menos se desvía de los tres macros a la vez.
//
// Coste: 3^n combinaciones. Con la plantilla de plato (1 proteína + 1 carbo +
// 1-2 vegetales + 1 grasa) son 81 o 243: microsegundos. Es búsqueda exhaustiva,
// así que el resultado es el óptimo global, no una aproximación.
// ─────────────────────────────────────────────────────────────────────────────

// Los tres tamaños salen de SIZES en data.js: una sola fuente de verdad.
const FACTORES = SIZES.map(s => s.k);

// La proteína pesa el doble que carbohidrato y grasa: es la condición de compra
// que la investigación cualitativa situó como no negociable.
export const PESO_MACRO = { prot: 2, carb: 1, gras: 1 };

// El mismo ±4 g por macro que ya usa el resumen para pintar "En tu meta".
export const UMBRAL_G = 4;

export function porcionar(items, meta) {
  if (!items || !items.length) return null;
  // Meta 0 (pasa con los carbos en déficit agresivo): evita dividir entre cero
  // sin distorsionar el peso relativo de los demás macros.
  const den = k => Math.max(meta[k] || 0, 1);
  const n = items.length;
  const total = FACTORES.length ** n;
  let mejor = null;

  for (let combo = 0; combo < total; combo++) {
    const factores = new Array(n);
    let resto = combo;
    for (let i = 0; i < n; i++) {
      factores[i] = FACTORES[resto % FACTORES.length];
      resto = Math.floor(resto / FACTORES.length);
    }
    let prot = 0, carb = 0, gras = 0, kcal = 0, pr = 0;
    for (let i = 0; i < n; i++) {
      // mac() redondea: sumamos lo MISMO que la app enseña en pantalla, así la
      // barra de macros y el resultado del porcionador nunca se contradicen.
      const m = mac(items[i], factores[i]);
      prot += m.prot; carb += m.carb; gras += m.gras; kcal += m.kcal;
      pr += precio(items[i], factores[i]);
    }
    gras = Math.round(gras * 10) / 10;
    const desviacion = { prot: prot - meta.prot, carb: carb - meta.carb, gras: gras - meta.gras };
    const coste = PESO_MACRO.prot * Math.abs(desviacion.prot) / den('prot')
                + PESO_MACRO.carb * Math.abs(desviacion.carb) / den('carb')
                + PESO_MACRO.gras * Math.abs(desviacion.gras) / den('gras');
    // Desempate: a igual ajuste nutricional, el plato más barato.
    const mejora = !mejor
      || coste < mejor.coste - 1e-9
      || (Math.abs(coste - mejor.coste) < 1e-9 && pr < mejor.precio);
    if (mejora) mejor = { coste, precio: pr, factores, macros: { kcal, prot, carb, gras }, desviacion };
  }

  const tamanos = {};
  items.forEach((it, i) => { tamanos[it.id] = mejor.factores[i]; });
  return {
    tamanos,
    macros: mejor.macros,
    desviacion: mejor.desviacion,
    precio: mejor.precio,
    coste: mejor.coste,
    dentroDeUmbral: Math.abs(mejor.desviacion.prot) <= UMBRAL_G
                 && Math.abs(mejor.desviacion.carb) <= UMBRAL_G
                 && Math.abs(mejor.desviacion.gras) <= UMBRAL_G,
    combinacionesEvaluadas: total
  };
}
