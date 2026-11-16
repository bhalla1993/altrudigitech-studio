import DeviceHubIcon from '@mui/icons-material/DeviceHub'
import DomainIcon from '@mui/icons-material/Domain'
import HandymanIcon from '@mui/icons-material/Handyman'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import PaletteIcon from '@mui/icons-material/Palette'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import Seo from '../components/common/Seo'
import { brand, business, pageSeo, starterPackage, pricingFootnote } from '../utils/siteData'

const services = [
  {
    title: 'Starter from Template',
    description: `Pick a design from our gallery—we load your worksheet content and launch on ${brand.subdomainExample}.`,
    icon: RocketLaunchIcon,
  },
  {
    title: 'Template Customization',
    description: 'Swap colors, sections, and service copy within the Starter scope. Bigger changes are billed as micro-tasks.',
    icon: PaletteIcon,
  },
  {
    title: 'Custom Domain ($49)',
    description: 'We add your .ca or .com to our Cloudflare account with SSL. You point nameservers; we handle DNS.',
    icon: DomainIcon,
  },
  {
    title: 'Code & Asset Handover ($129)',
    description: 'Receive a zip of your live site plus deployment notes when you want to self-host.',
    icon: IntegrationInstructionsIcon,
  },
  {
    title: 'Site Expansions (from $199)',
    description: 'Multi-page sites, galleries, and richer quote forms when you outgrow the single-page Starter.',
    icon: HandymanIcon,
  },
  {
    title: 'LocalTopSpot — Durham bundle',
    description:
      'Homeowners browse who to call by city and trade; eligible Durham Starter contractors can be featured on localtopspot.ca so locals can contact you—we confirm fit and list you with us.',
    icon: DomainIcon,
  },
]

function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description={pageSeo.services}
        path="/services"
      />

      <Box component="section" aria-labelledby="services-page-title">
        <Stack spacing={3}>
          <Typography id="services-page-title" variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Services for Local Businesses & Students
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 840 }}>
            {business.shortDescription}
          </Typography>

          <Card sx={{ border: '1px solid', borderColor: 'primary.main' }}>
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h6">
                  {starterPackage.name}: {starterPackage.price} {starterPackage.priceNote}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {starterPackage.audience} {pricingFootnote}
                </Typography>
                <Button component={RouterLink} to="/pricing" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                  Full pricing & add-ons
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Grid container spacing={2.4}>
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Grid key={service.title} item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                  >
                    <Card sx={{ height: '100%', transition: 'transform 220ms ease, box-shadow 220ms ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 } }}>
                      <CardContent>
                        <Stack spacing={1.15}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Icon color="primary" />
                            <Typography variant="h5" sx={{ fontSize: '1.2rem' }}>{service.title}</Typography>
                          </Stack>
                          <Typography color="text.secondary">{service.description}</Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>

          <Card
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              background: (theme) => `linear-gradient(120deg, ${theme.palette.primary.main}14, transparent)`,
            }}
          >
            <CardContent>
              <Stack spacing={1.2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DeviceHubIcon color="primary" />
                  <Typography variant="h5">Custom Web Applications & CRM</Typography>
                </Stack>
                <Typography color="text.secondary">
                  Dashboards, CRM systems, and internal tools are scoped separately from the $99 Starter. We quote after a discovery call.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                  <Button component={RouterLink} to="/contact" variant="contained">Request a Quote</Button>
                  <Button component={RouterLink} to="/pricing" variant="outlined">View Starter pricing</Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
            <Button component={RouterLink} to="/templates" variant="contained">Browse Templates</Button>
            <Button component={RouterLink} to="/pricing" variant="outlined">Get Starter — $99</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default ServicesPage