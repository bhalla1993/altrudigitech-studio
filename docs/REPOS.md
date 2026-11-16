# Git remotes — canonical repo

| Remote | Repository | Purpose |
|--------|------------|---------|
| **`origin`** | [bhalla1993/altrudigitech-studio](https://github.com/bhalla1993/altrudigitech-studio) | **Canonical** source. Cloudflare Pages Git on `main`. All day-to-day work happens here. |

## Daily workflow

```bash
git pull origin main
# … work …
git push origin main
```

Production traffic: **[https://altrudigitech.com](https://altrudigitech.com)** (Cloudflare Pages + Worker). Push to `main` triggers Pages when Git is connected; see [PAGES_GIT.md](./PAGES_GIT.md).

## Legacy GitHub repo (`bhalla1993/altruism`)

**Retired for hosting** (GitHub Pages off; `https://bhalla1993.github.io/altruism/` returns 404). Do not use `npm run deploy` (gh-pages) for production.

Cleanup **done** (2026-11-16): **`altruism`** GitHub README points to **altrudigitech.com**; local **`altruism`** clone and **`legacy`** remote removed. See [CUTOVER_CHECKLIST.md](./CUTOVER_CHECKLIST.md) §1.3–1.5.

The **`legacy`** remote and gh-pages flow are no longer part of the studio workflow.

## Deploy (Wrangler)

```bash
npm run deploy:worker   # hosts.json, /api/lead, routes
npm run deploy:cf         # optional manual Pages upload — prefer git push
```

Details: **[DEPLOY.md](./DEPLOY.md)**.