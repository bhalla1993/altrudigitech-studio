# Client custom domain — handoff & DNS

**Studio product:** $99 Starter on `https://{slug}.altrudigitech.com` (no registrar needed).  
**Add-on:** **$49 CAD** custom domain setup — client **buys/owns** the `.ca` / `.com`; annual registrar fees are paid **by the client** directly (~$15–25/yr typical). See [STUDIO_PLAN.md](./STUDIO_PLAN.md) and `starterPackage` / pricing on the site.

**Engineering (Phase 5):** Worker routing for client-owned zones is planned in [STUDIO_PLAN.md](./STUDIO_PLAN.md); use this doc for **sales, calls, and registrar steps** even before every automation is built.

---

## Who does what

| Party | Responsibility |
|-------|----------------|
| **Client** | Registers domain, pays registrar, owns the account, applies **nameserver** or **DNS** changes (or delegates access) |
| **AltruDigiTech** | Cloudflare zone setup, DNS records, SSL, connect site to `{slug}` / Pages origin, Turnstile hostname, smoke tests |

**Never** ask clients for registrar **passwords**. Use **delegate access** (GoDaddy, Namecheap, etc.) or a **scheduled screen-share call** where they stay logged in.

There is **no** universal “guest session” into GoDaddy/Namecheap for vendors — only delegate roles or the client clicking while you guide.

---

## Path 0 — Stay on studio subdomain (default)

- Live URL: **`https://{slug}.altrudigitech.com`**
- **No** client DNS work.
- Upgrade to custom domain later with the $49 add-on.

---

## Path A — Recommended: nameservers → Cloudflare ( $49 add-on )

Matches the locked model in [STUDIO_PLAN.md](./STUDIO_PLAN.md): client domain as a **zone in your Cloudflare account** (or a zone you manage for them); client only changes **nameservers** at the registrar **once**.

### Client checklist (send by email)

1. Purchase **`theirbusiness.ca`** (or `.com`) in their name at GoDaddy, Namecheap, Google Domains, etc.
2. In the registrar, open **DNS** or **Nameservers**.
3. Switch from default nameservers to **Custom** and enter the **two Cloudflare nameservers** AltruDigiTech provides (e.g. `ada.ns.cloudflare.com` and `bob.ns.cloudflare.com` — **use the pair shown in your Cloudflare zone**, not these examples).
4. Save. Propagation can take **15 minutes to 48 hours**.
5. Tell the studio when done; we finish SSL and go-live.

### Studio checklist (after client changes NS)

- [ ] Zone added in Cloudflare; site routed to correct `clients/{slug}/` / Pages origin ([WORKER_ROUTES.md](./WORKER_ROUTES.md), [NEXT_STEPS.md](./NEXT_STEPS.md) Phase 4–5).
- [ ] **HTTPS** active on apex and `www` (pick one canonical host; redirect the other — studio apex policy for marketing site is `altrudigitech.com` without `www` on subdomains).
- [ ] **Turnstile** widget hostnames include the new domain ([INTAKE_AND_LEADS.md](./INTAKE_AND_LEADS.md)).
- [ ] Lead form test from live domain → client `lead_email`.
- [ ] Send client: live URL, “Reply-To works on form emails,” tweak rules (months 1–3).

---

## Path B — DNS records only (registrar stays on GoDaddy/Namecheap)

Use when the client **refuses** NS delegation or registrar is locked (some brokers).

Studio provides **exact** records; client (or delegate) adds them in the registrar DNS panel:

| Goal | Typical pattern (GitHub Pages–style hosts) | Studio stack (Cloudflare Pages) |
|------|--------------------------------------------|-----------------------------------|
| `www` | CNAME → `username.github.io` or Pages target | CNAME → Pages / Worker target you specify |
| Apex `@` | A → GitHub Pages IPs **or** forward `@` → `https://www…` | A/AAAA per Cloudflare docs **or** CNAME flattening at CF |

**Warning:** Apex at GoDaddy **plus** “parking” or **forwarding** **plus** real A records causes **random** “wrong site” behavior — same class of bug as [SPARKSHOTS_GITHUB_PAGES_DNS.md](./SPARKSHOTS_GITHUB_PAGES_DNS.md). Client must remove parking/extra A on `@`.

---

## 15-minute “DNS handoff” call script

Use for clients (or family) who own the registrar account.

1. **Confirm** domain and registrar login works; client shares screen (optional).
2. **Explain:** “You keep ownership; we only need DNS or nameservers pointed once.”
3. **Path A:** Nameservers → paste Cloudflare pair → save → note propagation time.
4. **Path B:** Delete parking / old forwards on `@` → add only records you send in writing.
5. **Verify together:** open site in **private window** on phone; test `http` and `https`, with and without `www`.
6. **Follow-up email** with final canonical URL and support contact (`hello@altrudigitech.com`).

---

## Client-facing FAQ (short)

| Question | Answer |
|----------|--------|
| Do I have to buy a domain for $99? | No. `{slug}.altrudigitech.com` is included. |
| Who pays the registrar yearly bill? | You do, directly to GoDaddy/Namecheap/etc. |
| Can you log into my GoDaddy? | We use **delegate access** or a call — not your password. |
| How long until `.ca` works? | Often 1–4 hours; allow up to 48h after NS change. |

---

## Delegated access (optional)

| Registrar | Feature |
|-----------|---------|
| **GoDaddy** | Account Settings → **Delegate Access** → invite studio email with limited role |
| **Namecheap** | Sharing / team features (varies by plan) |
| **Cloudflare** | Add member to zone (if client moves DNS to their own CF account — less common for $49 model) |

Document the **client’s billing email** and **who is admin** in your CRM/intake notes.

---

## Related docs

| Doc | Topic |
|-----|--------|
| [NEXT_STEPS.md](./NEXT_STEPS.md) | Phase 4 onboard `{slug}.altrudigitech.com` |
| [STUDIO_PLAN.md](./STUDIO_PLAN.md) | Phase 5 custom domain, pricing |
| [WORKER_ROUTES.md](./WORKER_ROUTES.md) | Wildcard `*.altrudigitech.com` vs client zone |
| [SPARKSHOTS_GITHUB_PAGES_DNS.md](./SPARKSHOTS_GITHUB_PAGES_DNS.md) | Family site — **not** the default Starter stack |