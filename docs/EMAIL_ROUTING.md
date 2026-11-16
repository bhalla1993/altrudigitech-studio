# Cloudflare Email Routing — `hello@` & `updates@`

**Studio public mail:** `hello@altrudigitech.com` (see `brand.helloEmail` in `src/utils/siteData.js`)  
**Client tweaks (Phase 4+):** `updates@altrudigitech.com` → same or separate Gmail rule

Resend **sends** mail; Email Routing **receives** mail at your domain and forwards to Gmail. They are independent.

---

## Prerequisites

- Cloudflare DNS zone **`altrudigitech.com`** on this account
- Gmail inbox to receive (e.g. `altrudigitech.studio@gmail.com`)

---

## 1. Enable Email Routing

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **altrudigitech.com** → **Email** → **Email Routing**
2. **Get started** / **Enable Email Routing**
3. Cloudflare adds required **MX** (and may add SPF) records — approve if prompted
4. Wait until status is **Active**

The DNS banner “no MX records” should clear after MX is added.

---

## 2. Add destination address

1. Email Routing → **Destination addresses** → **Add destination address**
2. Enter your Gmail → **Send verification** → click link in Gmail
3. Status: **Verified**

---

## 3. Routing rules

| Custom address | Action | Notes |
|----------------|--------|--------|
| `hello@altrudigitech.com` | Send to → verified Gmail | Public `mailto` on site |
| `updates@` (later) | Send to → same Gmail (or filter) | Monthly tweak requests (§12) |

**Routing rules** → **Create address** → custom address `hello` → destination Gmail → **Save**

Optional: catch-all **disabled** (only create addresses you need).

---

## 4. Site code (done in repo)

`business.email` uses `hello@altrudigitech.com` for display and `mailto:` links.

**Fallback:** If Routing is not live yet, temporarily set `business.email` back to `brand.publicContactEmail` in `siteData.js`.

---

## 5. Resend vs `hello@`

| | Resend | Email Routing |
|--|--------|----------------|
| **Direction** | Outbound (forms → client/studio) | Inbound (someone emails `hello@`) |
| **Setup** | Domain verify (SPF/DKIM in DNS) | MX + routing rules |
| **Conflict** | Rare if both use Cloudflare DNS as documented |

Sending **from** `hello@altrudigitech.com` via Resend is fine once the domain is verified in Resend.

---

## 6. Verify

**Production:** verified **2026-11-16** — MX on zone (`route*.mx.cloudflare.net`), `hello@` rule → Gmail, inbound test from external address.

1. From an external account, email **hello@altrudigitech.com**
2. Message arrives in Gmail within a few minutes
3. On site, `mailto:hello@altrudigitech.com` opens compose to that address

---

## 7. `updates@` (when first paid client)

Repeat step 3 with custom address **`updates`**; document in client onboarding that tweaks go to `updates@altrudigitech.com`.