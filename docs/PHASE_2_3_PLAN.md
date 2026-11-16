# Phase 2 & 3 implementation plan (locked)

**Status:** Slice B in progress · **Approved:** 2026-03-16  
**References:** [STUDIO_PLAN.md](./STUDIO_PLAN.md), [DEPLOY.md](./DEPLOY.md), `config/hosts.json`

---

## §0 — Goals

| Phase | Outcome |
|-------|---------|
| **2** | `https://{slug}.altrudigitech.com` → `dist/sites/{slug}/`; unknown subdomains **404** |
| **3** | `POST https://altrudigitech.com/api/lead` → Turnstile + Resend → `lead_email` |

Google Form intake stays through Phase 3.

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
| **D2** | Google Form stays active for intake through Phase 3 |
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

- [ ] `https://shiva-bhalla.altrudigitech.com/` → 200 (not 308 to `/sites/...`)
- [ ] Deep assets under `/assets/vendor/...` → 200
- [ ] `npm run verify:subdomains` passes

---

## Email (not blocking Phase 2–3)

| Channel | Role |
|---------|------|
| Google Form | Intake (through Phase 3) |
| Resend | Outbound leads via Worker |
| CF Email Routing | Inbound `hello@` / `updates@` → Gmail |

---

## Cost

Infrastructure target **~$0 solo** per `STUDIO_PLAN.md` §3 (Pages + Workers Free, Resend/Turnstile free tiers).

---

## Sign-off

Approved for Slice A implementation. Do not production-deploy Worker or change DNS until Slice B.