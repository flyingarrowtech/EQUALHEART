import { createTheme } from '@mui/material/styles';

// 1. Strict Color Dictionary
// Changing a color here updates the ENTIRE application.
export const COLORS = {
    primary: {
        main: 'hsl(340, 82%, 52%)',   // Rich Pink
        light: 'hsl(340, 82%, 65%)',
        dark: 'hsl(340, 82%, 42%)',
        contrast: '#ffffff'
    },
    secondary: {
        main: 'hsl(291, 64%, 42%)',   // Rich Purple
        light: 'hsl(291, 64%, 55%)',
        dark: 'hsl(291, 64%, 32%)',
        contrast: '#ffffff'
    },
    glass: {
        card: 'rgba(255, 255, 255, 0.8)',
        input: 'rgba(255, 255, 255, 0.6)',
        border: 'rgba(255, 255, 255, 0.5)',
        sidebar: 'rgba(255, 255, 255, 0.8)',
        highlight: 'rgba(255, 255, 255, 0.9)'
    },
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
    },
    background: {
        default: '#f8f9fa',
        paper: '#ffffff'
    }
};

// 2. Type Extension for "Glass" properties
declare module '@mui/material/styles' {
    interface TypeBackground {
        glassCard: string;
        glassInput: string;
        glassBorder: string;
        glassSidebar: string;
    }

    // Allow configuration using `createTheme`
    interface TypeBackgroundOptions {
        glassCard?: string;
        glassInput?: string;
        glassBorder?: string;
        glassSidebar?: string;
    }
}

// 3. Theme Definition
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: COLORS.primary.main,
            light: COLORS.primary.light,
            dark: COLORS.primary.dark,
            contrastText: COLORS.primary.contrast,
        },
        secondary: {
            main: COLORS.secondary.main,
            light: COLORS.secondary.light,
            dark: COLORS.secondary.dark,
            contrastText: COLORS.secondary.contrast,
        },
        background: {
            default: COLORS.background.default,
            paper: COLORS.background.paper,
            glassCard: COLORS.glass.card,
            glassInput: COLORS.glass.input,
            glassBorder: COLORS.glass.border,
            glassSidebar: COLORS.glass.sidebar
        },
        text: COLORS.text,
    },
    typography: {
        fontFamily: '"Inter", -apple-system, sans-serif',
        h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
        h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
        h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
        h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
        h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
        h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
        button: { fontWeight: 600, textTransform: 'none' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                },
                contained: {
                    background: `linear-gradient(135deg, ${COLORS.primary.light} 0%, ${COLORS.secondary.main} 100%)`, // Strict usage
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                }
            }
        }
    }
});

// Dark Theme (Simplified for now, ensuring strict structure)
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: COLORS.primary.light,
        },
        secondary: {
            main: COLORS.secondary.light,
        },
        background: {
            default: '#0a0a0a',
            paper: '#1a1a1a',
            glassCard: 'rgba(0, 0, 0, 0.6)',
            glassInput: 'rgba(255, 255, 255, 0.05)',
            glassBorder: 'rgba(255, 255, 255, 0.1)',
            glassSidebar: 'rgba(0,0,0,0.8)'
        }
    }
});
