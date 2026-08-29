# Insumos — COSECHA

Consolidado de **todos** los insumos que aparecen en las 24 fichas (19 bebidas + 5 postres) y en el add-on de proteína, incluyendo los de sub-recetas. Es la lista de compra y, más útil, el mapa de dependencias: qué insumo sostiene qué receta.

## Resumen

| | |
|---|---:|
| Nombres de insumo distintos | 153 |
| Ya existen en `js/data.js` | 4 |
| Precio `[SUPUESTO]` sin confirmar | 149 |
| Sostienen **una sola** receta | 94 |
| Aparecen en 5 o más recetas | 15 |

> **149 de 153 precios son `[SUPUESTO]`.** Solo cuatro insumos vienen de una fuente real del proyecto. Ninguna cifra de compra de este documento debe usarse para negociar con proveedor sin cotizar primero: sirven para dimensionar el escandallo, no para cerrar una orden.

## Antes de comprar: normalizar SKU

Los 153 nombres NO son 153 productos. Distintas fichas llamaron al mismo insumo de formas distintas y le pusieron precios distintos. Hay que unificarlos antes de dar de alta el catálogo, o el escandallo quedará inconsistente entre recetas.

| producto real | variantes de nombre | rango de precio | dispersión |
|---|---:|---|---:|
| Monk fruit / mogrósido | 7 | $14.99 – $4000.00 /kg | **266.8×** |
| Vainilla de Papantla | 6 | $45.01 – $6000.00 /kg | **133.3×** |
| Sal | 3 | $16.00 – $240.00 /kg | **15.0×** |
| Cacao | 7 | $166.95 – $350.00 /kg | **2.1×** |
| Dátil | 10 | $133.18 – $252.04 /kg | **1.9×** |
| Aislado de suero | 3 | $450.00 – $780.00 /kg | **1.7×** |
| Agua purificada | 8 | $2.00 – $2.50 /kg | **1.3×** |
| Matcha | 2 | $3200.00 – $3800.00 /kg | **1.2×** |
| Hielo | 2 | $2.00 – $2.00 /kg | **1.0×** |

El caso peor es el monk fruit: el mismo extracto cotizado entre $2 500 y $4 000/kg según la ficha. Pesa poco en el vaso (menos de $0.10 por bebida), así que no mueve el escandallo — pero sí revela que **ninguna de las dos cifras está verificada**.

## Insumos que sostienen una sola receta

94 insumos de 153 entran en una única ficha. Cada uno es un SKU que hay que comprar, almacenar, rotar y mermar para vender un solo producto. Son los primeros candidatos a recortar si la v1 abre con menos referencias.

| insumo | precio | receta única | familia |
|---|---:|---|---|
| Vainilla de Papantla en vaina | $6000.00 | BE-14® → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (sub-receta) | Especias y extractos |
| Vainilla de Papantla, vaina entera molida (sin azúcar) | $5000.00 | ADD-ON | Especias y extractos |
| Monk fruit puro en polvo (mogrósido V) | $4000.00 | PS-01® → Cremoso de cacao 72% con requesón (sub-receta) | Endulzantes |
| Matcha culinario grado premium | $3800.00 | BE-18® | Café y té |
| Extracto puro de monk fruit (mogrósido V ≥50%) | $3500.00 | ADD-ON | Endulzantes |
| Matcha ceremonial japones (Uji o Kagoshima), grado bebida | $3200.00 | BE-12® | Café y té |
| Extracto de monk fruit (mogrosido V 50%) | $2500.00 | BE-15® → Solucion de monk fruit 0.5% (sub-receta) | Endulzantes |
| Cardamomo verde en vaina, majado | $1200.00 | BE-13® → Concentrado de chai COSECHA (sub-receta) | Especias y extractos |
| Canela de Ceilán en raja | $900.00 | BE-06® → Jarabe de piloncillo y canela (sub-receta) | Especias y extractos |
| Proteina aislada de chicharo, sin sabor | $520.00 | BE-18® | Otros |
| Aislado de proteína de suero WPI 90 sin sabor, instantizado con lecitina de girasol | $450.00 | ADD-ON | Lácteos y huevo |
| Te negro Assam a granel, hoja rota | $450.00 | BE-13® → Concentrado de chai COSECHA (sub-receta) | Café y té |
| Anis estrella entero | $420.00 | BE-13® → Concentrado de chai COSECHA (sub-receta) | Otros |
| Canela de Ceylan molida al momento (servicio) | $420.00 | BE-14® | Especias y extractos |
| Clavo de olor entero | $380.00 | BE-13® → Concentrado de chai COSECHA (sub-receta) | Especias y extractos |
| Arándano azul IQF (congelado) | $300.00 | BE-01® → Infusión fría de arándano y romero (sub-receta) | Fruta y verdura |
| Nuez (base G02 de data.js, sin chile piquin) | $280.00 | BE-14® → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (sub-receta) | Secos y semillas |
| Nuez de Castilla molida | $280.00 | PS-03® → Bizcocho húmedo de dátil y nuez (sub-receta) | Secos y semillas |
| Extracto natural de vainilla | $260.00 | BE-18® | Especias y extractos |
| Pimienta negra entera | $260.00 | BE-13® → Concentrado de chai COSECHA (sub-receta) | Otros |
| Masa de barra de dátil, nuez y cacao [sub-receta] | $252.04 | PS-05® | Café y té |
| Cacao en polvo natural sin azucar | $240.00 | BE-16® | Café y té |
| Bizcocho húmedo de dátil y nuez [sub-receta] | $220.48 | PS-03® | Fruta y verdura |
| Crumble de girasol, almendra y cacao [sub-receta] | $218.48 | PS-01® | Café y té |
| Base prensada de pepita, nuez y girasol [sub-receta] | $210.36 | PS-02® | Secos y semillas |

