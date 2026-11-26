/**
 * SPA fallback: serve index.html for app routes only.
 * Missing /assets/* must not return HTML (stale Vite chunks → MIME errors + blank screen).
 */
export async function onRequest({ request, env }) {
  const url = new URL(request.url)
  const pathname = url.pathname

  const siteRoot = pathname.match(/^\/sites\/([^/]+)\/?$/)
  if (siteRoot) {
    const slug = siteRoot[1]
    if (!pathname.endsWith('/')) {
      return Response.redirect(new URL(`/sites/${slug}/`, url.origin), 301)
    }
    const indexUrl = new URL(`/sites/${slug}/index.html`, url.origin)
    const indexResponse = await env.ASSETS.fetch(new Request(indexUrl, request))
    if (indexResponse.status !== 404) {
      return indexResponse
    }
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