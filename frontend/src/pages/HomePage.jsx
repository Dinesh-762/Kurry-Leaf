import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import MenuSection from '@/components/sections/MenuSection';
import MenuPagesSection from '@/components/sections/MenuPagesSection';
import OffersSection from '@/components/sections/OffersSection';
import GallerySection from '@/components/sections/GallerySection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import GoogleReviewPrompt from '@/components/sections/GoogleReviewPrompt';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import CartDrawer from '@/components/cart/CartDrawer';

export default function HomePage() {
  // Ensure fresh page loads always start at the Home (top) section, unless
  // the URL contains an explicit hash like #full-menu that the user wanted.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const hash = window.location.hash;
    if (!hash || hash === '#' || hash === '#home') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <OffersSection />
        <MenuSection />
        <MenuPagesSection />
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
