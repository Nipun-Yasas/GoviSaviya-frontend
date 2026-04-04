"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { 
  Users, 
  Search, 
  MapPin, 
  Star, 
  MessageCircle, 
  Phone, 
  Mail,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  Loader2,
  User,
  ShoppingBag
} from "lucide-react";

const API_BASE_URL = "http://localhost:8080/govisaviya/api/v1/marketplace";

interface Farmer {
  fullName: string;
  email: string;
  location: string;
  productCount: number;
}

export default function FarmerContactPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products`);
        setListings(response.data);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const farmers = useMemo(() => {
    const uniqueFarmers = new Map();
    listings.forEach(l => {
      if (!uniqueFarmers.has(l.farmer.email)) {
        uniqueFarmers.set(l.farmer.email, {
          ...l.farmer,
          location: l.location,
          productCount: listings.filter(item => item.farmer.email === l.farmer.email).length
        });
      }
    });
    return Array.from(uniqueFarmers.values());
  }, [listings]);

  const filteredFarmers = farmers.filter(f => 
    f.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
     return (
       <div className="p-32 text-center flex flex-col items-center justify-center">
         <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
         <p className="text-textSecondary font-bold text-lg">Loading Partner Directory...</p>
       </div>
     );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* 1. Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-xl">
           <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase border border-primary/20">
                 <Users className="h-4 w-4 mr-2" /> Producer Network
              </span>
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-textPrimary leading-tight">Farmer Directory</h1>
           <p className="text-textSecondary text-lg font-medium mt-2">Direct lines to verified local producers. Build lasting agricultural partnerships.</p>
        </div>
        
        <div className="relative group sm:w-96">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary group-focus-within:text-primary transition-colors" />
           <input 
             type="text" 
             placeholder="Search by name or region..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-12 pr-6 py-4 rounded-2xl bg-backgroundSecondary border border-borderPrimary text-sm font-bold text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
           />
        </div>
      </div>

      {/* 2. Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer, idx) => (
          <div key={idx} className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] p-8 flex flex-col hover:border-primary/40 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
             
             {/* Profile Top */}
             <div className="flex items-start justify-between mb-8">
                <div className="w-20 h-20 rounded-3xl bg-hoverPrimary flex items-center justify-center border border-borderPrimary group-hover:scale-110 transition-transform duration-500 overflow-hidden shadow-sm">
                   <div className="bg-primary/20 w-full h-full flex items-center justify-center">
                      <User className="w-10 h-10 text-primary" />
                   </div>
                </div>
                <div className="flex flex-col items-end">
                   <span className="px-3 py-1 rounded-full bg-primary text-backgroundSecondary text-[10px] font-black uppercase tracking-widest mb-2 shadow-lg">Verified</span>
                   <div className="flex items-center gap-1 text-sm font-black text-textPrimary">
                      <Star className="w-4 h-4 text-primary fill-primary" /> 4.9
                   </div>
                </div>
             </div>

             {/* Identity */}
             <div className="mb-8">
                <h3 className="text-2xl font-black text-textPrimary tracking-tight mb-1 group-hover:text-primary transition-colors">{farmer.fullName}</h3>
                <div className="flex items-center text-xs font-bold text-textSecondary uppercase tracking-widest opacity-60">
                   <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" /> {farmer.location}
                </div>
             </div>

             {/* Stats & Capability */}
             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-background/50 border border-borderPrimary p-4 rounded-2xl flex flex-col items-center">
                   <span className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-1">Products</span>
                   <span className="text-xl font-black text-textPrimary">{farmer.productCount}</span>
                </div>
                <div className="bg-background/50 border border-borderPrimary p-4 rounded-2xl flex flex-col items-center">
                   <span className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-1">Reliability</span>
                   <span className="text-xl font-black text-primary">99%</span>
                </div>
             </div>

             {/* Actions */}
             <div className="mt-auto pt-6 border-t border-borderPrimary grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center p-3.5 bg-hoverPrimary hover:bg-primary/10 text-primary rounded-xl transition-all shadow-sm" title="Call">
                   <Phone className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center p-3.5 bg-hoverPrimary hover:bg-primary/10 text-primary rounded-xl transition-all shadow-sm" title="Email">
                   <Mail className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center p-3.5 bg-textPrimary hover:bg-primary text-backgroundSecondary rounded-xl transition-all shadow-md active:scale-95 group-hover:-rotate-3" title="Message">
                   <MessageCircle className="w-5 h-5" />
                </button>
             </div>

             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-transform duration-500 group-hover:scale-125">
                <Briefcase className="w-32 h-32 text-primary" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
