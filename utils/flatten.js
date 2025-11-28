export function flattenViolation(v) {
  const nodes = (v.nodes || [])
    .map((n, i) => {
      const target = Array.isArray(n.target) ? n.target.join(', ') : 'Information non disponible'
      const reason = n.failureSummary || 'Information non disponible'
      return `  Noeud ${i + 1} :
      - Cible : ${target}
      - Raison : ${reason}`
    })
    .join('\n')

  return `
ID : ${v.id || 'Information non disponible'}
Impact : ${v.impact || 'Information non disponible'}
Description : ${v.description || 'Information non disponible'}
Aide : ${v.help || 'Information non disponible'}
URL : ${v.helpUrl || 'Information non disponible'}

Noeuds :
${nodes}

-----------------------------
`.trim()
}
