import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import FeaturesSection from '../components/home/FeaturesSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import SuccessStoriesSection from '../components/home/SuccessStoriesSection';
import StatsSection from '../components/home/StatsSection';
import GallerySection from '../components/home/GallerySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingSection from '../components/home/PricingSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

const HomePage: React.FC = () => {
    return (
        <Box>
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <WhyChooseSection />
            <SuccessStoriesSection />
            <StatsSection />
            <GallerySection />
            <TestimonialsSection />
            <PricingSection />
            <FAQSection />
            <CTASection />
        </Box>
    );
};

export default HomePage;
