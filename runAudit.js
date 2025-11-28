import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export async function runAudit(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.addScriptTag({ path: require.resolve('axe-core') })

  const report = await page.evaluate(async () => await axe.run())
  await browser.close()

  const violations = report.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: v.help,
    helpUrl: v.helpUrl,
    target: v.nodes?.[0]?.target?.[0] || '',
    reason: v.nodes?.[0]?.failureSummary || '',
  }))

  fs.writeFileSync('wcag.json', JSON.stringify(violations, null, 2))
  console.log('✔ JSON généré : wcag.json')
}
