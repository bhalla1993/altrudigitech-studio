# Deploy to Cloudflare

Production: **`https://altrudigitech.com`** (Pages project **`altrudigitech-studio`**).

**Default path:** push to **`main`** — Git builds on Cloudflare Pages (`npm ci && npm run build`). Turnstile site key is in **`config/turnstile-site-key.mjs`** (no Pages env vars required).

**Related:** [PAGES_GIT.md](./PAGES_GIT.md) · [WORKER_ROUTES.md](./WORKER_ROUTES.md) · [EMAIL_ROUTING.md](./EMAIL_ROUTING.md)

---

## Marketing site (Pages)

| When | Command |
|------|---------|
| Normal release | `git push origin main` — wait until Pages shows **Success** |
| Emergency / skip Git queue | `npm run deploy:cf` (requires `.dev.vars` with `CLOUDFLARE_*`) |

**Do not** `git push` and `npm run deploy:cf` back-to-back on the same change. Two production uploads can briefly serve `index.html` that references removed `/assets/*.js` chunks → blank screen and console MIME errors. Pick **one** path per release.

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

### Blank screen / “Expected JavaScript module” after deploy

Usually **stale `index.html`** or **missing chunk** while SPA fallback served HTML for `/assets/*.js`. In-repo fix: `functions/[[path]].js` returns **404** for missing `/assets/*`; `public/_headers` sets **no-cache** on HTML. (`_redirects` cannot emit 404 on Pages — see Cloudflare redirects docs.)

| Step | Action |
|------|--------|
| 1 | Cloudflare → **altrudigitech-studio** → confirm latest deployment **Success** |
| 2 | **Caching** → **Purge Everything** (or purge `https://altrudigitech.com/`) once |
| 3 | Browser: private window, or clear site data for `altrudigitech.com` |
| 4 | Going forward: one deploy path per release (Git **or** `deploy:cf`, not both at once) |

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