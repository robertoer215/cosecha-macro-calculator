// Tests de las funciones puras de calc.js — correr con: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { precio, mac, calcularMeta, metaManualComida, metaManualTotal, recomendarSize } from '../js/calc.js';
import { ING, FACT_ACTIVIDAD, FACT_OBJETIVO, FACT_MACRO, COSTOS_OPERATIVOS, MARGEN_DIVISOR } from '../js/data.js';

const OBJETIVOS = Object.keys(FACT_OBJETIVO);
const ACTIVIDADES = Object.keys(FACT_ACTIVIDAD);

// ---------- calcularMeta ----------

test('Mifflin-St Jeor: BMR de referencia calculado a mano', () => {
  // Hombre 75kg, 175cm, 25 años → BMR = 750 + 1093.75 − 125 + 5 = 1723.75
  // TDEE moderado = 1723.75 × 1.55 = 2671.8 → mantener = 2672 kcal
  const m = calcularMeta({ sexo: 'masculino', edad: 25, peso: 75, altura: 175, comidas: 1, objetivo: 'mantener', actividad: 'moderado' });
  const protTotal = Math.round(75 * FACT_MACRO.mantener.p); // 120
  const grasTotal = Math.round(75 * FACT_MACRO.mantener.g); // 68 (67.5 → 68)
  const carbTotal = Math.round((2672 - protTotal * 4 - grasTotal * 9) / 4);
  assert.equal(m.prot, protTotal);
  assert.equal(m.gras, grasTotal);
  assert.equal(m.carb, carbTotal);
});

test('las kcal mostradas SIEMPRE cuadran con 4P + 4C + 9G', () => {
  for (const sexo of ['masculino', 'femenino'])
  for (const edad of [15, 18, 30, 45, 60, 80])
  for (const peso of [40, 55, 75, 95, 120, 200])
  for (const altura of [140, 160, 175, 195, 220])
  for (const objetivo of OBJETIVOS)
  for (const actividad of ACTIVIDADES)
  for (const comidas of [2, 3, 4, 5]) {
    const m = calcularMeta({ sexo, edad, peso, altura, comidas, objetivo, actividad });
    assert.equal(m.kcal, m.prot * 4 + m.carb * 4 + m.gras * 9,
      `desajuste kcal en ${sexo} ${edad}a ${peso}kg ${altura}cm ${objetivo} ${actividad} ${comidas}c`);
  }
});

test('los carbohidratos NUNCA son negativos', () => {
  for (const sexo of ['masculino', 'femenino'])
  for (const edad of [15, 40, 60, 80])
  for (const peso of [40, 75, 120, 200])
  for (const altura of [140, 165, 190])
  for (const objetivo of OBJETIVOS)
  for (const actividad of ACTIVIDADES)
  for (const comidas of [2, 3, 4, 5]) {
    const m = calcularMeta({ sexo, edad, peso, altura, comidas, objetivo, actividad });
    assert.ok(m.carb >= 0, `carbos negativos (${m.carb}) en ${sexo} ${edad}a ${peso}kg ${altura}cm ${objetivo} ${actividad}`);
    assert.ok(m.prot >= 0 && m.gras >= 0 && m.kcal >= 0);
  }
});

test('perfil extremo activa el ajuste de carbos a 0 con aviso', () => {
  // Mujer 60a, 120kg, 150cm, sedentaria, perder grasa: prot+gras superan las kcal objetivo
  const m = calcularMeta({ sexo: 'femenino', edad: 60, peso: 120, altura: 150, comidas: 3, objetivo: 'perder_grasa', actividad: 'sedentario' });
  assert.equal(m.carb, 0);
  assert.equal(m.ajusteCarb, true);
});

test('ajusteCarb también se activa cuando la meta por comida redondea a 0 g', () => {
  // Perfil VÁLIDO del formulario: carbos brutos +2 g/día, entre 5 comidas → 0 g/comida
  const m = calcularMeta({ sexo: 'femenino', edad: 80, peso: 62, altura: 140, comidas: 5, objetivo: 'perder_grasa', actividad: 'sedentario' });
  assert.equal(m.carb, 0);
  assert.equal(m.ajusteCarb, true);
});

test('metaManualTotal deriva kcal de los macros por comida (el panel siempre cuadra)', () => {
  // Placeholders del formulario: antes el panel mostraba 667 kcal vs 666 de los macros
  const m = metaManualTotal({ protTotal: 150, carbTotal: 200, grasTotal: 65, comidas: 3 });
  assert.equal(m.prot, 50); assert.equal(m.carb, 67); assert.equal(m.gras, 22);
  assert.equal(m.kcal, m.prot * 4 + m.carb * 4 + m.gras * 9);
  // Entrada perfectamente consistente que antes desajustaba 8 kcal (213 vs 221)
  const c = metaManualTotal({ protTotal: 50, carbTotal: 50, grasTotal: 50, comidas: 4 });
  assert.equal(c.kcal, c.prot * 4 + c.carb * 4 + c.gras * 9);
});

test('metaManualComida acepta 0 g de carbohidratos (keto) y cuadra', () => {
  const m = metaManualComida({ prot: 150, carb: 0, gras: 70 });
  assert.equal(m.carb, 0);
  assert.equal(m.kcal, Math.round(150 * 4 + 0 * 4 + 70 * 9));
});

test('perfil normal NO activa el ajuste de carbos', () => {
  const m = calcularMeta({ sexo: 'masculino', edad: 25, peso: 75, altura: 175, comidas: 3, objetivo: 'ganar_musculo', actividad: 'moderado' });
  assert.equal(m.ajusteCarb, false);
  assert.ok(m.carb > 0);
});

// ---------- mac ----------

test('mac escala macros por factor de tamaño y redondea consistente', () => {
  const it = ING.find(i => i.id === 'C01'); // arroz: 38g carb
  assert.equal(mac(it, 1).carb, 38);
  assert.equal(mac(it, 0.5).carb, 19);
  assert.equal(mac(it, 1.5).carb, 57);
  // la suma de tamaños mostrados es exactamente la suma de las cartas
  assert.equal(mac(it, 0.5).carb + mac(it, 1).carb, 57);
  // grasas con 1 decimal
  const p = ING.find(i => i.id === 'P01'); // 3.5g grasa
  assert.equal(mac(p, 1.5).gras, 5.3); // 5.25 → 5.3
});

// ---------- precio ----------

test('precio respeta la fórmula ceil((pKg×g/1000)×1.40/0.85×factor)', () => {
  for (const it of ING) for (const f of [0.5, 1, 1.5]) {
    const esperado = Math.ceil((it.pKg * it.g / 1000) * COSTOS_OPERATIVOS / MARGEN_DIVISOR * f);
    assert.equal(precio(it, f), esperado, `precio incorrecto en ${it.id} ×${f}`);
  }
});

// ---------- recomendarSize ----------

test('recomendarSize devuelve solo tamaños válidos y no produce NaN con meta de carbos 0', () => {
  const metaCero = calcularMeta({ sexo: 'femenino', edad: 60, peso: 120, altura: 150, comidas: 3, objetivo: 'perder_grasa', actividad: 'sedentario' });
  for (const it of ING) {
    const s = recomendarSize(it, metaCero);
    assert.ok([0.5, 1, 1.5].includes(s), `tamaño inválido ${s} para ${it.id}`);
  }
});
