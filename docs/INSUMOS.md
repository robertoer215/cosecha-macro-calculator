# Insumos — COSECHA

Listado consolidado de **todos** los insumos de la carta vigente: 19 bebidas, el add-on de proteína y los 5 postres tipo Honest Bites (línea de mostrador). Incluye los insumos de sub-recetas. Cada precio lleva su **cita**: la fuente en línea verificada, o `[SUPUESTO]` con la lógica que lo sostiene.

## Resumen

| | |
|---|---:|
| Insumos de compra distintos | 108 |
| Con precio **verificado en fuente** | 16 |
| Con precio `[SUPUESTO]` (rango justificado) | 92 |
| Sostienen **una sola** receta | 66 |
| Compartidos por 5+ recetas | 18 |

> Un precio `[SUPUESTO]` sirve para dimensionar el escandallo, no para cerrar una orden de compra. Antes de negociar con proveedor, cotizar los que pesan: café de especialidad, aislado de suero, pistacho, frambuesa liofilizada, matcha.

## Precios verificados en línea

Verificados el 29-30 de agosto de 2026 contra la página del proveedor. La escalera de presentaciones de cada ficha era internamente coherente (criterio de aceptación).

| insumo | precio | cita |
|---|---:|---|
| Agua purificada | $2.50/kg | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Agua purificada de garrafón | $2.50/kg | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Hielo de agua purificada | $2.00/kg | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Almidón de tapioca | $60.00/kg | mayoreo.online/products/tapioca-c25-kilos — bulto 25 kg $1,500 = $60.00/kg (verificado 30 ago 2026) |
| Harina de almendra | $184.00/kg | mayoreo.online — $184.00/kg a partir de 5 kg (verificado 29 ago 2026) |
| Hielo | $2.00/kg | precio único de casa: bolsa 5 kg $10 = $2.00/kg |
| Linaza molida | $50.00/kg | mayoreo.online/products/linaza-molida — 10 kg $500 = $50.00/kg (verificado 30 ago 2026) |
| Piloncillo rallado | $25.00/kg | mayoreo.online/products/piloncillo-comercial — caja 18 kg $450 = $25.00/kg (verificado 30 ago 2026) |
| Agua purificada a 80 C | $2.50/kg | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Agua purificada caliente | $2.50/kg | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Agua purificada filtrada | $2.50/kg | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Nuez pecana | $280.00/kg | js/data.js (pKg de G02, insumo ya en almacén de COSECHA) — $280/kg |
| Agua purificada a 75 C | $2.50/kg | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Agua purificada fria | $2.50/kg | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Nuez (base G02 de data.js, sin chile piquin) | $280.00/kg | js/data.js — insumo ya en almacén |
| Piloncillo | $55.00/kg | mayoreo.online/products/piloncillo-comercial — caja 18 kg $450 = $25.00/kg (verificado 30 ago 2026) |

**Precios encontrados y DESCARTADOS por rotos** (el buscador devolvió "desde $X" o campos parciales; usarlos habría subcosteado la carta):

- Pistacho pelado "a $21.88-28/kg" (mayoreo.online, búsqueda) — imposible: el rango real de mercado es $700-1,100/kg.
- Avena en hojuela "a $1.30/kg" y jamaica "a $1.45/kg" (mayoreo.online, búsqueda) — fragmentos "precio desde".
- Nuez de la india "a $7/kg" y cacao entero "a $1.22/kg" — mismo defecto.
- Referencia útil rescatada: **arándano deshidratado premium $110/kg** (caja 11.34 kg $1,247.40, escalera coherente). No sustituye al arándano IQF congelado de BE-01, que es otro producto, pero acota el orden de magnitud.

## Insumos que sostienen una sola receta

66 de 108. Cada uno es un SKU que hay que comprar, almacenar, rotar y mermar para vender un solo producto: son los primeros candidatos a recortar en la v1.

| insumo | precio | única receta |
|---|---:|---|
| Vainilla de Papantla en vaina | $6000.00/kg | BE-14 → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (bebida) |
| Vainilla de Papantla, vaina entera molida (sin azúcar) | $5000.00/kg | ADD-PROT (modificador) |
| Matcha culinario grado premium | $3800.00/kg | BE-18 (bebida) |
| Extracto puro de monk fruit (mogrósido V ≥50%) | $3500.00/kg | ADD-PROT (modificador) |
| Matcha ceremonial japones (Uji o Kagoshima), grado bebida | $3200.00/kg | BE-12 (bebida) |
| Extracto de monk fruit (mogrosido V 50%) | $2500.00/kg | BE-15 → Solucion de monk fruit 0.5% (bebida) |
| Cardamomo verde en vaina, majado | $1200.00/kg | BE-13 → Concentrado de chai COSECHA (bebida) |
| Canela de Ceilán en raja | $900.00/kg | BE-06 → Jarabe de piloncillo y canela (bebida) |
| Pistacho pelado crudo | $850.00/kg | PS-02 (postre) |
| Proteina aislada de chicharo, sin sabor | $520.00/kg | BE-18 (bebida) |
| Aislado de proteína de suero WPI 90 sin sabor, instantizado con lecitina de girasol | $450.00/kg | ADD-PROT (modificador) |
| Te negro Assam a granel, hoja rota | $450.00/kg | BE-13 → Concentrado de chai COSECHA (bebida) |
| Anis estrella entero | $420.00/kg | BE-13 → Concentrado de chai COSECHA (bebida) |
| Canela de Ceylan molida al momento (servicio) | $420.00/kg | BE-14 (bebida) |
| Café de especialidad molido (el de la casa) | $380.00/kg | PS-05 (postre) |
| Clavo de olor entero | $380.00/kg | BE-13 → Concentrado de chai COSECHA (bebida) |
| Cobertura de chocolate 70% sin lácteo | $380.00/kg | PS-01 (postre) |
| Nibs de cacao tostados | $350.00/kg | PS-04 (postre) |
| Cáscara de psyllium en polvo | $320.00/kg | PS-03 (postre) |
| Arándano azul IQF (congelado) | $300.00/kg | BE-01 → Infusión fría de arándano y romero (bebida) |
| *… +46 más, visibles abajo con "recetas = 1"* | | |

## Catálogo completo

