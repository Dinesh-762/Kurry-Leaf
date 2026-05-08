import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Instagram, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Offers', href: '#offers' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { config, cart, adminSettings } = useApp();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-soft py-2' : 'bg-transparent py-3'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}>
            <img
              src="https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/80m8piqm_image.png"
              alt="Kurry Leaf"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className={`text-sm tracking-wide font-medium transition-colors link-elegant ${
                  isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Instagram - NO FACEBOOK */}
            <a
              href={`https://instagram.com/${config.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-sm transition-all hover:scale-110 ${isScrolled ? 'text-pink-500' : 'text-white/70 hover:text-pink-400'}`}
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href={`tel:+91${config.phone}`}
              className={`flex items-center gap-2 text-sm ${isScrolled ? 'text-muted-foreground' : 'text-white/70'}`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+91 {config.phone}</span>
            </a>

            {/* Cart Button */}
            {adminSettings.orderingEnabled && totalItems > 0 && (
              <Button variant="default" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4 mr-1" />
                {totalItems}
              </Button>
            )}

            <Button
              variant={isScrolled ? 'elegant' : 'elegant-outline'}
              size="sm"
              onClick={() => window.open(`https://wa.me/91${config.phone}?text=Hi! I want to order food.`, '_blank')}
            >
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-sm ${isScrolled ? 'hover:bg-muted' : 'hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background border-t border-border fixed inset-x-0 top-[56px] bottom-0 overflow-y-auto z-40"
          >
            <div className="section-container py-6 space-y-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block py-3 text-lg font-elegant text-foreground hover:text-primary border-b border-border/50"
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href={`https://instagram.com/${config.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 text-foreground hover:text-pink-500"
              >
                <Instagram className="w-5 h-5" /> @{config.instagram}
              </a>
              <a href={`tel:+91${config.phone}`} className="flex items-center gap-3 py-3 text-foreground">
                <Phone className="w-5 h-5" /> +91 {config.phone}
              </a>
              <div className="pt-4">
                <Button
                  variant="whatsapp"
                  className="w-full h-12 text-base"
                  onClick={() => window.open(`https://wa.me/91${config.phone}?text=Hi! I want to order food.`, '_blank')}
                >
                  Order on WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
