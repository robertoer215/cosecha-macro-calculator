# Modo IA en n8n — porcionado y ticket

Flujo `Xv459ruzH0Ag71qY` en `https://n8n.srv1683942.hstgr.cloud`, **activo**.
Webhook: `POST https://n8n.srv1683942.hstgr.cloud/webhook/cosecha-plato`

Se llama **una sola vez, al cerrar el plato**. El porcionado de cada toque corre
en local, en el navegador, sin red: cientos o miles de combinaciones de aritmética,
milisegundos.

## La regla que ordena todo el diseño

El agente NUNCA escribe un número. Ni un macro, ni un gramaje, ni un precio, ni
un total. Y no se confía en que obedezca: **se comprueba en cada petición**.

`Verificar y armar` extrae con una expresión regular todas las cifras del texto
del modelo y las contrasta contra el conjunto de números que produjo el cálculo
determinista. Si aparece una sola que no salga de ahí, el texto del modelo se
descarta entero y se sustituye por una explicación redactada en código. La
respuesta incluye siempre la traza:

```json
"auditoria": {
  "numeros_citados_por_el_modelo": 6,
  "numeros_inventados": [],
  "explicacion_del_modelo_aceptada": true,
  "suma_cuadra": true
}
```

Esa auditoría es más fuerte que la traza de herramientas: no comprueba que el
modelo *pudo* consultar el dato, sino que *no escribió* ninguno que no fuera el
calculado. Medido sobre 10 llamadas seguidas: 10/10 sin cifras inventadas.

El auditor funciona de verdad, y se le ha visto trabajar: cuando el modelo sumó
los gramos de las líneas por su cuenta (495) o los carbohidratos resultantes
(64 + 48 = 112), los marcó y tumbó su texto. El segundo caso se corrigió dándole
el total ya calculado en `propuesta_cierre.macros_resultantes`, en vez de
pedirle que no sumara.

## Los nodos

```
Webhook · plato
  → Validar entrada        rangos, ids, tamaños, duplicados, máximo 8 módulos
  → Leer catálogo          Sheets API, fuente única de verdad, en cada petición
  → Resolver plato         TODO lo numérico: consultar_menu + porcionar +
                           calculadora + armar_ticket + propuesta de cierre
  → ¿Entrada válida?       si no, responde 400 con los errores
  → Agente · explicar      Claude Haiku 4.5. Solo redacta. 4 herramientas
                           disponibles: consultar_menu, porcionar, calculadora,
                           armar_ticket
  → Verificar y armar      audita las cifras del modelo y ENSAMBLA la respuesta
  ├→ Responder JSON        va primero: el registro no bloquea al cliente
  └→ Registrar en Sheets
```

`Resolver plato` lleva embebido `src/motor.js`, réplica exacta de `js/calc.js`.
Verificado tras cada cambio de motor con platos de 4 a 8 módulos: **0 divergencias**. Es lo que
permite que `coincide_con_la_app` signifique algo. Si discrepan, gana n8n y la
discrepancia queda registrada.

## Porciones múltiples

`seleccion[].tamano` acepta `0.5 · 1 · 1.5 · 2 · 3 · 4`. A partir de 2 el módulo se
repite ("3 porciones" = tres raciones Estándar) y **cuesta N × precio_estandar**
del catálogo, la misma regla que la app. Cada categoría tiene tope de porciones
(proteína 3, carbohidrato 4, vegetal 2, grasa 2): un tamaño por encima no se
clava en silencio, va a `rechazados` con su motivo y el módulo se resuelve
automáticamente. Sin `tamano`, el porcionador decide dentro del tope. Y hay tope
de **2 módulos distintos por categoría** (400 si se supera), el mismo que la app.

