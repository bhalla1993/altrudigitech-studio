# AltruDigiTech Digital Studio

Production-ready React marketing site for **AltruDigiTech** — affordable single-page sites for local businesses and students.

**Production:** [altrudigitech.com](https://altrudigitech.com)

### Docs (start here)

| Doc | Purpose |
|-----|---------|
| **[docs/START_HERE.md](docs/START_HERE.md)** | Clone, secrets, commands, doc index (new machine / new chat) |
| **[docs/CUTOVER_CHECKLIST.md](docs/CUTOVER_CHECKLIST.md)** | Retire GitHub Pages, social URLs, live checks |
| **[docs/NEXT_STEPS.md](docs/NEXT_STEPS.md)** | Promote, Phase 4 first client onboarding |
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
src/              Studio React app
public/           Static assets + SPA template demos
clients/{slug}/   Client static sites → dist/sites/{slug}/
scripts/          Build helpers
docs/             START_HERE, STUDIO_PLAN, deploy, worker, email
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

Add custom domain **`altrudigitech.com`**. Configure **`www` → apex** 301 in Cloudflare Bulk Redirects.

After cutover, disable GitHub Pages deployment to avoid duplicate indexing (see plan §9-E).

### Deploy from your machine (Wrangler)

One-time: `npx wrangler login`. Then:

```bash
npm run deploy:cf
```

See **[docs/DEPLOY.md](docs/DEPLOY.md)** · Git builds: **[docs/PAGES_GIT.md](docs/PAGES_GIT.md)** · Email: **[docs/EMAIL_ROUTING.md](docs/EMAIL_ROUTING.md)**.

### SPA routing

`public/_redirects` serves the React app for deep links on Cloudflare Pages. Do **not** add a root `404.html` (it disables Pages SPA mode and breaks `/pricing`, etc.).

## Git remotes

| Remote | Repo |
|--------|------|
| **origin** | `bhalla1993/altrudigitech-studio` — canonical; push here |
| **legacy** | `bhalla1993/altruism` — GitHub Pages staging until CF cutover |

Details: **[docs/REPOS.md](docs/REPOS.md)**.

## Legacy GitHub Pages

`npm run deploy` (gh-pages) is retained for optional staging on **legacy**. Production is **altrudigitech.com** on Cloudflare Pages.

## Notes

- Router uses `BrowserRouter` with `basename` from `import.meta.env.BASE_URL` (`/` at apex).
- Images use Pexels CDN links (attribution in footer where applicable).
- Theme is dark by default; switch in `src/styles/theme.js`.