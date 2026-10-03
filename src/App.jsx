import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import Icon from './components/Icon.jsx'
import Sidebar from './components/Sidebar.jsx'
import VolumeCard from './components/VolumeCard.jsx'
import VolumeFicha from './components/VolumeFicha.jsx'
import OrientationCard from './components/OrientationCard.jsx'
import ConceptTable from './components/ConceptTable.jsx'
import ChapterBody from './components/ChapterBody.jsx'
import DataTable from './components/DataTable.jsx'
import ClosingSections from './components/ClosingSections.jsx'
import { tronco } from './content/tronco.js'
import { volumes, allChapters, estimateMinutes, findVolume, findChapter } from './content/volumes/index.js'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeAndGo = (path) => { navigate(path); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean)
    let title = 'El Manual del Analista'
    if (parts[0] === 'mapa') title = 'Recorrido del tronco · El Manual del Analista'
    else if (parts[0] === 'buscar') title = 'Buscar · El Manual del Analista'
    else if (parts[0] === 'volumen' && parts[1]) title = `Vol. ${parts[1]} · El Manual del Analista`
    else if (parts[0] === 'escrito-por-mi') title = 'Escrito por mí · El Manual del Analista'
    document.title = title
  }, [location])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); closeAndGo('/buscar') }
      if (event.key === 'Escape') { setMenuOpen(false); if (location.pathname === '/buscar') closeAndGo('/') }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [location.pathname])

  const parts = location.pathname.split('/').filter(Boolean)
  const page = parts[0] === 'volumen' ? 'volumen' : parts[0] || 'home'
  const volId = parts[0] === 'volumen' ? parts[1] : undefined
  const chapId = parts[0] === 'volumen' && parts[2] === 'capitulo' ? parts[3] : undefined
  const breadcrumb = parts[0] === 'mapa' ? 'RECORRIDO' : parts[0] === 'buscar' ? 'BÚSQUEDA' : parts[0] === 'volumen' ? `VOLUMEN ${parts[1] ?? ''}` : parts[0] === 'escrito-por-mi' ? 'ESCRITO POR MÍ' : 'INICIO'

  return <div className="app-shell">
    <Sidebar page={page} volId={volId} chapId={chapId} onNavigate={closeAndGo} open={menuOpen} onClose={() => setMenuOpen(false)} />
    <div className="main-area">
      <header className="topbar">
        <button className="icon-button menu-trigger" aria-label="Abrir navegación" onClick={() => setMenuOpen(true)}><Icon name="menu" /></button>
        <div className="breadcrumb"><span>EL MANUAL</span><span className="breadcrumb-slash">/</span><span>{breadcrumb}</span></div>
        <button className="search-trigger" onClick={() => closeAndGo('/buscar')}><Icon name="search" /><span>Buscar en el manual</span><kbd>⌘ K</kbd></button>
      </header>
      <Routes>
        <Route path="/" element={<Home onNavigate={closeAndGo} />} />
        <Route path="/mapa" element={<LearningMap onNavigate={closeAndGo} />} />
        <Route path="/buscar" element={<SearchPage onNavigate={closeAndGo} />} />
        <Route path="/volumen/:volId" element={<VolumePage onNavigate={closeAndGo} />} />
        <Route path="/volumen/:volId/capitulo/:chapId" element={<ChapterPage onNavigate={closeAndGo} />} />
        <Route path="/escrito-por-mi" element={<WrittenByMe onNavigate={closeAndGo} />} />
      </Routes>
      <footer className="page-footer"><span>EL MANUAL DEL ANALISTA</span><span>Aprender a mirar mejor también es parte del trabajo.</span><span>2026 <span className="footer-dot">·</span> Hecho con ♥ por <button className="footer-link" onClick={() => closeAndGo('/escrito-por-mi')}>byflorgopa</button></span></footer>
    </div>
  </div>
}

