import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Seo from '../components/common/Seo'
import { brand, pageSeo } from '../utils/siteData'

function PortfolioPage() {
  return (
    <>
      <Seo
        title="Portfolio"
        description={pageSeo.portfolio}
        path="/portfolio"
      />

      <Box component="section" aria-labelledby="portfolio-redirect-title">
        <Stack spacing={2.5} sx={{ maxWidth: 640 }}>
          <Typography id="portfolio-redirect-title" variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}>
            Live client work moved
          </Typography>
          <Typography color="text.secondary">
            We showcase real deployed sites—not stock case studies—on Live Projects. You will find client builds like SparkShots
            plus template-based launches from {brand.shortName}.
          </Typography>
          <Button component={RouterLink} to="/live-projects" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ alignSelf: 'flex-start' }}>
            View Live Projects
          </Button>
          <Button component={RouterLink} to="/pricing" variant="text" sx={{ alignSelf: 'flex-start' }}>
            Get your own $99 Starter site
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default PortfolioPage