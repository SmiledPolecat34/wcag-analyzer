import fs from 'fs'
import puppeteer from 'puppeteer'

export async function buildReport() {
  const data = JSON.parse(fs.readFileSync('wcag.json', 'utf8'))

  // SOMMAIRE
  let toc = '<ul>'
  let violationsHTML = ''

  data.forEach((v) => {
    const anchor = v.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    toc += `<li><a href="#${anchor}">${v.id}</a></li>`

    violationsHTML += `
      <div class="violation" id="${anchor}">
        <h2>${v.id}</h2>
        <p><strong>Impact :</strong> ${v.impact}</p>
        <p><strong>Description :</strong> ${v.description}</p>
        <p><strong>Aide :</strong> ${v.help}</p>
        <p><strong>Lien :</strong> <a href="${v.helpUrl}">${v.helpUrl}</a></p>
        <pre>${v.reason}</pre>
        <p><strong>Cible :</strong> ${v.target}</p>
      </div>
    `
  })

  toc += '</ul>'

  const template = fs.readFileSync('./templates/report.html', 'utf8')
  const finalHTML = template.replace('{{TOC}}', toc).replace('{{REPORT_HTML}}', violationsHTML)

  fs.writeFileSync('wcag-report.html', finalHTML)
  console.log('✔ HTML généré : wcag-report.html')

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(finalHTML)
  await page.pdf({ path: 'wcag-report.pdf', format: 'A4', printBackground: true })
  await browser.close()

  console.log('✔ PDF généré : wcag-report.pdf')
}
