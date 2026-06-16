import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Download, ZoomIn, X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

// Show only the first 8 pages — pages 9 and 10 removed per spec.
const ASSET_BASE = `${process.env.PUBLIC_URL || ''}/menu-pages`;
const TOTAL_PAGES = 8;
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  id: i + 1,
  src: `${ASSET_BASE}/page-${i + 1}.jpg`,
  alt: `Kurry Leaf Menu — Page ${i + 1}`,
}));
const PDF_URL = `${ASSET_BASE}/kurry-leaf-menu.pdf`;

/* ------------------------------- Lightbox ------------------------------- */
const Lightbox = ({ index, onClose, onPrev, onNext }) => {
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
      className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      data-testid="menu-lightbox"
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center transition-colors"
        data-testid="lightbox-close"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:top-6 text-white/90 text-sm tracking-[0.2em] uppercase font-light">
        Page {index + 1} / {TOTAL_PAGES}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous page"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground text-white flex items-center justify-center transition-colors"
        data-testid="lightbox-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
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

/* -------------------------------- Section -------------------------------- */
export const MenuPagesSection = () => {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const stageRef = useRef(null);
  const thumbsRef = useRef(null);

  const goTo = useCallback((i) => {
    setCurrent(((i % TOTAL_PAGES) + TOTAL_PAGES) % TOTAL_PAGES);
  }, []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + TOTAL_PAGES) % TOTAL_PAGES), []);
  const next = useCallback(() => setCurrent((i) => (i + 1) % TOTAL_PAGES), []);

  // Keyboard nav when section is in view
  useEffect(() => {
    const onKey = (e) => {
      if (zoomed) return; // lightbox handles its own keys
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 80 && rect.top < window.innerHeight - 80;
      if (!inView) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, zoomed]);

  // Keep active thumbnail visible
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const active = container.querySelector(`[data-thumb="${current}"]`);
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);

  return (
    <section
      id="full-menu"
      className="section-spacing relative overflow-hidden"
      style={{ scrollMarginTop: '80px' }}
      data-testid="full-menu-section"
    >
      {/* Background — warm parchment */}
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
          description="Flip through every page of our signature menu — swipe, click the arrows, or use the thumbnails below."
        />

        {/* Action bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
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

        {/* Stage — single page viewer */}
        <div className="relative max-w-5xl mx-auto" ref={stageRef}>
          {/* Page counter */}
          <div className="flex items-center justify-center mb-4">
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground/80">
              Page <span className="text-foreground font-medium tabular-nums">{current + 1}</span>
              <span className="mx-2 text-muted-foreground/40">/</span>
              <span className="tabular-nums">{TOTAL_PAGES}</span>
            </span>
          </div>

          {/* Page frame */}
          <div className="relative rounded-xl overflow-hidden bg-card border border-border/60 shadow-[0_24px_60px_-24px_hsla(30,20%,12%,0.22)]">
            {/* Swipe + animated page */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) next();
                  else if (info.offset.x > 60) prev();
                }}
                className="relative cursor-zoom-in touch-pan-y select-none"
                onClick={() => setZoomed(true)}
                data-testid={`stage-page-${current + 1}`}
              >
                <img
                  src={PAGES[current].src}
                  alt={PAGES[current].alt}
                  draggable={false}
                  className="w-full h-auto block"
                  loading="eager"
                />
                {/* Zoom hint */}
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur-sm border border-border/60 text-[10px] sm:text-xs tracking-[0.15em] uppercase text-foreground/80 pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Tap to zoom
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrows (overlaid) */}
            <button
              onClick={prev}
              aria-label="Previous page"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/90 backdrop-blur border border-border/70 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md flex items-center justify-center"
              data-testid="stage-prev"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={next}
              aria-label="Next page"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/90 backdrop-blur border border-border/70 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md flex items-center justify-center"
              data-testid="stage-next"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Dot pagination */}
          <div className="flex items-center justify-center gap-2 mt-6" data-testid="stage-dots">
            {PAGES.map((p, i) => {
              const active = i === current;
              return (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to page ${p.id}`}
                  data-testid={`stage-dot-${p.id}`}
                  className={`transition-all duration-300 rounded-full ${
                    active
                      ? 'w-8 h-2 bg-primary'
                      : 'w-2 h-2 bg-border hover:bg-primary/50'
                  }`}
                />
              );
            })}
          </div>

          {/* Thumbnails strip */}
          <div
            ref={thumbsRef}
            className="mt-8 flex gap-3 sm:gap-4 overflow-x-auto pb-3 px-1 scroll-smooth"
            style={{ scrollbarWidth: 'thin' }}
            data-testid="stage-thumbnails"
          >
            {PAGES.map((p, i) => {
              const active = i === current;
              return (
                <button
                  key={p.id}
                  data-thumb={i}
                  data-testid={`stage-thumb-${p.id}`}
                  onClick={() => goTo(i)}
                  aria-label={`Page ${p.id} thumbnail`}
                  className={`relative shrink-0 rounded-md overflow-hidden border transition-all duration-300 ${
                    active
                      ? 'border-accent shadow-[0_10px_30px_-10px_hsla(42,75%,50%,0.55)] ring-2 ring-accent/50'
                      : 'border-border/60 opacity-65 hover:opacity-100 hover:border-primary/40'
                  }`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="block w-28 sm:w-36 lg:w-40 h-auto"
                  />
                  <span
                    className={`absolute bottom-1 left-1 text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded ${
                      active
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-background/85 text-foreground/80'
                    }`}
                  >
                    {p.id}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <p className="text-center text-xs tracking-[0.25em] uppercase text-muted-foreground/70 mt-8">
            ← → keys • Swipe on mobile • Tap page to zoom
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomed && (
          <Lightbox
            index={current}
            onClose={() => setZoomed(false)}
            onPrev={() => setCurrent((i) => (i - 1 + TOTAL_PAGES) % TOTAL_PAGES)}
            onNext={() => setCurrent((i) => (i + 1) % TOTAL_PAGES)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default MenuPagesSection;
