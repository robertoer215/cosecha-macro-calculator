import { FACT_ACTIVIDAD, FACT_OBJETIVO, FACT_MACRO, COSTOS_OPERATIVOS, MARGEN_DIVISOR } from './data.js';
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