*(Se listan los 25 más caros de los 94; el resto está en la tabla completa abajo, identificable por la columna "recetas" = 1.)*

## Catálogo completo por familia de proveedor

### Café y té — 14 insumos

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | fuente |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Cafe de especialidad en grano, origen Veracruz / Sierra Norte de Puebla, tueste medio | $380.00 | 9 | 5 | 18 | 0.24 | 3.3 | 0.36 | `[SUPUESTO]` |
| Cacao natural en polvo sin azúcar | $240.00 | 2 | 3 | 300.5 | 19.6 | 24.7 | 13.7 | `[SUPUESTO]` |
| Cafe de especialidad en grano, origen Veracruz / Sierra Norte de Puebla, molienda gruesa | $380.00 | 8 | 2 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Cobertura de cacao 72% | $350.00 | 2–5 | 2 | 554.6 | 7.8 | 35 | 42.6 | `[SUPUESTO]` |
| Concentrado de cold brew COSECHA (sub-receta) | $86.11 | 2 | 2 | 3.6 | 0.05 | 0.67 | 0.07 | `[SUPUESTO]` |
| Nibs de cacao tostados | $350.00 | 2 | 2 | 464.6 | 10.7 | 8.7 | 43 | `[SUPUESTO]` |
| Cacao en polvo natural sin azucar | $240.00 | 0 | 1 | 228 | 19.6 | 57.9 | 13.7 | `[SUPUESTO]` |
| Concentrado de chai COSECHA (sub-receta) | $69.37 | 3 | 1 | 34 | 0.25 | 8.1 | 0.03 | `[SUPUESTO]` |
| Cremoso de cacao 72% con requesón [sub-receta] | $166.95 | 2 | 1 | 221.4 | 11.48 | 16.94 | 11.97 | `[SUPUESTO]` |
| Crumble de girasol, almendra y cacao [sub-receta] | $218.48 | 3 | 1 | 575.2 | 15.33 | 24.43 | 46.24 | `[SUPUESTO]` |
| Masa de barra de dátil, nuez y cacao [sub-receta] | $252.04 | 0 | 1 | 431.5 | 17.02 | 36.37 | 24.22 | `[SUPUESTO]` |
| Matcha ceremonial japones (Uji o Kagoshima), grado bebida | $3200.00 | 0 | 1 | 177 | 29 | 4 | 5 | `[SUPUESTO]` |
| Matcha culinario grado premium | $3800.00 | 0 | 1 | 297 | 29 | 39 | 5.3 | `[SUPUESTO]` |
| Te negro Assam a granel, hoja rota | $450.00 | 4 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |

### Lácteos y huevo — 23 insumos

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | fuente |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Aislado de proteina de suero, sin sabor | $780.00 | 0 | 4 | 373 | 86 | 5 | 1 | `[SUPUESTO]` |
| Leche entera pasteurizada 3.3% grasa | $26.00 | 6–10 | 4 | 63 | 3.3 | 4.9 | 3.4 | `[SUPUESTO]` |
| Aislado de suero sin sabor | $550.00 | 0 | 3 | 369 | 88 | 2 | 1 | `[SUPUESTO]` |
| Crema para batir 35% grasa | $95.00 | 2 | 3 | 335 | 2.1 | 2.9 | 35 | `[SUPUESTO]` |
| Mantequilla sin sal | $140.00 | 2 | 3 | 733 | 0.9 | 0.1 | 81 | `[SUPUESTO]` |
| Caseína micelar sin sabor | $600.00 | 0 | 2 | 361.5 | 82 | 5 | 1.5 | `[SUPUESTO]` |
| Clara de huevo pasteurizada | $60.00 | 0 | 2 | 48.2 | 10.9 | 0.7 | 0.2 | `[SUPUESTO]` |
| Leche descremada pasteurizada | $26.00 | 0 | 2 | 35 | 3.4 | 5 | 0.1 | `[SUPUESTO]` |
| Leche entera | $26.00 | 0 | 2 | 61.7 | 3.2 | 4.8 | 3.3 | `[SUPUESTO]` |
| Requesón fresco pasteurizado | $95.00 | 0 | 2 | 140.5 | 11.5 | 4.5 | 8.5 | `[SUPUESTO]` |
| Yogur griego colado 12 h | $90.00 | 30 | 2 | 104.3 | 14.3 | 5.7 | 2.7 | `[SUPUESTO]` |
| Yogur griego natural sin azúcar | $90.00 | 2 | 2 | 73.1 | 10 | 4 | 1.9 | `[SUPUESTO]` |
| Aislado de proteína de suero WPI 90 sin sabor, instantizado con lecitina de girasol | $450.00 | 3 | 1 | 372 | 90 | 1.5 | 0.7 | `[SUPUESTO]` |
| Crema batida de canela y yogur colado [sub-receta] | $121.46 | 3 | 1 | 272.2 | 5.28 | 3.82 | 26.2 | `[SUPUESTO]` |
| Crema de cacahuate 100% (un solo ingrediente) | $190.00 | 0 | 1 | 588 | 25.09 | 19.56 | 50.39 | `[SUPUESTO]` |
| Crema de coco 22-23% grasa en lata, sin azucar anadida | $120.00 | 3 | 1 | 240 | 2.3 | 6 | 23 | `[SUPUESTO]` |
| Huevo entero | $48.00 | 12 | 1 | 138.7 | 12.6 | 0.7 | 9.5 | `[SUPUESTO]` |
| Leche de pepita (sub-receta) | $21.68 | 0 | 1 | 40 | 1.94 | 0.96 | 3.19 | `[SUPUESTO]` |
| Leche entera pasteurizada | $24.00 | 0 | 1 | 61 | 3.15 | 4.78 | 3.25 | `[SUPUESTO]` |
| Queso crema | $125.00 | 2 | 1 | 356.4 | 6.2 | 5.5 | 34.4 | `[SUPUESTO]` |
| Relleno de cheesecake de requesón y vainilla [sub-receta] | $136.01 | 2 | 1 | 182.4 | 12.16 | 10.94 | 10 | `[SUPUESTO]` |
| Requeson descremado | $130.00 | 0 | 1 | 130 | 11 | 3 | 9 | `[SUPUESTO]` |
| Yogur griego natural 0% grasa, sin azucar | $145.00 | 0 | 1 | 59 | 10.19 | 3.6 | 0.39 | `[SUPUESTO]` |

