# Phase 2 & 3 implementation plan (locked)

**Status:** **Complete** (Slices A–E live). **Approved:** 2026-03-16 · **Verified:** 2026-11-17  
**References:** [START_HERE.md](./START_HERE.md), [INTAKE_AND_LEADS.md](./INTAKE_AND_LEADS.md), [DEPLOY.md](./DEPLOY.md)

**Historical note:** This plan referenced **Google Form** intake on Contact through Phase 3. Production now uses **`StudioIntakeForm`** + Turnstile + HTML emails. Locked routing/API decisions below still apply.

---

## §0 — Goals

| Phase | Outcome |
|-------|---------|
| **2** | `https://{slug}.altrudigitech.com` → `dist/sites/{slug}/`; unknown subdomains **404** |
| **3** | `POST https://altrudigitech.com/api/lead` → Turnstile + Resend → `lead_email` |

Intake on marketing site: **`StudioIntakeForm`** ([INTAKE_AND_LEADS.md](./INTAKE_AND_LEADS.md)).

---

## §3 — Architecture (locked)

- One **Worker** (`altrudigitech-studio-worker`): routing + `/api/lead`.
- One **Pages** deploy: studio at `/` + clients at `/sites/{slug}/`.
- **Rollout:** Wildcard-only Worker on `*.altrudigitech.com` first; `altrudigitech.com/api/*` later; **apex Pages traffic untouched** until passthrough is tested.
- Worker route order per `STUDIO_PLAN.md` §3 (full apex passthrough is optional later).

---

## §5 — `hosts.json` (locked)

- Keys are **FQDN** (e.g. `internal-demo.altrudigitech.com`) so Phase 5 custom domains use the same lookup.
- Fields: `slug`, `client_id`, `lead_email`.

---

## Decisions D1–D5 (locked)

| ID | Decision |
|----|----------|
| **D1** | `PAGES_ORIGIN` = `https://altrudigitech.com` |
| **D2** | ~~Google Form~~ → **StudioIntakeForm** on `/contact` (2026) |
| **D3** | `hello@` Email Routing after **Slice C**, before heavy promotion; `updates@` in Phase 4 |
| **D4** | Verify `altrudigitech.com` in Resend in **Slice A** (test to external inboxes in Slice E) |
| **D5** | Commit + push pending repo work before Worker production routes |

---

## Implementation slices

| Slice | Goal | Prod DNS? |
|-------|------|-----------|
| **A** | Accounts, secrets, `workers/lead-form/` scaffold, Resend test (local) | No |
| **B** | Phase 2a: `internal-demo` subdomain routing | Wildcard → Worker |
| **C** | Phase 2b: `shiva-bhalla` + asset paths | — |
| **D** | Phase 3a: `/api/lead` on apex, studio CORS | `altrudigitech.com/api/*` |
| **E** | Phase 3b: client forms + CORS from `hosts.json` | — |

### Slice A exit

- [x] Resend domain verified
- [x] Turnstile widget (apex + subdomains on widget)
- [x] `wrangler dev` + `/health` + Resend test
- [x] Repo pushed to `origin/main`

### Slice B exit

- [x] Worker deployed with `*.altrudigitech.com/*` route
- [x] Wildcard DNS: CNAME `*` → `@` (proxied)
- [x] `https://internal-demo.altrudigitech.com/` → 200 (after worker fix)
- [x] Unknown subdomain → 404; apex Pages unchanged

### Slice C exit

- [x] `https://shiva-bhalla.altrudigitech.com/` → 200 (not 308 to `/sites/...`)
- [x] Deep assets under `/assets/vendor/...` → 200
- [x] `npm run verify:subdomains` (curl-based)

### Slice D exit

- [x] Route `altrudigitech.com/api/*` deployed
- [x] Secrets: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `STUDIO_LEAD_EMAIL`
- [x] OPTIONS + POST `/api/lead` from apex origin with valid Turnstile → email
- [x] Studio intake on Contact (`StudioIntakeForm`)

### Slice E exit

- [x] CORS: client FQDNs from `hosts.json`
- [x] `internal-demo` static form + Turnstile → `/api/lead`
- [x] Test submit from `https://internal-demo.altrudigitech.com/` → `lead_email`
- [ ] `shiva-bhalla`: form optional (portfolio still uses Google Form iframe)

---

## Email (not blocking Phase 2–3)

| Channel | Role |
|---------|------|
| Studio intake form | `POST /api/lead` from `/contact` |
| Resend | Outbound leads via Worker |
| CF Email Routing | Inbound `hello@` / `updates@` → Gmail |

---

## Cost

Infrastructure target **~$0 solo** per `STUDIO_PLAN.md` §3 (Pages + Workers Free, Resend/Turnstile free tiers).

---

## Sign-off

Approved for Slice A implementation. Do not production-deploy Worker or change DNS until Slice B.