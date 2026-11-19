/**
 * Canonical brand tokens — single source of truth (see docs/BRAND.md).
 * Keep index.html meta/title in sync with defaultMetaDescription and legalName.
 */
export const brand = {
  legalName: 'AltruDigiTech Digital Studio',
  shortName: 'AltruDigiTech',
  domain: 'altrudigitech.com',
  siteUrl: 'https://altrudigitech.com',
  subdomainExample: 'yourname.altrudigitech.com',
  clientSiteCredit: 'AltruDigiTech',
  updatesEmail: 'updates@altrudigitech.com',
  /** Legacy Gmail — fallback if hello@ routing is not ready */
  publicContactEmail: 'altrudigitech.studio@gmail.com',
  /** Public studio inbox (Cloudflare Email Routing → Gmail). See docs/EMAIL_ROUTING.md */
  helloEmail: 'hello@altrudigitech.com',
  deprecatedNames: ['Altruism', 'Altruism Digital Studio'],
}

export const business = {
  name: brand.legalName,
  shortName: brand.shortName,
  siteUrl: brand.siteUrl,
  domain: brand.domain,
  tagline: 'We build your online presence—simple, fast, and affordable.',
  shortDescription: `$99 one-time single-page sites for local trades, small shops, and students—live on ${brand.subdomainExample} with transparent add-ons.`,
  defaultMetaDescription:
    'AltruDigiTech Digital Studio builds $99 single-page websites for trades, shops, and students in Ontario and across Canada. No monthly builder fees.',
  email: brand.helloEmail,
  /** Pin / contact card — remote studio, no street address */
  location: 'Based in Ontario, Canada',
  originBadge: 'Canadian-owned studio',
  serviceAreaLine:
    'Remote studio serving clients across Canada, with a focus on Ontario and the Greater Toronto Area.',
  whoWeAreBlurb:
    'An Ontario-based remote studio pairing proven templates with your real business details—so plumbers, cleaners, landscapers, and students get online without learning Wix or WordPress.',
  /** Branched contact & project intake (Google Form → Sheet CRM) */
  intakeFormViewUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSeZjnqO_9JhPJ_wrJQwbenOCeUP6AQwIeDDVaFdXzgJivZozg/viewform',
  intakeFormEmbedUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSeZjnqO_9JhPJ_wrJQwbenOCeUP6AQwIeDDVaFdXzgJivZozg/viewform?embedded=true',
  socialLinks: {
    facebook: 'https://www.facebook.com/altrudigitechdigitalstudio',
    instagram: 'https://www.instagram.com/altrudigitechdigitalstudio',
    linkedin: 'https://www.linkedin.com/company/altrudigitech-digital-builders/',
  },
}

/** Per-route meta descriptions (Helmet); titles use `${title} | ${business.name}`. */
export const pageSeo = {
  home: business.defaultMetaDescription,
  about: `${brand.legalName} builds $99 single-page sites for Ontario trades, shops, and students—serving clients across Canada on ${brand.domain}.`,
  services: `${brand.legalName} $99 Starter sites, domain and handover add-ons, and custom web apps for small businesses in Ontario and Canada.`,
  pricing: `${brand.shortName} Starter site for $99 one-time in CAD. Transparent add-ons; no monthly site fees on your studio subdomain.`,
  templates: `Browse trade, shop, and resume templates included in the ${brand.shortName} $99 Starter package.`,
  liveProjects: `Client sites and Studio Lab products from ${brand.legalName}, including SparkShots, LocalTopSpot, and template-based launches.`,
  portfolio: `Client work and live demos are on Live Projects—real sites built by ${brand.legalName}.`,
  contact: `Contact ${brand.legalName} about the $99 Starter, add-ons, or custom web applications.`,
  notFound: `The page you requested is not available on ${brand.domain}.`,
}

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Templates', path: '/templates' },
  { label: 'Live Projects', path: '/live-projects' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
]