function Home({ onNavigate }) {
  return <main className="page-content home-page">
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-kicker"><span className="kicker-line" /> COLECCIÓN · FUNDAMENTOS</div>
        <h1>Entender primero.<br /><em>Construir mejor.</em></h1>
        <p className="hero-description">Siete volúmenes que recorren un mismo caso —un lavadero de autos y Turnify, su sistema de turnos— desde el problema antes del código hasta las decisiones de arquitectura que lo sostienen.</p>
        <p className="hero-aside">Un analista no empieza por el código. Empieza por entender el problema, el contexto, las personas y las decisiones que hay detrás de una solución.</p>
        <button className="primary-button" onClick={() => onNavigate('/mapa')}>Explorar el recorrido <Icon name="arrow" size={17} /></button>
      </div>
      <div className="hero-art" aria-label="El hilo de la doble reserva a través del tronco" role="img">
        <div className="art-stamp">VOL. <b>01—07</b><span>UN MISMO HILO,<br />SIETE VOLÚMENES</span></div>
        <div className="thread-steps">
          <span>Vol. 01 · síntoma: dos autos, un mismo turno</span>
          <span>Vol. 02 · <b>TRN-FR-002</b></span>
          <span>Vol. 03 · <b>CA-01.2</b></span>
          <span>Vol. 04–05 · modelo y restricción de datos</span>
          <span>Vol. 06 · reintentos e idempotencia</span>
          <span>Vol. 07 · <b>ADR-001 / ADR-002</b></span>
        </div>
        <div className="art-caption">FIG. 01 <span>EL HILO DE LA DOBLE RESERVA</span></div>
      </div>
      <div className="hero-index"><span>01 — 07</span><span>SIETE VOLÚMENES, UN RECORRIDO</span><span>↘</span></div>
    </section>

    <section className="editorial-section oficio-section">
      <span className="section-kicker">EL OFICIO DEL ANALISTA</span>
      <h2>Antes de construir, hay que entender.</h2>
      <p>Un analista conecta un problema real con una solución que pueda construirse, verificarse y evolucionar.</p>
      <p>Investiga, pregunta, modela, documenta, detecta reglas y restricciones, evalúa alternativas y ayuda a transformar una necesidad en un sistema.</p>
      <div className="sequence-row">Problema <span>→</span> Personas <span>→</span> Necesidades <span>→</span> Procesos <span>→</span> Datos <span>→</span> Solución <span>→</span> Evolución</div>
      <p className="pull-quote">El código es parte de la solución.<br />No es el punto de partida.</p>
      <div className="inclusion-note">
        <p className="inclusion-lead">No necesitás ser analista para empezar.</p>
        <p>El Manual tampoco presupone que ya trabajes en sistemas. Podés llegar desde una carrera, desde el desarrollo autodidacta, desde la programación con IA o simplemente desde la curiosidad.</p>
        <p>La idea es empezar por las preguntas que aparecen antes de construir y avanzar, paso a paso, hacia sistemas cada vez más completos.</p>
      </div>
    </section>

    <section className="editorial-section ia-section">
      <span className="section-kicker">UNA NUEVA FORMA DE CONSTRUIR SOFTWARE</span>
      <h2>Podemos generar software más rápido que nunca.<br />Eso hace más importante entender lo que estamos construyendo.</h2>
      <p>Hoy podemos pedirle a una IA que escriba código, diseñe una interfaz, genere una API o modele una base de datos.</p>
      <p>Y eso es increíble.</p>
      <p>Pero generar software no es lo mismo que entender sistemas.</p>
      <p>Una aplicación puede funcionar y aun así resolver mal el problema. Una interfaz puede ser impecable y tener requisitos mal definidos. Una API puede responder correctamente y tener un modelo de datos que no representa el dominio.</p>
      <p>Cuanto más fácil se vuelve producir código, más importante se vuelve saber qué estamos construyendo, por qué lo hacemos y cómo podemos comprobar que realmente está bien.</p>
      <p className="pull-quote">La IA puede generar el sistema.<br />El analista tiene que entenderlo.</p>
      <button className="text-link" onClick={() => onNavigate('/escrito-por-mi')}>Por qué existe este Manual <Icon name="arrow" size={15} /></button>
    </section>

    <section className="volumes-section">
      <div className="section-heading"><div><span className="section-kicker">EL RECORRIDO</span><h2>De la pregunta al sistema.</h2></div><button className="text-link" onClick={() => onNavigate('/mapa')}>Ver mapa completo <Icon name="arrow" size={15} /></button></div>
      <div className="volume-grid">{volumes.map((volume) => <VolumeCard key={volume.id} volume={volume} onClick={() => onNavigate(`/volumen/${volume.id}`)} />)}</div>
    </section>
    <section className="case-feature">
      <div className="case-art">
        <div className="case-art-top"><span>CASO TRANSVERSAL</span><span>V. 01 — 07</span></div>
        <div className="case-system">
          <div className="system-entity">CLIENTE<span>id · nombre · vehículo</span></div>
          <div className="system-connector">— 1:N —</div>
          <div className="system-entity entity-highlight">TURNO<span>recurso · intervalo</span></div>
          <div className="system-connector">— N:1 —</div>
          <div className="system-entity">RECURSO<span>box · servicio</span></div>
        </div>
        <div className="case-art-bottom">RESERVAR <span>→</span> VALIDAR <span>→</span> CONFIRMAR</div>
      </div>
      <div className="case-copy">
        <span className="section-kicker">UN CASO. SIETE MIRADAS</span>
        <h2>Turnify: el sistema<br /><em>que pone a prueba</em><br />las ideas del Manual.</h2>
        <p>El mismo problema acompaña todo el recorrido. Lo descubrimos en Vol. 01, lo especificamos en Vol. 02, modelamos su comportamiento en Vol. 03, representamos el sistema en Vol. 04, trabajamos sus datos en Vol. 05, diseñamos sus integraciones en Vol. 06 y tomamos decisiones arquitectónicas en Vol. 07.</p>
        <button className="text-link" onClick={() => onNavigate('/volumen/01')}>Conocer el caso <Icon name="arrow" size={15} /></button>
      </div>
    </section>

    <section className="editorial-section principles-section">
      <span className="section-kicker">PRINCIPIOS EDITORIALES</span>
      <h2 className="principles-phrase">Antes del software,<br /><em>existe un problema.</em></h2>
      <p>El Manual parte de una idea sencilla: aprender Sistemas no debería consistir solamente en memorizar conceptos, sino en aprender a mirar problemas, hacer preguntas, representar lo que entendemos y tomar decisiones conscientes.</p>
      <p className="pull-quote principles-scope-quote">No reemplaza el camino.<br />Ayuda a encontrarlo.</p>
      <p className="principles-scope-note">No reemplaza una carrera, una formación profesional ni la experiencia de construir en proyectos reales. Es una guía para aprender, conectar ideas y volver cuando haga falta repasar algo.</p>
    </section>

    <section className="continue-row">
      <div className="continue-mark"><Icon name="spark" size={20} /></div>
      <div><span className="section-kicker">PARA EMPEZAR</span><h2>Empezá por el Capítulo 01.</h2><p>El punto de partida del tronco: separar el pedido de la necesidad, y la necesidad del problema real.</p></div>
      <button className="continue-arrow" aria-label="Abrir el primer capítulo" onClick={() => onNavigate('/volumen/01/capitulo/01')}><Icon name="arrow" /></button>
    </section>
  </main>
}

