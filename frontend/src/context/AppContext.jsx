import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// Restaurant Config
const RESTAURANT_CONFIG = {
  name: 'Kurry Leaf',
  email: 'Kurryleafrestarant@gmail.com',
  phone: '9270209612',
  address: 'Bank Colony, Ambajogai (Near Yashwantrao Chavan Chowk)',
  instagram: 'kurryleafrestaurant',
  coordinates: { lat: 18.7377, lng: 76.3863 },
  currency: '₹',
  freeDeliveryMin: 299,
  deliverySlabs: [
    { maxKm: 2, charge: 0 },
    { maxKm: 5, charge: 20 },
    { maxKm: 8, charge: 30 },
  ],
  peakHours: { start: 18, end: 21 }, // 6 PM - 9 PM
  peakCharge: 10,
};

// Default Admin Settings
const DEFAULT_ADMIN_SETTINGS = {
  orderingEnabled: true,
  peakChargeEnabled: true,
  peakHours: { start: 18, end: 21 },
  peakCharge: 10,
  whatsappAlertsEnabled: true,
  customerWhatsappEnabled: true,
  deliverySlabs: RESTAURANT_CONFIG.deliverySlabs,
  freeDeliveryMin: 299,
};

export const AppProvider = ({ children }) => {
  // Cart State (persisted in localStorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('kurryleaf_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [customerLocation, setCustomerLocation] = useState(null);
  const [deliveryDistance, setDeliveryDistance] = useState(null);
  
  // Admin Settings (persisted in localStorage)
  const [adminSettings, setAdminSettings] = useState(() => {
    const saved = localStorage.getItem('kurryleaf_admin_settings');
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_SETTINGS;
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('kurryleaf_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Reviews State
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('kurryleaf_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem('kurryleaf_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist admin settings
  useEffect(() => {
    localStorage.setItem('kurryleaf_admin_settings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  // Persist orders
  useEffect(() => {
    localStorage.setItem('kurryleaf_orders', JSON.stringify(orders));
  }, [orders]);

  // Persist reviews
  useEffect(() => {
    localStorage.setItem('kurryleaf_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Calculate if peak time
  const isPeakTime = () => {
    if (!adminSettings.peakChargeEnabled) return false;
    const hour = new Date().getHours();
    return hour >= adminSettings.peakHours.start && hour < adminSettings.peakHours.end;
  };

  // Calculate delivery charge based on distance
  const getDeliveryCharge = (distance) => {
    if (distance === null) return 0;
    
    for (const slab of adminSettings.deliverySlabs) {
      if (distance <= slab.maxKm) return slab.charge;
    }
    return -1; // Not available
  };

  // Check if delivery available
  const isDeliveryAvailable = (distance) => {
    if (distance === null) return true;
    const maxDistance = Math.max(...adminSettings.deliverySlabs.map(s => s.maxKm));
    return distance <= maxDistance;
  };

  // Cart functions
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
    }
  };

  const clearCart = () => setCart([]);

  // Calculate totals
  const getCartSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const getDeliveryFee = () => {
    const subtotal = getCartSubtotal();
    if (subtotal >= adminSettings.freeDeliveryMin) return 0;
    return getDeliveryCharge(deliveryDistance);
  };

  const getPeakCharge = () => isPeakTime() ? adminSettings.peakCharge : 0;

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const delivery = getDeliveryFee();
    const peak = getPeakCharge();
    if (delivery === -1) return -1; // Delivery not available
    return subtotal + delivery + peak;
  };

  // Order functions
  const createOrder = (customerInfo) => {
    const orderId = `KL${Date.now().toString(36).toUpperCase()}`;
    const newOrder = {
      id: orderId,
      items: [...cart],
      subtotal: getCartSubtotal(),
      deliveryCharge: getDeliveryFee(),
      peakCharge: getPeakCharge(),
      total: getCartTotal(),
      customer: customerInfo,
      status: 'placed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // Review functions
  const addReview = (review) => {
    const newReview = {
      id: Date.now(),
      ...review,
      createdAt: new Date().toISOString(),
      approved: false,
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const approveReview = (reviewId) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, approved: true } : r));
  };

  const getApprovedReviews = () => reviews.filter(r => r.approved);

  const getAverageRating = () => {
    const approved = getApprovedReviews();
    if (approved.length === 0) return 0;
    return (approved.reduce((sum, r) => sum + r.rating, 0) / approved.length).toFixed(1);
  };

  const value = {
    config: RESTAURANT_CONFIG,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartSubtotal,
    getDeliveryFee,
    getPeakCharge,
    getCartTotal,
    customerLocation,
    setCustomerLocation,
    deliveryDistance,
    setDeliveryDistance,
    isDeliveryAvailable,
    isPeakTime,
    adminSettings,
    setAdminSettings,
    orders,
    createOrder,
    updateOrderStatus,
    reviews,
    addReview,
    approveReview,
    getApprovedReviews,
    getAverageRating,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
