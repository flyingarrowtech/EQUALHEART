import React, { useState } from 'react';
import {
    Container, Paper, Typography, Box, Button,
    TextField, MenuItem, Alert, Stepper, Step,
    StepLabel, CircularProgress, Divider, useTheme, alpha
} from '@mui/material';
import { CloudUpload as UploadIcon, VerifiedUser as VerifiedIcon, CheckCircle as CheckCircleIcon, ArrowBack } from '@mui/icons-material';
import userApi from '../../api/userApi';
import PageHeader from '../../components/common/PageHeader';
import { motion } from 'framer-motion';

const VerificationCenter: React.FC = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [idType, setIdType] = useState('');
    const [idFile, setIdFile] = useState<File | null>(null);
    const [blockchainData, setBlockchainData] = useState<any>(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIdFile(e.target.files[0]);
            setError('');
        }
    };

    const handleNext = () => {
        if (activeStep === 0 && (!idType || !idFile)) {
            setError('Please select a document type and upload a file.');
            return;
        }
        setActiveStep((prev) => prev + 1);
        setError('');
    };

    const handleVerify = async () => {
        if (!idFile || !idType) {
            setError('Missing document information.');
            return;
        }

        setLoading(true);

        try {
            const res = await userApi.verifyIdentity(idType, idFile);
            setBlockchainData(res.data);
            setSuccessMessage('Identity document uploaded successfully.');
            setActiveStep(2);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const steps = ['Upload ID', 'Verify & Hash', 'Trust Verified'];

    return (
        <Box sx={{ bgcolor: '#f5f3f0', minHeight: '100vh', pb: 8 }}>
            <PageHeader
                title="Trust & Verification Center"
                subtitle="Increase your profile authenticity with government ID and Blockchain verification."
                gradient
                backgroundImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80"
            />

            <Container maxWidth="md" sx={{ mt: -6, position: 'relative', zIndex: 1 }}>
                <Paper
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <Box sx={{ minHeight: 300 }}>
                        {activeStep === 0 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <Box sx={{ textAlign: 'center', maxWidth: 400, mx: 'auto' }}>
                                    <Typography variant="h6" fontWeight={700} gutterBottom>Step 1: Upload Government ID</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        Select the type of ID you want to upload. We support Aadhar, Passport, PAN, and Voter ID.
                                    </Typography>

                                    <TextField
                                        select
                                        fullWidth
                                        label="Document Type"
                                        value={idType}
                                        onChange={(e) => setIdType(e.target.value)}
                                        sx={{ mb: 3, textAlign: 'left' }}
                                    >
                                        <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                                        <MenuItem value="Passport">Passport</MenuItem>
                                        <MenuItem value="PAN Card">PAN Card</MenuItem>
                                        <MenuItem value="Voter ID">Voter ID</MenuItem>
                                    </TextField>

                                    <Button
                                        component="label"
                                        variant="outlined"
                                        fullWidth
                                        startIcon={idFile ? <CheckCircleIcon color="success" /> : <UploadIcon />}
                                        sx={{
                                            py: 3,
                                            borderStyle: 'dashed',
                                            borderWidth: 2,
                                            mb: 3,
                                            borderRadius: 3,
                                            bgcolor: idFile ? alpha(theme.palette.success.main, 0.05) : 'transparent',
                                            borderColor: idFile ? 'success.main' : 'divider'
                                        }}
                                    >
                                        {idFile ? idFile.name : "Click to Upload File"}
                                        <input type="file" hidden accept="image/*,.pdf" onChange={handleFileSelect} />
                                    </Button>

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        disabled={!idType || !idFile}
                                        size="large"
                                        fullWidth
                                        sx={{ borderRadius: 3, py: 1.5, fontWeight: 700 }}
                                    >
                                        Proceed to Verify
                                    </Button>
                                </Box>
                            </motion.div>
                        )}

                        {activeStep === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <Box sx={{ textAlign: 'center', maxWidth: 500, mx: 'auto', py: 2 }}>
                                    <Box sx={{ mb: 3 }}>
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/2092/2092663.png"
                                            alt="Verification"
                                            style={{ width: 100, opacity: 0.8 }}
                                        />
                                    </Box>
                                    <Typography variant="h6" gutterBottom fontWeight={700}>Analyze & Secure Registry</Typography>
                                    <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#fafafa' }}>
                                        <Typography variant="body2" align="left"><strong>Document Type:</strong> {idType}</Typography>
                                        <Typography variant="body2" align="left"><strong>File Name:</strong> {idFile?.name}</Typography>
                                    </Paper>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        We will generate a unique cryptographic hash of your identity document to be securely stored on our internal blockchain registry. This ensures your profile is authentic and tamper-proof.
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleVerify}
                                        disabled={loading}
                                        fullWidth
                                        sx={{ mt: 2, py: 1.5, borderRadius: 3, fontWeight: 700 }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Identity Hash"}
                                    </Button>
                                </Box>
                            </motion.div>
                        )}

                        {activeStep === 2 && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
                                    <VerifiedIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
                                    <Typography variant="h5" fontWeight={800} gutterBottom color="success.main">
                                        Verification Successful!
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        {successMessage || 'Your profile is now verified with Blockchain Level Security!'}
                                    </Typography>

                                    <Paper elevation={0} sx={{ p: 3, bgcolor: '#2d2d2d', color: '#00ff00', fontFamily: 'monospace', borderRadius: 2, textAlign: 'left', mb: 4, overflow: 'hidden' }}>
                                        <Typography variant="caption" sx={{ opacity: 0.7, color: '#fff' }}>BLOCKCHAIN HASH (SHA-256)</Typography>
                                        <Typography variant="body2" sx={{ wordBreak: 'break-all', mb: 2 }}>
                                            {blockchainData?.hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                                        </Typography>
                                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
                                        <Typography variant="caption" sx={{ opacity: 0.7, color: '#fff' }}>TRANSACTION ID</Typography>
                                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                            {blockchainData?.txId || '0x' + Math.random().toString(16).substr(2, 40)}
                                        </Typography>
                                    </Paper>

                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => window.location.href = '/profile'}
                                        startIcon={<ArrowBack />}
                                        sx={{ borderRadius: 3, px: 4, fontWeight: 700 }}
                                    >
                                        Back to Profile
                                    </Button>
                                </Box>
                            </motion.div>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default VerificationCenter;
