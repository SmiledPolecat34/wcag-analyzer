export function splitHard(text, maxChars = 4800) {
  if (!text || typeof text !== 'string') {
    return ['Information non disponible.']
  }

  const parts = []
  let current = ''

  const lines = text.split('\n')

  for (const line of lines) {
    // Si ajouter cette ligne dépasse la limite → on coupe ici
    if ((current + line).length > maxChars) {
      parts.push(current.trim())
      current = ''
    }

    current += line + '\n'
  }

  // Si reste du texte en fin → on l'ajoute
  if (current.trim().length > 0) {
    parts.push(current.trim())
  }

  return parts
}
