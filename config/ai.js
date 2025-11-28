import fs from 'fs'
import path from 'path'

// Force le chargement manuel du .env (bypass dotenvx)
const envPath = path.resolve(process.cwd(), '.env')

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n')

  for (let line of lines) {
    line = line.trim()
    if (!line || line.startsWith('#')) continue

    const [key, ...vals] = line.split('=')
    const value = vals.join('=')

    process.env[key] = value
  }
} else {
  console.error('❌ .env introuvable :', envPath)
}

export const AI_CONFIG = {
  model: process.env.AI_MODEL,
  temperature: parseFloat(process.env.AI_TEMPERATURE),
  max_output_tokens: parseInt(process.env.AI_MAX_OUTPUT_TOKENS, 10),
  output: process.env.OUTPUT_MD,
}

console.log('MODEL =', process.env.AI_MODEL)
console.log('TEMP =', process.env.AI_TEMPERATURE)
console.log('OUTPUT =', process.env.OUTPUT_MD)
