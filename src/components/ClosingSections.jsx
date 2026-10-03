import ChapterBody from './ChapterBody.jsx'
import DataTable from './DataTable.jsx'
import { tronco } from '../content/tronco.js'
import { renderText } from '../content/identifiers.jsx'

function CapRefs({ capRef }) {
  if (!capRef) return null
  const refs = Array.isArray(capRef) ? capRef : [capRef]
  return <span className="cap-ref">cap. {refs.join(' y ')}</span>
}

export default function ClosingSections({ volume, onNavigateChapter }) {
  const { cierre } = volume
  if (!cierre) return null
  const { desafioIntegrador, cierreTronco, mapaDeSalida, respuestasOrientativas, bibliografia } = cierre
  return <section className="closing-sections">
    {desafioIntegrador && <div className="closing-block">
      <span className="section-kicker">DESAFÍO INTEGRADOR</span>
      <h2>{desafioIntegrador.title}</h2>
      <ChapterBody blocks={desafioIntegrador.body} volId={volume.id} />
      {desafioIntegrador.entregables?.length > 0 && <>
        <h3>Entregables</h3>
        <ul className="entregables-list">
          {desafioIntegrador.entregables.map((item, i) => <li key={i}>{renderText(item.text)} <CapRefs capRef={item.capRef} /></li>)}
        </ul>
      </>}
      {desafioIntegrador.autoevaluacion && <DataTable headers={desafioIntegrador.autoevaluacion.headers} rows={desafioIntegrador.autoevaluacion.rows} />}
    </div>}

    {cierreTronco && <div className="closing-block cierre-tronco">
      <span className="section-kicker">CIERRE DEL TRONCO</span>
      <h2>{cierreTronco.title}</h2>
      <ChapterBody blocks={cierreTronco.body} volId={volume.id} />
    </div>}

    {mapaDeSalida && <div className="closing-block">
      <span className="section-kicker">MAPA DE SALIDA</span>
      <h2>Qué deberías llevarte</h2>
      <ul className="mapa-ideas">
        {mapaDeSalida.ideas.map((idea, i) => <li key={i}>{renderText(idea.text)} <CapRefs capRef={idea.capRef} /></li>)}
      </ul>
      {mapaDeSalida.tabla && <DataTable headers={mapaDeSalida.tabla.headers} rows={mapaDeSalida.tabla.rows} />}
      {mapaDeSalida.puente && <div className="box box-idea-clave">
        <div className="box-head"><span>IDEA CLAVE</span></div>
        {mapaDeSalida.puente.title && <p className="box-title">{mapaDeSalida.puente.title}</p>}
        <p className="box-text">{renderText(mapaDeSalida.puente.text)}</p>
      </div>}
      <DataTable className="tronco-table" headers={[]} rows={tronco.map((v) => [
        v.id,
        v.id === volume.id ? <>{v.title} <span className="tronco-here">← estás acá</span></> : v.title,
      ])} />
    </div>}

    {respuestasOrientativas?.length > 0 && <div className="closing-block">
      <span className="section-kicker">RESPUESTAS ORIENTATIVAS</span>
      <h2>Para contrastar tu razonamiento</h2>
      <p className="respuestas-note">No son las únicas respuestas correctas. Sirven para contrastar, no para copiar.</p>
      {respuestasOrientativas.map((r, i) => <details key={i} className="respuesta-item">
        <summary>{/^\d+$/.test(r.capId) ? `Cap. ${r.capId} — ` : ''}{r.titulo}{r.nivel && <span className="respuesta-nivel">{r.nivel}</span>}</summary>
        {r.respuesta.map((line, j) => <p key={j}>{renderText(line)}</p>)}
      </details>)}
    </div>}

    {bibliografia?.length > 0 && <div className="closing-block">
      <span className="section-kicker">BIBLIOGRAFÍA Y FUENTES</span>
      <ul className="bibliografia-list">{bibliografia.map((entry, i) => <li key={i}>{entry}</li>)}</ul>
    </div>}
  </section>
}
