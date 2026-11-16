const APEX_ORIGIN = 'https://altrudigitech.com'

const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:8787',
]

/** Slice D: studio apex only (+ local Vite dev). Slice E adds client host origins. */
export function allowedOrigins(env, mode = 'studio') {
  const origins = new Set([APEX_ORIGIN, ...DEV_ORIGINS])
  if (mode === 'clients') {
    for (const host of env._corsHosts ?? []) {
      origins.add(`https://${host}`)
    }
  }
  return origins
}

export function corsHeaders(request, allowed) {
  const origin = request.headers.get('Origin')
  const headers = new Headers()
  if (origin && allowed.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Vary', 'Origin')
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type')
    headers.set('Access-Control-Max-Age', '86400')
  }
  return { origin, headers, allowed: Boolean(origin && allowed.has(origin)) }
}

export function withCors(response, corsHeaderBag) {
  const out = new Headers(response.headers)
  corsHeaderBag.forEach((value, key) => out.set(key, value))
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: out,
  })
}