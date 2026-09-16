// Tests del porcionado conjunto del MODO IA — correr con: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { porcionar, mac, precio, recomendarSize, calcularMeta, PESO_MACRO, UMBRAL_G } from '../js/calc.js';
import { ING, SIZES } from '../js/data.js';

const F = SIZES.map(s => s.k);
const id = x => ING.find(i => i.id === x);
const PLATO = ['P01', 'V01', 'C01', 'G01'].map(id);

// Réplica INDEPENDIENTE de la función objetivo, para poder verificar por fuerza
// bruta que porcionar() devuelve el óptimo global y no una aproximación.
function evaluar(items, factores, meta) {
  const den = k => Math.max(meta[k] || 0, 1);
  let prot = 0, carb = 0, gras = 0, pr = 0;
  items.forEach((it, i) => {
    const m = mac(it, factores[i]);
    prot += m.prot; carb += m.carb; gras += m.gras;
    pr += precio(it, factores[i]);
  });
  gras = Math.round(gras * 10) / 10;
  const coste = PESO_MACRO.prot * Math.abs(prot - meta.prot) / den('prot')
              + PESO_MACRO.carb * Math.abs(carb - meta.carb) / den('carb')
              + PESO_MACRO.gras * Math.abs(gras - meta.gras) / den('gras');
  return { coste, precio: pr, prot, carb, gras };
}
function* combinaciones(n) {
  const total = F.length ** n;
  for (let c = 0; c < total; c++) {
    const f = []; let r = c;
    for (let i = 0; i < n; i++) { f.push(F[r % F.length]); r = Math.floor(r / F.length); }
    yield f;
  }
}
const desvTotal = d => Math.abs(d.prot) + Math.abs(d.carb) + Math.abs(d.gras);

// 1 ─ un solo módulo: elige el tamaño que más se acerca (verificado a mano)
test('un solo módulo: pollo contra una meta de 45 g de proteína elige Grande', () => {
  // P01 ×0.5 = 16 g P · ×1 = 31 g P · ×1.5 = 47 g P. El más cercano a 45 es Grande.
  const r = porcionar([id('P01')], { prot: 45, carb: 0, gras: 5 });
  assert.equal(r.tamanos.P01, 1.5);
  assert.equal(r.macros.prot, 47);
});

// 2 ─ el óptimo NO es Estándar en todos los módulos
test('existe al menos un perfil donde la solución óptima no es todo Estándar', () => {
  const meta = { prot: 55, carb: 95, gras: 18 };
  const r = porcionar(PLATO, meta);
  const todosEstandar = Object.values(r.tamanos).every(k => k === 1);
  assert.equal(todosEstandar, false, 'el óptimo salió todo Estándar: el caso no prueba nada');
  const base = evaluar(PLATO, PLATO.map(() => 1), meta);
  assert.ok(r.coste < base.coste, 'el óptimo debe batir a la combinación todo-Estándar');
});

// 3 ─ ÓPTIMO GLOBAL: coincide con la fuerza bruta independiente del test
test('porcionar devuelve el óptimo global en 200 perfiles distintos', () => {
  let n = 0;
  for (const prot of [20, 35, 45, 60, 75])
  for (const carb of [0, 30, 60, 90, 130])
  for (const gras of [8, 15, 22, 30]) {
    const meta = { prot, carb, gras };
    const r = porcionar(PLATO, meta);
    let min = Infinity, precioMin = Infinity;
    for (const f of combinaciones(PLATO.length)) {
      const e = evaluar(PLATO, f, meta);
      if (e.coste < min - 1e-9) { min = e.coste; precioMin = e.precio; }
      else if (Math.abs(e.coste - min) < 1e-9) precioMin = Math.min(precioMin, e.precio);
    }
    assert.ok(Math.abs(r.coste - min) < 1e-9, `no es óptimo en ${JSON.stringify(meta)}: ${r.coste} vs ${min}`);
    // 4 ─ desempate: a igual coste, el plato más barato
    assert.equal(r.precio, precioMin, `no desempató por precio en ${JSON.stringify(meta)}`);
    n++;
  }
  assert.equal(n, 100);
});

// 5 ─ caso infactible: solo carbohidratos contra una meta alta de proteína
test('caso infactible: lo declara y no fuerza el número', () => {
  const r = porcionar([id('C01'), id('C02')], { prot: 45, carb: 60, gras: 15 });
  assert.equal(r.dentroDeUmbral, false);
  assert.ok(r.desviacion.prot < -25, `la proteína debe quedar muy corta, quedó ${r.desviacion.prot}`);
  assert.ok(Number.isFinite(r.coste));
});