function LearningMap({ onNavigate }) {
  return <main className="page-content interior-page">
    <div className="interior-heading"><button className="back-link" onClick={() => onNavigate('/')}><Icon name="back" size={15} /> Inicio</button><h1>Un recorrido para <em>pensar sistemas.</em></h1><p>Cada volumen suma una herramienta. Juntos forman el tronco Fundamentos de esta colección.</p></div>
    <div className="map-layout">
      <div className="map-track">{volumes.map((volume, index) => <button key={volume.id} className={`map-stop ${tronco[index].color}`} onClick={() => onNavigate(`/volumen/${volume.id}`)}>
        <span className="map-track-number">{volume.id}</span>
        <span className="map-stop-main"><strong>{volume.title}</strong><span>{volume.subtitle}</span></span>
        <span className="map-stop-meta">{volume.chapters.length} capítulos <Icon name="arrow" size={16} /></span>
        {index < volumes.length - 1 && <span className="track-connector" />}
      </button>)}</div>
      <aside className="map-aside">
        <span className="section-kicker">EL HILO CONDUCTOR</span>
        <h2>Un caso que<br />crece con vos.</h2>
        <p>En cada etapa, Turnify cambia de forma: primero es un problema para descubrir; después, un proceso que modelar, datos que sostener, una API que exponer y una arquitectura que lo haga confiable.</p>
        <div className="map-aside-rule" />
        <span className="map-aside-note">NO HACE FALTA SABER TODO DE ANTEMANO. EL RECORRIDO ES EL MÉTODO.</span>
      </aside>
    </div>
  </main>
}

