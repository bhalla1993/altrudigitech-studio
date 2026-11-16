#!/usr/bin/env node
/**
 * Writes per-client lead-config.js from .dev.vars (TURNSTILE_SITE_KEY).
 * Run before client copy / Pages deploy.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const devVarsPath = path.join(root, '.dev.vars')

const CLIENTS = [
  { slug: 'internal-demo', clientId: 'internal-demo' },
]

function loadDevVars(filePath) {
  if (!fs.existsSync(filePath)) return {}
  const env = {}
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    env[key] = val
  }
  return env
}

const env = loadDevVars(devVarsPath)
const siteKey = env.TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY || ''

for (const { slug, clientId } of CLIENTS) {
  const assetsDir = path.join(root, 'clients', slug, 'assets', 'lead-form')
  fs.mkdirSync(assetsDir, { recursive: true })

  const configBody = `window.__ALTRU_LEAD_CONFIG__ = {
  apiUrl: "https://altrudigitech.com/api/lead",
  clientId: ${JSON.stringify(clientId)},
  turnstileSiteKey: ${JSON.stringify(siteKey)},
  businessName: ${JSON.stringify('Internal demo (sandbox)')},
};
`

  fs.writeFileSync(path.join(assetsDir, 'lead-config.js'), configBody, 'utf8')

  const destLead = path.join(assetsDir, 'altru-lead.js')
  const sourceLead = path.join(root, 'clients', '_shared', 'lead-form', 'altru-lead.js')
  fs.copyFileSync(sourceLead, destLead)

  console.log(`sync-lead-config: ${slug} → clients/${slug}/assets/lead-form/`)
}

if (!siteKey) {
  console.warn('sync-lead-config: TURNSTILE_SITE_KEY missing in .dev.vars — forms will not load Turnstile until set.')
}