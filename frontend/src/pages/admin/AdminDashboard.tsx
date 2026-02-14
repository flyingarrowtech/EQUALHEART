import React, { useEffect, useState } from 'react';
import {
    Box, Paper, Typography, Container,
    Card, CardContent, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Chip, IconButton, Tooltip
} from '@mui/material';
import {
    People as PeopleIcon,
    VerifiedUser as VerifiedIcon,
    Report as ReportIcon,
    TrendingUp as TrendingIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
  
} from '@mui/icons-material';
import api from '../../hooks/api';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface Stats {
    totalUsers: number;
    verifiedUsers: number;
    premiumUsers: number;
    reportedUsers: number;
    newSignups: number;
}

interface User {
    _id: string;
    fullName: { firstName: string; lastName: string };
    email: string;
    isVerified: boolean;
    role: string;
    kycStatus: string;
    createdAt: string;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/dashboard');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            const statsRes = await api.get('/admin/stats');
            const usersRes = await api.get('/admin/users?limit=5');
            setStats(statsRes.data);
            setUsers(usersRes.data.users);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (userId: string) => {
        try {
            await api.put(`/admin/users/${userId}/verify`);
            fetchData();
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const handleDelete = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/admin/users/${userId}`);
                fetchData();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Admin Dashboard
            </Typography>

            {/* Stats Cards */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    mb: 4
                }}
            >
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                    <Card sx={{ bgcolor: 'primary.light', color: 'white', height: '100%' }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="h3" fontWeight="bold">{stats?.totalUsers}</Typography>
                                    <Typography variant="subtitle1">Total Users</Typography>
                                </Box>
                                <PeopleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                    <Card sx={{ bgcolor: 'success.light', color: 'white', height: '100%' }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="h3" fontWeight="bold">{stats?.verifiedUsers}</Typography>
                                    <Typography variant="subtitle1">Verified Users</Typography>
                                </Box>
                                <VerifiedIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                    <Card sx={{ bgcolor: 'warning.light', color: 'white', height: '100%' }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="h3" fontWeight="bold">{stats?.reportedUsers}</Typography>
                                    <Typography variant="subtitle1">Reported Users</Typography>
                                </Box>
                                <ReportIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                    <Card sx={{ bgcolor: 'info.light', color: 'white', height: '100%' }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="h3" fontWeight="bold">{stats?.newSignups}</Typography>
                                    <Typography variant="subtitle1">New Signups (7 Days)</Typography>
                                </Box>
                                <TrendingIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Recent Users Table */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Recent Users
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Joined</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    {user.fullName?.firstName} {user.fullName?.lastName}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.isVerified ? 'Verified' : 'Pending'}
                                        color={user.isVerified ? 'success' : 'warning'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell align="right">
                                    {!user.isVerified && (
                                        <Tooltip title="Verify User">
                                            <IconButton color="success" onClick={() => handleVerify(user._id)}>
                                                <CheckCircleIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <Tooltip title="Delete User">
                                        <IconButton color="error" onClick={() => handleDelete(user._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminDashboard;
