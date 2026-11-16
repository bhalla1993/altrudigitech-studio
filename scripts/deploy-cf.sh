#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -f .dev.vars ]]; then
  set -a
  # shellcheck source=/dev/null
  source .dev.vars
  set +a
fi

npm run build
wrangler pages deploy dist --project-name=altrudigitech-studio --commit-dirty=true