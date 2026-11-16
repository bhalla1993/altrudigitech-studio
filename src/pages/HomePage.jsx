import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import BoltIcon from '@mui/icons-material/Bolt'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PublicIcon from '@mui/icons-material/Public'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { Box, Button, Card, CardContent, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AnimatedSection from '../components/common/AnimatedSection'
import Seo from '../components/common/Seo'
import ServiceCard from '../components/cards/ServiceCard'
import IntakeFormEmbed from '../components/forms/IntakeFormEmbed'
import TemplatePreviewCard from '../components/templates/TemplatePreviewCard'
import {
  brand,
  business,
  capacityBadge,
  pageSeo,
  pricingFootnote,
  serviceItems,
  starterPackage,
} from '../utils/siteData'
import { templates } from '../utils/templatesData'

const approachItems = [
  `Starter sites at ${brand.subdomainExample} with no monthly hosting fees.`,
  'Custom .ca or .com domains available as a $49 add-on.',
  `Code & asset handover ($129) when you want to self-host.`,
  'Template-first delivery so you launch quickly after intake and payment.',
]

const socialItems = [
  { label: 'Facebook', href: business.socialLinks.facebook, Icon: FacebookRoundedIcon },
  { label: 'Instagram', href: business.socialLinks.instagram, Icon: InstagramIcon },
  { label: 'LinkedIn', href: business.socialLinks.linkedin, Icon: LinkedInIcon },
]

const heroTrustItems = [
  '$99 Starter — one-time',
  'No monthly site fees',
  'Launch after intake & payment',
]

function HomePage() {
  return (
    <>
      <Seo
        title="Home"
        description={pageSeo.home}
        path="/"
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <Box component="section" sx={{ mb: 8 }}>
        <AnimatedSection>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={2.5}>
                <Chip icon={<RocketLaunchIcon />} label="Small Business Digital Partner" color="primary" variant="outlined" sx={{ width: 'fit-content' }} />
                <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.7rem' }, lineHeight: 1.1 }}>
                  {business.tagline}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    maxWidth: 760,
                    fontWeight: 700,
                    color: 'text.primary',
                    lineHeight: 1.35,
                  }}
                >
                  $99 single-page sites for local trades, shops & students — pick a template, we personalize and launch on your studio subdomain.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button component={RouterLink} to="/pricing" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
                    View $99 Starter
                  </Button>
                  <Button component={RouterLink} to="/templates" variant="outlined" size="large">
                    Browse Templates
                  </Button>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ pt: 0.5 }}>
                  {heroTrustItems.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      variant="filled"
                      sx={{
                        borderRadius: 999,
                        px: 0.6,
                        fontWeight: 700,
                        bgcolor: 'action.hover',
                        color: 'text.primary',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="A professional team planning software delivery"
                sx={{ width: '100%', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}
              />
            </Grid>
          </Grid>
        </AnimatedSection>
      </Box>

      {/* ── Starter pricing teaser ──────────────────────────────────── */}
      <Box component="section" aria-labelledby="home-pricing-teaser" sx={{ mb: 8 }}>
        <AnimatedSection delay={0.06}>
          <Card
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              background: (theme) => `linear-gradient(120deg, ${theme.palette.primary.main}10, transparent)`,
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1.5}>
                  <Stack spacing={0.5}>
                    <Typography id="home-pricing-teaser" variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                      {starterPackage.name} — {starterPackage.price} {starterPackage.priceNote}
                    </Typography>
                    <Typography color="text.secondary" sx={{ maxWidth: 640 }}>
                      {starterPackage.audience}
                    </Typography>
                  </Stack>
                  <Chip label={capacityBadge} color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  {pricingFootnote}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                  <Button component={RouterLink} to="/pricing" variant="contained">
                    See what&apos;s included
                  </Button>
                  <Button component={RouterLink} to="/contact#intake" variant="outlined">
                    Start intake
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Box>

      {/* ── Featured Services ───────────────────────────────────────── */}
      <Box component="section" aria-labelledby="featured-services-title">
        <AnimatedSection delay={0.08}>
          <Stack spacing={3}>
            <Typography id="featured-services-title" variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' } }}>
              How We Help You Launch
            </Typography>
            <Grid container spacing={3}>
              {serviceItems.slice(0, 3).map((service) => (
                <Grid item xs={12} md={4} key={service.title}>
                  <ServiceCard service={service} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </AnimatedSection>
      </Box>

      {/* ── Starter Templates ───────────────────────────────────────── */}
      <Box component="section" aria-labelledby="starter-templates-title" sx={{ mt: 8 }}>
        <AnimatedSection delay={0.12}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
              <Typography id="starter-templates-title" variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' } }}>
                Starter Templates
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Button component={RouterLink} to="/templates" variant="outlined">
                  Browse All Templates
                </Button>
                <Button component={RouterLink} to="/pricing" variant="text" size="small">
                  Get any design — $99 Starter
                </Button>
              </Stack>
            </Stack>
            <Grid container spacing={3}>
              {templates.slice(0, 3).map((template, index) => (
                <Grid key={template.id} item xs={12} md={4}>
                  <TemplatePreviewCard template={template} index={index} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </AnimatedSection>
      </Box>

      {/* ── About ───────────────────────────────────────────────────── */}
      <Box id="about" component="section" aria-labelledby="home-about-title" sx={{ mt: { xs: 10, md: 14 } }}>
        <AnimatedSection delay={0.05}>
          <Stack spacing={4}>
            <Stack spacing={1.2}>
              <Typography id="home-about-title" variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' } }}>
                About {business.shortName}
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 820 }}>
                We help professionals build modern, link-based online presence with single-page experiences that are fast, polished, and practical.
              </Typography>
            </Stack>

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={1.2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <HandshakeOutlinedIcon color="primary" />
                        <Typography variant="h6">Who We Are</Typography>
                      </Stack>
                      <Typography color="text.secondary">
                        {business.whoWeAreBlurb}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={1.2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <BoltIcon color="primary" />
                        <Typography variant="h6">What We Do</Typography>
                      </Stack>
                      <Typography color="text.secondary">
                        We build modern single-page sites for contractors, shops, and students—live on {brand.subdomainExample} with
                        no monthly hosting fees. Custom software and CRM projects are quoted separately.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={1.2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AutoAwesomeIcon color="primary" />
                        <Typography variant="h6">Why We Exist</Typography>
                      </Stack>
                      <Typography color="text.secondary">
                        Professional online presence should be affordable and simple, so more people can stand out without paying for complex platforms or ongoing maintenance costs.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack spacing={1.2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PublicIcon color="primary" />
                        <Typography variant="h6">Our Vision</Typography>
                      </Stack>
                      <Typography color="text.secondary">
                        To make professional online presence accessible to everyone through affordable, high-quality SPAs that require no hosting fees, no maintenance costs, and no technical knowledge.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Card sx={{ bgcolor: 'action.hover' }}>
              <CardContent>
                <Stack spacing={1.3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <RocketLaunchIcon color="primary" />
                    <Typography variant="h6">Our Approach</Typography>
                  </Stack>
                  <Grid container spacing={1}>
                    {approachItems.map((item) => (
                      <Grid item xs={12} sm={6} key={item}>
                        <Stack direction="row" spacing={0.9} alignItems="flex-start">
                          <CheckCircleOutlineIcon sx={{ color: 'primary.main', mt: 0.15, fontSize: 18, flexShrink: 0 }} />
                          <Typography color="text.secondary" variant="body2">{item}</Typography>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </CardContent>
            </Card>

            <Stack direction="row" justifyContent="flex-end">
              <Button component={RouterLink} to="/about" variant="outlined" endIcon={<ArrowForwardIcon />}>
                Full About Page
              </Button>
            </Stack>
          </Stack>
        </AnimatedSection>
      </Box>

      {/* ── Contact ─────────────────────────────────────────────────── */}
      <Box id="contact" component="section" aria-labelledby="home-contact-title" sx={{ mt: { xs: 10, md: 14 } }}>
        <AnimatedSection delay={0.05}>
          <Stack spacing={4}>
            <Stack spacing={1.2}>
              <Typography id="home-contact-title" variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' } }}>
                Let&apos;s Build Your Next Digital Product
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
                Complete intake below—Starter, questions, custom apps, or student pricing. We usually respond within one business
                day.
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <IntakeFormEmbed title="Contact and project intake" />
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={2.5}>
                  <Card>
                    <CardContent>
                      <Stack spacing={1.4}>
                        <Typography variant="h6">Contact Details</Typography>
                        <Divider />
                        <Stack direction="row" spacing={1} alignItems="center">
                          <EmailOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                          <Typography color="text.secondary" variant="body2">{business.email}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <LocationOnOutlinedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                          <Typography color="text.secondary" variant="body2">{business.location}</Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent>
                      <Stack spacing={1.4}>
                        <Typography variant="h6">Connect With Us</Typography>
                        <Typography color="text.secondary" variant="body2">
                          Email us or connect on social for updates and quick project inquiries.
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          <IconButton
                            component="a"
                            href={`mailto:${business.email}`}
                            aria-label={`Email ${business.email}`}
                            sx={{
                              color: 'text.secondary',
                              transition: 'color 200ms ease, transform 200ms ease',
                              '&:hover': { color: 'primary.main', transform: 'translateY(-2px)' },
                            }}
                          >
                            <EmailOutlinedIcon />
                          </IconButton>
                          {socialItems.map(({ label, href, Icon }) => (
                            <IconButton
                              key={label}
                              component="a"
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={label}
                              sx={{
                                color: 'text.secondary',
                                transition: 'color 200ms ease, transform 200ms ease',
                                '&:hover': { color: 'primary.main', transform: 'translateY(-2px)' },
                              }}
                            >
                              <Icon />
                            </IconButton>
                          ))}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>

                  <Button component={RouterLink} to="/contact#intake" variant="outlined" endIcon={<ArrowForwardIcon />} fullWidth>
                    Full Contact Page
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </AnimatedSection>
      </Box>
    </>
  )
}

export default HomePage
