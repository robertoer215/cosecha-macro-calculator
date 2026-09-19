# Carta de postres y costeo — COSECHA

5 piezas de mostrador: **plant-based, sin gluten y sin azúcar refinada**. Réplica adaptada de la línea Honest Bites de Honest Greens.

El costeo completo, línea a línea, está en **[`COSTEO_POSTRES.xlsx`](COSTEO_POSTRES.xlsx)** — 4 hojas con fórmulas vivas.

## Carta

### Galletas

> **PS-01® Chocolate Chip Cookie** — 65 g — $55
> Crujiente fuera, masticable dentro. Aceite de oliva y piloncillo.
> 
> `346 kcal · P 4.3 g · C 35 g · G 20.9 g`

> **PS-02® Raspberry & Pistachio Cookie** — 65 g — $75
> Pistacho molido y frambuesa liofilizada. Ácida y salada, no dulce.
> 
> `326 kcal · P 5.3 g · C 32 g · G 19.7 g`

### Panes

> **PS-03® Banana Bread** — 95 g — $50
> Plátano muy maduro hace el trabajo. Casi sin endulzante añadido.
> 
> `320 kcal · P 5.3 g · C 36 g · G 17.2 g`

### Pasteles

> **PS-04® Carrot Chai Cake** — 110 g — $70
> Zanahoria y especias chai. Glaseado de anacardo, pepita y nibs.
> 
> `427 kcal · P 7.6 g · C 37 g · G 27.8 g`

> **PS-05® Marbled Chocolate & Tahini Cake** — 105 g — $75
> Veteado de tahini y cacao. Glaseado de café, frambuesa liofilizada.
> 
> `429 kcal · P 8.6 g · C 40 g · G 26.1 g`

Los cinco llevan el sello **PB · SIN GLUTEN · SIN AZÚCAR REFINADA**.

## Costeo y margen

`Precio fórmula` es la regla intocable de la casa: `ceil(costo × 1.40 ÷ 0.85)`. `Precio carta` es mi recomendación comercial, anclada a lo que Honest Greens cobra por estas piezas (3,45–3,95 €) ajustado al mercado de Angelópolis.

| código | pieza | g | costo | precio fórmula | FC fórmula | precio carta | FC carta | margen |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| PS-01® | Chocolate Chip Cookie | 65 | $11.83 | $20 | 59.2 % | **$55** | 21.5 % | $43.17 |
| PS-02® | Raspberry & Pistachio Cookie | 65 | $21.04 | $35 | 60.1 % | **$75** | 28.1 % | $53.96 |
| PS-03® | Banana Bread | 95 | $9.82 | $17 | 57.8 % | **$50** | 19.6 % | $40.18 |
| PS-04® | Carrot Chai Cake | 110 | $15.99 | $27 | 59.2 % | **$70** | 22.8 % | $54.01 |
| PS-05® | Marbled Chocolate & Tahini Cake | 105 | $17.79 | $30 | 59.3 % | **$75** | 23.7 % | $57.21 |
| | **Promedio** | | $15.29 | | | **$65.00** | 23.5 % | $49.71 |

Food cost medio de carta: **23.5%**, dentro del estándar de repostería (20-30%). La fórmula de la casa impone 60%, así que aplicarla tal cual dejaría **$39.20 por pieza** sobre la mesa. No la cambio: el módulo `js/postres.js` guarda `precio` con la fórmula, y el redondeo comercial vive solo aquí.

## Análisis operativo

### Lo que cambia respecto a los postres de plato

Estas piezas son de **mostrador**, no de pase. Eso mejora el negocio en tres frentes y lo empeora en uno:

- **Cero emplatado.** 15-20 s contra los 45-150 s de un postre de plato. No compiten por la mano del pase en hora pico.
- **Un solo horneado matinal.** Toda la línea sale del mismo turno de obrador.
- **Se venden para llevar**, que es demanda que el postre de plato no captura.
- **Pero se secan.** La repostería sin gluten pierde humedad mucho más rápido: 2-3 días de vida útil real contra los 4-5 de una masa con gluten. PS-03 Banana Bread es el más corto, con 2 días.

### Insumos

29 insumos distintos. Solo **6 tienen precio verificado en fuente**; los otros 23 son [SUPUESTO] con rango justificado. Detalle en la hoja *Insumos* del Excel.

| insumo | precio | fuente |
|---|---:|---|
| Piloncillo | $25/kg | mayoreo.online, caja 18 kg |
| Linaza molida | $50/kg | mayoreo.online, 10 kg |
| Almidón de tapioca | $60/kg | mayoreo.online, bulto 25 kg |
| Harina de almendra | $184/kg | mayoreo.online, desde 5 kg |
| Nuez pecana | $280/kg | `js/data.js` — ya en almacén |
| Agua purificada | $2.50/L | precio único de casa |

