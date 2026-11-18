# AltruDigiTech Digital Studio — Master Plan (Locked)

**Status:** Phase 1 in progress (apex build + `clients/` pipeline)  
**Repo (target):** `altrudigitech-studio` (rename from `altruism`)  
**Production domain:** `altrudigitech.com`  
**Stack:** Cloudflare Pages + Workers (free tier) · Resend · Turnstile  

---

## 1. Vision & umbrella

### Brand & structure

- **Umbrella:** AltruDigiTech Digital Studio — all client sites and in-house products under one authority (`altrudigitech.com`).
- **Brand lock:** See **[docs/BRAND.md](BRAND.md)** and `src/utils/siteData.js` (`brand`, `pageSeo`). **Deprecated:** Altruism / Altruism Digital Studio.
- **Audience:** Local trades/contractors, small shops, students — no monthly DIY builder subscriptions.

### Live / related assets

| Asset | Role |
|-------|------|
| `sparkshots.ca` | Client work; footer should credit AltruDigiTech |
| `localtopspot.ca` | In-house Durham trades directory; bundle with Starter |
| `punchface` | Studio Labs — engineering showcase (link only) |
| Current `altruism` repo | Marketing site + 18 HTML SPA templates → becomes studio monorepo |

### Current repo snapshot (pre-migration)

- React + Vite on **GitHub Pages** (`base: '/altruism/'`) — migrating to apex `/` for Cloudflare Pages.
- 18 templates in `public/templates/spa/` (+ duplicate under `src/templates/SPATemplates/`).
- Templates include fixed **“Built by altrudigitech.com”** footer bar.
- Lead forms in templates are mostly **demo `alert()`**; studio uses **`StudioIntakeForm`** on `/contact` (see [INTAKE_AND_LEADS.md](./INTAKE_AND_LEADS.md)).
- Pricing/copy conflicts: Home $99/48h vs Pricing $99/$149/$199 vs unused $499 tiers in `siteData.js`.

---

## 2. Commercial model (locked)

### Starter — $99 one-time (CAD)

**Included:**

- Single-page site: Hero, Services, About, Contact (one scroll).
- Template-based design; name/logo/colors/text swap.
- Mobile-first; stock images (Pexels/Unsplash) until client photos; attribution per standard.
- Hosting on `{slug}.altrudigitech.com` (**free ongoing**).
- One contact/quote form → central API (when live).
- **One** pre-launch revision round (batched feedback).
- **One** minor text/hours update per calendar month for **first 3 months** (~15 min OR ~50 words).

**NOT included:**

- Custom domain (add-on), multi-page, booking/e-commerce, unlimited revisions, full rebrand, SEO/ads, copy from blank, code handover (add-on).

**SLA (honest):**

- Launch driven by **completed content worksheet** + payment (recommended), not “48h from hello.”

### Add-ons (locked)

| Add-on | Price |
|--------|--------|
| Custom domain setup (NS to your Cloudflare zone) | **$49** + client pays registrar |
| Code & Asset Handover | **$129** |
| Expansion (multi-page, galleries, richer forms) | **from $199** |
| Micro-task (post–month 3 or extra changes) | **$25** standard (complex **$50**) |
| Extra pre-launch revision round | **$49** |
| LocalTopSpot featured listing | **28 days free** with $99 Starter (manual fulfillment) |

**Pricing footnote (locked):** All prices in **CAD**. **No HST charged** while AltruDigiTech qualifies as a **Small Supplier** under CRA rules (gross revenue ≤ $30,000 CAD over four consecutive calendar quarters). Revisit this note if registration or threshold status changes.

### FAQ lines (locked)

- **After month 3:** Subdomain hosting stays **free**. Updates after the 3-month tweak window = **$25** micro-task rate.
- **Custom domain:** Client adds domain as **separate free zone** in your Cloudflare; updates **nameservers**; Worker routes `*domain/*` — **no** Cloudflare for SaaS.

### Retired publicly (when site is updated)

- Middle tiers $149 as separate SKU (fold into micro-tasks / $199 expansion).
- Old $199 “ownership package” → **$129 handover**.
- Orphan $499/$1,499 in `siteData.js`.
- Customer-facing “hosted on GitHub Pages” → **altrudigitech.com** subdomain.

---

## 3. Infrastructure (locked, ~$0 solo)

### Principles

- One Cloudflare **Pages** deployment (studio + all clients under `/sites/{slug}/`).
- One **Worker**: routing + `POST /api/lead`.
- **No** per-client Pages projects, VPS, or DB for MVP.
- Custom domains: **delegated NS** to your account (free zone + Worker), not CNAME-only vanity SSL without zone.

### DNS

