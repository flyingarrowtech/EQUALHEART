import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Badge } from '@mui/material';
import { motion } from 'framer-motion';

interface ChatListCardProps {
    chats: Array<{
        id: number;
        name: string;
        avatar: string;
        lastMessage?: string;
        timestamp: string;
        online: boolean;
        unread?: number;
    }>;
    onChatClick?: (chatId: number) => void;
}

const ChatListCard: React.FC<ChatListCardProps> = ({ chats, onChatClick }) => {
    return (
        <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                height: '100%',
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Recent chat list
                </Typography>

                <List sx={{ p: 0 }}>
                    {chats.map((chat) => (
                        <ListItem
                            key={chat.id}
                            onClick={() => onChatClick?.(chat.id)}
                            sx={{
                                px: 2,
                                py: 1.5,
                                borderRadius: 2,
                                mb: 1,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    bgcolor: 'rgba(233, 30, 99, 0.05)',
                                },
                            }}
                        >
                            <ListItemAvatar>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            bgcolor: chat.online ? '#4caf50' : '#9e9e9e',
                                            width: 12,
                                            height: 12,
                                            borderRadius: '50%',
                                            border: '2px solid white',
                                        },
                                    }}
                                >
                                    <Avatar src={chat.avatar} sx={{ width: 48, height: 48 }} />
                                </Badge>
                            </ListItemAvatar>

                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {chat.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {chat.timestamp}
                                        </Typography>
                                    </Box>
                                }
                                secondary={
                                    chat.lastMessage && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                mt: 0.5,
                                            }}
                                        >
                                            {chat.lastMessage}
                                        </Typography>
                                    )
                                }
                            />

                            {chat.unread && chat.unread > 0 && (
                                <Box
                                    sx={{
                                        minWidth: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        bgcolor: '#e91e63',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        ml: 1,
                                    }}
                                >
                                    {chat.unread}
                                </Box>
                            )}
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default ChatListCard;
