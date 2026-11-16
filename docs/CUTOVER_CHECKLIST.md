# Cutover checklist — retire GitHub Pages & align public links

Use after **altrudigitech.com** is live on Cloudflare. Check items off as you complete them.

---

## 1. Legacy GitHub Pages (`bhalla1993/altruism`)

| # | Task | Done |
|---|------|------|
| 1.1 | GitHub → repo **`altruism`** → **Settings** → **Pages** → set source to **None** / disable | ☐ |
| 1.2 | Confirm `https://bhalla1993.github.io/altruism/` no longer serves the old site (404 or empty) | ☐ |
| 1.3 | Optional: README on `altruism` repo → “Canonical: https://altrudigitech.com” | ☐ |
| 1.4 | Stop using `npm run deploy` (gh-pages) for production | ☐ |
| 1.5 | Optional: `git remote remove legacy` on your laptop if you no longer mirror | ☐ |

Plan reference: [STUDIO_PLAN.md](./STUDIO_PLAN.md) §9-E.

---

## 2. Cloudflare production

| # | Task | Done |
|---|------|------|
| 2.1 | Pages project **`altrudigitech-studio`** — custom domain **altrudigitech.com** Active | ☐ |
| 2.2 | **`www` → apex** 301 (Bulk Redirects or equivalent) | ☐ |
| 2.3 | DNS wildcard `*` CNAME → `@`, **Proxied** (client subdomains) | ☐ |
| 2.4 | Worker routes: `*.altrudigitech.com/*`, `altrudigitech.com/api/*` | ☐ |
| 2.5 | Pages **Git** connected to **`main`** — latest deploy Success | ☐ |
| 2.6 | Pages env: `TURNSTILE_SITE_KEY` + `VITE_TURNSTILE_SITE_KEY` | ☐ |

---

## 3. Email

| # | Task | Done |
|---|------|------|
| 3.1 | Email Routing **Active** (MX on zone) | ☐ |
| 3.2 | **`hello@altrudigitech.com`** → verified Gmail | ☐ |
| 3.3 | Test inbound to `hello@` from an external address | ☐ |
| 3.4 | Resend domain **altrudigitech.com** still Verified (outbound forms) | ☐ |
| 3.5 | **`updates@`** — defer until first paid client ([EMAIL_ROUTING.md](./EMAIL_ROUTING.md)) | — |

---

## 4. Social & listings (point to Cloudflare, not GitHub)

Canonical website everywhere: **`https://altrudigitech.com`**

| Platform | Update | Done |
|----------|--------|------|
| Facebook **AltruDigiTech Builders** | Website URL | ☐ |
| Instagram **altrudigitechbuilders** | Link in bio | ☐ |
| LinkedIn company | Website URL | ☐ |
| Google Business Profile (if used) | Website | ☐ |
| Any pins/bio | Remove `github.io/altruism` | ☐ |

Site social URLs live in `src/utils/siteData.js` → `business.socialLinks`.

---

## 5. Live URL verification

Run locally after DNS cache is fresh (or use incognito):

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
| 6.1 | `.dev.vars` never committed; secrets only in Wrangler/Pages env | ☐ |
| 6.2 | Rotate Cloudflare **API token** if it was ever exposed in chat or logs | ☐ |
| 6.3 | `ALLOW_DEV_ROUTES` not set on production Worker | ☐ |

---

## 7. Done definition

Cutover is complete when:

- Legacy **GitHub Pages** is off and search/social only reference **altrudigitech.com**.
- **hello@** receives mail.
- Git deploy on **`main`** keeps Pages current.
- Subdomains + `/api/lead` verified.

Next: [NEXT_STEPS.md](./NEXT_STEPS.md) (promote + Phase 4 first client).