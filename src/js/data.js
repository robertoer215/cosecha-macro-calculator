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
  {cat:'proteina',id:'P01',nombre:'Pollo al cilantro y limón',g:150,kcal:165,prot:31,carb:0,gras:3.5,pKg:95,img:'pollo.jpg'},
  {cat:'proteina',id:'P02',nombre:'Salmón al pastor con achiote',g:130,kcal:240,prot:28,carb:2,gras:13,pKg:380,img:'salmon.jpg'},
  {cat:'proteina',id:'P03',nombre:'Tenderloin al mole verde',g:150,kcal:210,prot:33,carb:1,gras:8,pKg:320,img:'tenderloin.jpg'},
  {cat:'grasa',id:'G01',nombre:'Guacamole artesanal',g:60,kcal:96,prot:1,carb:5,gras:9,pKg:55,img:'guacamole.jpg',foco:'51% 34%'},
  {cat:'grasa',id:'G02',nombre:'Nueces con chile piquín',g:25,kcal:165,prot:4,carb:3,gras:16,pKg:280,img:'nueces-piquin.jpg',foco:'38% 31%'},
  {cat:'grasa',id:'G03',nombre:'Semillas de girasol tostadas',g:20,kcal:115,prot:4,carb:4,gras:10,pKg:90,img:'semillas.jpg',foco:'38% 48%'},
  {cat:'carbohidrato',id:'C01',nombre:'Arroz con edamame y granada',g:120,kcal:147,prot:3,carb:28,gras:2.6,pKg:85,img:'arroz-edamame.jpg',foco:'44% 45%'},
  {cat:'carbohidrato',id:'C02',nombre:'Camote asado con chile ancho',g:130,kcal:208,prot:3,carb:32,gras:7.5,pKg:25,img:'camote.jpg',foco:'43% 45%'},
  {cat:'carbohidrato',id:'C03',nombre:'Esquites con yogur y feta',g:100,kcal:124,prot:5,carb:14,gras:5.3,pKg:70,img:'esquites.jpg',foco:'51% 47%'},
  {cat:'vegetal',id:'V01',nombre:'Brócoli al carbón sobre tzatziki',g:120,kcal:75,prot:5,carb:9,gras:2,pKg:40,img:'brocoli.jpg'},
  {cat:'vegetal',id:'V02',nombre:'Espárragos asados con limón',g:100,kcal:35,prot:4,carb:5,gras:0.5,pKg:120,img:'esparragos.jpg'},
  {cat:'vegetal',id:'V03',nombre:'Ensalada de nopal con jitomate',g:110,kcal:45,prot:2,carb:8,gras:0.5,pKg:20,img:'nopal.jpg'},
  {cat:'vegetal',id:'V04',nombre:'Verduras tatemadas con cacahuate',g:120,kcal:90,prot:3,carb:10,gras:4,pKg:45,img:'verduras-tatemadas.jpg',foco:'52% 47%'},
];
export const IMG_DIR = 'assets/ingredientes/';
export const SIZES = [{k:0.5,l:'Pequeña'},{k:1,l:'Estándar'},{k:1.5,l:'Grande'}];
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
export const COSTOS_OPERATIVOS = 1.40;
export const MARGEN_DIVISOR = 0.85;
