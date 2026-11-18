import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import { business, brand } from '../../utils/siteData'
import {
  buildStudioIntakeEmailSections,
  formatStudioIntakePlainText,
} from '../../utils/formatStudioIntakeMessage'
import {
  customBudgetOptions,
  customProjectTypes,
  customTimelineOptions,
  generalTopicOptions,
  intakeIntents,
  legalConfirmationLabel,
  starterColorOptions,
  starterPackageOptions,
  starterPaymentOptions,
  starterTemplateOptions,
  studentNeedOptions,
  studentTemplateOptions,
} from '../../utils/studioIntakeConfig'

const LEAD_API = 'https://altrudigitech.com/api/lead'
const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''

const emptyFields = () => ({
  contactName: '',
  contactEmail: '',
  phone: '',
  businessName: '',
  leadEmail: '',
  city: '',
  template: '',
  services: '',
  about: '',
  colorStyle: '',
  slug: '',
  legalConfirmed: false,
  paymentStatus: '',
  packages: [],
  notes: '',
  topic: '',
  message: '',
  school: '',
  studentNeed: '',
  projectType: '',
  goals: '',
  timeline: '',
  budget: '',
})

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

/** Shown before an intent is picked so the progress bar isn’t a single step. */
const INTAKE_STEPPER_PLACEHOLDER = ['Your details', 'Review & submit']

function stepLabelsForIntent(intentId) {
  if (intentId === 'starter') return ['Your business', 'Content & design', 'Confirm & payment']
  if (intentId === 'student') return ['About you', 'Project details']
  if (intentId === 'custom') return ['Contact', 'Project scope']
  if (intentId === 'general') return ['Your question']
  return INTAKE_STEPPER_PLACEHOLDER
}

function emailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function StudioIntakeForm({ id = 'intake' }) {
  const widgetRef = useRef(null)
  const widgetIdRef = useRef(null)
  const [intentId, setIntentId] = useState('')
  const [step, setStep] = useState(0)
  const [fields, setFields] = useState(emptyFields)
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)
  const [stepError, setStepError] = useState('')

  const intentMeta = intakeIntents.find((i) => i.id === intentId)
  const branchSteps = stepLabelsForIntent(intentId)
  const onIntentStep = step === 0
  const branchStepIndex = step - 1
  const onLastBranchStep = intentId && branchStepIndex === branchSteps.length - 1
  const totalSteps = 1 + branchSteps.length

  const stepperLabels = useMemo(() => ['Purpose', ...branchSteps], [branchSteps])
  const progressStepCount = stepperLabels.length

  function patchFields(partial) {
    setFields((prev) => ({ ...prev, ...partial }))
  }

  function togglePackage(pkg) {
    setFields((prev) => {
      const has = prev.packages.includes(pkg)
      return {
        ...prev,
        packages: has ? prev.packages.filter((p) => p !== pkg) : [...prev.packages, pkg],
      }
    })
  }

  function resetForm() {
    setIntentId('')
    setStep(0)
    setFields(emptyFields())
    setStepError('')
    setStatus({ type: '', text: '' })
  }

  useEffect(() => {
    if (!siteKey || !onLastBranchStep || !widgetRef.current) return
    let cancelled = false
    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile || !widgetRef.current) return
        if (widgetIdRef.current != null) {
          window.turnstile.reset(widgetIdRef.current)
          return
        }
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          theme: 'auto',
        })
      })
      .catch(() => {
        setStatus({
          type: 'warning',
          text: 'Verification could not load. Email us directly or try again later.',
        })
      })
    return () => {
      cancelled = true
    }
  }, [onLastBranchStep, intentId, step])

  function validateCurrentStep() {
    setStepError('')
    if (onIntentStep) {
      if (!intentId) {
        setStepError('Choose an option to continue.')
        return false
      }
      return true
    }

    if (intentId === 'starter') {
      if (branchStepIndex === 0) {
        if (!fields.businessName.trim() || !fields.contactName.trim()) {
          setStepError('Business name and your name are required.')
          return false
        }
        if (!emailValid(fields.leadEmail) || !emailValid(fields.contactEmail)) {
          setStepError('Valid lead email and your email are required.')
          return false
        }
        if (!fields.phone.trim()) {
          setStepError('Phone number is required.')
          return false
        }
      }
      if (branchStepIndex === 1) {
        if (!fields.city.trim() || !fields.template || !fields.services.trim() || !fields.colorStyle) {
          setStepError('City, template, services, and colour/style are required.')
          return false
        }
      }
      if (branchStepIndex === 2) {
        if (!fields.legalConfirmed) {
          setStepError('Confirm the legal statement to continue.')
          return false
        }
        if (!fields.paymentStatus) {
          setStepError('Choose a payment status option.')
          return false
        }
        if (!fields.packages.includes('Starter Site — $99 CAD (required)')) {
          setStepError('Select Starter Site — $99 CAD (required) under Packages.')
          return false
        }
      }
    }

    if (intentId === 'student') {
      if (branchStepIndex === 0) {
        if (!fields.contactName.trim() || !emailValid(fields.contactEmail)) {
          setStepError('Name and email are required.')
          return false
        }
      }
      if (branchStepIndex === 1) {
        if (!fields.studentNeed || !fields.template) {
          setStepError('Select need and template.')
          return false
        }
        if (!fields.message.trim()) {
          setStepError('Message is required.')
          return false
        }
      }
    }

    if (intentId === 'custom') {
      if (branchStepIndex === 0) {
        if (!fields.contactName.trim() || !fields.businessName.trim() || !emailValid(fields.contactEmail)) {
          setStepError('Name, business name, and email are required.')
          return false
        }
      }
      if (branchStepIndex === 1) {
        if (!fields.projectType || !fields.goals.trim() || !fields.timeline || !fields.budget) {
          setStepError('Project type, goals, timeline, and budget are required.')
          return false
        }
      }
    }

    if (intentId === 'general') {
      if (!fields.contactName.trim() || !emailValid(fields.contactEmail) || !fields.topic || !fields.message.trim()) {
        setStepError('Name, email, topic, and message are required.')
        return false
      }
    }

    return true
  }

  function handleNext() {
    if (!validateCurrentStep()) return
    if (onLastBranchStep) return
    setStep((s) => s + 1)
  }

  function handleBack() {
    setStepError('')
    if (step === 0) return
    setStep((s) => s - 1)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!onLastBranchStep) {
      handleNext()
      return
    }
    if (!validateCurrentStep()) return
    setStatus({ type: '', text: '' })

    if (!siteKey) {
      setStatus({ type: 'warning', text: 'Form is unavailable in this build. Email us at ' + business.email })
      return
    }

    const token =
      window.turnstile && widgetIdRef.current != null ? window.turnstile.getResponse(widgetIdRef.current) : ''
    if (!token) {
      setStepError('Complete the verification check before submitting.')
      return
    }

    const intentLabel = intentMeta?.label ?? intentId
    const message = formatStudioIntakePlainText({
      intentId,
      intentLabel,
      fields,
    })
    const email_sections = buildStudioIntakeEmailSections({
      intentId,
      intentLabel,
      fields,
    })

    setSubmitting(true)
    try {
      const res = await fetch(LEAD_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.contactName.trim(),
          email: fields.contactEmail.trim(),
          message,
          email_sections,
          intent: intentLabel,
          turnstileToken: token,
          client_id: 'studio',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)

      resetForm()
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.reset(widgetIdRef.current)
        widgetIdRef.current = null
      }
      setStatus({
        type: 'success',
        text: 'Thanks — we received your intake and will reply within one business day.',
      })
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Something went wrong. Please try again or email us.' })
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.reset(widgetIdRef.current)
      }
    } finally {
      setSubmitting(false)
    }
  }

  function renderIntentStep() {
    return (
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">What do you need today?</FormLabel>
        <RadioGroup value={intentId} onChange={(e) => setIntentId(e.target.value)}>
          {intakeIntents.map((opt) => (
            <FormControlLabel key={opt.id} value={opt.id} control={<Radio />} label={opt.label} />
          ))}
        </RadioGroup>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Starter builds begin after this form and payment. Prices in CAD. No HST while Small Supplier rules apply.
        </Typography>
      </FormControl>
    )
  }

  function renderBranchStep() {
    if (intentId === 'starter') {
      if (branchStepIndex === 0) {
        return (
          <Stack spacing={1.5}>
            <TextField
              label="Business or professional name (as on website)"
              required
              value={fields.businessName}
              onChange={(e) => patchFields({ businessName: e.target.value })}
              size="small"
            />
            <TextField
              label="Your name (authorized contact)"
              required
              value={fields.contactName}
              onChange={(e) => patchFields({ contactName: e.target.value })}
              size="small"
            />
            <TextField
              label="Email for leads on your website"
              type="email"
              required
              value={fields.leadEmail}
              onChange={(e) => patchFields({ leadEmail: e.target.value })}
              size="small"
            />
            <TextField
              label="Your email (project updates)"
              type="email"
              required
              value={fields.contactEmail}
              onChange={(e) => patchFields({ contactEmail: e.target.value })}
              size="small"
            />
            <TextField
              label="Phone number (on website)"
              required
              value={fields.phone}
              onChange={(e) => patchFields({ phone: e.target.value })}
              size="small"
            />
          </Stack>
        )
      }
      if (branchStepIndex === 1) {
        return (
          <Stack spacing={1.5}>
            <TextField
              label="City / primary service area"
              required
              value={fields.city}
              onChange={(e) => patchFields({ city: e.target.value })}
              size="small"
            />
            <FormControl size="small" required>
              <InputLabel>Template choice</InputLabel>
              <Select
                label="Template choice"
                value={fields.template}
                onChange={(e) => patchFields({ template: e.target.value })}
              >
                {starterTemplateOptions.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="3–5 core services (one per line)"
              required
              multiline
              minRows={3}
              value={fields.services}
              onChange={(e) => patchFields({ services: e.target.value })}
              size="small"
            />
            <TextField
              label="Short About (2–4 sentences)"
              multiline
              minRows={3}
              value={fields.about}
              onChange={(e) => patchFields({ about: e.target.value })}
              size="small"
            />
            <FormControl size="small" required>
              <InputLabel>Preferred colour / style</InputLabel>
              <Select
                label="Preferred colour / style"
                value={fields.colorStyle}
                onChange={(e) => patchFields({ colorStyle: e.target.value })}
              >
                {starterColorOptions.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Your website address name"
              placeholder="joes-plumbing"
              helperText={`Pick the name people will see in your link — for example joes-plumbing becomes joes-plumbing.${brand.domain}. Use letters, numbers, and hyphens only.`}
              value={fields.slug}
              onChange={(e) => patchFields({ slug: e.target.value })}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                      .{brand.domain}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        )
      }
      return (
        <Stack spacing={1.5}>
          <FormControl component="fieldset" required error={!fields.legalConfirmed}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fields.legalConfirmed}
                  onChange={(e) => patchFields({ legalConfirmed: e.target.checked })}
                />
              }
              label={legalConfirmationLabel}
            />
          </FormControl>
          <FormControl component="fieldset" required>
            <FormLabel>Payment status</FormLabel>
            <RadioGroup value={fields.paymentStatus} onChange={(e) => patchFields({ paymentStatus: e.target.value })}>
              {starterPaymentOptions.map((opt) => (
                <FormControlLabel key={opt} value={opt} control={<Radio size="small" />} label={opt} />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" required>
            <FormLabel>Packages</FormLabel>
            <FormGroup>
              {starterPackageOptions.map((pkg) => (
                <FormControlLabel
                  key={pkg}
                  control={
                    <Checkbox
                      checked={fields.packages.includes(pkg)}
                      onChange={() => togglePackage(pkg)}
                    />
                  }
                  label={pkg}
                />
              ))}
            </FormGroup>
          </FormControl>
          <TextField
            label="Notes (hours, social links, payment details, etc.)"
            multiline
            minRows={3}
            value={fields.notes}
            onChange={(e) => patchFields({ notes: e.target.value })}
            size="small"
          />
        </Stack>
      )
    }

    if (intentId === 'student') {
      if (branchStepIndex === 0) {
        return (
          <Stack spacing={1.5}>
            <TextField
              label="Your name"
              required
              value={fields.contactName}
              onChange={(e) => patchFields({ contactName: e.target.value })}
              size="small"
            />
            <TextField
              label="Email"
              type="email"
              required
              value={fields.contactEmail}
              onChange={(e) => patchFields({ contactEmail: e.target.value })}
              size="small"
            />
            <TextField
              label="School or program (optional)"
              value={fields.school}
              onChange={(e) => patchFields({ school: e.target.value })}
              size="small"
            />
          </Stack>
        )
      }
      return (
        <Stack spacing={1.5}>
          <FormControl size="small" required>
            <InputLabel>Need</InputLabel>
            <Select label="Need" value={fields.studentNeed} onChange={(e) => patchFields({ studentNeed: e.target.value })}>
              {studentNeedOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" required>
            <InputLabel>Template</InputLabel>
            <Select label="Template" value={fields.template} onChange={(e) => patchFields({ template: e.target.value })}>
              {studentTemplateOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Message (links, graduation, etc.)"
            required
            multiline
            minRows={4}
            value={fields.message}
            onChange={(e) => patchFields({ message: e.target.value })}
            size="small"
          />
        </Stack>
      )
    }

    if (intentId === 'custom') {
      if (branchStepIndex === 0) {
        return (
          <Stack spacing={1.5}>
            <TextField
              label="Your name"
              required
              value={fields.contactName}
              onChange={(e) => patchFields({ contactName: e.target.value })}
              size="small"
            />
            <TextField
              label="Business name"
              required
              value={fields.businessName}
              onChange={(e) => patchFields({ businessName: e.target.value })}
              size="small"
            />
            <TextField
              label="Email"
              type="email"
              required
              value={fields.contactEmail}
              onChange={(e) => patchFields({ contactEmail: e.target.value })}
              size="small"
            />
            <TextField
              label="Phone"
              value={fields.phone}
              onChange={(e) => patchFields({ phone: e.target.value })}
              size="small"
            />
          </Stack>
        )
      }
      return (
        <Stack spacing={1.5}>
          <FormControl size="small" required>
            <InputLabel>Project type</InputLabel>
            <Select
              label="Project type"
              value={fields.projectType}
              onChange={(e) => patchFields({ projectType: e.target.value })}
            >
              {customProjectTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Describe goals and must-have features"
            required
            multiline
            minRows={4}
            value={fields.goals}
            onChange={(e) => patchFields({ goals: e.target.value })}
            size="small"
          />
          <FormControl size="small" required>
            <InputLabel>Timeline</InputLabel>
            <Select label="Timeline" value={fields.timeline} onChange={(e) => patchFields({ timeline: e.target.value })}>
              {customTimelineOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" required>
            <InputLabel>Budget range (ballpark)</InputLabel>
            <Select label="Budget range (ballpark)" value={fields.budget} onChange={(e) => patchFields({ budget: e.target.value })}>
              {customBudgetOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      )
    }

    if (intentId === 'general') {
      return (
        <Stack spacing={1.5}>
          <TextField
            label="Your name"
            required
            value={fields.contactName}
            onChange={(e) => patchFields({ contactName: e.target.value })}
            size="small"
          />
          <TextField
            label="Your email"
            type="email"
            required
            value={fields.contactEmail}
            onChange={(e) => patchFields({ contactEmail: e.target.value })}
            size="small"
          />
          <TextField
            label="Phone (optional)"
            value={fields.phone}
            onChange={(e) => patchFields({ phone: e.target.value })}
            size="small"
          />
          <FormControl size="small" required>
            <InputLabel>Topic</InputLabel>
            <Select label="Topic" value={fields.topic} onChange={(e) => patchFields({ topic: e.target.value })}>
              {generalTopicOptions.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Your message"
            required
            multiline
            minRows={4}
            value={fields.message}
            onChange={(e) => patchFields({ message: e.target.value })}
            size="small"
          />
        </Stack>
      )
    }

    return null
  }

  return (
    <Box id={id} component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Stepper
          activeStep={Math.min(step, progressStepCount - 1)}
          alternativeLabel
          sx={{
            pt: 0.5,
            pb: 1,
            '& .MuiStepLabel-label': { typography: { xs: 'caption', sm: 'body2' } },
          }}
        >
          {stepperLabels.map((label, index) => (
            <Step key={`${label}-${index}`} completed={step > index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Typography variant="h5">Contact and project intake</Typography>
        <Typography variant="body2" color="text.secondary">
          Choose your purpose — we only ask for fields that apply. Submissions go to {business.email} via AltruDigiTech.
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Step {step + 1} of {intentId ? totalSteps : progressStepCount}
          {!intentId && step === 0 ? ' — pick an option below to tailor the next steps' : ''}
        </Typography>

        {onIntentStep ? renderIntentStep() : renderBranchStep()}

        {stepError ? <FormHelperText error>{stepError}</FormHelperText> : null}

        {onLastBranchStep ? (
          <>
            <Typography variant="caption" color="text.secondary" display="block">
              Your inquiry is securely transmitted directly to {business.name} via AltruDigiTech.
            </Typography>
            {siteKey ? <Box ref={widgetRef} sx={{ minHeight: 65 }} /> : null}
          </>
        ) : null}

        <Stack direction="row" spacing={1.5} justifyContent="space-between">
          <Button type="button" variant="outlined" disabled={step === 0 || submitting} onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Sending…' : onLastBranchStep ? 'Submit intake' : 'Next'}
          </Button>
        </Stack>

        {status.text ? (
          <Alert severity={status.type === 'success' ? 'success' : status.type === 'warning' ? 'warning' : 'error'}>
            {status.text}
          </Alert>
        ) : null}
      </Stack>
    </Box>
  )
}