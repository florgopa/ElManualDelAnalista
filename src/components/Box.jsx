import Icon from './Icon.jsx'
import { renderText } from '../content/identifiers.jsx'

const KIND = {
  'idea-clave': { icon: 'idea', label: 'IDEA CLAVE' },
  'el-caso': { icon: 'flag', label: 'EL CASO' },
  'atencion': { icon: 'warn', label: 'ATENCIÓN' },
  'practica': { icon: 'pencil', label: 'PRACTICÁ' },
  'adr': { icon: 'book', label: 'DECISIÓN DE ARQUITECTURA' },
}

export default function Box({ block }) {
  const meta = KIND[block.kind]
  if (!meta) return null
  return <div className={`box box-${block.kind}`}>
    <div className="box-head">
      <Icon name={meta.icon} size={15} />
      <span>{meta.label}</span>
      {block.kind === 'practica' && block.nivel && <span className="box-level">{block.nivel}</span>}
    </div>
    {block.title && <p className="box-title">{block.title}</p>}
    <p className="box-text">{renderText(block.text)}</p>
  </div>
}
