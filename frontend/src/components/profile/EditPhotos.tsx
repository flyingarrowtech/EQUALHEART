import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, Chip, IconButton, Tooltip, CircularProgress, useTheme } from '@mui/material';
import { CloudUpload as UploadIcon, StarBorder as StarBorderIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';
import userApi from '../../api/userApi';
import { useNotificationStore } from '../../store/useNotificationStore';

interface EditPhotosProps {
    onPhotoChange: () => void;
}

const EditPhotos: React.FC<EditPhotosProps> = ({ onPhotoChange }) => {
    const { watch } = useFormContext();
    const photos = watch('photos');
    const theme = useTheme();
    const { showToast, showConfirm } = useNotificationStore();
    const [loading, setLoading] = useState(false);

    const handlePhotoAction = async (action: 'upload' | 'delete' | 'main', photoId?: string, files?: FileList) => {
        if (action === 'delete') {
            showConfirm({
                title: 'Delete Photo',
                message: 'Are you sure you want to delete this photo? This cannot be undone.',
                confirmText: 'Delete',
                onConfirm: async () => {
                    setLoading(true);
                    try {
                        await userApi.deletePhoto(photoId!);
                        showToast('Photo deleted', 'info');
                        onPhotoChange();
                    } catch (err) {
                        showToast('Failed to delete photo', 'error');
                    } finally {
                        setLoading(false);
                    }
                },
                onCancel: () => { }
            });
            return;
        }

        setLoading(true);
        try {
            if (action === 'upload' && files?.length) {
                await userApi.uploadPhotos(Array.from(files));
                showToast('Photos uploaded successfully!', 'success');
            } else if (action === 'main' && photoId) {
                await userApi.setMainPhoto(photoId);
                showToast('Main photo updated', 'success');
            }
            onPhotoChange();
        } catch (err) {
            showToast('Action failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UploadIcon />}
                    disabled={loading || (photos?.length >= 5)}
                    sx={{ borderRadius: 3, py: 1.5, px: 4 }}
                >
                    {loading ? 'Processing...' : 'Upload New Photo'}
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={(e) => handlePhotoAction('upload', undefined, e.target.files || undefined)}
                    />
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                    Max 5 photos. High quality preferred.
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                {photos?.map((photo: any, i: number) => (
                    <Box key={photo?._id || i}>
                        <Card sx={{
                            position: 'relative',
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: photo.isMain ? `3px solid ${theme.palette.primary.main}` : '1px solid #eee'
                        }}>
                            <CardMedia
                                component="img"
                                height="180"
                                image={photo.url}
                                alt="Profile"
                            />
                            {photo.isMain && (
                                <Chip label="Main" size="small" color="primary" sx={{ position: 'absolute', top: 8, left: 8 }} />
                            )}
                            <Box sx={{
                                position: 'absolute', bottom: 0, left: 0, right: 0,
                                bgcolor: 'rgba(0,0,0,0.6)', p: 1, display: 'flex', justifyContent: 'center', gap: 1
                            }}>
                                {!photo.isMain && (
                                    <Tooltip title="Set as Main">
                                        <IconButton
                                            size="small"
                                            onClick={() => handlePhotoAction('main', photo._id)}
                                            disabled={loading}
                                            sx={{ color: 'white' }}
                                        >
                                            <StarBorderIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <Tooltip title="Delete">
                                    <IconButton
                                        size="small"
                                        onClick={() => handlePhotoAction('delete', photo._id)}
                                        disabled={loading}
                                        sx={{ color: '#ff5252' }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default EditPhotos;
