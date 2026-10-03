// Índice de identificadores que atraviesan la colección (TRN-xxx, HU-##, CU-##,
// CA-##.#, ADR-###). Son ~20 en total: se mantiene a mano, no se genera.
// `definedIn` apunta al capítulo donde el identificador se fija por primera vez
// con su texto completo (no la primera mención de paso).
export const identifiers = {
  'TRN-FR-001': { kind: 'requisito', label: 'Registrar un turno', definedIn: { volId: '02', chapterId: '10' } },
  'TRN-FR-002': { kind: 'requisito', label: 'Evitar doble reserva de un recurso', definedIn: { volId: '02', chapterId: '10' } },
  'TRN-FR-003': { kind: 'requisito', label: 'Cancelar un turno', definedIn: { volId: '02', chapterId: '10' } },
  'TRN-FR-004': { kind: 'requisito', label: 'Requisito funcional', definedIn: { volId: '02', chapterId: '09' } },
  'TRN-NFR-001': { kind: 'requisito', label: 'Requisito no funcional', definedIn: { volId: '02', chapterId: '10' } },
  'TRN-BR-001': { kind: 'requisito', label: 'Regla de negocio', definedIn: { volId: '02', chapterId: '10' } },
  'TRN-SR-001': { kind: 'requisito', label: 'Requisito de seguridad', definedIn: { volId: '02', chapterId: '10' } },
  'TRN-TR-001': { kind: 'requisito', label: 'Requisito transversal', definedIn: { volId: '02', chapterId: '10' } },
  'HU-01': { kind: 'historia', label: 'Reservar un turno', definedIn: { volId: '03', chapterId: '10' } },
  'HU-02': { kind: 'historia', label: 'Cancelar un turno', definedIn: { volId: '03', chapterId: '10' } },
  'CU-01': { kind: 'caso-de-uso', label: 'Reservar un turno', definedIn: { volId: '03', chapterId: '03' } },
  'CA-01.1': { kind: 'criterio', label: 'Criterio de aceptación 01.1', definedIn: { volId: '03', chapterId: '10' } },
  'CA-01.2': { kind: 'criterio', label: 'Criterio de aceptación 01.2 — doble reserva', definedIn: { volId: '03', chapterId: '10' } },
  'CA-01.3': { kind: 'criterio', label: 'Criterio de aceptación 01.3', definedIn: { volId: '03', chapterId: '10' } },
  'CA-02.1': { kind: 'criterio', label: 'Criterio de aceptación 02.1', definedIn: { volId: '03', chapterId: '10' } },
  'CA-02.2': { kind: 'criterio', label: 'Criterio de aceptación 02.2', definedIn: { volId: '03', chapterId: '10' } },
  'CA-02.3': { kind: 'criterio', label: 'Criterio de aceptación 02.3', definedIn: { volId: '03', chapterId: '10' } },
  'ADR-001': { kind: 'adr', label: 'Decisión de arquitectura 001', definedIn: { volId: '07', chapterId: '12' } },
  'ADR-002': { kind: 'adr', label: 'Decisión de arquitectura 002', definedIn: { volId: '07', chapterId: '12' } },
  'ADR-003': { kind: 'adr', label: 'Decisión de arquitectura 003', definedIn: { volId: '07', chapterId: '12' } },
}

const ID_PATTERN = /\b(TRN-(?:FR|NFR|BR|SR|TR)-\d{3}|HU-\d{2}|CU-\d{2}|CA-\d{2}\.\d|ADR-\d{3})\b/g

function IdRef({ id }) {
  const entry = identifiers[id]
  if (!entry) return id
  const href = `/volumen/${entry.definedIn.volId}/capitulo/${entry.definedIn.chapterId}#${id}`
  return <a className="id-ref" href={href} title={`${id} · definido en Vol. ${entry.definedIn.volId}`}>{id}</a>
}

// Reemplaza menciones de identificadores dentro de un string por links <IdRef>,
// sin tocar el resto del texto. Devuelve un string si no hay coincidencias, o
// un array de nodos React (string + <IdRef>) si las hay.
export function linkifyIdentifiers(text) {
  if (typeof text !== 'string' || !text) return text
  ID_PATTERN.lastIndex = 0
  if (!ID_PATTERN.test(text)) return text
  ID_PATTERN.lastIndex = 0
  const parts = []
  let last = 0
  let match
  let key = 0
  while ((match = ID_PATTERN.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    parts.push(<IdRef key={`idref-${key++}`} id={match[0]} />)
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

// Algunos capítulos transcriben listas como un solo párrafo con "\n" entre
// ítems (el .docx no siempre distingue bullets de saltos de línea). Partimos
// por línea y linkeamos identificadores en cada una, preservando los saltos.
export function renderText(text) {
  if (typeof text !== 'string' || !text.includes('\n')) return linkifyIdentifiers(text)
  const lines = text.split('\n')
  const out = []
  lines.forEach((line, i) => {
    if (i > 0) out.push(<br key={`br-${i}`} />)
    const linked = linkifyIdentifiers(line)
    if (Array.isArray(linked)) out.push(...linked); else out.push(linked)
  })
  return out
}

// Para cada identificador, en qué volumen/capítulo aparece además de donde se
// define — se completa con `registerMention` al renderizar cada capítulo, así
// no hay que mantenerlo a mano ni duplicar datos.
const mentions = {}
export function registerMention(id, volId, chapterId) {
  if (!identifiers[id]) return
  mentions[id] = mentions[id] || []
  const key = `${volId}-${chapterId}`
  if (!mentions[id].some((m) => m.key === key) && key !== `${identifiers[id].definedIn.volId}-${identifiers[id].definedIn.chapterId}`) {
    mentions[id].push({ key, volId, chapterId })
  }
}
export function getMentions(id) {
  return mentions[id] || []
}
