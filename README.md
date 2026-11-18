# AltruDigiTech Digital Studio

Production-ready React marketing site for **AltruDigiTech** — affordable single-page sites for local businesses and students.

**Production:** [altrudigitech.com](https://altrudigitech.com)

### Docs (start here)

| Doc | Purpose |
|-----|---------|
| **[docs/START_HERE.md](docs/START_HERE.md)** | Clone, secrets, commands, doc index (new machine / new chat) |
| **[docs/CUTOVER_CHECKLIST.md](docs/CUTOVER_CHECKLIST.md)** | Retire GitHub Pages, social URLs, live checks |
| **[docs/NEXT_STEPS.md](docs/NEXT_STEPS.md)** | Promote, Phase 4 first client onboarding |
| **[docs/INTAKE_AND_LEADS.md](docs/INTAKE_AND_LEADS.md)** | Contact intake, Turnstile, `/api/lead`, emails |
| **[docs/STUDIO_PLAN.md](docs/STUDIO_PLAN.md)** | Locked product, pricing, phases 0–5 |

Brand: **[docs/BRAND.md](docs/BRAND.md)** (`src/utils/siteData.js`).

## Tech Stack

- React + Vite
- React Router
- Material UI (dark-first theme)
- Framer Motion
- React Helmet Async
- React Hook Form + Yup validation

## Project Structure

```text
config/           hosts.json, turnstile-site-key.mjs (public site key)
src/              Studio React app (StudioIntakeForm on /contact)
public/           Static assets + SPA template demos
clients/{slug}/   Client static sites → dist/sites/{slug}/
workers/          altrudigitech-studio-worker (/api/lead)
scripts/          Build helpers (sync-lead-config, deploy)
docs/             START_HERE, STUDIO_PLAN, intake, deploy, worker
```

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

The build runs `vite build` then copies `clients/*` into `dist/sites/`.

Verify sandbox output: `dist/sites/internal-demo/index.html`

## Cloudflare Pages (production)

Connect this repository in the Cloudflare dashboard (**Workers & Pages** → **Create** → **Connect to Git**).

| Setting | Value |
|---------|--------|
| Production branch | `main` |
| Build command | `npm ci && npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

Turnstile **site key** is in **`config/turnstile-site-key.mjs`** — Pages env vars for Turnstile are **optional**. Do not put Worker secrets on Pages.

Add custom domain **`altrudigitech.com`**. Configure **`www` → apex** 301 in Cloudflare Bulk Redirects.

GitHub Pages on the old **`altruism`** repo is retired; production is **altrudigitech.com** only (see [docs/CUTOVER_CHECKLIST.md](docs/CUTOVER_CHECKLIST.md)).

### Deploy

**Normal:** `git push origin main` (Pages Git).  
**Worker:** `npm run deploy:worker` when `config/hosts.json` or Worker code changes.  
**Optional:** `npm run deploy:cf` (Wrangler upload; needs `.dev.vars`).

See **[docs/DEPLOY.md](docs/DEPLOY.md)** · **[docs/PAGES_GIT.md](docs/PAGES_GIT.md)** · **[docs/INTAKE_AND_LEADS.md](docs/INTAKE_AND_LEADS.md)**.

### SPA routing

`public/_redirects` serves the React app for deep links on Cloudflare Pages. Do **not** add a root `404.html` (it disables Pages SPA mode and breaks `/pricing`, etc.).

## Git remote

| Remote | Repo |
|--------|------|
| **origin** | `bhalla1993/altrudigitech-studio` — canonical; push here |

Details: **[docs/REPOS.md](docs/REPOS.md)**. Do **not** use `npm run deploy` (gh-pages) for production.

## Notes

- Router uses `BrowserRouter` with `basename` from `import.meta.env.BASE_URL` (`/` at apex).
- Images use Pexels CDN links (attribution in footer where applicable).
- Theme is dark by default; switch in `src/styles/theme.js`.