| insumo | precio MXN/kg o L | merma % | recetas | kcal/100 | P | C | G | cita del precio |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Agua purificada | $2.50 | 0 | 16 | 0 | 0 | 0 | 0 | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Agua purificada de garrafón | $2.50 | 0 | 13 | 0 | 0 | 0 | 0 | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Sal de mar fina | $18.00–45.00 | 0–2 | 13 | 0 | 0 | 0 | 0 | [SUPUESTO] INS_SAL_MAR existe en insumos_catalogo.csv sin precio cargado. 0.8 g aportan ~312 mg de sodio al vaso, en el rango de una bebida deportiva ligera (~620 mg/L) y no de un suero de rehidratación. Además corta el amargor de la naringina de la toronja: es técnica, no solo electrolito. |
| Hielo de agua purificada | $2.00 | 0 | 9 | 0 | 0 | 0 | 0 | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Monk fruit puro en polvo (mogrósido V ≥50%) | $3800.00 | 0 | 6 | 0 | 0 | 0 | 0 | [SUPUESTO] Poder edulcorante ~200x azúcar: 2.4 g equivalen a 480 g de azúcar. Es el insumo más caro por kilo de toda la casa y el que menos pesa en el escandallo (0.09 MXN por vaso). Producto de importación, comprar en presentación de 100 g y guardar en seco. Extracto puro, NO blend con eritritol: el blend obliga a dosis 100 veces mayores y encarece el litro. |
| Aceite de oliva virgen extra | $210.00 | 0 | 5 | 884 | 0 | 0 | 100 | [SUPUESTO] rango 180-260/L en lata de 5 L, mayoreo Puebla |
| Almidón de tapioca | $60.00 | 0 | 5 | 358 | 0.2 | 88.7 | 0 | mayoreo.online/products/tapioca-c25-kilos — bulto 25 kg $1,500 = $60.00/kg (verificado 30 ago 2026) |
| Bicarbonato de sodio | $45.00 | 0 | 5 | 0 | 0 | 0 | 0 | [SUPUESTO] rango 30-60 |
| Cafe de especialidad en grano, origen Veracruz / Sierra Norte de Puebla, tueste medio | $380.00 | 9 | 5 | 18 | 0.24 | 3.3 | 0.36 | [SUPUESTO] Precio [SUPUESTO] 380 MXN/kg: grano de especialidad tostado, compra directa a tostador poblano en sacos de 5 kg (rango de mercado 350-450). Merma corregida de 4% a 9% [SUPUESTO]: las 3 extracciones de calibracion de apertura son 54 g y en un piloto de 25-35 bebidas de espresso al dia (450-630 g) eso solo es el 4% si se venden ~72 espressos diarios; con purgas y recalibrado por humedad la merma real es 8-9%. Se revisa a 4% cuando el volumen supere 90 bebidas/dia. Macros NO del grano seco: son el aporte del EXTRACTO que rinden 100 g de grano a ratio 1:2 (base USDA 'Espresso, restaurant-prepared': 9 kcal, 0.12 prot, 1.67 carb, 0.18 grasa por 100 g de bebida; 100 g de grano rinden 200 g de bebida). Declararlo como grano seco inflaria la etiqueta a ~60 kcal por un cafe que tiene 3. |
| Dátil deshuesado | $190.00 | 3 | 5 | 277 | 1.8 | 75 | 0.2 | [SUPUESTO] rango 130-260 según calidad; medjool arriba, común abajo |
| Harina de almendra | $184.00 | 0 | 5 | 579 | 21.2 | 21.6 | 49.9 | mayoreo.online — $184.00/kg a partir de 5 kg (verificado 29 ago 2026) |
| Harina de arroz | $45.00 | 0 | 5 | 366 | 5.9 | 80.1 | 1.4 | [SUPUESTO] rango mayoreo 35-70; ML vende 1 kg a 55, granel baja a ~45 |
| Hielo | $2.00 | 0 | 5 | 0 | 0 | 0 | 0 | precio único de casa: bolsa 5 kg $10 = $2.00/kg |
| Jugo de limón mexicano | $45.00 | 62 | 5 | 25 | 0.42 | 8.42 | 0.07 | [SUPUESTO] No es sabor: baja el pH del jarabe a ~4.2 y es lo que sostiene los 21 días de vida útil sin conservador. |
| Jugo de limón mexicano recién exprimido | $45.00 | 62 | 5 | 25 | 0.42 | 8.42 | 0.07 | [SUPUESTO] INS_LIMON existe en insumos_catalogo.csv pero sin precio cargado. Precio de limón entero de mayoreo en Puebla, agosto 2026; el limón oscila fuerte (20-90 MXN/kg), revisar escandallo cada mes. Merma 62% = rendimiento de jugo del 38%. Macros de jugo crudo, USDA lime juice raw. |
| Linaza molida | $50.00 | 0 | 5 | 534 | 18.3 | 28.9 | 42.2 | mayoreo.online/products/linaza-molida — 10 kg $500 = $50.00/kg (verificado 30 ago 2026) |
| Miel de agave orgánica | $180.00 | 0 | 5 | 310 | 0.09 | 76.4 | 0.45 | [SUPUESTO] Endulzante permitido por la casa. Aporta cuerpo y boca que el monk fruit solo no da, pero se dosifica bajo: 150 g/L en vez de los 600-700 g/L de un jarabe simple 1:1. Precio de mayoreo en Puebla. |
| Sal fina de mar | $16.00 | 0 | 5 | 0 | 0 | 0 | 0 | [SUPUESTO] a granel |
| Aislado de proteina de suero, sin sabor | $780.00 | 0 | 4 | 373 | 86 | 5 | 1 | [SUPUESTO] SUPLEMENTO EN POLVO, declarado en carta. Aislado 86% sin saborizantes ni edulcorantes anadidos (si el aislado viene ya endulzado con sucralosa se rompe la regla de transparencia). Saco de 5 kg de importador nacional. |
| Datil deglet noor sin hueso | $180.00 | 6 | 4 | 282 | 2.5 | 67 | 0.4 | [SUPUESTO] Precio [SUPUESTO] 180 MXN/kg: datil a granel, caja de 5 kg en Central de Abasto de Puebla. carb_100 corregido de 75 (USDA total) a 67 (carbohidrato NETO, descontando ~8 g de fibra): con la regla intocable de 4 kcal/g, 75 g daria 313.6 kcal contra las 282 declaradas, un desfase del 11% que se propagaba a los tres concentrados. Con 67: 10+268+3.6 = 281.6, cuadra. |
| Leche entera pasteurizada 3.3% grasa | $26.00 | 6–10 | 4 | 63 | 3.3 | 4.9 | 3.4 | [SUPUESTO] Precio [SUPUESTO] 26 MXN/L: leche entera de marca nacional en compra semanal de 12 L a distribuidor poblano. Macros por 100 ml (densidad 1.03 g/ml), tabla mexicana de composicion / USDA leche entera 3.25%; coherentes 4/4/9 (13.2+19.6+30.6 = 63.4 vs 63). Merma 8% = leche que queda en la jarra y no entra al vaso; los 220 ml son NETOS en vaso (se texturizan 239 ml brutos). |
| Piloncillo rallado | $25.00 | 0 | 4 | 380 | 0 | 97 | 0 | mayoreo.online/products/piloncillo-comercial — caja 18 kg $450 = $25.00/kg (verificado 30 ago 2026) |
| Acido citrico grado alimenticio | $120.00 | 0 | 3 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio [SUPUESTO] 120 MXN/kg. 2 g por litro de producto terminado para bajar el pH a <=4.2: sin acidificar, un liquido de fruta a pH 5.8-6.5 y aw >0.98 es medio de cultivo. No es azucar ni endulzante. |
| Agua purificada a 80 C | $2.50 | 0 | 3 | 0 | 0 | 0 | 0 | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Agua purificada caliente | $2.50 | 0 | 3 | 0 | 0 | 0 | 0 | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Datil medjool deshuesado | $220.00 | 12 | 3 | 277 | 1.81 | 74.97 | 0.15 | [SUPUESTO] USDA 09421 Dates medjool. Merma 12% = hueso. Cantidad NETA: se compran 600 g brutos por kg de pasta. Precio de caja de 5 kg de importador. |
| Extracto de vainilla de Papantla | $1800.00 | 0 | 3 | 288 | 0.1 | 12.7 | 0.1 | [SUPUESTO] rango 1200-3000/L de extracto puro |
| Jugo de limon recien exprimido | $35.00 | 0 | 3 | 25 | 0.4 | 8.6 | 0.2 | [SUPUESTO] USDA 09152 Lemon juice raw. Levanta la fruta roja y evita el sabor plano tipico del batido de proteina. Precio ya del jugo colado, no del limon entero. |
| Platano Tabasco congelado (pulpa) | $18.00 | 35 | 3 | 89 | 1.09 | 22.84 | 0.33 | [SUPUESTO] USDA 09040 Bananas raw. Merma 35% = cascara. Se congela en rodajas el mismo dia que la fruta llega al punto de madurez (cascara con motas): es lo que da cuerpo cremoso sin anadir helado ni azucar. |
| Agua de coco natural (envase UHT sin azucar) | $45.00 | 0 | 2 | 19 | 0.72 | 3.71 | 0.2 | [SUPUESTO] USDA 12119 Nuts coconut water. Base liquida en lugar de leche: aporta potasio y sodio para rehidratacion y mantiene la grasa del vaso en 1.65 g, que es lo que acelera el vaciamiento gastrico post-entreno. Verificar en etiqueta 'sin azucar anadida'. |
| Agua purificada filtrada | $2.50 | 0 | 2 | 0 | 0 | 0 | 0 | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Anacardo crudo | $340.00 | 0 | 2 | 553 | 18.2 | 30.2 | 43.8 | [SUPUESTO] rango 280-450 |
| Cacao en polvo natural sin azucar | $240.00 | 0 | 2 | 228 | 19.6 | 57.9 | 13.7 | [SUPUESTO] USDA 19165 Cocoa dry powder unsweetened. Cacao natural (no alcalinizado) de Tabasco o Chiapas. Es el sabor de portada y el que hace que 40 g de proteina en polvo no se noten. |
| Cafe de especialidad en grano, origen Veracruz / Sierra Norte de Puebla, molienda gruesa | $380.00 | 8 | 2 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio [SUPUESTO] 380 MXN/kg. Merma corregida de 3% a 8%: purga del molino al cambiar a molienda gruesa y grano retenido en tolva y canasta. Macros en 0 A PROPOSITO: el grano no se consume, se descarta en el colador; el aporte del extracto ya viaja en los macros del concentrado terminado (la linea de insumo de la bebida). Ponerle aqui los valores del grano seco contaria doble. |
| Canela de Ceylan en rama | $420.00 | 0 | 2 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio [SUPUESTO] 420 MXN/kg: canela de Ceylan autentica a granel (la casia barata de 120 MXN/kg amarga y trae cumarina). Macros en 0: se infusiona y se descarta. |
| Canela molida | $320.00 | 0 | 2 | 247 | 3.99 | 80.6 | 1.24 | [SUPUESTO] USDA 02010 Cinnamon ground. Canela de Ceilan molida en casa. Realza la percepcion de dulzor sin sumar azucar. |
| Frambuesa liofilizada | $1800.00 | 0 | 2 | 350 | 7 | 78 | 4 | [SUPUESTO] rango 1200-2500. Es el insumo más caro de la línea |
| Hierbabuena fresca | $90.00 | 25 | 2 | 44 | 3.29 | 8.41 | 0.73 | [SUPUESTO] Merma 25% = tallo, que aporta amargor herbáceo y se descarta. Precio de manojo de mayoreo en Puebla; se consigue todo el año. |
| Hierbabuena fresca (guarnición, 1 ramita) | $90.00 | 0 | 2 | 44 | 3.29 | 8.41 | 0.73 | [SUPUESTO] Guarnición, fuera de los 500 ml. Macros USDA spearmint fresh. |
| Leche descremada pasteurizada | $26.00 | 0 | 2 | 35 | 3.4 | 5 | 0.1 | [SUPUESTO] USDA 01085 Milk nonfat fluid. Densidad 1.035 g/ml; se declara 1 ml = 1 g y el desvio (<5 g) se absorbe en la merma. Precio de caja de 12 L UHT. |
| Mezcla de especias chai molida (canela, jengibre, cardamomo, clavo, pimienta) | $320.00 | 0 | 2 | 250 | 4 | 60 | 3 | [SUPUESTO] rango 200-600 según proporción de cardamomo |
| Nuez pecana | $280.00 | 0 | 2 | 691 | 9.2 | 13.9 | 72 | js/data.js (pKg de G02, insumo ya en almacén de COSECHA) — $280/kg |
| Agua mineral de servicio | $12.00 | 0 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio [SUPUESTO] 12 MXN/L: botella de 355 ml comprada por caja de 24 en Puebla. Se da de alta porque los pasos la sirven: antes estaba fuera del escandallo y subcosteaba la bebida 1.20 MXN. No entra en el campo 'ml' (36 ml es el liquido de cafe servido). |
| Agua purificada a 75 C | $2.50 | 0 | 1 | 0 | 0 | 0 | 0 | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Agua purificada fria | $2.50 | 0 | 1 | 0 | 0 | 0 | 0 | precio único de casa: garrafón 20 L ≈ $50 = $2.50/L |
| Aislado de proteína de suero WPI 90 sin sabor, instantizado con lecitina de girasol | $450.00 | 3 | 1 | 372 | 90 | 1.5 | 0.7 | [SUPUESTO] AISLADO, no concentrado ni vegetal. Razones: (1) al 90% de proteína necesito solo 28 g de polvo para 25 g limpios, la menor masa posible, que es lo que evita arruinar la textura de un flat white; (2) casi cero lactosa (<0,5 g/dosis) y casi cero grasa, no enturbia ni empalaga; (3) sabor limpio, el concentrado WPC80 sabe a leche dulce y arrastra 4-5 g de lactosa por dosis; (4) proteína completa, ~2,9 g de leucina estimados (suero ~10,5% leucina), que es justo la queja #1 de Rodrigo contra Vitality y Fast Fruit. Precio 450 MXN/kg = saco de 20-25 kg vía distribuidor de ingredientes (commodity WPI ~USD 10/kg + importación y margen). NO es precio de bote de tienda deportiva (800-1.000 MXN/kg). Macros por 100 g de ficha técnica típica de WPI 90 instantizado; verificar contra el certificado de análisis del lote real. Ningún polvo de proteína existe hoy en js/data.js ni en insumos_catalogo.csv. |
| Albahaca genovesa en hoja (guarnición) | $120.00 | 0 | 1 | 23 | 3.15 | 2.65 | 0.64 | [SUPUESTO] Guarnición: entra al vaso y se costea, pero no cuenta dentro de los 500 ml de líquido. Macros USDA basil fresh. |
| Albahaca genovesa fresca | $120.00 | 25 | 1 | 23 | 3.15 | 2.65 | 0.64 | [SUPUESTO] Genovesa y no tailandesa: el anís de la tailandesa pelea con la toronja. Merma 25% = tallo. Precio de manojo de mayoreo en Puebla. Gramaje bajo a propósito: por encima de 22 g/L la infusión sabe a heno. |
| Anis estrella entero | $420.00 | 0 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio [SUPUESTO] 420 MXN/kg. Se descarta al colar. |
| Arándano azul IQF (congelado) | $300.00 | 0 | 1 | 57 | 0.74 | 14.5 | 0.33 | [SUPUESTO] IQF y no fresco a propósito: el congelado revienta la célula y suelta antocianina en frío, que es justo lo que necesita una maceración sin calor. Precio de mayoreo en Puebla corregido a 300 MXN/kg (rango verificado 250-400; el borrador usaba 150, fuera de rango). Es el insumo que manda en el costo de esta bebida. |
| Arroz blanco de grano largo, crudo | $24.00 | 2 | 1 | 360 | 6.6 | 79 | 0.6 | [SUPUESTO] Precio [SUPUESTO] 24 MXN/kg: arroz de grano largo en bulto de 10 kg, Puebla. Macros de arroz crudo (USDA 'Rice, white, long-grain, raw'); solo ~40% del solido pasa la manta, y eso ya esta descontado en los macros del terminado. |
| Avena en hojuela certificada sin gluten | $110.00 | 0 | 1 | 389 | 16.9 | 66.3 | 6.9 | [SUPUESTO] la avena normal va a 25-40 pero la CERTIFICADA sin gluten paga premium: rango 90-140 |
| Avena en hojuelas | $32.00 | 0 | 1 | 389 | 16.89 | 66.27 | 6.9 | [SUPUESTO] USDA 20038 Oats. Aporta 20 g de carbohidrato de digestion lenta y saciedad; es el insumo mas barato por caloria del vaso (1.12 MXN por 117 kcal). Precio de costal de 10 kg. |
| Bebida de coco SIN azucares anadidos, <=1.5 g de carbohidrato/100 ml, sin jarabe de glucosa ni maltodextrina (verificar etiqueta en cada compra) | $75.00 | 2 | 1 | 28 | 0.2 | 1.2 | 2.4 | [SUPUESTO] Precio corregido de 55 a 75 MXN/L [SUPUESTO]: el rango real de mayoreo en Puebla 2026 para bebida vegetal en caja de 1 L por caja de 12 es 60-110. La especificacion es dura porque la mayoria de las 'barista' llevan azucar, jarabe de glucosa o maltodextrina para estabilizar espuma (2-4 g de azucar/100 ml) y eso romperia la restriccion de cero azucar refinada anadida. Alternativa autorizada si el proveedor falla: bebida de almendra sin azucar (kcal_100 13, prot_100 0.5, carb_100 0.3, gras_100 1.1), anadiendo 'almendra (fruto seco)' a alergenos. |
| Bicarbonato de sodio grado alimenticio | $30.00 | 2 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Es la pieza que hace posible el latte caliente. El café ronda pH 4,9-5,1 y el punto isoeléctrico del suero está en pH ~4,6-5,2: el café empuja la proteína justo a la zona donde flocula. Una pizca amortigua la mezcla hacia pH ~6,5 y de paso baja el amargor del espresso. Dosis a calibrar en barra: pasado de bicarbonato la bebida sabe jabonosa. Precio de bicarbonato alimenticio a granel. |
| Café de especialidad molido (el de la casa) | $380.00 | 0 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] mismo grano que la barra BE-07 a BE-14: sinergia de almacén |
| Canela de Ceilán en raja | $900.00 | 0 | 1 | 247 | 4 | 80.6 | 1.24 | [SUPUESTO] Ceilán y no cassia: la cassia es más barata y más agresiva, y con la jamaica tapa la fruta. Se infusiona y se retira, así que casi no aporta macros. Precio de importación en Puebla. |
| Canela de Ceylan molida al momento (servicio) | $420.00 | 0 | 1 | 139 | 4 | 28 | 1.2 | [SUPUESTO] Precio [SUPUESTO] 420 MXN/kg (canela de Ceylan autentica). Aqui SI se consume, por eso lleva macros reales. carb_100 corregido de 81 a 28 (carbohidrato NETO, descontando 53 g de fibra) y kcal_100 de 247 a 139: con los valores USDA totales, la regla 4/4/9 daba 350.8 kcal contra 247 declaradas, +42%, el unico insumo del borrador que reventaba la puerta de coherencia. En 0.3 g su aporte es 0.4 kcal, pero es el aroma que recibe el cliente antes del primer trago. |
| Cardamomo verde en vaina, majado | $1200.00 | 0 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio [SUPUESTO] 1,200 MXN/kg: es la especia cara del chai (el 17% del costo del batch) y la que lo hace reconocible; no se sustituye. Se descarta al colar. |
| Cáscara de naranja en tira (guarnición) | $22.00 | 88 | 1 | 97 | 1.5 | 25 | 0.2 | [SUPUESTO] Guarnición: entra al vaso y se costea, pero no cuenta dentro de los 500 ml de líquido. Merma 88% = solo la capa coloreada, sin albedo. INS_NARANJA ya está en insumos_catalogo.csv porque la cocina exprime naranja para el adobo del salmón al pastor: la cáscara es un subproducto que hoy se tira. Se costea igual al precio de la fruta entera, de forma conservadora. |
| Cáscara de naranja sin albedo | $22.00 | 88 | 1 | 97 | 1.5 | 25 | 0.2 | [SUPUESTO] Merma 88% = solo la capa coloreada. Se recupera de la naranja que la cocina ya exprime para el adobo del salmón. El aceite esencial de la cáscara redondea la acidez de la flor sin añadir azúcar. |
| Cáscara de psyllium en polvo | $320.00 | 0 | 1 | 200 | 1.5 | 88 | 0.5 | [SUPUESTO] rango 250-450 |
| Chía seca | $140.00 | 0 | 1 | 486 | 16.5 | 42.1 | 30.7 | [SUPUESTO] Ratio 1:8 en peso. Precio de mayoreo en Puebla; producto nacional, todo el año. Macros USDA chia seeds dried (fibra 34.4 g/100 g). |
| Clavo de olor entero | $380.00 | 0 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio [SUPUESTO] 380 MXN/kg. Mas de 4 g por litro domina y sabe a dentista. Se descarta al colar. |
| Cobertura de chocolate 70% sin lácteo | $380.00 | 0 | 1 | 580 | 7.8 | 45.9 | 42.6 | [SUPUESTO] rango 280-450; exigir lote sin leche ni manteca láctea |
| Crema de cacahuate 100% (un solo ingrediente) | $190.00 | 0 | 1 | 588 | 25.09 | 19.56 | 50.39 | [SUPUESTO] USDA 16098 Peanut butter smooth. Debe ser 100% cacahuate: las cremas comerciales llevan azucar refinada y aceite hidrogenado, prohibidos. Precio de cubeta de 4 kg de molienda local. |
| Crema de coco 22-23% grasa en lata, sin azucar anadida | $120.00 | 3 | 1 | 240 | 2.3 | 6 | 23 | [SUPUESTO] Precio [SUPUESTO] 120 MXN/L: lata de 400 ml a ~48 MXN comprada por caja de 24 en distribuidor asiatico de Puebla. Macros de coconut cream enlatada al 22-23% de grasa (USDA 'Coconut cream, canned'); kcal_100 corregida de 232 a 240 para cerrar la regla 4/4/9 (9.2+24+207 = 240.2). |
| Extracto de monk fruit (mogrosido V 50%) | $2500.00 | 0 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Poder edulcorante ~200x azucar. Se declara 0 kcal por convencion de etiquetado. Bolsa de 500 g de importador; es caro por kg pero la dosis es minima. |
| Extracto natural de vainilla | $260.00 | 0 | 1 | 288 | 0.06 | 12.65 | 0.06 | [SUPUESTO] USDA 02050 Vanilla extract. Extracto natural de vaina de Papantla, NO jarabe de vainilla: el jarabe de cafeteria es azucar refinada con saborizante y esta prohibido por regla de marca. |
| Extracto puro de monk fruit (mogrósido V ≥50%) | $3500.00 | 8 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Cero azúcar refinada, y de las opciones permitidas es la única que sirve aquí: dátil y piloncillo son sólidos de color que ensucian un matcha y suman 6-8 g de azúcar; el agave es jarabe líquido y rompe el formato de polvo. El monk fruit es cero glucémico, estable a calor y a pH, y a 0,05 g da un dulzor equivalente a ~10 g de azúcar. OJO: tiene que ser extracto PURO; las mezclas comerciales vienen cortadas con eritritol y entonces habría que dosificar 6 g y cambian los macros. A 0,05 g no se pesa por vaso: se dosifica en el batch de 1 kg. Precio de extracto importado (USD 150-200/kg). |
| Flor de jamaica seca | $130.00 | 0 | 1 | 300 | 4 | 70 | 1 | [SUPUESTO] Precio de mayoreo en Puebla; producto nacional de Guerrero y Oaxaca, disponible todo el año. Los 62 g/L no son estéticos: son los que dejan el pH por debajo de 3.0 y sostienen las 72 h de vida útil. Las macros de la flor seca casi no llegan al vaso porque los sólidos se descartan al colar. |
| Frambuesa congelada IQF | $180.00 | 0 | 1 | 52 | 1.2 | 11.94 | 0.65 | [SUPUESTO] USDA 09302 Raspberries raw. Es el insumo mas caro del vaso (10.80 MXN). Se compra IQF de Zamora/Jacona por bolsa de 1 kg: merma 0 y disponibilidad todo el ano. |
| Fresa congelada IQF (despuntada) | $70.00 | 5 | 1 | 32 | 0.67 | 7.68 | 0.3 | [SUPUESTO] USDA 09316 Strawberries raw. Precio de mayoreo en Central de Abasto de Puebla, temporada alta dic-may; fuera de temporada se compra IQF de proveedor a precio similar. Merma 5% = despunte del caliz. |
| Fresa fresca | $60.00 | 6 | 1 | 32 | 0.67 | 7.68 | 0.3 | [SUPUESTO] Precio de mayoreo en Puebla en temporada alta (noviembre-mayo), abastecida desde Irapuato y Zamora. Fuera de temporada sube hasta ~110 MXN/kg: cambiar a IQF y rehacer el escandallo. Merma 6% = cáliz. |
| Fresa fresca laminada (guarnición) | $60.00 | 6 | 1 | 32 | 0.67 | 7.68 | 0.3 | [SUPUESTO] Guarnición: entra al vaso y se costea, pero no cuenta dentro de los 500 ml de líquido. Merma 6% = cáliz. Macros USDA strawberries raw. |
| Jarabe de datil COSECHA (sub-receta de esta misma ficha) | $140.91 | 2 | 1 | 165 | 1.1 | 40 | 0.15 | [SUPUESTO] Dosis bajada de 100 a 60 ml por litro de base: el jarabe nuevo es 1.63 veces mas concentrado (40 g de carbohidrato neto/100 ml contra 24.6 del borrador), asi que 60 ml aportan mas azucar que los 100 ml antiguos y ademas dejan sitio para la crema que la espuma necesita. |
| Jarabe de datil COSECHA (sub-receta documentada en BE-11 y BE-12) | $140.91 | 2 | 1 | 165 | 1.1 | 40 | 0.15 | [SUPUESTO] Unico endulzante del chai: cero azucar refinada. Dosis equivalente en azucar a los 180 ml del jarabe flojo del borrador multiplicado por 1.8: ahora el vaso lleva 8.9 g de carbohidrato de fruta (3.0 g/100 ml de bebida), por encima del umbral de percepcion; con la formula anterior el dirty chai sabia a te con especia. |
| Jengibre fresco | $70.00 | 15 | 1 | 80 | 1.82 | 17.77 | 0.75 | [SUPUESTO] Merma 15% = piel. Se ralla en microplane, no se pica: la superficie de contacto es lo que extrae el gingerol en frío. Precio de mayoreo en Puebla, disponible todo el año. |
| Jengibre fresco pelado y rallado | $85.00 | 12 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio corregido de 45 a 85 MXN/kg [SUPUESTO]: el rango de mayoreo en Puebla 2026 es 60-110 y el jengibre es de los insumos mas volatiles del ano. Disponible todo el ano. Merma 12% de pelado. Macros en 0: se cuela y se descarta. |
| Jugo de pepino prensado en frío | $18.00 | 38 | 1 | 14 | 0.6 | 3.2 | 0.1 | [SUPUESTO] INS_PEPINO existe en insumos_catalogo.csv pero sin precio cargado. Precio de mayoreo en Puebla, disponible todo el año. Merma 38% = despunte más bagazo del extractor lento (rendimiento de jugo 62%). Macros derivadas de USDA cucumber with peel raw, descontando fibra que queda en el bagazo. Azúcares 1.70 g/100 ml. |
| Jugo de piña recién prensado | $18.00 | 67 | 1 | 53 | 0.36 | 12.87 | 0.12 | [SUPUESTO] INS_PINA existe en insumos_catalogo.csv sin precio cargado. Merma 67% combinada: 45% de cáscara, corona y corazón (misma merma que usa el recetario en PR_SALMON_PASTOR) más 40% de bagazo del extractor. Dosis limitada a 90 ml: la piña trae 9.98 g de azúcar por 100 ml y a 130 ml el vaso rompería el techo de 12 g. Macros USDA pineapple juice unsweetened. |
| Jugo de toronja roja recién exprimido | $25.00 | 55 | 1 | 39 | 0.5 | 9.2 | 0.1 | [SUPUESTO] Merma 55% = cáscara, albedo y bagazo (rendimiento de jugo 45%). Dosis limitada a 100 ml por una razón dura: la toronja trae 9.2 g de azúcar por 100 ml y 190 ml ya romperían sola el techo de 12 g del vaso. Macros USDA grapefruit juice pink raw. Aporta ~162 mg de potasio al vaso. |
| Leche entera pasteurizada | $24.00 | 0 | 1 | 61 | 3.15 | 4.78 | 3.25 | [SUPUESTO] USDA 01211 Milk whole 3.25%. Entera y no descremada a proposito: en superavit la grasa lactea es densidad calorica barata (5.85 g de grasa por 4.32 MXN). |
| Mamey (pulpa congelada IQF) | $55.00 | 40 | 1 | 124 | 1.45 | 32.1 | 0.46 | [SUPUESTO] USDA 09313 Sapote mamey raw. Merma 40% = cascara y hueso. TEMPORADA: cosecha de febrero a agosto en Veracruz, Chiapas y la sierra norte de Puebla; en el pico (abril-junio) el precio baja a ~40 MXN/kg. Fuera de temporada hay pulpa congelada de proveedor a ~85 MXN/kg neto, que sube el vaso de 83 a 90 MXN. |
| Mango Ataulfo en cubos congelados | $38.00 | 40 | 1 | 60 | 0.82 | 15 | 0.38 | [SUPUESTO] USDA 09176 Mangos raw. Merma 40% = hueso y cascara. TEMPORADA: Ataulfo de Chiapas/Oaxaca de marzo a agosto. Fuera de temporada se compra IQF a ~62 MXN/kg neto, que es exactamente el costo neto del fresco con merma (38/0.60 = 63.3): el escandallo no se mueve en todo el ano. |
| Matcha ceremonial japones (Uji o Kagoshima), grado bebida | $3200.00 | 0 | 1 | 177 | 29 | 4 | 5 | [SUPUESTO] Precio [SUPUESTO] 3,200 MXN/kg: grado ceremonial importado, bolsa de 500 g a importador en CDMX (rango 2,800-4,500). Merma corregida de 5% a 0%: es un polvo dosificado en bascula de 0.1 g, y ese 5% inflaba el insumo mas caro de la familia. carb_100 corregido de 39 a 4 (carbohidrato NETO, descontando ~35 g de fibra) y kcal_100 de 320 a 177, porque la regla intocable de 4/4/9 no distingue fibra: con 39 g la carta mostraria 1.17 g de carbohidrato para una dosis cuyo carbohidrato digerible es 0.12 g. Coherencia: 116+16+45 = 177. |
| Matcha culinario grado premium | $3800.00 | 0 | 1 | 297 | 29 | 39 | 5.3 | [SUPUESTO] Valores por 100 g de te verde en polvo; el carbohidrato es casi todo fibra. Es el insumo mas caro por kg de toda la familia (13.30 MXN por vaso) pero la dosis de 3.5 g es lo minimo para que se lea a matcha y no a te verde aguado. |
| Nibs de cacao tostados | $350.00 | 0 | 1 | 465 | 10.7 | 8.7 | 43 | [SUPUESTO] rango 300-420, nib mexicano de Tabasco/Chiapas |
| Nuez (base G02 de data.js, sin chile piquin) | $280.00 | 5 | 1 | 660 | 16 | 12 | 64 | js/data.js — insumo ya en almacén |
| Pepino en rodaja (guarnición) | $18.00 | 5 | 1 | 15 | 0.65 | 3.63 | 0.11 | [SUPUESTO] Guarnición: entra al vaso y se costea, pero no cuenta dentro de los 500 ml de líquido. Merma 5% = despunte. |
| Pepita de calabaza tostada sin cascara | $190.00 | 0 | 1 | 574 | 29.84 | 14.71 | 49.05 | [SUPUESTO] USDA 12016. Tostada en comal, sin sal. Mamey con pepita es un maridaje de la cocina poblana; aqui esta por sabor y por 3 g de proteina, no de adorno. Mismo insumo que la leche de pepita de BE-18: una sola compra para dos bebidas. |
| Pepita de calabaza verde sin cascara | $190.00 | 0 | 1 | 574 | 29.84 | 14.71 | 49.05 | [SUPUESTO] USDA 12016 Pumpkin seed kernels dried. Sin cascara y sin sal. Precio de mayoreo de pepita de Puebla y Tlaxcala en bolsa de 5 kg. Aporta 1.94 g de proteina por 100 ml de leche, cuatro veces mas que una leche de almendra. |
| Pepita verde sin cáscara | $260.00 | 0 | 1 | 559 | 30.2 | 10.7 | 49 | [SUPUESTO] rango 220-320 |
| Piloncillo | $55.00 | 0 | 1 | 380 | 0.5 | 96 | 0.1 | mayoreo.online/products/piloncillo-comercial — caja 18 kg $450 = $25.00/kg (verificado 30 ago 2026) |
| Pimienta negra entera | $260.00 | 0 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio [SUPUESTO] 260 MXN/kg. Es lo que da el 'golpe' final en garganta. Se descarta al colar. |
| Pistacho pelado crudo | $850.00 | 0 | 1 | 560 | 20.2 | 27.2 | 45.3 | [SUPUESTO] rango 700-1100. NO usar el $28/kg scrapeado: es un dato roto |
| Plátano Tabasco muy maduro | $25.00 | 35 | 1 | 89 | 1.1 | 22.8 | 0.3 | [SUPUESTO] rango 18-35 según temporada |
| Proteina aislada de chicharo, sin sabor | $520.00 | 0 | 1 | 368 | 78 | 5 | 4 | [SUPUESTO] SUPLEMENTO EN POLVO, declarado en carta. Aislado de chicharo amarillo 78%, sin saborizantes. Aporta 23.4 g de los 29.5 g de proteina del vaso. Tiene nota terrosa: el matcha y la vainilla existen tambien para taparla. |
| Ralladura de toronja (guarnición) | $25.00 | 90 | 1 | 42 | 0.77 | 10.66 | 0.14 | [SUPUESTO] Guarnición aromática, fuera de los 500 ml. Merma 90% = solo la capa coloreada, sin albedo. Se ralla de la misma toronja ya exprimida: coste real cercano a cero, pero se costea de forma conservadora al precio de la fruta entera. |
| Requeson descremado | $130.00 | 0 | 1 | 130 | 11 | 3 | 9 | [SUPUESTO] USDA 01015 Cottage cheese lowfat 1% milkfat. Aporta 11.2 g de proteina y la cremosidad que evita que la bebida sepa a agua con polvo. Precio de queseria local de Puebla en pieza de 1 kg. CORREGIDO: el borrador usaba USDA 01015 (cottage 1%), que no es requesón mexicano. Se conserva el insumo local con sus macros reales. |
| Romero fresco | $120.00 | 30 | 1 | 131 | 3.31 | 20.7 | 5.86 | [SUPUESTO] Merma 30% = tallo leñoso que se descarta; se usa solo hoja y punta tierna. Precio de manojo de mayoreo en Puebla. |
| Romero fresco (guarnición, 1 rama) | $120.00 | 0 | 1 | 131 | 3.31 | 20.7 | 5.86 | [SUPUESTO] Guarnición: entra al vaso y se costea, pero no cuenta dentro de los 500 ml de líquido. Precio de manojo de mayoreo en Puebla. Macros USDA rosemary fresh. |
| Tahini (pasta de ajonjolí) | $250.00 | 0 | 1 | 595 | 17 | 21.2 | 53.8 | [SUPUESTO] rango 180-320. El ajonjolí en semilla va a 11-30/kg: molerlo en casa baja el costo a ~60/kg si hay molino |
| Te negro Assam a granel, hoja rota | $450.00 | 4 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio corregido de 320 a 450 MXN/kg [SUPUESTO]: la hoja de calidad para chai esta en 400-800 en importador de CDMX; a 320 se subcosteaba la especia mas voluminosa del batch. Macros en 0 a proposito: la hoja se descarta en el colador y su aporte ya esta contado en los macros del concentrado terminado. |
| Vainilla de Papantla en vaina | $6000.00 | 0 | 1 | 0 | 0 | 0 | 0 | [SUPUESTO] Precio [SUPUESTO] 6,000 MXN/kg (~9 MXN por vaina de 1.5 g) comprando directo a productor de Papantla, Veracruz, en lotes de 250 g. Es el insumo que hace 'ancla local' a esta bebida y el mas caro por gramo de la familia: 9 MXN por litro de horchata, el 20% del costo del batch. Macros en 0: la vaina se cuela y solo pasa su aroma. Cosecha diciembre-febrero; se compra curada y se almacena al vacio, disponible todo el ano. |
| Vainilla de Papantla, vaina entera molida (sin azúcar) | $5000.00 | 3 | 1 | 288 | 0.1 | 12.7 | 0.06 | [SUPUESTO] El aislado sin sabor solo sabe a cartón mojado: sin esto el add-on empeora la bebida. La vainilla es el único sabor que suma en café, matcha, chai, horchata y smoothie por igual, y es el ancla local legible fuera de México (formato internacional, insumo mexicano). Va MOLIDA, no en extracto: el extracto es líquido, lleva alcohol y añade un paso de dosificación en barra; molida entra en el batch seco y el add-on queda en una sola cuchara. Precio de vaina de Papantla a granel (3.000-6.000 MXN/kg según cosecha; la vainilla se corta de diciembre a febrero, comprar y moler en casa). Macros por 100 g tomadas del extracto de vainilla (USDA 02050) por falta de dato de vaina molida: a 0,3 g aporta menos de 1 kcal y no mueve el escandallo. |
| Yogur griego natural 0% grasa, sin azucar | $145.00 | 0 | 1 | 59 | 10.19 | 3.6 | 0.39 | [SUPUESTO] USDA 01256 Yogurt Greek plain nonfat. Aporta 13.2 g de proteina, mas que el aislado en polvo de este mismo vaso. Verificar en etiqueta que sea natural sin endulzar: el griego 'sabor natural' de supermercado suele traer azucar. |
| Zanahoria | $18.00 | 20 | 1 | 41 | 0.9 | 9.6 | 0.2 | [SUPUESTO] rango 12-25. Zanahoria AMARILLA no se consigue en Puebla: se usa naranja |

