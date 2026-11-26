/** Mirrors Google Form "Contact & Project Intake" (branching). */

export const intakeIntents = [
  {
    id: 'starter',
    label: '$99 Starter — I’m ready to start my website (intake)',
  },
  {
    id: 'general',
    label: 'General question — not ready to buy yet',
  },
  {
    id: 'custom',
    label: 'Custom website, app, or CRM — request a quote',
  },
  {
    id: 'student',
    label: 'Student — interested in Starter ($99) or STUDENT20 promo',
  },
]

export const studentNeedOptions = [
  'Student resume site — $99 Starter',
  'Portfolio site — $99 Starter',
  'Request STUDENT20 promo ($20 off) before I pay',
  'Questions only — not ready to pay',
  'Not sure which template I need',
]

export const studentTemplateOptions = [
  'Student resume',
  'Creative portfolio',
  'Corporate portfolio',
  'IT consultant (resume / profile)',
  'Adventure photographer portfolio',
  'Other — describe in Message',
  'I need help choosing — recommend for me',
]

export const customProjectTypes = [
  'CRM or customer tracking',
  'Business dashboard / reporting',
  'Internal tool / operations',
  'Booking, scheduling, or calendar',
  'E-commerce or payments online',
  'Client portal or login area',
  'Automation / integrations (email, APIs)',
  'Multi-page marketing site (beyond $99 Starter)',
  'Not sure — need guidance',
  'Other',
]

export const customTimelineOptions = [
  'ASAP — urgent',
  'Within 1–3 months',
  '3–6 months',
  'Flexible / exploring only',
  'Not sure yet',
]

export const customBudgetOptions = [
  'Under $2,000 CAD',
  '$2,000 – $5,000 CAD',
  '$5,000 – $10,000 CAD',
  '$10,000+ CAD',
  'Prefer not to say',
  'Need guidance on budget',
]

export const generalTopicOptions = [
  'Pricing & $99 Starter package',
  'Templates — which design to pick',
  'Timeline — how fast can you launch?',
  'Domains & hosting (subdomain vs .ca)',
  'Revisions, monthly updates & support',
  'Student pricing / STUDENT20',
  'Partnership or other',
  'Other',
]

export const starterTemplateOptions = [
  'Content creator (link hub & collabs)',
  'Electrician & contractor',
  'Home cleaning service',
  'HVAC technician',
  'Snow removal',
  'Landscape contractor',
  'Luxury plumbing',
  'Barber shop',
  'Bakery shop',
  'Coffee shop',
  'Dental clinic',
  'Fine dining restaurant',
  'Fitness trainer',
  'Real estate agent',
  'Student resume',
  'IT consultant',
  'Creative portfolio',
  'Corporate portfolio',
  'Adventure photographer portfolio',
  'Other (describe in Notes)',
]

export const starterColorOptions = [
  'Dark & bold',
  'Clean & light',
  'Blue professional',
  'Green — trades / outdoor',
  'Warm — food / hospitality',
  'Match the template default',
  'Other — describe in Notes',
]

export const starterPaymentOptions = [
  'I have sent payment (e-transfer) — include amount/date in Notes if you can',
  'I will send payment within 24 hours',
  'Please send payment instructions first',
  'I’m a student requesting promo code STUDENT20 ($20 off)',
]

export const starterPackageOptions = [
  'Starter Site — $99 CAD (required)',
  'Custom domain setup — $49 CAD (add-on; discuss before billing)',
  'Code & Asset Handover — $129 CAD (optional; not needed for launch)',
  'LocalTopSpot featured listing — free bonus for eligible Ontario contractors (manual eligibility)',
  'None — I only want add-on info for later',
]

export const legalConfirmationLabel =
  'I confirm that license numbers, insurance claims, certifications, and business details I provide are accurate and authorized for public display on my website.'