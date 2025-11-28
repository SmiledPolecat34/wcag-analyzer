import puppeteer from 'puppeteer'
import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export async function runAudit(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.addScriptTag({ path: require.resolve('axe-core') })

  /* global axe */
  const report = await page.evaluate(async () => await axe.run())
  await browser.close()

  const violations = report.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    help: v.help,
    helpUrl: v.helpUrl,
    nodes:
      v.nodes?.map((node) => ({
        target: node.target?.join(', ') || '',
        html: node.html || '',
        failureSummary: node.failureSummary || '',
      })) || [],
  }))

  const totals = violations.reduce(
    (acc, v) => {
      const key = v.impact || 'inconnu'
      acc[key] = (acc[key] || 0) + 1
      acc.total += 1
      return acc
    },
    { total: 0 },
  )

  const payload = {
    metadata: {
      url,
      generatedAt: new Date().toISOString(),
      counts: totals,
    },
    violations,
  }

  fs.writeFileSync('wcag.json', JSON.stringify(payload, null, 2))
  console.log('✔ JSON généré : wcag.json')
}
