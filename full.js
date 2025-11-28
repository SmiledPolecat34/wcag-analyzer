#!/usr/bin/env node
import { execSync } from 'child_process'

const url = process.argv[2]

if (!url) {
  console.error('❌ Erreur : aucune URL fournie.')
  console.error('Exemple : node full.js "https://example.com"')
  process.exit(1)
}

console.log('===========================================')
console.log('=== FULL WCAG AUDIT LANCÉ')
console.log('===========================================')
console.log('URL utilisée :', url)
console.log()

// RUN FORMAT
// console.log('🔧 Format du projet...\n')
// execSync('npm run format', { stdio: 'inherit' })
console.log('⏭️ Format ignoré pour éviter les erreurs HTML.')

// RUN AUDIT
console.log("\n🔍 Lancement de l'audit WCAG...\n")
execSync(`node index.js "${url}"`, { stdio: 'inherit' })

console.log('\n===========================================')
console.log('=== ✔ AUDIT COMPLET TERMINÉ')
console.log('===========================================')
