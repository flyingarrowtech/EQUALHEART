import React from 'react';
import { Container, Typography, Box, Paper, Chip, Divider, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BlogPost: React.FC = () => {
    const navigate = useNavigate();

    // Mock data - normally fetched via API
    const post = {
        title: '10 Tips for Finding Your Perfect Match Online',
        category: 'Dating Tips',
        author: 'Priya Sharma',
        date: 'February 10, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80',
        content: `
Finding your perfect life partner online can seem daunting, but with the right approach, it can be an exciting and rewarding journey. Here are our top 10 tips to help you succeed:

## 1. Create an Authentic Profile
Be honest and genuine in your profile. Authenticity attracts the right kind of people who will appreciate you for who you truly are. Don't try to be someone you're not – the right person will love the real you.

## 2. Use High-Quality Photos
Your photos are the first thing potential matches will see. Use clear, recent photos that show your personality. Include a mix of close-ups and full-body shots, and make sure you're smiling!

## 3. Be Specific About What You Want
Don't be vague about your preferences. The more specific you are about what you're looking for, the better the algorithm can match you with compatible partners.

## 4. Take Your Time
Don't rush into anything. Take time to get to know potential matches through messaging before meeting in person. Building a strong foundation through communication is key.

## 5. Ask Meaningful Questions
Go beyond small talk. Ask questions that reveal values, life goals, and compatibility. This helps you understand if you're truly compatible beyond surface-level attraction.

## 6. Stay Safe
Always prioritize your safety. Meet in public places for first dates, tell someone where you're going, and trust your instincts. Never share sensitive personal information too early.

## 7. Be Patient and Persistent
Finding the right match takes time. Don't get discouraged if you don't find someone immediately. Stay positive and keep putting yourself out there.

## 8. Communicate Clearly
Be clear about your intentions and expectations. Good communication from the start helps avoid misunderstandings and ensures you're both on the same page.

## 9. Stay Positive
Maintain a positive attitude throughout your search. Positivity is attractive and will help you enjoy the journey, even when facing setbacks.

## 10. Trust the Process
Trust that the right person will come along at the right time. Use EqualHeart's AI-powered matching to help you find compatible partners, and trust that the process works.

---
Remember, finding love online is a journey, not a race. Take your time, be yourself, and trust that EqualHeart will help you find your perfect match. Good luck!
        `
    };

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <Box sx={{ height: 400, position: 'relative', overflow: 'hidden' }}>
                <Box
                    component="img"
                    src={post.image}
                    alt={post.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)' }} />
                <Container maxWidth="md" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, pb: 6, color: 'white' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/blog')}
                        sx={{ color: 'white', mb: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                    >
                        Back to Blog
                    </Button>
                    <Chip label={post.category} color="primary" sx={{ mb: 2 }} />
                    <Typography variant="h3" fontWeight="900" sx={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                        {post.title}
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ mt: -4, position: 'relative', zIndex: 2 }}>
                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: '0 4px 25px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, pb: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48 }}>{post.author[0]}</Avatar>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">{post.author}</Typography>
                                <Typography variant="caption" color="text.secondary">{post.date}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                            <AccessTimeIcon fontSize="small" />
                            <Typography variant="body2">{post.readTime}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{
                        typography: 'body1',
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: 'text.primary',
                        '& h2': {
                            fontSize: '1.75rem',
                            fontWeight: 800,
                            mt: 5,
                            mb: 2,
                            color: '#1a1a1a'
                        },
                        '& p': { mb: 3 }
                    }}>
                        {post.content.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('## ')) {
                                return <Typography key={index} variant="h5" component="h2">{paragraph.replace('## ', '')}</Typography>;
                            } else if (paragraph.trim() === '---') {
                                return <Divider key={index} sx={{ my: 5 }} />;
                            } else if (paragraph.trim()) {
                                return <Typography key={index} paragraph>{paragraph}</Typography>;
                            }
                            return null;
                        })}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default BlogPost;
