"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Package, 
  MapPin, 
  User, 
  Truck, 
  CheckCircle2, 
  XCircle,
  Loader2,
  ChevronRight,
  Clock,
  ArrowRight,
  AlertCircle
} from "lucide-react";

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  deliveryAddress: string;
  deliveryRequired: boolean;
  orderedAt: string;
  buyer: {
    fullName: string;
    phone: string;
  };
}

interface DeliveryPerson {
  id: number;
  fullName: string;
  vehicleNumber: string;
  vehicleType: string;
}

const API_BASE_URL = "http://localhost:8080/govisaviya/api/v1/marketplace";
const DELIVERY_API_URL = "http://localhost:8080/govisaviya/api/v1/delivery";

export default function FarmerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryPersons, setDeliveryPersons] = useState<DeliveryPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningOrder, setAssigningOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
    fetchDeliveryPersons();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/orders/farmer`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryPersons = async () => {
    try {
      const response = await axios.get(`${DELIVERY_API_URL}/persons`);
      setDeliveryPersons(response.data);
    } catch (err) {
      console.error("Failed to fetch delivery persons:", err);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_BASE_URL}/orders/${orderId}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const assignDelivery = async (orderId: number, deliveryPersonId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${DELIVERY_API_URL}/assign`, null, {
        params: { orderId, deliveryPersonId },
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssigningOrder(null);
      fetchOrders();
      alert("Delivery person assigned successfully!");
    } catch (err) {
      alert("Failed to assign delivery person");
    }
  };

  if (loading) {
    return (
      <div className="p-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-textSecondary font-bold text-lg">Loading your orders...</p>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'PENDING');
  const otherOrders = orders.filter(o => o.status !== 'PENDING');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-textPrimary">Order Management</h1>
        <p className="text-textSecondary">Manage incoming orders and coordinate deliveries.</p>
      </div>

      {/* Pending Orders Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-textPrimary flex items-center gap-2">
          New Orders {pendingOrders.length > 0 && <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">{pendingOrders.length}</span>}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingOrders.map(order => (
            <div key={order.id} className="bg-backgroundSecondary border border-borderPrimary rounded-[2rem] p-6 shadow-sm hover:border-primary/40 transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">New Request</span>
                <span className="text-xs text-textSecondary font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(order.orderedAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-lg font-bold text-textPrimary mb-4">Order #{order.id}</h3>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                  <User className="w-4 h-4 text-primary" /> {order.buyer.fullName}
                </div>
                <div className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                  <Package className="w-4 h-4 text-primary" /> Total: Rs. {order.totalAmount}
                </div>
                {order.deliveryRequired && (
                   <div className="flex items-center gap-2 text-xs text-orange-500 font-black bg-orange-500/10 px-3 py-1 rounded-lg w-fit">
                    <Truck className="w-3 h-3" /> Delivery Requested
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                   onClick={() => updateOrderStatus(order.id, 'ACCEPTED')}
                   className="flex-1 py-3 bg-primary text-backgroundSecondary rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all"
                >
                  Accept
                </button>
                <button 
                  onClick={() => updateOrderStatus(order.id, 'REJECTED')}
                  className="px-4 py-3 border border-destructive/20 text-destructive rounded-xl font-black text-xs uppercase hover:bg-destructive/5 transition-all"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {pendingOrders.length === 0 && (
            <div className="col-span-full py-12 bg-hoverPrimary/20 rounded-[2rem] border border-dashed border-borderPrimary text-center">
              <p className="text-textSecondary font-medium">No new orders to show.</p>
            </div>
          )}
        </div>
      </div>

      {/* Active/History Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-textPrimary">Recent Activity</h2>
        <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-hoverPrimary/50 border-b border-borderPrimary">
                <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Order ID</th>
                <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Buyer</th>
                <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Amount</th>
                <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Status</th>
                <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {otherOrders.map(order => (
                <tr key={order.id} className="border-b border-borderPrimary hover:bg-hoverPrimary/30 transition-colors">
                  <td className="p-6 font-bold text-textPrimary">#{order.id}</td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-textPrimary">{order.buyer.fullName}</span>
                      <span className="text-[10px] text-textSecondary uppercase tracking-widest">{order.buyer.phone}</span>
                    </div>
                  </td>
                  <td className="p-6 font-bold text-textPrimary">Rs. {order.totalAmount}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      order.status === 'ACCEPTED' ? 'bg-primary/10 text-primary' :
                      order.status === 'ASSIGNED' ? 'bg-blue-500/10 text-blue-500' :
                      order.status === 'PICKED_UP' ? 'bg-orange-500/10 text-orange-500' :
                      order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-500' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    {order.status === 'ACCEPTED' && order.deliveryRequired && (
                      <button 
                        onClick={() => setAssigningOrder(order)}
                        className="px-4 py-2 bg-primary text-backgroundSecondary rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
                      >
                        <Truck className="w-3 h-3" /> Assign Delivery
                      </button>
                    )}
                    {(!order.deliveryRequired || order.status === 'DELIVERED') && (
                        <span className="text-textSecondary text-[10px] font-bold opacity-50 uppercase tracking-widest">No Action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {assigningOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-backgroundSecondary w-full max-w-lg rounded-[3rem] border border-borderPrimary shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-borderPrimary flex justify-between items-center bg-hoverPrimary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary text-backgroundSecondary shadow-lg">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-textPrimary tracking-tight">Assign Delivery</h2>
                  <p className="text-xs font-bold text-textSecondary uppercase tracking-widest">Order #{assigningOrder.id}</p>
                </div>
              </div>
              <button onClick={() => setAssigningOrder(null)} className="p-3 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all text-textSecondary">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
              <p className="text-sm font-bold text-textSecondary mb-4">Select a verified delivery person from the list below:</p>
              {deliveryPersons.map(person => (
                <div key={person.id} className="p-4 rounded-2xl bg-hoverPrimary/30 border border-borderPrimary flex items-center justify-between group hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-textPrimary">{person.fullName}</h4>
                      <p className="text-[10px] text-textSecondary font-black uppercase tracking-widest">{person.vehicleType} • {person.vehicleNumber}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => assignDelivery(assigningOrder.id, person.id)}
                    className="p-3 bg-textPrimary text-backgroundSecondary rounded-xl hover:bg-primary transition-all scale-0 group-hover:scale-100 uppercase text-[10px] font-black"
                  >
                    Assign
                  </button>
                </div>
              ))}
              {deliveryPersons.length === 0 && (
                <div className="p-8 text-center text-textSecondary font-medium">
                  <AlertCircle className="w-8 h-8 text-orange-500 mx-auto mb-2 opacity-50" />
                  No delivery persons available in your area.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
