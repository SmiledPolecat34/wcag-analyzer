import fs from 'fs'
import puppeteer from 'puppeteer'

function buildSummaryBlocks(metadata, violations) {
  const counts = metadata?.counts || {}

  const impactList = Object.entries(counts)
    .filter(([key]) => key !== 'total')
    .map(([impact, value]) => `<li><strong>${impact} :</strong> ${value} occurrence(s)</li>`) // prettier-ignore
    .join('')

  return `
    <section class="panel" id="resume">
      <h2>Résumé de l'audit</h2>
      <p><strong>URL analysée :</strong> ${metadata?.url || 'non renseignée'}</p>
      <p><strong>Date de génération :</strong> ${metadata?.generatedAt ? new Date(metadata.generatedAt).toLocaleString('fr-FR') : 'non renseignée'}</p>
      <p><strong>Nombre total de violations :</strong> ${counts.total ?? violations.length}</p>
      <ul class="impacts">${impactList}</ul>
    </section>

    <section class="panel" id="explications">
      <h2>Comment lire ce rapport ?</h2>
      <p>Chaque section détaille une règle WCAG non respectée. Les titres reprennent l'identifiant de la règle (ex : WCAG 1.3.1) suivi d'un rappel du texte d'aide fourni par axe-core.</p>
      <p>Les sous-sections mettent en avant :</p>
      <ul>
        <li><strong>Impact :</strong> gravité estimée (critical, serious, moderate, minor).</li>
        <li><strong>Description :</strong> résumé de l'objectif de la règle.</li>
        <li><strong>Recommandation :</strong> texte fourni par axe-core pour corriger le problème.</li>
        <li><strong>Cibles et contexte :</strong> éléments HTML concernés, code source extrait et résumé de l'échec.</li>
        <li><strong>Ressource :</strong> lien vers la documentation officielle associée.</li>
      </ul>
    </section>
  `
}

function buildViolationsHTML(violations) {
  let toc = '<ul class="toc-list">'
  let violationsHTML = ''

  toc += '<li class="toc-item level-2"><a href="#resume">Résumé</a></li>'
  toc += '<li class="toc-item level-2"><a href="#explications">Comment lire ce rapport</a></li>'

  violations.forEach((v) => {
    const anchor = v.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    toc += `<li class="toc-item level-2"><a href="#${anchor}">${v.id} — ${v.help}</a></li>`

    const nodeDetails = (v.nodes || [])
      .map(
        (node, index) => `
          <div class="node-block">
            <div class="node-title">Occurrence ${index + 1}</div>
            <p><strong>Cible :</strong> <code>${node.target || 'non renseignée'}</code></p>
            ${node.html ? `<pre>${node.html}</pre>` : ''}
            ${node.failureSummary ? `<p class="failure">${node.failureSummary}</p>` : ''}
          </div>
        `,
      )
      .join('')

    violationsHTML += `
      <article class="violation-block" id="${anchor}">
        <h3>${v.id} — ${v.help}</h3>
        <p class="impact"><strong>Impact :</strong> ${v.impact || 'non renseigné'}</p>
        <p><strong>Description :</strong> ${v.description}</p>
        <p><strong>Recommandation :</strong> ${v.help}</p>
        <p><strong>Ressource :</strong> <a href="${v.helpUrl}">${v.helpUrl}</a></p>
        <div class="nodes-wrapper">
          <h4>Éléments concernés</h4>
          ${nodeDetails || '<p>Aucun détail fourni par axe-core.</p>'}
        </div>
      </article>
    `
  })

  toc += '</ul>'
  return { toc, violationsHTML }
}

export async function buildReport() {
  const rawData = JSON.parse(fs.readFileSync('wcag.json', 'utf8'))
  const {
    metadata = {},
    violations = Array.isArray(rawData) ? rawData : rawData.violations || [],
  } = Array.isArray(rawData)
    ? { metadata: { counts: { total: rawData.length } }, violations: rawData }
    : rawData

  const introHTML = buildSummaryBlocks(metadata, violations)
  const { toc, violationsHTML } = buildViolationsHTML(violations)

  const template = fs.readFileSync('./templates/report.html', 'utf8')
  const finalHTML = template
    .replace('{{TOC}}', toc)
    .replace('{{INTRO}}', introHTML)
    .replace('{{REPORT_HTML}}', violationsHTML)

  fs.writeFileSync('wcag-report.html', finalHTML)
  console.log('✔ HTML généré : wcag-report.html')

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(finalHTML, { waitUntil: 'networkidle0' })
  await page.pdf({ path: 'wcag-report.pdf', format: 'A4', printBackground: true })
  await browser.close()

  console.log('✔ PDF généré : wcag-report.pdf')
}
