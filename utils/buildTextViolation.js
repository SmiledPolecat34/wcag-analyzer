export function buildTextViolation(v) {
  return `
ID: ${v.id}
Impact: ${v.impact}
Desc: ${(v.description || '').slice(0, 120)}
Help: ${(v.help || '').slice(0, 120)}

Node: ${v.nodes?.[0]?.target?.join(', ') || ''}
Reason: ${(v.nodes?.[0]?.failureSummary || '').slice(0, 150)}
  `.trim()
}
