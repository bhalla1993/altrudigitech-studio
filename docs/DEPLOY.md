# Deploy to Cloudflare

Production: **`https://altrudigitech.com`** (Pages project **`altrudigitech-studio`**).

**Default path:** push to **`main`** — Git builds on Cloudflare Pages (`npm ci && npm run build`). Turnstile site key is in **`config/turnstile-site-key.mjs`** (no Pages env vars required).

**Related:** [PAGES_GIT.md](./PAGES_GIT.md) · [WORKER_ROUTES.md](./WORKER_ROUTES.md) · [EMAIL_ROUTING.md](./EMAIL_ROUTING.md)

---

## Marketing site (Pages)

| When | Command |
|------|---------|
| Normal release | `git push origin main` |
| Emergency / skip Git queue | `npm run deploy:cf` (requires `.dev.vars` with `CLOUDFLARE_*`) |

### One-time Wrangler setup

```bash
npx wrangler login
```

Optional non-interactive deploy — `.dev.vars`:

```env
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ACCOUNT_ID=...
```

First manual project create (if needed):

```bash
npx wrangler pages project create altrudigitech-studio --production-branch=main
```

`npm run deploy:cf` runs `npm run build` then `wrangler pages deploy dist`.

### Verify after deploy

| URL | What |
|-----|------|
| `https://altrudigitech.com/pricing` | SPA deep link (**200**) |
| `https://altrudigitech.com/contact` | Intake form |
| `https://altrudigitech.com/sites/shiva-bhalla/` | Portfolio via apex path |
| `https://shiva-bhalla.altrudigitech.com/` | Same site via Worker subdomain |

```bash
npm run verify:subdomains
```

---

## Worker (API + subdomain routing)

```bash
npm run deploy:worker   # hosts.json, /api/lead, routes
npm run dev:worker      # local :8787
npm run test:resend     # needs .dev.vars
```

Secrets sync from `.dev.vars` when set: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `STUDIO_LEAD_EMAIL`.

---

## Do not use for production

- `npm run deploy` — legacy **gh-pages** to retired **`altruism`** repo.

## LocalTopSpot

**localtopspot.ca** is a separate project — not deployed from this repo.