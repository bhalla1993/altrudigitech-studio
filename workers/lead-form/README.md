# altrudigitech-studio-worker

Phase 2–3 Worker: `*.altrudigitech.com` routing and `POST /api/lead` (HTML + text email via Resend).

**Production:** `npm run deploy:worker` from repo root. Studio intake posts from `altrudigitech.com` with optional `email_sections` payload.

## Local dev

From repository root (loads root `.dev.vars`):

```bash
npm run dev:worker
```

Required in `.dev.vars` for Resend test:

```env
ALLOW_DEV_ROUTES=true
RESEND_API_KEY=re_...
RESEND_TEST_TO=you@example.com
TURNSTILE_SECRET_KEY=0x...
```

Optional override:

```env
RESEND_FROM=AltruDigiTech <hello@altrudigitech.com>
```

## Slice A checks

```bash
curl -s http://localhost:8787/health
curl -s -X POST http://localhost:8787/api/_test/resend -H "Content-Type: application/json" -d '{}'
```

Or without Worker:

```bash
npm run test:resend
```

## Deploy (later)

```bash
wrangler deploy --config workers/lead-form/wrangler.toml
```

Production secrets: `wrangler secret put RESEND_API_KEY` (etc.). Do not set `ALLOW_DEV_ROUTES` in production.