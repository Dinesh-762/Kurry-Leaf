import React from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import MenuSection from '@/components/sections/MenuSection';
import OffersSection from '@/components/sections/OffersSection';
import GallerySection from '@/components/sections/GallerySection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import GoogleReviewPrompt from '@/components/sections/GoogleReviewPrompt';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import CartDrawer from '@/components/cart/CartDrawer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <OffersSection />
        <MenuSection />
        <GallerySection />
        <ReviewsSection />
        <GoogleReviewPrompt />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </div>
  );
}
