import Icon from './Icon.jsx'
import { tronco } from '../content/tronco.js'
import { estimateMinutes } from '../content/volumes/index.js'

export default function VolumeCard({ volume, onClick }) {
  const color = tronco.find((t) => t.id === volume.id)?.color
  return <button className="volume-card" onClick={onClick}>
    <div className="volume-card-top"><span className={`volume-number ${color}`}>{volume.id}</span><Icon name="arrow" size={17} className="card-arrow"/></div>
    <span className="volume-card-subtitle">{volume.subtitle}</span>
    <span className="volume-card-title">{volume.title}</span>
    <span className="volume-card-count">{String(volume.chapters.length).padStart(2, '0')} capítulos <span>·</span> {estimateMinutes(volume)} min</span>
  </button>
}
