import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { X } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/3kdvj802_WhatsApp%20Image%202026-02-11%20at%204.15.37%20PM.jpeg',
    alt: 'Restaurant Ambiance',
    caption: 'Premium Dining Experience'
  },
  {
    id: 2,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/teaqf2wa_WhatsApp%20Image%202026-02-11%20at%204.15.38%20PM.jpeg',
    alt: 'Restaurant Interior',
    caption: 'Elegant Interiors'
  },
  {
    id: 3,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/63r2hjb4_WhatsApp%20Image%202026-02-11%20at%204.15.39%20PM.jpeg',
    alt: 'Dining Area',
    caption: 'Cozy Atmosphere'
  },
  {
    id: 4,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/h5hn8jxj_WhatsApp%20Image%202026-02-11%20at%204.15.39%20PM%20%281%29.jpeg',
    alt: 'Restaurant Space',
    caption: 'Warm Ambiance'
  },
  {
    id: 5,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/3hzj494h_WhatsApp%20Image%202026-02-11%20at%204.15.39%20PM%20%282%29.jpeg',
    alt: 'Seating Area',
    caption: 'Comfortable Seating'
  },
  {
    id: 6,
    src: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/xnmy3w41_WhatsApp%20Image%202026-02-11%20at%204.15.40%20PM.jpeg',
    alt: 'Waiting Lounge',
    caption: 'Modern Lounge Area'
  },
];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="section-spacing bg-secondary/30">
      <div className="section-container">
        <SectionTitle
          subtitle="Our Space"
          title="Gallery"
          description="A glimpse into our elegant dining experience."
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="gallery-card group cursor-pointer"
              onClick={() => openLightbox(image)}
              data-testid={`gallery-image-${index}`}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-36 sm:h-48 md:h-56 lg:h-64 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                {/* Warm gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 via-[#2d1f0e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Glassmorphism caption bar */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="backdrop-blur-md bg-white/10 border-t border-white/20 px-3 sm:px-4 py-2.5 sm:py-3">
                    <p className="text-white text-xs sm:text-sm font-medium tracking-wide">{image.caption}</p>
                  </div>
                </div>
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 rounded-xl ring-2 ring-white/0 group-hover:ring-white/10 transition-all duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[101] text-white/80 hover:text-white p-2 bg-black/50 rounded-full transition-colors"
              data-testid="lightbox-close"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <p className="text-white text-center mt-4 text-lg font-medium">{selectedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
