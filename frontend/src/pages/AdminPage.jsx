import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings, ShoppingBag, Star, Truck, Clock, Bell, Check, X, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  const { adminSettings, setAdminSettings, orders, updateOrderStatus, reviews, approveReview } = useApp();
  const [localSettings, setLocalSettings] = useState(adminSettings);

  const saveSettings = () => {
    setAdminSettings(localSettings);
    toast.success('Settings saved!');
  };

  const statusColors = {
    placed: 'bg-blue-500',
    preparing: 'bg-amber-500',
    'out-for-delivery': 'bg-purple-500',
    delivered: 'bg-green-500',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="section-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-elegant font-semibold flex items-center gap-2">
                  <Settings className="w-6 h-6" /> Admin Panel
                </h1>
                <p className="text-primary-foreground/70 text-sm">Kurry Leaf Restaurant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-8">
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />Settings</TabsTrigger>
            <TabsTrigger value="orders"><ShoppingBag className="w-4 h-4 mr-2" />Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="reviews"><Star className="w-4 h-4 mr-2" />Reviews ({reviews.length})</TabsTrigger>
          </TabsList>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Ordering Toggle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShoppingBag className="w-5 h-5" />Ordering System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Online Ordering</Label>
                  <Switch
                    checked={localSettings.orderingEnabled}
                    onCheckedChange={(v) => setLocalSettings({ ...localSettings, orderingEnabled: v })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Truck className="w-5 h-5" />Delivery Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Free Delivery Minimum (₹)</Label>
                  <Input
                    type="number"
                    value={localSettings.freeDeliveryMin}
                    onChange={(e) => setLocalSettings({ ...localSettings, freeDeliveryMin: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {localSettings.deliverySlabs.map((slab, i) => (
                    <div key={i}>
                      <Label>0-{slab.maxKm}km (₹)</Label>
                      <Input
                        type="number"
                        value={slab.charge}
                        onChange={(e) => {
                          const slabs = [...localSettings.deliverySlabs];
                          slabs[i].charge = Number(e.target.value);
                          setLocalSettings({ ...localSettings, deliverySlabs: slabs });
                        }}
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Peak Time Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" />Peak Time Charge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Peak Charge</Label>
                  <Switch
                    checked={localSettings.peakChargeEnabled}
                    onCheckedChange={(v) => setLocalSettings({ ...localSettings, peakChargeEnabled: v })}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Start Hour (24h)</Label>
                    <Input
                      type="number"
                      value={localSettings.peakHours.start}
                      onChange={(e) => setLocalSettings({ ...localSettings, peakHours: { ...localSettings.peakHours, start: Number(e.target.value) } })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>End Hour (24h)</Label>
                    <Input
                      type="number"
                      value={localSettings.peakHours.end}
                      onChange={(e) => setLocalSettings({ ...localSettings, peakHours: { ...localSettings.peakHours, end: Number(e.target.value) } })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Charge (₹)</Label>
                    <Input
                      type="number"
                      value={localSettings.peakCharge}
                      onChange={(e) => setLocalSettings({ ...localSettings, peakCharge: Number(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" />WhatsApp Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Admin Alerts</Label>
                  <Switch
                    checked={localSettings.whatsappAlertsEnabled}
                    onCheckedChange={(v) => setLocalSettings({ ...localSettings, whatsappAlertsEnabled: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Customer Alerts</Label>
                  <Switch
                    checked={localSettings.customerWhatsappEnabled}
                    onCheckedChange={(v) => setLocalSettings({ ...localSettings, customerWhatsappEnabled: v })}
                  />
                </div>
              </CardContent>
            </Card>

            <Button onClick={saveSettings} className="w-full" size="lg">Save All Settings</Button>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card><CardContent className="py-12 text-center text-muted-foreground">No orders yet</CardContent></Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer.name} • {order.customer.phone}</p>
                      </div>
                      <Badge className={statusColors[order.status]}>{order.status}</Badge>
                    </div>
                    <div className="text-sm space-y-1 mb-3">
                      {order.items.map((item) => (
                        <p key={item.id}>{item.name} x{item.quantity} = ₹{item.price * item.quantity}</p>
                      ))}
                    </div>
                    <p className="font-semibold">Total: ₹{order.total}</p>
                    <div className="flex gap-2 mt-3">
                      {['placed', 'preparing', 'out-for-delivery', 'delivered'].map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={order.status === status ? 'default' : 'outline'}
                          onClick={() => updateOrderStatus(order.id, status)}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            {reviews.length === 0 ? (
              <Card><CardContent className="py-12 text-center text-muted-foreground">No reviews yet</CardContent></Card>
            ) : (
              reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <div className="flex items-center gap-1 text-accent">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">"{review.text}"</p>
                      </div>
                      {!review.approved ? (
                        <div className="flex gap-2">
                          <Button size="sm" variant="default" onClick={() => approveReview(review.id)}>
                            <Check className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Badge variant="secondary">Approved</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
