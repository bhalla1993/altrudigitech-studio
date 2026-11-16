#!/usr/bin/env node
/**
 * Slice C smoke test — client subdomains via Worker.
 * Usage: node scripts/verify-subdomains.mjs
 */

const checks = [
  { url: 'https://internal-demo.altrudigitech.com/', expect: [200] },
  { url: 'https://shiva-bhalla.altrudigitech.com/', expect: [200] },
  {
    url: 'https://shiva-bhalla.altrudigitech.com/assets/vendor/bootstrap/css/bootstrap.min.css',
    expect: [200],
  },
  { url: 'https://shiva-bhalla.altrudigitech.com/assets/img/favicon.jpeg', expect: [200] },
  { url: 'https://not-a-client.altrudigitech.com/', expect: [404] },
  { url: 'https://altrudigitech.com/', expect: [200] },
]

let failed = 0

for (const { url, expect } of checks) {
  try {
    const res = await fetch(url, { redirect: 'follow' })
    const ok = expect.includes(res.status)
    const mark = ok ? 'OK' : 'FAIL'
    if (!ok) failed += 1
    console.log(`${mark} ${res.status} ${url}`)
  } catch (err) {
    failed += 1
    console.log(`FAIL ERR ${url} (${err.message})`)
  }
}

process.exit(failed > 0 ? 1 : 0)