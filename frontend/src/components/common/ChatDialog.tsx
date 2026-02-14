import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box, Typography, Avatar,
    IconButton, List, ListItem,
    Chip, CircularProgress
} from '@mui/material';
import {
    Mic as VoiceIcon, Videocam as VideoIcon,
    Send as SendIcon, AutoAwesome as AIIcon
} from '@mui/icons-material';
import userApi from '../../api/userApi';

interface ChatDialogProps {
    open: boolean;
    onClose: () => void;
    partner: any;
}

const ChatDialog: React.FC<ChatDialogProps> = ({ open, onClose, partner }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [iceBreakers, setIceBreakers] = useState<string[]>([]);
    const [loadingAI, setLoadingAI] = useState(false);

    const fetchIceBreakers = async () => {
        setLoadingAI(true);
        try {
            const res = await userApi.getIceBreakers(partner._id);
            setIceBreakers(res.data);
        } catch (err) {
            console.error('Failed to fetch icebreakers', err);
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSend = () => {
        if (!message) return;
        setMessages([...messages, { from: 'me', text: message, time: new Date() }]);
        setMessage('');
        // Log behavior for AI
        userApi.logBehavior(partner._id, 'Message');
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4 } }}>
            <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={partner.photos?.[0]?.url} sx={{ mr: 2 }} />
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700 }}>{partner.fullName?.firstName}</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>Online</Typography>
                    </Box>
                </Box>
                <Box>
                    <IconButton size="small" sx={{ color: 'white' }} onClick={() => window.location.href = '/virtual-date'}><VideoIcon /></IconButton>
                    <IconButton size="small" sx={{ color: 'white' }}><VoiceIcon /></IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ minHeight: '300px', display: 'flex', flexDirection: 'column', p: 0 }}>
                {/* AI Ice Breakers */}
                <Box sx={{ p: 2, bgcolor: '#f0f4f8', borderBottom: '1px solid #ddd' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AIIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                        <Typography variant="caption" fontWeight={700} color="primary">AI CONVERSATION STARTERS</Typography>
                    </Box>
                    {iceBreakers.length === 0 ? (
                        <Button size="small" onClick={fetchIceBreakers} disabled={loadingAI}>
                            {loadingAI ? <CircularProgress size={20} /> : 'Suggest Ice Breakers'}
                        </Button>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {iceBreakers.map((ib, i) => (
                                <Chip
                                    key={i}
                                    label={ib}
                                    size="small"
                                    onClick={() => setMessage(ib)}
                                    sx={{ bgcolor: 'white', cursor: 'pointer' }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>

                <List sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                    {messages.map((m, i) => (
                        <ListItem key={i} sx={{ justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                            <Box sx={{
                                p: 1.5,
                                borderRadius: m.from === 'me' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                bgcolor: m.from === 'me' ? 'primary.main' : '#eee',
                                color: m.from === 'me' ? 'white' : 'black',
                                maxWidth: '80%'
                            }}>
                                <Typography variant="body2">{m.text}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>

            <DialogActions sx={{ p: 2, borderTop: '1px solid #ddd' }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <IconButton color="primary" onClick={handleSend} disabled={!message}><SendIcon /></IconButton>
            </DialogActions>
        </Dialog>
    );
};

export default ChatDialog;
