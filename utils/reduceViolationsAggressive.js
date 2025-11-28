export function reduceViolationsAggressive(violations) {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: (v.description || '').slice(0, 120),
    help: (v.help || '').slice(0, 120),
    nodes: (v.nodes || []).map((n) => ({
      target: Array.isArray(n.target) ? n.target.join(', ').slice(0, 120) : '',
      failureSummary: (n.failureSummary || '').slice(0, 200),
    })),
  }))
}
