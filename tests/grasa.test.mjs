// Grasas cubiertas antes de su paso — correr con: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { cubrenGrasa, porcionar, mac, calcularMeta, UMBRAL_G } from '../js/calc.js';
import { ING } from '../js/data.js';

const id = x => ING.find(i => i.id === x);

test('salmón y camote cubren la grasa de un perfil medio antes de llegar a su paso', () => {
  // Hombre 75 kg, perder grasa, 3 comidas: 20 g de grasa por comida.
  const meta = calcularMeta({ sexo: 'masculino', edad: 28, peso: 75, altura: 175, comidas: 3, objetivo: 'perder_grasa', actividad: 'moderado' });
  const c = cubrenGrasa([id('P02'), id('C02'), id('V01')], meta);
  assert.ok(c, 'con salmón y camote la grasa tiene que darse por cubierta');
  assert.ok(['justa', 'encima'].includes(c.estado));
  assert.ok(c.fuentes.length >= 1 && c.fuentes.every(it => it.cat !== 'grasa'));
  // Las fuentes que se nombran cubren la meta POR SÍ SOLAS, al tamaño resuelto:
  // es lo que hace verdad la frase "con salmón y camote ya alcanzas tu meta".
  const suma = c.fuentes.reduce((a, it) => a + mac(it, c.resultado.tamanos[it.id]).gras, 0);
  assert.ok(suma >= meta.gras - 1e-9, `las fuentes suman ${suma} g y la meta es ${meta.gras} g`);
});

test('los módulos de grasa no cuentan: la detección mira el plato sin ellos', () => {
  const meta = { prot: 45, carb: 96, gras: 20 };
  const sin = cubrenGrasa([id('P02'), id('C02'), id('V01')], meta);
  const con = cubrenGrasa([id('P02'), id('C02'), id('V01'), id('G01')], meta);
  assert.ok(sin && con);
  assert.deepEqual(con.resultado.tamanos, sin.resultado.tamanos);
  assert.equal(con.estado, sin.estado);
  assert.deepEqual(con.fuentes.map(i => i.id), sin.fuentes.map(i => i.id));
});

test('propiedad: aviso exactamente cuando el porcionado sin grasas llega a la meta, con fuentes que la cubren', () => {
  let avisos = 0, casos = 0;
  for (const peso of [55, 65, 75, 85, 95]) for (const obj of ['perder_grasa', 'mantener', 'ganar_musculo', 'rendimiento'])
  for (const trio of [['P01', 'C01', 'V01'], ['P02', 'C02', 'V02'], ['P03', 'C03', 'V03'], ['P02', 'C01', 'V04'], ['P01', 'C02', 'V03']]) {
    const meta = calcularMeta({ sexo: 'masculino', edad: 28, peso, altura: 175, comidas: 3, objetivo: obj, actividad: 'moderado' });
    const items = trio.map(id);
    const r = porcionar(items, meta), c = cubrenGrasa(items, meta);
    casos++;
    if (r.desviacion.gras >= 0) {
      assert.ok(c, `${trio} a ${peso} kg ${obj}: grasa ${r.macros.gras} ≥ ${meta.gras} y sin aviso`);
      avisos++;
      assert.equal(c.estado, r.desviacion.gras > UMBRAL_G ? 'encima' : 'justa');
      assert.deepEqual(c.resultado.tamanos, r.tamanos, 'mismo porcionado que el de la app');
      const suma = c.fuentes.reduce((a, it) => a + mac(it, r.tamanos[it.id]).gras, 0);
      assert.ok(suma >= meta.gras - 1e-9, `fuentes insuficientes: ${suma} < ${meta.gras}`);
      // Mínimas: quitar la última fuente deja de cubrir la meta (no se nombra de más).
      const sinUltima = suma - mac(c.fuentes[c.fuentes.length - 1], r.tamanos[c.fuentes[c.fuentes.length - 1].id]).gras;
      assert.ok(sinUltima < meta.gras, `se nombra una fuente de más: ${sinUltima} ya cubría ${meta.gras}`);
    } else {
      assert.equal(c, null, `${trio} a ${peso} kg ${obj}: grasa ${r.macros.gras} < ${meta.gras} y aún así hay aviso`);
    }
  }
  assert.ok(avisos > 0 && avisos < casos, `el aviso tiene que dispararse en algunos perfiles y no en todos (${avisos}/${casos})`);
});

test('sin módulos que no sean grasa, o con meta de grasa 0, no hay aviso', () => {
  const meta = { prot: 45, carb: 96, gras: 20 };
  assert.equal(cubrenGrasa([id('G01')], meta), null);
  assert.equal(cubrenGrasa([], meta), null);
  assert.equal(cubrenGrasa([id('P02'), id('C02')], { prot: 45, carb: 96, gras: 0 }), null);
});