function VolumePage({ onNavigate }) {
  const { volId } = useParams()
  const volume = findVolume(volId) ?? volumes[0]
  return <main className="page-content interior-page volume-page">
    <button className="back-link" onClick={() => onNavigate('/mapa')}><Icon name="back" size={15} /> Mapa de aprendizaje</button>
    <section className="volume-hero">
      <span className={`volume-number big-volume-number ${tronco.find((t) => t.id === volume.id)?.color}`}>{volume.id}</span>
      <div>
        <div className="section-kicker">VOLUMEN {volume.id} <span>·</span> {volume.subtitle.toUpperCase()}</div>
        <h1>{volume.title}</h1>
        <div className="volume-meta"><span><Icon name="book" size={15} />{volume.chapters.length} capítulos</span><span><Icon name="clock" size={15} />{estimateMinutes(volume)} min de lectura</span></div>
      </div>
    </section>
    <VolumeFicha ficha={volume.ficha} />
    {volume.intro && <section className="volume-intro">
      {volume.intro.title && <h2>{volume.intro.title}</h2>}
      <ChapterBody blocks={volume.intro.body} volId={volume.id} />
    </section>}
    <section className="chapter-list">
      <div className="chapter-list-head"><span>EL RECORRIDO</span><span>LECTURA</span></div>
      {volume.recorrido.map((item) => <button key={item.chapterId} className="chapter-row" onClick={() => onNavigate(`/volumen/${volume.id}/capitulo/${item.chapterId}`)}>
        <span className="chapter-index">{volume.id}.{item.chapterId}</span>
        <span className="chapter-title">{item.title}<small>{item.pregunta}</small></span>
        <Icon name="arrow" size={17} />
      </button>)}
    </section>
    <ClosingSections volume={volume} />
    <div className="volume-next"><span>LO QUE SIGUE</span><button onClick={() => onNavigate(`/volumen/${tronco[(Number(volume.id)) % tronco.length].id}`)}>{tronco[(Number(volume.id)) % tronco.length].title}<Icon name="arrow" size={16} /></button></div>
  </main>
}

