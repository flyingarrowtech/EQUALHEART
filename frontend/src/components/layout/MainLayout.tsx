import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useTheme, Toolbar } from '@mui/material';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteBanner from './QuoteBanner';
import VoiceAssistant from '../common/VoiceAssistant';

const MainLayout: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default
            }}
        >
            <Navbar />
            <QuoteBanner />

            <Box
                component={motion.main}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <Toolbar /> {/* Spacer for fixed Navbar */}
                <Box
                    sx={{
                        flexGrow: 1,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>

            <Footer />
            <VoiceAssistant />
        </Box>
    );
};

export default MainLayout;
