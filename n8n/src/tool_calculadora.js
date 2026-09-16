// calculadora — verifica la suma antes de cerrar. Suma las líneas de nuevo,
// desde cero, y compara contra el total que se va a responder.
const d = $('Resolver plato').first().json;
const s = d.lineas.reduce((a, l) => ({
  kcal: a.kcal + l.macros.kcal, prot: a.prot + l.macros.prot,
  carb: a.carb + l.macros.carb, gras: Math.round((a.gras + l.macros.gras) * 10) / 10,
  total: a.total + l.precio
}), { kcal: 0, prot: 0, carb: 0, gras: 0, total: 0 });
return JSON.stringify({
  suma_de_lineas: s,
  totales_declarados: { ...d.macros_totales, total: d.total },
  cuadra: s.kcal === d.macros_totales.kcal && s.prot === d.macros_totales.prot
       && s.carb === d.macros_totales.carb && Math.abs(s.gras - d.macros_totales.gras) < 1e-9
       && s.total === d.total,
  contra_la_meta: { objetivo: d.meta, desviacion: d.desviacion, umbral_g: 4 }
});
