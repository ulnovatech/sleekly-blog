import { createTheme } from '@mui/material/styles'
import { brand } from './brand'

/** MUI theme mapped to Meridian Design OS semantic roles. */
const theme = createTheme({
  palette: {
    primary: {
      main: brand.emerald,
      light: brand.emeraldSoft,
      dark: brand.emeraldDeep,
      contrastText: brand.cream,
    },
    secondary: {
      main: brand.gold,
      light: brand.goldSoft,
      dark: brand.sparkDeep,
      contrastText: brand.ink,
    },
    background: {
      default: brand.cream,
      paper: '#ffffff',
    },
    text: {
      primary: brand.ink,
      secondary: brand.inkSoft,
    },
    divider: brand.creamDeep,
    error: {
      main: '#a33b2b',
    },
    success: {
      main: '#1f7a4c',
    },
    warning: {
      main: '#b7791f',
    },
    info: {
      main: brand.meridian,
    },
  },
  typography: {
    fontFamily: [
      '"IBM Plex Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Sora, "IBM Plex Sans", system-ui, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.03em',
      marginBottom: '1.5rem',
      color: brand.emeraldDeep,
    },
    h2: {
      fontFamily: 'Sora, "IBM Plex Sans", system-ui, sans-serif',
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
      marginBottom: '1rem',
      color: brand.emeraldDeep,
    },
    h3: {
      fontFamily: 'Sora, "IBM Plex Sans", system-ui, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: '0.75rem',
      color: brand.emeraldDeep,
    },
    h4: {
      fontFamily: 'Sora, "IBM Plex Sans", system-ui, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
      color: brand.emeraldDeep,
    },
    h5: {
      fontFamily: 'Sora, "IBM Plex Sans", system-ui, sans-serif',
      fontSize: '1.1rem',
      fontWeight: 600,
      color: brand.emeraldDeep,
    },
    h6: {
      fontFamily: 'Sora, "IBM Plex Sans", system-ui, sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
      color: brand.emeraldDeep,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: brand.ink,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
      color: brand.inkSoft,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          padding: '10px 24px',
          fontSize: '1rem',
          minHeight: 44,
          transition: 'background-color 150ms ease, box-shadow 150ms ease',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(45,83,70,0.15)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(45,83,70,0.25)',
          },
        },
        containedSecondary: {
          color: brand.ink,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(45,83,70,0.08)',
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(45,83,70,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: brand.emerald,
          '&:hover': {
            color: brand.emeraldDeep,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme
