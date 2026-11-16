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

5. **Environment variables** (Production + Preview):

| Name | Value | Secret? |
|------|--------|---------|
| `TURNSTILE_SITE_KEY` | Same as local `.dev.vars` | Yes |
| `VITE_TURNSTILE_SITE_KEY` | Same value (Vite exposes to Contact form) | Yes |

`npm run build` runs `sync-lead-config.mjs`, which reads **`TURNSTILE_SITE_KEY`** from the environment. Set **both** vars to the same site key so Git builds and the React contact form work.

Optional (only if you add server-side build steps later): do **not** put `RESEND_API_KEY` in Pages — secrets stay on the **Worker** only.

6. **Save** → **Retry deployment** or push a commit to `main`

---

## Node version

This repo includes **`.node-version`** (`20`). In Pages **Settings** → **Environment**, set **Node.js version** to **20** if the UI offers it.

---

## Build notes

- **`clients/`** and **`sync-lead-config`** run as part of `npm run build` — client sites land in `dist/sites/`
- **`TURNSTILE_SITE_KEY`** must be set in Pages env for `internal-demo` lead-config and for parity with local `.dev.vars`
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
| Build fails on `sync-lead-config` warning | Add `TURNSTILE_SITE_KEY` in Pages env |
| Contact form missing Turnstile | Set `VITE_TURNSTILE_SITE_KEY` on Pages |
| Old content after push | Check deployment branch is `main`; purge browser cache |