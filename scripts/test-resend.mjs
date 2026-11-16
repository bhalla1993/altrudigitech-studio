#!/usr/bin/env node
/**
 * Slice A: send one test email via Resend (reads repo root .dev.vars).
 * Usage: npm run test:resend
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const devVarsPath = path.join(root, '.dev.vars')

function loadDevVars(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('Missing .dev.vars at repo root')
    process.exit(1)
  }
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
const apiKey = env.RESEND_API_KEY
const to = env.RESEND_TEST_TO
const from = env.RESEND_FROM || 'AltruDigiTech <hello@altrudigitech.com>'

if (!apiKey) {
  console.error('RESEND_API_KEY not set in .dev.vars')
  process.exit(1)
}
if (!to) {
  console.error('RESEND_TEST_TO not set in .dev.vars')
  process.exit(1)
}

const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: 'AltruDigiTech Slice A — Resend test (script)',
    text: 'If you see this, Resend + domain setup is working.',
  }),
})

const body = await res.text()
let parsed
try {
  parsed = JSON.parse(body)
} catch {
  parsed = body
}

if (!res.ok) {
  console.error('Resend error', res.status, parsed)
  process.exit(1)
}

console.log('Sent OK:', parsed)