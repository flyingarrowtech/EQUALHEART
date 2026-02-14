import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
// Lazy load pages for better performance
import { lazy } from 'react';

const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const ProfileEdit = lazy(() => import('../pages/profile/ProfileEdit'));
const Search = lazy(() => import('../pages/search/Search'));
const SocialSuccess = lazy(() => import('../pages/auth/SocialSuccess'));
const PrivacySettings = lazy(() => import('../pages/profile/PrivacySettings'));
const VirtualDate = lazy(() => import('../pages/VirtualDate'));
const VerificationCenter = lazy(() => import('../pages/profile/VerificationCenter'));
const ProfileCreationWizard = lazy(() => import('../pages/profile/ProfileCreationWizard'));
const Membership = lazy(() => import('../pages/Membership'));
const PublicProfile = lazy(() => import('../pages/profile/PublicProfile'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'auth',
                children: [
                    { path: 'login', element: <Login /> },
                    { path: 'register', element: <Register /> },
                    { path: 'success', element: <SocialSuccess /> },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: 'profile', element: <Navigate to="me" replace /> },
                    { path: 'profile/me', element: <Profile /> },
                    { path: 'profile/:id', element: <PublicProfile /> },
                    { path: 'profile/edit', element: <ProfileEdit /> },
                    { path: 'profile/privacy', element: <PrivacySettings /> },
                    { path: 'profile/verify', element: <VerificationCenter /> },
                    { path: 'profile/create', element: <ProfileCreationWizard /> },
                    { path: 'search', element: <Search /> },
                    { path: 'virtual-date', element: <VirtualDate /> },
                    { path: 'membership', element: <Membership /> },
                ],
            },
        ],
    },
]);
