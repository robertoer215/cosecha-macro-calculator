// `costoKg` es el COSTE por kilo de la preparación terminada (merma incluida), no el
// precio del insumo: sale de cosecha-costos/costeo.csv (columna costo_kg_calculado,
// insumos verificados el 29–31 de agosto de 2026; salmón re-verificado a $439/kg el
// 31-ago). Sustituye a los pKg anteriores, que no tenían origen documentado y
// dejaban 7 de 13 módulos vendiéndose por debajo de su coste. Confianza del costeo:
// REVISAR en todos salvo camote, nopal y nueces (OK); el espárrago es de confianza
// BAJA (el SKU pasó de $34.90 a $149 en dos días).
// `img` apunta a assets/ingredientes/ (derivadas 600×600 de las fotos de la landing).
// `foco` es el object-position del recorte: las fotos son cuadradas y las tarjetas 4:3,
// así que sin él algunos platos que no están centrados en su foto quedan cortados.
// MACROS DE LOS MÓDULOS DE CARBOHIDRATO — derivados de la receta, 15-sep-2026.
// Los tres se rederivaron desde cosecha-costos/recetas_lineas.csv (estandarizada a 1000 g de
// preparación terminada) con macros por insumo de USDA FoodData Central y de docs/INSUMOS.md.
// Criterio: carbohidrato TOTAL (by difference) en los tres; kcal = 4P+4C+9G sobre los macros ya
// redondeados, para que la fila cuadre consigo misma en pantalla (calc.js deriva así la meta).
// La merma se separó en limpieza (retira material, no concentra) y cocción (retira agua, concentra):
//   camote 840 g netos vienen de 956.94 g de pulpa cruda (×1.139); elote 560 g de 599.85 g (×1.071);
//   el arroz NO se concentra: los 560 g de agua son masa ganada, así que se diluye en el kilo.
// Valores anteriores, sin origen documentado: C01 195/5/38/2 · C02 150/2/35/0.5 · C03 160/7/22/5.
// PENDIENTE: el recetario declara porción de 150 g para arroz y esquites, la app declara 120 y 100.
// Estos macros corresponden a la porción que declara la app; cerrar el conflicto antes de publicar carta.
export const ING = [
  {cat:'proteina',id:'P01',nombre:'Pollo al cilantro y limón',g:150,kcal:165,prot:31,carb:0,gras:3.5,costoKg:190.38,img:'pollo.jpg'},
  {cat:'proteina',id:'P02',nombre:'Salmón al pastor con achiote',g:130,kcal:240,prot:28,carb:2,gras:13,costoKg:512.26,img:'salmon.jpg'},
  {cat:'proteina',id:'P03',nombre:'Tenderloin al mole verde',g:150,kcal:210,prot:33,carb:1,gras:8,costoKg:397.51,img:'tenderloin.jpg'},
  {cat:'grasa',id:'G01',nombre:'Guacamole artesanal',g:60,kcal:96,prot:1,carb:5,gras:9,costoKg:57.61,img:'guacamole.jpg',foco:'51% 34%'},
  {cat:'grasa',id:'G02',nombre:'Nueces con chile piquín',g:25,kcal:165,prot:4,carb:3,gras:16,costoKg:266.51,img:'nueces-piquin.jpg',foco:'38% 31%'},
  {cat:'grasa',id:'G03',nombre:'Semillas de girasol tostadas',g:20,kcal:115,prot:4,carb:4,gras:10,costoKg:181.79,img:'semillas.jpg',foco:'38% 48%'},
  {cat:'carbohidrato',id:'C01',nombre:'Arroz con edamame y granada',g:120,kcal:147,prot:3,carb:28,gras:2.6,costoKg:36.28,img:'arroz-edamame.jpg',foco:'44% 45%'},
  {cat:'carbohidrato',id:'C02',nombre:'Camote asado con chile ancho',g:130,kcal:208,prot:3,carb:32,gras:7.5,costoKg:73.33,img:'camote.jpg',foco:'43% 45%'},
  {cat:'carbohidrato',id:'C03',nombre:'Esquites con yogur y feta',g:100,kcal:124,prot:5,carb:14,gras:5.3,costoKg:129.71,img:'esquites.jpg',foco:'51% 47%'},
  {cat:'vegetal',id:'V01',nombre:'Brócoli al carbón sobre tzatziki',g:120,kcal:75,prot:5,carb:9,gras:2,costoKg:50.79,img:'brocoli.jpg'},
  {cat:'vegetal',id:'V02',nombre:'Espárragos asados con limón',g:100,kcal:35,prot:4,carb:5,gras:0.5,costoKg:205.49,img:'esparragos.jpg'},
  {cat:'vegetal',id:'V03',nombre:'Ensalada de nopal con jitomate',g:110,kcal:45,prot:2,carb:8,gras:0.5,costoKg:47.54,img:'nopal.jpg'},
  {cat:'vegetal',id:'V04',nombre:'Verduras tatemadas con cacahuate',g:120,kcal:90,prot:3,carb:10,gras:4,costoKg:49.24,img:'verduras-tatemadas.jpg',foco:'52% 47%'},
];
export const IMG_DIR = 'assets/ingredientes/';
// Los tres primeros son los tamaños de siempre. A partir de 2 el módulo se REPITE:
// "3 porciones" son tres raciones Estándar del mismo módulo (3 × 130 g de camote),
// que es como lo pide un cliente y como lo emplata cocina. `c` es la etiqueta corta
// de las píldoras de "Ajustar"; la larga va en la tarjeta, el resumen y el ticket.
export const SIZES = [
  {k:0.5,l:'Pequeña'},{k:1,l:'Estándar'},{k:1.5,l:'Grande'},
  {k:2,l:'2 porciones',c:'×2'},{k:3,l:'3 porciones',c:'×3'},{k:4,l:'4 porciones',c:'×4'}
];
// Tope de porciones por categoría. Es una regla de producto, no del algoritmo:
// cuatro raciones de camote son un plato; cuatro de salmón o de nueces, no. El
// porcionador solo busca dentro de este tope y "Ajustar" solo ofrece hasta aquí.
export const MAX_PORCIONES = {proteina:3, carbohidrato:4, vegetal:2, grasa:2};
// Tope de MÓDULOS distintos por categoría. Con porciones múltiples un segundo
// módulo ya cubre cualquier meta; un tercero no aporta y dispara la búsqueda
// (con 3P+3C+3V un solo toque tardaba 3,6 s). n8n aplica el mismo tope.
export const MAX_MODULOS_CAT = 2;
export const FACT_ACTIVIDAD = {sedentario:1.2,ligero:1.375,moderado:1.55,alto:1.725,atleta:1.9};
export const FACT_OBJETIVO  = {perder_grasa:-0.15,mantener:0,ganar_musculo:0.10,rendimiento:0.05};
export const FACT_MACRO = {
  perder_grasa:{p:2.0,g:0.8},
  mantener:{p:1.6,g:0.9},
  ganar_musculo:{p:1.8,g:0.9},
  rendimiento:{p:1.6,g:1.0}
};
export const OBJ_LABEL = {perder_grasa:'Perder grasa',mantener:'Mantener',ganar_musculo:'Ganar músculo',rendimiento:'Rendimiento'};
export const CATS = ['proteina','grasa','carbohidrato','vegetal'];
export const CAT_LABEL = {proteina:'Proteína',grasa:'Grasa saludable',carbohidrato:'Carbohidrato',vegetal:'Vegetal'};
// PRECIO POR BANDA DE CATEGORÍA (16-sep-2026). Sustituye a la "fórmula de la casa"
// (coste × 1.40 / 0.85), que dejaba un food cost del 61 % y las proteínas entre $24
// y $82. Cada categoría se cobra alrededor de su coste medio al food cost objetivo
// del modelo de costos v2, y solo una fracción de la diferencia de coste entre
// módulos pasa al precio: las proteínas quedan en $144 / $168 / $173 en vez de
// $90 / $187 / $209, y el plato medio en $231 (el modelo dice $233).
export const FOOD_COST_OBJETIVO = 0.32;
export const PASO_DIFERENCIA_COSTE = 0.25;
