"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Calendar,
  ShoppingBag,
  ArrowRight,
  TrendingDown,
  Loader2,
  XCircle,
  Truck
} from "lucide-react";
import Link from "next/link";

const API_BASE_URL = "http://localhost:8080/govisaviya/api/v1/marketplace";

interface OrderItem {
  id: number;
  product: { name: string };
  quantity: number;
  priceAtOrder: number;
}

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  orderDate: string;
  items: OrderItem[];
  deliveryAddress: string;
}

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/orders/buyer`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Order fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(o => {
    if (activeFilter === "ALL") return true;
    return o.status === activeFilter;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'SHIPPED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'DELIVERED': return 'bg-primary/10 text-primary border-primary/20';
      case 'CANCELLED': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-textSecondary/10 text-textSecondary border-textSecondary/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'SHIPPED': return <Truck className="w-4 h-4" />;
      case 'DELIVERED': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="p-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-textSecondary font-bold text-lg">Retrieving Order History...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
             <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase border border-primary/20">
                <ShoppingBag className="h-3 w-3 mr-2" /> Global History
             </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-textPrimary">Your Orders</h1>
          <p className="text-textSecondary text-lg font-medium mt-1">Track and manage your agricultural investments.</p>
        </div>
        
        <div className="flex flex-wrap gap-2 p-1.5 bg-backgroundSecondary border border-borderPrimary rounded-2xl w-fit shadow-sm">
          {["ALL", "PENDING", "SHIPPED", "DELIVERED"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeFilter === f ? "bg-primary text-backgroundSecondary shadow-lg" : "text-textSecondary hover:bg-hoverPrimary/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Orders Content */}
      {filteredOrders.length === 0 ? (
        <div className="p-32 flex flex-col items-center justify-center border-2 border-dashed border-borderPrimary rounded-[3rem] bg-backgroundSecondary/50 text-center">
           <div className="w-20 h-20 bg-backgroundSecondary border border-borderPrimary rounded-3xl flex items-center justify-center mb-6 shadow-sm opacity-50">
             <ShoppingBag className="w-10 h-10 text-textSecondary" />
           </div>
           <h3 className="text-2xl font-black text-textPrimary">No Orders Found</h3>
           <p className="text-textSecondary font-bold mt-2 max-w-xs">You haven't placed any orders matching this filter yet.</p>
           <Link href="/dashboard/marketplace" className="mt-10 px-8 py-4 bg-primary text-backgroundSecondary rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all">
              Launch Marketplace
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="relative group overflow-hidden bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
               <div className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  
                  {/* Left: Metadata */}
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-3xl bg-hoverPrimary flex flex-col items-center justify-center border border-borderPrimary shadow-sm">
                        <Calendar className="w-5 h-5 text-primary mb-0.5" />
                        <span className="text-[10px] font-black text-textSecondary uppercase">{new Date(order.orderDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                     </div>
                     <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-1">
                           <span className="text-xl font-black text-textPrimary tracking-tight">Order #{order.id}</span>
                           <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border flex items-center gap-2 ${getStatusStyle(order.status)}`}>
                              {getStatusIcon(order.status)} {order.status}
                           </span>
                        </div>
                        <div className="flex items-center text-xs font-bold text-textSecondary divide-x divide-borderPrimary">
                           <span className="pr-3 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> {order.deliveryAddress}</span>
                           <span className="pl-3">{order.items.length} Product Items</span>
                        </div>
                     </div>
                  </div>

                  {/* Center: Items Summary */}
                  <div className="flex flex-wrap gap-2 lg:flex-1 lg:px-8">
                     {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-background/50 border border-borderPrimary rounded-xl text-[10px] font-black text-textPrimary uppercase tracking-widest">
                           <span className="text-primary">{item.quantity}x</span> {item.product.name}
                        </div>
                     ))}
                  </div>

                  {/* Right: Total & Action */}
                  <div className="flex items-center gap-8 justify-between lg:justify-end">
                     <div className="text-right">
                        <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest leading-none mb-1">Total Paid</p>
                        <p className="text-3xl font-black text-textPrimary tracking-tighter leading-none">Rs. {order.totalAmount.toLocaleString()}</p>
                     </div>
                     <button className="h-14 w-14 bg-textPrimary hover:bg-primary text-backgroundSecondary rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-black/10 active:scale-95 group-hover:-rotate-6">
                        <ArrowRight className="w-6 h-6" />
                     </button>
                  </div>
               </div>
               
               {/* Progress Indicator Visualization (Simple for MVP) */}
               <div className="h-2 w-full bg-input rounded-b-[2.5rem] overflow-hidden flex">
                  <div className={`h-full transition-all duration-1000 ${
                    order.status === 'DELIVERED' ? 'w-full bg-primary' : 
                    order.status === 'SHIPPED' ? 'w-2/3 bg-blue-500' : 
                    'w-1/3 bg-amber-500'
                  }`} />
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
