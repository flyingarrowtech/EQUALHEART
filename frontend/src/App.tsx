import React, { Suspense, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeStore } from './store/useThemeStore';
import { lightTheme, darkTheme } from './theme/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAuthStore } from './store/useAuthStore';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import MainLayout from './components/layout/MainLayout';

import HomePage from './pages/HomePage';
import AuthPage from './pages/auth/AuthPage';
import VerifyEmail from './pages/auth/VerifyEmail';
import Dashboard from './pages/Dashboard';
import ProfileEdit from './pages/profile/ProfileEdit';
import Verification from './pages/profile/VerificationCenter';
import PrivacySettings from './pages/profile/PrivacySettings';
import PublicProfile from './pages/profile/PublicProfile';
import Search from './pages/search/Search';
import Matches from './pages/matches/Matches';
import Shortlisted from './pages/matches/Shortlisted';
import Visitors from './pages/matches/Visitors';
import Interests from './pages/interests/Interests';
import Messages from './pages/Messages';
import Membership from './pages/Membership';
import VirtualDate from './pages/VirtualDate';
import AdminDashboard from './pages/admin/AdminDashboard';
import AboutUs from './pages/static/AboutUs';
import ContactUs from './pages/static/ContactUs';
import PrivacyPolicy from './pages/static/PrivacyPolicy';
import TermsAndConditions from './pages/static/TermsAndConditions';
import HowItWorks from './pages/static/HowItWorks';
import SuccessStories from './pages/static/SuccessStories';
import Blog from './pages/static/Blog';
import BlogPost from './pages/static/BlogPost';
import HelpCenter from './pages/static/HelpCenter';
import SafetyTips from './pages/static/SafetyTips';
import FAQs from './pages/static/FAQs';
import CookiePolicy from './pages/static/CookiePolicy';
import RefundPolicy from './pages/static/RefundPolicy';
import SocialSuccess from './pages/auth/SocialSuccess';

const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    if (checkAuth) checkAuth();
  }, [checkAuth]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Routes>
            {/* Routes with MainLayout (Navbar + Footer) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />

              {/* Company Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Support Pages */}
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/safety" element={<SafetyTips />} />
              <Route path="/faq" element={<FAQs />} />

              {/* Legal Pages */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/refund" element={<RefundPolicy />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/profile" element={<ProfileEdit />} />
                <Route path="/profile/verify" element={<Verification />} />
                <Route path="/profile/privacy" element={<PrivacySettings />} />
                <Route path="/profile/preferences" element={<ProfileEdit />} />
                <Route path="/profile/:id" element={<PublicProfile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/shortlisted" element={<Shortlisted />} />
                <Route path="/visitors" element={<Visitors />} />
                <Route path="/interests" element={<Interests />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/chat" element={<Messages />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/date/:id" element={<VirtualDate />} />
              </Route>
            </Route>

            {/* Standalone routes without MainLayout */}
            <Route path="/register" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/auth/social/success" element={<SocialSuccess />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
};

export default App;
