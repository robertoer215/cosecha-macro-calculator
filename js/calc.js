import { ING, FACT_ACTIVIDAD, FACT_OBJETIVO, FACT_MACRO, FOOD_COST_OBJETIVO, PASO_DIFERENCIA_COSTE, SIZES, MAX_PORCIONES, MAX_MODULOS_CAT } from './data.js';
// Coste de la porción Estándar: coste por kilo de la preparación terminada × gramos.
export function costePorcion(it) { return it.costoKg * it.g / 1000; }

// Coste medio de la porción Estándar en cada categoría (se calcula una vez).
const COSTE_MEDIO_CAT = {};
function costeMedio(cat) {
  if (COSTE_MEDIO_CAT[cat] === undefined) {
    const pares = ING.filter(i => i.cat === cat);
    COSTE_MEDIO_CAT[cat] = pares.length ? pares.reduce((a, i) => a + costePorcion(i), 0) / pares.length : 0;
  }
  return COSTE_MEDIO_CAT[cat];
}

// Precio de la porción Estándar, sin redondear. BANDA POR CATEGORÍA: la categoría
// se cobra alrededor de su coste medio al food cost objetivo, y solo una fracción
// (PASO_DIFERENCIA_COSTE) de lo que un módulo se aparta de ese medio pasa a su
// precio. Es lo que hace que el pollo y el salmón se parezcan en la carta aunque
// no en el coste: el pollo subvenciona al salmón y el food cost de la categoría
// cierra en el objetivo con un mix parejo.
export function precioBase(it) {
  const medio = costeMedio(it.cat);
  return (medio + PASO_DIFERENCIA_COSTE * (costePorcion(it) - medio)) / FOOD_COST_OBJETIVO;
}

