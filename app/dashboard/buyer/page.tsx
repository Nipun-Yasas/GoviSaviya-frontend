"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Search,
  ShoppingCart,
  TrendingDown,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Filter,
  Vegan,
  Leaf,
  Apple,
  Loader2,
  Package
} from "lucide-react";
import Link from "next/link";

const API_BASE_URL = "http://localhost:8080/govisaviya/api/v1/marketplace";

interface ProductListing {
  id: number;
  name: string;
  pricePerUnit: number;
  unit: string;
  availableQuantity: number;
  location: string;
  farmer: { fullName: string; email: string };
  category: string;
}

interface Order {
  id: number;
  totalAmount: number;
  status: string;
}

export default function BuyerDashboard() {
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("userEmail");
        
        const [prodRes, orderRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/products`),
          axios.get(`${API_BASE_URL}/orders/buyer`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setListings(prodRes.data.slice(0, 3)); // Only show top 3 fresh listings
        setOrders(orderRes.data);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const activeOrders = orders.filter(o => o.status === 'PENDING' || o.status === 'SHIPPED').length;
    const totalSpent = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    return {
      activeOrders,
      totalSpent,
      totalFarmers: new Set(listings.map(l => l.farmer.email)).size
    };
  }, [orders, listings]);

  if (loading) {
    return (
      <div className="p-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-textSecondary font-bold">Initializing Buyer Command Center...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-textPrimary">
            Buyer Dashboard 
          </h1>
          <p className="text-textSecondary">
            Find the best quality produce directly from local farmers.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search crops..." 
              className="pl-10 pr-4 py-2.5 rounded-xl bg-backgroundSecondary border border-borderPrimary text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-72 transition-all shadow-sm"
            />
          </div>
          <button className="inline-flex items-center justify-center rounded-xl bg-backgroundSecondary px-4 py-2.5 text-sm font-medium text-textPrimary shadow-sm border border-borderPrimary hover:bg-hoverPrimary hover:text-primary transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-md border border-white/20">
              <TrendingDown className="h-4 w-4 mr-2" /> Market Insight
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tighter text-white">Harvest Season Begins</h2>
          <p className="text-white font-medium text-lg opacity-80 max-w-md leading-relaxed">
            Direct farmer connections are seeing a 20% increase in yield availability this month. Secure your supply now.
          </p>
          <Link href="/dashboard/marketplace" className="inline-flex mt-8 bg-white text-primary px-8 py-4 rounded-2xl text-sm font-black shadow-[0_10px_30px_rgba(255,255,255,0.3)] hover:shadow-white/40 transition-all hover:-translate-y-1 active:translate-y-0">
            Explorer Marketplace
          </Link>
        </div>
        
        <div className="hidden md:flex relative z-10 p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex-col items-center justify-center shadow-2xl">
          <Clock className="h-10 h-10 text-white mb-3" />
          <span className="text-4xl font-black tracking-tighter">LIVE</span>
          <span className="text-white/80 text-[10px] font-black mt-2 uppercase tracking-[0.2em]">Market Updates</span>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none rotate-12">
            <Package className="w-64 h-64" />
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { title: "Active Orders", value: stats.activeOrders, subtext: "Track your shipments", icon: Clock, color: "bg-blue-500" },
          { title: "Trusted Farmers", value: stats.totalFarmers, subtext: "From your network", icon: Star, color: "bg-amber-500" },
          { title: "Investment", value: `Rs. ${stats.totalSpent.toLocaleString()}`, subtext: "Total transactions", icon: Coins, color: "bg-emerald-500" },
        ].map((stat, i) => (
          <div key={i} className="rounded-[2.5rem] border border-borderPrimary bg-backgroundSecondary p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex items-center gap-6 group border-b-4 border-b-transparent hover:border-b-primary/40">
            <div className={`rounded-2xl p-4 ${stat.color} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
              <stat.icon className="h-8 w-8" />
            </div>
            <div>
              <p className="text-[10px] font-black text-textSecondary uppercase tracking-[0.2em] mb-1">{stat.title}</p>
              <p className="text-3xl font-black text-textPrimary tracking-tight">{stat.value}</p>
              <p className="mt-1 text-xs font-bold text-textSecondary opacity-70 italic">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fresh Listings */}
      <div className="rounded-[2.5rem] border border-borderPrimary bg-backgroundSecondary shadow-sm p-8 lg:p-12 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-black text-textPrimary tracking-tight">Prime Local Produce</h2>
            <p className="text-sm text-textSecondary mt-1 font-bold">Aggregated from verified direct-farmer connections</p>
          </div>
          <Link href="/dashboard/marketplace" className="text-sm font-black text-primary bg-primary/10 border border-primary/20 px-6 py-3.5 rounded-2xl hover:bg-primary/20 transition-all flex items-center shrink-0">
            Full Marketplace <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
        
        {listings.length === 0 ? (
          <div className="p-20 text-center border-2 border-dashed border-borderPrimary rounded-3xl opacity-50">
             <Package className="w-12 h-12 mx-auto mb-4 text-textSecondary" />
             <p className="font-bold text-textSecondary">No listings available at this moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((product) => (
                <ExploreCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Coins({ className }: { className?: string }) {
    return <ShoppingCart className={className} />;
}

function ExploreCard({ product }: { product: ProductListing }) {
    return (
      <div className="flex flex-col p-8 rounded-[2.5rem] border border-borderPrimary hover:border-primary/40 bg-background hover:bg-hoverPrimary/40 transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 w-fit mb-2">Direct Source</span>
            <h3 className="font-black text-textPrimary text-xl tracking-tight leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-backgroundSecondary border border-borderPrimary px-2.5 py-1.5 rounded-xl text-xs font-black">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" /> 4.9
          </div>
        </div>
        
        <p className="text-3xl font-black text-textPrimary tracking-tighter mb-6 flex items-baseline">
            Rs. {product.pricePerUnit} <span className="ml-1.5 text-[10px] font-black text-textSecondary uppercase tracking-widest opacity-40">/ {product.unit}</span>
        </p>
        
        <div className="mt-auto pt-6 border-t border-borderPrimary flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-[11px] font-bold text-textSecondary">
            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" /> {product.location}
            </div>
            <div className="flex items-center mt-1">
              <UserCheck className="h-3.5 w-3.5 mr-1.5 text-blue-500" /> {product.farmer.fullName}
            </div>
          </div>
          <Link href="/dashboard/marketplace" className="h-14 w-14 bg-textPrimary hover:bg-primary text-backgroundSecondary rounded-[1.25rem] flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer">
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    );
}

function UserCheck(props: any) {
    return <ShieldCheck className={props.className} />;
}
import { ShieldCheck } from "lucide-react";