- **Zone:** `altrudigitech.com` — apex, `www` (301 to apex), wildcard `*` → Worker (after Phase 2).
- **Per $49 client:** new zone in your CF; client NS; Worker route on that zone.

### Worker route order (locked)

1. `OPTIONS` + `POST` **`/api/lead`** — CORS, Turnstile, Resend (`client_id`, `lead_email` from config).
2. Host **`altrudigitech.com`** → passthrough to **Pages** (studio). (`www` terminates via **301 to apex** at Cloudflare before canonical studio URLs.)
3. Else → lookup host in **`config/hosts.json`** → `slug`; missing → **404**.
4. If slug host + static path (extension / asset path) → **`/sites/{slug}{path}`** (NOT root `/assets/*`).
5. Else → **`/sites/{slug}/index.html`**.

### Forms (locked)

- **URL:** `https://altrudigitech.com/api/lead` only.
- **CORS:** allowed `Origin`s from `hosts.json` keys.
- **Resend** free tier; **Turnstile** on submit.

### Host map (Phase 2+)

- Git **`config/hosts.json`**, bundled into Worker on deploy.
- Per host: `slug`, `client_id`, `lead_email`.
- Phase 2+: KV/admin only if friction warrants it.

### Turnstile (locked)

- Widget **#1:** studio + `*.altrudigitech.com` (verify wildcard once in dashboard).
- **$49 domain:** add `clientdomain.ca` + `www` to widget.
- **2nd widget** every ~9 custom domains (hostname limits).

### Scale path (explicit non-goals until needed)

- R2 for client assets if Pages build size/deploy slows.
- Workers Paid ~$5/mo if limits hit.
- Do not build agentic client spin-up before ~5 manual onboardings.

### Cloudflare Pages (production — Phase 1)

| Setting | Value |
|---------|--------|
| Source | Git repository (`main` branch) — **native Cloudflare Pages Git integration** |
| Build command | `npm ci && npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repository root) |
| Node version | 20 (set in CF dashboard or `.node-version` if added) |
| Custom domains | `altrudigitech.com` (apex); `www` → 301 to apex via Bulk Redirects |

**Build pipeline:**

1. `vite build` → studio SPA at `dist/` root + `public/` assets (e.g. `templates/spa/`).
2. `scripts/copy-client-sites.mjs` → copies `clients/{slug}/` → `dist/sites/{slug}/`.

**Post–Phase 1 cutover:** Retire `bhalla1993.github.io/altruism` as production (disable GitHub Pages deploy).

---

## 4. $129 handover runbook (locked)

1. Export **zip**: HTML/CSS/assets; strip Turnstile + API; `mailto:` or placeholder; keep stock attribution where required.
2. Remove `{slug}.altrudigitech.com` from `hosts.json`; redeploy (404/sunset).
3. Custom domain: remove Worker routes; remove Turnstile hostnames; delete zone or hand off per agreement; client repoints NS.
4. Remove all client hosts from `hosts.json`.
5. Client doc: no lead backend in zip unless they add their own.
6. **Receipt line:** *"Includes full commercial rights to operate this website for your business; resale or redistribution as a commercial website template is prohibited."*

---

## 5. Studio site IA (planned — content phase)

**Nav:** Home, About, Services, Templates, Live Projects, Pricing, Contact.

**Blocks to align with locked pricing:**

- Hero: $99 one-time, no monthly site fees, GTA/local trades + students.
- Starter vs NOT included table + add-on table + FAQ (month 3, domain, handover $129).
- Templates CTA: “Get this design — $99 Starter.”
- **Client work:** SparkShots (+ footer backlink task).
- **Studio Labs:** LocalTopSpot, Punchface (external links).
- Contact: eventually same `/api/lead` (Phase 3).

---

## 6. Monorepo layout (target)

```text
altrudigitech-studio/
├── src/                      # Studio React app
├── public/templates/spa/     # Sales demos (consolidate duplicates later)
├── clients/{slug}/           # Per-client static sites
├── scripts/                  # copy-client-sites.mjs
├── workers/lead-form/        # Worker source (Phase 2+)
├── config/hosts.json         # Host map (Phase 2+)
├── docs/STUDIO_PLAN.md       # This file
├── package.json
└── vite.config.js            # base: '/'
```

**Build output:**

```text
dist/
  index.html + assets/        # Studio
  sites/{slug}/...            # Clients
  templates/spa/...           # Demos
