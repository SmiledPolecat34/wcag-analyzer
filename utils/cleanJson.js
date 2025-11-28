export function cleanAxeJson(violations) {
  return violations.map((v) => ({
    id: v.id || '',
    impact: v.impact || '',
    description: String(v.description || ''),
    help: String(v.help || ''),
    helpUrl: v.helpUrl || '',
    nodes: (v.nodes || []).map((n) => ({
      target: Array.isArray(n.target) ? n.target.join(', ') : '',
      failureSummary: String(n.failureSummary || ''),
    })),
  }))
}
