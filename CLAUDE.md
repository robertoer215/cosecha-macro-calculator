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

## Tareas pendientes / ideas
- [ ] Backend para guardar perfiles
- [ ] Base de datos real de ingredientes
- [ ] Integrar API de Anthropic para sugerencias inteligentes de extras
- [ ] Vista de cocina que lea el QR
- [ ] Tests de las funciones de calc.js
