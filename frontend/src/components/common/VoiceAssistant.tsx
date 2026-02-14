import React, { useState, useEffect } from 'react';
import {
    Fab, Zoom, Paper, Typography,
    Box, Tooltip
} from '@mui/material';
import { Mic as MicIcon, MicOff as MicOffIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [showBubble, setShowBubble] = useState(false);
    const navigate = useNavigate();

    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        if (!recognition) return;

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            const command = event.results[0][0].transcript.toLowerCase();
            setTranscript(command);
            handleCommand(command);
        };

        recognition.onend = () => {
            setIsListening(false);
            setTimeout(() => setShowBubble(false), 3000);
        };
    }, []);

    const handleCommand = (command: string) => {
        if (command.includes('dashboard') || command.includes('home')) {
            navigate('/dashboard');
        } else if (command.includes('search') || command.includes('matches')) {
            navigate('/search');
        } else if (command.includes('profile') || command.includes('edit')) {
            navigate('/profile/edit');
        } else if (command.includes('verify') || command.includes('identity')) {
            navigate('/profile/verify');
        } else if (command.includes('virtual') || command.includes('date')) {
            navigate('/virtual-date');
        }
    };

    const toggleListening = () => {
        if (!recognition) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            setTranscript('');
            setShowBubble(true);
            setIsListening(true);
            recognition.start();
        }
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 30, right: 30, zIndex: 2000 }}>
            <Zoom in={showBubble}>
                <Paper
                    elevation={6}
                    sx={{
                        p: 2, mb: 2,
                        borderRadius: 3,
                        minWidth: 200,
                        textAlign: 'center',
                        bgcolor: 'primary.main',
                        color: 'white'
                    }}
                >
                    <Typography variant="caption" fontWeight={700}>VOICE ASSISTANT</Typography>
                    <Typography variant="body2">{transcript || (isListening ? 'Listening...' : 'Try "Go to Search"')}</Typography>
                </Paper>
            </Zoom>

            <Tooltip title="Voice Assistant">
                <Fab
                    color={isListening ? "secondary" : "primary"}
                    onClick={toggleListening}
                    sx={{ transition: '0.3s' }}
                >
                    {isListening ? <MicIcon /> : <MicOffIcon />}
                </Fab>
            </Tooltip>
        </Box>
    );
};

export default VoiceAssistant;
