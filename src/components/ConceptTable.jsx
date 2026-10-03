import DataTable from './DataTable.jsx'
import { renderText } from '../content/identifiers.jsx'

export default function ConceptTable({ refresco }) {
  if (!refresco) return null
  return <div className="concept-table">
    <div className="concept-table-head">
      <span>REFRESCO DE CONCEPTOS</span>
      {refresco.subtitulo && <span className="concept-table-sub">{refresco.subtitulo}</span>}
    </div>
    {refresco.intro && <p className="concept-table-intro">{renderText(refresco.intro)}</p>}
    <DataTable headers={refresco.headers} rows={refresco.rows} className="concept-table-grid" />
  </div>
}
