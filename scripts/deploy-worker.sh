#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -f .dev.vars ]]; then
  set -a
  # shellcheck source=/dev/null
  source .dev.vars
  set +a
fi

CONFIG=workers/lead-form/wrangler.toml

put_secret() {
  local name="$1"
  local value="$2"
  if [[ -z "${value}" ]]; then
  return 0
  fi
  printf '%s' "${value}" | wrangler secret put "${name}" --config "${CONFIG}" 2>/dev/null || true
}

put_secret RESEND_API_KEY "${RESEND_API_KEY:-}"
put_secret TURNSTILE_SECRET_KEY "${TURNSTILE_SECRET_KEY:-}"
put_secret STUDIO_LEAD_EMAIL "${STUDIO_LEAD_EMAIL:-}"

wrangler deploy --config "${CONFIG}"