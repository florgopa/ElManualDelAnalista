# El Manual del Analista

📚 La web de la Colección Analista de Sistemas, tronco Fundamentos: 7 volúmenes educativos, con teoría, casos, ejercicios y laboratorios prácticos.

Una guía para entender, modelar y construir sistemas, desde el problema hasta la arquitectura que lo sostiene. Los 7 volúmenes recorren un mismo caso transversal —un lavadero de autos y Turnify, su sistema de turnos— y comparten identificadores (requisitos, historias, criterios de aceptación, decisiones de arquitectura) que se enlazan entre sí a lo largo del manual.

## Empezar

Requisitos: Node.js 20 o posterior y npm.

```bash
npm install
npm run dev
```

Vite muestra la dirección local en la terminal. Para generar y previsualizar la versión de producción:

```bash
npm run build
npm run preview
```

## Qué incluye

- Inicio editorial con acceso al recorrido completo y al hilo transversal de la doble reserva de turno.
- Mapa de aprendizaje y páginas para los 7 volúmenes, cada una con su ficha ("Sobre este volumen") y su tabla de recorrido.
- Capítulos con los 4 tipos de recuadro del material (idea clave, el caso, practicá, atención), refresco de conceptos (desde el Vol. 05) y fuentes por capítulo.
- Cierre de cada volumen: desafío integrador, mapa de salida, respuestas orientativas (colapsables) y bibliografía.
- Identificadores (`TRN-xxx`, `HU-##`, `CU-##`, `CA-##.#`, `ADR-###`) enlazados automáticamente a su capítulo de definición, para saltar entre volúmenes.
- Búsqueda local en títulos y contenido, disponible con el botón de búsqueda o `Ctrl/⌘ K`.
- Diseño adaptable a escritorio y móvil, navegación por teclado y preferencia de movimiento reducido.
- Un espacio documentado para planear el futuro laboratorio SQL local.

El contenido pedagógico es una transcripción fiel de `docs/*.docx` (fuente de verdad); la web no reescribe el material.

## Estructura

```text
src/
  components/           Navegación, recuadros, tablas y tarjeta de volumen
  content/volumes/      Un módulo por volumen (vol-01.js … vol-07.js), transcripto desde docs/
  content/tronco.js      Lista fija de los 7 volúmenes
  content/identifiers.jsx Índice de identificadores cruzados entre volúmenes
  App.jsx                Rutas y vistas (react-router-dom)
  styles.css              Sistema visual y reglas responsive
labs/sql/       Alcance y modelo inicial del laboratorio
docs/           Los 7 .docx fuente y las decisiones de producto y diseño
```

## Roadmap

### v0.1 — El Manual existe

- [x] Home, navegación y mapa de aprendizaje
- [x] Páginas de volúmenes y capítulos
- [x] Contenido de ejemplo de los volúmenes 01–06
- [x] Turnify como caso transversal
- [x] Búsqueda local y diseño responsive

### v0.2 — El Manual enseña el contenido real

- [x] Contenido real de los 7 volúmenes, transcripto desde `docs/*.docx`
- [x] Ficha, recorrido, 4 recuadros, refresco de conceptos y fuentes por capítulo
- [x] Cierre de volumen: desafío integrador, mapa de salida, respuestas orientativas, bibliografía
- [x] Identificadores (TRN/HU/CU/CA/ADR) enlazados entre volúmenes
- [x] Rutas reales por volumen y capítulo (`react-router-dom`)
- [ ] Bloques de código y diagramas didácticos
- [ ] Progreso visual local
- [ ] Primer laboratorio SQL con dataset Turnify

### v0.3 — El Manual interactúa

- [ ] Ejecución SQL en el navegador
- [ ] Validación de ejercicios, pistas y soluciones
- [ ] Reset del laboratorio y estados de error

Autenticación, pagos y backend quedan para cuando una necesidad real los justifique.

## Decisiones

Consultar [docs/decisiones.md](docs/decisiones.md) para la arquitectura inicial, el sistema visual y los límites del MVP, y [labs/sql/README.md](labs/sql/README.md) para el alcance del laboratorio futuro.
