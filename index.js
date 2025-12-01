process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import puppeteer from 'puppeteer'
import fs from 'fs'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { createRequire } from 'module'

import { PUPPETEER_OPTIONS } from './config/puppeteer.js'
import { buildPrompt } from './utils/prompt.js'
import { markdownToHtml } from './utils/mdToHtml.js'
import { generateTOC } from './utils/generateToc.js'
import { flattenViolation } from './utils/flatten.js'

dotenv.config()
const require = createRequire(import.meta.url)

async function localLLM(prompt) {
  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'qwen2.5:14b-instruct',
      prompt,
      stream: false,
      options: { num_predict: 4096, temperature: 0.15, top_p: 0.9 },
    }),
  })
  if (!res.ok) throw new Error('Erreur Ollama : ' + res.statusText)
  const data = await res.json()
  return data.response
}

let url = process.argv[2]
if (!url || url.startsWith('%') || url.trim() === '') url = process.env.WCAG_URL
if (!url) {
  console.error('❌ Aucun URL fourni.')
  process.exit(1)
}

console.log('🔍 Analyse de :', url)

async function runAudit(targetUrl) {
  console.log('🕵️ Scan Axe-Core…')

  const browser = await puppeteer.launch(PUPPETEER_OPTIONS)
  const page = await browser.newPage()

  // --- CORRECTION DU TIMEOUT ICI ---
  // On augmente le timeout à 90s (90000ms) et on utilise networkidle2 (plus tolérant)
  try {
    await page.goto(targetUrl, { 
      waitUntil: 'networkidle2', 
      timeout: 90000 
    })
  } catch (error) {
    console.warn('⚠️ Timeout ou erreur de navigation, tentative de continuation...', error.message)
  }

  await page.addScriptTag({ path: require.resolve('axe-core') })

  /* global axe */
  const axeReport = await page.evaluate(async () => await axe.run())
  await browser.close()

  if (!axeReport.violations.length) {
    console.log('🔵 Aucun problème détecté.')
    return
  }

  console.log('📊 Violations trouvées :', axeReport.violations.length)

  // Boucle de traitement IA
  let finalMarkdown = ''
  
  for (let i = 0; i < axeReport.violations.length; i++) {
    const violation = axeReport.violations[i]
    console.log(`🧠 Traitement ${i + 1}/${axeReport.violations.length} : [${violation.impact}] ${violation.id}`)

    const textPrompt = flattenViolation(violation)
    const prompt = buildPrompt(textPrompt)

    try {
      const mdResponse = await localLLM(prompt)
      
      // Injection de la carte avec code couleur
      finalMarkdown += `
<div class="violation-card impact-${violation.impact || 'minor'}">

${mdResponse}

</div>
`
    } catch (e) {
      console.error('Erreur IA:', e)
      finalMarkdown += `\n\n> Erreur de génération pour ${violation.id}\n`
    }
  }

  // --- GÉNÉRATION EXPORTS ---

  // HTML
  const htmlContent = markdownToHtml(finalMarkdown)
  const template = fs.readFileSync('./templates/report.html', 'utf8')

  const finalHTML = template
    .replace('{{TOC}}', generateTOC(htmlContent))
    .replace('{{REPORT_HTML}}', htmlContent)

  fs.writeFileSync('wcag-report.html', finalHTML)
  console.log('📄 HTML généré.')

  // PDF
  const browserPDF = await puppeteer.launch({ headless: 'new' })
  const pagePDF = await browserPDF.newPage()
  await pagePDF.setContent(finalHTML, { waitUntil: 'networkidle0' })
  
  await pagePDF.pdf({
    path: 'wcag-report.pdf',
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    scale: 0.9, 
    margin: { top: '20mm', bottom: '20mm', left: '10mm', right: '10mm' },
    footerTemplate: `<div style="font-size:9px;color:#bbb;width:100%;text-align:center;font-family:Arial;padding-top:10px;">Page <span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
    headerTemplate: '<div></div>'
  })
  await browserPDF.close()
  console.log('📕 PDF généré avec pagination.')

  // PROMPT GEMINI
  const geminiContext = `
# Rôle
Expert Développeur Front-End (Accessibilité WCAG 2.1 AA).

# Mission
Voici un rapport d'audit. Pour chaque violation :
1. Identifie l'élément.
2. Donne le code CORRIGÉ (HTML/CSS/JS) prêt à l'emploi.
3. Explique la correction.

--- RAPPORT ---
${finalMarkdown}
--- FIN ---
`.trim()

  fs.writeFileSync('gemini-fix-prompt.md', geminiContext)
  console.log('✨ Prompt Gemini généré.')
}

runAudit(url)