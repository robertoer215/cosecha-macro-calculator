# Contexto del proyecto — Cosecha

App de un restaurante fast-casual saludable. El usuario arma un plato modular
y la app calcula macros personalizados, sugiere extras y genera un QR para cocina.

## Arquitectura
- `src/index.html` — markup, sin lógica inline salvo onclick que llaman funciones globales
- `src/css/styles.css` — todos los estilos. Paleta crema + acento naranja (#C05A1F)
- `src/js/data.js` — datos: ingredientes, precios (pKg), factores, constantes
- `src/js/calc.js` — funciones puras: precio(), mac(), calcularMeta()
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

## Reglas de negocio (NO cambiar sin avisar)
- Macros: Mifflin-St Jeor → TDEE → kcal objetivo → reparto por comida
- Precio: ceil((pKg × g/1000) × 1.40 / 0.85 × factorTamaño)
- Tamaños: Pequeña 0.5, Estándar 1, Grande 1.5
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
- [ ] Integrar API de Anthropic para sugerencias inteligentes de extras
- [ ] Vista de cocina que lea el QR
- [x] Tests de las funciones de calc.js (tests/calc.test.mjs — `npm test`)
- [ ] Decidir destino de cosecha-standalone.html (tiene la lógica VIEJA pre-fix)