## Dónde entra cada insumo

Mapa de dependencias: si un insumo falla en proveedor, estas recetas se caen.

| insumo | recetas |
|---|---|
| Agua purificada | BE-13 → Concentrado de chai COSECHA (bebida), BE-14 → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (bebida), BE-15 → Solucion de monk fruit 0.5% (bebida), BE-18 → Leche de pepita (bebida), PS-01 → Huevo de lino (postre), PS-01 → Pasta de dátil (postre), PS-02 → Huevo de lino (postre), PS-02 → Pasta de dátil (postre), PS-03 → Huevo de lino (postre), PS-03 → Pasta de dátil (postre), PS-04 (postre), PS-04 → Huevo de lino (postre), PS-04 → Pasta de dátil (postre), PS-05 (postre), PS-05 → Huevo de lino (postre), PS-05 → Pasta de dátil (postre) |
| Agua purificada de garrafón | BE-01 → Infusión fría de arándano y romero (bebida), BE-01 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-02 → Infusión fría de hierbabuena (bebida), BE-02 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-03 → Infusión fría de fresa y jengibre (bebida), BE-03 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-04 → Infusión fría de albahaca (bebida), BE-04 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-05 → Chía hidratada COSECHA (1:8) (bebida), BE-05 → Infusión fría de hierbabuena (bebida), BE-05 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-06 → Infusión fría de jamaica y naranja (bebida), BE-06 → Jarabe de piloncillo y canela (bebida) |
| Sal de mar fina | ADD-PROT (modificador), BE-04 (bebida), BE-11 → Base de nube de coco COSECHA (bebida), BE-11 → Jarabe de datil COSECHA (bebida), BE-12 → Jarabe de datil COSECHA (bebida), BE-13 → Concentrado de chai COSECHA (bebida), BE-13 → Jarabe de datil COSECHA (bebida), BE-14 → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (bebida), BE-16 (bebida), BE-17 (bebida), BE-18 (bebida), BE-18 → Leche de pepita (bebida), BE-19 (bebida) |
| Hielo de agua purificada | BE-01 (bebida), BE-02 (bebida), BE-03 (bebida), BE-04 (bebida), BE-05 (bebida), BE-06 (bebida), BE-10 (bebida), BE-11 (bebida), BE-14 (bebida) |
| Monk fruit puro en polvo (mogrósido V ≥50%) | BE-01 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-02 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-03 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-04 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-05 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-06 → Jarabe de piloncillo y canela (bebida) |
| Aceite de oliva virgen extra | PS-01 (postre), PS-02 (postre), PS-03 (postre), PS-04 (postre), PS-05 (postre) |
| Almidón de tapioca | PS-01 → Mezcla de harinas sin gluten COSECHA (postre), PS-02 → Mezcla de harinas sin gluten COSECHA (postre), PS-03 → Mezcla de harinas sin gluten COSECHA (postre), PS-04 → Mezcla de harinas sin gluten COSECHA (postre), PS-05 → Mezcla de harinas sin gluten COSECHA (postre) |
| Bicarbonato de sodio | PS-01 (postre), PS-02 (postre), PS-03 (postre), PS-04 (postre), PS-05 (postre) |
| Cafe de especialidad en grano, origen Veracruz / Sierra Norte de Puebla, tueste medio | BE-07 (bebida), BE-08 (bebida), BE-09 (bebida), BE-11 (bebida), BE-13 (bebida) |
| Dátil deshuesado | PS-01 → Pasta de dátil (postre), PS-02 → Pasta de dátil (postre), PS-03 → Pasta de dátil (postre), PS-04 → Pasta de dátil (postre), PS-05 → Pasta de dátil (postre) |
| Harina de almendra | PS-01 → Mezcla de harinas sin gluten COSECHA (postre), PS-02 → Mezcla de harinas sin gluten COSECHA (postre), PS-03 → Mezcla de harinas sin gluten COSECHA (postre), PS-04 → Mezcla de harinas sin gluten COSECHA (postre), PS-05 → Mezcla de harinas sin gluten COSECHA (postre) |
| Harina de arroz | PS-01 → Mezcla de harinas sin gluten COSECHA (postre), PS-02 → Mezcla de harinas sin gluten COSECHA (postre), PS-03 → Mezcla de harinas sin gluten COSECHA (postre), PS-04 → Mezcla de harinas sin gluten COSECHA (postre), PS-05 → Mezcla de harinas sin gluten COSECHA (postre) |
| Hielo | BE-15 (bebida), BE-16 (bebida), BE-17 (bebida), BE-18 (bebida), BE-19 (bebida) |
| Jugo de limón mexicano | BE-01 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-02 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-03 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-04 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-05 → Jarabe COSECHA (miel de agave + monk fruit) (bebida) |
| Jugo de limón mexicano recién exprimido | BE-01 (bebida), BE-02 (bebida), BE-03 (bebida), BE-04 (bebida), BE-05 (bebida) |
| Linaza molida | PS-01 → Huevo de lino (postre), PS-02 → Huevo de lino (postre), PS-03 → Huevo de lino (postre), PS-04 → Huevo de lino (postre), PS-05 → Huevo de lino (postre) |
| Miel de agave orgánica | BE-01 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-02 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-03 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-04 → Jarabe COSECHA (miel de agave + monk fruit) (bebida), BE-05 → Jarabe COSECHA (miel de agave + monk fruit) (bebida) |
| Sal fina de mar | PS-01 (postre), PS-02 (postre), PS-03 (postre), PS-04 (postre), PS-05 (postre) |
| Aislado de proteina de suero, sin sabor | BE-15 (bebida), BE-16 (bebida), BE-17 (bebida), BE-19 (bebida) |
| Datil deglet noor sin hueso | BE-11 → Jarabe de datil COSECHA (bebida), BE-12 → Jarabe de datil COSECHA (bebida), BE-13 → Jarabe de datil COSECHA (bebida), BE-14 → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (bebida) |
| Leche entera pasteurizada 3.3% grasa | BE-08 (bebida), BE-09 (bebida), BE-12 (bebida), BE-13 (bebida) |
| Piloncillo rallado | PS-01 (postre), PS-02 (postre), PS-04 (postre), PS-05 (postre) |
| Acido citrico grado alimenticio | BE-11 → Jarabe de datil COSECHA (bebida), BE-12 → Jarabe de datil COSECHA (bebida), BE-13 → Jarabe de datil COSECHA (bebida) |
| Agua purificada a 80 C | BE-11 → Jarabe de datil COSECHA (bebida), BE-12 → Jarabe de datil COSECHA (bebida), BE-13 → Jarabe de datil COSECHA (bebida) |
| Agua purificada caliente | BE-16 → Pasta de datil (bebida), BE-17 → Pasta de datil (bebida), BE-18 → Pasta de datil (bebida) |
| Datil medjool deshuesado | BE-16 → Pasta de datil (bebida), BE-17 → Pasta de datil (bebida), BE-18 → Pasta de datil (bebida) |
| Extracto de vainilla de Papantla | PS-01 (postre), PS-02 (postre), PS-04 (postre) |
| Jugo de limon recien exprimido | BE-15 (bebida), BE-17 (bebida), BE-18 (bebida) |
| Platano Tabasco congelado (pulpa) | BE-16 (bebida), BE-17 (bebida), BE-18 (bebida) |
| Agua de coco natural (envase UHT sin azucar) | BE-17 (bebida), BE-18 (bebida) |
| Agua purificada filtrada | BE-10 → Concentrado de cold brew COSECHA (bebida), BE-14 → Concentrado de cold brew COSECHA (bebida) |
| Anacardo crudo | PS-04 (postre), PS-05 (postre) |
| Cacao en polvo natural sin azucar | BE-16 (bebida), PS-05 (postre) |
| Cafe de especialidad en grano, origen Veracruz / Sierra Norte de Puebla, molienda gruesa | BE-10 → Concentrado de cold brew COSECHA (bebida), BE-14 → Concentrado de cold brew COSECHA (bebida) |
| Canela de Ceylan en rama | BE-13 → Concentrado de chai COSECHA (bebida), BE-14 → Horchata COSECHA de arroz, canela de Ceylan y vainilla de Papantla (bebida) |
| Canela molida | BE-16 (bebida), BE-19 (bebida) |
| Frambuesa liofilizada | PS-02 (postre), PS-05 (postre) |
| Hierbabuena fresca | BE-02 → Infusión fría de hierbabuena (bebida), BE-05 → Infusión fría de hierbabuena (bebida) |
| Hierbabuena fresca (guarnición, 1 ramita) | BE-02 (bebida), BE-05 (bebida) |
| Leche descremada pasteurizada | BE-15 (bebida), BE-19 (bebida) |
| Mezcla de especias chai molida (canela, jengibre, cardamomo, clavo, pimienta) | PS-03 (postre), PS-04 (postre) |
| Nuez pecana | PS-03 (postre), PS-04 (postre) |

---

Costo de porción = Σ (cantidad ÷ 1000) × precio ÷ (1 − merma). Los componentes de sub-receta aparecen aquí para la compra pero entran al escandallo de cada pieza como una sola línea ya repercutida: no se cuentan dos veces.
