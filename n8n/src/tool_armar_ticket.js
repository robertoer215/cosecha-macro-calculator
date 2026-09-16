// armar_ticket — aplica los precios del catálogo y totaliza. Los precios NO se
// calculan aquí: se leen del catálogo, que es la fuente única.
const d = $('Resolver plato').first().json;
return JSON.stringify({
  pedido_id: d.pedido_id,
  lineas: d.lineas.map(l => ({ id: l.id, nombre: l.nombre, tamano: l.tamano, g: l.g, precio_mxn: l.precio })),
  total_mxn: d.total,
  propuesta_cierre: d.propuesta_cierre
    ? { nombre: d.propuesta_cierre.nombre, tamano: d.propuesta_cierre.tamano,
        g: d.propuesta_cierre.g, precio_extra_mxn: d.propuesta_cierre.precio_extra,
        macro_que_cierra: d.propuesta_cierre.macro_que_cierra }
    : null
});
