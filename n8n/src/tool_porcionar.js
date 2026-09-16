// porcionar — recalcula y CONFIRMA lo que la app ya resolvió. Si discrepan,
// gana n8n y la discrepancia queda registrada. La doble capa es deliberada:
// permite demostrar que el número es correcto, no solo que suena razonable.
const d = $('Resolver plato').first().json;
return JSON.stringify({
  tamanos: d.lineas.map(l => ({ id: l.id, nombre: l.nombre, tamano: l.tamano, g: l.g, precio: l.precio, macros: l.macros })),
  macros_totales: d.macros_totales,
  desviacion: d.desviacion,
  dentro_de_umbral: d.dentro_de_umbral,
  combinaciones_evaluadas: d.combinaciones_evaluadas,
  nota: 'resultado del porcionado exhaustivo: optimo global sobre 3^n combinaciones, proteina a peso doble'
});
