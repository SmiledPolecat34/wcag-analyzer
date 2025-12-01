import { marked } from 'marked'

export function markdownToHtml(md) {
  // Sécurité : on force la conversion en chaîne de caractères
  if (typeof md !== 'string') {
    md = String(md || '')
  }

  // Configuration simple
  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: false, // On désactive la génération d'IDs pour éviter les erreurs
    mangle: false,
  })

  // On utilise le rendu par défaut de la librairie, qui est fiable.
  return marked(md)
}
