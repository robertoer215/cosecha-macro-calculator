// Postres de COSECHA — isomorfo a ING en data.js.
// costo = suma del escandallo de docs/RECETARIO_POSTRES.md
// precio = ceil(costo * COSTOS_OPERATIVOS / MARGEN_DIVISOR), la fórmula de la casa.
// 'receta' apunta al encabezado de la ficha en el recetario.
export const POS = [
  {cat:'postre', sub:'cuchara', id:'PS01', nombre:"Cremoso de cacao 72%, aceite de oliva y sal", g:175, kcal:500, prot:20, carb:30, gras:33, costo:31.84, precio:53, receta:'PS-01', alergenos:["leche (requesón, leche, crema, caseína, mantequilla)","frutos secos (almendra)","semillas (girasol)","soya (lecitina de la cobertura)"], objetivo:null},
  {cat:'postre', sub:'frio', id:'PS02', nombre:"Cheesecake frío de vainilla y maracuyá sobre crumble de pepita y nuez", g:213, kcal:527, prot:25, carb:32, gras:33.2, costo:33.77, precio:56, receta:'PS-02', alergenos:["leche (requesón, queso crema, yogur griego, aislado de suero)","frutos secos (nuez)","semillas (pepita, girasol)","coco (clasificado como fruto seco por la FDA; declarar en carta)"], objetivo:'recuperacion'},
  {cat:'postre', sub:'horno', id:'PS03', nombre:"Sticky toffee de dátil y nuez, tibio", g:170, kcal:573, prot:14, carb:34, gras:42.2, costo:33.61, precio:56, receta:'PS-03', alergenos:["leche (mantequilla, crema, yogur, caseína)","huevo","frutos secos (almendra, nuez)"], objetivo:'volumen'},
  {cat:'postre', sub:'cuchara', id:'PS04', nombre:"Mousse de mamey, pepita caramelizada y lima", g:182, kcal:281, prot:22, carb:26, gras:9.7, costo:23.28, precio:39, receta:'PS-04', alergenos:["leche (yogur griego, aislado de suero)","huevo (clara pasteurizada)","semillas (pepita)"], objetivo:'definicion'},
  {cat:'postre', sub:'barra', id:'PS05', nombre:"Barra de dátil, nuez y cacao 72%", g:91, kcal:408, prot:14, carb:32, gras:24.6, costo:24.59, precio:41, receta:'PS-05', alergenos:["frutos secos (nuez)","semillas (pepita)","coco","leche (aislado de suero; la cobertura puede contener trazas)","soya (lecitina de la cobertura)"], objetivo:'recuperacion'},
];
export const POS_SUB_LABEL = {frio:'Frío', cuchara:'De cuchara', horno:'De horno', barra:'Barra'};
