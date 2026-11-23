function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatCellValue(value) {
  if (value == null || value === '') return '—'
  if (Array.isArray(value)) return value.join(', ')
  return String(value)
}

/**
 * @param {{ title: string, rows: { label: string, value: string }[] }[]} sections
 */
export function buildLeadEmailHtml({
  headline,
  clientId,
  name,
  email,
  originHost,
  sections,
  footerNote,
}) {
  const safeHeadline = escapeHtml(headline || 'New lead')
  const sectionBlocks = (sections || [])
    .filter((s) => s?.rows?.length)
    .map((section) => {
      const title = escapeHtml(section.title || 'Details')
      const rows = section.rows
        .map((row) => {
          const label = escapeHtml(row.label)
          const raw = formatCellValue(row.value)
          const value = escapeHtml(raw).replace(/\n/g, '<br />')
          return `<tr>
  <td style="padding:10px 14px;width:36%;font-size:14px;line-height:1.45;color:#475569;font-weight:600;vertical-align:top;border-bottom:1px solid #e2e8f0;">${label}</td>
  <td style="padding:10px 14px;font-size:14px;line-height:1.5;color:#0f172a;vertical-align:top;border-bottom:1px solid #e2e8f0;">${value}</td>
</tr>`
        })
        .join('')
      return `<tr>
  <td style="padding:20px 28px 8px 28px;">
    <p style="margin:0 0 10px 0;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">${title}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
      ${rows}
    </table>
  </td>
</tr>`
    })
    .join('')

  const metaRows = [
    ['Client', clientId || '—'],
    ['Site', originHost || '—'],
    ['Name', name || '—'],
    ['Email', email || '—'],
  ]
    .map(
      ([label, value]) => `<tr>
  <td style="padding:8px 12px 8px 0;font-size:13px;line-height:1.45;color:#334155;font-weight:600;width:88px;vertical-align:top;">${escapeHtml(label)}</td>
  <td style="padding:8px 0;font-size:14px;line-height:1.5;color:#0f172a;font-weight:500;vertical-align:top;">${escapeHtml(value)}</td>
</tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">
          <tr>
            <td style="padding:28px 28px 24px 28px;background:linear-gradient(135deg,#0f2d52 0%,#1e4a7a 100%);">
              <p style="margin:0 0 6px 0;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.75);">AltruDigiTech</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;line-height:1.3;color:#ffffff;">${safeHeadline}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px;background-color:#f8fafc;border-bottom:1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${metaRows}</table>
            </td>
          </tr>
          ${sectionBlocks}
          <tr>
            <td style="padding:20px 28px 28px 28px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#64748b;">${escapeHtml(footerNote || 'Reply directly to this message to reach the sender. Lead delivered securely via AltruDigiTech.')}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * @param {{ title: string, rows: { label: string, value: string }[] }[]} sections
 */
export function buildLeadEmailText({ headline, sections, extraBlock }) {
  const lines = [headline || 'New lead', '='.repeat(Math.min(48, (headline || 'New lead').length)), '']
  for (const section of sections || []) {
    if (!section?.rows?.length) continue
    lines.push(section.title?.toUpperCase() || 'DETAILS')
    lines.push('-'.repeat(40))
    for (const row of section.rows) {
      lines.push(`${row.label}: ${formatCellValue(row.value)}`)
    }
    lines.push('')
  }
  if (extraBlock) {
    lines.push(extraBlock)
    lines.push('')
  }
  lines.push('—')
  lines.push('AltruDigiTech · Reply to reach the sender.')
  return lines.join('\n')
}

/**
 * Simple two-section layout when only name/email/message (client static forms).
 */
export function buildSimpleLeadSections({ name, email, message }) {
  return [
    {
      title: 'Contact',
      rows: [
        { label: 'Name', value: name || '' },
        { label: 'Email', value: email || '' },
      ].filter((r) => r.value),
    },
    {
      title: 'Message',
      rows: [{ label: 'Details', value: message || '' }],
    },
  ]
}