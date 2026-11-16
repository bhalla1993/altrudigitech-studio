# Deploy to Cloudflare (on command)

Production target: **`https://altrudigitech.com`** (Pages project **`altrudigitech-studio`**).

**Git auto-deploy:** see **[PAGES_GIT.md](./PAGES_GIT.md)**. **Email Routing:** **[EMAIL_ROUTING.md](./EMAIL_ROUTING.md)**.

## One-time setup

1. **Login** (browser):

   ```bash
   npx wrangler login
   ```

2. **Custom domain** (Cloudflare dashboard, once):  
   Workers & Pages → **altrudigitech-studio** → **Custom domains** → add **`altrudigitech.com`**.

3. **Non-interactive deploy:** `.dev.vars` (gitignored) with:

   ```env
   CLOUDFLARE_API_TOKEN=...
   CLOUDFLARE_ACCOUNT_ID=...
   ```

   `npm run deploy:cf` loads `.dev.vars` automatically. First deploy may require creating the project once:

   ```bash
   npx wrangler pages project create altrudigitech-studio --production-branch=main
   ```

## Deploy (every release)

From repo root:

```bash
npm run deploy:cf
```

This runs `npm run build` (Vite + `dist/sites/*` client copy) then `wrangler pages deploy dist`.

Or ask in Cursor Agent mode: **“Deploy studio to Cloudflare.”**

## Verify after deploy

| URL | What |
|-----|------|
| `https://altrudigitech.com/` | Marketing app |
| `https://altrudigitech.com/pricing` | SPA deep link (must be **200**, not 404) |
| `https://altrudigitech.com/sites/shiva-bhalla/` | First client portfolio |
| `https://altrudigitech.com/sites/internal-demo/` | Sandbox placeholder |

Until **Phase 2 Worker**, client subdomains like `https://shiva-bhalla.altrudigitech.com` are not routed — use **`/sites/{slug}/`** on the apex.

## Worker (Phase 2–3, local only until Slice B)

```bash
npm run dev:worker   # http://localhost:8787/health
npm run test:resend  # requires .dev.vars — see .env.example
```

Plan: **[PHASE_2_3_PLAN.md](./PHASE_2_3_PLAN.md)**. Production Worker: **[WORKER_ROUTES.md](./WORKER_ROUTES.md)** (`npm run deploy:worker`).

## Do not use

- `npm run deploy` — **gh-pages** to GitHub (`legacy` repo), not Cloudflare.

## LocalTopSpot

**localtopspot.ca** is a separate project — do not deploy from this repo’s `deploy:cf`.