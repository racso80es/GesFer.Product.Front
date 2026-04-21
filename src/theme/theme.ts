'use client';
import { createTheme } from '@mui/material/styles';

// Mapeo directo a los design tokens de Tailwind (Vercel Style)
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#171717', // var(--primary)
      contrastText: '#FAFAFA', // var(--primary-foreground)
    },
    secondary: {
      main: '#F5F5F5', // var(--secondary)
      contrastText: '#171717', // var(--secondary-foreground)
    },
    error: {
      main: '#E5484D', // var(--destructive)
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111111',
      secondary: '#737373',
    },
    divider: '#EAEAEA',
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: 'var(--font-sans), var(--font-roboto), Inter, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          },
        },
        containedPrimary: {
          backgroundColor: '#171717',
          color: '#FAFAFA',
          '&:hover': {
            backgroundColor: 'rgba(23, 23, 23, 0.9)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#EAEAEA',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(115, 115, 115, 0.3)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#171717',
            borderWidth: 1,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Quitar shadows de Material
        },
        elevation1: {
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          border: '1px solid #EAEAEA',
        },
      },
    },
  },
});

export default theme;