### Fruta y verdura — 45 insumos

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | fuente |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Dátil Medjool deshuesado | $210.00 | 3 | 8 | 282.2 | 1.8 | 68.3 | 0.2 | `[SUPUESTO]` |
| Jugo de limón mexicano | $45.00 | 62 | 5 | 25 | 0.42 | 8.42 | 0.07 | `[SUPUESTO]` |
| Jugo de limón mexicano recién exprimido | $45.00 | 62 | 5 | 25 | 0.42 | 8.42 | 0.07 | `[SUPUESTO]` |
| Datil deglet noor sin hueso | $180.00 | 6 | 4 | 282 | 2.5 | 67 | 0.4 | `[SUPUESTO]` |
| Datil medjool deshuesado | $220.00 | 12 | 3 | 277 | 1.81 | 74.97 | 0.15 | `[SUPUESTO]` |
| Jugo de limon recien exprimido | $35.00 | 0 | 3 | 25 | 0.4 | 8.6 | 0.2 | `[SUPUESTO]` |
| Pasta de datil (sub-receta) | $133.18 | 0 | 3 | 146.3 | 0.96 | 39.58 | 0.08 | `[SUPUESTO]` |
| Platano Tabasco congelado (pulpa) | $18.00 | 35 | 3 | 89 | 1.09 | 22.84 | 0.33 | `[SUPUESTO]` |
| Aceite de coco virgen | $160.00 | 1 | 2 | 900 | 0 | 0 | 100 | `[SUPUESTO]` |
| Agua de coco natural (envase UHT sin azucar) | $45.00 | 0 | 2 | 19 | 0.72 | 3.71 | 0.2 | `[SUPUESTO]` |
| Jarabe de datil COSECHA (sub-receta) | $141.45 | 2 | 2 | 165 | 1.1 | 40 | 0.15 | `[SUPUESTO]` |
| Jugo de limón | $32.00 | 60 | 2 | 30.2 | 0.4 | 6.7 | 0.2 | `[SUPUESTO]` |
| Arándano azul IQF (congelado) | $300.00 | 0 | 1 | 57 | 0.74 | 14.5 | 0.33 | `[SUPUESTO]` |
| Base de nube de coco COSECHA (sub-receta) | $124.95 | 3 | 1 | 236 | 2.2 | 8 | 21.6 | `[SUPUESTO]` |
| Bebida de coco SIN azucares anadidos, <=1.5 g de carbohidrato/100 ml, sin jarabe de glucosa ni maltodextrina (verificar etiqueta en cada compra) | $75.00 | 2 | 1 | 28 | 0.2 | 1.2 | 2.4 | `[SUPUESTO]` |
| Bizcocho húmedo de dátil y nuez [sub-receta] | $220.48 | 8 | 1 | 355.3 | 12 | 25.59 | 22.77 | `[SUPUESTO]` |
| Cáscara de naranja en tira (guarnición) | $22.00 | 88 | 1 | 97 | 1.5 | 25 | 0.2 | `[SUPUESTO]` |
| Cáscara de naranja sin albedo | $22.00 | 88 | 1 | 97 | 1.5 | 25 | 0.2 | `[SUPUESTO]` |
| Coco rallado deshidratado sin azúcar, tostado | $150.00 | 2 | 1 | 637.7 | 6.9 | 7.4 | 64.5 | `[SUPUESTO]` |
| Coulis de maracuyá [sub-receta] | $165.48 | 3 | 1 | 112.7 | 1.72 | 25.37 | 0.48 | `[SUPUESTO]` |
| Flor de jamaica seca | $130.00 | 0 | 1 | 300 | 4 | 70 | 1 | `[SUPUESTO]` |
| Frambuesa congelada IQF | $180.00 | 0 | 1 | 52 | 1.2 | 11.94 | 0.65 | `[SUPUESTO]` |
| Fresa congelada IQF (despuntada) | $70.00 | 5 | 1 | 32 | 0.67 | 7.68 | 0.3 | `[SUPUESTO]` |
| Fresa fresca | $60.00 | 6 | 1 | 32 | 0.67 | 7.68 | 0.3 | `[SUPUESTO]` |
| Fresa fresca laminada (guarnición) | $60.00 | 6 | 1 | 32 | 0.67 | 7.68 | 0.3 | `[SUPUESTO]` |
| Infusión fría de arándano y romero (sub-receta) | $65.30 | 0 | 1 | 8 | 0.11 | 2 | 0.04 | `[SUPUESTO]` |
| Infusión fría de fresa y jengibre (sub-receta) | $23.44 | 0 | 1 | 8 | 0.15 | 1.85 | 0.06 | `[SUPUESTO]` |
| Infusión fría de jamaica y naranja (sub-receta) | $12.33 | 0 | 1 | 6 | 0.1 | 1.4 | 0 | `[SUPUESTO]` |
| Jarabe de datil COSECHA (sub-receta de esta misma ficha) | $140.91 | 2 | 1 | 165 | 1.1 | 40 | 0.15 | `[SUPUESTO]` |
| Jarabe de datil COSECHA (sub-receta documentada en BE-11 y BE-12) | $140.91 | 2 | 1 | 165 | 1.1 | 40 | 0.15 | `[SUPUESTO]` |
| Jengibre fresco | $70.00 | 15 | 1 | 80 | 1.82 | 17.77 | 0.75 | `[SUPUESTO]` |
| Jengibre fresco pelado y rallado | $85.00 | 12 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Jugo de lima | $32.00 | 60 | 1 | 30.2 | 0.4 | 6.7 | 0.2 | `[SUPUESTO]` |
| Jugo de pepino prensado en frío | $18.00 | 38 | 1 | 14 | 0.6 | 3.2 | 0.1 | `[SUPUESTO]` |
| Jugo de piña recién prensado | $18.00 | 67 | 1 | 53 | 0.36 | 12.87 | 0.12 | `[SUPUESTO]` |
| Jugo de toronja roja recién exprimido | $25.00 | 55 | 1 | 39 | 0.5 | 9.2 | 0.1 | `[SUPUESTO]` |
| Jugo y ralladura de lima | $32.00 | 60 | 1 | 30.2 | 0.4 | 6.7 | 0.2 | `[SUPUESTO]` |
| Mamey (pulpa congelada IQF) | $55.00 | 40 | 1 | 124 | 1.45 | 32.1 | 0.46 | `[SUPUESTO]` |
| Mango Ataulfo en cubos congelados | $38.00 | 40 | 1 | 60 | 0.82 | 15 | 0.38 | `[SUPUESTO]` |
| Mousse aireada de mamey [sub-receta] | $116.34 | 2 | 1 | 109.6 | 10.34 | 15.01 | 0.91 | `[SUPUESTO]` |
| Pepino en rodaja (guarnición) | $18.00 | 5 | 1 | 15 | 0.65 | 3.63 | 0.11 | `[SUPUESTO]` |
| Pulpa de mamey | $55.00 | 35 | 1 | 117.3 | 1.5 | 26.7 | 0.5 | `[SUPUESTO]` |
| Pulpa de maracuyá congelada sin azúcar | $140.00 | 0 | 1 | 74.1 | 1.6 | 15.8 | 0.5 | `[SUPUESTO]` |
| Ralladura de toronja (guarnición) | $25.00 | 90 | 1 | 42 | 0.77 | 10.66 | 0.14 | `[SUPUESTO]` |
| Salsa toffee de dátil [sub-receta] | $140.60 | 3 | 1 | 270.3 | 1.37 | 23.66 | 18.91 | `[SUPUESTO]` |

### Herbáceos frescos — 8 insumos

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | fuente |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Hierbabuena fresca | $90.00 | 25 | 2 | 44 | 3.29 | 8.41 | 0.73 | `[SUPUESTO]` |
| Hierbabuena fresca (guarnición, 1 ramita) | $90.00 | 0 | 2 | 44 | 3.29 | 8.41 | 0.73 | `[SUPUESTO]` |
| Infusión fría de hierbabuena (sub-receta) | $5.65 | 0 | 2 | 0.1 | 0.01 | 0.01 | 0 | `[SUPUESTO]` |
| Albahaca genovesa en hoja (guarnición) | $120.00 | 0 | 1 | 23 | 3.15 | 2.65 | 0.64 | `[SUPUESTO]` |
| Albahaca genovesa fresca | $120.00 | 25 | 1 | 23 | 3.15 | 2.65 | 0.64 | `[SUPUESTO]` |
| Infusión fría de albahaca (sub-receta) | $5.50 | 0 | 1 | 0.1 | 0.01 | 0.01 | 0 | `[SUPUESTO]` |
| Romero fresco | $120.00 | 30 | 1 | 131 | 3.31 | 20.7 | 5.86 | `[SUPUESTO]` |
| Romero fresco (guarnición, 1 rama) | $120.00 | 0 | 1 | 131 | 3.31 | 20.7 | 5.86 | `[SUPUESTO]` |

### Secos y semillas — 15 insumos

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | fuente |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Nuez de Castilla tostada | $280.00 | 3 | 3 | 675.6 | 15.2 | 7 | 65.2 | `data.js` |
| Harina de almendra | $320.00 | 2 | 2 | 570.3 | 21.2 | 9.1 | 49.9 | `[SUPUESTO]` |
| Pepita verde sin cáscara tostada | $190.00 | 3 | 2 | 593 | 29.8 | 8.2 | 49 | `[SUPUESTO]` |
| Semillas de girasol tostadas | $90.00 | 0 | 2 | 592.3 | 20.8 | 11.4 | 51.5 | `data.js` |
| Avena en hojuelas | $32.00 | 0 | 1 | 389 | 16.89 | 66.27 | 6.9 | `[SUPUESTO]` |
| Base prensada de pepita, nuez y girasol [sub-receta] | $210.36 | 3 | 1 | 548.1 | 15.83 | 22.97 | 43.66 | `[SUPUESTO]` |
| Chía hidratada COSECHA 1:8 (sub-receta) | $17.76 | 0 | 1 | 54 | 1.83 | 4.68 | 3.41 | `[SUPUESTO]` |
| Chía seca | $140.00 | 0 | 1 | 486 | 16.5 | 42.1 | 30.7 | `[SUPUESTO]` |
| Nuez (base G02 de data.js, sin chile piquin) | $280.00 | 5 | 1 | 660 | 16 | 12 | 64 | `data.js` |
| Nuez de Castilla molida | $280.00 | 3 | 1 | 675.6 | 15.2 | 7 | 65.2 | `data.js` |
| Pepita caramelizada con agave y sal [sub-receta] | $205.35 | 2 | 1 | 588.2 | 26.88 | 22.2 | 43.54 | `[SUPUESTO]` |
| Pepita de calabaza tostada sin cascara | $190.00 | 0 | 1 | 574 | 29.84 | 14.71 | 49.05 | `[SUPUESTO]` |
| Pepita de calabaza verde sin cascara | $190.00 | 0 | 1 | 574 | 29.84 | 14.71 | 49.05 | `[SUPUESTO]` |
| Pepita verde sin cáscara | $190.00 | 3 | 1 | 593 | 29.8 | 8.2 | 49 | `[SUPUESTO]` |
| Pepita verde tostada | $190.00 | 3 | 1 | 593 | 29.8 | 8.2 | 49 | `[SUPUESTO]` |

### Endulzantes — 11 insumos

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | fuente |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Monk fruit puro en polvo (mogrósido V ≥50%) | $3800.00 | 0 | 6 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Jarabe COSECHA agave + monk fruit (sub-receta) | $39.43 | 0 | 5 | 47 | 0 | 11.5 | 0.07 | `[SUPUESTO]` |
| Miel de agave orgánica | $180.00 | 0 | 5 | 310 | 0.09 | 76.4 | 0.45 | `[SUPUESTO]` |
| Monk fruit puro en polvo | $4000.00 | 0 | 5 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Jarabe de agave | $105.00 | 1 | 2 | 309.7 | 0.1 | 76.2 | 0.5 | `[SUPUESTO]` |
| Extracto de monk fruit (mogrosido V 50%) | $2500.00 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Extracto puro de monk fruit (mogrósido V ≥50%) | $3500.00 | 8 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Jarabe de piloncillo y canela (sub-receta) | $39.85 | 0 | 1 | 122 | 0.2 | 30.7 | 0.03 | `[SUPUESTO]` |
| Monk fruit puro en polvo (mogrósido V) | $4000.00 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Piloncillo | $55.00 | 0 | 1 | 380 | 0.5 | 96 | 0.1 | `[SUPUESTO]` |
| Solucion de monk fruit 0.5% (sub-receta) | $14.99 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |

