import React from 'react';
import { useApp } from '@/context/AppContext';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

export const Footer = () => {
  const { config } = useApp();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-12 sm:pt-16 pb-6">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand & About */}
          <div>
            <img
              src="https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/80m8piqm_image.png"
              alt="Kurry Leaf"
              className="h-16 w-auto object-contain mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Pure Vegetarian Restaurant serving authentic Indian cuisine with love and tradition since establishment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>Bank Colony, Ambajogai<br />(Near Yashwantrao Chavan Chowk)</span>
              </li>
              <li>
                <a 
                  href={`tel:+91${config.phone}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +91 {config.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {config.email}
                </a>
              </li>
              <li>
                <a 
                  href={`https://instagram.com/${config.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  <Instagram className="w-4 h-4 shrink-0" />
                  @{config.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Hours */}
        <div className="border-t border-border pt-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Open Daily:</span> 11:30 AM - 11:30 PM
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © {currentYear} {config.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
