import Box from './Box.jsx'
import DataTable from './DataTable.jsx'
import { renderText, registerMention } from '../content/identifiers.jsx'

const ID_PATTERN = /\b(TRN-(?:FR|NFR|BR|SR|TR)-\d{3}|HU-\d{2}|CU-\d{2}|CA-\d{2}\.\d|ADR-\d{3})\b/g

function trackMentions(text, volId, chapterId) {
  if (typeof text !== 'string' || !volId || !chapterId) return
  let match
  ID_PATTERN.lastIndex = 0
  while ((match = ID_PATTERN.exec(text))) registerMention(match[0], volId, chapterId)
}

export default function ChapterBody({ blocks, volId, chapterId }) {
  if (!blocks) return null
  return <>
    {blocks.map((block, i) => {
      if (block.type === 'p') { trackMentions(block.text, volId, chapterId); return <p key={i}>{renderText(block.text)}</p> }
      if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>
      if (block.type === 'table') return <DataTable key={i} headers={block.headers} rows={block.rows} />
      if (block.type === 'box') { trackMentions(block.text, volId, chapterId); return <Box key={i} block={block} /> }
      return null
    })}
  </>
}
