import { brand } from './siteData'

const CRM_COLUMNS = [
  'submitted_at',
  'intent',
  'contact_name',
  'contact_email',
  'phone',
  'business_name',
  'lead_email',
  'city',
  'template',
  'services',
  'about',
  'color_style',
  'slug',
  'topic',
  'message',
  'school',
  'student_need',
  'project_type',
  'goals',
  'timeline',
  'budget',
  'payment_status',
  'packages',
  'legal_confirmed',
  'notes',
]

function cell(value) {
  if (value == null || value === '') return ''
  if (Array.isArray(value)) return value.join('; ')
  if (value === true) return 'yes'
  return String(value).replace(/\t/g, ' ').replace(/\r?\n/g, ' ')
}

function formatValue(value) {
  if (value == null || value === '') return ''
  if (Array.isArray(value)) return value.join(', ')
  if (value === true) return 'Yes'
  if (value === false) return ''
  return String(value)
}

function row(label, value) {
  const formatted = formatValue(value)
  if (!formatted) return null
  return { label, value: formatted }
}

function compact(rows) {
  return rows.filter(Boolean)
}

function submittedLocalString() {
  try {
    return new Date().toLocaleString('en-CA', {
      timeZone: 'America/Toronto',
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return new Date().toISOString()
  }
}

export function buildStudioIntakeRow({ intentLabel, fields }) {
  const submittedAt = new Date().toISOString()
  return {
    submitted_at: submittedAt,
    intent: intentLabel,
    contact_name: fields.contactName,
    contact_email: fields.contactEmail,
    phone: fields.phone,
    business_name: fields.businessName,
    lead_email: fields.leadEmail,
    city: fields.city,
    template: fields.template,
    services: fields.services,
    about: fields.about,
    color_style: fields.colorStyle,
    slug: fields.slug,
    topic: fields.topic,
    message: fields.message,
    school: fields.school,
    student_need: fields.studentNeed,
    project_type: fields.projectType,
    goals: fields.goals,
    timeline: fields.timeline,
    budget: fields.budget,
    payment_status: fields.paymentStatus,
    packages: fields.packages,
    legal_confirmed: fields.legalConfirmed ? 'yes' : '',
    notes: fields.notes,
  }
}

/** Tab-separated block for pasting into a spreadsheet (plain-text email footer). */
export function formatStudioIntakeCrmBlock({ intentLabel, fields }) {
  const row = buildStudioIntakeRow({ intentLabel, fields })
  const headerLine = CRM_COLUMNS.join('\t')
  const valueLine = CRM_COLUMNS.map((k) => cell(row[k])).join('\t')
  return ['Spreadsheet row (copy one line below)', headerLine, valueLine].join('\n')
}

/**
 * Sections for HTML + readable plain email (POST email_sections).
 * @returns {{ title: string, rows: { label: string, value: string }[] }[]}
 */
export function buildStudioIntakeEmailSections({ intentId, intentLabel, fields }) {
  const submitted = submittedLocalString()
  const sections = [
    {
      title: 'Summary',
      rows: compact([
        row('Purpose', intentLabel),
        row('Submitted', submitted),
      ]),
    },
    {
      title: 'Contact',
      rows: compact([
        row('Name', fields.contactName),
        row('Email', fields.contactEmail),
        row('Phone', fields.phone),
      ]),
    },
  ]

  if (intentId === 'starter') {
    sections.push({
      title: 'Business & site',
      rows: compact([
        row('Business name', fields.businessName),
        row('Public contact email', fields.leadEmail),
        row('City / area served', fields.city),
        row(
          'Website address',
          fields.slug ? `${fields.slug}.${brand.domain}` : '',
        ),
        row('Template', fields.template),
        row('Services offered', fields.services),
        row('About the business', fields.about),
        row('Color / style', fields.colorStyle),
        row('Notes', fields.notes),
      ]),
    })
    sections.push({
      title: 'Packages & confirmation',
      rows: compact([
        row('Payment status', fields.paymentStatus),
        row('Packages selected', fields.packages),
        row('Legal confirmation', fields.legalConfirmed),
      ]),
    })
  }

  if (intentId === 'student') {
    sections.push({
      title: 'Student details',
      rows: compact([
        row('School / program', fields.school),
        row('What they need', fields.studentNeed),
        row('Template interest', fields.template),
        row('About / message', fields.message),
        row('Notes', fields.notes),
      ]),
    })
  }

  if (intentId === 'custom') {
    sections.push({
      title: 'Project scope',
      rows: compact([
        row('Business / organization', fields.businessName),
        row('Project type', fields.projectType),
        row('Goals & requirements', fields.goals),
        row('Timeline', fields.timeline),
        row('Budget range', fields.budget),
        row('Additional notes', fields.notes),
      ]),
    })
  }

  if (intentId === 'general') {
    sections.push({
      title: 'Question',
      rows: compact([
        row('Topic', fields.topic),
        row('Message', fields.message),
      ]),
    })
  }

  return sections.filter((s) => s.rows.length > 0)
}

/** Readable plain text (API `message` field + inbox preview). */
export function formatStudioIntakePlainText({ intentId, intentLabel, fields }) {
  const sections = buildStudioIntakeEmailSections({ intentId, intentLabel, fields })
  const lines = [`Studio intake — ${intentLabel}`, '']
  for (const section of sections) {
    lines.push(section.title)
    for (const r of section.rows) {
      lines.push(`  ${r.label}: ${r.value}`)
    }
    lines.push('')
  }
  lines.push(formatStudioIntakeCrmBlock({ intentLabel, fields }))
  return lines.join('\n')
}

/** @deprecated use formatStudioIntakePlainText — kept for callers expecting old name */
export function formatStudioIntakeMessage(args) {
  return formatStudioIntakePlainText(args)
}