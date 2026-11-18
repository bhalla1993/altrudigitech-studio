#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -f .dev.vars ]]; then
  set -a
  # shellcheck source=/dev/null
  source .dev.vars
  set +a
fi

# Optional: .dev.vars can override committed config/turnstile-site-key.mjs for Vite
if [[ -n "${TURNSTILE_SITE_KEY:-}" ]]; then
  export VITE_TURNSTILE_SITE_KEY="${TURNSTILE_SITE_KEY}"
fi

npm run build
wrangler pages deploy dist --project-name=altrudigitech-studio --commit-dirty=true