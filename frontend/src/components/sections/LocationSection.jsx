import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const LocationSection = () => {
  const { config } = useApp();
  const address = 'Near Yashwantrao Chavan Chowk, Bank Colony, Ambajogai, Maharashtra 431517';
  const googleMapsUrl = `https://www.google.com/maps/search/Kurry+Leaf+Bank+Colony+Ambajogai+Maharashtra`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section className="section-spacing bg-background">
      <div className="section-container">
        <SectionTitle
          subtitle="Find Us"
          title="Visit Our Restaurant"
          description="We're conveniently located in Bank Colony, Ambajogai. Come visit us for an unforgettable dining experience."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-medium h-[400px] lg:h-full min-h-[400px]"
          >
            <iframe
              title="Kurry Leaf Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5!2d76.3863!3d18.7377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQ0JzE1LjciTiA3NsKwMjMnMTAuNyJF!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <Card className="border-0 shadow-medium h-full">
              <CardContent className="p-6 md:p-8 flex flex-col h-full">
                {/* Address */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      Kurry Leaf - Pure Veg Restaurant<br />
                      Near Yashwantrao Chavan Chowk,<br />
                      Bank Colony, Ambajogai,<br />
                      Maharashtra 431517
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Operating Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Sunday<br />
                      <span className="font-medium text-foreground">11:30 AM - 11:30 PM</span>
                    </p>
                    <p className="text-sm text-primary mt-1">Open 7 days a week</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a 
                      href={`tel:+91${config.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 {config.phone}
                    </a>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Button 
                    variant="default" 
                    size="lg"
                    className="flex-1"
                    onClick={() => window.open(directionsUrl, '_blank')}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="flex-1"
                    onClick={() => window.open(googleMapsUrl, '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </div>

                {/* Landmark hint */}
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Landmark: Near Yashwantrao Chavan Chowk
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
