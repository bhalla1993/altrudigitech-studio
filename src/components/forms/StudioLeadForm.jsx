import { useEffect, useRef, useState } from 'react'
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { business } from '../../utils/siteData'

import { TURNSTILE_SITE_KEY as COMMITTED_TURNSTILE_SITE_KEY } from '../../../config/turnstile-site-key.mjs'

const LEAD_API = 'https://altrudigitech.com/api/lead'
const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || COMMITTED_TURNSTILE_SITE_KEY || ''

function loadTurnstileScript() {
  if (document.querySelector('script[data-turnstile-studio]')) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    s.async = true
    s.defer = true
    s.dataset.turnstileStudio = 'true'
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Turnstile script failed to load'))
    document.head.appendChild(s)
  })
}

export default function StudioLeadForm() {
  const widgetRef = useRef(null)
  const widgetIdRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!siteKey || !widgetRef.current) return
    let cancelled = false

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile || !widgetRef.current) return
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          theme: 'auto',
        })
      })
      .catch(() => {
        setStatus({
          type: 'warning',
          text: 'Verification widget could not load. Use the intake form below or email us directly.',
        })
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: '', text: '' })

    if (!siteKey) {
      setStatus({ type: 'warning', text: 'Quick message is unavailable in this build. Use the intake form or email us.' })
      return
    }

    const token =
      window.turnstile && widgetIdRef.current != null
        ? window.turnstile.getResponse(widgetIdRef.current)
        : ''

    if (!token) {
      setStatus({ type: 'error', text: 'Please complete the verification check.' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(LEAD_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          turnstileToken: token,
          client_id: 'studio',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)

      setName('')
      setEmail('')
      setMessage('')
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.reset(widgetIdRef.current)
      }
      setStatus({ type: 'success', text: 'Thanks — we received your message and will reply within one business day.' })
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Something went wrong. Please try again or use the intake form.' })
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.reset(widgetIdRef.current)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={1.5}>
        <Typography variant="h5">Quick message</Typography>
        <Typography variant="body2" color="text.secondary">
          Short question only — for Starter projects and pricing, use the intake form below. Your message goes to{' '}
          {business.email}.
        </Typography>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" size="small" />
        <TextField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          size="small"
        />
        <TextField
          label="Message"
          required
          multiline
          minRows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          size="small"
        />
        <Typography variant="caption" color="text.secondary" display="block">
          Your inquiry is securely transmitted directly to {business.name} via AltruDigiTech.
        </Typography>
        {siteKey ? <Box ref={widgetRef} sx={{ minHeight: 65 }} /> : null}
        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send message'}
        </Button>
        {status.text ? (
          <Alert severity={status.type === 'success' ? 'success' : status.type === 'warning' ? 'warning' : 'error'}>
            {status.text}
          </Alert>
        ) : null}
      </Stack>
    </Box>
  )
}