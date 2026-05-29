import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, X, ArrowLeft, Send, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const CartDrawer = () => {
  const { cart, addToCart, removeFromCart, config, adminSettings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '', distance: '2' });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getDeliveryCharge = () => {
    const dist = parseFloat(customerInfo.distance);
    const slab = adminSettings.deliverySlabs.find(s => dist <= s.maxKm);
    return slab ? slab.charge : adminSettings.deliverySlabs[adminSettings.deliverySlabs.length - 1]?.charge || 0;
  };

  const deliveryCharge = getDeliveryCharge();
  const total = subtotal + deliveryCharge;

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error('Please fill all delivery details');
      return;
    }
    const itemsList = cart.map(item => `${item.name} x${item.quantity} = ₹${item.price * item.quantity}`).join('\n');
    const msg = `New Order from ${config.name} Website\n\nCustomer: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}\n\nItems:\n${itemsList}\n\nSubtotal: ₹${subtotal}\nDelivery: ₹${deliveryCharge}\nTotal: ₹${total}`;
    const link = document.createElement('a');
    link.href = `https://wa.me/919270209612?text=${encodeURIComponent(msg)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
    setIsCheckout(false);
    toast.success('Order sent via WhatsApp!');
  };

  if (!adminSettings.orderingEnabled || totalItems === 0) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setIsOpen(true); setIsCheckout(false); }}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center"
        data-testid="cart-open-btn"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center font-bold">{totalItems}</span>
      </motion.button>

      {/* Summary Bar */}
      <motion.button
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        onClick={() => { setIsOpen(true); setIsCheckout(false); }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground py-3 px-6 flex items-center justify-center gap-2 shadow-lg"
        data-testid="cart-summary-bar"
      >
        <ShoppingCart className="w-4 h-4" />
        <span className="font-medium text-sm">{totalItems} item{totalItems > 1 ? 's' : ''} • ₹{subtotal}</span>
      </motion.button>

      {/* Backdrop + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60"
              data-testid="cart-backdrop"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[70] w-full sm:w-96 bg-background shadow-2xl flex flex-col"
              data-testid="cart-drawer"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                {isCheckout ? (
                  <button onClick={() => setIsCheckout(false)} className="flex items-center gap-2 text-foreground">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-semibold">Back to Cart</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    <h2 className="font-elegant text-lg font-semibold">Your Cart ({totalItems})</h2>
                  </div>
                )}
                <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-muted transition-colors" data-testid="cart-close-btn">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {!isCheckout ? (
                  /* Cart Items */
                  <div className="p-4 space-y-4" data-testid="cart-items-list">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 bg-secondary/30 rounded-lg" data-testid={`cart-item-${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md shrink-0"
                          onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="%23ccc"><rect width="80" height="80"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12" fill="%23999">No image</text></svg>'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm truncate">{item.name}</h4>
                          <p className="text-primary font-medium text-sm mt-1">₹{item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-7 h-7 rounded bg-muted flex items-center justify-center hover:bg-destructive/10 transition-colors"
                              data-testid={`cart-remove-${item.id}`}
                            >
                              {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-destructive" /> : <Minus className="w-3.5 h-3.5" />}
                            </button>
                            <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                              data-testid={`cart-add-${item.id}`}
                            >
                              <Plus className="w-3.5 h-3.5 text-primary" />
                            </button>
                            <span className="ml-auto text-sm font-semibold text-foreground">₹{item.price * item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Checkout Form */
                  <div className="p-4 space-y-4" data-testid="checkout-form">
                    <div className="space-y-3">
                      <Input
                        placeholder="Your Name *"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="h-11"
                        data-testid="checkout-name"
                      />
                      <Input
                        type="tel"
                        placeholder="Phone Number *"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="h-11"
                        data-testid="checkout-phone"
                      />
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Delivery Address *"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          className="h-11 pl-9"
                          data-testid="checkout-address"
                        />
                      </div>
                      <select
                        value={customerInfo.distance}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, distance: e.target.value })}
                        className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm"
                        data-testid="checkout-distance"
                      >
                        <option value="2">Within 2 km (Free delivery)</option>
                        <option value="4">2 - 5 km (₹20 delivery)</option>
                        <option value="7">5 - 8 km (₹30 delivery)</option>
                      </select>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold text-sm mb-3">Order Summary</h4>
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Delivery</span>
                          <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-base mt-1">
                          <span>Total</span>
                          <span className="text-primary">₹{total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t p-4 space-y-3">
                {!isCheckout ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Subtotal</span>
                      <span className="font-semibold text-lg">₹{subtotal}</span>
                    </div>
                    <Button onClick={() => setIsCheckout(true)} className="w-full h-12 text-base" data-testid="proceed-checkout-btn">
                      Proceed to Checkout
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleCheckout} className="w-full h-12 text-base gap-2" data-testid="place-order-btn">
                    <Send className="w-4 h-4" /> Place Order via WhatsApp
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
