import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuPages = [
  {
    id: 1,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/etzapqkt_Gemini_Generated_Image_igcsdxigcsdxigcs.png',
    title: 'Cover Page'
  },
  {
    id: 2,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/4oi77650_menu_page_2.png',
    title: 'Menu Page'
  },
  {
    id: 3,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/l84s5xzo_menu_page_3.png',
    title: 'Menu Page'
  },
  {
    id: 4,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/5v4wt6v7_menu_page_4.png',
    title: 'Menu Page'
  },
  {
    id: 5,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/wjb79wpl_menu_page_5.png',
    title: 'Menu Page'
  },
  {
    id: 6,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/63n6a07y_menu_page_6.png',
    title: 'Menu Page'
  },
  {
    id: 7,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/a62suha3_menu_page_7.png',
    title: 'Menu Page'
  },
];

export const FlipbookMenu = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextPage = useCallback(() => {
    if (currentPage < menuPages.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback((index) => {
    setDirection(index > currentPage ? 1 : -1);
    setCurrentPage(index);
  }, [currentPage]);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    document.body.style.overflow = 'auto';
  }, []);

  // Smooth page flip animation variants
  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? -45 : 45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? -45 : 45,
    }),
  };

  // Consistent smooth transition
  const pageTransition = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    mass: 0.8,
  };

  return (
    <motion.section 
      id="flipbook-menu" 
      className="section-spacing bg-gradient-to-b from-background via-amber-50/20 to-background"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="section-container">
        <SectionTitle
          subtitle="Our Menu"
          title="Digital Menu Card"
          description="Browse through our complete menu with authentic dishes and prices."
        />

        {/* Flipbook Container - Responsive A4 */}
        <div className="max-w-3xl mx-auto px-4">
          {/* A4 Page Display with Enhanced Shadow */}
          <motion.div 
            className="relative bg-white rounded-xl overflow-hidden cursor-pointer group mx-auto"
            style={{ 
              aspectRatio: '210/297',
              maxHeight: '75vh',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            }}
            onClick={openFullscreen}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Page Content with Animation */}
            <div className="relative w-full h-full bg-white" style={{ perspective: '1200px' }}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={pageTransition}
                  className="absolute inset-0 flex items-center justify-center bg-white"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={menuPages[currentPage].src}
                    alt={menuPages[currentPage].title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Zoom Hint Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none">
              <motion.div 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white px-5 py-2.5 rounded-full flex items-center gap-2 backdrop-blur-sm"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                <ZoomIn className="w-4 h-4" />
                <span className="text-sm font-medium">Click to enlarge</span>
              </motion.div>
            </div>

            {/* Enhanced Book Edge Shadow */}
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/15 via-black/5 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
            
            {/* Bottom shadow for depth */}
            <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </motion.div>

          {/* Navigation Controls - Perfectly Aligned */}
          <motion.div 
            className="flex items-center justify-between mt-8 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={(e) => { e.stopPropagation(); prevPage(); }}
              disabled={currentPage === 0}
              className="gap-2 min-w-[120px] transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {/* Page Indicator Dots */}
            <div className="flex items-center justify-center gap-2 flex-1">
              {menuPages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); goToPage(index); }}
                  className={`h-2.5 rounded-full transition-all duration-300 ease-out ${
                    index === currentPage 
                      ? 'bg-primary w-7' 
                      : 'bg-muted-foreground/25 w-2.5 hover:bg-muted-foreground/40'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={(e) => { e.stopPropagation(); nextPage(); }}
              disabled={currentPage === menuPages.length - 1}
              className="gap-2 min-w-[120px] transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Page Counter */}
          <motion.p 
            className="text-center text-muted-foreground text-sm mt-4 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Page {currentPage + 1} of {menuPages.length}
          </motion.p>
        </div>
      </div>

      {/* Fullscreen Modal - Centered & Optimized */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
            onClick={closeFullscreen}
          >
            {/* Close Button */}
            <motion.button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-[101] text-white/80 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation Arrows */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); prevPage(); }}
              disabled={currentPage === 0}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[101] text-white/80 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1 }}
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); nextPage(); }}
              disabled={currentPage === menuPages.length - 1}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[101] text-white/80 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>

            {/* Centered Fullscreen Image Container */}
            <div 
              className="absolute inset-0 flex items-center justify-center p-4 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: '1200px' }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={pageTransition}
                    className="flex items-center justify-center"
                    style={{ 
                      width: 'auto',
                      height: '85vh',
                      maxWidth: '90vw',
                      aspectRatio: '210/297',
                    }}
                  >
                    <img
                      src={menuPages[currentPage].src}
                      alt={menuPages[currentPage].title}
                      className="w-full h-full object-contain rounded-lg bg-white"
                      style={{ 
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5)',
                      }}
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Bottom Page Counter */}
            <motion.div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.15 }}
            >
              {/* Page Dots */}
              <div className="flex items-center gap-2">
                {menuPages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); goToPage(index); }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentPage 
                        ? 'bg-white w-6' 
                        : 'bg-white/30 w-2 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white/70 text-sm font-medium">
                Page {currentPage + 1} of {menuPages.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default FlipbookMenu;
