import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Sparkles, Truck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const offers = [
  {
    id: 1,
    title: 'Free Delivery',
    subtitle: 'On orders above ₹299',
    icon: Truck,
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Enjoy free home delivery on all orders worth ₹299 or more',
  },
];

export const OffersSection = () => {
  const { config, adminSettings } = useApp();

  return (
    <section id="offers" className="section-spacing bg-secondary/30">
      <div className="section-container">
        <SectionTitle
          subtitle="Special Offers"
          title="Exclusive Deals"
          description="Take advantage of our special offers and enjoy premium dining at great prices."
        />

        {/* 3D Style Offer Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="relative group perspective-1000"
            >
              <div 
                className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${offer.gradient} text-white shadow-xl transform-gpu transition-all duration-500 group-hover:shadow-2xl`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                {/* Sparkle Effect */}
                <Sparkles className="absolute top-4 right-4 w-6 h-6 text-white/30 animate-pulse" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                    <offer.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-elegant text-2xl font-semibold mb-1">{offer.title}</h3>
                  <p className="text-white/90 font-medium text-lg mb-3">{offer.subtitle}</p>
                  <p className="text-white/70 text-sm">{offer.description}</p>
                </div>

                {/* 3D Edge Effect */}
                <div 
                  className="absolute inset-0 rounded-xl border border-white/20"
                  style={{
                    transform: 'translateZ(2px)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery Info Banner */}
        {adminSettings.orderingEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-xl text-center"
          >
            <h4 className="font-semibold text-foreground mb-2">🚚 Delivery Information</h4>
            <p className="text-muted-foreground text-sm">
              Free delivery on orders ₹{adminSettings.freeDeliveryMin}+ • 
              Within 2km: Free • 2-5km: ₹20 • 5-8km: ₹30
            </p>
            {adminSettings.peakChargeEnabled && (
              <p className="text-accent text-xs mt-2">
                ⏰ Peak hours (6-9 PM): Additional ₹{adminSettings.peakCharge} charge applies
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OffersSection;
