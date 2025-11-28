export function splitHard(text, maxChars = 4800) {
  const parts = []
  let current = ''

  for (const line of text.split('\n')) {
    if ((current + line).length > maxChars) {
      parts.push(current)
      current = ''
    }
    current += line + '\n'
  }

  if (current.trim().length > 0) parts.push(current)

  return parts
}
