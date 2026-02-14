import React, { Suspense, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useThemeStore } from './store/useThemeStore';
import { lightTheme, darkTheme } from './theme/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAuthStore } from './store/useAuthStore';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import MainLayout from './components/layout/MainLayout';

import { Pages } from './routes/appRoutes';
import NotificationContainer from './components/common/NotificationContainer';


const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    if (checkAuth) checkAuth();
  }, []); // Only run once on mount

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationContainer />
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Routes>
            {/* Routes with MainLayout (Navbar + Footer) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Pages.HomePage.component />} />

              {/* Company Pages */}
              <Route path="/about" element={<Pages.AboutUs.component />} />
              <Route path="/how-it-works" element={<Pages.HowItWorks.component />} />
              <Route path="/success-stories" element={<Pages.SuccessStories.component />} />
              <Route path="/blog" element={<Pages.Blog.component />} />
              <Route path="/blog/:slug" element={<Pages.BlogPost.component />} />

              {/* Support Pages */}
              <Route path="/contact" element={<Pages.ContactUs.component />} />
              <Route path="/help" element={<Pages.HelpCenter.component />} />
              <Route path="/safety" element={<Pages.SafetyTips.component />} />
              <Route path="/faq" element={<Pages.FAQs.component />} />

              {/* Legal Pages */}
              <Route path="/privacy" element={<Pages.PrivacyPolicy.component />} />
              <Route path="/terms" element={<Pages.TermsAndConditions.component />} />
              <Route path="/cookies" element={<Pages.CookiePolicy.component />} />
              <Route path="/refund" element={<Pages.RefundPolicy.component />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Pages.Dashboard.component />} />
                <Route path="/admin/dashboard" element={<Pages.AdminDashboard.component />} />
                <Route path="/profile" element={<Pages.ProfileEdit.component />} />
                <Route path="/profile/edit" element={<Pages.ProfileEdit.component />} />
                <Route path="/profile/photos" element={<Pages.ProfileEdit.component />} />
                <Route path="/profile/verify" element={<Pages.Verification.component />} />
                <Route path="/profile/privacy" element={<Pages.PrivacySettings.component />} />
                <Route path="/profile/preferences" element={<Pages.ProfileEdit.component />} />
                <Route path="/profile/:id" element={<Pages.PublicProfile.component />} />
                <Route path="/search" element={<Pages.Search.component />} />
                <Route path="/matches" element={<Pages.Matches.component />} />
                <Route path="/shortlisted" element={<Pages.Shortlisted.component />} />
                <Route path="/visitors" element={<Pages.Visitors.component />} />
                <Route path="/interests" element={<Pages.Interests.component />} />
                <Route path="/messages" element={<Pages.Messages.component />} />
                <Route path="/chat" element={<Pages.Messages.component />} />
                <Route path="/membership" element={<Pages.Membership.component />} />
                <Route path="/date/:id" element={<Pages.VirtualDate.component />} />
              </Route>
            </Route>

            {/* Standalone routes without MainLayout */}
            <Route path="/register" element={<Pages.AuthPage.component />} />
            <Route path="/login" element={<Pages.AuthPage.component />} />
            <Route path="/verify-email" element={<Pages.VerifyEmail.component />} />
            <Route path="/auth/social/success" element={<Pages.SocialSuccess.component />} />
            <Route path="/auth/google/callback" element={<Pages.GoogleCallback.component />} />

          </Routes>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
};

export default App;
