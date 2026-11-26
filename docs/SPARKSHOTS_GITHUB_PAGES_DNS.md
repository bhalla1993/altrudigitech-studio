# SparkShots — GitHub Pages + GoDaddy DNS (family site)

**Status:** Separate from AltruDigiTech **$99 Starter** default (studio subdomain + Worker).  
**Property:** [https://www.sparkshots.ca](https://www.sparkshots.ca) — photo booth family business.  
**Code repo:** `https://github.com/shivaprojects93/sparkshots` (account **shivaprojects93**).  
**Hosting:** **GitHub Pages** on that repo; **custom domain** in GitHub Pages settings.

**Studio reference:** Listed on [Live Projects](https://altrudigitech.com/live-projects); footer credits **AltruDigiTech** per client practice ([STUDIO_PLAN.md](./STUDIO_PLAN.md)).

---

## Who needs which login

| System | Account | Used for |
|--------|---------|----------|
| **GitHub** | `shivaprojects93` | Push site HTML, **Settings → Pages**, custom domains, Enforce HTTPS |
| **GoDaddy** | Family member (domain owner) | DNS for `sparkshots.ca` / `www.sparkshots.ca` |
| **Local clone** | `~/…/sparkshots` | Edits; `origin` → `shivaprojects93/sparkshots` |

**Settings** on GitHub only appear when logged in as a user with **Admin** on `shivaprojects93/sparkshots`. If you use `bhalla1993` and don’t see **Settings**, you need **Admin** invite or sign in as `shivaprojects93`.

---

## Canonical URL (what to share)

| URL | Use |
|-----|-----|
| **https://www.sparkshots.ca** | **Primary** — bookmark, Instagram, Google Business |
| `https://sparkshots.ca` (no www) | Should **redirect** to `www` or serve same site — not GoDaddy “launching soon” |
| `http://…` | Should redirect to **https** |

Do **not** rely on apex until GoDaddy DNS is cleaned up (see below).

---

## Known issue — intermittent “GoDaddy launching soon”

**Symptom:** In a new browser session, `http://sparkshots.ca` or `https://sparkshots.ca` sometimes shows GoDaddy parking or fails, while **https://www.sparkshots.ca** works.

**Cause (typical):** Apex **`sparkshots.ca`** has **multiple A records** — mix of **GoDaddy parking** IPs and **GitHub Pages** IPs. Resolvers pick different answers; behavior looks random.

**`www` is usually correct:** CNAME → `shivaprojects93.github.io`.

**Fix (on a call with family + GoDaddy login):**

1. GoDaddy → **Domain** → **DNS** for `sparkshots.ca`.
2. **Remove** parking, “Website Builder,” forwarding, or extra **A** records on **`@`** that point to GoDaddy (e.g. `76.223.x.x`, `13.248.x.x`) — **keep only one strategy for apex** (see step 3 or 4).
3. **Option A — GitHub apex (four A records):**  
   On **`@`**, set **only** GitHub Pages apex IPs (confirm in repo **Settings → Pages** for the domain; commonly):
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. **Option B — Forward apex to www (simpler for non-technical owners):**  
   GoDaddy **Domain Forwarding**: `sparkshots.ca` → `https://www.sparkshots.ca` (301).  
   **Do not** also leave conflicting GitHub A records on `@` if forwarding handles apex (use one method).
5. **`www` record:** Type **CNAME**, name **www**, value **`shivaprojects93.github.io.`**
6. GitHub → **shivaprojects93/sparkshots** → **Settings → Pages** → Custom domain: both **`www.sparkshots.ca`** and **`sparkshots.ca`** if using Option A; enable **Enforce HTTPS** when offered.
7. Wait for DNS (minutes–48h). Test in **private window**:
   - `http://sparkshots.ca` → `https://www.sparkshots.ca`
   - No “launching soon”

---

## Call script (family member on GoDaddy)

1. “We’re not changing who owns the domain — only DNS so everyone always sees the photo booth site.”
2. Open **DNS**; show current **A** records on `@` and **CNAME** on `www`.
3. Remove **parking / duplicate A** on `@`.
4. Set **www** CNAME → `shivaprojects93.github.io` if missing.
5. Choose **Option A** (GitHub A) or **Option B** (forward to www) — not both fighting each other.
6. Open **https://www.sparkshots.ca** on phone (cellular, not Wi‑Fi) to verify.

For **future paying clients**, use [CLIENT_DOMAIN_HANDOFF.md](./CLIENT_DOMAIN_HANDOFF.md) (Cloudflare / studio subdomain), not this GitHub Pages path.

---

## Deploy site changes (footer, copy)

1. Edit `index.html` (and linked pages) locally in `sparkshots` repo.
2. Commit + push to **`main`** on `shivaprojects93/sparkshots`.
3. GitHub Pages rebuilds (1–3 min).
4. Hard refresh **https://www.sparkshots.ca** — GoDaddy DNS unchanged unless domain names changed.

---

## Quick verify (terminal)

```bash
dig +short www.sparkshots.ca CNAME
dig +short sparkshots.ca A
curl -sI https://www.sparkshots.ca/ | head -5
```

Expected: `www` CNAME → `shivaprojects93.github.io`; apex A should **not** list both GoDaddy and GitHub unless you intend GitHub-only; live site `server: GitHub.com`.

Studio repo: `npm run verify:subdomains` does **not** cover sparkshots.ca (separate project).

---

## Related

| Doc | Topic |
|-----|--------|
| [CLIENT_DOMAIN_HANDOFF.md](./CLIENT_DOMAIN_HANDOFF.md) | Paid clients — $49 domain on Cloudflare |
| [NEXT_STEPS.md](./NEXT_STEPS.md) | Onboard `*.altrudigitech.com` Starters |