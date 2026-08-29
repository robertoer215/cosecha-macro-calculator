# Carta de postres y costeo — COSECHA

Cara al cliente y cara al negocio. 5 postres, sexta familia del sistema modular.

Registro internacional con una sola ancla local, según la dirección de carta de agosto de 2026. El ancla es **PS-04 Mousse de mamey, pepita caramelizada y lima**.

Cero azúcar refinada añadida en los cinco. Endulzantes: pasta de dátil, piloncillo declarado y monk fruit puro. La cobertura de cacao 72% aporta azúcar propia y se declara en los carbohidratos.

## Carta

## Frío

> **PS-02® Cheesecake frío de vainilla y maracuyá sobre crumble de pepita y nuez** — 213 g — $100
> Cheesecake frío sobre pepita y nuez. Maracuyá arriba. Cero azúcar añadida.
> 
> `527 kcal · P 25 g · C 32 g · G 33.2 g`

## De cuchara

> **PS-01® Cremoso de cacao 72%, aceite de oliva y sal** — 175 g — $95
> Cacao 72% en cuchara. Aceite de oliva, sal y crujiente de girasol.
> 
> `500 kcal · P 20 g · C 30 g · G 33.0 g`

> **PS-04® Mousse de mamey, pepita caramelizada y lima** — 182 g — $80
> Mamey aireado, pepita caramelizada y lima. Nuestra única ancla mexicana.
> 
> `281 kcal · P 22 g · C 26 g · G 9.7 g`

## De horno

> **PS-03® Sticky toffee de dátil y nuez, tibio** — 170 g — $100
> Bizcocho de dátil tibio, toffee caliente, crema fría de canela.
> 
> `573 kcal · P 14 g · C 34 g · G 42.2 g`

## Barra

> **PS-05® Barra de dátil, nuez y cacao 72%** — 91 g — $75
> Barra para llevar. Dátil, nuez y cacao 72%. Se come caminando.
> 
> `408 kcal · P 14 g · C 32 g · G 24.6 g`
## Costeo y margen

Igual que en bebidas: la **fórmula de la casa** es `ceil(costo × 1.40 ÷ 0.85)`, regla intocable. El **precio de carta** es mi recomendación comercial, anclada al mercado de Angelópolis.

| código | nombre | costo porción | precio fórmula | food cost fórmula | precio carta | food cost carta | margen bruto carta |
|---|---|---:|---:|---:|---:|---:|---:|
| PS-01® | Cremoso de cacao 72%, aceite de oliva y sal | $31.84 | $53 | 60.1 % | **$95** | 33.5 % | $63.16 |
| PS-02® | Cheesecake frío de vainilla y maracuyá sobre crumble de pepita y nuez | $33.77 | $56 | 60.3 % | **$100** | 33.8 % | $66.23 |
| PS-03® | Sticky toffee de dátil y nuez, tibio | $33.61 | $56 | 60.0 % | **$100** | 33.6 % | $66.39 |
| PS-04® | Mousse de mamey, pepita caramelizada y lima | $23.28 | $39 | 59.7 % | **$80** | 29.1 % | $56.72 |
| PS-05® | Barra de dátil, nuez y cacao 72% | $24.59 | $41 | 60.0 % | **$75** | 32.8 % | $50.41 |
| | **Promedio** | $29.42 | $49.00 | 60.0 % | **$90.00** | 32.7 % | $60.58 |

## Análisis operativo

### SKU nuevos a almacén

- **11 sub-recetas** entre los 5 postres. Es mucha producción para cinco referencias: cada una es una tarea de mise en place con su propio lote, etiqueta y vida útil.
- **Se reutilizan de almacén:** nueces ($280/kg) y semillas de girasol ($90/kg), ya presentes en `js/data.js`. Es la única sinergia real con el menú de comida.
- **Rotación lenta:** vainilla de Papantla, monk fruit, cobertura 72%. Caros por kilo, mínimos por porción.
- **Temporada en Puebla:** mamey (PS-04) y maracuyá (PS-02). El mamey además es el ancla local, lo que crea una tensión: la identidad mexicana de la carta depende de un insumo estacional.
- **Comparten insumo con bebidas:** cacao, dátil, pepita, vainilla, monk fruit. Conviene un solo lote de compra para las dos familias — está en `docs/INSUMOS.md`.

### Equipo a comprar

| equipo | rango MXN `[SUPUESTO]` | qué se cae sin él |
|---|---|---|
| Vitrina refrigerada de postres 2-4 °C | 35 000 – 85 000 | Los cinco |
| Abatidor de temperatura | 60 000 – 180 000 | PS-01, PS-02, PS-04 (cuajado y seguridad) |
| Horno de convección | 25 000 – 90 000 | PS-02 (crumble), PS-03, PS-05 |
| Licuadora de vaso alta o de inmersión | ya en la barra | PS-01, PS-04 |
| Báscula de 0.1 g | 1 500 – 4 000 | Dosificación de gelatina y monk fruit |

