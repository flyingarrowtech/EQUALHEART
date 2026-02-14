import React from 'react';
import { Box, Typography, Container, Link, IconButton, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer: React.FC = () => {
    const footerLinks = {
        company: [
            { label: 'About Us', href: '/about' },
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Success Stories', href: '/success-stories' },
            { label: 'Blog', href: '/blog' },
        ],
        support: [
            { label: 'Help Center', href: '/help' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Safety Tips', href: '/safety' },
            { label: 'FAQs', href: '/faq' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms & Conditions', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
            { label: 'Refund Policy', href: '/refund' },
        ],
    };

    return (
        <Box
            component={motion.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
                mt: 'auto',
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(180deg, rgba(18,18,18,0.95) 0%, rgba(30,30,30,0.98) 100%)'
                    : 'linear-gradient(180deg, rgba(248,248,250,0.95) 0%, rgba(255,255,255,0.98) 100%)',
                backdropFilter: 'blur(10px)',
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                pt: 6,
                pb: 3,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {/* Brand Section */}
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 21px)' } }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    background: 'linear-gradient(90deg, #D81B60 0%, #8E24AA 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 2,
                                }}
                            >
                                EQUAL<Box component="span" sx={{ color: '#D81B60' }}>HEART</Box>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                                India's most trusted matrimonial platform, powered by AI to help you find your perfect life partner. Join thousands of happy couples who found love through EqualHeart.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, index) => (
                                    <IconButton
                                        key={index}
                                        size="small"
                                        sx={{
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                transform: 'translateY(-2px)',
                                            },
                                            transition: 'all 0.3s',
                                        }}
                                    >
                                        <Icon fontSize="small" />
                                    </IconButton>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* Company Links */}
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 21px)', md: '1 1 calc(16.666% - 21px)' } }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1rem' }}>
                            Company
                        </Typography>
                        {footerLinks.company.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                color="text.secondary"
                                underline="none"
                                display="block"
                                sx={{
                                    mb: 1,
                                    fontSize: '0.875rem',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        color: 'primary.main',
                                        pl: 1,
                                    },
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Box>

                    {/* Support Links */}
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 21px)', md: '1 1 calc(16.666% - 21px)' } }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1rem' }}>
                            Support
                        </Typography>
                        {footerLinks.support.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                color="text.secondary"
                                underline="none"
                                display="block"
                                sx={{
                                    mb: 1,
                                    fontSize: '0.875rem',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        color: 'primary.main',
                                        pl: 1,
                                    },
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Box>

                    {/* Legal Links */}
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 21px)', md: '1 1 calc(16.666% - 21px)' } }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1rem' }}>
                            Legal
                        </Typography>
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                color="text.secondary"
                                underline="none"
                                display="block"
                                sx={{
                                    mb: 1,
                                    fontSize: '0.875rem',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        color: 'primary.main',
                                        pl: 1,
                                    },
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Box>

                    {/* Contact Info */}
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(16.666% - 21px)' } }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1rem' }}>
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5, gap: 1 }}>
                            <EmailIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.3 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                support@equalheart.com
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5, gap: 1 }}>
                            <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.3 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                +91 123 456 7890
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.3 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                Mumbai, Maharashtra, India
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 3, opacity: 0.1 }} />

                {/* Bottom Bar */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.813rem' }}>
                        © {new Date().getFullYear()} EqualHeart Matrimony. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.813rem' }}>
                            Made with
                        </Typography>
                        <FavoriteIcon sx={{ fontSize: 14, color: '#D81B60', animation: 'pulse 2s infinite' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.813rem' }}>
                            in India
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* Pulse animation */}
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.2);
                        }
                    }
                `}
            </style>
        </Box>
    );
};

export default Footer;