export function precio(it, f = 1) {
  // A partir de 2 porciones cada una cuesta lo que la Estándar: es lo que espera
  // quien pide "tres de camote". Pequeña, Estándar y Grande escalan la base.
  if (f >= 2) return f * precio(it, 1);
  return Math.ceil(precioBase(it) * f);
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
// Coste: el producto de los dominios de cada módulo (ver tamanosPermitidos):
// cientos o pocos miles de combinaciones, milisegundos. Es búsqueda exhaustiva,
// así que el resultado es el óptimo global, no una aproximación.
// ─────────────────────────────────────────────────────────────────────────────

// Los tamaños salen de SIZES en data.js: una sola fuente de verdad. Cada módulo
// busca solo hasta el tope de porciones de su categoría (MAX_PORCIONES): con
// 1P + 1C + 1V + 1G son 5·6·4·4 = 480 combinaciones; con dos carbohidratos y dos
// vegetales, 11.520. Sigue siendo búsqueda exhaustiva: el óptimo global dentro
// del tope, no una heurística.
export function tamanosPermitidos(it) {
  const tope = MAX_PORCIONES[it.cat] ?? 1.5;
  return SIZES.filter(s => s.k <= tope).map(s => s.k);
}

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
  const wp = PESO_MACRO.prot / den('prot'), wc = PESO_MACRO.carb / den('carb'), wg = PESO_MACRO.gras / den('gras');

  // Tamaños fijados a mano con "Ajustar": ese módulo deja de ser una variable y
  // el porcionado optimiza los DEMÁS a su alrededor. Sin `fijos` el dominio de
  // cada módulo es el de su categoría y el resultado no cambia.
  const fijos = opts.fijos || {};
  // Cada módulo, cada tamaño: lo que aporta, ya redondeado como lo enseña la app
  // (mac()), para que barra y porcionado nunca se contradigan. La grasa viaja en
  // décimas enteras: sumar enteros no arrastra error binario.
  const opciones = items.map(it => (fijos[it.id] != null ? [fijos[it.id]] : tamanosPermitidos(it)).map(f => {
    const m = mac(it, f);
    return { f, prot: m.prot, carb: m.carb, gras10: Math.round(m.gras * 10), kcal: m.kcal, precio: precio(it, f) };
  }));
  const total = opciones.reduce((a, d) => a * d.length, 1);

  // ENCUENTRO EN EL MEDIO. Se enumeran las dos mitades del plato por separado y
  // se cruzan: es el MISMO espacio de búsqueda y el mismo óptimo global, pero cada
  // combinación cuesta tres sumas en vez de n llamadas a mac(). Con ocho módulos
  // (2P+2C+2V+2G) son 230.400 cruces en ~2 ms; la enumeración plana tardaba
  // segundos y con 3P+3C+3V un solo toque llegaba a 3,6 s.
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
    const a = A[i];
    const pa = a.prot - meta.prot, ca = a.carb - meta.carb;
    for (let j = 0; j < B.length; j++) {
      const b = B[j];
      const dp = pa + b.prot, dc = ca + b.carb, dg = (a.gras10 + b.gras10) / 10 - meta.gras;
      const coste = wp * (dp < 0 ? -dp : dp) + wc * (dc < 0 ? -dc : dc) + wg * (dg < 0 ? -dg : dg);
      // Desempate: a igual ajuste nutricional, el plato más barato.
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
    tamanos, macros, desviacion,
    precio: mejorPrecio,
    coste: mejorCoste,
    dentroDeUmbral: Math.abs(desviacion.prot) <= UMBRAL_G
                 && Math.abs(desviacion.carb) <= UMBRAL_G
                 && Math.abs(desviacion.gras) <= UMBRAL_G,
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
    .map(id => ({ id, it: porId(id), de: antes.tamanos[id], a: despues.tamanos[id], subio: despues.tamanos[id] > antes.tamanos[id] }))
    .filter(c => c.it);
  if (!cambios.length) return null;

  // EL CONTRAFACTUAL: el mismo plato de ahora con los módulos previos clavados
  // donde estaban, y TODO lo demás —el módulo recién añadido y lo que movió el
  // usuario— clavado en su valor final. Así la única diferencia entre el
  // contrafactual y el plato real es el reajuste automático de los previos, y la
  // ganancia que quede es suya y de nadie más. Dejar libre el módulo nuevo (como
  // antes) mezclaba dos movimientos y la frase se llevaba el mérito del otro.
  let referencia = antes.desviacion, costeRef = antes.coste;
  if (meta) {
    const fijos = {};
    for (const id of Object.keys(despues.tamanos)) {
      fijos[id] = (manual.has(id) || antes.tamanos[id] === undefined) ? despues.tamanos[id] : antes.tamanos[id];
    }
    const contra = porcionar(items, meta, { fijos });
    referencia = contra.desviacion;
    costeRef = contra.coste;
  }
  // Si el reajuste no mejora el plato entero, no hay fin nutricional que contar.
  if (despues.coste > costeRef + 1e-9) return null;

  // Cada cambio se acredita al macro donde su aportación MARGINAL es mayor: la
  // diferencia entre el plato final y el plato final SIN ese cambio (ese módulo
  // devuelto a su tamaño previo). Con eso un intercambio —bajar camote y subir
  // arroz para quitar grasa sin perder carbohidrato— se cuenta entero: cada
  // mitad sola empeora, pero dado lo demás, el camote quita grasa y el arroz
  // repone carbohidrato. Un cambio sin aportación positiva en ningún macro (vino
  // del desempate por precio) no se cita: mentir un porqué sería peor que callar.
  const MACROS = ['prot', 'carb', 'gras'];
  const finalDev = despues.desviacion;
  const atribuir = c => {
    const de = mac(c.it, c.de), a = mac(c.it, c.a);
    let macro = null, mejor = 1e-9;
    for (const k of MACROS) {
      const delta = a[k] - de[k];
      if (Math.abs(delta) < 1e-9) continue;
      const sinEl = finalDev[k] - delta;
      const gan = Math.abs(sinEl) - Math.abs(finalDev[k]);
      if (gan > mejor) { mejor = gan; macro = k; }
    }
    return macro;
  };
  const utiles = cambios.map(c => ({ ...c, macro: atribuir(c) })).filter(c => c.macro);
  if (!utiles.length) return null;

  // Un tramo por macro. El fin de cada tramo depende de si ese macro, en
  // conjunto, mejoró respecto al contrafactual: "cerrar" si veníamos cortos, "no
  // pasarte de" si veníamos largos, y "mantener" cuando el cambio solo evita que
  // otro cambio lo estropee (la mitad compensatoria de un intercambio).
  const grupos = [];
  for (const c of utiles) {
    let g = grupos.find(x => x.macro === c.macro);
    if (!g) {
      const agregada = Math.abs(referencia[c.macro]) - Math.abs(finalDev[c.macro]);
      g = { macro: c.macro, cambios: [], ganancia: agregada,
            fin: agregada > 1e-9 ? (referencia[c.macro] < 0 ? 'cerrar' : 'no_pasarte') : 'mantener' };
      grupos.push(g);
    }
    g.cambios.push(c);
  }
  // Primero los tramos que mejoran de verdad; si ninguno lo hace, no hay porqué.
  grupos.sort((x, y) => y.ganancia - x.ganancia);
  if (grupos[0].ganancia <= 0) return null;
  const macro = grupos[0].macro, ganancia = grupos[0].ganancia;

  // El nombre del tamaño conserva su mayúscula ("Grande"): es una etiqueta de la
  // carta, no una palabra corriente de la frase.
  const frase = (c, inicial) => {
    const lbl = SIZES.find(s => s.k === c.a).l;
    const verbo = c.subio ? 'Subí' : 'Bajé';
    return `${inicial ? verbo : verbo.toLowerCase()} ${nombreCorto(c.it)} a ${lbl}`;
  };
  const FIN = { cerrar: 'para cerrar', no_pasarte: 'para no pasarte de', mantener: 'para mantener' };
  const tramo = (g, inicial) => {
    const cs = g.cambios;
    let sujeto;
    if (cs.length === 1) sujeto = frase(cs[0], inicial);
    else if (cs.length === 2) sujeto = `${frase(cs[0], inicial)} y ${frase(cs[1], false)}`;
    else sujeto = `${inicial ? 'Reajusté' : 'reajusté'} ${cs.length} módulos`;
    return `${sujeto} ${FIN[g.fin]} ${MACRO_LBL[g.macro]}`;
  };

  const usados = grupos.slice(0, 2);
  const texto = usados.map((g, i) => tramo(g, i === 0)).join(' y ') + '.';
  const ids = usados.flatMap(g => g.cambios.map(c => c.id));
  // `tramos` expone la estructura de la frase: qué cambios se atribuyen a qué
  // macro. Es lo que los tests contrastan, en vez de volver a parsear la prosa.
  const tramos = usados.map(g => ({ macro: g.macro, fin: g.fin, cambios: g.cambios.map(c => ({ id: c.id, de: c.de, a: c.a })) }));
  return { texto, ids, macro, ganancia, tramos };
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

  // `colocar` sitúa el candidato en el MISMO orden en que quedará al aceptarlo.
  // porcionar() conserva la primera combinación cuando dos empatan en coste y
  // precio, así que enumerar el plato en otro orden podía prometer "2 porciones"
  // y entregar "Grande". Por defecto lo añade al final.
  const colocar = opts.colocar || ((its, c) => [...its, c]);
  for (const c of candidatos) {
    if (yaEsta.has(c.id)) continue;
    const con = colocar(items || [], c);
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
