// ══ VERIFICACIÓN — el guardrail que hace defendible el sistema ══
// La respuesta se ENSAMBLA aquí, con los números del nodo determinista. Del
// agente se toma únicamente texto. Y ese texto se audita: cualquier cifra que
// no salga del cálculo se marca como inventada y la explicación se sustituye
// por una redactada en código. Así "ningún número viene del modelo" no es una
// promesa: es una comprobación que se ejecuta en cada petición.
const d = $('Resolver plato').first().json;
const salidaAgente = $input.first().json;
const bruto = String(salidaAgente.output ?? salidaAgente.text ?? '').trim();

// Conjunto de cifras legítimas: todo lo que produjo el cálculo.
const permitidos = new Set();
// Los flotantes binarios (1.3000000000000007) hacían que el auditor marcase
// como inventado un 1.3 que era exactamente el número calculado. Se admite el
// valor con sus redondeos razonables, en positivo y en valor absoluto.
const add = n => {
  if (n == null || !Number.isFinite(Number(n))) return;
  const x = Number(n);
  for (const v of [x, Math.abs(x)]) {
    permitidos.add(String(v));
    permitidos.add(String(Math.round(v)));
    permitidos.add(String(Math.round(v * 10) / 10));
    permitidos.add(String(Math.round(v * 100) / 100));
  }
};
[d.meta.kcal, d.meta.prot, d.meta.carb, d.meta.gras, d.total,
 d.macros_totales.kcal, d.macros_totales.prot, d.macros_totales.carb, d.macros_totales.gras,
 d.desviacion.prot, d.desviacion.carb, d.desviacion.gras].forEach(add);
// El número de porciones de cada línea ("3 porciones") también es una cifra que
// el modelo puede citar con razón: sale de las herramientas tal cual.
const K_DE = { 'Pequeña': 0.5, 'Estándar': 1, 'Grande': 1.5, '2 porciones': 2, '3 porciones': 3, '4 porciones': 4 };
(d.lineas || []).forEach(l => { add(l.g); add(l.precio); Object.values(l.macros).forEach(add); if (K_DE[l.tamano] >= 2) add(K_DE[l.tamano]); });
add(d.lineas ? d.lineas.length : null);
// combinaciones_evaluadas también viaja al agente: es un número del cálculo, no inventado.
add(d.combinaciones_evaluadas);
if (d.propuesta_cierre) {
  const p = d.propuesta_cierre;
  add(p.g); add(p.precio_extra); add(p.precio_total_con_propuesta);
  if (K_DE[p.tamano] >= 2) add(K_DE[p.tamano]);
  Object.values(p.tamanos_resultantes || {}).forEach(t => { if (K_DE[t] >= 2) add(K_DE[t]); });
  Object.values(p.aporta || {}).forEach(add);
  Object.values(p.macros_resultantes || {}).forEach(add);
  Object.values(p.desviacion_resultante || {}).forEach(add);
}

