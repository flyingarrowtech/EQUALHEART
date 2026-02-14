import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Avatar,
    Stack,
    Divider,
    Button,
    alpha
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

interface MainSidebarProps {
    open: boolean;
    onClose: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ open, onClose }) => {
    const contactItems = [
        { icon: <PhoneIcon />, text: '+91 98765 43210', color: 'primary.main' },
        { icon: <WhatsAppIcon />, text: '+91 98765 43210', color: 'primary.main' },
        { icon: <EmailIcon />, text: 'help@equalheart.com', color: 'primary.main' },
        { icon: <LocationOnIcon />, text: '123, Marriage Avenue, Love City, India', color: 'primary.main' },
    ];

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 400 },
                    bgcolor: 'background.glassSidebar',
                    backdropFilter: 'blur(20px)',
                    borderRight: 1,
                    borderColor: 'background.glassBorder',
                    p: 4,
                }
            }}
        >
            {/* Header / Close Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 4px 12px rgba(233, 30, 99, 0.2)',
                        }}
                    >
                        <FavoriteIcon fontSize="small" />
                    </Box>
                    <Typography
                        variant="h5"
                        fontWeight={900}
                        sx={{
                            fontFamily: '"Outfit", sans-serif',
                            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        EQUALHEART
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'primary.main',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                        '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }
                    }}
                >
                    <CloseIcon fontSize="medium" />
                </IconButton>
            </Box>

            {/* About Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h6" fontWeight={800} color="text.primary" sx={{ mb: 1.5, fontFamily: '"Outfit", sans-serif' }}>
                    The Most Trusted <Box component="span" sx={{ color: 'primary.main' }}>Matrimony</Box>
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.8} sx={{ opacity: 0.8, fontSize: '0.95rem' }}>
                    EqualHeart is the most trusted matrimonial platform for those looking for a life partner. We believe in finding the perfect match with equality and love.
                </Typography>
            </Box>

            {/* Contact Details */}
            <Typography variant="overline" color="text.secondary" fontWeight={900} sx={{ letterSpacing: 1.5, mb: 3, display: 'block' }}>
                GET IN TOUCH
            </Typography>
            <Stack spacing={2.5} sx={{ mb: 6 }}>
                {contactItems.map((item, index) => (
                    <Box
                        key={index}
                        component={motion.div}
                        whileHover={{ x: 5 }}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}
                    >
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 3,
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main',
                                flexShrink: 0
                            }}
                        >
                            {React.cloneElement(item.icon as any, { fontSize: 'small' })}
                        </Box>
                        <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize: '0.95rem' }}>
                            {item.text}
                        </Typography>
                    </Box>
                ))}
            </Stack>

            <Divider sx={{ my: 4, borderColor: 'background.glassBorder' }} />

            {/* Support Team Section */}
            <Box>
                <Typography variant="overline" color="text.secondary" fontWeight={900} sx={{ letterSpacing: 1.5, mb: 3, display: 'block' }}>
                    SUPPORT TEAM
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        p: 2.5,
                        borderRadius: 4,
                        bgcolor: (theme) => alpha(theme.palette.background.glassInput, 0.5),
                        border: 1,
                        borderColor: 'background.glassBorder',
                    }}
                >
                    <Avatar
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                        sx={{ width: 70, height: 70, border: '3px solid white', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary', lineHeight: 1.2, mb: 0.5 }}>
                            Ashley emyy
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, fontWeight: 600 }}>
                            Senior Specialist
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            size="small"
                            sx={{
                                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 700,
                                borderRadius: 100,
                                fontSize: '0.8rem',
                                py: 1,
                                boxShadow: '0 4px 12px rgba(233, 30, 99, 0.2)',
                                '&:hover': {
                                    boxShadow: '0 6px 16px rgba(233, 30, 99, 0.3)',
                                }
                            }}
                        >
                            Ask Advice
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Drawer>
    );
};

export default MainSidebar;
