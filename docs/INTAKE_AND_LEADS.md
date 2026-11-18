# Studio intake & lead delivery

**Last updated:** 2026-11-17  
**Production:** [altrudigitech.com/contact](https://altrudigitech.com/contact) · `POST /api/lead`

---

## Studio intake (marketing site)

| Item | Detail |
|------|--------|
| **UI** | `StudioIntakeForm` — multi-step, branching intents (Starter, General, Custom, Student) |
| **Pages** | `/contact` (primary), optional on Home |
| **Anchor** | `/contact#intake` scrolls to form |
| **Config** | Field labels/options: `src/utils/studioIntakeConfig.js` |
| **Message builder** | `src/utils/formatStudioIntakeMessage.js` (plain text + `email_sections` for Worker) |

Replaces the former embedded **Google Form** on Contact (URLs in `siteData.js` are legacy reference only).

**Starter path** includes business details, template choice, **website address name** (`yourname.altrudigitech.com` pattern), legal checkbox, and payment/packages.

---

## Turnstile (spam protection)

| Layer | Where | What |
|-------|--------|------|
| **Site key (public)** | `config/turnstile-site-key.mjs` | Committed; used by Vite build and `sync-lead-config.mjs` — **Git/Pages builds do not need dashboard env vars** |
| **Secret** | Worker `TURNSTILE_SECRET_KEY` only | Never on Pages or in git |
| **Widget** | Last step of intake | Cloudflare branding (Privacy · Terms) is **normal for all visitors** |
| **Override** | `.dev.vars` or Pages env | Optional `TURNSTILE_SITE_KEY` / `VITE_TURNSTILE_SITE_KEY` |

**Verify after deploy:**

```text
https://altrudigitech.com/sites/internal-demo/assets/lead-form/lead-config.js
→ turnstileSiteKey must not be ""
```

---

## API — `POST https://altrudigitech.com/api/lead`

**Worker:** `workers/lead-form/src/lead-api.js`  
**CORS:** Apex + client hostnames in `config/hosts.json`

### Studio intake payload (JSON)

| Field | Required | Notes |
|-------|----------|--------|
| `name` | yes | Contact name |
| `email` | yes | Reply-to |
| `message` | yes | Plain summary (+ spreadsheet row block for CRM paste) |
| `email_sections` | no | Structured sections → **HTML table email** |
| `intent` | no | Subject line for studio |
| `turnstileToken` | yes (prod) | From widget |
| `client_id` | default `studio` | Bound from origin for client sites |

### Email output (Resend)

- **HTML:** `workers/lead-form/src/lead-email-template.js` — branded layout, section tables (label \| value)
- **Text:** Readable sections + optional CRM tab-separated footer from `message`
- **Inbox:** `STUDIO_LEAD_EMAIL` (Worker secret) for `client_id: studio`
- **Reply-To:** submitter’s `email`

### Client static forms

- `clients/_shared/lead-form/altru-lead.js` + generated `lead-config.js` per client
- Built by `scripts/sync-lead-config.mjs` on every `npm run build`

---

## Deploy when you change…

| Change | Action |
|--------|--------|
| Intake UX / copy / fields | `git push origin main` |
| Worker email template or API | `npm run deploy:worker` |
| Rotate Turnstile widget | Update `config/turnstile-site-key.mjs` + Worker secret → push + `deploy:worker` |
| New client subdomain + form | Phase 4 — [NEXT_STEPS.md](./NEXT_STEPS.md) |

---

## Legacy / unused in production UI

| Artifact | Status |
|----------|--------|
| `StudioLeadForm.jsx` | Old “quick message”; not on Contact page |
| `IntakeFormEmbed.jsx` | Google Form embed; superseded |
| Google Form URLs in `siteData.js` | Kept for reference / historical links |

---

## Optional (not implemented)

- Rate limiting on `/api/lead`
- Client acknowledgment email templates (manual for now)