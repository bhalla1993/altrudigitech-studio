# Cutover checklist — retire GitHub Pages & align public links

**Last verified:** 2026-11-16 — production, Worker, `/api/lead`, Contact quick message, and Google Form intake tested on **altrudigitech.com**; Resend delivering to studio inbox. Legacy repo cleanup (§1.3, §1.5) **done**.

**Email (§3):** verified 2026-11-16 — Cloudflare Email Routing active (MX on zone), `hello@` → Gmail, inbound test passed.

**Owner task remaining:** §**4** only — social/listing **website** URLs → `https://altrudigitech.com` (not `github.io/altruism`).

---

## 1. Legacy GitHub Pages (`bhalla1993/altruism`)

| # | Task | Done |
|---|------|------|
| 1.1 | GitHub → repo **`altruism`** → **Settings** → **Pages** → set source to **None** / disable | ☑ |
| 1.2 | Confirm `https://bhalla1993.github.io/altruism/` no longer serves the old site (404 or empty) | ☑ |
| 1.3 | README on `altruism` repo → points to **https://altrudigitech.com** | ☑ |
| 1.4 | Stop using `npm run deploy` (gh-pages) for production | ☑ |
| 1.5 | Local **`altruism`** clone removed; **`legacy`** remote removed where applicable | ☑ |

Plan reference: [STUDIO_PLAN.md](./STUDIO_PLAN.md) §9-E.

---

## 2. Cloudflare production

| # | Task | Done |
|---|------|------|
| 2.1 | Pages project **`altrudigitech-studio`** — custom domain **altrudigitech.com** Active | ☑ |
| 2.2 | **`www` → apex** 301 (Bulk Redirects or equivalent) | ☑ |
| 2.3 | DNS wildcard `*` CNAME → `@`, **Proxied** (client subdomains) | ☑ |
| 2.4 | Worker routes: `*.altrudigitech.com/*`, `altrudigitech.com/api/*` | ☑ |
| 2.5 | Pages **Git** connected to **`main`** — latest deploy Success | ☑ |
| 2.6 | Turnstile site key in repo (`config/turnstile-site-key.mjs`); Git builds need no Pages env |

---

## 3. Email

| # | Task | Done |
|---|------|------|
| 3.1 | Email Routing **Active** (MX on zone; Cloudflare-managed) | ☑ |
| 3.2 | **`hello@altrudigitech.com`** → verified Gmail | ☑ |
| 3.3 | Test inbound to `hello@` from an external address | ☑ |
| 3.4 | Resend domain **altrudigitech.com** still Verified (outbound forms) | ☑ |
| 3.5 | **`updates@`** — defer until first paid client ([EMAIL_ROUTING.md](./EMAIL_ROUTING.md)) | — |

---

## 4. Social & listings (point to Cloudflare, not GitHub)

**Owner:** update each platform’s website / link-in-bio (not stored in this repo).

Canonical website everywhere: **`https://altrudigitech.com`**

| Platform | Update | Done |
|----------|--------|------|
| Facebook **AltruDigiTech Builders** | Website URL | ☐ |
| Instagram **altrudigitechbuilders** | Link in bio | ☐ |
| LinkedIn company | Website URL | ☐ |
| Google Business Profile (if used) | Website | ☐ |
| Any pins/bio | Remove `github.io/altruism` | ☐ |

**Repo site:** `business.siteUrl` and `business.socialLinks` in `src/utils/siteData.js` already use **altrudigitech.com** for the studio (profile links only — not the website field on each platform).

**You still need to edit each platform’s “Website” / “Link in bio”** so it shows `https://altrudigitech.com`, not `github.io/altruism`.

---

## 5. Live URL verification

**Done 2026-11-16** — manual Contact + intake test; `npm run verify:subdomains` passing.

Re-check after DNS or deploy changes (incognito):

```bash
npm run verify:subdomains
```

| URL | Expected |
|-----|----------|
| `https://altrudigitech.com/` | 200 |
| `https://altrudigitech.com/pricing` | 200 |
| `https://altrudigitech.com/contact` | Quick message + Google intake |
| `https://internal-demo.altrudigitech.com/` | 200 + test lead form |
| `https://shiva-bhalla.altrudigitech.com/` | 200 |
| `https://not-a-client.altrudigitech.com/` | 404 |

**Contact quick message:** submit with Turnstile → email at `STUDIO_LEAD_EMAIL` / studio Gmail.

**Optional:** `npm run test:resend` (infrastructure only).

---

## 6. Security hygiene

| # | Task | Done |
|---|------|------|
| 6.1 | `.dev.vars` never committed; secrets only in Wrangler/Pages env | ☑ |
| 6.2 | Rotate Cloudflare **API token** if it was ever exposed in chat or logs | ☐ |
| 6.3 | `ALLOW_DEV_ROUTES` not set on production Worker | ☑ |

---

## 7. Done definition

Cutover is complete when:

- Legacy **GitHub Pages** is off; **`altruism`** repo README + local clone cleanup **done** (§1).
- **Social/listings** reference **altrudigitech.com** only — finish **§4** (only cutover item left).
- **`hello@`** receives mail — **done** (§3).
- Git deploy on **`main`** keeps Pages current — **done**.
- Subdomains + `/api/lead` verified — **done** (§5).

Next: [NEXT_STEPS.md](./NEXT_STEPS.md) (promote + Phase 4 first client).