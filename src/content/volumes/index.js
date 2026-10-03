import vol01 from './vol-01.js'
import vol02 from './vol-02.js'
import vol03 from './vol-03.js'
import vol04 from './vol-04.js'
import vol05 from './vol-05.js'
import vol06 from './vol-06.js'
import vol07 from './vol-07.js'

export const volumes = [vol01, vol02, vol03, vol04, vol05, vol06, vol07]

function wordsToMinutes(blocks) {
  const words = (blocks || []).reduce((total, block) => {
    if (block.type === 'p' || block.type === 'h3') return total + (block.text?.split(/\s+/).length || 0)
    if (block.type === 'box') return total + (block.text?.split(/\s+/).length || 0) + (block.title?.split(/\s+/).length || 0)
    return total
  }, 0)
  return Math.max(1, Math.round(words / 200))
}

export const allChapters = volumes.flatMap((volume) => volume.chapters.map((chapter) => ({
  ...chapter,
  volumeId: volume.id,
  volumeTitle: volume.title,
  minutes: wordsToMinutes(chapter.body),
})))

export function estimateMinutes(volume) {
  return volume.chapters.reduce((total, chapter) => total + wordsToMinutes(chapter.body), 0)
}

export function findVolume(volId) {
  return volumes.find((v) => v.id === volId)
}

export function findChapter(volId, chapterId) {
  const volume = findVolume(volId)
  return volume?.chapters.find((c) => c.id === chapterId)
}