### Especias y extractos — 15 insumos

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | fuente |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Sal de mar fina | $18.00–45.00 | 0–2 | 13 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Sal fina de mar | $16.00 | 0 | 7 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Extracto de vainilla de Papantla | $1800.00 | 1 | 6 | 51.7 | 0.1 | 12.6 | 0.1 | `[SUPUESTO]` |
| Sal de mar en escamas | $240.00 | 0 | 5 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Canela de Ceylán molida | $900.00 | 1 | 4 | 136.8 | 4 | 27.5 | 1.2 | `[SUPUESTO]` |
| Canela de Ceylan en rama | $420.00 | 0 | 2 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Canela molida | $320.00 | 0 | 2 | 247 | 3.99 | 80.6 | 1.24 | `[SUPUESTO]` |
| Canela de Ceilán en raja | $900.00 | 0 | 1 | 247 | 4 | 80.6 | 1.24 | `[SUPUESTO]` |
| Canela de Ceylan molida al momento (servicio) | $420.00 | 0 | 1 | 139 | 4 | 28 | 1.2 | `[SUPUESTO]` |
| Cardamomo verde en vaina, majado | $1200.00 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Clavo de olor entero | $380.00 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Extracto natural de vainilla | $260.00 | 0 | 1 | 288 | 0.06 | 12.65 | 0.06 | `[SUPUESTO]` |
| Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (sub-receta) | $45.01 | 3 | 1 | 50 | 0.8 | 8.2 | 1.6 | `[SUPUESTO]` |
| Vainilla de Papantla en vaina | $6000.00 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Vainilla de Papantla, vaina entera molida (sin azúcar) | $5000.00 | 3 | 1 | 288 | 0.1 | 12.7 | 0.06 | `[SUPUESTO]` |

### Agua y hielo — 12 insumos

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | fuente |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Agua purificada de garrafón | $2.50 | 0 | 13 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Hielo de agua purificada | $2.00 | 0 | 9 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Hielo | $2.00 | 0 | 5 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Agua filtrada | $2.50 | 0 | 4 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Agua purificada | $2.50 | 0 | 4 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Agua purificada a 80 C | $2.50 | 0 | 3 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Agua purificada caliente | $2.50 | 0 | 3 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Agua purificada filtrada | $2.50 | 0 | 2 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Agua hirviendo | $2.50 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Agua mineral de servicio | $12.00 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Agua purificada a 75 C | $2.50 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Agua purificada fria | $2.50 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |

### Otros — 10 insumos

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | fuente |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Acido citrico grado alimenticio | $120.00 | 0 | 3 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Grenetina en polvo 220 bloom | $360.00 | 1 | 2 | 343.3 | 85.6 | 0 | 0.1 | `[SUPUESTO]` |
| Aceite de oliva extra virgen | $200.00 | 1 | 1 | 900 | 0 | 0 | 100 | `[SUPUESTO]` |
| Anis estrella entero | $420.00 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Arroz blanco de grano largo, crudo | $24.00 | 2 | 1 | 360 | 6.6 | 79 | 0.6 | `[SUPUESTO]` |
| Bicarbonato de sodio | $60.00 | 1 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Bicarbonato de sodio grado alimenticio | $30.00 | 2 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Pimienta negra entera | $260.00 | 0 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Polvo para hornear | $110.00 | 1 | 1 | 0 | 0 | 0 | 0 | `[SUPUESTO]` |
| Proteina aislada de chicharo, sin sabor | $520.00 | 0 | 1 | 368 | 78 | 5 | 4 | `[SUPUESTO]` |

## Dónde entra cada insumo

Mapa de dependencias. Si un insumo falla en el proveedor, estas son las fichas que se caen.

