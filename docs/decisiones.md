# Decisiones del MVP

## Producto

El Manual del Analista es la web de la Colección Analista de Sistemas, tronco Fundamentos: 7 volúmenes educativos para analistas de sistemas, con un caso transversal ficticio (un lavadero de autos y Turnify, su sistema de turnos). La primera versión prioriza recorrer y entender el contenido; no requiere cuentas, backend ni persistencia de progreso.

## Estructura

- **React + Vite:** base pequeña de desarrollo y publicación estática.
- **`src/content/volumes/vol-01.js` … `vol-07.js` + `index.js`:** un módulo por volumen, transcripto fielmente desde `docs/*.docx` (fuente de verdad). Cada volumen tiene `ficha` (Sobre este volumen), `recorrido` (tabla de capítulos y preguntas), `intro`, `chapters` (con `refrescoConceptos` desde el Vol. 05, `body` como bloques tipados y `fuentes`) y `cierre` (desafío integrador, mapa de salida, respuestas orientativas, bibliografía; `cierreTronco` solo en el Vol. 07).
- **`src/content/tronco.js`:** la lista fija de los 7 volúmenes (id, título, color), usada por la navegación y por la tabla "← estás acá" de cada mapa de salida.
- **`src/content/identifiers.jsx`:** índice a mano de los ~20 identificadores que atraviesan la colección (`TRN-xxx`, `HU-##`, `CU-##`, `CA-##.#`, `ADR-###`). `linkifyIdentifiers`/`renderText` los detectan en cualquier texto y los convierten en links a su capítulo de definición.
- **Componentes en `src/components/`:** navegación, iconos, tarjetas, y los renderers de contenido (`Box` para los 4 recuadros — idea clave, el caso, atención, practicá, más `adr` en el Vol. 07 —, `ConceptTable`, `DataTable`, `ChapterBody`, `VolumeFicha`, `ClosingSections`).
- **`src/App.jsx` + `react-router-dom`:** rutas reales (`/`, `/mapa`, `/buscar`, `/volumen/:volId`, `/volumen/:volId/capitulo/:chapId`) para poder enlazar directamente a un capítulo o a la definición de un identificador. Se incorporó cuando el volumen de contenido (7 volúmenes, hasta 12 capítulos c/u, más anclas de identificadores) cruzó el umbral que esta misma decisión había anticipado.
- **`labs/sql/`:** alcance, modelo pedagógico y dataset propuesto para orientar una futura práctica local en navegador. No instala ni ejecuta todavía un motor SQL.

## Dirección visual

Una publicación digital de estudio: papel cálido, tipografía editorial para títulos, sans legible para lectura, verde salvia y acentos de tinta. La información técnica aparece en mono solo para etiquetas y ejemplos de datos. La navegación y los capítulos priorizan jerarquía clara, controles visibles y composición adaptable.

## Accesibilidad

La interfaz usa controles HTML nativos, etiquetas en español, foco visible, estados de interacción y adaptación a movimiento reducido. Los iconos SVG decorativos se ocultan a lectores de pantalla cuando el texto del control ya nombra su acción.

## Límites deliberados

No hay autenticación, pagos, backend, progreso persistente ni ejecución SQL. El contenido pedagógico es una transcripción fiel de `docs/*.docx`: la web no reescribe el material, solo le da estructura y navegación. Las referencias narrativas sueltas tipo "(Vol. 04, cap. 08)" quedan como texto plano, sin auto-link — solo los identificadores formales (TRN/HU/CU/CA/ADR) se enlazan automáticamente.
