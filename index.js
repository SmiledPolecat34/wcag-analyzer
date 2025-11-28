process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
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

/* ============================================================================
   IA locale : Qwen2.5 14B
   ============================================================================ */
async function localLLM(prompt) {
  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'qwen2.5:14b-instruct',
      prompt,
      stream: false,
      options: {
        num_predict: 4096,
        temperature: 0.15,
        top_p: 0.9,
      },
    }),
  })

  if (!res.ok) throw new Error('Erreur Ollama : ' + res.statusText)

  const data = await res.json()
  return data.response
}

/* ============================================================================
   URL
   ============================================================================ */
let url = process.argv[2]
if (!url || url.startsWith('%') || url.trim() === '') url = process.env.WCAG_URL
if (!url) {
  console.error('❌ Aucun URL fourni.')
  process.exit(1)
}

console.log('🔍 Analyse de :', url)

/* ============================================================================
   FONCTION PRINCIPALE
   ============================================================================ */
async function runAudit(targetUrl) {
  console.log('🕵️ Scan Axe-Core…')

  const browser = await puppeteer.launch(PUPPETEER_OPTIONS)
  const page = await browser.newPage()
  await page.goto(targetUrl, { waitUntil: 'networkidle0' })
  await page.addScriptTag({ path: require.resolve('axe-core') })

  const axeReport = await page.evaluate(async () => await axe.run())
  await browser.close()

  if (!axeReport.violations.length) {
    fs.writeFileSync('wcag-report.md', '# Rapport WCAG\n\nAucune violation détectée.')
    return console.log('🔵 Aucun problème détecté.')
  }

  console.log('📊 Violations trouvées :', axeReport.violations.length)

  /* ============================================================================
     FLATTEN : on ne split PAS ici → chunk complet
     ============================================================================ */
  // === 1) Flatten des violations ===
  const flatTexts = axeReport.violations.map(flattenViolation)

  // === 2) Empêcher les strings vides (CRITIQUE) ===
  const cleaned = flatTexts.map((t) => (t || '').trim()).filter(Boolean)

  if (!cleaned.length) {
    console.error('❌ Aucune donnée valide après flatten. Vérifie flattenViolation().')
    process.exit(1)
  }

  /* ============================================================================
     IA
     ============================================================================ */
  // On traite 1 violation = 1 chunk
  const violations = axeReport.violations
    .map(flattenViolation)
    .map((v) => v.trim())
    .filter(Boolean)

  console.log('📦 Violations individuelles :', violations.length)

  let finalMarkdown = '# Rapport WCAG\n\n'

  for (let i = 0; i < violations.length; i++) {
    console.log(`🧠 Traitement violation ${i + 1}/${violations.length}`)

    const prompt = buildPrompt(violations[i])

    try {
      const md = await localLLM(prompt)

      finalMarkdown += `\n\n${md}\n`
    } catch {
      finalMarkdown += `\n\n(Erreur IA)\n`
    }
  }

  /* ============================================================================
     EXPORTS
     ============================================================================ */
  fs.writeFileSync('wcag-report.md', finalMarkdown)

  const html = markdownToHtml(finalMarkdown).replace(/\[object Object\]/gi, '')
  const template = fs.readFileSync('./templates/report.html', 'utf8')

  const finalHTML = template.replace('{{TOC}}', generateTOC(html)).replace('{{REPORT_HTML}}', html)

  fs.writeFileSync('wcag-report.html', finalHTML)

  const browserPDF = await puppeteer.launch({ headless: 'new' })
  const pagePDF = await browserPDF.newPage()
  await pagePDF.setContent(finalHTML)
  await pagePDF.pdf({ path: 'wcag-report.pdf', format: 'A4', printBackground: true })
  await browserPDF.close()

  console.log('📕 PDF généré : wcag-report.pdf')
}

runAudit(url)