function ChapterPage({ onNavigate }) {
  const { volId, chapId } = useParams()
  const volume = findVolume(volId)
  const chapter = volume && findChapter(volId, chapId)
  if (!volume || !chapter) return <main className="page-content interior-page"><h1>Este capítulo todavía no está disponible.</h1><button className="text-link" onClick={() => onNavigate('/mapa')}>Volver al mapa <Icon name="arrow" /></button></main>
  const chapterIndex = volume.chapters.findIndex((item) => item.id === chapter.id)
  const next = volume.chapters[chapterIndex + 1]
  const recorridoItem = volume.recorrido.find((r) => r.chapterId === chapter.id)
  return <main className="page-content interior-page reading-page">
    <button className="back-link" onClick={() => onNavigate(`/volumen/${volume.id}`)}><Icon name="back" size={15} /> Vol. {volume.id} · {volume.title}</button>
    <div className="reading-layout">
      <article className="reading-article">
        <div className="section-kicker">VOL. {volume.id} <span>·</span> CAPÍTULO {chapter.id}</div>
        <h1>{chapter.title}</h1>
        <OrientationCard volume={volume} chapter={chapter} pregunta={recorridoItem?.pregunta} />
        <div className="reading-rule" />
        <ConceptTable refresco={chapter.refrescoConceptos} />
        <ChapterBody blocks={chapter.body} volId={volume.id} chapterId={chapter.id} />
        {chapter.fuentes?.length > 0 && <div className="fuentes-capitulo">
          <span>FUENTES DEL CAPÍTULO</span>
          <ul>{chapter.fuentes.map((f, i) => <li key={i}>{f}</li>)}</ul>
        </div>}
      </article>
      <aside className="reading-aside">
        <span className="section-kicker">EN ESTA SERIE</span>
        <button onClick={() => onNavigate(`/volumen/${volume.id}`)}>Vol. {volume.id}<br /><strong>{volume.title}</strong><Icon name="arrow" size={15} /></button>
        <div className="reading-aside-divider" />
        <span className="reading-aside-note">LAS IDEAS COBRAN SENTIDO CUANDO SE PRUEBAN EN UN CASO REAL.</span>
      </aside>
    </div>
    <div className="reading-next">{next
      ? <><span>PRÓXIMO CAPÍTULO</span><button onClick={() => onNavigate(`/volumen/${volume.id}/capitulo/${next.id}`)}>{next.title}<Icon name="arrow" size={16} /></button></>
      : <><span>FIN DEL VOLUMEN</span><button onClick={() => onNavigate(`/volumen/${volume.id}`)}>Ver cierre del volumen<Icon name="arrow" size={16} /></button></>}</div>
  </main>
}

function SearchPage({ onNavigate }) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('es')
    if (!normalized) return []
    return allChapters.filter((chapter) => {
      const haystack = [chapter.title, chapter.volumeTitle, ...(chapter.body || []).map((b) => `${b.title || ''} ${b.text || ''}`)].join(' ').toLocaleLowerCase('es')
      return haystack.includes(normalized)
    })
  }, [query])
  return <main className="page-content interior-page search-page">
    <div className="interior-heading"><button className="back-link" onClick={() => onNavigate('/')}><Icon name="back" size={15} /> Inicio</button><h1>Encontrá una <em>idea.</em></h1><p>Buscá por tema, pregunta o concepto en los siete volúmenes.</p></div>
    <label className="search-field"><Icon name="search" size={20} /><input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Probá con “requisitos” o “Turnify”" /><kbd>ESC</kbd></label>
    {!query.trim() ? <div className="search-empty"><span>PARA EXPLORAR</span><div>{['doble reserva', 'Turnify', 'requisitos', 'arquitectura'].map((term) => <button key={term} onClick={() => setQuery(term)}>{term}</button>)}</div></div> : <section className="search-results">
      <div className="chapter-list-head"><span>{results.length} {results.length === 1 ? 'RESULTADO' : 'RESULTADOS'}</span><span>CAPÍTULO</span></div>
      {results.map((chapter) => <button key={`${chapter.volumeId}-${chapter.id}`} className="chapter-row" onClick={() => onNavigate(`/volumen/${chapter.volumeId}/capitulo/${chapter.id}`)}>
        <span className="chapter-index">{chapter.volumeId}.{chapter.id}</span>
        <span className="chapter-title">{chapter.title}<small>Vol. {chapter.volumeId} · {chapter.volumeTitle}</small></span>
        <span className="chapter-duration">{chapter.minutes} min</span>
        <Icon name="arrow" size={17} />
      </button>)}
      {results.length === 0 && <div className="no-results"><span>No encontramos "{query}".</span><p>Probá con otro término o una idea más corta.</p></div>}
    </section>}
  </main>
}

