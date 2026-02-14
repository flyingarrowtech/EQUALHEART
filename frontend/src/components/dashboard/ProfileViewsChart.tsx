import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface ProfileViewsChartProps {
    data: Array<{
        date: string;
        views: number;
    }>;
}

const ProfileViewsChart: React.FC<ProfileViewsChartProps> = ({ data }) => {
    return (
        <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Profile views
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#e91e63" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#e91e63" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: '#9e9e9e' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: '#9e9e9e' }}
                            axisLine={{ stroke: '#e0e0e0' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e0e0e0',
                                borderRadius: 8,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="views"
                            stroke="#e91e63"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorViews)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default ProfileViewsChart;
