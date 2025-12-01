export function flattenViolation(v) {
  // Fonction utilitaire pour forcer le type String propre
  const safeStr = (val) => {
    if (!val) return 'Information non disponible'
    if (typeof val === 'string') return val
    if (Array.isArray(val)) return val.join(', ') // Gère les cas où target est un tableau
    return String(val) // Force la conversion pour les objets récalcitrants
  }

  const nodes = (v.nodes || [])
    .map((n, i) => {
      const target = Array.isArray(n.target) ? n.target.join(', ') : safeStr(n.target)
      const reason = safeStr(n.failureSummary)

      return `  Noeud ${i + 1} :
      - Cible : ${target}
      - Raison : ${reason}`
    })
    .join('\n')

  return `
ID : ${safeStr(v.id)}
Impact : ${safeStr(v.impact)}
Description : ${safeStr(v.description)}
Aide : ${safeStr(v.help)}
URL : ${safeStr(v.helpUrl)}

Noeuds :
${nodes}

-----------------------------
`.trim()
}
