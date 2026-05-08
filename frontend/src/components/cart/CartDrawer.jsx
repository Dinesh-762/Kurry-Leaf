import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Minus, Trash2, MapPin, Clock, Truck, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

export const CartDrawer = () => {
  const {
    cart, updateQuantity, removeFromCart, clearCart,
    getCartSubtotal, getDeliveryFee, getPeakCharge, getCartTotal,
    adminSettings, config, isPeakTime, createOrder
  } = useApp();
  
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [isCheckout, setIsCheckout] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee();
  const peakCharge = getPeakCharge();
  const total = getCartTotal();
  const isFreeDelivery = subtotal >= adminSettings.freeDeliveryMin;

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error('Please fill all details');
      return;
    }

    const order = createOrder(customerInfo);
    
    // WhatsApp message
    const items = cart.map(i => `${i.name} x${i.quantity} = ₹${i.price * i.quantity}`).join('\n');
    const msg = `🍃 *NEW ORDER - ${order.id}*\n\n📋 *Items:*\n${items}\n\n💰 Subtotal: ₹${subtotal}\n🚚 Delivery: ₹${deliveryFee}\n${peakCharge > 0 ? `⏰ Peak Charge: ₹${peakCharge}\n` : ''}*Total: ₹${total}*\n\n👤 *Customer:*\n${customerInfo.name}\n📞 ${customerInfo.phone}\n📍 ${customerInfo.address}\n\n⏱ ETA: 30-45 mins`;
    
    window.open(`https://wa.me/91${config.phone}?text=${encodeURIComponent(msg)}`, '_blank');
    
    toast.success(`Order ${order.id} placed!`);
    setIsCheckout(false);
    setCustomerInfo({ name: '', phone: '', address: '' });
  };

  if (!adminSettings.orderingEnabled || totalItems === 0) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-accent text-accent-foreground rounded-full text-xs font-bold flex items-center justify-center">
            {totalItems}
          </span>
        </motion.button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart ({totalItems} items)
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review your cart items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Cart Items */}
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-3 p-3 bg-secondary/50 rounded-lg"
              >
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-primary font-semibold">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Free Delivery Progress */}
          {!isFreeDelivery && (
            <div className="p-3 bg-accent/10 rounded-lg">
              <div className="flex items-center gap-2 text-sm mb-2">
                <Truck className="w-4 h-4 text-accent" />
                <span>Add ₹{adminSettings.freeDeliveryMin - subtotal} more for FREE delivery!</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${Math.min((subtotal / adminSettings.freeDeliveryMin) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Peak Time Notice */}
          {isPeakTime() && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-600">Peak Hours (6-9 PM)</p>
                <p className="text-muted-foreground">Additional ₹{adminSettings.peakCharge} charge applies</p>
              </div>
            </div>
          )}

          {/* Bill Summary */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery</span>
              <span className={isFreeDelivery ? 'text-green-600' : ''}>
                {isFreeDelivery ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            {peakCharge > 0 && (
              <div className="flex justify-between text-sm text-amber-600">
                <span>Peak Time Charge</span>
                <span>₹{peakCharge}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Checkout Form */}
          {isCheckout ? (
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Delivery Details
              </h4>
              <Input
                placeholder="Your Name *"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              />
              <Input
                placeholder="Phone Number *"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              />
              <Input
                placeholder="Delivery Address *"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsCheckout(false)} className="flex-1">Back</Button>
                <Button onClick={handlePlaceOrder} className="flex-1">Place Order</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-4">
              <Button className="w-full" size="lg" onClick={() => setIsCheckout(true)}>
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
