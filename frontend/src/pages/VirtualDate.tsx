import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float, MeshDistortMaterial } from '@react-three/drei';
import { Box, Typography, Container, Paper, IconButton } from '@mui/material';
import { Videocam, Mic, Close } from '@mui/icons-material';

const Scene = () => {
    return (
        <>
            <OrbitControls enablePan={false} minDistance={5} maxDistance={15} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[-2, 0, 0]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <MeshDistortMaterial color="#ff4081" speed={3} distort={0.4} />
                </mesh>
                <Text
                    position={[-2, -1.5, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    YOU
                </Text>
            </Float>

            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[2, 0, 0]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <MeshDistortMaterial color="#3f51b5" speed={3} distort={0.4} />
                </mesh>
                <Text
                    position={[2, -1.5, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    MATCH
                </Text>
            </Float>
        </>
    );
};

const VirtualDate: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: '80vh' }}>
            <Paper elevation={10} sx={{ height: '100%', borderRadius: 4, overflow: 'hidden', position: 'relative', bgcolor: '#0a192f' }}>
                <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: 'white' }}>
                    <Typography variant="h5" fontWeight={700}>Virtual Date Room</Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">Experience an immersive remote meeting</Typography>
                </Box>

                <Canvas camera={{ position: [0, 0, 8] }}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>

                <Box sx={{
                    position: 'absolute',
                    bottom: 30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: 'flex',
                    gap: 3,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    p: 2,
                    borderRadius: 10,
                    backdropFilter: 'blur(10px)'
                }}>
                    <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}><Mic /></IconButton>
                    <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}><Videocam /></IconButton>
                    <IconButton sx={{ color: 'white', bgcolor: '#f44336' }} onClick={() => window.history.back()}><Close /></IconButton>
                </Box>
            </Paper>
        </Container>
    );
};

export default VirtualDate;
