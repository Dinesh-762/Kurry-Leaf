import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Flame, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const menuCategories = [
  { id: 'signature', name: 'Signature' },
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Main Course' },
  { id: 'biryani', name: 'Biryani' },
  { id: 'thali', name: 'Thali' },
  { id: 'mocktails', name: 'Mocktails' },
  { id: 'beverages', name: 'Beverages' },
];

const menuItems = {
  signature: [
    { id: 1, name: 'Paneer Tikka Royale', description: 'Premium cottage cheese chargrilled with aromatic spices', price: 320, image: 'https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?w=400', isChefSpecial: true },
    { id: 2, name: 'Dum Biryani Special', description: 'Slow-cooked aromatic basmati with vegetables & saffron', price: 350, image: 'https://images.unsplash.com/photo-1633945274417-ab205ae69d10?w=400', isChefSpecial: true },
    { id: 3, name: 'Grand Veg Thali', description: 'Complete meal with 8 seasonal preparations', price: 450, image: 'https://images.unsplash.com/photo-1742281258189-3b933879867a?w=400', isChefSpecial: true },
  ],
  starters: [
    { id: 4, name: 'Crispy Corn Pepper', description: 'Golden corn in aromatic pepper sauce', price: 180, image: 'https://customer-assets.emergentagent.com/job_vegdelight-4/artifacts/m9ubxqjm_WhatsApp%20Image%202026-01-27%20at%204.43.29%20PM.jpeg', isSpicy: true },
    { id: 5, name: 'Hara Bhara Kebab', description: 'Spinach and green pea patties with cashew', price: 200, image: 'https://customer-assets.emergentagent.com/job_4848df9b-fe06-42bf-958b-1b30e0cbce96/artifacts/qbu9xbvg_WhatsApp%20Image%202026-02-10%20at%207.15.09%20PM%20%281%29.jpeg', isChefSpecial: true },
    { id: 6, name: 'Paneer Tikka', description: 'Classic tandoor grilled cottage cheese', price: 240, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
  ],
  mains: [
    { id: 7, name: 'Paneer Butter Masala', description: 'Silken paneer in rich tomato-cream gravy', price: 280, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400' },
    { id: 9, name: 'Malai Kofta', description: 'Dumplings in cashew-cream sauce', price: 320, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400' },
  ],
  biryani: [
    { id: 10, name: 'Veg Dum Biryani', description: 'Layered rice with seasonal vegetables', price: 280, image: 'https://images.unsplash.com/photo-1633945274417-ab205ae69d10?w=400', isSpicy: true },
    { id: 11, name: 'Paneer Biryani', description: 'Fragrant rice with spiced cottage cheese', price: 320, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400' },
  ],
  thali: [
    { id: 12, name: 'Executive Thali', description: 'Dal, 2 sabji, rice, rotis, papad, pickle, sweet', price: 250, image: 'https://images.unsplash.com/photo-1742281257707-0c7f7e5ca9c6?w=400' },
    { id: 13, name: 'Maharaja Thali', description: 'Premium feast with paneer, dal, 3 sabji, biryani', price: 450, image: 'https://images.unsplash.com/photo-1742281257687-092746ad6021?w=400', isChefSpecial: true },
  ],
  beverages: [
    { id: 14, name: 'Mango Lassi', description: 'Sweet yogurt with fresh mango', price: 80, image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400' },
    { id: 15, name: 'Masala Chai', description: 'Traditional spiced tea', price: 40, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400' },
  ],
  mocktails: [
    { id: 20, name: 'Virgin Mojito', description: 'Classic lime & mint cooler with a refreshing fizz', price: 70, image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/lkejt919_mocktail2.jpeg' },
    { id: 21, name: 'Kalakhatta Mojito', description: 'Tangy berry-spiced mojito with a desi twist', price: 120, image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/as1xmpvs_mocktail%201.jpeg' },
    { id: 22, name: 'Watermelon Mojito', description: 'Fresh watermelon blended with mint & lime', price: 130, image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/kwfp49ky_mocktail3.jpeg' },
  ],
};

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
              <Badge className="bg-accent text-accent-foreground text-xs">Chef's Special</Badge>
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
