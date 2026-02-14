import { lazy, type ComponentType } from 'react';

// Define the type for the import function
type ImportFactory = () => Promise<{ default: ComponentType<any> }>;

// Helper to create route objects
const createRoute = (factory: ImportFactory) => ({
    component: lazy(factory),
    preload: factory
});

// Define all page imports here
// This allows Vite to analyze the imports and create chunks
export const PageImports = {
    HomePage: () => import('../pages/HomePage'),
    AuthPage: () => import('../pages/auth/AuthPage'),
    VerifyEmail: () => import('../pages/auth/VerifyEmail'),
    Dashboard: () => import('../pages/Dashboard'),
    ProfileEdit: () => import('../pages/profile/ProfileEdit'),
    Verification: () => import('../pages/profile/VerificationCenter'),
    PrivacySettings: () => import('../pages/profile/PrivacySettings'),
    PublicProfile: () => import('../pages/profile/PublicProfile'),
    Search: () => import('../pages/search/Search'),
    Matches: () => import('../pages/matches/Matches'),
    Shortlisted: () => import('../pages/matches/Shortlisted'),
    Visitors: () => import('../pages/matches/Visitors'),
    Interests: () => import('../pages/interests/Interests'),
    Messages: () => import('../pages/Messages'),
    Membership: () => import('../pages/Membership'),
    VirtualDate: () => import('../pages/VirtualDate'),
    AdminDashboard: () => import('../pages/admin/AdminDashboard'),
    AboutUs: () => import('../pages/static/AboutUs'),
    ContactUs: () => import('../pages/static/ContactUs'),
    PrivacyPolicy: () => import('../pages/static/PrivacyPolicy'),
    TermsAndConditions: () => import('../pages/static/TermsAndConditions'),
    HowItWorks: () => import('../pages/static/HowItWorks'),
    SuccessStories: () => import('../pages/static/SuccessStories'),
    Blog: () => import('../pages/static/Blog'),
    BlogPost: () => import('../pages/static/BlogPost'),
    HelpCenter: () => import('../pages/static/HelpCenter'),
    SafetyTips: () => import('../pages/static/SafetyTips'),
    FAQs: () => import('../pages/static/FAQs'),
    CookiePolicy: () => import('../pages/static/CookiePolicy'),
    RefundPolicy: () => import('../pages/static/RefundPolicy'),
    SocialSuccess: () => import('../pages/auth/SocialSuccess'),
    GoogleCallback: () => import('../pages/auth/GoogleCallback'),
};

// Export preconfigured components
export const Pages = {
    HomePage: createRoute(PageImports.HomePage),
    AuthPage: createRoute(PageImports.AuthPage),
    VerifyEmail: createRoute(PageImports.VerifyEmail),
    Dashboard: createRoute(PageImports.Dashboard),
    ProfileEdit: createRoute(PageImports.ProfileEdit),
    Verification: createRoute(PageImports.Verification),
    PrivacySettings: createRoute(PageImports.PrivacySettings),
    PublicProfile: createRoute(PageImports.PublicProfile),
    Search: createRoute(PageImports.Search),
    Matches: createRoute(PageImports.Matches),
    Shortlisted: createRoute(PageImports.Shortlisted),
    Visitors: createRoute(PageImports.Visitors),
    Interests: createRoute(PageImports.Interests),
    Messages: createRoute(PageImports.Messages),
    Membership: createRoute(PageImports.Membership),
    VirtualDate: createRoute(PageImports.VirtualDate),
    AdminDashboard: createRoute(PageImports.AdminDashboard),
    AboutUs: createRoute(PageImports.AboutUs),
    ContactUs: createRoute(PageImports.ContactUs),
    PrivacyPolicy: createRoute(PageImports.PrivacyPolicy),
    TermsAndConditions: createRoute(PageImports.TermsAndConditions),
    HowItWorks: createRoute(PageImports.HowItWorks),
    SuccessStories: createRoute(PageImports.SuccessStories),
    Blog: createRoute(PageImports.Blog),
    BlogPost: createRoute(PageImports.BlogPost),
    HelpCenter: createRoute(PageImports.HelpCenter),
    SafetyTips: createRoute(PageImports.SafetyTips),
    FAQs: createRoute(PageImports.FAQs),
    CookiePolicy: createRoute(PageImports.CookiePolicy),
    RefundPolicy: createRoute(PageImports.RefundPolicy),
    SocialSuccess: createRoute(PageImports.SocialSuccess),
    GoogleCallback: createRoute(PageImports.GoogleCallback),
};
