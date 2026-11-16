# Git remotes — two-repo layout

| Remote | Repository | Purpose |
|--------|------------|---------|
| **`origin`** | [bhalla1993/altrudigitech-studio](https://github.com/bhalla1993/altrudigitech-studio) | **Canonical** source. Cloudflare Pages Git integration (when live). Day-to-day `git push`. |
| **`legacy`** | [bhalla1993/altruism](https://github.com/bhalla1993/altruism) | Legacy **GitHub Pages** staging until `altrudigitech.com` is on Cloudflare. Not retired yet. |

## Daily workflow

```bash
git pull origin main
# … work …
git push origin main
```

## Refresh legacy GitHub Pages (optional)

When you still host a preview on `bhalla1993.github.io/altruism/`:

```bash
npm run build
npm run deploy    # gh-pages branch on legacy remote — configure gh-pages to push to legacy if needed
```

Or mirror source to `legacy` after a release:

```bash
git push legacy main
```

For project-site URLs, you may need `base: '/altruism/'` on a legacy-only deploy branch; production uses `base: '/'` on Cloudflare (see `docs/STUDIO_PLAN.md`).

## Deploy (Wrangler)

```bash
npm run deploy:cf
```

Details: **[DEPLOY.md](./DEPLOY.md)**.

## After Cloudflare cutover

1. Connect **Cloudflare Pages** to **`altrudigitech-studio`** (`main`, build `npm ci && npm run build`, output `dist`).
2. Disable GitHub Pages deploy on **`altruism`** to avoid duplicate SEO (plan §9-E).