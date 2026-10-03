// Ficha "Sobre este volumen". Todo el contenido viene de ficha.* tal como
// está en content/volumes/vol-0X.js — este componente solo lo reorganiza.

// "Conocer, aplicar y analizar: A, B; C, D y E." → ["A","B","C","D","E"].
// Usa el delimitador real que escribió cada volumen (";" si existe, si no ",");
// solo separa el último par por " y " cuando la lista es por comas, porque
// ahí es donde el español reemplaza la coma final por "y" en una enumeración.
// Con ";" cada segmento ya es un ítem completo (puede traer su propio "y"
// interno, como "funcionales y no funcionales") y no se vuelve a partir.
function parseCompetencias(text) {
  if (!text) return []
  const body = text.replace(/^Conocer,\s*aplicar\s*y\s*analizar:\s*/i, '').replace(/\.\s*$/, '').trim()
  if (!body) return []
  if (body.includes(';')) return body.split(';').map((s) => s.trim()).filter(Boolean)
  const parts = body.split(',').map((s) => s.trim()).filter(Boolean)
  if (parts.length <= 1) return parts
  const last = parts.pop()
  const lastSplit = last.split(/\s+y\s+/).map((s) => s.trim()).filter(Boolean)
  return [...parts, ...lastSplit]
}

// "01 · Fundamentos. Sin dependencias previas." → { numero: '01', resto: '...' }
function parseLugar(text) {
  const match = text?.match(/^(\d{2})\s*·\s*Fundamentos\.\s*(.*)$/)
  if (!match) return { numero: null, resto: text }
  return { numero: match[1], resto: match[2] }
}

export default function VolumeFicha({ ficha }) {
  if (!ficha) return null
  const pills = parseCompetencias(ficha.competencias)
  const lugar = ficha.lugarEnElTronco ? parseLugar(ficha.lugarEnElTronco) : null

  return <div className="volume-ficha">
    <span className="section-kicker">SOBRE ESTE VOLUMEN</span>

    <div className="ficha-grid">
      {ficha.proposito && <div className="ficha-block ficha-proposito"><span className="ficha-label">Propósito</span><p>{ficha.proposito}</p></div>}
      {ficha.publico && <div className="ficha-block"><span className="ficha-label">Público</span><p>{ficha.publico}</p></div>}
    </div>

    {pills.length > 0 && <div className="ficha-block ficha-competencias">
      <span className="ficha-label">Competencias</span>
      <div className="pill-row">{pills.map((pill, i) => <span key={i} className="pill">{pill}</span>)}</div>
    </div>}

    <div className="ficha-grid">
      {ficha.casoTransversal && <div className="ficha-block"><span className="ficha-label">Caso transversal</span><p>{ficha.casoTransversal}</p></div>}
      {ficha.metodo && <div className="ficha-block ficha-metodo"><span className="ficha-label">Método</span><p>{ficha.metodo}</p></div>}
    </div>

    {lugar && <div className="ficha-block ficha-lugar">
      <span className="ficha-label">Lugar en el tronco</span>
      {lugar.numero ? <p><strong>{lugar.numero} · FUNDAMENTOS</strong><br />{lugar.resto}</p> : <p>{ficha.lugarEnElTronco}</p>}
    </div>}
  </div>
}