// El umbral (±4 g) también viaja al modelo y es una cifra del cálculo.
add(4);
// "230,400" es un separador de miles, no un decimal: se normaliza antes de comparar.
const citados = (bruto.match(/\d{1,3}(?:,\d{3})+(?![\d,])|\d+(?:[.,]\d+)?/g) || [])
  .map(s => (/^\d{1,3}(?:,\d{3})+$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.')));
const inventados = citados.filter(n => !permitidos.has(n) && !permitidos.has(String(Number(n))));

// Guardas LÉXICAS, deterministas: el auditor numérico no ve afirmaciones. Dos
// cosas que el modelo ha hecho en vivo y que un cliente de Puebla no debe leer:
//  · describir la propuesta como un reemplazo ("en lugar de", "cambiar X por Y")
//    cuando la propuesta solo AÑADE y, como mucho, reajusta tamaños;
//  · voseo ("podés", "llegás", "vos decidís") en una casa que habla de tú.
const motivosRechazo = [];
// "Reemplazo" solo cuenta si lo que sigue nombra un MÓDULO: "119 MXN en lugar de
// los 147" es una comparación de precio legítima y no debe tumbar el texto. Las
// negaciones ("nada se quita", "sin quitar") tampoco.
if (d.propuesta_cierre) {
  const nombres = [...(d.lineas || []).map(l => l.nombre), d.propuesta_cierre.nombre]
    .filter(Boolean).map(n => n.split(' ')[0].toLowerCase());
  const sinNegaciones = bruto.replace(/\b(nada se quita|sin quitar(?: nada)?|no (?:se )?quita(?: nada)?|no reemplaza(?: nada)?|no sustituye(?: nada)?)\b/gi, ' ');
  const re = /\b(en lugar de|en vez de|reemplaz\w*|sustitu\w*|intercambi\w*|cambi(?:ar|a|o|ando)|quit(?:ar|a|o|ando))\b/gi;
  let m, reemplazo = false;
  while ((m = re.exec(sinNegaciones)) && !reemplazo) {
    const cola = sinNegaciones.slice(m.index, m.index + 70).toLowerCase();
    if (nombres.some(n => cola.includes(n))) reemplazo = true;
  }
  if (reemplazo) motivosRechazo.push('describe la propuesta como un reemplazo');
}
if (/\b(vos|pod[eé]s|ten[eé]s|quer[eé]s|lleg[aá]s|sum[aá]s|decid[ií]s|and[aá]s|sab[eé]s|ven[ií]s|eleg[ií]s|hac[eé]s)\b/i.test(bruto)) motivosRechazo.push('voseo');
if (bruto.split(/[.!?]+\s/).filter(x => x.trim()).length > 3) motivosRechazo.push('más de tres frases');

// Explicación de respaldo, escrita en código a partir de los mismos números.
// Toda cifra se imprime redondeada a un decimal: la desviación de grasa llega
// como flotante binario (11.100000000000001) y el cliente no tiene por qué verlo.
const f1 = x => String(Math.round(Number(x) * 10) / 10);
function explicarEnCodigo() {
  const p = [];
  p.push(`Tu plato queda en ${f1(d.macros_totales.kcal)} kcal con ${f1(d.macros_totales.prot)} g de proteína, ${f1(d.macros_totales.carb)} g de carbohidratos y ${f1(d.macros_totales.gras)} g de grasas.`);
  const fuera = ['prot', 'carb', 'gras'].filter(k => Math.abs(d.desviacion[k]) > 4);
  const LBL = { prot: 'proteína', carb: 'carbohidratos', gras: 'grasas' };
  if (!fuera.length) p.push('Los tres macros caen dentro de tu meta.');
  else p.push('Fuera de meta: ' + fuera.map(k => `${LBL[k]} ${d.desviacion[k] > 0 ? '+' : ''}${f1(d.desviacion[k])} g`).join(', ') + '.');
  if (d.propuesta_cierre) {
    const c = d.propuesta_cierre;
    p.push(`Puedes cerrarlo añadiendo ${c.nombre} en ${c.tamano} (${c.g} g), que aporta ${f1(c.aporta[c.macro_que_cierra])} g de ${LBL[c.macro_que_cierra]}; ${c.precio_extra >= 0 ? `cuesta ${c.precio_extra} MXN más` : `el plato sale ${Math.abs(c.precio_extra)} MXN más barato`}. Tú decides.`);
  } else if (fuera.length && d.motivo_sin_propuesta) {
    p.push(d.motivo_sin_propuesta);
  }
  return p.join(' ');
}

const limpio = bruto.length > 0 && inventados.length === 0 && motivosRechazo.length === 0;
const explicacion = limpio ? bruto : explicarEnCodigo();

const respuesta = {
  pedido_id: d.pedido_id,
  lineas: d.lineas,
  macros_totales: d.macros_totales,
  desviacion: d.desviacion,
  dentro_de_umbral: d.dentro_de_umbral,
  // La app manda tamaños en `seleccion`. Si los mandó todos y coinciden con lo
  // que resuelve n8n, se declara la coincidencia; si no, gana n8n y se registra.
  coincide_con_la_app: (() => {
    const pedidos = d.seleccion.filter(s => s.tamano != null);
    if (!pedidos.length) return null;
    const ETQ = { 0.5: 'Pequeña', 1: 'Estándar', 1.5: 'Grande', 2: '2 porciones', 3: '3 porciones', 4: '4 porciones' };
    return pedidos.every(s => {
      const l = d.lineas.find(x => x.id === s.id);
      return l && l.tamano === ETQ[s.tamano];
    });
  })(),
  propuesta_cierre: d.propuesta_cierre,
  motivo_sin_propuesta: d.motivo_sin_propuesta,
  total: d.total,
  explicacion,
  avisos: d.avisos,
  rechazados: d.rechazados,
  auditoria: {
    numeros_citados_por_el_modelo: citados.length,
    numeros_inventados: inventados,
    motivos_rechazo_del_texto: motivosRechazo,
    explicacion_del_modelo_aceptada: limpio,
    suma_cuadra: d.suma_cuadra,
    combinaciones_evaluadas: d.combinaciones_evaluadas,
    catalogo_filas: d.catalogo_filas,
    ms: Date.now() - d.t0
  }
};
return [{ json: respuesta }];
