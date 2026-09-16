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

export function porcionar(items, meta, opts = {}) {
  if (!items || !items.length) return null;
  // Meta 0 (pasa con los carbos en déficit agresivo): evita dividir entre cero
  // sin distorsionar el peso relativo de los demás macros.
  const den = k => Math.max(meta[k] || 0, 1);
  const n = items.length;

  // Tamaños fijados a mano con "Ajustar": ese módulo deja de ser una variable y
  // el porcionado optimiza los DEMÁS a su alrededor, en vez de ignorar el
  // override o sacar el módulo de la cuenta. Sin `fijos` el dominio de cada
  // módulo son los tres tamaños de siempre y el resultado no cambia.
  const fijos = opts.fijos || {};
  const dominios = items.map(it => (fijos[it.id] != null ? [fijos[it.id]] : FACTORES));
  const total = dominios.reduce((a, d) => a * d.length, 1);
  let mejor = null;

  for (let combo = 0; combo < total; combo++) {
    const factores = new Array(n);
    let resto = combo;
    for (let i = 0; i < n; i++) {
      const d = dominios[i];
      factores[i] = d[resto % d.length];
      resto = Math.floor(resto / d.length);
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

// ─────────────────────────────────────────────────────────────────────────────
// LA LÍNEA DE PORQUÉ
//
// Cuando añadir un módulo cambia el tamaño de otro que el usuario ya había
// elegido, hay que decirlo: si no, la app parece estar haciendo cosas a sus
// espaldas. El texto se deriva del DIFF entre dos porcionados —qué tamaño
// cambió y qué macro mejoró con el cambio—, nunca de un modelo de lenguaje.
// ─────────────────────────────────────────────────────────────────────────────

const MACRO_LBL = { prot: 'tu proteína', carb: 'tus carbohidratos', gras: 'tus grasas' };

// El nombre corto de un módulo es su primera palabra: "Camote asado con chile
// ancho" → "camote". Sale del propio dato, no de una tabla paralela que
// habría que mantener a mano cada vez que cambie la carta.
export function nombreCorto(it) {
  return it.nombre.split(' ')[0].toLowerCase();
}

export function explicarCambio(antes, despues, items, meta, opts = {}) {
  if (!antes || !despues) return null;
  const porId = id => items.find(i => i.id === id);

  // Los tamaños que acaba de mover EL USUARIO desde "Ajustar". La app no puede
  // firmar como suya una acción ajena: se excluyen del diff, y si no queda nada
  // más que contar, se calla.
  const manual = new Set(opts.manual || []);

  const cambios = Object.keys(despues.tamanos)
    .filter(id => !manual.has(id))
    .filter(id => antes.tamanos[id] !== undefined && antes.tamanos[id] !== despues.tamanos[id])
    .map(id => ({
      id,
      it: porId(id),
      de: antes.tamanos[id],
      a: despues.tamanos[id],
      subio: despues.tamanos[id] > antes.tamanos[id]
    }))
    .filter(c => c.it);

  if (!cambios.length) return null;

  // ¿Qué macro justifica el REAJUSTE? No basta comparar contra el plato anterior:
  // entre los dos porcionados también entró un módulo nuevo —o el usuario clavó
  // un tamaño— y su aportación se llevaría el mérito. El punto de comparación
  // honesto es el contrafactual: el mismo plato de ahora, con los módulos previos
  // clavados donde estaban Y los que movió el usuario ya en su valor NUEVO. Así
  // la ganancia que quede es la del reajuste automático y de nadie más.
  let referencia = antes.desviacion, costeRef = antes.coste;
  if (meta) {
    const fijos = {};
    for (const id of Object.keys(antes.tamanos)) if (!manual.has(id)) fijos[id] = antes.tamanos[id];
    for (const id of manual) if (despues.tamanos[id] !== undefined) fijos[id] = despues.tamanos[id];
    const contra = porcionar(items, meta, { fijos });
    referencia = contra.desviacion;
    costeRef = contra.coste;
  }

  // Un tamaño clavado a mano puede estrechar el dominio hasta que el mejor
  // reajuste posible siga siendo peor que el punto de partida. Ahí no hay
  // ningún fin nutricional que contar: mirar un solo macro diría que mejoró
  // mientras el plato entero empeora.
  if (despues.coste > costeRef + 1e-9) return null;

  let macro = null, ganancia = -Infinity;
  for (const k of ['prot', 'carb', 'gras']) {
    const g = Math.abs(referencia[k]) - Math.abs(despues.desviacion[k]);
    if (g > ganancia) { ganancia = g; macro = k; }
  }
  // El reajuste no mejoró ningún macro (vino del desempate por precio): sin
  // porqué nutricional que contar, y mentir uno sería peor que callar.
  if (ganancia <= 0) return null;

  // "cerrar" cuando veníamos cortos, "no pasarte de" cuando veníamos largos.
  const faltaba = referencia[macro] < 0;
  const fin = faltaba ? `para cerrar ${MACRO_LBL[macro]}` : `para no pasarte de ${MACRO_LBL[macro]}`;

  // El nombre del tamaño conserva su mayúscula ("Grande"): es una etiqueta de la
  // carta, no una palabra corriente de la frase.
  const frase = (c, inicial) => {
    const lbl = SIZES.find(s => s.k === c.a).l;
    const verbo = c.subio ? 'Subí' : 'Bajé';
    return `${inicial ? verbo : verbo.toLowerCase()} ${nombreCorto(c.it)} a ${lbl}`;
  };

  let sujeto;
  if (cambios.length === 1) sujeto = frase(cambios[0], true);
  else if (cambios.length === 2) sujeto = `${frase(cambios[0], true)} y ${frase(cambios[1], false)}`;
  else sujeto = `Reajusté ${cambios.length} módulos`;

  return { texto: `${sujeto} ${fin}.`, ids: cambios.map(c => c.id), macro, ganancia };
}

// ─────────────────────────────────────────────────────────────────────────────
// LA PROPUESTA DE CIERRE
//
// El cuello de botella del modo IA no es el algoritmo: es el inventario. El
// techo de carbohidratos con un solo módulo en Grande son 57 g, contra una meta
// media de 96 g por comida. Medido sobre 1,600 perfiles, al 84% no le alcanza
// ningún módulo por sí solo.
//
// Cuando la mejor combinación no llega, el sistema ni fuerza el número ni se
// calla: PROPONE el módulo que cierra el hueco, con lo que aporta y lo que
// cuesta. Se propone; acepta el usuario. Es a la vez el manejo del error y el
// upsell más natural del negocio.
// ─────────────────────────────────────────────────────────────────────────────

export function proponerCierre(items, meta, candidatos, opts = {}) {
  const base = items && items.length ? porcionar(items, meta, opts) : null;
  // Si el plato ya cae dentro del umbral no hay nada que cerrar: proponer aquí
  // sería vender por vender, no resolver un problema del usuario.
  if (base && base.dentroDeUmbral) return null;
  if (!candidatos || !candidatos.length) return null;

  const yaEsta = new Set((items || []).map(i => i.id));
  let mejor = null;

  for (const c of candidatos) {
    if (yaEsta.has(c.id)) continue;
    const con = [...(items || []), c];
    const r = porcionar(con, meta, opts);
    if (!mejor || r.coste < mejor.r.coste - 1e-9) mejor = { c, r };
  }
  if (!mejor) return null;

  // Solo se propone si de verdad acerca a la meta. Un módulo que empeora el
  // ajuste no es una propuesta de cierre: es ruido.
  if (base && mejor.r.coste >= base.coste - 1e-9) return null;

  const tamano = mejor.r.tamanos[mejor.c.id];
  const aporta = mac(mejor.c, tamano);

  // ¿Qué macro cierra? El que más reduce su desviación al aceptar la propuesta.
  let macro = 'carb', ganancia = -Infinity;
  if (base) {
    for (const k of ['prot', 'carb', 'gras']) {
      const g = Math.abs(base.desviacion[k]) - Math.abs(mejor.r.desviacion[k]);
      if (g > ganancia) { ganancia = g; macro = k; }
    }
  }

  return {
    it: mejor.c,
    tamano,
    g: aporta.g,
    aporta,
    // El precio que se anuncia es el del plato ENTERO, no el del módulo suelto:
    // aceptar la propuesta también reajusta los demás y puede abaratarlos.
    precio: mejor.r.precio,
    deltaPrecio: base ? mejor.r.precio - base.precio : mejor.r.precio,
    macro,
    ganancia: base ? ganancia : null,
    desviacion: mejor.r.desviacion,
    dentroDeUmbral: mejor.r.dentroDeUmbral,
    resultado: mejor.r
  };
}
