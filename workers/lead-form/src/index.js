/**
 * Phase 2–3: client subdomain routing + POST /api/lead (Slice D+).
 * Slice B: known *.altrudigitech.com → fetch PAGES_ORIGIN /sites/{slug}/...
 */

import { lookupHost } from './hosts.js'
import { handleLeadApi } from './lead-api.js'
import { pagesOriginUrl, pagesSitePath } from './routing.js'

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' }
const APEX_HOST = 'altrudigitech.com'

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

function notFoundHtml(host) {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><title>Not found</title></head><body><h1>404</h1><p>No site configured for ${host}.</p></body></html>`,
    { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

async function proxyFromPages(request, env, sitePath) {
  const origin = (env.PAGES_ORIGIN || 'https://altrudigitech.com').replace(/\/$/, '')
  const target = pagesOriginUrl(origin, sitePath)

  const headers = new Headers()
  const pass = ['accept', 'accept-encoding', 'accept-language', 'if-none-match', 'if-modified-since', 'range']
  for (const name of pass) {
    const val = request.headers.get(name)
    if (val) headers.set(name, val)
  }

  const init = {
    method: request.method,
    headers,
    redirect: 'follow',
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body
  }

  const upstream = await fetch(target.toString(), init)

  const responseHeaders = new Headers(upstream.headers)
  responseHeaders.delete('transfer-encoding')

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  })
}

async function handleClientHost(request, env, hostname) {
  const entry = lookupHost(hostname)
  if (!entry?.slug) {
    return notFoundHtml(hostname)
  }

  const url = new URL(request.url)
  const sitePath = pagesSitePath(entry.slug, url.pathname)
  return proxyFromPages(request, env, sitePath)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname
    const hostname = url.hostname

    if (path === '/health' && request.method === 'GET') {
      return json({
        ok: true,
        worker: 'altrudigitech-studio-worker',
        slice: 'D',
        pagesOrigin: env.PAGES_ORIGIN || null,
      })
    }

    if (path === '/api/_test/resend' && request.method === 'POST') {
      return handleResendTest(env)
    }

    if (hostname === APEX_HOST) {
      if (path === '/api/lead') {
        return handleLeadApi(request, env)
      }
      if (path.startsWith('/api/')) {
        return json({ error: 'Not found' }, 404)
      }
      return json({ error: 'Apex HTML is served by Pages only' }, 404)
    }

    if (hostname === `www.${APEX_HOST}`) {
      const dest = new URL(url.pathname + url.search, `https://${APEX_HOST}`)
      return Response.redirect(dest.toString(), 301)
    }

    if (!hostname.endsWith(`.${APEX_HOST}`)) {
      return json({ error: 'Not found' }, 404)
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return json({ error: 'Method not allowed' }, 405)
    }

    return handleClientHost(request, env, hostname)
  },
}