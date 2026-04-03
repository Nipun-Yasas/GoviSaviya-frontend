"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Loader2,
  Package,
  ShoppingBag,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const API_BASE_URL = "http://localhost:8080/govisaviya/api/v1/marketplace";

interface ProductListing {
  id: number;
  name: string;
  description: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  availableQuantity: number;
  location: string;
  imageUrl: string | null;
  farmer: {
    fullName: string;
    email: string;
  };
}

export default function BuyerMarketplacePage() {
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products`);
        setListings(response.data);
      } catch (err) {
        console.error("Marketplace fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         l.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || l.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlaceOrder = async (product: ProductListing) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to place an order.");
        return;
      }

      const order = {
        totalAmount: product.pricePerUnit * 1,
        deliveryAddress: "User Profile Address", // Mock
        items: [{ product: { id: product.id }, quantity: 1, priceAtOrder: product.pricePerUnit }]
      };
      
      await axios.post(`${API_BASE_URL}/orders`, order, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Order placed for ${product.name}!`);
    } catch (err) {
      alert("Failed to place order.");
    }
  };

  if (loading) {
    return (
      <div className="p-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-textSecondary font-bold text-lg text-primary">Scanning Global Harvest Inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* 1. Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-xl">
           <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase border border-primary/20">
                 <ShoppingBag className="h-4 w-4 mr-2" /> Direct Sourcing
              </span>
           </div>
           <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-textPrimary leading-tight">Global Marketplace</h1>
           <p className="text-textSecondary text-lg font-medium mt-2">Access the freshest agricultural produce at wholesale prices, directly from the source.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
           <div className="relative group flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search products or locations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-backgroundSecondary border border-borderPrimary text-sm font-bold text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
              />
           </div>
           <div className="flex gap-2">
              {["ALL", "VEGETABLE", "FRUIT", "GRAIN"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-4 rounded-2xl text-[10px] font-black transition-all border ${
                    selectedCategory === cat 
                    ? "bg-primary text-backgroundSecondary border-primary shadow-lg shadow-primary/20" 
                    : "bg-backgroundSecondary text-textSecondary border-borderPrimary hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* 2. Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="p-32 flex flex-col items-center justify-center border-2 border-dashed border-borderPrimary rounded-[3rem] bg-backgroundSecondary/50 text-center opacity-70">
           <Package className="w-16 h-16 text-textSecondary mb-6" />
           <h3 className="text-2xl font-black text-textPrimary">No Produce Found</h3>
           <p className="text-textSecondary font-bold mt-2">Try adjusting your search or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredListings.map((product) => (
            <div key={product.id} className="flex flex-col group bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden h-full">
               
               {/* Product Decoration */}
               <div className="absolute top-0 right-0 p-6 opacity-5 transition-transform duration-500 group-hover:scale-150 group-hover:rotate-12 pointer-events-none">
                  <TrendingDown className="h-24 w-24" />
               </div>

               <div className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                     <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/20">
                        {product.category}
                     </span>
                     <div className="flex items-center gap-1.5 bg-white/50 border border-borderPrimary px-2 py-1 rounded-xl text-[10px] font-black">
                        <Star className="h-3 w-3 fill-primary text-primary" /> 4.9
                     </div>
                  </div>

                  <h3 className="text-2xl font-black text-textPrimary tracking-tight mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">{product.name}</h3>
                  <p className="text-textSecondary text-xs font-medium line-clamp-2 mb-6">{product.description || "Fresh produce delivered directly from local verified farms."}</p>
                  
                  <div className="mt-auto space-y-6">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-1">Pricing</p>
                           <p className="text-3xl font-black text-textPrimary tracking-tighter leading-none">
                              Rs. {product.pricePerUnit} <span className="text-[11px] font-bold opacity-40">/ {product.unit}</span>
                           </p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-1">Stock</p>
                           <p className="text-sm font-black text-primary leading-none uppercase">{product.availableQuantity} {product.unit} Left</p>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-borderPrimary flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                           <div className="flex items-center text-[11px] font-black text-textPrimary">
                              <ShieldCheck className="w-3.5 h-3.5 mr-2 text-primary" /> {product.farmer.fullName}
                           </div>
                           <div className="flex items-center text-[10px] font-bold text-textSecondary">
                              <MapPin className="w-3.5 h-3.5 mr-2 text-primary/50" /> {product.location}
                           </div>
                        </div>
                        <button 
                           onClick={() => handlePlaceOrder(product)}
                           className="h-14 w-14 bg-textPrimary hover:bg-primary text-backgroundSecondary rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-95 group-hover:-rotate-3"
                        >
                           <ShoppingCart className="w-6 h-6" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
