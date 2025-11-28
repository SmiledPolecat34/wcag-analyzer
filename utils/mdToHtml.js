import { marked } from 'marked'

export function markdownToHtml(md) {
  // Sécurisation : convertir ce qui arrive en string
  if (typeof md !== 'string') {
    md = String(md || '')
  }

  marked.setOptions({
    headerIds: false, // AUCUN ID généré
    mangle: false,
  })

  const renderer = new marked.Renderer()

  // Neutralisation complète des titres
  renderer.heading = function (text, level) {
    const safe = typeof text === 'string' ? text.replace(/\[object Object\]/gi, '') : ''

    return `<p><strong>${safe}</strong></p>\n`
  }

  // Nettoyage du texte → protégé
  renderer.text = function (text) {
    if (typeof text !== 'string') return ''
    return text.replace(/\[object Object\]/gi, '')
  }

  // Protection globale contre les contenus non-string
  renderer.paragraph = function (text) {
    const safe = typeof text === 'string' ? text.replace(/\[object Object\]/gi, '') : ''
    return `<p>${safe}</p>\n`
  }

  return marked(md, { renderer })
}
