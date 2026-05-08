import React from 'react';
import { motion } from 'framer-motion';

export const SectionTitle = ({ 
  subtitle, 
  title, 
  description, 
  center = true,
  light = false 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-10 sm:mb-14 md:mb-16 px-2`}
    >
      {subtitle && (
        <span className={`inline-block tracking-wide-elegant uppercase text-xs sm:text-sm mb-3 sm:mb-4 ${
          light ? 'text-accent' : 'text-accent'
        }`}>
          {subtitle}
        </span>
      )}
      <h2 className={`font-elegant text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 sm:mb-6 ${
        light ? 'text-white' : 'text-foreground'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-sm sm:text-base md:text-lg leading-relaxed font-light ${
          light ? 'text-white/70' : 'text-muted-foreground'
        }`}>
          {description}
        </p>
      )}
      <div className={`decorative-line mt-6 sm:mt-8 ${center ? 'mx-auto' : ''}`} />
    </motion.div>
  );
};

export default SectionTitle;
