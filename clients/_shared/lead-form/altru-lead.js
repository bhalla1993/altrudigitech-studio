/**
 * Static client site lead form → POST https://altrudigitech.com/api/lead
 * Requires window.__ALTRU_LEAD_CONFIG__ from lead-config.js (generated at build).
 */
(function () {
  function initForm(form) {
    const cfg = window.__ALTRU_LEAD_CONFIG__
    if (!cfg?.turnstileSiteKey || !cfg?.clientId) {
      console.error('AltruDigiTech lead: missing lead-config.js — run npm run build with TURNSTILE_SITE_KEY in .dev.vars')
      return
    }

    const statusEl = form.querySelector('[data-altru-lead-status]')
    const submitBtn = form.querySelector('[type="submit"]')
    const widgetEl = form.querySelector('[data-turnstile]')

    let widgetId = null

    function setStatus(text, isError) {
      if (!statusEl) return
      statusEl.textContent = text
      statusEl.hidden = !text
      statusEl.style.color = isError ? '#b91c1c' : '#15803d'
    }

    function renderTurnstile() {
      if (!window.turnstile || !widgetEl) return
      widgetId = window.turnstile.render(widgetEl, {
        sitekey: cfg.turnstileSiteKey,
        theme: form.dataset.turnstileTheme || 'auto',
      })
    }

    if (window.turnstile) {
      renderTurnstile()
    } else {
      document.addEventListener('turnstile-loaded', renderTurnstile)
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      setStatus('', false)

      const token =
        window.turnstile && widgetId != null
          ? window.turnstile.getResponse(widgetId)
          : ''

      if (!token) {
        setStatus('Please complete the verification check.', true)
        return
      }

      const fd = new FormData(form)
      const payload = {
        name: String(fd.get('name') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        message: String(fd.get('message') || '').trim(),
        turnstileToken: token,
        client_id: cfg.clientId,
      }

      if (submitBtn) submitBtn.disabled = true

      try {
        const res = await fetch(cfg.apiUrl || 'https://altrudigitech.com/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(data.error || `Request failed (${res.status})`)
        }
        form.reset()
        if (window.turnstile && widgetId != null) {
          window.turnstile.reset(widgetId)
        }
        setStatus('Thanks — your message was sent.', false)
      } catch (err) {
        setStatus(err.message || 'Something went wrong. Please try again.', true)
        if (window.turnstile && widgetId != null) {
          window.turnstile.reset(widgetId)
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false
      }
    })
  }

  document.querySelectorAll('form[data-altru-lead]').forEach(initForm)
})()