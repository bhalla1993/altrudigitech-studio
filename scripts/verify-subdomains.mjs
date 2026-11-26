#!/usr/bin/env node
/**
 * Slice C smoke test — client subdomains via Worker (uses curl for reliable DNS).
 * Usage: npm run verify:subdomains
 */

import { execFileSync } from 'child_process'

const checks = [
  { url: 'https://internal-demo.altrudigitech.com/', expect: [200] },
  { url: 'https://shivabhalla.altrudigitech.com/', expect: [200] },
  { url: 'https://a1-india-bazaar.altrudigitech.com/', expect: [200] },
  {
    url: 'https://shivabhalla.altrudigitech.com/assets/vendor/bootstrap/css/bootstrap.min.css',
    expect: [200],
  },
  { url: 'https://shivabhalla.altrudigitech.com/assets/img/favicon.jpeg', expect: [200] },
  { url: 'https://not-a-client.altrudigitech.com/', expect: [404] },
  { url: 'https://altrudigitech.com/', expect: [200] },
]

function statusFor(url) {
  const out = execFileSync(
    'curl',
    ['-sS', '-o', '/dev/null', '-w', '%{http_code}', '-L', '--max-time', '25', url],
    { encoding: 'utf8' },
  )
  return Number(out.trim())
}

let failed = 0

for (const { url, expect } of checks) {
  try {
    const status = statusFor(url)
    const ok = expect.includes(status)
    const mark = ok ? 'OK' : 'FAIL'
    if (!ok) failed += 1
    console.log(`${mark} ${status} ${url}`)
  } catch (err) {
    failed += 1
    console.log(`FAIL ERR ${url} (${err.message})`)
  }
}

process.exit(failed > 0 ? 1 : 0)