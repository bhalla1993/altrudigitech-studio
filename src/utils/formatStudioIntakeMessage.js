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
  return String(value).replace(/\t/g, ' ').replace(/\r?\n/g, ' ')
}

/**
 * Builds email body: human-readable block + tab-separated CRM header row.
 */
export function formatStudioIntakeMessage({ intentLabel, fields }) {
  const submittedAt = new Date().toISOString()
  const row = {
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

  const headerLine = CRM_COLUMNS.join('\t')
  const valueLine = CRM_COLUMNS.map((k) => cell(row[k])).join('\t')

  const detailLines = Object.entries(row)
    .filter(([, v]) => v !== '' && v != null && v !== false)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join('; ') : v}`)

  return [
    `INTENT: ${intentLabel}`,
    `Submitted: ${submittedAt}`,
    '',
    '--- Paste below into spreadsheet (one row) ---',
    headerLine,
    valueLine,
    '',
    '--- Details ---',
    ...detailLines,
    '',
    '---',
    'AltruDigiTech studio intake (site form).',
  ].join('\n')
}