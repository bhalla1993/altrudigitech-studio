# Worker routes & DNS (Slice B+)

**Worker:** `altrudigitech-studio-worker`  
**Scope:** `*.altrudigitech.com` only — **not** `altrudigitech.com` (apex stays on **Pages**).

## 1. Deploy the Worker

From repo root (loads `.dev.vars`):

```bash
npm run deploy:worker
```

Or:

```bash
wrangler deploy --config workers/lead-form/wrangler.toml
```

Production secrets (when needed, not Slice B):

```bash
wrangler secret put RESEND_API_KEY --config workers/lead-form/wrangler.toml
wrangler secret put TURNSTILE_SECRET_KEY --config workers/lead-form/wrangler.toml
```

Do **not** set `ALLOW_DEV_ROUTES` in production.

`wrangler.toml` already defines:

```toml
[[routes]]
pattern = "*.altrudigitech.com/*"
zone_name = "altrudigitech.com"
```

If deploy errors on routes, add the route manually (step 3).

## 2. Wildcard DNS (required for `*.` Worker route)

Cloudflare dashboard → **altrudigitech.com** → **DNS** → **Records** → **Add record**:

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| **CNAME** | `*` | `@` or `altrudigitech.com` | **Proxied** (orange) |

This sends **all subdomains** through Cloudflare so the Worker route can run. Apex and `www` stay on their existing records (`altrudigitech.com` / `www` → Pages). Unknown subdomains hit the Worker → **404** if not in `config/hosts.json`.

**Confirmed layout:** apex + `www` CNAMEs to Pages, wildcard `*` CNAME to `@` (proxied) — correct for Slice B+.

**Alternative (minimal, one slug only):** skip `*` and add only:

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| **CNAME** | `internal-demo` | `@` | Proxied |

Then use Worker route `internal-demo.altrudigitech.com/*` instead of `*.` (edit `wrangler.toml` if you choose this path).

## 3. Confirm Worker route (dashboard)

**Workers & Pages** → **altrudigitech-studio-worker** → **Settings** → **Triggers** → **Routes**

You should see:

- `*.altrudigitech.com/*` → `altrudigitech-studio-worker`

## 4. Host map

`config/hosts.json` uses **FQDN** keys. Slice B exit:

- `internal-demo.altrudigitech.com` → fetches `https://altrudigitech.com/sites/internal-demo/...`

Add clients by redeploying the Worker after updating `hosts.json`.

## 5. Verify (after DNS propagates)

| URL | Expected |
|-----|----------|
| `https://internal-demo.altrudigitech.com/` | 200 sandbox page |
| `https://not-a-client.altrudigitech.com/` | 404 |
| `https://altrudigitech.com/` | 200 studio (Pages) |
| `https://altrudigitech.com/sites/internal-demo/` | 200 (apex path still works) |
| `https://www.altrudigitech.com/` | 301 to apex (Worker if `www` hits wildcard; or your existing redirect rule) |

## 6. Slice D — `/api/lead` (live)

**Route:** `altrudigitech.com/api/*` (apex HTML still on Pages).

**Secrets** (in `.dev.vars` locally; `deploy:worker` syncs when set):

- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `STUDIO_LEAD_EMAIL` — inbox for `client_id: "studio"`

**CORS (Slice D):** `https://altrudigitech.com` + local Vite (`http://localhost:5173`). Client subdomains in Slice E.

**POST** `https://altrudigitech.com/api/lead` body (JSON):

```json
{
  "name": "Test",
  "email": "you@example.com",
  "message": "Hello",
  "turnstileToken": "<token from Turnstile widget>",
  "client_id": "studio"
}
```

**Test CORS preflight:**

```bash
curl -sI -X OPTIONS "https://altrudigitech.com/api/lead" \
  -H "Origin: https://altrudigitech.com" \
  -H "Access-Control-Request-Method: POST"
```

Expect `204` and `access-control-allow-origin: https://altrudigitech.com`.

Google Form intake stays until you wire a Turnstile form on Contact (Slice D+ UI optional).