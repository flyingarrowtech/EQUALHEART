import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    React.useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
};

const stats = [
    {
        value: 10000,
        suffix: '+',
        label: 'Happy Couples',
        color: '#e91e63',
    },
    {
        value: 50,
        suffix: '+',
        label: 'Countries',
        color: '#9c27b0',
    },
    {
        value: 98,
        suffix: '%',
        label: 'Success Rate',
        color: '#4caf50',
    },
    {
        value: 24,
        suffix: '/7',
        label: 'Support',
        color: '#ff9800',
    },
];

const StatsSection: React.FC = () => {
    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.1,
                },
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: 4,
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {stats.map((stat, index) => (
                        <Box
                            key={stat.label}
                            component={motion.div}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            sx={{
                                textAlign: 'center',
                                p: 4,
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    boxShadow: `0 12px 40px ${stat.color}40`,
                                },
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 900,
                                    color: 'white',
                                    mb: 1,
                                    fontSize: { xs: '2.5rem', md: '3rem' },
                                    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                }}
                            >
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'white',
                                    fontWeight: 600,
                                    opacity: 0.95,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                }}
                            >
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default StatsSection;
