// Postres de COSECHA — isomorfo a ING en data.js.
// Línea de mostrador: plant-based, sin gluten y sin azúcar refinada añadida.
// costo = suma del escandallo de docs/RECETARIO_POSTRES.md
// precio = ceil(costo * COSTOS_OPERATIVOS / MARGEN_DIVISOR), la fórmula de la casa.
export const POS = [
  {cat:'postre', sub:'galleta', id:'PS01', nombre:"Chocolate Chip Cookie", g:65, kcal:346, prot:4, carb:35, gras:20.9, costo:11.83, precio:20, receta:'PS-01', alergenos:["Frutos secos (almendra)","Ajonjolí: no lleva, pero se produce en obrador que maneja tahini — declarar por contaminación cruzada","Soya (lecitina de la cobertura de chocolate)","Sin gluten certificado","Sin lácteo, sin huevo"], objetivo:null, vegano:true, sinGluten:true},
  {cat:'postre', sub:'galleta', id:'PS02', nombre:"Raspberry & Pistachio Cookie", g:65, kcal:326, prot:5, carb:32, gras:19.7, costo:21.04, precio:35, receta:'PS-02', alergenos:["Frutos secos (almendra, pistacho)","Ajonjolí por contaminación cruzada de obrador","Sin gluten certificado","Sin lácteo, sin huevo"], objetivo:null, vegano:true, sinGluten:true},
  {cat:'postre', sub:'pan', id:'PS03', nombre:"Banana Bread", g:95, kcal:320, prot:5, carb:36, gras:17.2, costo:9.82, precio:17, receta:'PS-03', alergenos:["Frutos secos (almendra, nuez)","Ajonjolí por contaminación cruzada de obrador","Cereal: avena certificada sin gluten","Sin lácteo, sin huevo"], objetivo:null, vegano:true, sinGluten:true},
  {cat:'postre', sub:'pastel', id:'PS04', nombre:"Carrot Chai Cake", g:110, kcal:427, prot:8, carb:37, gras:27.8, costo:15.99, precio:27, receta:'PS-04', alergenos:["Frutos secos (almendra, nuez, anacardo)","Semillas (pepita)","Ajonjolí por contaminación cruzada de obrador","Sin gluten certificado","Sin lácteo, sin huevo"], objetivo:null, vegano:true, sinGluten:true},
  {cat:'postre', sub:'pastel', id:'PS05', nombre:"Marbled Chocolate & Tahini Cake", g:105, kcal:429, prot:9, carb:40, gras:26.1, costo:17.79, precio:30, receta:'PS-05', alergenos:["AJONJOLÍ (tahini) — alérgeno de declaración obligatoria y el que más se olvida","Frutos secos (almendra)","Sin gluten certificado","Sin lácteo, sin huevo"], objetivo:null, vegano:true, sinGluten:true},
];
export const POS_SUB_LABEL = {galleta:'Galletas', pan:'Panes', pastel:'Pasteles'};
