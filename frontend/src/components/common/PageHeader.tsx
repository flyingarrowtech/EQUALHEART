import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, Button } from '@mui/material';
import { NavigateNext, Home } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: Array<{ label: string; path?: string }>;
    ctaButton?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
    gradient?: boolean;
    backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle,
    breadcrumbs,
    ctaButton,
    gradient = true,
    backgroundImage,
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                py: { xs: 8, md: 12 },
                background: gradient
                    ? 'linear-gradient(135deg, rgba(233, 30, 99, 0.9) 0%, rgba(156, 39, 176, 0.9) 100%)'
                    : '#f5f3f0',
                color: gradient ? 'white' : 'text.primary',
                overflow: 'hidden',
                ...(backgroundImage && {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }),
            }}
        >
            {/* Background overlay if image is used */}
            {backgroundImage && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: gradient
                            ? 'linear-gradient(135deg, rgba(233, 30, 99, 0.9) 0%, rgba(156, 39, 176, 0.9) 100%)'
                            : 'rgba(0, 0, 0, 0.5)',
                        zIndex: 0,
                    }}
                />
            )}

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <Breadcrumbs
                        separator={<NavigateNext fontSize="small" />}
                        sx={{
                            mb: 3,
                            '& .MuiBreadcrumbs-separator': {
                                color: gradient ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                            },
                        }}
                    >
                        <Link
                            component={RouterLink}
                            to="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                color: gradient ? 'rgba(255,255,255,0.9)' : 'text.secondary',
                                textDecoration: 'none',
                                '&:hover': {
                                    color: gradient ? 'white' : 'primary.main',
                                },
                            }}
                        >
                            <Home fontSize="small" />
                            Home
                        </Link>
                        {breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return crumb.path && !isLast ? (
                                <Link
                                    key={index}
                                    component={RouterLink}
                                    to={crumb.path}
                                    sx={{
                                        color: gradient ? 'rgba(255,255,255,0.9)' : 'text.secondary',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            color: gradient ? 'white' : 'primary.main',
                                        },
                                    }}
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <Typography
                                    key={index}
                                    sx={{
                                        color: gradient ? 'white' : 'text.primary',
                                        fontWeight: 600,
                                    }}
                                >
                                    {crumb.label}
                                </Typography>
                            );
                        })}
                    </Breadcrumbs>
                )}

                {/* Title and Subtitle */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 3,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                fontWeight: 900,
                                mb: subtitle ? 2 : 0,
                                textShadow: gradient ? '0 2px 10px rgba(0,0,0,0.2)' : 'none',
                            }}
                        >
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.25rem' },
                                    fontWeight: 500,
                                    opacity: gradient ? 0.95 : 0.8,
                                    maxWidth: 600,
                                }}
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>

                    {/* CTA Button */}
                    {ctaButton && (
                        <Box
                            component={motion.div}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={ctaButton.onClick}
                                startIcon={ctaButton.icon}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    background: gradient ? 'white' : 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
                                    color: gradient ? '#9c27b0' : 'white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    '&:hover': {
                                        background: gradient ? 'rgba(255,255,255,0.95)' : 'linear-gradient(135deg, #c2185b 0%, #7b1fa2 100%)',
                                        boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                                    },
                                }}
                            >
                                {ctaButton.label}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default PageHeader;
