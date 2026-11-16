/**
 * Map client subdomain request path → Pages origin path under /sites/{slug}/.
 * @param {string} slug
 * @param {string} pathname — URL pathname from client host (e.g. /assets/app.css)
 */
export function pagesSitePath(slug, pathname) {
  const path = pathname && pathname.startsWith('/') ? pathname : `/${pathname || ''}`
  const last = path.split('/').filter(Boolean).pop() || ''
  const hasFileExtension = last.includes('.') && !last.endsWith('.')

  if (hasFileExtension) {
    return `/sites/${slug}${path}`
  }

  // Pages serves `/sites/{slug}/` with 200; bare `index.html` often 308 → breaks subdomain clients.
  if (path === '/' || path === '') {
    return `/sites/${slug}/`
  }

  return `/sites/${slug}/index.html`
}

export function pagesOriginUrl(pagesOrigin, sitePath) {
  const base = pagesOrigin.replace(/\/$/, '')
  return new URL(sitePath.startsWith('/') ? sitePath : `/${sitePath}`, `${base}/`)
}