**Reutilizan almacén:** nuez pecana (PS-03, PS-04) y el café de la barra (PS-05, glaseado). Es la única sinergia con lo que ya existe.

**El insumo que manda el costo:** el pistacho a $850/kg y la frambuesa liofilizada a $1 800/kg. Entre los dos hacen que PS-02 cueste el doble que PS-01. La frambuesa además solo la usan PS-02 y PS-05.

### Punto crítico transversal

**Contaminación cruzada con gluten.** El obrador comparte espacio con la línea de tortilla. Toda esta familia debe hornearse en el **primer turno**, antes de abrir cualquier harina con gluten, con charolas y utensilios rotulados de uso exclusivo. Sin eso la carta no puede declarar "sin gluten" y la declaración es lo que sostiene el producto.

**Ajonjolí.** El tahini de PS-05 convierte el obrador en obrador con ajonjolí, y por eso las otras cuatro piezas lo declaran por contaminación cruzada. No es exceso de celo: es lo que exige compartir mesa el mismo día.

## Recomendación del analista

### Qué lanzar

**PS-01, PS-03 y PS-05.**

- **PS-01 Chocolate Chip Cookie** — es el top seller de Honest Greens y no hay razón para que aquí sea distinto. Food cost 21.5%, el segundo mejor de la línea.
- **PS-03 Banana Bread** — el más barato ($9.82) y el más limpio de contar: el plátano maduro hace casi todo el trabajo y casi no lleva endulzante añadido. Es el mejor argumento de marca de los cinco.
- **PS-05 Marbled Chocolate & Tahini** — el más distintivo, el que nadie más tiene en Puebla, y el que conecta con la barra de café por el glaseado.

### Qué dejar fuera de la v1

| pieza | por qué |
|---|---|
| **PS-02 Raspberry & Pistachio** | El doble de costo que PS-01 por dos insumos caros —pistacho $850/kg y frambuesa liofilizada $1 800/kg— que no usa casi nada más. Es la pieza que más capital inmoviliza por unidad vendida. |
| **PS-04 Carrot Chai Cake** | Su glaseado de anacardo es el mayor riesgo técnico de la línea: sin azúcar glas que lo estabilice, es una emulsión de fruto seco y agua con actividad de agua alta. Obliga a vitrina refrigerada y descarte a 72 h. Además arrastra las especias chai, que solo usa esta pieza. |

Si solo se pudiera abrir con una, es **PS-01**.

## Supuestos

1. **23 de 29 precios son `[SUPUESTO]`** con rango de mayoreo justificado. Los 6 verificados están en la tabla de arriba.
2. **Se descartaron dos precios scrapeados por imposibles:** pistacho pelado a $28/kg y avena a $1.30/kg. El fetch leyó precios "desde $X" o campos parciales. Usar esas cifras habría subcosteado la línea entera.
3. **Pérdida de horneado**: 10% en galleta, 13-15% en pan y pastel. Estimado, no medido en obrador.
4. **PS-03 y PS-04 son reconstrucción propia** en distinto grado: Honest Greens no publica la receta del Banana Bread, y del Carrot Chai Cake solo publica la lista de componentes.
5. **Zanahoria naranja en vez de amarilla** en PS-04: la amarilla no se consigue en Puebla. Declarado, no disimulado.
6. **El glaseado de anacardo no se ha probado** en vitrina 8 h. Es el supuesto más frágil del documento.
7. **Precio de carta** anclado a Honest Greens ajustado a Angelópolis. Sin validar contra competencia local.

## Estado de verificación

Honesto sobre cómo se produjo esto. El workflow de investigación con agentes **falló**: la máquina se suspendió durante la noche y mató 22 arranques de agente sin que ninguno completara. Las 5 fichas las formulé yo, con:

- Composición **declarada por Honest Greens** en su propio blog para PS-01, PS-02, PS-04 y PS-05.
- Precios **verificados en fuente** para 6 insumos; el resto con rango de mayoreo justificado.
- Verificación determinista: vegano, sin gluten y sin azúcar refinada **cumplen en los 5**; macros coherentes 4/4/9 dentro del 3-8% (la desviación es fibra de almendra, cacao y linaza, que es legítima); máximo 5 pasos; alérgenos completos incluyendo el ajonjolí por contaminación cruzada.

**Lo que NO está verificado:** nadie auditó esto adversarialmente. En particular quedan sin contradictor la estabilidad del glaseado de anacardo, la pérdida real de horneado y si las galletas de verdad salen crujientes por fuera y masticables por dentro con aceite de oliva. Eso se resuelve en obrador, no en documento.
