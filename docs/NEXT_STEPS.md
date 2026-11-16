# Next steps — after Phase 2–3 (infra complete)

**You are here:** Marketing site live, Worker routing, `/api/lead`, internal-demo form, Contact quick message + **Google Form intake**.

---

## Now (business — no code required)

| Priority | Action |
|----------|--------|
| 1 | Finish [CUTOVER_CHECKLIST.md](./CUTOVER_CHECKLIST.md) (GHP off, social URLs, email) |
| 2 | **Promote:** local trades, students, GTA/Ontario — link `/pricing`, `/contact#intake` |
| 3 | **Capacity:** honest cap on Pricing if you use it (“3 builds this week”) |
| 4 | **Intake + payment** before custom build ([STUDIO_PLAN.md](./STUDIO_PLAN.md) §9-B, §12) |

**Intake:** Google Form on Contact (embedded). **Quick questions:** Contact mini-form → `/api/lead`.

---

## Phase 4 — first paid $99 Starter client

Follow this order when payment + intake worksheet are complete.

### Before build

- [ ] Intake has **6 fields** + trade/license checkbox (§11)
- [ ] Payment received
- [ ] Confirm slug URL: `https://{slug}.altrudigitech.com` (one free rename pre-launch)
- [ ] Pick template from `/templates`; gather copy/photos

### Repo & deploy

1. **`clients/{slug}/`** — copy/adapt from template + client content
2. **`config/hosts.json`** — add FQDN entry:
   ```json
   "{slug}.altrudigitech.com": {
     "slug": "{slug}",
     "client_id": "{slug}",
     "lead_email": "client@example.com"
   }
   ```
3. **`scripts/sync-lead-config.mjs`** — add `{ slug, clientId }` to `CLIENTS` if using shared lead form
4. **Turnstile** — add `{slug}.altrudigitech.com` to widget hostnames (dashboard)
5. **Deploy**
   - `npm run deploy:worker` (hosts.json + API)
   - Push `main` (Pages Git) or `npm run deploy:cf`
6. **Privacy line** on client form (§11): *"Your inquiry is securely transmitted directly to [Business Name] via AltruDigiTech."*

### Handoff to client

- [ ] Live URL: `https://{slug}.altrudigitech.com`
- [ ] Lead form test → client `lead_email`
- [ ] Acknowledgment email with tweak rules (months 1–3, `updates@` when configured)

Details: [STUDIO_PLAN.md](./STUDIO_PLAN.md) Phase 4 exit, §12.

---

## Phase 5 — $49 custom domain (when sold)

- Client buys/registers `.ca` (or other TLD)
- New zone in your Cloudflare; client NS delegation
- Worker on client zone; Turnstile hostnames added
- Same `hosts.json` pattern with client’s FQDN (locked plan §5)

Defer until first custom-domain sale.

---

## Optional engineering (not blocking sales)

| Item | Notes |
|------|--------|
| `updates@` Email Routing | When first client on monthly tweaks |
| Replace shiva-bhalla Google Form iframe with `altru-lead` | Consistency with API |
| Retire `npm run deploy:cf` habit | Once Git deploys trusted |
| Connect analytics | CF Web Analytics or Plausible |
| Phase 2 apex Worker passthrough | Only if ever needed (Slice F — avoid unless required) |
| Care plan upsell | After **5** completed Starters (plan §12) |

---

## Reference — deploy when you change…

| Change | Action |
|--------|--------|
| Studio React / `clients/*` / `public/` | `git push origin main` |
| `config/hosts.json`, Worker code | `npm run deploy:worker` |
| Resend/Turnstile/studio inbox secrets | Update `.dev.vars` → `deploy:worker` |
| Turnstile site key only | Pages env vars + rebuild |

---

## Docs to re-read for pricing/legal

- [STUDIO_PLAN.md](./STUDIO_PLAN.md) — §2 pricing, §11 legal, §12 ops, §4 handover ($129)
- [BRAND.md](./BRAND.md) — public names and emails

---

## Agent prompt for Phase 4 implementation

```text
Phase 4 onboard: new client slug "{slug}".
Add clients/{slug}/, hosts.json FQDN, sync-lead-config, deploy worker + pages.
Lead email: ...
Template base: ...
```

Always start from [START_HERE.md](./START_HERE.md).