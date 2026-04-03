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
  Phone,
  BarChart3
} from "lucide-react";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_MARKET = "http://localhost:8080/govisaviya/api/v1/marketplace";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_MARKET}/orders/buyer`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-textSecondary font-bold">Retrieving Order Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-textPrimary mb-2">My Shopping Ledger</h1>
          <p className="text-textSecondary text-lg font-medium">Track your active shipments and view your transaction history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(!Array.isArray(orders) || orders.length === 0) ? (
          <div className="col-span-2 border-2 border-dashed border-borderPrimary rounded-[2.5rem] p-20 text-center bg-backgroundSecondary shadow-sm">
             <Package className="w-16 h-16 text-textSecondary opacity-20 mx-auto mb-6" />
             <h3 className="text-xl font-bold text-textPrimary mb-2">No Order History Found</h3>
             <p className="text-textSecondary font-medium mb-8">You haven't placed any orders yet. Visit the marketplace to start your journey.</p>
             <button onClick={() => window.location.href='/dashboard/marketplace'} className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-primary/30 transition-all">Go to Marketplace</button>
          </div>
        ) : orders.slice().reverse().map((order) => (

           <div key={order.id} className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] p-8 shadow-sm hover:border-primary/40 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-all transform group-hover:scale-110 pointer-events-none">
                 <Package className="w-32 h-32" />
              </div>
              
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary opacity-60">Order Ledger</span>
                    <h3 className="text-2xl font-black text-textPrimary mt-1 underline decoration-primary/20 decoration-2 underline-offset-4">#{order.id}</h3>
                 </div>
                 <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    order.status === 'PENDING' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                    order.status === 'ACCEPTED' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-[0_5px_15px_rgba(37,99,235,0.1)]' :
                    order.status === 'ASSIGNED' ? 'bg-purple-500/10 text-purple-600 border-purple-500/20 shadow-[0_5px_15px_rgba(147,51,234,0.1)]' :
                    order.status === 'PICKED_UP' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20 shadow-[0_5px_15px_rgba(234,88,12,0.1)]' :
                    order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-600 border-green-500/20 shadow-[0_5px_15px_rgba(22,163,74,0.1)]' :
                    'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    {order.status}
                 </span>
              </div>

              <div className="flex flex-col gap-6 py-6 border-y border-borderPrimary/60">
                 {/* Items List */}
                 <div className="space-y-3">
                    <p className="text-[9px] font-black text-textSecondary uppercase tracking-widest opacity-70 mb-2">Inventory Manifest</p>
                    {order.items?.map((item: any) => (
                       <div key={item.id} className="flex items-center justify-between bg-hoverPrimary/40 p-3 rounded-xl border border-primary/5 group/item hover:border-primary/20 transition-all">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-backgroundSecondary flex items-center justify-center text-primary border border-borderPrimary">
                                <Package className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-xs font-bold text-textPrimary">{item.product?.name || "Product Record"}</p>
                                <p className="text-[10px] text-textSecondary font-medium">{item.quantity} {item.product?.unit || 'units'} @ Rs. {item.priceAtOrder}</p>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="flex items-start gap-4">

                    <div className="h-10 h-10 bg-hoverPrimary rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                       <MapPin className="text-primary w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-textSecondary uppercase tracking-widest mb-1 opacity-70">Destination Node</p>
                       <p className="font-bold text-textPrimary text-sm leading-tight">{order.deliveryRequired ? order.deliveryAddress : "Self-Pickup at Farm Location"}</p>
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="h-10 h-10 bg-hoverPrimary rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                          <BarChart3 className="text-primary w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-textSecondary uppercase tracking-widest mb-1 opacity-70">Financial Value</p>
                          <p className="font-black text-textPrimary text-lg">Rs. {order.totalAmount.toLocaleString()}</p>
                       </div>
                    </div>
                    
                    <div className="text-right">
                       <p className="text-[9px] font-black text-textSecondary uppercase tracking-widest mb-1 opacity-70">Fulfillment Date</p>
                       <p className="font-bold text-textPrimary text-sm">{new Date(order.orderedAt).toLocaleDateString()}</p>
                    </div>
                 </div>
              </div>

              <div className="pt-8 flex items-center justify-between">
                 {order.status === 'PENDING' ? (
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest italic flex items-center gap-2">
                       <Clock className="w-3.5 h-3.5" /> Waiting for Farmer Acceptance
                    </p>
                 ) : order.status === 'ACCEPTED' ? (
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic flex items-center gap-2">
                       <CheckCircle2 className="w-3.5 h-3.5" /> Farmer Preparing Order
                    </p>
                 ) : order.status === 'ASSIGNED' ? (
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest italic flex items-center gap-2">
                       <Truck className="w-3.5 h-3.5" /> Delivery Partner Confirmed
                    </p>
                 ) : order.status === 'PICKED_UP' ? (
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest italic flex items-center gap-2 animate-pulse">
                       <MapPin className="w-3.5 h-3.5" /> Package In Transit
                    </p>
                 ) : order.status === 'DELIVERED' ? (
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest italic flex items-center gap-2">
                       <CheckCircle2 className="w-3.5 h-3.5" /> Transaction Successful
                    </p>
                 ) : (
                    <p className="text-[10px] font-black text-destructive uppercase tracking-widest italic flex items-center gap-2">
                       <XCircle className="w-3.5 h-3.5" /> Order Resolution Failed
                    </p>
                 )}
                 
                 <button className="h-12 w-12 rounded-2xl bg-textPrimary text-white flex items-center justify-center hover:bg-primary transition-all shadow-md group-hover:scale-105">
                    <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}
