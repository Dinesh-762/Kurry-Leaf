import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Flame, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { menuCategories, menuItems } from '@/data/menuData';

const MenuItem = ({ item }) => {
  const { cart, addToCart, updateQuantity, adminSettings, config } = useApp();
  const cartItem = cart.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    if (!adminSettings.orderingEnabled) {
      toast.info('Online ordering is currently unavailable');
      return;
    }
    addToCart(item);
    toast.success(`Added ${item.name} to cart`);
  };

  // Compact text-only variant (used for dishes without a photo yet).
  // Same premium-card styling and animations as the photo card, just no image block.
  if (!item.image) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group"
      >
        <div className="premium-card h-full flex flex-col p-5">
          <div className="flex items-start justify-between gap-3 flex-grow">
            <h3 className="font-elegant text-base sm:text-lg font-medium text-foreground leading-snug">
              {item.name}
            </h3>
            <Leaf className="w-4 h-4 text-primary shrink-0 mt-1" aria-label="Vegetarian" />
          </div>
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/70">
            <span className="font-elegant text-lg sm:text-xl font-medium text-foreground">₹{item.price}</span>
            {adminSettings.orderingEnabled ? (
              quantity > 0 ? (
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, quantity - 1)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <Button size="icon" variant="default" className="h-8 w-8" onClick={() => updateQuantity(item.id, quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="elegant" size="sm" onClick={handleAdd}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              )
            ) : (
              <Button variant="outline" size="sm" onClick={() => window.open(`https://wa.me/91${config.phone}?text=I want to order ${item.name}`, '_blank')}>
                Order
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="premium-card h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {item.isChefSpecial && (
              <Badge className="bg-accent text-accent-foreground text-xs">Chef&apos;s Special</Badge>
            )}
            {item.isSpicy && (
              <Badge variant="destructive" className="text-xs"><Flame className="w-3 h-3 mr-1" />Spicy</Badge>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-elegant text-lg font-medium text-foreground mb-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.description}</p>
          
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="font-elegant text-xl font-medium text-foreground">₹{item.price}</span>
            
            {adminSettings.orderingEnabled ? (
              quantity > 0 ? (
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, quantity - 1)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <Button size="icon" variant="default" className="h-8 w-8" onClick={() => updateQuantity(item.id, quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="elegant" size="sm" onClick={handleAdd}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              )
            ) : (
              <Button variant="outline" size="sm" onClick={() => window.open(`https://wa.me/91${config.phone}?text=I want to order ${item.name}`, '_blank')}>
                Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('signature');
  const { cart, adminSettings } = useApp();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section id="menu" className="section-spacing bg-background">
      <div className="section-container">
        <SectionTitle
          subtitle="Our Menu"
          title="Culinary Excellence"
          description="Each dish is crafted with premium ingredients and traditional techniques."
        />

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 p-2 bg-secondary/50 rounded-lg">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 text-sm tracking-wide transition-all duration-300 rounded-md ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
          >
            {menuItems[activeCategory]?.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Cart Summary */}
        {adminSettings.orderingEnabled && totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden"
          >
            <Button variant="default" size="lg" className="shadow-xl gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>{totalItems} items in cart</span>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
