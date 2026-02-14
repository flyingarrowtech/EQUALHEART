import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Chip, TextField, InputAdornment, Button, Card, CardContent, CardMedia, CardActionArea, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PageHeader from '../../components/common/PageHeader';

const blogPosts = [
    {
        slug: 'finding-perfect-match-online',
        title: '10 Tips for Finding Your Perfect Match Online',
        excerpt: 'Discover the secrets to successful online matchmaking and how to make your profile stand out from the crowd.',
        category: 'Dating Tips',
        author: 'Priya Sharma',
        date: 'Feb 10, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80'
    },
    {
        slug: 'first-meeting-safety-guide',
        title: 'First Meeting Safety Guide: What You Need to Know',
        excerpt: 'Essential safety tips for your first in-person meeting with someone you met online. Stay safe while finding love!',
        category: 'Safety',
        author: 'Rahul Verma',
        date: 'Feb 8, 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80'
    },
    {
        slug: 'creating-attractive-profile',
        title: 'Creating an Attractive Profile: Do\'s and Don\'ts',
        excerpt: 'Learn how to create a profile that attracts the right matches and showcases your best qualities.',
        category: 'Profile Tips',
        author: 'Ananya Patel',
        date: 'Feb 5, 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80'
    },
    {
        slug: 'understanding-compatibility',
        title: 'Understanding Compatibility: Beyond the Basics',
        excerpt: 'What makes two people truly compatible? Explore the science and art of finding your perfect match.',
        category: 'Relationships',
        author: 'Dr. Vikram Singh',
        date: 'Feb 1, 2026',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80'
    },
    {
        slug: 'long-distance-relationships',
        title: 'Making Long-Distance Relationships Work',
        excerpt: 'Practical advice for maintaining a strong connection when you and your partner are miles apart.',
        category: 'Relationships',
        author: 'Sneha Reddy',
        date: 'Jan 28, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80'
    },
    {
        slug: 'family-approval-tips',
        title: 'Getting Family Approval: A Modern Approach',
        excerpt: 'Navigate the delicate balance between modern dating and traditional family values with these helpful tips.',
        category: 'Family',
        author: 'Arjun Malhotra',
        date: 'Jan 25, 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80'
    }
];

const categories = ['All', 'Dating Tips', 'Safety', 'Profile Tips', 'Relationships', 'Family'];

const Blog: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredPosts = selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Relationship Advice & Tips"
                subtitle="Expert insights to help you navigate your journey to love."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1516575543590-7bad101b353d?w=1920&q=80"
            />

            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 100 }}>
                {/* Search & Filter */}
                <Paper elevation={0} sx={{ p: 3, mb: 6, borderRadius: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ flex: 1, width: '100%' }}>
                        <TextField
                            fullWidth
                            placeholder="Search articles..."
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
                                sx: { borderRadius: 3 }
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                        {categories.map((category) => (
                            <Chip
                                key={category}
                                label={category}
                                onClick={() => setSelectedCategory(category)}
                                color={selectedCategory === category ? 'primary' : 'default'}
                                variant={selectedCategory === category ? 'filled' : 'outlined'}
                                sx={{ fontWeight: '600' }}
                            />
                        ))}
                    </Box>
                </Paper>

                {/* Blog Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(3, 1fr)' },
                        gap: 4,
                        mt: 4,
                    }}
                >
                    {filteredPosts.map((post, index) => (
                        <Card
                            key={index}
                            elevation={0}
                            sx={{
                                height: '100%',
                                borderRadius: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <CardActionArea onClick={() => navigate(`/blog/${post.slug}`)} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={post.image}
                                    alt={post.title}
                                />
                                <CardContent sx={{ flex: 1, width: '100%', p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Chip label={post.category} size="small" color="primary" sx={{ borderRadius: 1 }} />
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <AccessTimeIcon sx={{ fontSize: 14 }} /> {post.readTime}
                                        </Typography>
                                    </Box>

                                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ lineHeight: 1.3, mb: 1 }}>
                                        {post.title}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {post.excerpt}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 'auto' }}>
                                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.8rem' }}>{post.author[0]}</Avatar>
                                        <Box>
                                            <Typography variant="caption" display="block" fontWeight="600">{post.author}</Typography>
                                            <Typography variant="caption" display="block" color="text.secondary">{post.date}</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>

                <Box textAlign="center" mt={6}>
                    <Button variant="outlined" size="large" sx={{ borderRadius: 3, px: 4, textTransform: 'none', fontWeight: 'bold' }}>
                        Load More Articles
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Blog;
