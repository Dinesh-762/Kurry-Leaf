import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Phone, ChevronDown, Instagram } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const HeroSection = () => {
  const { config } = useApp();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Solid Brand Color Fallback */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'hsl(30, 15%, 10%)' }} />

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-[1]"
      >
        <source 
          src="https://customer-assets.emergentagent.com/job_vegdelight-4/artifacts/gs224ius_Video_2026-02-03_19_46_08.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Dark Gradient Overlay */}
      <div 
        className="absolute inset-0 z-[2]"
        style={{
          background: `linear-gradient(180deg, rgba(25,20,15,0.75) 0%, rgba(25,20,15,0.5) 30%, rgba(25,20,15,0.4) 50%, rgba(25,20,15,0.6) 80%, rgba(25,20,15,0.85) 100%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10 section-container w-full text-center py-20">
        <div className="max-w-4xl mx-auto">
          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-1.5 text-accent">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold text-sm">4.0</span>
              </div>
              <span className="w-px h-4 bg-white/30" />
              <span className="text-white/80 text-sm tracking-wide">108 Google Reviews</span>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-accent tracking-wide-elegant uppercase text-sm mb-4"
          >
            Pure Vegetarian • Elegant Dining • Authentic Flavours
          </motion.p>

          {/* Restaurant Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-elegant text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-none mb-4 sm:mb-6 tracking-tight"
          >
            {config.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
          >
            Where tradition meets culinary artistry. Experience authentic vegetarian flavors 
            crafted with heritage recipes and the finest seasonal ingredients.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-6 sm:px-4"
          >
            <Button 
              variant="elegant" 
              size="lg"
              onClick={() => scrollToSection('#menu')}
              className="w-full sm:w-auto min-w-[160px] bg-primary hover:bg-primary/90"
            >
              View Menu
            </Button>
            <a 
              href={`https://wa.me/917620158315?text=${encodeURIComponent('Hi! I would like to place an order from Kurry Leaf Restaurant.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/30 text-white px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10 w-full sm:w-auto min-w-[160px]"
            >
              Order on WhatsApp
            </a>
          </motion.div>

          {/* Location, Contact & Instagram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white/60 text-sm pb-4 sm:pb-0"
          >
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(config.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white/90 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Ambajogai</span>
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
            <a 
              href={`tel:+91${config.phone}`}
              className="flex items-center gap-2 hover:text-white/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 {config.phone}</span>
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
            <a 
              href={`https://instagram.com/${config.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-400 transition-all duration-300 group"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>@{config.instagram}</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Instagram Badge - hidden on mobile to avoid overlap */}
      <motion.a
        href={`https://instagram.com/${config.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="hidden md:flex absolute bottom-10 right-10 z-10 items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 hover:text-pink-400 hover:border-pink-400/30 transition-all duration-300 group"
      >
        <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">@{config.instagram}</span>
      </motion.a>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <motion.button
          onClick={() => scrollToSection('#about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
        >
          <span className="text-xs tracking-elegant uppercase">Explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
