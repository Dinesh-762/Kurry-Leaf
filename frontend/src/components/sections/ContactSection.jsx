import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send, Instagram, CheckCircle, ExternalLink } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=Kurry+Leaf+Restaurant+Ambajogai+Maharashtra&t=&z=15&ie=UTF8&iwloc=&output=embed';
const MAPS_LINK = 'https://www.google.com/maps/search/?api=1&query=Kurry+Leaf+Restaurant+Ambajogai+Maharashtra';

export const ContactSection = () => {
  const { config } = useApp();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mapError, setMapError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi Kurry Leaf!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const link = document.createElement('a');
    link.href = `https://wa.me/917620158315?text=${encodeURIComponent(msg)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSubmitted(true);
    toast.success('Message sent!');
    setTimeout(() => {
      setFormData({ name: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="section-spacing bg-secondary/30">
      <div className="section-container">
        <SectionTitle
          subtitle="Get In Touch"
          title="Contact & Location"
          description="We'd love to hear from you. Visit us or reach out anytime!"
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Address</p>
                    <p className="text-muted-foreground text-xs mt-1">{config.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Phone</p>
                    <a href={`tel:+91${config.phone}`} className="text-muted-foreground text-xs mt-1 hover:text-primary">
                      +91 {config.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Email</p>
                    <a href={`mailto:${config.email}`} className="text-muted-foreground text-xs mt-1 hover:text-primary break-all">
                      {config.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Hours</p>
                    <p className="text-muted-foreground text-xs mt-1">11:30 AM - 11:30 PM<br />Open 7 Days</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instagram */}
            <a
              href={`https://instagram.com/${config.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-lg hover:from-purple-500/20 hover:via-pink-500/20 hover:to-orange-500/20 transition-all"
            >
              <Instagram className="w-6 h-6 text-pink-500" />
              <span className="text-foreground font-medium">@{config.instagram}</span>
            </a>

            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow-medium" data-testid="contact-map">
              {!mapError ? (
                <div className="h-[250px]">
                  <iframe
                    title="Location"
                    src={MAPS_EMBED_URL}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onError={() => setMapError(true)}
                  />
                </div>
              ) : (
                <div className="h-[200px] bg-muted flex flex-col items-center justify-center gap-3 rounded-lg">
                  <MapPin className="w-8 h-8 text-primary" />
                  <p className="text-muted-foreground text-sm">Map unavailable</p>
                </div>
              )}
              {/* Open in Google Maps fallback button */}
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-muted/50 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                data-testid="open-google-maps-btn"
              >
                <ExternalLink className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6 sm:p-8">
                <h3 className="font-elegant text-2xl text-foreground mb-6">Send us a Message</h3>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="font-semibold text-foreground">Message Sent!</p>
                    <p className="text-muted-foreground text-sm mt-2">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Input
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="h-12"
                        data-testid="contact-phone-input"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message *"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={4}
                        data-testid="contact-message-input"
                      />
                    </div>
                    <Button type="submit" variant="elegant" size="lg" className="w-full" data-testid="contact-submit-btn">
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
