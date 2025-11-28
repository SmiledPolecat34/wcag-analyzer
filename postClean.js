import fs from 'fs'
import path from 'path'

// Fonction de nettoyage total
function deepClean(content) {
  return (
    content

      // 1. Toutes les formes complètes
      .replace(/\[object\s*object\]/gi, '')
      .replace(/\[object\s*Object\]/gi, '')
      .replace(/object\s*object/gi, '')
      .replace(/Object\s*object/gi, '')
      .replace(/Object\s*Object/gi, '')
      .replace(/\[object/gi, '')
      .replace(/object]/gi, '')

      // 2. Fragments éclatés (cas les plus durs)
      .replace(/o\s*b\s*j\s*e\s*c\s*t/gi, '')
      .replace(/obj\s*ect/gi, '')
      .replace(/ob\s*jec\s*t/gi, '')
      .replace(/bjec\s*t/gi, '')
      .replace(/objc?t/gi, '')

      // 3. Variantes cassées (vue dans ton PDF)
      .replace(/Object\s*Object]?/gi, '')
      .replace(/\[?Object\s*Object/gi, '')
      .replace(/Object\s*\]/gi, '')
      .replace(/\[?object/gi, '')

      // 4. Nettoyer les artefacts invisibles
      .replace(/�/g, '') // caractère cassé
      .replace(/\s+$/gm, '')

      // 5. Nettoyer spacing
      .replace(/\n{3,}/g, '\n\n')
      .replace(/ +/g, ' ')
      .trim()
  )
}

function run() {
  const mdPath = path.join(process.cwd(), 'wcag-report.md')

  if (!fs.existsSync(mdPath)) {
    console.error('❌ wcag-report.md introuvable')
    process.exit(1)
  }

  const original = fs.readFileSync(mdPath, 'utf8')
  const cleaned = deepClean(original)

  fs.writeFileSync(mdPath, cleaned, 'utf8')

  console.log('✨ Nettoyage Markdown 100% Object-Free terminé.')
}

run()
