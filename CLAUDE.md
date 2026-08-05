# Contexto del proyecto — Cosecha

App de un restaurante fast-casual saludable. El usuario arma un plato modular
y la app calcula macros personalizados, sugiere extras y genera un QR para cocina.

## Arquitectura
- `src/index.html` — markup, sin lógica inline salvo onclick que llaman funciones globales
- `src/css/styles.css` — todos los estilos. Paleta crema + acento naranja (#C05A1F)
- `src/js/data.js` — datos: ingredientes, precios (pKg), factores, constantes
- `src/js/calc.js` — funciones puras: precio(), mac(), calcularMeta()
- `src/js/app.js` — estado y render de la UI; expone funciones a window

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

## Tareas pendientes / ideas
- [ ] Backend para guardar perfiles
- [ ] Base de datos real de ingredientes
- [ ] Integrar API de Anthropic para sugerencias inteligentes de extras
- [ ] Vista de cocina que lea el QR
- [x] Tests de las funciones de calc.js (tests/calc.test.mjs — `npm test`)
- [ ] Decidir destino de cosecha-standalone.html (tiene la lógica VIEJA pre-fix)
