"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { 
  MapPin, 
  Search, 
  ChevronRight, 
  Loader2, 
  Package, 
  Navigation,
  Globe,
  ArrowRight,
  ShoppingCart
} from "lucide-react";
import Link from "next/link";

const API_BASE_URL = "http://localhost:8080/govisaviya/api/v1/marketplace";

interface Product {
  id: number;
  name: string;
  location: string;
  pricePerUnit: number;
  unit: string;
}

export default function LocationFilterPage() {
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
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
    fetchListings();
  }, []);

  const locationGroups = useMemo(() => {
    const groups = new Map<string, Product[]>();
    listings.forEach(l => {
      const loc = l.location || "Unknown";
      if (!groups.has(loc)) groups.set(loc, []);
      groups.get(loc)?.push(l);
    });
    return Array.from(groups.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [listings]);

  const filteredGroups = locationGroups.filter(([loc]) => 
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-textSecondary font-bold text-lg">Geolocating Global Harvests...</p>
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
                 <Globe className="h-4 w-4 mr-2" /> Regional Intelligence
              </span>
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-textPrimary leading-tight">Explore by Region</h1>
           <p className="text-textSecondary text-lg font-medium mt-2">Discover regional specialties and optimize your logistics by sourcing from clustered areas.</p>
        </div>
        
        <div className="relative group sm:w-96">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary group-focus-within:text-primary transition-colors" />
           <input 
             type="text" 
             placeholder="Search by city or province..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-12 pr-6 py-4 rounded-2xl bg-backgroundSecondary border border-borderPrimary text-sm font-bold text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
           />
        </div>
      </div>

      {/* 2. Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGroups.map(([location, products], idx) => (
          <div key={idx} className="group bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] p-8 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col">
             
             {/* Header */}
             <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-primary text-backgroundSecondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                      <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-textPrimary tracking-tight group-hover:text-primary transition-colors">{location}</h3>
                      <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest">{products.length} Active Listings</p>
                   </div>
                </div>
                <div className="p-3 bg-hoverPrimary rounded-xl text-textSecondary group-hover:bg-primary group-hover:text-backgroundSecondary transition-colors">
                   <Navigation className="w-5 h-5" />
                </div>
             </div>

             {/* Recent Items Preview */}
             <div className="space-y-3 mb-8">
                {products.slice(0, 3).map((p, pIdx) => (
                   <div key={pIdx} className="flex items-center justify-between p-3 bg-background/50 rounded-xl border border-borderPrimary/50 group-hover:border-primary/20 transition-all">
                      <span className="text-sm font-bold text-textPrimary">{p.name}</span>
                      <span className="text-xs font-black text-primary">Rs. {p.pricePerUnit}</span>
                   </div>
                ))}
                {products.length > 3 && (
                   <p className="text-center text-[10px] font-bold text-textSecondary uppercase tracking-widest pt-2">+{products.length - 3} More Items</p>
                )}
             </div>

             {/* Action */}
             <Link 
                href={`/dashboard/marketplace?location=${location}`}
                className="mt-auto w-full py-4 bg-textPrimary hover:bg-primary text-backgroundSecondary rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-md group-hover:shadow-primary/20 border border-transparent"
             >
                View Regional Market <ArrowRight className="w-4 h-4" />
             </Link>

             {/* Background Decoration */}
             <div className="absolute -right-8 -bottom-8 opacity-[0.03] rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Globe className="w-48 h-48" />
             </div>
          </div>
        ))}

        {filteredGroups.length === 0 && (
           <div className="col-span-full p-32 flex flex-col items-center justify-center border-2 border-dashed border-borderPrimary rounded-[3rem] opacity-50 bg-backgroundSecondary/30">
              <Package className="w-16 h-16 text-textSecondary mb-6" />
              <h3 className="text-2xl font-black text-textPrimary">No Regions Discovered</h3>
              <p className="text-textSecondary font-bold mt-2">Try searching for a broader area or check back later.</p>
           </div>
        )}
      </div>
    </div>
  );
}