El abatidor es la pieza discutible: $60-180k para tres postres. Sin él hay que alargar los tiempos de enfriado y aceptar más riesgo microbiológico. **Recomiendo abrir sin abatidor** y con baño de hielo controlado por termómetro, revisando la decisión cuando el volumen la justifique.

### Cuello de botella

El postre no compite por la barra: compite por **espacio de nevera** y por **la mano que emplata en el pase**.

Con 20% de attach sobre 100 comandas en el pico de 13:00–15:00:

```
20 postres × tiempo medio de pase 60 s = 1 200 s
sobre 7 200 s de servicio = 17% de una plaza
```

Holgado — **salvo PS-03**. Su pase de **150 s** es 3-7× el del resto porque se sirve tibio y hay que atemperarlo a la orden. Si PS-03 vendiera solo, consumiría 3 000 s. Es el único postre que puede romper el pase.

Necesidad de vitrina: **5 referencias × ~20 porciones dosificadas = 100 porciones** en frío permanente. Es el dimensionado que manda sobre la compra de la vitrina, no las kcal ni el costo.

### Qué se batchea y qué no

**Se batchea:** cremoso de cacao (lotes de 2 kg = 13 porciones, 4 días), crumbles (1 kg = 39 porciones, 10 días en hermético **con desecante y fuera de cámara** — dentro se ablanda en 24 h), pasta de dátil, compotas, barras.

**No se batchea:** el montaje final de PS-01, PS-02 y PS-04 — el crumble va al costado y nunca encima, porque mojado pierde el crujiente en dos minutos. El aceite, los nibs y la sal entran al pase, delante del cliente.

## Recomendación del analista

### Top 2 esperado de venta

Mix estimado `[SUPUESTO]`:

1. **PS-01 Cremoso de cacao 72% — 25%.** El chocolate es el default universal del postre. Sabe a postre de verdad, no a sustituto, y su contraste de aceite de oliva y sal es lo que lo saca de "versión saludable". Es el que desactiva el prejuicio "Cosecha = insípido".
2. **PS-04 Mousse de mamey — 20%.** El más barato ($23.27), el de mejor food cost (25.9%), el de mejor perfil de macros (281 kcal con 22 g de proteína) y el único con identidad mexicana. Es el postre que Rodrigo puede pedir sin salirse de su objetivo.

### Qué NO lanzar en la v1

**Abriría con 3.**

| postre | por qué fuera |
|---|---|
| **PS-03 Sticky toffee tibio** | **150 s de pase.** Es el único que compite de verdad por la mano del pase y el único que exige servicio tibio en un fast-casual. Además es el de peor perfil (573 kcal, 14 g de proteína, 42 g de grasa) para el cliente primario. |
| PS-05 Barra de dátil y nuez | Es el más débil como postre de restaurante: se percibe como snack, no como cierre de comida. Tiene mejor futuro como producto de mostrador para llevar que como referencia de carta. |

**V1 = PS-01, PS-02, PS-04.** Mantiene contraste de textura (cremoso, cheesecake con crumble, mousse aireada), un rango de macros útil (281 a 527 kcal) y el ancla local.

### Impacto en ticket

Attach de postre en fast-casual es mucho menor que el de bebida: la gente compra bebida por sed y hábito diario, y postre por antojo ocasional. Uso **20%** `[SUPUESTO]`, contra el 60% de bebida.

```
precio medio ponderado de postre      $91.00
costo medio ponderado                 $29.76
margen bruto por postre               $61.24   (food cost 32.7%)

attach 20%  ->  incremento por comanda  $18.20
ticket           $275.00  ->  $293.20   (+6.6%)
margen bruto incremental / 100 comandas  $1,225
```

### Bebida o postre: dónde poner la atención del piloto

| | bebida | postre |
|---|---:|---:|
| Attach | 60% | 20% |
| Precio medio | $69.45 | $91.00 |
| Margen por unidad | $50.32 | $61.24 |
| **Margen / 100 comandas** | **$3,019** | **$1,225** |
| Inversión en equipo | alta (espresso) | media (vitrina) |
| SKU nuevos | 149 | ~40, con solapamiento |

**La bebida rinde 2.5× lo que rinde el postre por comanda**, pese a que el postre tiene mejor precio y mejor margen unitario. Todo está en el attach rate: se vende tres veces más.

