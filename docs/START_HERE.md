# Start here — AltruDigiTech Digital Studio repo

**Canonical repo:** [bhalla1993/altrudigitech-studio](https://github.com/bhalla1993/altrudigitech-studio)  
**Production:** [https://altrudigitech.com](https://altrudigitech.com)  
**Status (2026-11-17):** Phase 1–3 live on Cloudflare; **cutover complete** ([CUTOVER_CHECKLIST.md](./CUTOVER_CHECKLIST.md)). Studio **intake form** on `/contact`; **`git push main`** deploys with committed Turnstile site key. **Selling / client onboard:** [NEXT_STEPS.md](./NEXT_STEPS.md).

New chat or fresh machine? Point the agent at **this file** plus [STUDIO_PLAN.md](./STUDIO_PLAN.md).

---

## Documentation map

| Doc | When to read |
|-----|----------------|
| **[START_HERE.md](./START_HERE.md)** | Clone, secrets, commands (this file) |
| **[STUDIO_PLAN.md](./STUDIO_PLAN.md)** | Product, pricing, phases 0–5, legal/ops |
| **[PHASE_2_3_PLAN.md](./PHASE_2_3_PLAN.md)** | Worker slices A–E (routing + API) — mostly complete |
| **[CUTOVER_CHECKLIST.md](./CUTOVER_CHECKLIST.md)** | Retire GitHub Pages, social, live URL checks |
| **[NEXT_STEPS.md](./NEXT_STEPS.md)** | First paid client (Phase 4), promote, optional polish |
| **[DEPLOY.md](./DEPLOY.md)** | Pages deploy overview |
| **[PAGES_GIT.md](./PAGES_GIT.md)** | Cloudflare Pages ↔ GitHub builds |
| **[WORKER_ROUTES.md](./WORKER_ROUTES.md)** | Wildcard DNS, Worker routes, `/api/lead` |
| **[INTAKE_AND_LEADS.md](./INTAKE_AND_LEADS.md)** | StudioIntakeForm, Turnstile, API, HTML emails |
| **[EMAIL_ROUTING.md](./EMAIL_ROUTING.md)** | `hello@` / `updates@` → Gmail |
| **[BRAND.md](./BRAND.md)** | Names, emails, repo naming |
| **[REPOS.md](./REPOS.md)** | Canonical `origin`; retired `altruism` GitHub Pages |

---

## Fresh clone & local setup

```bash
git clone https://github.com/bhalla1993/altrudigitech-studio.git
cd altrudigitech-studio
npm install
```

Folder name can be anything (`altrudigitech-studio` is clearer than legacy `altruism`).

### Secrets (never commit)

1. Copy **[`.env.example`](../.env.example)** → **`.dev.vars`** at repo root (gitignored).
2. Fill values below.
3. Turnstile **site key** is committed in **`config/turnstile-site-key.mjs`** (Git/Pages builds work without dashboard vars). Optional **`VITE_TURNSTILE_SITE_KEY`** in **`.env.local`** or **`.dev.vars`** to override locally.

| Variable | Where used | Required for |
|----------|------------|--------------|
| `CLOUDFLARE_API_TOKEN` | `deploy:cf`, `deploy:worker` | Wrangler deploy from laptop |
| `CLOUDFLARE_ACCOUNT_ID` | same | Wrangler deploy |
| `PAGES_ORIGIN` | Worker | `https://altrudigitech.com` (default in wrangler) |
| `RESEND_API_KEY` | Worker | `/api/lead` email send |
| `TURNSTILE_SECRET_KEY` | Worker | Turnstile verify |
| `TURNSTILE_SITE_KEY` | optional override | Defaults from `config/turnstile-site-key.mjs` |
| `VITE_TURNSTILE_SITE_KEY` | optional override | Same; Vite also inlines committed default |
| `STUDIO_LEAD_EMAIL` | Worker secret | Inbox for `client_id: studio` |
| `RESEND_TEST_TO` | local script | `npm run test:resend` |
| `RESEND_FROM` | Worker | optional; default hello@ in wrangler |
| `ALLOW_DEV_ROUTES` | local Worker only | `true` for `/api/_test/resend`; never in prod |

**Cloudflare Pages (Git):** normal **`git push`** builds include the public Turnstile site key from the repo — see [PAGES_GIT.md](./PAGES_GIT.md). Do **not** put Worker API secrets on Pages.

**Worker production secrets:** `npm run deploy:worker` syncs `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `STUDIO_LEAD_EMAIL` from `.dev.vars` when set.

---

## Common commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Studio Vite app (localhost:5173) |
| `npm run build` | `dist/` + `dist/sites/*` + lead-config sync |
| `npm run deploy:cf` | Manual Pages upload (optional; prefer `git push`) |
| `npm run deploy:worker` | Worker + routes + API |
| `npm run dev:worker` | Local Worker (8787) |
| `npm run verify:subdomains` | curl smoke test for subdomains |
| `npm run test:resend` | Resend API test |

After **`config/hosts.json`** or Worker code changes → **`npm run deploy:worker`**. After studio/client static changes → **`git push origin main`**. Use **`deploy:cf`** only for emergency overrides.

---

## Architecture (30-second)

- **Marketing app:** Cloudflare **Pages** at `altrudigitech.com`.
- **Client subdomains:** **Worker** `*.altrudigitech.com` → fetches `/sites/{slug}/` on Pages origin.
- **Intake:** `StudioIntakeForm` on **`/contact`** — branches by intent; Turnstile on last step.
- **Leads:** **Worker** `POST /api/lead` → Turnstile verify + **HTML/text email** (Resend).
- **Turnstile site key:** `config/turnstile-site-key.mjs` (public, in git). **Secret** on Worker only.
- **Config:** `config/hosts.json` (FQDN keys) bundled in Worker.

Details: [INTAKE_AND_LEADS.md](./INTAKE_AND_LEADS.md).

---

## Verify production quickly

| URL | Expected |
|-----|----------|
| `/` `/pricing` `/contact` | 200; `/contact` intake submits |
| `internal-demo.altrudigitech.com` | Sandbox + test form |
| `shivabhalla.altrudigitech.com` | Portfolio showcase site |
| `not-a-client.altrudigitech.com` | 404 |

See [CUTOVER_CHECKLIST.md](./CUTOVER_CHECKLIST.md) for full list.

---

## For AI / new Cursor sessions

Suggested prompt:

```text
Read docs/START_HERE.md, docs/INTAKE_AND_LEADS.md, docs/NEXT_STEPS.md, and docs/STUDIO_PLAN.md.
Production: altrudigitech.com on Cloudflare Pages + altrudigitech-studio-worker.
Intake: StudioIntakeForm on /contact. Turnstile site key: config/turnstile-site-key.mjs.
```

Do not commit `.dev.vars`. Rotate `CLOUDFLARE_API_TOKEN` if it was ever exposed.