// Ficha "PARA UBICARTE": orienta al lector al entrar a un capítulo.
// Toma los datos del propio volumen/capítulo — no hardcodea nada por fuera
// de lo que ya existe en content/volumes/.
function requisitoPrevio(ficha) {
  if (!ficha.requiere) return '—'
  return ficha.requiere
}

export default function OrientationCard({ volume, chapter, pregunta }) {
  const { ficha } = volume
  return <div className="orientation-card">
    <span className="section-kicker">PARA UBICARTE</span>
    <div className="orientation-head">
      <span className="orientation-chip">Vol. {volume.id} · Cap. {chapter.id}</span>
      <p className="orientation-title">{chapter.title}</p>
    </div>
    <dl className="orientation-meta">
      {ficha.nivel && <div className="orientation-row"><dt>Nivel</dt><dd>{ficha.nivel}</dd></div>}
      <div className="orientation-row"><dt>Colección</dt><dd>Fundamentos</dd></div>
      <div className="orientation-row"><dt>Requiere</dt><dd>{requisitoPrevio(ficha)}</dd></div>
      {ficha.preparaPara
        ? <div className="orientation-row"><dt>Te prepara para</dt><dd>{ficha.preparaPara}</dd></div>
        : ficha.cierraTronco
          ? <div className="orientation-row"><dt>Alcance</dt><dd>Cierra el tronco Fundamentos</dd></div>
          : null}
    </dl>
    {pregunta && <div className="orientation-question">
      <span>LA PREGUNTA QUE GUÍA ESTE CAPÍTULO</span>
      <p>&ldquo;{pregunta}&rdquo;</p>
    </div>}
  </div>
}