export const serviceItems = [
  {
    title: '$99 Starter Site',
    description:
      'One scrolling page for your business or profile—Hero, Services, About, Contact—personalized from our templates.',
    features: ['Studio subdomain hosting', 'One lead form', '1 pre-launch revision', '3 months of minor monthly updates'],
    image:
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Domains & Handover',
    description:
      'Upgrade when you are ready: connect your own .ca or .com, or take the files with our handover package.',
    features: ['Custom domain setup — $49', 'Code & Asset Handover — $129', 'Micro-tasks from $25'],
    image:
      'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Custom Apps & CRM',
    description:
      'Dashboards, internal tools, and automation for businesses that have outgrown a single landing page.',
    features: ['Scoped discovery call', 'Quoted after requirements', 'Separate from the $99 Starter'],
    image:
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
]

export const studioLabs = [
  {
    title: 'LocalTopSpot',
    description:
      'Durham Region directory for homeowners wondering who to call—featured, labeled listings by city and trade on localtopspot.ca. Contractors on our $99 Starter in Durham can qualify for a featured spot so locals can reach you; we confirm city and trade fit and set up the listing with you.',
    url: 'https://localtopspot.ca',
  },
]

export const pricingFootnote =
  'All prices in CAD. No HST charged (Small Supplier exemption).'

export const capacityBadge = 'Currently accepting 3 new Starter builds this week.'

export const studentPromoNote =
  'Students: email us for promo code STUDENT20 ($20 off). Same Starter package; not published as a separate tier.'

export const starterPackage = {
  name: 'Starter Site',
  price: '$99',
  priceNote: 'one-time',
  audience: 'Local trades, small shops, and students who want one professional link—no monthly builder fees.',
  features: [
    'Single-page site: Hero, Services, About, Contact',
    'Template-based design with your name, colors, and text',
    `Hosted at ${brand.subdomainExample} (free ongoing)`,
    'Stock photos until you provide your own (with attribution)',
    'One contact/quote form on your live site',
    'One pre-launch revision round',
    'One minor text/hours update per month for the first 3 months',
  ],
}

export const starterIncluded = [
  'Single scrolling page (4 sections)',
  'Mobile-first layout',
  'Studio subdomain hosting',
  'One lead form',
  'One batched pre-launch revision',
  '3 months of included minor monthly tweaks (~15 min or ~50 words)',
]

export const starterNotIncluded = [
  'Custom domain (add-on $49)',
  'Multi-page sites, booking, or e-commerce',
  'Unlimited revisions or full rebrand',
  'Copywriting from scratch',
  'Code handover (add-on $129)',
  'SEO campaigns or ad management',
]

export const pricingAddOns = [
  {
    name: 'Custom domain setup',
    price: '$49',
    detail:
      'Studio DNS/SSL setup on our Cloudflare zone, plus annual registrar fees you pay directly (often ~$15–25/yr for .ca/.com).',
  },
  {
    name: 'Code & Asset Handover',
    price: '$129',
    detail: 'One-time static site zip, assets, and basic deployment notes when you want to self-host.',
  },
  {
    name: 'Site expansion',
    price: 'From $199',
    detail: 'Scoped quote after intake—multi-page layouts, galleries, richer quote forms, and similar upgrades.',
  },
  {
    name: 'Micro-task',
    price: '$25–$50',
    detail: 'Per batched request after launch or after the included 3-month window (standard tweak from $25; larger edits quoted).',
  },
  {
    name: 'Extra pre-launch revision',
    price: '$49',
    detail: 'One additional batched revision round before go-live (beyond the included round).',
  },
  {
    name: 'LocalTopSpot — Durham listing bundle',
    price: 'Included*',
    detail:
      'Bonus for eligible $99 Starter trade clients in Durham Region: a featured, sponsored listing on localtopspot.ca so homeowners in your city can find who to call. We confirm trade and service area before go-live; listing is set up manually.',
  },
]

/** Shown under the add-ons table on Pricing */
export const pricingAddOnsFooter =
  '* LocalTopSpot is a regional studio perk for qualifying Durham-area trade sites—not a separate product charge. Other rows are studio fees in CAD; “From” and ranges depend on scope.'

export const pricingFaqs = [
  {
    q: 'What happens after my first 3 months?',
    a: `Hosting on your ${brand.subdomainExample} address stays free. Any text or photo updates after the initial 3-month window are billed at our standard $25 micro-task rate.`,
  },
  {
    q: 'How do custom domains work?',
    a: 'For $49 we add your domain to our Cloudflare account (you point nameservers). SSL is included. We route your site to the same page you get on your studio subdomain.',
  },
  {
    q: 'How fast will my site launch?',
    a: 'We start after your intake worksheet and payment are complete. Preview and launch timing depends on how quickly you return content—not a fixed “48 hours from hello.”',
  },
  {
    q: 'Can I own the files and host myself?',
    a: 'Yes. Code & Asset Handover is $129 one-time. You receive a zip and basic deployment notes. Your subdomain can stay up or come down after cutover— we confirm in writing.',
  },
  {
    q: 'Why single-page?',
    a: 'One fast, shareable link works well for contractors and students. Expansions start at $199 if you need more pages later.',
  },
  {
    q: 'Do students pay a different price?',
    a: 'The public price is $99 for everyone. Ask for promo code STUDENT20 for $20 off the same Starter package.',
  },
]

export const portfolioItems = [
  {
    title: 'Local Cafe Ordering Site',
    category: 'Website Development',
    description:
      'A conversion-focused website with menu search, reservations, and analytics dashboard integration.',
    image:
      'https://images.pexels.com/photos/5077069/pexels-photo-5077069.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Developer Resume Platform',
    category: 'Portfolio & Resume',
    description:
      'Custom personal brand website that helped improve interview callback rates and recruiter engagement.',
    image:
      'https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Operations Tracking Portal',
    category: 'Software Development',
    description:
      'A role-based portal that reduced manual reporting time by 40% for a service business team.',
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
]

export const values = [
  {
    title: 'Clarity',
    description: 'We turn technical complexity into clear outcomes your business can use immediately.',
  },
  {
    title: 'Craft',
    description: 'We combine thoughtful design with robust engineering standards to ship with confidence.',
  },
  {
    title: 'Partnership',
    description: 'We work as an extension of your team, focused on long-term value, not one-off delivery.',
  },
]