```

---

## 7. Implementation sequence (locked)

| Phase | Goal | Revenue gate |
|-------|------|----------------|
| **0** | CF zone, Resend, Turnstile, secrets list | — |
| **1** | Pages apex + monorepo build (`clients/` → `dist/sites/`) | Marketing site on apex |
| **2** | Worker + `hosts.json` (sandbox slug); wildcard routing | — |
| **3** | `/api/lead` + studio contact dogfood | — |
| **4** | First real `{slug}.altrudigitech.com` + live form | **Sell $99 Starter** |
| **5** | First $49 delegated `.ca` zone | **Sell $49 domain** |

**Strict order:** 0 → 1 → 2 → 3 → 4 → 5.

### Phase 0 exit

- `altrudigitech.com` on Cloudflare.
- Resend + Turnstile accounts ready.
- Turnstile widget #1 created.

### Phase 1 exit

- `https://altrudigitech.com` loads studio.
- `dist/sites/internal-demo/` in build artifact.
- Until Phase 2 Worker: verify `https://altrudigitech.com/sites/internal-demo/` serves sandbox page.

### Phase 2 exit

- Unknown subdomain → 404.
- Test slug serves `/sites/{slug}/` with correct static paths.

### Phase 3 exit

- Test lead from studio origin → email via Resend.

### Phase 4 exit

- Client subdomain + form + Reply-To.

### Phase 5 exit

- Custom domain SSL + form CORS from `.ca`.

---

## 8. Related properties (do not merge into studio app)

| Property | Hosting |
|----------|---------|
| Studio | Pages + Worker on `altrudigitech.com` |
| localtopspot.ca | Separate Pages project |
| punchface | Separate deploy |
| sparkshots.ca | Eventually `clients/sparkshots` + host map / own zone |

---

## 9. Decisions (locked)

| # | Decision | Locked choice |
|---|----------|----------------|
| A | Canonical URL | **Apex** `https://altrudigitech.com`; **301** `www` → apex (Cloudflare Bulk Redirects or equivalent). Client Starter URLs: **`https://{slug}.altrudigitech.com`** only (no `www` on studio subdomains). |
| B | Payment gate | **Cold outreach:** payment before any custom preview/build. **Warm leads:** at most a **generic 1-section demo** (no client slug) until paid. |
| C | Student pricing | Public **$99** for everyone; manual **`STUDENT20`** (−$20) on request — do not publish as default price. |
| D | Sandbox slug | **`internal-demo`** for Phases 2–3. |
| E | GitHub Pages | **Retire** `bhalla1993.github.io/altruism` after `altrudigitech.com` is live on CF (remove/disable source; avoid duplicate SEO). |
| F | CF deploy | **Native Cloudflare Pages Git integration** (build on push to `main`); do not add custom GHA deploy to CF for MVP. |

---

## 10. Document history

- Pricing, hosting, Worker order, handover, and phases locked in planning sessions.
- §9 decisions, §11 legal, §12 ops locked; Phase 1 build started (apex + `clients/` copy).

---

## 11. Legal & intake (locked — before first $99 payment)

- **HST:** Display on pricing: *"All prices in CAD. No HST charged (Small Supplier exemption)."* Update when CRA registration or threshold requires charging HST.
- **Trade claims:** Intake worksheet **required checkbox:** *"I confirm that all license numbers, insurance claims, and business details provided are accurate and legally authorized for public display."*
- **Form privacy (every client contact form):** *"Your inquiry is securely transmitted directly to [Business Name] via AltruDigiTech."*
- **$129 handover receipt:** *"Includes full commercial rights to operate this website for your business; resale or redistribution as a commercial website template is prohibited."*

---

## 12. Operational guardrails (locked — Phase 4+)

### Intake worksheet (required before build)

**Implementation (2026):** Public site uses **`StudioIntakeForm`** on `/contact` (branching intents; mirrors former Google Form fields). Leads → `/api/lead` → Resend (HTML email).

**Business minimum** (Starter / worksheet) — **6 fields only:**

1. Business Name  
2. Phone  
3. Email for Leads  
4. City / Service Area  
5. 3–5 Core Services  
6. Preferred Color  

**Do not start building** until form is **submitted and payment received** (per §9-B).

### Website address & subdomain

- Customer-facing pattern: **`https://yourname.altrudigitech.com`** (`brand.subdomainExample` in `siteData.js`).
- Confirm proposed URL on intake acknowledgment (technical folder name = **name part** only, e.g. `joes-plumbing`).
- **One free website address name change pre-launch**; changes **after launch** = **$25** micro-task.

### Monthly tweaks (months 1–3 included)

- Requests to **`updates@altrudigitech.com`** (forward to operator Gmail via Cloudflare Email Routing).
- **Due by the 25th** of each month; **no rollover** of unused tweaks.

### Capacity

- Pricing section copy: *"Currently accepting **3** new Starter builds this week."* — update manually; honest cap, not fake scarcity.

### Deferred

- **Care plan** upsell ($19–29/mo) — **not marketed until after 5 completed Starter clients.**