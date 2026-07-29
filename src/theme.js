import { createTheme } from '@mui/material/styles'

/** Clarity-inspired emerald palette aligned with marketing hub. */
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f7a62',
      light: '#5f9a82',
      dark: '#2d5346',
    },
    secondary: {
      main: '#d4a84b',
      light: '#e4c47a',
      dark: '#b8923f',
    },
    background: {
      default: '#f8f4ec',
      paper: '#ffffff',
    },
    text: {
      primary: '#38342e',
      secondary: '#5c5852',
    },
    divider: '#ede5d6',
  },
  typography: {
    fontFamily: [
      '"Work Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: '1.5rem',
      color: '#2d5346',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      marginBottom: '1rem',
      color: '#2d5346',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: '0.75rem',
      color: '#2d5346',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '0.5rem',
      color: '#2d5346',
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#2d5346',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2d5346',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#38342e',
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
      color: '#5c5852',
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
          borderRadius: '9999px',
          padding: '10px 24px',
          fontSize: '1rem',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(45,83,70,0.15)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(45,83,70,0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(45,83,70,0.08)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
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
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme
