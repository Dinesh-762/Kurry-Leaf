import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Download, ZoomIn, X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

// Static, deterministic list — pages live in /public/menu-pages/
// Use PUBLIC_URL so paths work in both dev (with homepage basename) and production builds.
const ASSET_BASE = `${process.env.PUBLIC_URL || ''}/menu-pages`;
const TOTAL_PAGES = 10;
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  id: i + 1,
  src: `${ASSET_BASE}/page-${i + 1}.jpg`,
  alt: `Kurry Leaf Menu — Page ${i + 1}`,
}));

const PDF_URL = `${ASSET_BASE}/kurry-leaf-menu.pdf`;

/* ----------------------------- Lightbox ----------------------------- */
const Lightbox = ({ index, onClose, onPrev, onNext }) => {
  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      data-testid="menu-lightbox"
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center transition-colors"
        data-testid="lightbox-close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:top-6 text-white/90 text-sm tracking-[0.2em] uppercase font-light">
        Page {index + 1} / {TOTAL_PAGES}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous page"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground text-white flex items-center justify-center transition-colors"
        data-testid="lightbox-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Image */}
      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        src={PAGES[index].src}
        alt={PAGES[index].alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] sm:max-w-[78vw] object-contain rounded-md shadow-2xl"
      />

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next page"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground text-white flex items-center justify-center transition-colors"
        data-testid="lightbox-next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </motion.div>
  );
};

/* ------------------------------ Page Card ----------------------------- */
const PageCard = ({ page, index, onOpen }) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
    onClick={() => onOpen(index)}
    className="group relative block w-full text-left rounded-[10px] overflow-hidden bg-card border border-border/60 hover:border-accent/60 transition-all duration-500 shadow-[0_4px_30px_-4px_hsla(30,20%,12%,0.08)] hover:shadow-[0_24px_60px_-20px_hsla(30,20%,12%,0.18)] hover:-translate-y-1"
    data-testid={`menu-page-card-${page.id}`}
    aria-label={`Open ${page.alt} in full view`}
  >
    {/* Inner frame */}
    <div className="relative">
      <img
        src={page.src}
        alt={page.alt}
        loading="lazy"
        className="w-full h-auto block transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
      />

      {/* Page number ribbon */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-sm border border-border/60 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium text-foreground/80">
        Page {page.id}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-5">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-wider uppercase">
          <ZoomIn className="w-3.5 h-3.5" />
          View Page
        </span>
      </div>
    </div>
  </motion.button>
);

/* ------------------------------ Section ----------------------------- */
export const MenuPagesSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const open = useCallback((i) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + TOTAL_PAGES) % TOTAL_PAGES)),
    []
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % TOTAL_PAGES)),
    []
  );

  return (
    <section
      id="full-menu"
      className="section-spacing relative overflow-hidden"
      style={{ scrollMarginTop: '80px' }}
      data-testid="full-menu-section"
    >
      {/* Background — warm parchment feel */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/40 via-background to-secondary/30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 12%, hsl(150 35% 22% / 0.6), transparent 38%), radial-gradient(circle at 82% 86%, hsl(42 75% 50% / 0.55), transparent 38%)',
        }}
      />

      <div className="section-container relative">
        <SectionTitle
          subtitle="The Complete Menu"
          title="Our Full Menu"
          description="Browse every dish, presented in our restaurant's signature menu design. Tap any page to view it full-screen."
        />

        {/* Action bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 backdrop-blur border border-border/60 text-xs sm:text-sm text-muted-foreground tracking-wide">
            <BookOpen className="w-4 h-4 text-accent" />
            <span>{TOTAL_PAGES} pages • Pure Vegetarian</span>
          </div>

          <Button asChild variant="elegant" size="default" data-testid="download-menu-pdf">
            <a href={PDF_URL} download="kurry-leaf-menu.pdf">
              <Download className="w-4 h-4 mr-2" />
              Download Full Menu (PDF)
            </a>
          </Button>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8 max-w-6xl mx-auto">
          {PAGES.map((page, i) => (
            <PageCard key={page.id} page={page} index={i} onOpen={open} />
          ))}
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs tracking-[0.25em] uppercase text-muted-foreground/70 mt-10 sm:mt-14">
          Use ← → keys to navigate • Press Esc to close
        </p>
      </div>

      {/* Lightbox — rendered as child of #root (no portals) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default MenuPagesSection;
