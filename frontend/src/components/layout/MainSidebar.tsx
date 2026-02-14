import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Avatar,
    Stack,
    Divider,
    Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface MainSidebarProps {
    open: boolean;
    onClose: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ open, onClose }) => {
    const mainColor = '#B88E2F'; // Gold/Premium color

    const contactItems = [
        { icon: <PhoneIcon />, text: '+91 98765 43210', bgcolor: '#512da8' },
        { icon: <WhatsAppIcon />, text: '+91 98765 43210', bgcolor: '#512da8' },
        { icon: <EmailIcon />, text: 'help@equalheart.com', bgcolor: '#512da8' },
        { icon: <LocationOnIcon />, text: '123, Marriage Avenue, Love City, India', bgcolor: '#512da8' },
    ];

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 400 }, p: 3 }
            }}
        >
            {/* Header / Close Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: mainColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                        }}
                    >
                        <FavoriteIcon fontSize="small" />
                    </Box>
                    <Typography variant="h6" fontWeight={800} sx={{ fontFamily: '"Cinzel", serif' }}>
                        EQUAL<Box component="span" sx={{ color: mainColor }}>HEART</Box>
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: '#e91e63' }}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </Box>

            {/* About Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                    Best <Box component="span" sx={{ color: mainColor }}>EqualHeart</Box> Matrimony
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                    EqualHeart is the most trusted matrimonial platform for those looking for a life partner. We believe in finding the perfect match with equality and love. Our platform is secure, easy to use, and verified.
                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Contact Details */}
            <Stack spacing={2} sx={{ mb: 4 }}>
                {contactItems.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                bgcolor: item.bgcolor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                flexShrink: 0
                            }}
                        >
                            {React.cloneElement(item.icon as any, { fontSize: 'small' })}
                        </Box>
                        <Typography variant="body2" fontWeight={500} color="text.primary">
                            {item.text}
                        </Typography>
                    </Box>
                ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Support Team Section (Reused Style) */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing={1} display="block" mb={2} align="left">
                    SUPPORT TEAM
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, textAlign: 'left' }}>
                    <Avatar
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                        sx={{ width: 80, height: 80, border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    />
                    <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#333', lineHeight: 1.2 }}>
                            Ashley emyy
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Senior personal advisor
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                bgcolor: '#546e7a',
                                color: 'white',
                                textTransform: 'none',
                                px: 2,
                                borderRadius: 1,
                                fontSize: '0.75rem',
                                '&:hover': { bgcolor: '#455a64' }
                            }}
                        >
                            Ask your doubts
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Drawer>
    );
};

export default MainSidebar;
