import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Button, Card, CardContent, Grid, IconButton, Link, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import Seo from '../components/common/Seo'
import IntakeFormEmbed from '../components/forms/IntakeFormEmbed'
import { business, pageSeo } from '../utils/siteData'

const socialItems = [
  {
    label: 'Facebook',
    href: business.socialLinks.facebook,
    icon: FacebookRoundedIcon,
  },
  {
    label: 'Instagram',
    href: business.socialLinks.instagram,
    icon: InstagramIcon,
  },
  {
    label: 'LinkedIn',
    href: business.socialLinks.linkedin,
    icon: LinkedInIcon,
  },
]

function ContactPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash !== '#intake') return
    const el = document.getElementById('intake')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <>
      <Seo
        title="Contact"
        description={pageSeo.contact}
        path="/contact"
      />

      <Box component="section" aria-labelledby="contact-page-title">
        <Grid container spacing={3.2}>
          <Grid item xs={12} md={7}>
            <Stack spacing={2.2}>
              <Typography id="contact-page-title" variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                Start your $99 Starter or ask a question
              </Typography>
              <Typography color="text.secondary">
                One intake form—choose Starter, a quick question, custom software, or student pricing. We respond within one
                business day.
              </Typography>

              <Button
                component={Link}
                href={business.intakeFormViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="text"
                size="small"
                endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                sx={{ alignSelf: 'flex-start', px: 0 }}
              >
                Open form in a new tab
              </Button>

              <IntakeFormEmbed id="intake" title="Contact and project intake" />
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={2.2}>
              <Card>
                <CardContent>
                  <Stack spacing={1.2}>
                    <Typography variant="h5">Contact Details</Typography>
                    <Typography color="text.secondary">Email: {business.email}</Typography>
                    <Typography color="text.secondary">{business.location}</Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
              >
                <CardContent>
                  <Stack spacing={1.4}>
                    <Typography variant="h5">Connect With Us</Typography>
                    <Typography color="text.secondary">
                      Email us or connect on social for updates, quick conversations, and project inquiries.
                    </Typography>
                    <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.28 }}
                      >
                        <IconButton
                          component={Link}
                          href={`mailto:${business.email}`}
                          aria-label={`Email ${business.email}`}
                          sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            color: 'text.primary',
                            '&:hover': {
                              color: 'primary.main',
                              borderColor: 'primary.main',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 10px 24px rgba(45, 212, 191, 0.2)',
                            },
                            transition: 'all 220ms ease',
                          }}
                        >
                          <EmailOutlinedIcon />
                        </IconButton>
                      </Box>
                      {socialItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <Box
                            key={item.label}
                            component={motion.div}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.28, delay: 0.06 * (index + 1) }}
                          >
                            <IconButton
                              component={Link}
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={item.label}
                              sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                color: 'text.primary',
                                '&:hover': {
                                  color: 'primary.main',
                                  borderColor: 'primary.main',
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 10px 24px rgba(45, 212, 191, 0.2)',
                                },
                                transition: 'all 220ms ease',
                              }}
                            >
                              <Icon />
                            </IconButton>
                          </Box>
                        )
                      })}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ContactPage