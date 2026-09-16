# Contexto del proyecto — Cosecha

App de un restaurante fast-casual saludable. El usuario arma un plato modular
y la app calcula macros personalizados, sugiere extras y genera un QR para cocina.

## Arquitectura
- `src/index.html` — markup, sin lógica inline salvo onclick que llaman funciones globales
- `src/css/styles.css` — todos los estilos. Paleta crema + acento naranja (#C05A1F)
- `src/js/data.js` — datos: ingredientes, precios (pKg), factores, constantes
- `src/js/calc.js` — funciones puras: precio(), mac(), calcularMeta(), y el MODO IA:
  porcionar(), explicarCambio(), proponerCierre()
- `src/js/app.js` — estado y render de la UI; expone funciones a window
- `assets/ingredientes/` — foto de cada ingrediente, 600×600 JPEG (~110 KB). Son
  derivadas con `sips` de las fotos de la landing (repo cosecha-landing/assets).
  `src/assets` es un symlink a `../assets` para no duplicar los binarios en git.

## Fotos de ingredientes
- `data.js` trae `img` (nombre de archivo) y `foco` (object-position) por ingrediente.
- Las fotos son cuadradas y las tarjetas 4:3 (16:9 en móvil): `foco` recentra el recorte
  en los platos que no están al centro de su foto (guacamole, nueces, semillas, arroz,
  camote, esquites, verduras). Sin `foco` se corta el plato.
- Se renderizan con el helper `foto(it, cls)` de app.js, en tarjetas, extras y resumen.
  Van con `loading="lazy"`: el paso 2 sólo muestra una categoría a la vez.
- El ticket de cocina (instrucciones del QR) va sin fotos a propósito: es para staff.

## Duplicación src/ ↔ raíz (deuda conocida)
Los 5 archivos de `src/` y la raíz son copias idénticas: `npm run dev` sirve `src/`,
los tests importan de `../js/` y GitHub Pages sirve la raíz. Al tocar código hay que
copiar a las dos. Pendiente decidir si se colapsa en una sola ubicación.

## Modo IA — el tamaño es una respuesta, no una pregunta
El usuario elige QUÉ comer (proteína → carbohidrato → vegetal → grasa, mismas
tarjetas, mismo orden). El CUÁNTO lo resuelve `porcionar()`, que recorre TODAS las
combinaciones de tamaños de los módulos elegidos —cada uno dentro del tope de
porciones de su categoría, `tamanosPermitidos()`— y devuelve el óptimo global, no
una heurística. Corre en local, en cada toque, sin red: 0.4 ms en un plato de 4,
~47 ms en el peor caso medido (6 elegidos y una tarjeta hipotética: 69.120 combos).
- Función objetivo: suma de desviaciones absolutas normalizadas por la meta de
  cada macro, con la proteína a peso doble (PESO_MACRO). Desempata por precio.
- `szManual` son los overrides de "Ajustar": se clavan (`opts.fijos`) y el resto
  se optimiza alrededor. `szBase` es un CACHÉ derivado del porcionado, y por eso
  el resumen, el QR y el ticket siguieron funcionando sin enterarse del cambio.
- Los extras del paso 5 entran en el porcionado clavados a su tamaño: si no, la
  tarjeta afirma "Cierra tu meta" mientras la barra marca otra cosa.
- La línea de porqué se deriva del DIFF del porcionado, nunca de un modelo. Mide
  contra un CONTRAFACTUAL (el plato de ahora con los módulos previos clavados) y
  excluye lo que movió el usuario: la app no firma acciones ajenas. Si el coste
  ponderado no mejora, se calla.
- Nunca animar width ni height, solo opacity y transform. Las barras del tracker
  usan `transform:scaleX` por eso; su estilo inline es `transform:scaleX(0)`, no
  `width:0%`.

## Reglas de negocio (NO cambiar sin avisar)
- Macros: Mifflin-St Jeor → TDEE → kcal objetivo → reparto por comida
- Precio: ceil((pKg × g/1000) × 1.40 / 0.85 × factorTamaño)
- Tamaños: Pequeña 0.5, Estándar 1, Grande 1.5, y a partir de ahí PORCIONES
  MÚLTIPLES del mismo módulo (×2, ×3, ×4 = raciones Estándar repetidas), con tope
  por categoría en MAX_PORCIONES (proteína 3, carbohidrato 4, vegetal 2, grasa 2).
  Precio de 2+ porciones = N × precio Estándar (no la fórmula con ceil): es lo que
  espera quien pide "tres de camote" y coincide con el catálogo de n8n.
- Las kcal de la meta (fórmula y manual-total) se DERIVAN de los macros por comida
  ya redondeados (4P+4C+9G): el panel siempre cuadra. Carbos = residuo, nunca <0;
  si quedan en 0 g/comida se muestra el aviso .meta-warn (flag ajusteCarb).
- Las cartas muestran siempre el tamaño que se agregará al tocarlas (recomendado
  si el usuario no eligió otro): carta = barra = resumen = QR.
- Umbrales del resumen: ±4 g por macro; kcal ±68 (= 4·4+4·4+9·4, coherente con
  los ±4 g — reduce mucho los casos de "En tu meta" en macros con kcal en rojo).
- Nota conocida: las kcal de etiqueta en data.js no cumplen 4/4/9 exacto con sus
  propios macros (hasta ±9.5 kcal por item); en platos grandes esos desvíos pueden
  apilarse más allá de los 68 kcal y aún pintar la kcal en rojo con macros en meta.

## Bugs conocidos
- El QR del resumen NO se genera con platos de ~4 items o más: qrcodejs lanza
  `code length overflow (7908>2920)` porque buildQRText() supera la capacidad de la
  librería. El recuadro del QR queda vacío. Anterior a las fotos (verificado contra
  el commit 0f73bb7). Arreglo: acortar el texto (IDs y gramos en vez de nombres y
  encabezados) o subir correctLevel/versión.

## Tareas pendientes / ideas
- [ ] Backend para guardar perfiles
- [ ] Base de datos real de ingredientes
- [x] Integrar API de Anthropic — flujo n8n `Xv459ruzH0Ag71qY` (ver `n8n/README.md`)
- [ ] Vista de cocina que lea el QR
- [x] Tests de las funciones de calc.js (tests/calc.test.mjs — `npm test`)
- [ ] Decidir destino de cosecha-standalone.html (tiene la lógica VIEJA pre-fix)
- [ ] Alérgenos VERIFICADOS por cocina: hoy el catálogo de n8n los deriva del
      nombre del plato y lo declara fila a fila. No es una garantía alérgica.
- [x] El inventario de carbohidratos se quedaba corto (48 g con un módulo en
      Grande contra 96 g de meta media): resuelto con porciones múltiples (×2, ×3,
      ×4 del mismo módulo). Ojo: tras la rederivación el camote lleva 7.5 g de
      grasa por ración, así que el porcionador prefiere cerrar carbos con arroz.
- [ ] El recetario declara porción de 150 g para arroz y esquites; la app
      declara 120 y 100. Cerrar el conflicto antes de publicar carta.
