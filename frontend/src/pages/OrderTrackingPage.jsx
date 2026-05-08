import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Truck, Package, ArrowLeft, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const stages = [
  { key: 'placed', label: 'Order Placed', icon: Package },
  { key: 'preparing', label: 'Preparing', icon: Clock },
  { key: 'out-for-delivery', label: 'Out for Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const { orders, config } = useApp();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-6">We couldn't find order #{orderId}</p>
            <Link to="/">
              <Button><ArrowLeft className="w-4 h-4 mr-2" /> Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStageIndex = stages.findIndex(s => s.key === order.status);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="section-container">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-2xl font-elegant font-semibold">Order #{order.id}</h1>
          <p className="text-primary-foreground/70">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="section-container py-8 max-w-2xl mx-auto">
        {/* Progress Tracker */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-6">Order Status</h3>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />
              <div
                className="absolute left-6 top-0 w-0.5 bg-primary transition-all"
                style={{ height: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
              />

              {/* Stages */}
              <div className="space-y-8">
                {stages.map((stage, index) => {
                  const isCompleted = index <= currentStageIndex;
                  const isCurrent = index === currentStageIndex;
                  return (
                    <motion.div
                      key={stage.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 relative z-10"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                        <stage.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {stage.label}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-primary">Current Status</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Order Details</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span>₹{order.deliveryCharge}</span>
                </div>
                {order.peakCharge > 0 && (
                  <div className="flex justify-between text-sm text-amber-600">
                    <span>Peak Charge</span>
                    <span>₹{order.peakCharge}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Info */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Delivery To</h3>
            <p className="font-medium">{order.customer.name}</p>
            <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
            <p className="text-sm text-muted-foreground mt-2">{order.customer.address}</p>
            
            <div className="mt-4 p-3 bg-accent/10 rounded-lg">
              <p className="text-sm font-medium">Estimated Delivery</p>
              <p className="text-lg font-semibold text-primary">
                {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <Button variant="outline" className="w-full mt-4" onClick={() => window.open(`tel:+91${config.phone}`)}>
              <Phone className="w-4 h-4 mr-2" /> Call Restaurant
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
