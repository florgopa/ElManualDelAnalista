export default {
  id: '06',
  title: 'APIs e integración',
  subtitle: 'De una operación interna a un contrato que otros sistemas puedan usar',
  ficha: {
    proposito: 'Diseñar y analizar interfaces entre sistemas: HTTP, contratos, errores, seguridad, integración síncrona y asíncrona, reintentos, idempotencia y evolución.',
    publico: 'Estudiantes que ya consumieron o programaron alguna API. Cada capítulo abre con un refresco de los conceptos que usa.',
    competencias: 'Conocer, aplicar y analizar: métodos y códigos HTTP; recursos y payloads; errores; autenticación y autorización; paginación; OpenAPI; timeouts, reintentos e idempotencia; webhooks; compatibilidad.',
    casoTransversal: 'Turnify expone su capa de datos del Vol. 05 a una app de clientes y a un panel para el encargado, y se integra con el servicio de mensajería.',
    metodo: 'Cada capítulo empieza con un refresco de conceptos, los aplica a Turnify y termina con una práctica.',
    lugarEnElTronco: '06 · Fundamentos. Requiere los Vol. 01 a 05.',
    nivel: 'Inicial a intermedio',
    requiere: 'Vol. 01 a 05',
    preparaPara: 'arquitectura · integración · sistemas distribuidos',
  },
  recorrido: [
    { chapterId: '01', title: 'Una API como frontera', pregunta: '¿Qué estamos exponiendo y para quién?' },
    { chapterId: '02', title: 'HTTP sin magia', pregunta: '¿Qué ocurre realmente entre request y response?' },
    { chapterId: '03', title: 'Diseñar operaciones', pregunta: '¿Cómo representamos una intención con recursos y métodos?' },
    { chapterId: '04', title: 'Datos que entran y salen', pregunta: '¿Qué debe contener un request o una response?' },
    { chapterId: '05', title: 'Errores que se puedan entender', pregunta: '¿Cómo comunica una API que algo salió mal?' },
    { chapterId: '06', title: 'Autenticación y autorización', pregunta: '¿Quién sos y qué podés hacer?' },
    { chapterId: '07', title: 'Colecciones, filtros y paginación', pregunta: '¿Cómo devolvemos miles de turnos?' },
    { chapterId: '08', title: 'Contratos y OpenAPI', pregunta: '¿Cómo hacemos explícito lo que la API promete?' },
    { chapterId: '09', title: 'Integración síncrona', pregunta: '¿Qué pasa cuando dependemos de otro sistema ahora mismo?' },
    { chapterId: '10', title: 'Reintentos e idempotencia', pregunta: '¿Cómo evitamos duplicar operaciones cuando algo falla?' },
    { chapterId: '11', title: 'Eventos y webhooks', pregunta: '¿Cuándo conviene avisar en lugar de preguntar?' },
    { chapterId: '12', title: 'Evolución e integración', pregunta: '¿Cómo cambiamos una API sin romper a nadie?' },
  ],
  intro: {
    title: 'Sobre este volumen',
    body: [
      { type: 'p', text: 'En los volúmenes anteriores construimos el dominio, sus reglas, los modelos y la capa de datos. Ahora aparece una pregunta nueva: ¿cómo hace una parte del sistema para pedirle algo a otra sin conocer cómo está implementada? Este volumen estudia APIs HTTP e integración desde el punto de vista de un analista: diseñar contratos, anticipar errores, proteger recursos y entender qué cambia cuando una operación cruza una frontera.' },
      { type: 'box', kind: 'idea-clave', title: null, text: 'Una API no es una URL con JSON. Es un límite entre partes de un sistema, con reglas, datos, errores y expectativas que tienen que poder comunicarse.' },
      { type: 'h3', text: 'El recorrido' },
      { type: 'p', text: 'Los capítulos 01 a 04 construyen la API; del 05 al 08, la vuelven usable y segura; del 09 al 12, la conectan con otros sistemas y la preparan para cambiar.' },
      { type: 'h3', text: 'Cómo leer este cuadernillo' },
      { type: 'p', text: 'Los recuadros cumplen la misma función que en los volúmenes anteriores, y cada capítulo abre con un Refresco de conceptos, como en el Vol. 05.' },
      { type: 'table', headers: ['Recuadro', 'Qué significa'], rows: [
        ['IDEA CLAVE', 'La idea que tenés que llevarte del capítulo. Hay una sola por capítulo.'],
        ['EL CASO', 'Turnify y el lavadero: el ejemplo que acompaña toda la colección.'],
        ['PRACTICÁ', 'Un ejercicio, marcado con su nivel: conocer, aplicar o analizar. Las respuestas orientativas están al final.'],
        ['ATENCIÓN', 'Un error frecuente o una confusión que conviene evitar.'],
      ] },
      { type: 'p', text: 'La especificación OpenAPI del capítulo 08 se validó con una herramienta automática, y el SQL de idempotencia del capítulo 10 se ejecutó sobre la base de prueba del Vol. 05. Las definiciones remiten a una fuente citada al final de cada capítulo; los ejemplos y ejercicios son elaboración didáctica propia.' },
    ],
  },
  chapters: [
    {
      id: '01',
      title: 'Una API como frontera',
      refrescoConceptos: {
        intro: null,
        subtitulo: null,
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['API', 'Una interfaz de programación: el conjunto de operaciones que un componente ofrece a otros, con sus reglas de uso.'],
          ['Contrato', 'Lo que la API promete: qué operaciones existen, qué datos reciben y devuelven, qué errores pueden ocurrir y qué significan.'],
          ['Proveedor y consumidor', 'El proveedor implementa la API; el consumidor la usa. Un mismo sistema puede ser las dos cosas.'],
          ['Recurso', 'Algo del dominio que la API permite identificar y manipular, como un turno.'],
          ['Operación', 'Una acción sobre un recurso: consultarlo, crearlo, cancelarlo.'],
          ['Encapsulamiento', 'El consumidor conoce el contrato, no la implementación. Eso permite cambiar la implementación sin avisarle.'],
        ],
      },
      body: [
        { type: 'h3', text: '1.1 Las fronteras de Turnify' },
        { type: 'p', text: 'Figura 1.1 — Fronteras de Turnify. Las líneas punteadas son integraciones de versiones futuras.' },
        { type: 'p', text: 'Las líneas punteadas no son parte de la primera versión: el cobro quedó fuera cuando priorizamos en el Vol. 02 (cap. 08) y el calendario externo todavía no se pidió. Aparecen porque son buenos ejemplos de lo que pasa al cruzar una frontera (caps. 09 y 11).' },
        { type: 'box', kind: 'el-caso', title: '¿Qué debería saber el frontend?', text: 'Qué operaciones existen, qué datos enviar y qué respuestas esperar. No debería saber que hay una tabla servicio_recurso, que la superposición se controla con EXCLUDE ni que el turno no guarda cliente_id. Todo eso puede cambiar sin que la app se entere.' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Una API puede responder correctamente y aun así tener un contrato malo. Ambiguo, frágil, inseguro o difícil de evolucionar: esos son los problemas que estudia este volumen.' },
        { type: 'box', kind: 'practica', nivel: 'CONOCER', title: 'Consumidores y proveedores', text: 'Para cada línea de la figura 1.1, indicá quién es proveedor y quién consumidor. ¿Hay algún componente que cumpla los dos roles?' },
      ],
      fuentes: ['MDN Web Docs — An overview of HTTP.', 'Microsoft — REST API Guidelines.'],
    },
    {
      id: '02',
      title: 'HTTP sin magia',
      refrescoConceptos: {
        intro: 'RFC 9110 define la semántica de HTTP: un protocolo de pedido y respuesta, sin estado, en el que un cliente envía una solicitud y un servidor devuelve una respuesta.',
        subtitulo: 'HTTP',
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['Request', 'Un método, un destino (la URI), encabezados y, a veces, un cuerpo.'],
          ['Response', 'Un código de estado, encabezados y, a veces, un cuerpo.'],
          ['Método', 'La intención de la solicitud: GET, POST, PUT, PATCH, DELETE (cap. 03).'],
          ['Encabezados', 'Metadatos: tipo de contenido, credenciales, idioma, caché, claves de idempotencia (cap. 10).'],
          ['Tipo de medio', 'El formato del cuerpo, indicado en Content-Type: por ejemplo, application/json.'],
          ['Código de estado', 'Tres dígitos cuya primera cifra indica la clase: 1xx informativa, 2xx éxito, 3xx redirección, 4xx error del cliente, 5xx error del servidor.'],
          ['Sin estado', 'Cada solicitud tiene que llevar todo lo necesario para entenderse; el protocolo no recuerda las anteriores.'],
          ['HTTPS', 'HTTP sobre TLS: la comunicación viaja cifrada y el cliente puede verificar la identidad del servidor.'],
        ],
      },
      body: [
        { type: 'h3', text: '2.1 Una reserva, de punta a punta' },
        { type: 'p', text: 'Cuando el cliente toca “Confirmar” en la app, viaja esto:' },
        { type: 'p', text: `POST /turnos HTTP/1.1
Host: api.turnify.example
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json
Idempotency-Key: b7e3a1c0-5d2f-4e8a-9c1b-2f3e4d5a6b7c

{
  "servicioId": "2",
  "vehiculoId": "1",
  "inicio": "2026-10-05T11:00:00-03:00"
}` },
        { type: 'p', text: 'Y si todo sale bien, vuelve esto:' },
        { type: 'p', text: `HTTP/1.1 201 Created
Location: /turnos/65738
Content-Type: application/json

{
  "id": "65738",
  "inicio": "2026-10-05T11:00:00-03:00",
  "fin": "2026-10-05T12:00:00-03:00",
  "estado": "confirmado",
  "servicio": "Lavado completo",
  "patente": "AB123CD"
}` },
        { type: 'p', text: 'Cada línea tiene su capítulo: el método y la ruta (03), el cuerpo (04), el código (05), la autorización (06) y la clave de idempotencia (10).' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'HTTP no recuerda nada: cada solicitud tiene que explicarse sola.' },
        { type: 'box', kind: 'practica', nivel: 'CONOCER', title: 'Leer una respuesta', text: 'Si la reserva hubiera ido a un servicio que requiere revisión, ¿qué cambiaría en la respuesta? ¿El código de estado sería otro?' },
      ],
      fuentes: ['IETF — RFC 9110, HTTP Semantics (2022).', 'MDN Web Docs — HTTP messages; HTTP response status codes.'],
    },
    {
      id: '03',
      title: 'Diseñar operaciones',
      refrescoConceptos: {
        intro: 'RFC 9110 define dos propiedades que importan mucho para diseñar y, más adelante, para reintentar (cap. 10). Un método es seguro si su semántica es solo de lectura. Es idempotente si repetir la misma solicitud tiene el mismo efecto en el servidor que hacerla una vez.',
        subtitulo: 'Métodos y sus propiedades',
        headers: ['Método', 'Uso habitual', 'Seguro', 'Idempotente'],
        rows: [
          ['GET', 'Consultar un recurso o una colección.', 'Sí', 'Sí'],
          ['POST', 'Crear un recurso o ejecutar una acción.', 'No', 'No'],
          ['PUT', 'Reemplazar completo el recurso en esa URI.', 'No', 'Sí'],
          ['PATCH', 'Modificar parte de un recurso (RFC 5789).', 'No', 'No necesariamente'],
          ['DELETE', 'Eliminar el recurso.', 'No', 'Sí'],
        ],
      },
      body: [
        { type: 'p', text: 'Idempotente no significa que la respuesta sea la misma: un segundo DELETE puede devolver 404. Significa que el estado del servidor queda igual.' },
        { type: 'h3', text: '3.1 Las operaciones de Turnify' },
        { type: 'table', headers: ['Intención', 'Operación', 'Por qué'], rows: [
          ['Consultar la agenda', 'GET /turnos?fecha=…', 'Lectura de una colección.'],
          ['Ver un turno', 'GET /turnos/{id}', 'Lectura de un recurso.'],
          ['Reservar', 'POST /turnos', 'Crea un turno; el servidor asigna id, fin, recurso y estado.'],
          ['Cancelar', 'POST /turnos/{id}/cancelacion', 'No borra: cambia el estado (Vol. 05, cap. 06).'],
          ['Reprogramar', 'POST /turnos/{id}/reprogramacion', 'Cancela y crea en una sola transacción (Vol. 05, cap. 09).'],
          ['Aprobar un pendiente', 'POST /turnos/{id}/aprobacion', 'Una acción del encargado (Vol. 04, figura 8.1).'],
        ] },
        { type: 'box', kind: 'atencion', title: null, text: 'DELETE /turnos/{id} para cancelar sería un contrato engañoso. El turno no desaparece: queda cancelado, con su historia. El nombre de la operación tiene que decir lo que pasa en el dominio.' },
        { type: 'p', text: 'Las acciones que no encajan en crear, leer, actualizar o borrar se pueden modelar como un recurso que representa la acción (la cancelación de un turno) y crearlo con POST. Es una convención, no una regla de HTTP.' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Diseñá operaciones a partir de las intenciones del dominio, no de las tablas.' },
        { type: 'box', kind: 'practica', nivel: 'ANALIZAR', title: 'PATCH o acción', text: 'Alguien propone cancelar con PATCH /turnos/{id} y el cuerpo { "estado": "cancelado" }. ¿Qué ventajas y qué riesgos tiene frente a POST /turnos/{id}/cancelacion?' },
      ],
      fuentes: ['IETF — RFC 9110, sección de métodos; RFC 5789, PATCH.', 'Microsoft — REST API Guidelines.'],
    },
    {
      id: '04',
      title: 'Datos que entran y salen',
      refrescoConceptos: {
        intro: null,
        subtitulo: 'Parámetros y representaciones',
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['Parámetro de ruta', 'Identifica el recurso: el {id} de /turnos/{id}.'],
          ['Parámetro de consulta', 'Modifica la búsqueda: ?fecha=2026-10-05&limit=50.'],
          ['Encabezado', 'Datos sobre la solicitud, no sobre el recurso: credenciales, claves de idempotencia.'],
          ['Cuerpo', 'La representación que se envía o se recibe, normalmente en JSON.'],
          ['DTO', 'La forma en que los datos cruzan la frontera, separada de cómo se guardan.'],
          ['Fechas', 'RFC 3339 (un perfil de ISO 8601), siempre con zona horaria: 2026-10-05T11:00:00-03:00.'],
        ],
      },
      body: [
        { type: 'h3', text: '4.1 El request para reservar' },
        { type: 'p', text: 'De todas las columnas de la tabla turno, el cliente envía solo tres: servicioId, vehiculoId e inicio. Todo lo demás lo decide el servidor:' },
        { type: 'table', headers: ['Campo', '¿Lo envía el cliente?', 'Por qué'], rows: [
          ['id', 'No', 'Lo genera la base.'],
          ['fin', 'No', 'Se calcula con la duración del servicio. Si lo enviara el cliente, podría no coincidir.'],
          ['estado', 'No', 'Depende de si el servicio requiere revisión (Vol. 04, figura 5.1).'],
          ['recursoId', 'No', 'El cliente elige servicio y horario; el servidor asigna un recurso habilitado y libre.'],
          ['creado_en, empleado', 'No', 'Son datos internos o del encargado.'],
        ] },
        { type: 'box', kind: 'atencion', title: null, text: 'Los identificadores viajan como texto. Las claves bigint del Vol. 05 pueden superar el número entero más grande que JavaScript representa con exactitud (2⁵³ − 1). Enviarlas como texto evita que la app las redondee.' },
        { type: 'p', text: 'Conviene decidir una sola convención de nombres (en este volumen, camelCase en JSON aunque la base use snake_case) y mantenerla en todo el contrato.' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Si el servidor puede calcular un dato, el cliente no debería enviarlo.' },
        { type: 'box', kind: 'practica', nivel: 'APLICAR', title: 'El request de reprogramar', text: 'Diseñá el cuerpo de POST /turnos/{id}/reprogramacion. ¿Qué campos necesita? ¿Puede cambiar el servicio o solo el horario?' },
      ],
      fuentes: ['IETF — RFC 3339, Date and Time on the Internet: Timestamps.', 'Fowler, M. — Patterns of Enterprise Application Architecture, Data Transfer Object.'],
    },
    {
      id: '05',
      title: 'Errores que se puedan entender',
      refrescoConceptos: {
        intro: null,
        subtitulo: 'Códigos de error',
        headers: ['Código', 'Significado', 'En Turnify'],
        rows: [
          ['400 Bad Request', 'La solicitud está mal formada.', 'JSON inválido.'],
          ['401 Unauthorized', 'Falta autenticarse o la credencial no es válida. El nombre confunde: es un problema de identidad.', 'Token vencido.'],
          ['403 Forbidden', 'Se sabe quién es, pero no tiene permiso.', 'Un cliente intenta aprobar un turno.'],
          ['404 Not Found', 'El recurso no existe (o no conviene revelar que existe).', 'El turno de otro cliente (cap. 06).'],
          ['409 Conflict', 'La solicitud choca con el estado actual del recurso.', 'Horario ocupado; cancelación fuera de plazo.'],
          ['422 Unprocessable Content', 'La sintaxis es correcta, pero el contenido no es válido.', 'Un servicio que no existe; una fecha pasada.'],
          ['429 Too Many Requests', 'Demasiadas solicitudes en poco tiempo.', 'Un bot que consulta disponibilidad sin parar.'],
          ['500 y 503', 'Error interno o servicio no disponible.', 'Una falla inesperada; mantenimiento.'],
        ],
      },
      body: [
        { type: 'h3', text: '5.1 Una estructura consistente' },
        { type: 'p', text: 'RFC 9457 define un formato estándar para describir errores, application/problem+json. El conflicto de superposición del Vol. 05 (el error 23P01) se traduce así:' },
        { type: 'p', text: `HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{
  "type": "https://api.turnify.example/problemas/horario-ocupado",
  "title": "El horario ya no está disponible",
  "status": 409,
  "detail": "Otro cliente reservó ese horario mientras elegías.",
  "horariosAlternativos": ["2026-10-05T11:30:00-03:00", "2026-10-05T12:00:00-03:00"]
}` },
        { type: 'p', text: 'Es el criterio CA-01.2 del Vol. 03 convertido en contrato: el sistema no confirma, informa que el horario ya no está disponible y ofrece otros. El campo horariosAlternativos es una extensión propia, que el formato permite.' },
        { type: 'box', kind: 'atencion', title: null, text: 'Nunca expongas el error interno. Ni el nombre de la restricción (turno_sin_superposicion), ni el SQL, ni la traza de la excepción: le dan información a un atacante y ninguna utilidad al usuario.' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Un error bien diseñado le dice al consumidor qué pasó y qué puede hacer.' },
        { type: 'box', kind: 'practica', nivel: 'APLICAR', title: 'Cancelar fuera de plazo', text: 'Escribí la respuesta completa para el caso CA-02.2 del Vol. 03 (cancelación con menos de X horas). ¿Qué código usás y qué información incluís?' },
      ],
      fuentes: ['IETF — RFC 9457, Problem Details for HTTP APIs (2023).', 'IETF — RFC 9110, códigos de estado.'],
    },
    {
      id: '06',
      title: 'Autenticación y autorización',
      refrescoConceptos: {
        intro: null,
        subtitulo: 'Identidad y permisos',
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['Autenticación', 'Verificar quién es el que hace la solicitud.'],
          ['Autorización', 'Decidir si esa identidad puede hacer esa operación sobre ese recurso.'],
          ['Sesión o token', 'Con una sesión, el servidor recuerda al usuario y el cliente envía un identificador (normalmente en una cookie). Con un token, el cliente presenta una credencial en cada solicitud (Authorization: Bearer …); algunos formatos, como JWT, llevan datos firmados.'],
          ['Rol', 'Un conjunto de permisos: cliente, encargado, empleado.'],
        ],
      },
      body: [
        { type: 'h3', text: '6.1 Quién puede qué' },
        { type: 'table', headers: ['Operación', 'Cliente', 'Encargado', 'Empleado'], rows: [
          ['Reservar', 'Para sus vehículos', 'Para cualquier cliente', 'No'],
          ['Ver un turno', 'Solo los suyos', 'Todos', 'Los asignados'],
          ['Cancelar', 'Los suyos, en plazo', 'Todos', 'No'],
          ['Aprobar un pendiente', 'No', 'Sí', 'No'],
          ['Ver la agenda del día', 'No', 'Sí', 'Sí'],
        ] },
        { type: 'box', kind: 'el-caso', title: 'De /turnos/184 a /turnos/185', text: 'Un cliente cambia el número en la URL. La API tiene que verificar que el vehículo del turno 185 sea suyo; si no, responde 404 (no 403) para no confirmar que el turno existe.' },
        { type: 'p', text: 'Es el primer riesgo de la lista de OWASP para APIs: verificar que el usuario esté autenticado, pero no que el objeto le corresponda (autorización por objeto).' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Autenticar dice quién sos; autorizar decide qué podés hacer con cada objeto.' },
        { type: 'box', kind: 'practica', nivel: 'ANALIZAR', title: 'El empleado y su agenda', text: 'Un empleado pide GET /turnos?fecha=2026-10-05. ¿Qué turnos ve y dónde se aplica el filtro?' },
      ],
      fuentes: ['OWASP — API Security Top 10 (2023).', 'MDN Web Docs — HTTP authentication.'],
    },
    {
      id: '07',
      title: 'Colecciones, filtros y paginación',
      refrescoConceptos: {
        intro: null,
        subtitulo: 'Colecciones',
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['Filtro', 'Restringe la colección: ?fecha=, ?estado=.'],
          ['Orden', 'Tiene que ser explícito y estable; si dos filas empatan, hace falta un desempate (el id).'],
          ['Límite', 'Cuántos elementos devolver por página, con un máximo que el servidor hace cumplir.'],
          ['Paginación por desplazamiento', '?offset=100&limit=50. Simple, pero cada página es más costosa y, si entran datos nuevos, pueden repetirse o saltearse elementos.'],
          ['Paginación por cursor', 'La respuesta incluye un cursor que indica dónde siguió; la próxima página empieza desde ahí. Es estable y su costo no crece.'],
        ],
      },
      body: [
        { type: 'h3', text: '7.1 GET /turnos con cursor' },
        { type: 'p', text: `GET /turnos?desde=2026-09-29&limit=50

{
  "items": [ ...50 turnos... ],
  "siguienteCursor": "MjAyNi0wOS0yOVQxMDowMDowMC0wMzowMHw2NTYzMg"
}` },
        { type: 'p', text: 'El cursor es opaco para el consumidor: internamente codifica el inicio y el id del último turno devuelto. En la base, la próxima página se busca así (consulta probada sobre la base del Vol. 05):' },
        { type: 'p', text: `SELECT id, inicio FROM turno
WHERE inicio >= $1                     -- el filtro 'desde'
  AND (inicio, id) > ($2, $3)          -- compara por inicio y, si empatan, por id
ORDER BY inicio, id
LIMIT 50;` },
        { type: 'box', kind: 'idea-clave', title: null, text: 'El orden y el tamaño de página son parte del contrato, no un detalle de implementación.' },
        { type: 'box', kind: 'practica', nivel: 'APLICAR', title: 'Filtros del panel', text: 'El encargado quiere ver los turnos pendientes de la semana, del más viejo al más nuevo. Diseñá la URL, los filtros y el orden, y decidí qué pasa si pide limit=5000.' },
      ],
      fuentes: ['Microsoft — REST API Guidelines, colecciones y paginación.', 'PostgreSQL Documentation — Row Constructor Comparison.'],
    },
    {
      id: '08',
      title: 'Contratos y OpenAPI',
      refrescoConceptos: {
        intro: null,
        subtitulo: 'OpenAPI',
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['OpenAPI', 'Una especificación para describir APIs HTTP en YAML o JSON: rutas, operaciones, parámetros, esquemas, respuestas y seguridad. La versión vigente es la 3.1. Antes se llamaba Swagger.'],
          ['Esquema', 'La forma de un dato (sus propiedades, tipos y cuáles son obligatorias), escrita con JSON Schema.'],
          ['Contrato primero', 'Se escribe la especificación antes que el código; sirve para acordar con los consumidores.'],
          ['Código primero', 'La especificación se genera desde el código; es más rápido, pero el contrato queda sujeto a la implementación.'],
        ],
      },
      body: [
        { type: 'h3', text: '8.1 Un fragmento del contrato de Turnify' },
        { type: 'p', text: `openapi: 3.1.0
info: { title: API de Turnify, version: 1.0.0 }
paths:
  /turnos:
    post:
      summary: Reservar un turno
      parameters:
        - name: Idempotency-Key
          in: header
          required: true
          schema: { type: string, format: uuid }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/NuevoTurno' }
      responses:
        '201':
          description: Turno creado (confirmado o pendiente)
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Turno' }
        '409':
          description: El horario ya no está disponible
          content:
            application/problem+json:
              schema: { $ref: '#/components/schemas/Problema' }
components:
  schemas:
    NuevoTurno:
      type: object
      required: [servicioId, vehiculoId, inicio]
      properties:
        servicioId: { type: string }
        vehiculoId: { type: string }
        inicio: { type: string, format: date-time }` },
        { type: 'p', text: 'La especificación completa, con GET /turnos, la cancelación y los esquemas Turno y Problema, acompaña este cuadernillo como archivo aparte y se validó con una herramienta automática.' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Un contrato que solo existe en la cabeza del equipo no es un contrato.' },
        { type: 'box', kind: 'practica', nivel: 'APLICAR', title: 'Documentar la aprobación', text: 'Agregá al contrato POST /turnos/{id}/aprobacion: parámetros, respuestas posibles y quién puede llamarla. ¿Qué código devolvés si el turno no está pendiente?' },
      ],
      fuentes: ['OpenAPI Initiative — OpenAPI Specification 3.1.', 'JSON Schema — especificación.'],
    },
    {
      id: '09',
      title: 'Integración síncrona',
      refrescoConceptos: {
        intro: null,
        subtitulo: 'Dependencias',
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['Llamada síncrona', 'El que llama espera la respuesta antes de seguir.'],
          ['Timeout', 'El tiempo máximo que se espera. Sin timeout, una dependencia lenta puede dejar colgado al sistema entero.'],
          ['Falla parcial', 'Una parte del sistema funciona y otra no. Es la situación normal en sistemas distribuidos.'],
          ['Acoplamiento temporal', 'Las dos partes tienen que estar disponibles al mismo tiempo para que la operación funcione.'],
          ['Disponibilidad compuesta', 'Si una operación depende de dos servicios con 99,5 % de disponibilidad cada uno, en el mejor caso queda en 0,995 × 0,995 ≈ 99,0 %.'],
          ['Interruptor (circuit breaker)', 'Después de varias fallas seguidas, se deja de llamar a la dependencia por un tiempo y se responde con una alternativa.'],
        ],
      },
      body: [
        { type: 'box', kind: 'el-caso', title: '¿La reserva depende del aviso?', text: 'Si Turnify llama a la mensajería dentro de la reserva y espera su respuesta, una caída del servicio de mensajería impide reservar. Pero en el Vol. 03 (desvío 7a) ya decidimos que, si falla el aviso, el turno vale igual. El contrato del dominio dice que el aviso no debería bloquear la reserva.' },
        { type: 'p', text: 'Con un proveedor de pagos el análisis cambia: si el negocio decide cobrar una seña para confirmar, el pago sí es parte del objetivo. Entonces hay que decidir qué pasa si el proveedor no responde: ¿el turno queda pendiente de pago?, ¿por cuánto tiempo retiene el horario?' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Cada llamada síncrona suma una forma de fallar: agregala solo si el negocio necesita esperar la respuesta.' },
        { type: 'box', kind: 'practica', nivel: 'ANALIZAR', title: 'Qué esperar y qué no', text: 'Para “reservar turno”, clasificá cada paso en “hay que esperar la respuesta” o “puede hacerse después”: verificar disponibilidad, registrar el turno, avisar al cliente, actualizar el calendario externo, avisar al encargado si queda pendiente.' },
      ],
      fuentes: ['Nygard, M. T. — Release It!.', 'Microsoft — REST API Guidelines.'],
    },
    {
      id: '10',
      title: 'Reintentos e idempotencia',
      refrescoConceptos: {
        intro: null,
        subtitulo: 'Reintentar con cuidado',
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['Reintento', 'Volver a enviar una solicitud que falló o que no respondió a tiempo.'],
          ['Espera exponencial', 'Cada reintento espera más que el anterior (1 s, 2 s, 4 s…), con una variación aleatoria para que muchos clientes no reintenten a la vez.'],
          ['El problema del timeout', 'Un timeout no dice si la operación falló: dice que no llegó la respuesta. El servidor pudo haberla procesado.'],
          ['Clave de idempotencia', 'Un identificador único que el cliente genera por cada intención (no por cada intento) y envía en un encabezado. Si el servidor ya la vio, devuelve el resultado anterior en lugar de repetir la operación.'],
        ],
      },
      body: [
        { type: 'p', text: 'Reintentar es seguro para GET, PUT y DELETE, porque son idempotentes (cap. 03). POST no lo es, y POST /turnos es justamente la operación más crítica.' },
        { type: 'h3', text: '10.1 La respuesta que se pierde' },
        { type: 'p', text: 'Figura 10.1 — Reintento con clave de idempotencia.' },
        { type: 'p', text: 'Este volumen empezó con esta pregunta. La respuesta tiene una vuelta que vale la pena ver: sin la clave, el segundo POST no crea un turno duplicado, porque la restricción del Vol. 05 lo impide. Pero el cliente recibe un 409 “horario ocupado”… por su propio turno. La consistencia de los datos está a salvo; la experiencia del usuario, no.' },
        { type: 'h3', text: '10.2 Cómo lo resuelve el servidor' },
        { type: 'p', text: `CREATE TABLE solicitud_idempotente (
  clave       uuid PRIMARY KEY,
  cliente_id  bigint NOT NULL REFERENCES cliente (id),
  huella      text NOT NULL,          -- resumen del cuerpo de la solicitud
  turno_id    bigint REFERENCES turno (id),
  creado_en   timestamptz NOT NULL DEFAULT now()
);` },
        { type: 'p', text: 'Buscar la clave. Si existe y la huella coincide, devolver el turno ya creado. Si existe con otra huella, responder 422: la clave se reutilizó para otra cosa.' },
        { type: 'p', text: 'Si no existe, crear el turno y registrar la clave en la misma transacción.' },
        { type: 'p', text: 'Si dos reintentos llegan a la vez, la clave primaria rechaza al segundo, que vuelve al paso 1.' },
        { type: 'p', text: `WITH nuevo AS (
  INSERT INTO turno (vehiculo_id, servicio_id, recurso_id, inicio, fin, estado)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id
)
INSERT INTO solicitud_idempotente (clave, cliente_id, huella, turno_id)
SELECT $7, $8, $9, id FROM nuevo;` },
        { type: 'p', text: 'Las claves no se guardan para siempre: se conservan un tiempo razonable (por ejemplo, 24 horas) y después se eliminan.' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Una clave de idempotencia representa una intención, no un intento.' },
        { type: 'box', kind: 'practica', nivel: 'ANALIZAR', title: '¿Quién genera la clave?', text: 'El cliente toca “Confirmar”, la app no responde y el cliente vuelve a tocar el botón. ¿La app debería generar una clave nueva o reutilizar la anterior? ¿Y si el cliente cambia el horario antes de volver a tocar?' },
      ],
      fuentes: ['IETF — The Idempotency-Key HTTP Header Field.', 'Stripe — Idempotent requests.', 'IETF — RFC 9110, métodos idempotentes.'],
    },
    {
      id: '11',
      title: 'Eventos y webhooks',
      refrescoConceptos: {
        intro: null,
        subtitulo: 'Avisar en lugar de preguntar',
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['Pull (sondeo)', 'El consumidor pregunta cada tanto si hay novedades. Simple, pero desperdicia solicitudes y demora los avisos.'],
          ['Push', 'El proveedor avisa cuando algo pasa.'],
          ['Evento', 'El registro de algo que ya ocurrió, nombrado en pasado: TurnoCancelado.'],
          ['Webhook', 'Un aviso por HTTP: el proveedor hace un POST a una URL que el consumidor registró.'],
          ['Al menos una vez', 'La garantía habitual de entrega: el aviso puede llegar repetido, así que el consumidor tiene que ser idempotente (usando el id del evento).'],
          ['Orden', 'Los avisos pueden llegar desordenados; si el orden importa, el evento debe permitir detectarlo (una fecha o una versión).'],
          ['Firma', 'Un código calculado con un secreto compartido (por ejemplo, HMAC) que permite al consumidor verificar que el aviso es auténtico.'],
        ],
      },
      body: [
        { type: 'box', kind: 'el-caso', title: 'Cuando un turno se cancela, ¿quién necesita enterarse?', text: 'El cliente (por el servicio de mensajería), el panel del encargado (para reorganizar el día) y, en una versión futura, el calendario externo del cliente.' },
        { type: 'p', text: `POST https://calendario.example/webhooks/turnify
Turnify-Firma: t=1759672800,v1=5f2b9c...

{
  "id": "evt_01J9ZK3F7Q",
  "tipo": "turno.cancelado",
  "ocurrioEn": "2026-10-04T18:12:03-03:00",
  "turno": { "id": "65738", "inicio": "2026-10-05T11:00:00-03:00" }
}` },
        { type: 'p', text: 'El evento lleva el mínimo necesario: no incluye el teléfono ni el nombre del cliente (Vol. 05, cap. 11). Si el consumidor necesita más, puede pedirlo a la API con sus propios permisos.' },
        { type: 'p', text: 'Un detalle de consistencia: si Turnify cancela el turno y después falla antes de enviar el aviso, el evento se pierde. Un patrón habitual es la bandeja de salida transaccional: guardar el evento en una tabla dentro de la misma transacción que la cancelación y enviarlo después.' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Un webhook puede llegar dos veces, tarde o desordenado: diseñá el consumidor para eso.' },
        { type: 'box', kind: 'practica', nivel: 'ANALIZAR', title: 'El evento de la reprogramación', text: 'Una reprogramación cancela un turno y crea otro (Vol. 05, cap. 09). ¿Publicás dos eventos (turno.cancelado y turno.creado) o uno (turno.reprogramado)? ¿Qué cambia para el calendario externo?' },
      ],
      fuentes: ['Richardson, C. — Transactional Outbox, microservices.io.', 'OWASP — API Security Top 10 (2023).'],
    },
    {
      id: '12',
      title: 'Evolución e integración',
      refrescoConceptos: {
        intro: null,
        subtitulo: 'Compatibilidad',
        headers: ['Concepto', 'Qué significa'],
        rows: [
          ['Compatible hacia atrás', 'Un cambio que no rompe a los consumidores existentes.'],
          ['Cambio aditivo', 'Agregar un campo opcional en la respuesta o un endpoint nuevo. Suele ser compatible.'],
          ['Cambio que rompe', 'Quitar o renombrar un campo, cambiar su tipo, agregar un campo obligatorio en el request o cambiar el significado de un código.'],
          ['Lector tolerante', 'El consumidor ignora los campos que no conoce, para que los cambios aditivos no lo rompan.'],
          ['Deprecación', 'Anunciar que algo va a dejar de existir, con una fecha, antes de quitarlo.'],
          ['Versionado', 'Mantener dos contratos a la vez: en la ruta (/v1, /v2), en un encabezado o en el tipo de medio.'],
        ],
      },
      body: [
        { type: 'box', kind: 'el-caso', title: 'Un valor nuevo de estado', text: 'El negocio decide agregar el estado “en_proceso” para los turnos que se están atendiendo. Parece un cambio aditivo, pero la app puede tener un switch que no contemple ese valor, el panel puede filtrar por estados conocidos y el calendario externo puede no saber qué hacer con él.' },
        { type: 'table', headers: ['Consumidor', '¿Qué podría romperse?'], rows: [
          ['App del cliente', 'Una pantalla que no muestra nada si el estado es desconocido.'],
          ['Panel del encargado', 'Un filtro que deja afuera los turnos en proceso.'],
          ['Calendario externo', 'Un webhook que no sabe interpretar el nuevo estado.'],
        ] },
        { type: 'p', text: 'Por eso conviene mantener un inventario de consumidores y avisar con tiempo. HTTP tiene encabezados para eso: Deprecation y Sunset indican que un recurso está deprecado y cuándo va a dejar de responder.' },
        { type: 'box', kind: 'idea-clave', title: null, text: 'Una API publicada es una promesa: cambiarla es renegociarla con cada consumidor.' },
        { type: 'box', kind: 'practica', nivel: 'APLICAR', title: 'Renombrar un campo', text: 'Queremos renombrar inicio a fechaHora en la respuesta de GET /turnos. Proponé una forma de hacerlo sin romper a ningún consumidor.' },
      ],
      fuentes: ['Fowler, M. — “Tolerant Reader”, martinfowler.com.', 'Microsoft — REST API Guidelines, versionado.', 'IETF — RFC 8594 (Sunset); RFC 9745 (Deprecation).'],
    },
  ],
  cierre: {
    desafioIntegrador: {
      title: 'Desafío integrador: la API de Turnify',
      body: [
        { type: 'p', text: 'El equipo tiene que exponer una API para la app y el panel, e integrarse con el servicio de mensajería y, más adelante, con un proveedor de pagos.' },
        { type: 'p', text: 'Partí de las intenciones del dominio, no de las tablas: cada decisión del contrato debería poder justificarse con una regla o un caso de uso de los volúmenes anteriores.' },
        { type: 'h3', text: 'Preguntas de defensa' },
        { type: 'p', text: '¿Por qué esta información pertenece al contrato y esta otra no?' },
        { type: 'p', text: '¿Qué diferencia hay entre autenticación y autorización?' },
        { type: 'p', text: '¿Qué pasa si el servidor procesa una solicitud pero el cliente no recibe la respuesta?' },
        { type: 'p', text: '¿Qué operación necesita idempotencia?' },
        { type: 'p', text: '¿Qué dependencia externa puede convertir una operación rápida en una lenta?' },
        { type: 'p', text: '¿Qué cambio rompería consumidores existentes?' },
      ],
      entregables: [
        { text: 'Un mapa de consumidores y proveedores.', capRef: '01' },
        { text: 'El inventario de recursos y operaciones.', capRef: '03' },
        { text: 'Endpoints, métodos, parámetros y cuerpos.', capRef: '02 a 04' },
        { text: 'El catálogo de respuestas y errores.', capRef: '05' },
        { text: 'Las reglas de autenticación y autorización.', capRef: '06' },
        { text: 'La paginación y los filtros.', capRef: '07' },
        { text: 'La especificación OpenAPI de las operaciones principales.', capRef: '08' },
        { text: 'Un escenario de timeout y su política de reintento.', capRef: '09 y 10' },
        { text: 'La idempotencia para crear un turno.', capRef: '10' },
        { text: 'Un evento o webhook para comunicar una cancelación.', capRef: '11' },
        { text: 'El análisis de compatibilidad ante un cambio de contrato.', capRef: '12' },
        { text: 'Los riesgos de seguridad y sus controles.', capRef: null },
      ],
      autoevaluacion: {
        headers: ['Nivel', 'Podés…', 'Indicador'],
        rows: [
          ['Conocer', 'explicar conceptos', 'Explicás HTTP, API, endpoint, código de estado, autenticación, autorización e idempotencia.'],
          ['Aplicar', 'diseñar', 'Diseñás una API coherente para un caso real, con su contrato y sus errores.'],
          ['Analizar', 'detectar y anticipar', 'Detectás acoplamiento, fallas, riesgos y problemas de evolución, y reconocés cuándo hace falta un especialista.'],
        ],
      },
    },
    mapaDeSalida: {
      tabla: {
        headers: ['Nivel', 'Pregunta', 'Dónde'],
        rows: [
          ['Dominio', '¿Qué necesita hacer el negocio?', 'Vol. 01 a 04'],
          ['Datos', '¿Qué información sostiene esas operaciones?', 'Vol. 05'],
          ['API', '¿Qué capacidades se exponen como contrato?', 'Caps. 01 a 08'],
          ['Integración', '¿Qué pasa cuando una operación depende de otra frontera?', 'Caps. 09 a 11'],
          ['Evolución', '¿Cómo mantenemos los contratos cuando el sistema cambia?', 'Cap. 12'],
        ],
      },
      ideas: [
        { text: 'Una API expone un contrato, no la implementación.', capRef: '01' },
        { text: 'HTTP no recuerda nada: cada solicitud se explica sola.', capRef: '02' },
        { text: 'Las operaciones nacen de las intenciones del dominio, no de las tablas.', capRef: '03' },
        { text: 'Si el servidor puede calcular un dato, el cliente no debería enviarlo.', capRef: '04' },
        { text: 'Un buen error dice qué pasó y qué se puede hacer.', capRef: '05' },
        { text: 'Autorizar es verificar cada objeto, no solo el rol.', capRef: '06' },
        { text: 'Cada llamada síncrona suma una forma de fallar.', capRef: '09' },
        { text: 'Una clave de idempotencia representa una intención, no un intento.', capRef: '10' },
        { text: 'Una API publicada es una promesa.', capRef: '12' },
      ],
      puente: {
        title: 'Puente al próximo volumen',
        text: 'Una API puede estar bien diseñada y aun así formar parte de una arquitectura problemática. El Vol. 07 estudia cómo organizar componentes, responsabilidades y decisiones arquitectónicas.',
      },
    },
    respuestasOrientativas: [
      {
        capId: '01',
        titulo: 'Consumidores y proveedores',
        nivel: 'Conocer',
        respuesta: ['La app y el panel consumen la API de Turnify. La API consume la base de datos, la mensajería y, en el futuro, los pagos. En el webhook al calendario, Turnify inicia la llamada, pero el calendario es quien ofrece la URL. La API de Turnify cumple los dos roles: provee a los frontends y consume a los demás.'],
      },
      {
        capId: '02',
        titulo: 'Leer una respuesta',
        nivel: 'Conocer',
        respuesta: ['Cambiaría el estado: “pendiente” en lugar de “confirmado”. El código sigue siendo 201, porque el turno se creó; que quede pendiente de revisión es un dato del dominio, no un error.'],
      },
      {
        capId: '03',
        titulo: 'PATCH o acción',
        nivel: 'Analizar',
        respuesta: ['PATCH es más genérico y reutilizable. Pero permite enviar cualquier estado (“atendido”, “confirmado”), así que la API tiene que validar cada transición de la figura 8.1 del Vol. 04, y el contrato no dice qué acciones existen. La acción explícita documenta la intención, tiene sus propios permisos y sus propios errores (fuera de plazo).'],
      },
      {
        capId: '04',
        titulo: 'El request de reprogramar',
        nivel: 'Aplicar',
        respuesta: ['Alcanza con el nuevo inicio. Si se permite cambiar el servicio, cambia la duración y los recursos posibles: es más parecido a un turno nuevo. Una decisión razonable es permitir solo cambiar el horario y, para cambiar el servicio, cancelar y reservar. También necesita una clave de idempotencia.'],
      },
      {
        capId: '05',
        titulo: 'Cancelar fuera de plazo',
        nivel: 'Aplicar',
        respuesta: [
          `HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{
  "type": "https://api.turnify.example/problemas/fuera-de-plazo",
  "title": "Ya no se puede cancelar este turno",
  "status": 409,
  "detail": "Las cancelaciones se aceptan hasta X horas antes del turno.",
  "limite": "2026-10-05T09:00:00-03:00"
}`,
          'Es 409 porque la solicitud es válida pero choca con el estado actual del turno (el tiempo que falta).',
        ],
      },
      {
        capId: '06',
        titulo: 'El empleado y su agenda',
        nivel: 'Analizar',
        respuesta: ['Solo los turnos que tiene asignados. El filtro se aplica en la API, a partir de la identidad del token, y se traduce en la consulta a la base. Nunca en la app: cualquiera puede modificar la app o llamar a la API directamente.'],
      },
      {
        capId: '07',
        titulo: 'Filtros del panel',
        nivel: 'Aplicar',
        respuesta: ['GET /turnos?estado=pendiente&desde=2026-10-05&hasta=2026-10-12&orden=creado_en&limit=50. Si pide limit=5000, la API aplica su máximo (por ejemplo, 100) y lo indica, o responde 422. Lo importante es que el máximo esté en el contrato.'],
      },
      {
        capId: '08',
        titulo: 'Documentar la aprobación',
        nivel: 'Aplicar',
        respuesta: ['POST /turnos/{id}/aprobacion, con el id en la ruta y sin cuerpo. Respuestas: 200 con el turno confirmado; 403 si no es encargado; 404 si no existe; 409 si el turno no está pendiente o si, al confirmarlo, el horario se superpone con otro.'],
      },
      {
        capId: '09',
        titulo: 'Qué esperar y qué no',
        nivel: 'Analizar',
        respuesta: ['Hay que esperar: verificar disponibilidad y registrar el turno (son el objetivo). Pueden hacerse después: avisar al cliente, actualizar el calendario y avisar al encargado. Esa separación es la que habilita los eventos del cap. 11.'],
      },
      {
        capId: '10',
        titulo: '¿Quién genera la clave?',
        nivel: 'Analizar',
        respuesta: ['Si el cliente vuelve a tocar el botón con los mismos datos, la app reutiliza la clave: es la misma intención. Si cambió el horario, es una intención nueva y necesita una clave nueva; si reutilizara la anterior, el servidor detectaría una huella distinta y respondería 422.'],
      },
      {
        capId: '11',
        titulo: 'El evento de la reprogramación',
        nivel: 'Analizar',
        respuesta: ['Un solo evento turno.reprogramado describe mejor lo que pasó en el dominio y permite al calendario mover el evento en lugar de borrarlo y crear otro. Dos eventos separados pueden llegar desordenados, y el calendario podría crear el nuevo antes de borrar el viejo.'],
      },
      {
        capId: '12',
        titulo: 'Renombrar un campo',
        nivel: 'Aplicar',
        respuesta: ['Agregar fechaHora sin quitar inicio, con los dos valores iguales (cambio aditivo). Marcar inicio como deprecado en el contrato y con el encabezado Deprecation, avisar a los consumidores del inventario y, pasada la fecha anunciada (Sunset), quitarlo; o quitarlo solo en una /v2.'],
      },
    ],
    bibliografia: [
      'IETF — RFC 9110, HTTP Semantics (2022).',
      'IETF — RFC 9457, Problem Details for HTTP APIs (2023).',
      'IETF — RFC 5789, PATCH Method for HTTP (2010).',
      'IETF — RFC 3339, Date and Time on the Internet: Timestamps (2002).',
      'MDN Web Docs — HTTP Overview y HTTP Reference.',
      'OpenAPI Initiative — OpenAPI Specification 3.1.',
      'OWASP — API Security Top 10, edición 2023.',
      'Microsoft — REST API Guidelines.',
      'Stripe — Idempotent requests.',
      'IETF — The Idempotency-Key HTTP Header Field (borrador).',
      'IETF — RFC 8594, The Sunset HTTP Header Field (2019); RFC 9745, The Deprecation HTTP Response Header Field (2025).',
      'Nygard, M. T. (2018). Release It!, 2.ª ed. Pragmatic Bookshelf.',
      'Fowler, M. — “Tolerant Reader”, martinfowler.com; Patterns of Enterprise Application Architecture (2002).',
      'Richardson, C. — “Transactional Outbox”, microservices.io.',
      'Los ejemplos, casos y ejercicios son elaboración didáctica propia. Los dominios api.turnify.example y calendario.example son ficticios.',
    ],
  },
}
