import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const EditPreferences: React.FC = () => {
    const { control } = useFormContext();

    return (
        <Box>
            <Typography variant="body2" color="text.secondary" paragraph>
                Specify criteria for your ideal partner.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                <Controller
                    name="partnerPreferences.ageRange.min"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Min Age"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
                <Controller
                    name="partnerPreferences.ageRange.max"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Max Age"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
                <Controller
                    name="partnerPreferences.heightRange.min"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Min Height"
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="partnerPreferences.heightRange.max"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Max Height"
                            {...field}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default EditPreferences;
