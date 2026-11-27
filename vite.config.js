import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TURNSTILE_SITE_KEY } from './config/turnstile-site-key.mjs'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const clientsDir = path.join(rootDir, 'clients')

const viteTurnstileSiteKey =
  process.env.VITE_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY || TURNSTILE_SITE_KEY

/** Client slug → URL prefix under /templates/ (keep in sync with scripts/copy-client-sites.mjs) */
const TEMPLATE_DEMO_PATHS = {
  'content-creator-demo': 'templates/creator/content-creator-demo',
  'real-estate-agent-profile': 'templates/services/real-estate-agent-profile',
  'pizzeria-demo': 'templates/business/pizzeria-demo',
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

function trailingSlashRedirects(req, res, next) {
  const pathOnly = req.url?.split('?')[0] ?? ''
  const qs = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''

  const siteMatch = pathOnly.match(/^\/sites\/([^/]+)$/)
  if (siteMatch) {
    res.writeHead(301, { Location: `/sites/${siteMatch[1]}/${qs}` })
    res.end()
    return
  }
  const creatorDemoMatch = pathOnly.match(/^\/templates\/creator\/([^/]+)$/)
  if (creatorDemoMatch) {
    res.writeHead(301, { Location: `/templates/creator/${creatorDemoMatch[1]}/${qs}` })
    res.end()
    return
  }
  const servicesDemoMatch = pathOnly.match(/^\/templates\/services\/([^/]+)$/)
  if (servicesDemoMatch) {
    res.writeHead(301, { Location: `/templates/services/${servicesDemoMatch[1]}/${qs}` })
    res.end()
    return
  }
  const businessDemoMatch = pathOnly.match(/^\/templates\/business\/([^/]+)$/)
  if (businessDemoMatch) {
    res.writeHead(301, { Location: `/templates/business/${businessDemoMatch[1]}/${qs}` })
    res.end()
    return
  }
  next()
}

function resolveClientFile(pathOnly) {
  const siteMatch = pathOnly.match(/^\/sites\/([^/]+)\/(.*)$/)
  if (siteMatch) {
    let file = siteMatch[2]
    if (!file || file.endsWith('/')) file = `${file}index.html`
    return { slug: siteMatch[1], file }
  }

  for (const [slug, relPath] of Object.entries(TEMPLATE_DEMO_PATHS)) {
    const prefix = `/${relPath}`
    if (pathOnly === prefix || pathOnly.startsWith(`${prefix}/`)) {
      let file = pathOnly.slice(prefix.length).replace(/^\//, '')
      if (!file || file.endsWith('/')) file = `${file}index.html`
      return { slug, file }
    }
  }
  return null
}

function serveClientsFromDisk(req, res, next) {
  const pathOnly = req.url?.split('?')[0] ?? ''
  const resolved = resolveClientFile(pathOnly)
  if (!resolved) {
    next()
    return
  }

  const clientRoot = path.join(clientsDir, resolved.slug)
  const filePath = path.normalize(path.join(clientRoot, resolved.file))
  if (!filePath.startsWith(clientRoot)) {
    next()
    return
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    next()
    return
  }

  const ext = path.extname(filePath).toLowerCase()
  res.statusCode = 200
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
  fs.createReadStream(filePath).pipe(res)
}

function clientSitesPlugin() {
  return {
    name: 'client-sites',
    configureServer(server) {
      server.middlewares.use(trailingSlashRedirects)
      server.middlewares.use(serveClientsFromDisk)
    },
    configurePreviewServer(server) {
      server.middlewares.use(trailingSlashRedirects)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), clientSitesPlugin()],
  define: {
    'import.meta.env.VITE_TURNSTILE_SITE_KEY': JSON.stringify(viteTurnstileSiteKey),
  },
})