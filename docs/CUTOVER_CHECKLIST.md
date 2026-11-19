# Cutover checklist — retire GitHub Pages & align public links

**Last verified:** 2026-11-17 — production on **altrudigitech.com**; Worker; `/api/lead`; **StudioIntakeForm** on Contact; Turnstile via **`config/turnstile-site-key.mjs`**; HTML lead emails; Resend → studio inbox. Legacy **altruism** GitHub Pages **off**.

**Email (§3):** `hello@altrudigitech.com` via Cloudflare Email Routing → Gmail.

**Social (§4):** website + public contact fields on Facebook / Instagram / LinkedIn updated to **`https://altrudigitech.com`** (owner-confirmed 2026-11-17). GBP / pins — update when used.

---

## 1. Legacy GitHub Pages (`bhalla1993/altruism`)

| # | Task | Done |
|---|------|------|
| 1.1 | GitHub → repo **`altruism`** → **Settings** → **Pages** → source **None** / disabled | ☑ |
| 1.2 | `https://bhalla1993.github.io/altruism/` → 404 or empty | ☑ |
| 1.3 | README on `altruism` → points to **https://altrudigitech.com** | ☑ |
| 1.4 | Stop using `npm run deploy` (gh-pages) for production | ☑ |
| 1.5 | Local **`altruism`** clone removed; **`legacy`** remote removed where applicable | ☑ |

Plan reference: [STUDIO_PLAN.md](./STUDIO_PLAN.md) §9-E.

---

## 2. Cloudflare production

| # | Task | Done |
|---|------|------|
| 2.1 | Pages **`altrudigitech-studio`** — custom domain **altrudigitech.com** Active | ☑ |
| 2.2 | **`www` → apex** 301 (Bulk Redirects or equivalent) | ☑ |
| 2.3 | DNS wildcard `*` CNAME → `@`, **Proxied** | ☑ |
| 2.4 | Worker routes: `*.altrudigitech.com/*`, `altrudigitech.com/api/*` | ☑ |
| 2.5 | Pages **Git** on **`main`** — deploy Success on push | ☑ |
| 2.6 | Turnstile **site key** in repo (`config/turnstile-site-key.mjs`); Git builds need **no** Pages env vars | ☑ |
| 2.7 | Turnstile **secret** on Worker only (`TURNSTILE_SECRET_KEY`) | ☑ |

---

## 3. Email

| # | Task | Done |
|---|------|------|
| 3.1 | Email Routing **Active** (MX on zone) | ☑ |
| 3.2 | **`hello@altrudigitech.com`** → verified Gmail | ☑ |
| 3.3 | Test inbound to `hello@` from external address | ☑ |
| 3.4 | Resend domain **altrudigitech.com** Verified (outbound form mail) | ☑ |
| 3.5 | **`updates@`** — defer until first paid client ([EMAIL_ROUTING.md](./EMAIL_ROUTING.md)) | — |

---

## 4. Social & listings

**Owner tasks** (not in repo). Canonical website: **`https://altrudigitech.com`**

| Platform | Update | Done |
|----------|--------|------|
| Facebook **altrudigitechdigitalstudio** | Website URL (+ email if shown) | ☑ |
| Instagram **altrudigitechdigitalstudio** | Link in bio | ☑ |
| LinkedIn company | Website URL | ☑ |
| Google Business Profile (if used) | Website | ☐ when applicable |
| Other pins/bios | No `github.io/altruism` | ☑ |

**In-repo links:** `business.socialLinks` in `src/utils/siteData.js` → same profiles (Facebook, Instagram, LinkedIn). Keeping existing pages preserves followers; only the **website URL** needed to change.

---

## 5. Live URL verification

Re-check after DNS or deploy changes (incognito):

```bash
npm run verify:subdomains
```

| URL | Expected |
|-----|----------|
| `https://altrudigitech.com/` | 200 |
| `https://altrudigitech.com/pricing` | 200 |
| `https://altrudigitech.com/contact` | Multi-step intake + Turnstile on last step |
| `https://altrudigitech.com/sites/internal-demo/assets/lead-form/lead-config.js` | `turnstileSiteKey` non-empty |
| `https://internal-demo.altrudigitech.com/` | 200 + test lead form |
| `https://shiva-bhalla.altrudigitech.com/` | 200 |
| `https://not-a-client.altrudigitech.com/` | 404 |

**Intake:** submit on `/contact` → HTML email at `STUDIO_LEAD_EMAIL` / studio Gmail.

**Optional:** `npm run test:resend` (infrastructure only).

---

## 6. Security hygiene

| # | Task | Done |
|---|------|------|
| 6.1 | `.dev.vars` never committed; Worker secrets via Wrangler | ☑ |
| 6.2 | Rotate Cloudflare **API token** if it was ever exposed in chat or logs | ☐ optional |
| 6.3 | `ALLOW_DEV_ROUTES` not set on production Worker | ☑ |

---

## 7. Done definition (cutover)

Cutover is **complete** for studio operations:

- Legacy GitHub Pages **off** (§1)
- **altrudigitech.com** on Cloudflare Pages + Worker (§2)
- **`hello@`** inbound (§3)
- Social **website** links on major profiles → studio domain (§4)
- Intake + leads working (§5)

**Next:** [NEXT_STEPS.md](./NEXT_STEPS.md) — promote + Phase 4 client onboarding.