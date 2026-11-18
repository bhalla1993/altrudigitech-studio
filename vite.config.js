import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TURNSTILE_SITE_KEY } from './config/turnstile-site-key.mjs'

const viteTurnstileSiteKey =
  process.env.VITE_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY || TURNSTILE_SITE_KEY

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    'import.meta.env.VITE_TURNSTILE_SITE_KEY': JSON.stringify(viteTurnstileSiteKey),
  },
})