El motor busca por **encuentro en el medio** (enumera las dos mitades del plato y
las cruza): mismo espacio de búsqueda y mismo óptimo que la enumeración plana,
pero 8 módulos libres —230.400 combinaciones— se resuelven en milisegundos donde
la plana tumbaba el task runner de n8n (>30 s, respuesta 200 vacía). Verificado
app contra n8n: 45 platos de 4 a 8 módulos con los seis tamaños y tamaños
clavados, 0 divergencias. `propuesta_cierre.tamanos_resultantes` dice qué tamaño
tendría CADA línea si se acepta, para que el agente no invente el mecanismo.

## Hojas

| | id |
|---|---|
| Catálogo | `1mTLfnFkM6bnoODaKPCe56jcrPDwODrPyvB0ci4QgDBI` |
| Pedidos | `1GuJ25cpQqYdW-K9gVaX2cEF8B0jtgS0_T-kCnqL3XlU` |

El catálogo es la fuente única: el negocio edita ahí disponibilidad del día,
precios y alérgenos sin tocar n8n. Se lee en cada petición, a propósito.

## Huecos declarados

- **Alérgenos SIN VERIFICAR.** No existen en ninguna fuente del repo: ni en
  `data.js`, ni en el recetario (que es de costos, no nutricional), ni en
  `insumos_catalogo.csv`. Los del catálogo están **derivados del nombre del
  plato** y la columna `alergenos_fuente` lo dice en cada fila. El filtro duro
  funciona, pero la respuesta añade un aviso explícito y no debe usarse como
  garantía alérgica hasta que cocina los valide.
- **Precios y pKg** siguen mal calibrados (trabajo aparte, parado a propósito).
- Las kcal de etiqueta no cumplen 4/4/9 exacto con sus propios macros.

## Latencia — criterio NO cumplido

El encargo pedía menos de 4 s. Medido sobre 10 llamadas:

| | min | mediana | p90 | max |
|---|---|---|---|---|
| flujo en el servidor | 2.9 s | **3.7 s** | — | 4.6 s |
| cliente desde México | 3.8 s | **4.9 s** | 5.5 s | 6.1 s |

Bajo 4 s: 7/10 en servidor, 1/10 desde el cliente. Desglose: cálculo
determinista 0.5 s, lectura del catálogo 0.4–1.1 s, agente 2.5–3.5 s en 1–2
llamadas al modelo. **Con un LLM en el camino crítico ese es el suelo.**

Se optimizó lo que se podía sin cambiar la arquitectura: Sonnet 5 → Haiku 4.5,
el registro en Sheets fuera del camino crítico (−1 s), rango del catálogo
recortado, prompt y respuesta acortados. De 11.2 s iniciales a 3.7 s de mediana.

Bajar de 4 s con garantía exige sacar el agente del camino crítico: responder en
menos de 1 s con los números y la explicación en código —que ya existe y es la
que se usa cuando el auditor rechaza al modelo— y dejar que el agente enriquezca
el registro después. Es una decisión de producto, y se decidió dejarlo como
está: el webhook se llama una sola vez al cerrar el plato, y ahí 4–5 s es un
tiempo tolerable.

## Trabajar con esto

```bash
python3 n8n/src/build.py     # regenera n8n/workflow.json desde los fuentes JS
# desplegar:
curl -X PUT -H "X-N8N-API-KEY: $K" -H "Content-Type: application/json" \
  --data-binary @n8n/workflow.json "$N8N/api/v1/workflows/Xv459ruzH0Ag71qY"
curl -X POST -H "X-N8N-API-KEY: $K" "$N8N/api/v1/workflows/Xv459ruzH0Ag71qY/activate"
```

Gotchas verificados en esta instancia: `/api/v1/workflows/{id}/run` **no existe**
(405), `/credentials` sí (200); `active` no puede ir en el PUT; `responseCode`
del nodo Respond va **dentro de `options`** o responde 200 igualmente; los
modelos Claude 5 no aceptan `temperature`, solo `maxTokensToSample`. El nombre
de la pestaña de Sheets se esquiva por completo usando la API de valores con
rango sin nombre de hoja (`/values/A1:Q30`), que toma la primera.
