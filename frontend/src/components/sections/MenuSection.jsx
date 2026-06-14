import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Flame, Plus, Minus, ShoppingCart, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { menuCategories, menuItems } from '@/data/menuData';

/* ----------------------------- Signature Card ----------------------------- */
const SignatureCard = ({ item }) => {
  const { cart, addToCart, updateQuantity, adminSettings, config } = useApp();
  const cartItem = cart.find((i) => i.id === item.id);
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      data-testid={`signature-card-${item.id}`}
    >
      <div className="premium-card h-full flex flex-col overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 left-3 flex gap-2">
            {item.isChefSpecial && (
              <Badge className="bg-accent text-accent-foreground text-[10px] tracking-wider uppercase">
                <Sparkles className="w-3 h-3 mr-1" /> Chef&apos;s Special
              </Badge>
            )}
            {item.isSpicy && (
              <Badge variant="destructive" className="text-xs">
                <Flame className="w-3 h-3 mr-1" />
                Spicy
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center shadow-sm">
              <Leaf className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-elegant text-xl font-medium text-foreground mb-1">{item.name}</h3>
          {item.description && (
            <p className="text-xs tracking-wider text-muted-foreground/80 mb-2 font-light">
              {item.description}
            </p>
          )}
          {item.blurb && (
            <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">{item.blurb}</p>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border/70">
            <span className="font-elegant text-2xl font-medium text-foreground">₹{item.price}</span>

            {adminSettings.orderingEnabled ? (
              quantity > 0 ? (
                <div className="flex items-center gap-2" data-testid={`qty-controls-${item.id}`}>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, quantity - 1)}
                    data-testid={`qty-decrease-${item.id}`}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold" data-testid={`qty-value-${item.id}`}>
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="default"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, quantity + 1)}
                    data-testid={`qty-increase-${item.id}`}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="elegant"
                  size="sm"
                  onClick={handleAdd}
                  data-testid={`add-to-cart-${item.id}`}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              )
            ) : (
              <Button
                variant="outline"
                size="sm"
                asChild
                data-testid={`order-whatsapp-${item.id}`}
              >
                <a
                  href={`https://wa.me/91${config.phone}?text=${encodeURIComponent(`I want to order ${item.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ----------------------------- Typography Row ----------------------------- */
const MenuRow = ({ item, index }) => {
  const { cart, addToCart, updateQuantity, adminSettings, config } = useApp();
  const cartItem = cart.find((i) => i.id === item.id);
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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.3), ease: 'easeOut' }}
      className="group menu-row"
      data-testid={`menu-row-${item.id}`}
    >
      <div className="flex items-start gap-3 sm:gap-5 py-4 sm:py-5 border-b border-border/60 group-hover:border-accent/40 transition-colors duration-500">
        {/* Veg leaf marker */}
        <span className="mt-1.5 inline-flex items-center justify-center w-4 h-4 border border-primary/60 rounded-[2px] shrink-0 group-hover:border-primary transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        </span>

        {/* Name + description + chef badge */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h4 className="font-elegant text-lg sm:text-xl text-foreground font-medium leading-tight group-hover:text-primary transition-colors duration-300">
              {item.name}
            </h4>
            {item.isChefSpecial && (
              <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-accent font-medium">
                <Sparkles className="w-3 h-3" /> Special
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-xs sm:text-sm text-muted-foreground/80 mt-1 font-light tracking-wide">
              {item.description}
            </p>
          )}
          {item.blurb && (
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed hidden sm:block">
              {item.blurb}
            </p>
          )}
        </div>

        {/* Dotted leader + price + action */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="font-elegant text-lg sm:text-xl font-medium text-foreground tabular-nums">
            ₹{item.price}
          </span>

          {adminSettings.orderingEnabled ? (
            quantity > 0 ? (
              <div className="flex items-center gap-1.5" data-testid={`qty-controls-${item.id}`}>
                <button
                  onClick={() => updateQuantity(item.id, quantity - 1)}
                  className="w-7 h-7 rounded-full border border-border hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                  aria-label="Decrease"
                  data-testid={`qty-decrease-${item.id}`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span
                  className="w-5 text-center text-sm font-semibold tabular-nums"
                  data-testid={`qty-value-${item.id}`}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, quantity + 1)}
                  className="w-7 h-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
                  aria-label="Increase"
                  data-testid={`qty-increase-${item.id}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 w-8 h-8 rounded-full border border-primary/40 hover:bg-primary hover:text-primary-foreground hover:border-primary text-primary flex items-center justify-center"
                aria-label={`Add ${item.name}`}
                data-testid={`add-to-cart-${item.id}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            )
          ) : (
            <a
              href={`https://wa.me/91${config.phone}?text=${encodeURIComponent(`I want to order ${item.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wider uppercase text-primary hover:text-accent transition-colors"
              data-testid={`order-whatsapp-${item.id}`}
            >
              Order
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ----------------------------- Category Tabs ----------------------------- */
const CategoryTabs = ({ active, onChange }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  // Scroll active tab into view on change
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector(`[data-cat="${active}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [active]);

  const scrollBy = (dx) => {
    scrollRef.current?.scrollBy({ left: dx, behavior: 'smooth' });
  };

  return (
    <div className="relative mb-10 sm:mb-14">
      {/* Edge fades */}
      <div
        className={`pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-background to-transparent z-10 transition-opacity ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background to-transparent z-10 transition-opacity ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Scroll buttons (desktop) */}
      {canScrollLeft && (
        <button
          onClick={() => scrollBy(-260)}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-background border border-border shadow-sm items-center justify-center hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scrollBy(260)}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-background border border-border shadow-sm items-center justify-center hover:bg-secondary transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto no-scrollbar px-2 md:px-12 py-2 scroll-smooth"
        data-testid="menu-category-tabs"
      >
        {menuCategories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => onChange(cat.id)}
              data-testid={`menu-tab-${cat.id}`}
              className={`shrink-0 px-4 sm:px-5 py-2.5 text-sm tracking-wide whitespace-nowrap rounded-full border transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-primary/40'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------ Category Header --------------------------- */
const CategoryHeader = ({ category }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-8 sm:mb-10"
  >
    <div className="inline-flex items-center gap-3 text-accent/80">
      <span className="h-px w-8 sm:w-12 bg-accent/60" />
      <Leaf className="w-4 h-4" />
      <span className="h-px w-8 sm:w-12 bg-accent/60" />
    </div>
    <h3 className="font-elegant text-3xl sm:text-4xl text-foreground mt-3 mb-1">{category.name}</h3>
    {category.tagline && (
      <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-muted-foreground/80">
        {category.tagline}
      </p>
    )}
  </motion.div>
);

/* --------------------------------- Section ------------------------------- */
export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('signature');
  const { cart, adminSettings } = useApp();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const activeCatMeta = menuCategories.find((c) => c.id === activeCategory) || menuCategories[0];
  const items = menuItems[activeCategory] || [];
  const isSignature = activeCategory === 'signature';

  return (
    <section id="menu" className="section-spacing bg-background relative overflow-hidden">
      {/* Subtle backdrop ornament */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 10%, hsl(150 35% 22% / 0.6), transparent 40%), radial-gradient(circle at 80% 80%, hsl(42 75% 50% / 0.5), transparent 40%)',
        }}
      />

      <div className="section-container relative">
        <SectionTitle
          subtitle="Our Menu"
          title="A Taste of Tradition"
          description="Crafted with premium ingredients and timeless techniques — every plate, a quiet celebration."
        />

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        {/* Category header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + '-header'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryHeader category={activeCatMeta} />
          </motion.div>
        </AnimatePresence>

        {/* Menu content */}
        <AnimatePresence mode="wait">
          {isSignature ? (
            <motion.div
              key="signature-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {items.map((item) => (
                <SignatureCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              {/* Two-column list on desktop, single on mobile */}
              <div className="grid md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
                {items.map((item, idx) => (
                  <MenuRow key={item.id} item={item} index={idx} />
                ))}
              </div>

              {/* Footer note */}
              <p className="text-center text-xs tracking-[0.2em] uppercase text-muted-foreground/70 mt-10">
                All prices are inclusive of taxes • Pure Vegetarian Kitchen
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Cart Summary (mobile) */}
        {adminSettings.orderingEnabled && totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 md:hidden"
            data-testid="floating-cart-summary"
          >
            <Button variant="default" size="lg" className="shadow-xl gap-2 rounded-full px-6">
              <ShoppingCart className="w-5 h-5" />
              <span>{totalItems} items in cart</span>
              <Check className="w-4 h-4 opacity-70" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