const letterParagraphs = [
  'Estoy terminando la carrera de Análisis de Sistemas y este Manual nació, en parte, de una preocupación que fui encontrando mientras aprendía.',
  'Hoy tenemos herramientas capaces de generar aplicaciones completas a partir de unas pocas instrucciones. Podemos pedir una interfaz, una API, una base de datos o incluso un sistema entero y tener algo funcionando en muy poco tiempo.',
  'Y eso es increíble.',
  'Pero también plantea una pregunta:',
  '¿Qué pasa cuando podemos generar software mucho más rápido de lo que aprendemos a entenderlo?',
  'La inteligencia artificial puede escribir código. Puede generar componentes, consultas SQL, endpoints, tests y arquitecturas. Puede ayudarnos a construir muchísimo más rápido.',
  'Pero no reemplaza el conocimiento que necesitamos para saber qué estamos construyendo, por qué, para quién y si realmente está bien construido.',
  'Una aplicación puede funcionar y, aun así, resolver mal el problema.',
  'Puede tener una interfaz impecable y requisitos mal definidos.',
  'Puede tener una API que responde correctamente y un modelo de datos que no representa el dominio.',
  'Puede pasar todos los tests que escribimos y estar testeando las cosas equivocadas.',
  'Puede tener una arquitectura sofisticada cuando una solución mucho más simple era suficiente.',
  'Y podemos generar todo eso con IA en cuestión de minutos.',
  'Por eso creo que cuanto más fácil se vuelve producir software, más importante se vuelve entender Sistemas.',
  'Este Manual nace de esa idea.',
  'No para competir con la IA.',
  'Para aprender a usarla con criterio.',
  'Para volver a las bases: entender problemas, descubrir necesidades, trabajar con stakeholders, modelar procesos y dominios, diseñar datos, pensar APIs, analizar arquitecturas, validar soluciones, considerar seguridad y calidad, y entender las consecuencias de las decisiones que tomamos.',
  'La intención tampoco es volver a una época en la que había que escribir cada línea de código a mano para demostrar que sabíamos programar.',
  'Al contrario.',
  'Quiero que podamos aprovechar todas las herramientas que tenemos hoy.',
  'Pero quiero poder mirar el código que una IA generó y preguntarme:',
]

const letterQuestions = [
  '¿Esto representa correctamente el problema?',
  '¿Qué supuestos está haciendo?',
  '¿Qué puede fallar?',
  '¿Qué decisión tomó y por qué?',
  '¿Cómo lo verifico?',
  '¿Qué pasaría si el sistema creciera?',
]

const letterClosing = [
  'Porque para mí, aprender Sistemas no es aprender a producir código.',
  'Es aprender a pensar antes, durante y después de producirlo.',
  'Y este Manual es mi intento de construir ese mapa.',
  'Lo estoy haciendo mientras sigo aprendiendo. Investigo, vuelvo a estudiar conceptos que creía conocer, contrasto fuentes, construyo ejemplos y trato de conectar cosas que muchas veces aprendemos por separado.',
  'No pretendo tener todas las respuestas.',
  'Quiero construir un lugar donde aprender a hacer mejores preguntas.',
  'Bienvenido/a a El Manual del Analista.',
]

function WrittenByMe({ onNavigate }) {
  return <main className="page-content interior-page letter-page">
    <div className="interior-heading">
      <button className="back-link" onClick={() => onNavigate('/')}><Icon name="back" size={15} /> Volver al Manual</button>
      <h1>Escrito por <em>mí.</em></h1>
      <p>Una nota de la persona detrás del Manual.</p>
    </div>
    <article className="reading-article letter-article">
      <p className="reading-lede">Hola. Soy Flor.</p>
      {letterParagraphs.map((text, i) => <p key={i}>{text}</p>)}
      <p className="letter-questions">{letterQuestions.map((q, i) => <span key={i}>{q}</span>)}</p>
      {letterClosing.map((text, i) => <p key={`c-${i}`}>{text}</p>)}
      <p className="letter-signature">— Flor</p>
    </article>
    <section className="letter-outro">
      <h2>¿Querés conocer otros proyectos?</h2>
      <p>Este Manual es uno de los proyectos que estoy construyendo mientras termino mi formación en Análisis de Sistemas.</p>
      {/* TODO: reemplazar "#" por la URL real del portfolio de byflorgopa */}
      <a className="primary-button" href="#">Visitar mi portfolio <Icon name="arrow" size={17} /></a>
      <button className="text-link" onClick={() => onNavigate('/')}><Icon name="back" size={15} /> Volver al Manual</button>
    </section>
  </main>
}
