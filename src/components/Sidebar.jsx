import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { tronco } from '../content/tronco.js'
import { findVolume } from '../content/volumes/index.js'

export default function Sidebar({ page, volId, chapId, onNavigate, open, onClose }) {
  const [openVolId, setOpenVolId] = useState(volId || null)

  // El sidebar sigue la ruta: entrar a un volumen o a uno de sus capítulos
  // lo despliega automáticamente. Un volumen abierto a mano se mantiene así
  // hasta que la navegación cambie de volumen.
  useEffect(() => { setOpenVolId(volId || null) }, [volId])

  const toggleVolume = (id) => {
    setOpenVolId((current) => (current === id ? null : id))
    onNavigate(`/volumen/${id}`)
  }

  return <>
    {open && <button className="scrim" aria-label="Cerrar menú" onClick={onClose} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`} aria-label="Navegación principal">
      <div className="sidebar-top">
        <a className="brand" href="/" onClick={(event) => { event.preventDefault(); onNavigate('/') }}>
          <span className="brand-mark">M<span>.</span></span><span className="brand-name">el manual<br/>del analista</span>
        </a>
        <button className="icon-button mobile-close" onClick={onClose} aria-label="Cerrar navegación"><Icon name="close"/></button>
      </div>
      <div className="nav-label">TU ESPACIO</div>
      <nav className="main-nav">
        <button className={`nav-item ${page === 'home' ? 'active' : ''}`} onClick={() => onNavigate('/')}><Icon name="book"/> <span>Inicio</span></button>
        <button className={`nav-item ${page === 'mapa' ? 'active' : ''}`} onClick={() => onNavigate('/mapa')}><Icon name="map"/> <span>Mapa de aprendizaje</span></button>
      </nav>
      <div className="nav-label volume-label">LOS VOLÚMENES <span>{tronco.length.toString().padStart(2, '0')}</span></div>
      <nav className="volume-nav" aria-label="Volúmenes">
        {tronco.map((item) => {
          const isOpen = openVolId === item.id
          const volume = isOpen ? findVolume(item.id) : null
          return <div key={item.id} className="volume-entry">
            <button
              onClick={() => toggleVolume(item.id)}
              aria-expanded={isOpen}
              className={`volume-nav-item ${volId === item.id ? 'active' : ''}`}
            >
              <span className={`volume-dot dot-${item.id} ${item.color}`}>{item.id}</span>
              <span>{item.title}</span>
              <Icon name="chevron" size={13} className={`volume-chevron ${isOpen ? 'volume-chevron-open' : ''}`} />
            </button>
            <div className={`chapter-reveal ${isOpen ? 'chapter-reveal-open' : ''}`}>
              <div className="chapter-reveal-inner">
                {volume && <nav className="chapter-nav" aria-label={`Capítulos del Vol. ${item.id}`}>
                  {volume.chapters.map((chapter) => <button
                    key={chapter.id}
                    className={`chapter-nav-item ${chapId === chapter.id && volId === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(`/volumen/${item.id}/capitulo/${chapter.id}`)}
                  >
                    <span className="chapter-nav-index">{chapter.id}</span>
                    <span className="chapter-nav-title">{chapter.title}</span>
                  </button>)}
                </nav>}
              </div>
            </div>
          </div>
        })}
      </nav>
      <div className="sidebar-bottom"><div className="field-note">Un campo para aprender<br/>a hacer mejores preguntas.</div><div className="sidebar-footer">EDICIÓN DIGITAL <span>·</span> 2026</div></div>
    </aside>
  </>
}
