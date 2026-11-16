import { knownHostnames, lookupHost, resolveLeadEmailByClientId } from './hosts.js'
import { allowedOrigins, corsHeaders, withCors } from './cors.js'

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' }

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS })
}

const APEX_ORIGIN = 'https://altrudigitech.com'

function clientFromOrigin(origin) {
  if (!origin) return null
  try {
    const host = new URL(origin).hostname
    if (host === 'altrudigitech.com') return { client_id: 'studio', hostEntry: null }
    const hostEntry = lookupHost(host)
    if (hostEntry?.client_id) return { client_id: hostEntry.client_id, hostEntry }
    return null
  } catch {
    return null
  }
}

function resolveLeadEmail(clientId, env, hostEntry) {
  if (hostEntry?.lead_email) return hostEntry.lead_email
  if (clientId === 'studio') {
    return env.STUDIO_LEAD_EMAIL || env.RESEND_TEST_TO || ''
  }
  return resolveLeadEmailByClientId(clientId)
}

async function verifyTurnstile(token, env, remoteip) {
  const secret = env.TURNSTILE_SECRET_KEY
  if (!secret) {
    return { ok: false, error: 'TURNSTILE_SECRET_KEY not configured' }
  }
  if (!token) {
    return { ok: false, error: 'Missing turnstile token' }
  }

  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', token)
  if (remoteip) body.set('remoteip', remoteip)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const data = await res.json()
  if (!data.success) {
    return { ok: false, error: 'Turnstile verification failed', detail: data['error-codes'] }
  }
  return { ok: true }
}

async function sendLeadEmail({ env, to, clientId, name, email, message, originHost }) {
  const apiKey = env.RESEND_API_KEY
  const from = env.RESEND_FROM || 'AltruDigiTech <hello@altrudigitech.com>'
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const subject =
    clientId === 'studio'
      ? `[Studio] Contact from ${name || 'Unknown'}`
      : `[${clientId}] New lead from ${name || 'Unknown'}`

  const text = [
    `Client ID: ${clientId}`,
    `Origin: ${originHost || 'unknown'}`,
    '',
    `Name: ${name || '(not provided)'}`,
    `Email: ${email || '(not provided)'}`,
    '',
    'Message:',
    message || '(empty)',
    '',
    '---',
    'Your inquiry was securely transmitted via AltruDigiTech.',
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email || undefined,
      subject,
      text,
    }),
  })

  const raw = await res.text()
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    parsed = { raw }
  }
  if (!res.ok) {
    const err = new Error('Resend send failed')
    err.detail = parsed
    err.status = res.status
    throw err
  }
  return parsed
}

function parseLeadBody(raw) {
  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return { error: 'Invalid JSON body' }
  }

  const name = String(data.name ?? '').trim()
  const email = String(data.email ?? '').trim()
  const message = String(data.message ?? '').trim()
  const turnstileToken = String(data.turnstileToken ?? data['cf-turnstile-response'] ?? '').trim()
  const clientId = String(data.client_id ?? data.clientId ?? 'studio').trim()

  if (!email || !message) {
    return { error: 'email and message are required' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'invalid email' }
  }

  return { name, email, message, turnstileToken, clientId }
}

/**
 * POST /api/lead and OPTIONS preflight (Slice D: studio CORS).
 */
export async function handleLeadApi(request, env) {
  const corsSet = allowedOrigins({ ...env, _corsHosts: knownHostnames() }, 'clients')
  const { headers: cors, allowed } = corsHeaders(request, corsSet)

  if (request.method === 'OPTIONS') {
    if (!allowed && request.headers.get('Origin')) {
      return new Response(null, { status: 403 })
    }
    return new Response(null, { status: 204, headers: cors })
  }

  if (request.method !== 'POST') {
    return withCors(json({ error: 'Method not allowed' }, 405), cors)
  }

  if (request.headers.get('Origin') && !allowed) {
    return withCors(json({ error: 'CORS origin not allowed' }, 403), cors)
  }

  const raw = await request.text()
  const parsed = parseLeadBody(raw)
  if (parsed.error) {
    return withCors(json({ error: parsed.error }, 400), cors)
  }

  let { name, email, message, turnstileToken, clientId } = parsed

  const requestOrigin = request.headers.get('Origin') || ''
  const fromOrigin = clientFromOrigin(requestOrigin)
  if (fromOrigin?.hostEntry) {
    clientId = fromOrigin.client_id
  } else if (requestOrigin === APEX_ORIGIN || requestOrigin.startsWith('http://localhost')) {
    clientId = parsed.clientId || 'studio'
  } else if (requestOrigin && !fromOrigin) {
    return withCors(json({ error: 'CORS origin not allowed' }, 403), cors)
  }

  const cfConnecting = request.headers.get('CF-Connecting-IP')
  const ts = await verifyTurnstile(turnstileToken, env, cfConnecting)
  if (!ts.ok) {
    return withCors(json({ error: ts.error, detail: ts.detail }, 403), cors)
  }

  const hostEntry = fromOrigin?.hostEntry ?? null
  const leadEmail = resolveLeadEmail(clientId, env, hostEntry)
  if (!leadEmail) {
    return withCors(json({ error: 'No lead_email configured for client', client_id: clientId }, 500), cors)
  }

  try {
    const resend = await sendLeadEmail({
      env,
      to: leadEmail,
      clientId,
      name,
      email,
      message,
      originHost: request.headers.get('Origin') || new URL(request.url).hostname,
    })
    return withCors(json({ ok: true, id: resend.id }, 201), cors)
  } catch (err) {
    return withCors(
      json(
        {
          error: err.message,
          detail: err.detail,
          status: err.status,
        },
        502,
      ),
      cors,
    )
  }
}