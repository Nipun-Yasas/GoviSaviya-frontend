"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Package, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Loader2,
  Trash2,
  User,
  Phone
} from "lucide-react";

export default function FarmerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [deliveryPersons, setDeliveryPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningOrder, setAssigningOrder] = useState<any | null>(null);

  const API_MARKET = "http://localhost:8080/govisaviya/api/v1/marketplace";
  const API_DELIVERY = "http://localhost:8080/govisaviya/api/v1/delivery";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const [orderRes, driverRes] = await Promise.all([
        axios.get(`${API_MARKET}/orders/farmer`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_DELIVERY}/persons`)
      ]);
      setOrders(orderRes.data);
      setDeliveryPersons(driverRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_MARKET}/orders/${id}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const assignDelivery = async (orderId: number, deliveryPersonId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_DELIVERY}/assign`, null, {
        params: { orderId, deliveryPersonId },
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssigningOrder(null);
      fetchData();
      alert("Driver assigned successfully!");
    } catch (err) {
      alert("Assignment failed");
    }
  };

  if (loading) {
    return (
      <div className="p-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-textSecondary font-bold">Loading Order Management Matrix...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-textPrimary mb-2">Order Management</h1>
          <p className="text-textSecondary text-lg font-medium">Accept orders, manage logistics, and Track fulfillment.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex bg-backgroundSecondary border border-borderPrimary px-4 py-2 rounded-xl text-xs font-bold items-center gap-3">
              <Search className="w-4 h-4 text-textSecondary" />
              <input placeholder="Filter by IDs or names..." className="bg-transparent outline-none w-48" />
           </div>
           <button className="p-3 bg-backgroundSecondary border border-borderPrimary rounded-xl hover:bg-hoverPrimary transition-all">
              <Filter className="w-5 h-5 text-textSecondary" />
           </button>
        </div>
      </div>

      <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-hoverPrimary/50 border-b border-borderPrimary">
                <th className="p-6 text-[10px] font-black uppercase text-textSecondary tracking-widest">Order ID</th>
                <th className="p-6 text-[10px] font-black uppercase text-textSecondary tracking-widest">Customer Details</th>
                <th className="p-6 text-[10px] font-black uppercase text-textSecondary tracking-widest">Revenue</th>
                <th className="p-6 text-[10px] font-black uppercase text-textSecondary tracking-widest">Logistics</th>
                <th className="p-6 text-[10px] font-black uppercase text-textSecondary tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black uppercase text-textSecondary tracking-widest text-center">Control</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                   <td colSpan={6} className="p-20 text-center text-textSecondary font-bold italic opacity-50">No orders recorded in your history.</td>
                </tr>
              ) : orders.slice().reverse().map((order) => (
                <tr key={order.id} className="border-b border-borderPrimary hover:bg-hoverPrimary/20 transition-all group">
                  <td className="p-6">
                    <span className="font-black text-textPrimary">#{order.id}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-textPrimary">{order.buyer.fullName}</span>
                      <span className="text-[10px] text-textSecondary font-black uppercase tracking-widest mt-1">{order.buyer.phone}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="font-black text-primary text-lg">Rs. {order.totalAmount}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1">
                      <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded w-fit ${order.deliveryRequired ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'}`}>
                        {order.deliveryRequired ? 'Direct Delivery' : 'Farm Pickup'}
                      </span>
                      {order.deliveryRequired && (
                        <span className="text-[10px] text-textSecondary font-medium flex items-center max-w-[150px] truncate"><MapPin className="w-3 h-3 mr-1" /> {order.deliveryAddress}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      order.status === 'PENDING' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                      order.status === 'ACCEPTED' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                      order.status === 'ASSIGNED' ? 'bg-purple-500/10 text-purple-600 border-purple-500/20' :
                      order.status === 'PICKED_UP' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' :
                      order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                      'bg-destructive/10 text-destructive border-destructive/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      {order.status === 'PENDING' && (
                        <>
                          <button onClick={() => updateStatus(order.id, 'ACCEPTED')} className="p-2.5 bg-primary text-white rounded-xl hover:scale-105 transition-transform" title="Accept">
                             <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => updateStatus(order.id, 'REJECTED')} className="p-2.5 border border-destructive/20 text-destructive rounded-xl hover:bg-destructive/5 transition-all" title="Reject">
                             <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {order.status === 'ACCEPTED' && order.deliveryRequired && (
                        <button onClick={() => setAssigningOrder(order)} className="px-4 py-2 bg-blue-500 text-white text-[10px] font-black uppercase rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                           <Truck className="w-4 h-4" /> Assign Driver
                        </button>
                      )}

                      {order.status === 'ACCEPTED' && !order.deliveryRequired && (
                        <button onClick={() => updateStatus(order.id, 'DELIVERED')} className="px-4 py-2 bg-green-500 text-white text-[10px] font-black uppercase rounded-lg hover:shadow-lg transition-all">
                           Complete Pickup
                        </button>
                      )}

                      {(order.status === 'ASSIGNED' || order.status === 'PICKED_UP' || order.status === 'DELIVERED') && (
                        <button className="p-2.5 text-textSecondary hover:text-primary transition-all">
                           <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {assigningOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-backgroundSecondary w-full max-w-lg rounded-[3rem] border border-borderPrimary shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-borderPrimary flex justify-between items-center bg-hoverPrimary/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-500 text-white shadow-lg">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-textPrimary tracking-tight">Assign Partner</h2>
                    <p className="text-xs font-bold text-textSecondary uppercase tracking-widest">Order #{assigningOrder.id}</p>
                  </div>
                </div>
                <button onClick={() => setAssigningOrder(null)} className="p-3 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all text-textSecondary">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                {deliveryPersons.map(person => (
                  <div key={person.id} className="p-5 rounded-2xl bg-hoverPrimary/30 border border-borderPrimary flex items-center justify-between group hover:border-blue-400 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-textPrimary">{person.fullName}</h4>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[9px] bg-white border border-borderPrimary px-2 py-0.5 rounded font-black text-textSecondary uppercase">{person.vehicleType}</span>
                          <span className="text-[9px] bg-white border border-borderPrimary px-2 py-0.5 rounded font-black text-textSecondary uppercase">{person.vehicleNumber}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => assignDelivery(assigningOrder.id, person.id)}
                      className="px-5 py-2.5 bg-blue-500 text-white rounded-xl opacity-0 group-hover:opacity-100 uppercase text-[10px] font-black transition-all shadow-lg active:scale-95"
                    >
                      Assign
                    </button>
                  </div>
                ))}
                {deliveryPersons.length === 0 && (
                   <div className="text-center py-10">
                      <p className="text-textSecondary font-bold text-sm">No drivers currently available.</p>
                   </div>
                )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
