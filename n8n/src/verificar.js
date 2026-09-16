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
(d.lineas || []).forEach(l => { add(l.g); add(l.precio); Object.values(l.macros).forEach(add); });
if (d.propuesta_cierre) {
  const p = d.propuesta_cierre;
  add(p.g); add(p.precio_extra); add(p.precio_total_con_propuesta);
  Object.values(p.aporta || {}).forEach(add);
  Object.values(p.macros_resultantes || {}).forEach(add);
  Object.values(p.desviacion_resultante || {}).forEach(add);
}

const citados = (bruto.match(/\d+(?:[.,]\d+)?/g) || []).map(s => s.replace(',', '.'));
const inventados = citados.filter(n => !permitidos.has(n) && !permitidos.has(String(Number(n))));

// Explicación de respaldo, escrita en código a partir de los mismos números.
function explicarEnCodigo() {
  const p = [];
  p.push(`Tu plato queda en ${d.macros_totales.kcal} kcal con ${d.macros_totales.prot} g de proteína, ${d.macros_totales.carb} g de carbohidratos y ${d.macros_totales.gras} g de grasas.`);
  const fuera = ['prot', 'carb', 'gras'].filter(k => Math.abs(d.desviacion[k]) > 4);
  const LBL = { prot: 'proteína', carb: 'carbohidratos', gras: 'grasas' };
  if (!fuera.length) p.push('Los tres macros caen dentro de tu meta.');
  else p.push('Fuera de meta: ' + fuera.map(k => `${LBL[k]} ${d.desviacion[k] > 0 ? '+' : ''}${d.desviacion[k]} g`).join(', ') + '.');
  if (d.propuesta_cierre) {
    const c = d.propuesta_cierre;
    p.push(`Para cerrarlo puedes añadir ${c.nombre} en tamaño ${c.tamano} (${c.g} g): aporta ${c.aporta[c.macro_que_cierra]} g de ${LBL[c.macro_que_cierra]} por ${c.precio_extra} MXN más.`);
  }
  return p.join(' ');
}

const limpio = bruto.length > 0 && inventados.length === 0;
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
  total: d.total,
  explicacion,
  avisos: d.avisos,
  rechazados: d.rechazados,
  auditoria: {
    numeros_citados_por_el_modelo: citados.length,
    numeros_inventados: inventados,
    explicacion_del_modelo_aceptada: limpio,
    suma_cuadra: d.suma_cuadra,
    combinaciones_evaluadas: d.combinaciones_evaluadas,
    catalogo_filas: d.catalogo_filas,
    ms: Date.now() - d.t0
  }
};
return [{ json: respuesta }];
