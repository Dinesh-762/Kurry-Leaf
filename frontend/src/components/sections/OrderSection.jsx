import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MessageSquare, Clock, Truck, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const features = [
  {
    icon: Clock,
    title: 'Quick Delivery',
    description: '30-45 mins average',
  },
  {
    icon: Truck,
    title: 'Home Delivery',
    description: 'Within 5km radius',
  },
  {
    icon: ShoppingBag,
    title: 'Takeaway',
    description: 'Ready in 20 mins',
  },
];

export const OrderSection = () => {
  const { config } = useApp();

  const orderMethods = [
    {
      icon: MessageSquare,
      title: 'Order via WhatsApp',
      description: 'Send your order directly through WhatsApp for quick confirmation',
      action: 'WhatsApp Order',
      variant: 'whatsapp',
      href: `https://wa.me/91${config.phone}?text=Hi! I would like to place an order from Kurry Leaf Restaurant.`,
    },
    {
      icon: Phone,
      title: 'Call to Order',
      description: 'Speak directly with our staff for personalized order assistance',
      action: 'Call Now',
      variant: 'default',
      href: `tel:+91${config.phone}`,
    },
  ];

  return (
    <section id="order" className="section-spacing bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="section-container relative z-10">
        <SectionTitle
          subtitle="Easy Ordering"
          title="Order Your Favorite Dishes"
          description="Place your order easily through WhatsApp or phone. We'll prepare your food fresh and have it ready for pickup or delivery."
          light={true}
        />

        {/* Order Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          {orderMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 h-full">
                <CardContent className="p-6 flex flex-col h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-6 flex-grow">
                    {method.description}
                  </p>
                  <Button
                    variant={method.variant}
                    size="lg"
                    className="w-full mt-auto"
                    onClick={() => window.open(method.href, '_blank')}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3 text-primary-foreground">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">{feature.title}</p>
                <p className="text-sm text-primary-foreground/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center text-primary-foreground/70 text-sm mt-12"
        >
          * Delivery charges may apply based on distance. Minimum order value ₹200 for delivery.
        </motion.p>
      </div>
    </section>
  );
};

export default OrderSection;
