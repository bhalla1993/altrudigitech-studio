# Cloudflare Pages — Git integration

**Repo:** [bhalla1993/altrudigitech-studio](https://github.com/bhalla1993/altrudigitech-studio)  
**Project:** `altrudigitech-studio`  
**Production branch:** `main`

After Git is connected, pushes to `main` build and deploy the studio app. You can still run **`npm run deploy:cf`** for manual deploys; Worker uses **`npm run deploy:worker`** separately.

---

## One-time: connect GitHub (dashboard)

1. **Workers & Pages** → **altrudigitech-studio** → **Settings** → **Builds & deployments**
2. **Connect to Git** (if not already) → **GitHub** → authorize Cloudflare
3. Select **`bhalla1993/altrudigitech-studio`**
4. Configure build:

| Setting | Value |
|---------|--------|
| **Production branch** | `main` |
| **Build command** | `npm ci && npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (repo root) |

5. **Turnstile (public site key)** — committed in **`config/turnstile-site-key.mjs`**. Git builds do **not** need Pages env vars for Turnstile. Optional dashboard overrides: `TURNSTILE_SITE_KEY` / `VITE_TURNSTILE_SITE_KEY` (e.g. staging widget).

Do **not** put **`RESEND_API_KEY`** or **`TURNSTILE_SECRET_KEY`** on Pages — those stay on the **Worker** only.

6. **Save** → **Retry deployment** or push a commit to `main`

---

## Node version

This repo includes **`.node-version`** (`20`). In Pages **Settings** → **Environment**, set **Node.js version** to **20** if the UI offers it.

---

## Build notes

- **`clients/`** and **`sync-lead-config`** run as part of `npm run build` — client sites land in `dist/sites/`
- **`sync-lead-config.mjs`** reads **`config/turnstile-site-key.mjs`** (env override optional)
- Worker **`config/hosts.json`** changes require **`npm run deploy:worker`**, not Pages alone

---

## Verify after first Git deploy

| URL | Expected |
|-----|----------|
| `https://altrudigitech.com/pricing` | 200 |
| `https://altrudigitech.com/contact` | Quick message form + Google intake |

Dashboard → **Deployments** should show **Success** on `main`.

---

## Wrangler vs Git

| Task | Command |
|------|---------|
| Marketing site | Git push **or** `npm run deploy:cf` |
| Worker + API | `npm run deploy:worker` |

Root **`wrangler.toml`** is **Pages-only** (`pages_build_output_dir`). Worker config: **`workers/lead-form/wrangler.toml`**.

---

## Troubleshooting

| Issue | Fix |
|--------|-----|
| Build warns on Turnstile site key | Fix or commit `config/turnstile-site-key.mjs` |
| Contact form missing Turnstile | Confirm `config/turnstile-site-key.mjs` is committed; rebuild. Optional Pages env override. |
| Old content after push | Check deployment branch is `main`; purge browser cache |