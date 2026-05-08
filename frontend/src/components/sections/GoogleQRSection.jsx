import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Star, ExternalLink } from 'lucide-react';

const REVIEW_REDIRECT = `${process.env.REACT_APP_BACKEND_URL}/api/reviews/redirect`;

export const GoogleQRSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-warm-gradient" data-testid="google-qr-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-xl shadow-elegant overflow-hidden border border-border/50">
            <div className="flex flex-col sm:flex-row items-center">
              {/* QR Code */}
              <div className="p-8 sm:p-10 flex items-center justify-center bg-white sm:rounded-l-xl" data-testid="qr-code-container">
                <div className="relative">
                  <QRCodeSVG
                    value={REVIEW_REDIRECT}
                    size={180}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#2d4a1a"
                    includeMargin={true}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 p-6 sm:p-8 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-5 h-5 ${s <= 4 ? 'text-accent fill-accent' : 'text-muted-foreground/20'}`} />
                  ))}
                </div>
                <h3 className="font-elegant text-xl sm:text-2xl text-foreground font-medium mb-2">
                  Loved your meal?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  Scan the QR code to leave a review on Google. Your feedback helps us serve you better!
                </p>
                <a
                  href={REVIEW_REDIRECT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium transition-colors hover:bg-primary/90 w-full sm:w-auto"
                  data-testid="qr-review-btn"
                >
                  <ExternalLink className="w-4 h-4" />
                  Leave a Google Review
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleQRSection;
