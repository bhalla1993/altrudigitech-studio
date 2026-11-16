/**
 * Phase 2–3: client subdomain routing + POST /api/lead.
 * Slice A: /health and dev-only Resend ping.
 */

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' }

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS })
}

function devRoutesAllowed(env) {
  return env.ALLOW_DEV_ROUTES === 'true' || env.ALLOW_DEV_ROUTES === '1'
}

async function handleResendTest(env) {
  if (!devRoutesAllowed(env)) {
    return json({ error: 'Dev routes disabled' }, 403)
  }

  const apiKey = env.RESEND_API_KEY
  const to = env.RESEND_TEST_TO
  const from = env.RESEND_FROM || 'AltruDigiTech <hello@altrudigitech.com>'

  if (!apiKey) {
    return json({ error: 'RESEND_API_KEY missing (set in .dev.vars)' }, 500)
  }
  if (!to) {
    return json({ error: 'RESEND_TEST_TO missing (set in .dev.vars)' }, 500)
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
      subject: 'AltruDigiTech Slice A — Resend test',
      text: 'If you see this, Resend + altrudigitech.com domain setup is working.',
    }),
  })

  const body = await res.text()
  let parsed
  try {
    parsed = JSON.parse(body)
  } catch {
    parsed = { raw: body }
  }

  if (!res.ok) {
    return json({ error: 'Resend API error', status: res.status, detail: parsed }, 502)
  }

  return json({ ok: true, resend: parsed })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname

    if (path === '/health' && request.method === 'GET') {
      return json({
        ok: true,
        worker: 'altrudigitech-studio-worker',
        slice: 'A',
        pagesOrigin: env.PAGES_ORIGIN || null,
      })
    }

    if (path === '/api/_test/resend' && request.method === 'POST') {
      return handleResendTest(env)
    }

    return json({ error: 'Not found' }, 404)
  },
}