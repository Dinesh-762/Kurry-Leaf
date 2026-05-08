import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Leaf, Award, Heart, Shield, Sparkles, ChefHat } from 'lucide-react';

const values = [
  { icon: Leaf, title: '100% Vegetarian', desc: 'Pure veg cuisine with no compromise' },
  { icon: Award, title: 'Premium Quality', desc: 'Finest ingredients sourced fresh' },
  { icon: Heart, title: 'Made with Love', desc: 'Passion in every dish we serve' },
  { icon: Shield, title: 'Hygiene First', desc: 'Strict cleanliness standards' },
  { icon: Sparkles, title: 'Authentic Taste', desc: 'Traditional recipes preserved' },
  { icon: ChefHat, title: 'Expert Chefs', desc: 'Skilled culinary professionals' },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-spacing bg-gradient-to-b from-background via-amber-50/30 to-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-sm overflow-hidden shadow-elegant">
              <img
                src="https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/teaqf2wa_WhatsApp%20Image%202026-02-11%20at%204.15.38%20PM.jpeg"
                alt="Kurry Leaf Restaurant Interior"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent/20 rounded-sm -z-10" />
            <div className="absolute top-6 left-6 w-full h-full border-2 border-primary/20 rounded-sm -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle
              subtitle="Our Story"
              title="A Legacy of Authentic Flavors"
              description="Kurry Leaf has been serving the finest vegetarian cuisine in Ambajogai, creating memorable dining experiences for families and food lovers."
              center={false}
            />

            <p className="text-muted-foreground leading-relaxed mb-8">
              Located in Bank Colony, Ambajogai (Near Yashwantrao Chavan Chowk), our restaurant combines 
              traditional recipes with premium ingredients. Every dish is prepared with 
              meticulous attention to hygiene and taste, ensuring you get the authentic 
              flavors of Indian vegetarian cuisine.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {values.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-amber-50/50 border border-amber-100 rounded-sm text-center"
                >
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
