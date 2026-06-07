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
  const carbTotal = Math.round((calT - (protTotal * 4) - (grasTotal * 9)) / 4);
  return {
    kcal: Math.round(calT / comidas),
    prot: Math.round(protTotal / comidas),
    carb: Math.round(carbTotal / comidas),
    gras: Math.round(grasTotal / comidas),
    comidas, objetivo, actividad, peso
  };
}