| insumo | recetas afectadas |
|---|---|
| Agua purificada de garrafón | BE-01® → Infusión fría de arándano y romero (sub-receta), BE-01® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-02® → Infusión fría de hierbabuena (sub-receta), BE-02® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-03® → Infusión fría de fresa y jengibre (sub-receta), BE-03® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-04® → Infusión fría de albahaca (sub-receta), BE-04® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-05® → Chía hidratada COSECHA (1:8) (sub-receta), BE-05® → Infusión fría de hierbabuena (sub-receta), BE-05® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-06® → Infusión fría de jamaica y naranja (sub-receta), BE-06® → Jarabe de piloncillo y canela (sub-receta) |
| Sal de mar fina | BE-04®, BE-11® → Base de nube de coco COSECHA (sub-receta), BE-11® → Jarabe de datil COSECHA (sub-receta), BE-12® → Jarabe de datil COSECHA (sub-receta), BE-13® → Concentrado de chai COSECHA (sub-receta), BE-13® → Jarabe de datil COSECHA (sub-receta), BE-14® → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (sub-receta), BE-16®, BE-17®, BE-18®, BE-18® → Leche de pepita (sub-receta), BE-19®, ADD-ON |
| Hielo de agua purificada | BE-01®, BE-02®, BE-03®, BE-04®, BE-05®, BE-06®, BE-10®, BE-11®, BE-14® |
| Dátil Medjool deshuesado | PS-01® → Cremoso de cacao 72% con requesón (sub-receta), PS-01® → Crumble de girasol, almendra y cacao (sub-receta), PS-02® → Base prensada de pepita, nuez y girasol (sub-receta), PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta), PS-02® → Coulis de maracuyá (sub-receta), PS-03® → Bizcocho húmedo de dátil y nuez (sub-receta), PS-03® → Salsa toffee de dátil (sub-receta), PS-05® → Masa de barra de dátil, nuez y cacao (sub-receta) |
| Sal fina de mar | PS-01® → Cremoso de cacao 72% con requesón (sub-receta), PS-01® → Crumble de girasol, almendra y cacao (sub-receta), PS-02® → Base prensada de pepita, nuez y girasol (sub-receta), PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta), PS-03® → Bizcocho húmedo de dátil y nuez (sub-receta), PS-04® → Mousse aireada de mamey (sub-receta), PS-05® → Masa de barra de dátil, nuez y cacao (sub-receta) |
| Extracto de vainilla de Papantla | PS-01® → Cremoso de cacao 72% con requesón (sub-receta), PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta), PS-03® → Bizcocho húmedo de dátil y nuez (sub-receta), PS-03® → Salsa toffee de dátil (sub-receta), PS-03® → Crema batida de canela de Ceylán y yogur colado (sub-receta), PS-04® → Mousse aireada de mamey (sub-receta) |
| Monk fruit puro en polvo (mogrósido V ≥50%) | BE-01® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-02® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-03® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-04® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-05® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-06® → Jarabe de piloncillo y canela (sub-receta) |
| Cafe de especialidad en grano, origen Veracruz / Sierra Norte de Puebla, tueste medio | BE-07®, BE-08®, BE-09®, BE-11®, BE-13® |
| Hielo | BE-15®, BE-16®, BE-17®, BE-18®, BE-19® |
| Jarabe COSECHA agave + monk fruit (sub-receta) | BE-01®, BE-02®, BE-03®, BE-04®, BE-05® |
| Jugo de limón mexicano | BE-01® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-02® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-03® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-04® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-05® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta) |
| Jugo de limón mexicano recién exprimido | BE-01®, BE-02®, BE-03®, BE-04®, BE-05® |
| Miel de agave orgánica | BE-01® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-02® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-03® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-04® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta), BE-05® → Jarabe COSECHA (miel de agave + monk fruit) (sub-receta) |
| Monk fruit puro en polvo | PS-01® → Crumble de girasol, almendra y cacao (sub-receta), PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta), PS-02® → Coulis de maracuyá (sub-receta), PS-03® → Crema batida de canela de Ceylán y yogur colado (sub-receta), PS-04® → Mousse aireada de mamey (sub-receta) |
| Sal de mar en escamas | PS-01®, PS-03®, PS-03® → Salsa toffee de dátil (sub-receta), PS-04® → Pepita caramelizada con agave y sal (sub-receta), PS-05® |
| Agua filtrada | PS-02® → Coulis de maracuyá (sub-receta), PS-03® → Salsa toffee de dátil (sub-receta), PS-04® → Mousse aireada de mamey (sub-receta), PS-05® → Masa de barra de dátil, nuez y cacao (sub-receta) |
| Agua purificada | BE-13® → Concentrado de chai COSECHA (sub-receta), BE-14® → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (sub-receta), BE-15® → Solucion de monk fruit 0.5% (sub-receta), BE-18® → Leche de pepita (sub-receta) |
| Aislado de proteina de suero, sin sabor | BE-15®, BE-16®, BE-17®, BE-19® |
| Canela de Ceylán molida | PS-02® → Base prensada de pepita, nuez y girasol (sub-receta), PS-03® → Crema batida de canela de Ceylán y yogur colado (sub-receta), PS-04® → Pepita caramelizada con agave y sal (sub-receta), PS-05® → Masa de barra de dátil, nuez y cacao (sub-receta) |
| Datil deglet noor sin hueso | BE-11® → Jarabe de datil COSECHA (sub-receta), BE-12® → Jarabe de datil COSECHA (sub-receta), BE-13® → Jarabe de datil COSECHA (sub-receta), BE-14® → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (sub-receta) |
| Leche entera pasteurizada 3.3% grasa | BE-08®, BE-09®, BE-12®, BE-13® |
| Acido citrico grado alimenticio | BE-11® → Jarabe de datil COSECHA (sub-receta), BE-12® → Jarabe de datil COSECHA (sub-receta), BE-13® → Jarabe de datil COSECHA (sub-receta) |
| Agua purificada a 80 C | BE-11® → Jarabe de datil COSECHA (sub-receta), BE-12® → Jarabe de datil COSECHA (sub-receta), BE-13® → Jarabe de datil COSECHA (sub-receta) |
| Agua purificada caliente | BE-16® → Pasta de datil (sub-receta), BE-17® → Pasta de datil (sub-receta), BE-18® → Pasta de datil (sub-receta) |
| Aislado de suero sin sabor | PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta), PS-04® → Mousse aireada de mamey (sub-receta), PS-05® → Masa de barra de dátil, nuez y cacao (sub-receta) |
| Cacao natural en polvo sin azúcar | PS-01® → Cremoso de cacao 72% con requesón (sub-receta), PS-01® → Crumble de girasol, almendra y cacao (sub-receta), PS-05® → Masa de barra de dátil, nuez y cacao (sub-receta) |
| Crema para batir 35% grasa | PS-01® → Cremoso de cacao 72% con requesón (sub-receta), PS-03® → Salsa toffee de dátil (sub-receta), PS-03® → Crema batida de canela de Ceylán y yogur colado (sub-receta) |
| Datil medjool deshuesado | BE-16® → Pasta de datil (sub-receta), BE-17® → Pasta de datil (sub-receta), BE-18® → Pasta de datil (sub-receta) |
| Jugo de limon recien exprimido | BE-15®, BE-17®, BE-18® |
| Mantequilla sin sal | PS-01® → Crumble de girasol, almendra y cacao (sub-receta), PS-03® → Bizcocho húmedo de dátil y nuez (sub-receta), PS-03® → Salsa toffee de dátil (sub-receta) |
| Nuez de Castilla tostada | PS-02® → Base prensada de pepita, nuez y girasol (sub-receta), PS-03®, PS-05® → Masa de barra de dátil, nuez y cacao (sub-receta) |
| Pasta de datil (sub-receta) | BE-16®, BE-17®, BE-18® |
| Platano Tabasco congelado (pulpa) | BE-16®, BE-17®, BE-18® |
| Aceite de coco virgen | PS-02® → Base prensada de pepita, nuez y girasol (sub-receta), PS-05® → Masa de barra de dátil, nuez y cacao (sub-receta) |
| Agua de coco natural (envase UHT sin azucar) | BE-17®, BE-18® |
| Agua purificada filtrada | BE-10® → Concentrado de cold brew COSECHA (sub-receta), BE-14® → Concentrado de cold brew COSECHA (sub-receta) |
| Cafe de especialidad en grano, origen Veracruz / Sierra Norte de Puebla, molienda gruesa | BE-10® → Concentrado de cold brew COSECHA (sub-receta), BE-14® → Concentrado de cold brew COSECHA (sub-receta) |
| Canela de Ceylan en rama | BE-13® → Concentrado de chai COSECHA (sub-receta), BE-14® → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (sub-receta) |
| Canela molida | BE-16®, BE-19® |
| Caseína micelar sin sabor | PS-01® → Cremoso de cacao 72% con requesón (sub-receta), PS-03® → Bizcocho húmedo de dátil y nuez (sub-receta) |
| Clara de huevo pasteurizada | PS-04® → Mousse aireada de mamey (sub-receta), PS-04® → Pepita caramelizada con agave y sal (sub-receta) |
| Cobertura de cacao 72% | PS-01® → Cremoso de cacao 72% con requesón (sub-receta), PS-05® |
| Concentrado de cold brew COSECHA (sub-receta) | BE-10®, BE-14® |
| Grenetina en polvo 220 bloom | PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta), PS-04® → Mousse aireada de mamey (sub-receta) |
| Harina de almendra | PS-01® → Crumble de girasol, almendra y cacao (sub-receta), PS-03® → Bizcocho húmedo de dátil y nuez (sub-receta) |
| Hierbabuena fresca | BE-02® → Infusión fría de hierbabuena (sub-receta), BE-05® → Infusión fría de hierbabuena (sub-receta) |
| Hierbabuena fresca (guarnición, 1 ramita) | BE-02®, BE-05® |
| Infusión fría de hierbabuena (sub-receta) | BE-02®, BE-05® |
| Jarabe de agave | PS-04® → Mousse aireada de mamey (sub-receta), PS-04® → Pepita caramelizada con agave y sal (sub-receta) |
| Jarabe de datil COSECHA (sub-receta) | BE-11®, BE-12® |
| Jugo de limón | PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta), PS-02® → Coulis de maracuyá (sub-receta) |
| Leche descremada pasteurizada | BE-15®, BE-19® |
| Leche entera | PS-01® → Cremoso de cacao 72% con requesón (sub-receta), PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta) |
| Nibs de cacao tostados | PS-01®, PS-05® |
| Pepita verde sin cáscara tostada | PS-02®, PS-02® → Base prensada de pepita, nuez y girasol (sub-receta) |
| Requesón fresco pasteurizado | PS-01® → Cremoso de cacao 72% con requesón (sub-receta), PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta) |
| Semillas de girasol tostadas | PS-01® → Crumble de girasol, almendra y cacao (sub-receta), PS-02® → Base prensada de pepita, nuez y girasol (sub-receta) |
| Yogur griego colado 12 h | PS-03® → Crema batida de canela de Ceylán y yogur colado (sub-receta), PS-04® |
| Yogur griego natural sin azúcar | PS-02® → Relleno de cheesecake de requesón y vainilla (sub-receta), PS-04® → Mousse aireada de mamey (sub-receta) |

---

Costo de porción = Σ (cantidad ÷ 1000) × precio unitario ÷ (1 − merma). Los insumos marcados `(sub-receta)` entran al escandallo de su bebida como una línea con el costo por lote ya repercutido; sus componentes aparecen aquí por separado para la compra, pero no se suman dos veces.
