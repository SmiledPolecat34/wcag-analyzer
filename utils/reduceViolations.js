export function reduceViolations(violations) {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: v.help,
    helpUrl: v.helpUrl,
    tags: v.tags,
    nodes: v.nodes.map((n) => ({
      html: n.html ? n.html.slice(0, 300) : null, // on limite la taille
      target: n.target,
      failureSummary: n.failureSummary,
    })),
  }))
}
