import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Badge,
    IconButton,
} from '@mui/material';
import {
    Search,
    Phone,
    VideoCall,
    MoreVert,
    AttachFile,
    EmojiEmotions,
    Send,
    ArrowBack,
} from '@mui/icons-material';

// Mock Data
const MOCK_CHATS = [
    {
        id: 1,
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        lastMessage: 'Hey, are you free this weekend?',
        time: '10:30 AM',
        unread: 2,
        online: true,
    },
    {
        id: 2,
        name: 'Rahul Verma',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        lastMessage: 'That sounds great!',
        time: 'Yesterday',
        unread: 0,
        online: false,
    },
    {
        id: 3,
        name: 'Anjali Gupta',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        lastMessage: 'Let me check my schedule.',
        time: 'Yesterday',
        unread: 0,
        online: true,
    },
];

const MOCK_MESSAGES = [
    { id: 1, sender: 'them', text: 'Hi there! I saw your profile and found it really interesting.', time: '10:00 AM' },
    { id: 2, sender: 'me', text: 'Hello! Thanks, I liked your profile too. How are you?', time: '10:05 AM' },
    { id: 3, sender: 'them', text: 'I am doing good, thanks for asking! Are you currently in Mumbai?', time: '10:15 AM' },
    { id: 4, sender: 'them', text: 'Yes, I live in Bandra. What about you?', time: '10:30 AM' },
];

const Messages: React.FC = () => {
    const [selectedChatId, setSelectedChatId] = useState<number | null>(1);
    const [messageInput, setMessageInput] = useState('');

    const activeChat = MOCK_CHATS.find((c) => c.id === selectedChatId);

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
            {/* Header Background */}
            <Box sx={{ height: 120, background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)', pt: 4, px: 4 }}>
                <Container maxWidth="xl">
                    <Typography variant="h5" color="white" fontWeight={700}>
                        Messages
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ flex: 1, display: 'flex', mt: -6, mb: 4 }}>
                <Paper
                    elevation={3}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        borderRadius: 4,
                        overflow: 'hidden',
                        bgcolor: 'white',
                        height: 'calc(100vh - 140px)',
                        minHeight: 600,
                    }}
                >
                    {/* Sidebar */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 360 },
                            borderRight: '1px solid',
                            borderColor: 'divider',
                            display: { xs: selectedChatId ? 'none' : 'flex', md: 'flex' },
                            flexDirection: 'column',
                            bgcolor: '#fff',
                        }}
                    >
                        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <TextField
                                fullWidth
                                placeholder="Search conversations..."
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search color="action" />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 3, bgcolor: '#f5f5f5' },
                                }}
                            />
                        </Box>

                        <List sx={{ flex: 1, overflowY: 'auto' }}>
                            {MOCK_CHATS.map((chat) => (
                                <ListItem key={chat.id} disablePadding>
                                    <ListItemButton
                                        selected={selectedChatId === chat.id}
                                        onClick={() => setSelectedChatId(chat.id)}
                                        sx={{
                                            px: 3,
                                            py: 2,
                                            '&.Mui-selected': { bgcolor: 'rgba(233, 30, 99, 0.08)', borderLeft: '4px solid #e91e63' },
                                            '&.Mui-selected:hover': { bgcolor: 'rgba(233, 30, 99, 0.12)' },
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Badge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                                color="success"
                                                invisible={!chat.online}
                                                sx={{
                                                    '& .MuiBadge-badge': {
                                                        border: '2px solid white',
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: '50%',
                                                    },
                                                }}
                                            >
                                                <Avatar src={chat.avatar} alt={chat.name} />
                                            </Badge>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="subtitle2" fontWeight={700}>
                                                        {chat.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {chat.time}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography
                                                        variant="body2"
                                                        color={chat.unread ? 'text.primary' : 'text.secondary'}
                                                        fontWeight={chat.unread ? 600 : 400}
                                                        noWrap
                                                        sx={{ maxWidth: '80%' }}
                                                    >
                                                        {chat.lastMessage}
                                                    </Typography>
                                                    {chat.unread > 0 && (
                                                        <Badge badgeContent={chat.unread} color="error" sx={{ mr: 1 }} />
                                                    )}
                                                </Box>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* Chat Area */}
                    <Box
                        sx={{
                            flex: 1,
                            display: { xs: selectedChatId ? 'flex' : 'none', md: 'flex' },
                            flexDirection: 'column',
                            bgcolor: '#fafafa',
                        }}
                    >
                        {selectedChatId && activeChat ? (
                            <>
                                {/* Chat Header */}
                                <Box
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        bgcolor: 'white',
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <IconButton
                                            onClick={() => setSelectedChatId(null)}
                                            sx={{ display: { md: 'none' } }}
                                        >
                                            <ArrowBack />
                                        </IconButton>
                                        <Avatar src={activeChat.avatar} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight={700}>
                                                {activeChat.name}
                                            </Typography>
                                            <Typography variant="caption" color="success.main" fontWeight={600}>
                                                {activeChat.online ? 'Online' : 'Offline'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <IconButton color="primary">
                                            <Phone />
                                        </IconButton>
                                        <IconButton color="primary">
                                            <VideoCall />
                                        </IconButton>
                                        <IconButton>
                                            <MoreVert />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* Messages Feed */}
                                <Box sx={{ flex: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {MOCK_MESSAGES.map((msg) => (
                                        <Box
                                            key={msg.id}
                                            sx={{
                                                alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                                                maxWidth: '70%',
                                            }}
                                        >
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: 2,
                                                    bgcolor: msg.sender === 'me' ? '#e91e63' : 'white',
                                                    color: msg.sender === 'me' ? 'white' : 'text.primary',
                                                    borderRadius: 3,
                                                    borderTopLeftRadius: msg.sender === 'me' ? 3 : 0,
                                                    borderTopRightRadius: msg.sender === 'me' ? 0 : 3,
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                }}
                                            >
                                                <Typography variant="body1">{msg.text}</Typography>
                                            </Paper>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ mt: 0.5, display: 'block', textAlign: msg.sender === 'me' ? 'right' : 'left' }}
                                            >
                                                {msg.time}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Input Area */}
                                <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <IconButton>
                                            <AttachFile />
                                        </IconButton>
                                        <TextField
                                            fullWidth
                                            placeholder="Type a message..."
                                            variant="outlined"
                                            size="small"
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 4,
                                                    bgcolor: '#f5f5f5',
                                                    '& fieldset': { border: 'none' },
                                                },
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton size="small">
                                                        <EmojiEmotions />
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                        <IconButton
                                            sx={{
                                                bgcolor: '#e91e63',
                                                color: 'white',
                                                '&:hover': { bgcolor: '#c2185b' },
                                            }}
                                        >
                                            <Send />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    color: 'text.secondary',
                                }}
                            >
                                <Avatar sx={{ width: 80, height: 80, bgcolor: '#f0f0f0', mb: 2 }}>
                                    <Send sx={{ fontSize: 40, color: '#bdbdbd' }} />
                                </Avatar>
                                <Typography variant="h6">Select a conversation</Typography>
                                <Typography variant="body2">Choose a chat to start messaging</Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Messages;
