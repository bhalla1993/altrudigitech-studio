import { Box } from '@mui/material'
import { business } from '../../utils/siteData'

const defaultMinHeight = { xs: 1120, sm: 1040, md: 992 }

/** Google Forms render light UI; frame with a light inset + mode-aware border on the marketing site. */
const formSurfaceColor = '#f8fafc'

function IntakeFormEmbed({
  minHeight = defaultMinHeight,
  title = 'Contact and project intake form',
  id,
}) {
  return (
    <Box
      id={id}
      sx={{
        width: '100%',
        maxWidth: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(45, 212, 191, 0.28)' : theme.palette.divider,
        bgcolor: formSurfaceColor,
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 8px 28px rgba(0, 0, 0, 0.38)'
            : '0 12px 28px rgba(15, 23, 42, 0.1)',
      }}
    >
      <Box
        component="iframe"
        src={business.intakeFormEmbedUrl}
        title={title}
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        loading="lazy"
        sx={{
          width: '100%',
          minHeight,
          border: 0,
          display: 'block',
          bgcolor: formSurfaceColor,
        }}
      >
        Loading…
      </Box>
    </Box>
  )
}

export default IntakeFormEmbed