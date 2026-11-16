import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { ThemeProvider as CustomThemeProvider, useThemeMode } from './styles/ThemeContext'
import { createAppTheme } from './styles/theme'

// Inner component for theme provider
function ThemedApp() {
  const { mode } = useThemeMode()
  const muiTheme = React.useMemo(() => createAppTheme(mode), [mode])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

// Run locally: npm run dev
// Build for production: npm run build
// Production: Cloudflare Pages — see README and docs/STUDIO_PLAN.md

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <CustomThemeProvider>
        <ThemedApp />
      </CustomThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