La conclusión operativa es que el postre **no merece la primera atención del piloto**. Merece tres referencias bien ejecutadas que sostengan la promesa de marca — que un cliente que entrena pueda cerrar la comida sin culpa — y nada más. La energía de producto va a la barra.

### Riesgos

| riesgo | mitigación |
|---|---|
| PS-03 rompe el pase con 150 s | No lanzarlo en v1. Si entra, solo fuera de hora pico. |
| El ancla local depende de mamey estacional | Tener PS-04 como fijo solo en temporada; fuera de ella, rotar a otro ancla. |
| Merma en vitrina con 5 referencias × 20 porciones | Abrir con 3 referencias. Dosificar 24 h antes, no más. |
| Sin abatidor, el cuajado alarga y sube el riesgo | Baño de hielo con termómetro y registro de temperatura por turno. |
| Un postre "saludable" que sepa a sustituto | PS-01 lleva sal, ácido y amargo de cacao precisamente para dar relieve sin azúcar. Es la defensa técnica contra el prejuicio de marca. |
| 32.7% de food cost, alto para repostería | Es el costo de la restricción de cero azúcar refinada. Se acepta o se revisa la restricción, no hay tercera vía. |
| Canibalizar el plato principal | A 75-100 MXN contra un plato de 250-300, complementan. |

## Supuestos

1. **Todos los precios de insumo son `[SUPUESTO]`** salvo nueces y semillas de girasol, que vienen de `js/data.js`. Detalle completo en `docs/INSUMOS.md`.
2. **Attach rate 20%**: estimado por comportamiento típico de fast-casual, no medido. Es el número que más mueve las conclusiones de este documento.
3. **Mix de venta**: estimado. PS-01 25%, PS-02 20%, PS-03 20%, PS-04 20%, PS-05 15%.
4. **Precio de carta**: anclado a ≈0.75× la referencia de Honest Greens en España. Sin validar contra competencia local.
5. **Ticket de comida $275**: punto medio del WTP declarado en las 13 entrevistas. Es WTP declarado, no gasto observado.
6. **Tiempos de pase**: estimados por el chef, **no auditados** — ver abajo.
7. **Rangos de precio de equipo**: mercado mexicano 2026, sin cotizar.

## Estado de verificación

**Advertencia importante y honesta: estos 5 postres NO pasaron la auditoría adversarial.**

El diseño del pipeline era: dos chefs proponen 7 postres cada uno desde ángulos opuestos → un juez elige y fusiona los 5 mejores → tres lentes adversariales (costeo, nutrición, cocina) → corrección → análisis.

Las tres primeras etapas se completaron. **Las tres lentes de verificación y el análisis murieron al agotarse el límite de gasto de la cuenta.**

Lo que sí verifiqué yo, de forma determinista:

| chequeo | resultado |
|---|---|
| Gramaje de insumos vs porción declarada | **cuadra exacto** en los 5 |
| Coherencia 4/4/9 de cada insumo | sin desvíos fuera de tolerancia |
| Máximo 5 pasos de preparación | cumple (4 y 5) |
| Azúcar refinada disfrazada | ninguna detectada |
| Alérgenos declarados | los 5 los declaran |
| Registro 4 internacionales + 1 ancla | correcto |

Lo que **no** está verificado y solo una lente adversarial habría cazado:

- **Precios de insumo:** nadie contrastó los $/kg contra rango de mercado real. En bebidas, esa misma lente encontró el arándano costeado a la mitad de su precio.
- **Técnica:** nadie comprobó que las mousses cuajen, que los ratios de gelatina estén declarados, ni que el crumble sin azúcar cristalizada logre y mantenga el crujiente.
- **Sabor y solapamiento:** el juicio de si saben a postre de verdad o a "versión saludable" viene de un solo agente, sin contradictor.
- **PCC:** en bebidas la lente de barra encontró un remojo a 60 °C dentro de zona de peligro. Aquí nadie miró con esos ojos.

### Auditoría post-entrega

Sobre los 5 postres se corrió después una auditoría determinista, que corrigió:

| hallazgo | corrección |
|---|---|
| Agua filtrada y agua hirviendo costeadas a **$0** en 5 sub-recetas | Normalizadas a $2.50/L, el precio único de la casa. |
| Costo por lote desfasado en 7 sub-recetas tras normalizar el agua | Recalculado y repercutido en su línea padre. |

Ningún postre declaraba alérgenos de menos, ninguno excedía 5 pasos y los gramajes siguen cuadrando exacto con la porción declarada.

**Recomendación:** esto no sustituye las tres lentes adversariales. Antes de llevar estos postres a cocina hay que correrlas: la auditoría determinista comprueba aritmética y formato, no técnica ni sabor. El workflow está guardado y se reanuda desde caché sin repetir la formulación.
