import { createTheme } from '@mui/material/styles';

// Enhanced Light Theme with Premium Aesthetics
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: 'hsl(340, 82%, 52%)', // Rich Pink
            light: 'hsl(340, 82%, 65%)',
            dark: 'hsl(340, 82%, 42%)',
            contrastText: '#ffffff',
        },
        secondary: {
            main: 'hsl(291, 64%, 42%)', // Rich Purple
            light: 'hsl(291, 64%, 55%)',
            dark: 'hsl(291, 64%, 32%)',
            contrastText: '#ffffff',
        },
        error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
        },
        warning: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00',
        },
        info: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
        },
        success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
        },
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
        h1: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 800,
            fontSize: '3.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 700,
            fontSize: '2.75rem',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 700,
            fontSize: '2.25rem',
            lineHeight: 1.3,
        },
        h4: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.4,
        },
        h5: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h6: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.02em',
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 2px 4px rgba(0,0,0,0.05)',
        '0 4px 8px rgba(0,0,0,0.06)',
        '0 6px 12px rgba(0,0,0,0.07)',
        '0 8px 16px rgba(0,0,0,0.08)',
        '0 10px 20px rgba(0,0,0,0.09)',
        '0 12px 24px rgba(0,0,0,0.1)',
        '0 14px 28px rgba(0,0,0,0.11)',
        '0 16px 32px rgba(0,0,0,0.12)',
        '0 18px 36px rgba(0,0,0,0.13)',
        '0 20px 40px rgba(0,0,0,0.14)',
        '0 22px 44px rgba(0,0,0,0.15)',
        '0 24px 48px rgba(0,0,0,0.16)',
        '0 26px 52px rgba(0,0,0,0.17)',
        '0 28px 56px rgba(0,0,0,0.18)',
        '0 30px 60px rgba(0,0,0,0.19)',
        '0 32px 64px rgba(0,0,0,0.2)',
        '0 34px 68px rgba(0,0,0,0.21)',
        '0 36px 72px rgba(0,0,0,0.22)',
        '0 38px 76px rgba(0,0,0,0.23)',
        '0 40px 80px rgba(0,0,0,0.24)',
        '0 42px 84px rgba(0,0,0,0.25)',
        '0 44px 88px rgba(0,0,0,0.26)',
        '0 46px 92px rgba(0,0,0,0.27)',
        '0 48px 96px rgba(0,0,0,0.28)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    padding: '10px 24px',
                    transition: 'all 0.3s ease',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transform: 'translateY(-2px)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
                    },
                },
                outlined: {
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2,
                    },
                },
                sizeLarge: {
                    padding: '14px 32px',
                    fontSize: '1.05rem',
                },
                sizeSmall: {
                    padding: '6px 16px',
                    fontSize: '0.85rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                },
                elevation2: {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                },
                elevation3: {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'hsl(340, 82%, 52%)',
                            },
                        },
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 2,
                            },
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

// Enhanced Dark Theme with Vibrant Colors
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: 'hsl(340, 82%, 65%)', // Lighter Pink for dark mode
            light: 'hsl(340, 82%, 75%)',
            dark: 'hsl(340, 82%, 55%)',
            contrastText: '#ffffff',
        },
        secondary: {
            main: 'hsl(291, 64%, 55%)', // Lighter Purple for dark mode
            light: 'hsl(291, 64%, 65%)',
            dark: 'hsl(291, 64%, 45%)',
            contrastText: '#ffffff',
        },
        error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
        },
        warning: {
            main: '#ffa726',
            light: '#ffb74d',
            dark: '#f57c00',
        },
        info: {
            main: '#29b6f6',
            light: '#4fc3f7',
            dark: '#0288d1',
        },
        success: {
            main: '#66bb6a',
            light: '#81c784',
            dark: '#388e3c',
        },
        background: {
            default: '#0a0a0a',
            paper: '#1a1a1a',
        },
        text: {
            primary: 'rgba(255, 255, 255, 0.95)',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
        h1: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 800,
            fontSize: '3.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 700,
            fontSize: '2.75rem',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 700,
            fontSize: '2.25rem',
            lineHeight: 1.3,
        },
        h4: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.4,
        },
        h5: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h6: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.02em',
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 2px 4px rgba(0,0,0,0.3)',
        '0 4px 8px rgba(0,0,0,0.32)',
        '0 6px 12px rgba(0,0,0,0.34)',
        '0 8px 16px rgba(0,0,0,0.36)',
        '0 10px 20px rgba(0,0,0,0.38)',
        '0 12px 24px rgba(0,0,0,0.4)',
        '0 14px 28px rgba(0,0,0,0.42)',
        '0 16px 32px rgba(0,0,0,0.44)',
        '0 18px 36px rgba(0,0,0,0.46)',
        '0 20px 40px rgba(0,0,0,0.48)',
        '0 22px 44px rgba(0,0,0,0.5)',
        '0 24px 48px rgba(0,0,0,0.52)',
        '0 26px 52px rgba(0,0,0,0.54)',
        '0 28px 56px rgba(0,0,0,0.56)',
        '0 30px 60px rgba(0,0,0,0.58)',
        '0 32px 64px rgba(0,0,0,0.6)',
        '0 34px 68px rgba(0,0,0,0.62)',
        '0 36px 72px rgba(0,0,0,0.64)',
        '0 38px 76px rgba(0,0,0,0.66)',
        '0 40px 80px rgba(0,0,0,0.68)',
        '0 42px 84px rgba(0,0,0,0.7)',
        '0 44px 88px rgba(0,0,0,0.72)',
        '0 46px 92px rgba(0,0,0,0.74)',
        '0 48px 96px rgba(0,0,0,0.76)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    padding: '10px 24px',
                    transition: 'all 0.3s ease',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                        transform: 'translateY(-2px)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, hsl(340, 82%, 65%) 0%, hsl(291, 64%, 55%) 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, hsl(340, 82%, 75%) 0%, hsl(291, 64%, 65%) 100%)',
                    },
                },
                outlined: {
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2,
                    },
                },
                sizeLarge: {
                    padding: '14px 32px',
                    fontSize: '1.05rem',
                },
                sizeSmall: {
                    padding: '6px 16px',
                    fontSize: '0.85rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#1a1a1a',
                    '&:hover': {
                        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundColor: '#1a1a1a',
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                },
                elevation2: {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                },
                elevation3: {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'hsl(340, 82%, 65%)',
                            },
                        },
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 2,
                            },
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});
