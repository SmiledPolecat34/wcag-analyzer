export function cleanMarkdownHard(md) {
  if (!md || typeof md !== 'string') return ''

  return (
    md
      // toutes variantes possibles
      .replace(/\[object\s*object\]/gi, '')
      .replace(/object\s*object/gi, '')
      .replace(/objectObject/gi, '')
      .replace(/Object Object/gi, '')
      .replace(/\[object\]/gi, '')
      .replace(/object]/gi, '')

      // nettoie les doubles espaces & sauts de ligne excessifs
      .replace(/ +/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}
