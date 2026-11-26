import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TURNSTILE_SITE_KEY } from './config/turnstile-site-key.mjs'

const viteTurnstileSiteKey =
  process.env.VITE_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY || TURNSTILE_SITE_KEY

function clientSitesTrailingSlash() {
  return {
    name: 'client-sites-trailing-slash',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = req.url?.split('?')[0] ?? ''
        const match = pathOnly.match(/^\/sites\/([^/]+)$/)
        if (match) {
          const qs = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''
          res.writeHead(301, { Location: `/sites/${match[1]}/${qs}` })
          res.end()
          return
        }
        next()
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), clientSitesTrailingSlash()],
  define: {
    'import.meta.env.VITE_TURNSTILE_SITE_KEY': JSON.stringify(viteTurnstileSiteKey),
  },
})
