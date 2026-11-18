import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import Seo from '../components/common/Seo'
import {
  brand,
  capacityBadge,
  pageSeo,
  pricingAddOns,
  pricingAddOnsFooter,
  pricingFaqs,
  pricingFootnote,
  starterIncluded,
  starterNotIncluded,
  starterPackage,
  studentPromoNote,
} from '../utils/siteData'

function PricingPage() {
  return (
    <>
      <Seo
        title="Pricing"
        description={pageSeo.pricing}
        path="/pricing"
      />

      <Box component="section" aria-labelledby="pricing-page-title">
        <Stack spacing={3.1}>
          <Stack spacing={1.2}>
            <Typography id="pricing-page-title" variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              Simple, Transparent Pricing
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 860 }}>
              One flat Starter package for local businesses and students. Pay once for your site on{' '}
              <strong>{brand.subdomainExample}</strong>—add upgrades only when you need them.
            </Typography>
            <Chip label={capacityBadge} color="primary" variant="outlined" sx={{ width: 'fit-content', fontWeight: 600 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {pricingFootnote}
            </Typography>
          </Stack>

          <Grid container spacing={2.4}>
            <Grid item xs={12} lg={7}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    background: (theme) => `linear-gradient(120deg, ${theme.palette.primary.main}12, transparent)`,
                  }}
                >
                  <CardContent>
                    <Stack spacing={1.4}>
                      <Typography variant="h5" sx={{ fontSize: '1.35rem' }}>
                        {starterPackage.name}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="baseline" flexWrap="wrap" useFlexGap>
                        <Typography variant="h3" color="primary.main">
                          {starterPackage.price}
                        </Typography>
                        <Typography color="text.secondary" fontWeight={600}>
                          {starterPackage.priceNote}
                        </Typography>
                      </Stack>
                      <Typography color="text.secondary">{starterPackage.audience}</Typography>
                      <Stack spacing={0.7}>
                        {starterPackage.features.map((feature) => (
                          <Stack key={feature} direction="row" spacing={0.7} alignItems="flex-start">
                            <CheckCircleOutlineIcon sx={{ color: 'primary.main', fontSize: 18, mt: 0.15 }} />
                            <Typography color="text.secondary">{feature}</Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button component={RouterLink} to="/contact#intake" variant="contained" sx={{ alignSelf: 'flex-start', mt: 0.5 }}>
                        Start intake — $99
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={5}>
              <Stack spacing={2}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Included
                    </Typography>
                    <Stack spacing={0.6}>
                      {starterIncluded.map((item) => (
                        <Stack key={item} direction="row" spacing={0.7} alignItems="flex-start">
                          <CheckCircleOutlineIcon sx={{ color: 'primary.main', fontSize: 18, mt: 0.1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {item}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Not included
                    </Typography>
                    <Stack spacing={0.6}>
                      {starterNotIncluded.map((item) => (
                        <Stack key={item} direction="row" spacing={0.7} alignItems="flex-start">
                          <CancelOutlinedIcon sx={{ color: 'text.disabled', fontSize: 18, mt: 0.1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {item}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>

          <Card>
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="h5">Add-ons</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Add-on</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pricingAddOns.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{row.price}</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>{row.detail}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Typography variant="body2" color="text.secondary">
                  {pricingAddOnsFooter}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {studentPromoNote}
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h6">Scope boundaries</Typography>
                <Typography color="text.secondary" variant="body2">
                  Intake worksheet and payment are required before we build your preview. One free website address name change before
                  launch; changes
                  after launch are $25 micro-tasks. Monthly tweaks (months 1–3): email{' '}
                  <strong>{brand.updatesEmail}</strong> by the 25th—unused updates do not roll over.
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              background: (theme) => `linear-gradient(120deg, ${theme.palette.primary.main}14, transparent)`,
            }}
          >
            <CardContent>
              <Stack spacing={1.2}>
                <Typography variant="h5">Custom Web Applications & CRM</Typography>
                <Typography color="text.secondary">
                  Dashboards, internal tools, CRM systems, and automation projects are quoted after a discovery call—not part of the
                  $99 Starter.
                </Typography>
                <Button component={RouterLink} to="/contact#intake" variant="contained" sx={{ alignSelf: 'flex-start' }}>
                  Request a Quote
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Stack spacing={1.1}>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' } }}>
              FAQ
            </Typography>
            <Grid container spacing={2}>
              {pricingFaqs.map((faq) => (
                <Grid key={faq.q} item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Stack spacing={0.7}>
                        <Stack direction="row" spacing={0.7} alignItems="center">
                          <HelpOutlineIcon color="primary" sx={{ fontSize: 18 }} />
                          <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                            {faq.q}
                          </Typography>
                        </Stack>
                        <Typography color="text.secondary">{faq.a}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
            <Button component={RouterLink} to="/contact#intake" variant="contained">
              Start intake
            </Button>
            <Button component={RouterLink} to="/templates" variant="outlined">
              View Templates
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default PricingPage