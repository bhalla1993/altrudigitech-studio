import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const clientsDir = path.join(root, 'clients')
const sitesOut = path.join(root, 'dist', 'sites')

if (!fs.existsSync(clientsDir)) {
  console.log('copy-client-sites: no clients/ directory, skipping')
  process.exit(0)
}

if (!fs.existsSync(path.join(root, 'dist'))) {
  console.error('copy-client-sites: dist/ missing — run vite build first')
  process.exit(1)
}

fs.mkdirSync(sitesOut, { recursive: true })

const skipDirNames = new Set(['.github', 'node_modules'])

for (const slug of fs.readdirSync(clientsDir)) {
  if (slug.startsWith('_') || slug.startsWith('.')) continue
  if (skipDirNames.has(slug)) continue

  const src = path.join(clientsDir, slug)
  if (!fs.statSync(src).isDirectory()) continue

  const dest = path.join(sitesOut, slug)
  fs.rmSync(dest, { recursive: true, force: true })
  fs.cpSync(src, dest, { recursive: true })
  console.log(`copy-client-sites: ${slug} → dist/sites/${slug}/`)
}