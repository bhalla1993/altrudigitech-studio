# Next steps — sell & onboard (post cutover)

**You are here (2026-11-17):** Production on Cloudflare. **Cutover complete** (GitHub Pages retired, social listings point to **altrudigitech.com**). Studio **multi-step intake** + Turnstile + HTML lead emails on **`/contact`**. **`git push main`** deploys Pages with committed Turnstile site key (`config/turnstile-site-key.mjs`).

Deep reference: **[INTAKE_AND_LEADS.md](./INTAKE_AND_LEADS.md)**

---

## Now (business — no code required)

| Priority | Action |
|----------|--------|
| 1 | **Promote** — local trades, students, GTA/Ontario → `/pricing`, `/contact` or `/contact#intake` |
| 2 | **Capacity** — update Pricing copy if you cap weekly Starter builds |
| 3 | **Process** — intake + **payment before build** ([STUDIO_PLAN.md](./STUDIO_PLAN.md) §9-B, §12) |
| 4 | **Smoke test** — occasional incognito submit on `/contact` after deploys |

**Intake:** native **`StudioIntakeForm`** on Contact (not Google Form). Leads → Worker → Resend → studio inbox.

---

## Phase 4 — each paid $99 Starter client

Follow when **payment** is received and intake (form) has what you need to build.

### Before build

- [ ] Starter intake complete (business, template, services, legal checkbox, packages as applicable)
- [ ] **Website address name** agreed — `https://yourname.altrudigitech.com` (one free **name change** pre-launch; post-launch = $25 micro-task)
- [ ] Template from `/templates`; client copy/photos gathered

Technical `slug` in repo = the **name part** only (e.g. `joes-plumbing`).

### Repo & deploy

1. **`clients/{slug}/`** — copy/adapt template + client content  
2. **`config/hosts.json`** — add FQDN:

   ```json
   "joes-plumbing.altrudigitech.com": {
     "slug": "joes-plumbing",
     "client_id": "joes-plumbing",
     "lead_email": "client@example.com"
   }
   ```

3. **`scripts/sync-lead-config.mjs`** — add `{ slug, clientId }` to `CLIENTS` if using shared lead form  
4. **Turnstile dashboard** — add `joes-plumbing.altrudigitech.com` to widget hostnames  
5. **Deploy**
   - `git push origin main` (studio + `dist/sites/*` via Pages Git)
   - `npm run deploy:worker` (hosts.json, routes, API)
6. **Privacy line** on client form: *"Your inquiry is securely transmitted directly to [Business Name] via AltruDigiTech."*

### Handoff to client

- [ ] Live: `https://{name}.altrudigitech.com`
- [ ] Lead form test → `lead_email`
- [ ] Acknowledgment + tweak rules (months 1–3; `updates@` when configured)

Details: [STUDIO_PLAN.md](./STUDIO_PLAN.md) Phase 4 exit, §12.

---

## Phase 5 — $49 custom domain (when sold)

Defer until first custom-domain sale: client zone, NS delegation, Worker on client zone, Turnstile hostnames.

---

## Optional engineering (not blocking sales)

| Item | Notes |
|------|--------|
| `updates@` Email Routing | First client on monthly tweaks — [EMAIL_ROUTING.md](./EMAIL_ROUTING.md) |
| **shivabhalla** portfolio form | Done — `altru-lead` + API on `shivabhalla.altrudigitech.com` |
| **Analytics** | CF Web Analytics or Plausible |
| **`/api/lead` rate limiting** | If spam volume grows |
| **Care plan upsell** | After **5** completed Starters — [STUDIO_PLAN.md](./STUDIO_PLAN.md) §12 |
| **Doc-only** | Rotate `CLOUDFLARE_API_TOKEN` if ever exposed — [CUTOVER_CHECKLIST.md](./CUTOVER_CHECKLIST.md) §6.2 |

---

## Reference — deploy when you change…

| Change | Action |
|--------|--------|
| Studio app, `clients/*`, `public/`, Turnstile **site** key in repo | `git push origin main` |
| `config/hosts.json`, Worker code, Resend/Turnstile **secret** | `npm run deploy:worker` (secrets from `.dev.vars`) |
| Emergency override / faster than Git | `npm run deploy:cf` (loads `.dev.vars`; optional for Turnstile) |

---

## Docs to re-read for pricing/legal

- [STUDIO_PLAN.md](./STUDIO_PLAN.md) — §2 pricing, §11 legal, §12 ops, §4 handover ($129)
- [BRAND.md](./BRAND.md) — names, emails, `yourname.altrudigitech.com`

---

## Agent prompt for Phase 4

```text
Phase 4 onboard: client website name "joes-plumbing" → joes-plumbing.altrudigitech.com
Add clients/joes-plumbing/, hosts.json FQDN, sync-lead-config CLIENTS entry,
Turnstile hostname, deploy worker + git push main.
Lead email: ...
Template base: ...
```

Start from [START_HERE.md](./START_HERE.md).