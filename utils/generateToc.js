export function generateTOC(html) {
  const titles = [...html.matchAll(/<h([2-3]) id="([^"]+)">(.*?)<\/h\1>/g)]

  if (titles.length === 0) {
    return '<p>Aucun titre détecté.</p>'
  }

  let toc = '<ul class="toc-list">'

  for (const match of titles) {
    const level = parseInt(match[1])
    const id = match[2]
    const text = match[3].replace(/<[^>]+>/g, '')

    toc += `
      <li class="toc-item level-${level}">
        <a href="#${id}">${text}</a>
      </li>`
  }

  toc += '</ul>'
  return toc
}
