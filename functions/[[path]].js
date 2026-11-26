/**
 * SPA fallback: serve index.html for app routes only.
 * Missing /assets/* must not return HTML (stale Vite chunks → MIME errors + blank screen).
 */
export async function onRequest({ request, env }) {
  const url = new URL(request.url)
  const pathname = url.pathname

  // Bare /sites/{slug} (no trailing slash) → directory URL. Do not fetch index.html here:
  // Pages 308s index.html → /sites/{slug}/ and returning that 308 to the client causes a loop.
  const siteBare = pathname.match(/^\/sites\/([^/]+)$/)
  if (siteBare) {
    return Response.redirect(new URL(`/sites/${siteBare[1]}/`, url.origin), 301)
  }

  const creatorDemoBare = pathname.match(/^\/templates\/creator\/([^/]+)$/)
  if (creatorDemoBare) {
    return Response.redirect(
      new URL(`/templates/creator/${creatorDemoBare[1]}/`, url.origin),
      301,
    )
  }

  const servicesDemoBare = pathname.match(/^\/templates\/services\/([^/]+)$/)
  if (servicesDemoBare) {
    return Response.redirect(
      new URL(`/templates/services/${servicesDemoBare[1]}/`, url.origin),
      301,
    )
  }

  const assetResponse = await env.ASSETS.fetch(request)
  const contentType = assetResponse.headers.get('Content-Type') || ''

  if (pathname.startsWith('/assets/')) {
    const looksLikeHtml = contentType.includes('text/html')
    if (assetResponse.status === 404 || looksLikeHtml) {
      return new Response('Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }
    return assetResponse
  }

  if (assetResponse.status !== 404) {
    return assetResponse
  }

  return env.ASSETS.fetch(new URL('/index.html', url.origin))
}