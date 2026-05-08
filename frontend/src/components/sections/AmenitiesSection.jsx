import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Baby, 
  Users, 
  Sofa, 
  Wifi, 
  CreditCard, 
  ParkingCircle,
  Fan,
  Shield
} from 'lucide-react';

const amenities = [
  {
    icon: Baby,
    title: 'High Chair Available',
    description: 'Comfortable seating for your little ones',
  },
  {
    icon: Users,
    title: 'Family-Friendly',
    description: 'Spacious seating for families and groups',
  },
  {
    icon: Sofa,
    title: 'Comfortable Ambiance',
    description: 'Relaxed atmosphere for leisurely dining',
  },
  {
    icon: Fan,
    title: 'Air Conditioned',
    description: 'Cool and comfortable environment',
  },
  {
    icon: Wifi,
    title: 'Free WiFi',
    description: 'Stay connected while you dine',
  },
  {
    icon: CreditCard,
    title: 'Card Accepted',
    description: 'All major cards and UPI accepted',
  },
  {
    icon: ParkingCircle,
    title: 'Parking Available',
    description: 'Convenient parking space nearby',
  },
  {
    icon: Shield,
    title: 'Hygienic Kitchen',
    description: 'Strict hygiene standards maintained',
  },
];

const priceRange = {
  budget: '₹200 - ₹400',
  description: 'Value for money dining experience with quality food',
};

export const AmenitiesSection = () => {
  return (
    <section className="section-spacing bg-warm-gradient">
      <div className="section-container">
        <SectionTitle
          subtitle="Why Choose Us"
          title="Amenities & Services"
          description="We strive to provide the best dining experience with comfortable amenities for you and your family."
        />

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full border-0 shadow-soft hover:shadow-medium transition-shadow duration-300">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <amenity.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
                    {amenity.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {amenity.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Price Range Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="max-w-2xl mx-auto border-0 shadow-medium bg-card overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-8 bg-primary text-primary-foreground">
                  <h3 className="font-display text-2xl font-bold mb-2">Price Range</h3>
                  <p className="text-3xl md:text-4xl font-bold mb-2">{priceRange.budget}</p>
                  <p className="text-primary-foreground/80 text-sm">per person average</p>
                </div>
                <div className="p-6 md:p-8 flex items-center">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Value for Money</h4>
                    <p className="text-muted-foreground text-sm">
                      {priceRange.description}
                    </p>
                    <div className="flex items-center gap-1 mt-3">
                      {[1, 2, 3].map((i) => (
                        <span key={i} className="text-lg">₹</span>
                      ))}
                      <span className="text-muted-foreground/30 text-lg">₹</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
