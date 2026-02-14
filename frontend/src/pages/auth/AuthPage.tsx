import React from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { useAuthStore } from '../../store/useAuthStore';

const AuthPage: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuthStore();
    const isLogin = location.pathname === '/login';
    const isRegister = location.pathname === '/register';

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    if (!isLogin && !isRegister) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.9) 0%, rgba(156, 39, 176, 0.9) 100%)',
                backgroundImage: 'url(https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                position: 'relative',
                overflow: 'hidden',
                p: 2,
            }}
        >
            {/* Animated Background Elements */}
            <Box
                component={motion.div}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                sx={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />
            <Box
                component={motion.div}
                animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                sx={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={isLogin ? 'login' : 'register'}
                    initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                >
                    {isLogin ? <Login /> : <Register />}
                </motion.div>
            </AnimatePresence>
        </Box>
    );
};

export default AuthPage;
