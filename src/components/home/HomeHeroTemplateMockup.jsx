import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import homeHeroLuxuryPlumbing from '../../assets/images/home-hero-luxury-plumbing.jpg'
import { brand } from '../../utils/siteData'

const HERO_TEMPLATE = {
  title: 'Luxury Plumbing',
  demoUrl: `${import.meta.env.BASE_URL}templates/spa/luxury-plumbing.html`,
  demoLabel: 'Élite Plumbing demo',
  viewportBg: '#0c121f',
}

function HomeHeroTemplateMockup() {
  const demoHref = HERO_TEMPLATE.demoUrl

  return (
    <Stack
      spacing={1.25}
      sx={{
        width: '100%',
        height: '100%',
        mx: { xs: 'auto', md: 0 },
        justifyContent: 'center',
        maxWidth: { md: 640, lg: 720 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: (theme) => `0 24px 48px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.45)' : 'rgba(10,15,28,0.12)'}`,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            px: 1.5,
            py: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'action.hover',
          }}
        >
          <Stack direction="row" spacing={0.6} aria-hidden>
            {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
              <Box key={color} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: color, opacity: 0.9 }} />
            ))}
          </Stack>
          <Typography
            variant="caption"
            sx={{
              flex: 1,
              textAlign: 'center',
              color: 'text.secondary',
              fontWeight: 600,
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              pr: 4,
            }}
          >
            {brand.subdomainHeroExample}
          </Typography>
        </Stack>
        <Box sx={{ bgcolor: HERO_TEMPLATE.viewportBg, lineHeight: 0 }}>
          <Box
            component="img"
            src={homeHeroLuxuryPlumbing}
            alt={`$99 Starter template preview — ${HERO_TEMPLATE.title}`}
            fetchPriority="high"
            decoding="async"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </Box>
      </Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
        sx={{ flexShrink: 0 }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
          Sample $99 Starter — trade &amp; shop templates look like this on your studio subdomain.
        </Typography>
        <Button
          component="a"
          href={demoHref}
          target="_blank"
          rel="noreferrer"
          size="small"
          variant="outlined"
          endIcon={<ArrowOutwardIcon />}
          sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
        >
          {HERO_TEMPLATE.demoLabel}
        </Button>
        <Button component={RouterLink} to="/templates" size="small" sx={{ display: { sm: 'none' } }}>
          All templates
        </Button>
      </Stack>
    </Stack>
  )
}

export default HomeHeroTemplateMockup