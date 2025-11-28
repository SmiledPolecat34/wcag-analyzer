import fs from 'fs'
import puppeteer from 'puppeteer'
import { markdownToHtml } from './utils/mdToHtml.js'
import { generateTOC } from './utils/generateToc.js'

async function rebuild() {
  const md = fs.readFileSync('wcag-report.md', 'utf8')

  const reportHTML = markdownToHtml(md)
  const tocHTML = generateTOC(reportHTML)

  const template = fs.readFileSync('./templates/report.html', 'utf8')
  const finalHTML = template.replace('{{REPORT_HTML}}', reportHTML).replace('{{TOC}}', tocHTML)

  fs.writeFileSync('wcag-report.html', finalHTML)

  const browserPDF = await puppeteer.launch({ headless: 'new' })
  const pagePDF = await browserPDF.newPage()
  await pagePDF.setContent(finalHTML, { waitUntil: 'networkidle0' })

  await pagePDF.pdf({
    path: 'wcag-report.pdf',
    format: 'A4',
    printBackground: true,
  })

  await browserPDF.close()

  console.log('📕 PDF reconstruit proprement !')
}

rebuild()