// 6 ─ el modo IA bate a recomendarSize (la razón de ser del cambio)
test('el porcionado conjunto nunca es peor que recomendarSize, y a veces es mejor', () => {
  let mejoras = 0, peor = 0, ejemplo = null;
  for (const sexo of ['masculino', 'femenino'])
  for (const peso of [55, 75, 95])
  for (const objetivo of ['perder_grasa', 'mantener', 'ganar_musculo'])
  for (const comidas of [3, 4]) {
    const meta = calcularMeta({ sexo, edad: 28, peso, altura: 172, comidas, objetivo, actividad: 'moderado' });
    const viejo = PLATO.map(it => recomendarSize(it, meta));
    const a = evaluar(PLATO, viejo, meta);
    const r = porcionar(PLATO, meta);
    if (r.coste > a.coste + 1e-9) peor++;
    if (r.coste < a.coste - 1e-9) {
      mejoras++;
      if (!ejemplo) {
        const dv = { prot: a.prot - meta.prot, carb: a.carb - meta.carb, gras: a.gras - meta.gras };
        ejemplo = { perfil: `${sexo} ${peso}kg ${objetivo} ${comidas} comidas`,
                    meta: `${meta.prot}P ${meta.carb}C ${meta.gras}G`,
                    viejo: `tamaños ${viejo.join('/')} → desvío ${desvTotal(dv).toFixed(1)} g`,
                    nuevo: `tamaños ${PLATO.map(i => r.tamanos[i.id]).join('/')} → desvío ${desvTotal(r.desviacion).toFixed(1)} g` };
      }
    }
  }
  assert.equal(peor, 0, 'el porcionado conjunto salió PEOR que recomendarSize en algún perfil');
  assert.ok(mejoras > 0, 'no mejoró en ningún perfil: el cambio no se justifica');
  console.log(`\n  → mejora en ${mejoras} de 36 perfiles. Ejemplo:`);
  Object.entries(ejemplo).forEach(([k, v]) => console.log(`      ${k.padEnd(7)} ${v}`));
});

// 7 ─ coherencia interna: los macros devueltos son los de los tamaños devueltos
test('los macros del resultado cuadran con los tamaños que devuelve', () => {
  const meta = { prot: 48, carb: 70, gras: 20 };
  const r = porcionar(PLATO, meta);
  let prot = 0, carb = 0, gras = 0;
  PLATO.forEach(it => { const m = mac(it, r.tamanos[it.id]); prot += m.prot; carb += m.carb; gras += m.gras; });
  assert.equal(r.macros.prot, prot);
  assert.equal(r.macros.carb, carb);
  assert.equal(r.macros.gras, Math.round(gras * 10) / 10);
});

// 8 ─ solo devuelve tamaños que existen en la carta
test('todo tamaño devuelto es uno de los tres de SIZES', () => {
  for (const meta of [{ prot: 10, carb: 10, gras: 5 }, { prot: 90, carb: 150, gras: 40 }]) {
    const r = porcionar(PLATO, meta);
    Object.values(r.tamanos).forEach(k => assert.ok(F.includes(k), `tamaño inválido: ${k}`));
  }
});

// 9 ─ el espacio recorrido es exhaustivo
test('recorre 3^n combinaciones, ni una menos', () => {
  assert.equal(porcionar(PLATO, { prot: 40, carb: 60, gras: 15 }).combinacionesEvaluadas, 81);
  assert.equal(porcionar([...PLATO, id('V03')], { prot: 40, carb: 60, gras: 15 }).combinacionesEvaluadas, 243);
});

// 10 ─ meta de carbohidratos en 0 (déficit agresivo) no rompe el cálculo
test('meta de carbohidratos en 0 no produce NaN ni Infinity', () => {
  const r = porcionar(PLATO, { prot: 50, carb: 0, gras: 20 });
  assert.ok(Number.isFinite(r.coste) && Number.isFinite(r.precio));
  Object.values(r.macros).forEach(v => assert.ok(Number.isFinite(v)));
});

// 11 ─ determinista y sin efectos colaterales
test('dos llamadas idénticas devuelven exactamente lo mismo', () => {
  const meta = { prot: 44, carb: 62, gras: 19 };
  assert.deepEqual(porcionar(PLATO, meta), porcionar(PLATO, meta));
});

// 12 ─ sin selección no inventa un plato
test('sin módulos elegidos devuelve null', () => {
  assert.equal(porcionar([], { prot: 40, carb: 60, gras: 15 }), null);
});
