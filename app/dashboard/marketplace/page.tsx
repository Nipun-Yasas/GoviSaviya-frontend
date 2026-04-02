"use client";

import React, { useState } from "react";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  TrendingUp, 
  ArchiveRestore,
  Store,
  Tag,
  ShieldCheck,
  PackagePlus,
  ArrowRight
} from "lucide-react";

const MOCK_LISTINGS = [
  {
    id: 1,
    type: "Sell",
    title: "Premium Hill Country Carrots",
    volume: "Available 800 KG",
    price: "Rs. 240 / kg",
    farmer: "Nimal Peiris",
    location: "Nuwara Eliya",
    rating: 4.8,
    verified: true,
    saved: false,
    mine: false
  },
  {
    id: 2,
    type: "Buy",
    title: "Seeking Organic Cabbage",
    volume: "Need 2000 KG",
    price: "Rs. 130 / kg Target",
    farmer: "Fresca Supermarkets",
    location: "Colombo Logistics Hub",
    rating: 4.9,
    verified: true,
    saved: true,
    mine: false
  },
  {
    id: 3,
    type: "Sell",
    title: "Red Tomatoes (Grade A)",
    volume: "Available 450 KG",
    price: "Rs. 180 / kg",
    farmer: "Sunil Silva",
    location: "Dambulla",
    rating: 4.5,
    verified: false,
    saved: true,
    mine: false
  },
  {
    id: 4,
    type: "Sell",
    title: "Green Chili Bulk",
    volume: "Available 150 KG",
    price: "Rs. 950 / kg",
    farmer: "Ranjan Farm",
    location: "Kandy",
    rating: 4.7,
    verified: true,
    saved: false,
    mine: false
  },
  {
    id: 5,
    type: "Sell",
    title: "My Processed Leeks",
    volume: "Available 300 KG",
    price: "Rs. 150 / kg",
    farmer: "You",
    location: "Your Farm",
    rating: 5.0,
    verified: true,
    saved: false,
    mine: true
  }
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("explore");

  const filteredListings = MOCK_LISTINGS.filter(item => {
    if (activeTab === "explore") return true;
    if (activeTab === "demands") return item.type === "Buy";
    if (activeTab === "mylistings") return item.mine;
    if (activeTab === "saved") return item.saved;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <Store className="h-3.5 w-3.5 mr-1" /> Live Marketplace
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
            Trade & Connect
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Discover bulk buyers, list your harvest, and negotiate prices directly.
          </p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative group w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search produce..." 
              className="pl-10 pr-4 py-3 rounded-xl bg-backgroundSecondary border border-borderPrimary text-sm font-medium text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/50 w-full transition-all shadow-sm"
            />
          </div>
          <button className="inline-flex items-center justify-center rounded-xl bg-backgroundSecondary px-4 py-3 text-sm font-bold text-textPrimary shadow-sm border border-borderPrimary hover:bg-hoverPrimary hover:border-primary/40 hover:text-primary transition-colors">
            <Filter className="h-4 w-4" />
          </button>
          <button className="hidden lg:inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-backgroundSecondary shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all">
            <PackagePlus className="mr-2 h-4 w-4" />
            New Listing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Main Content Area */}
        <div className="xl:col-span-3 space-y-8 flex flex-col">
          
          {/* Quick Filters / Tabs */}
          <div className="flex flex-wrap gap-2 pb-1 border-b border-borderPrimary">
            {[
              { id: "explore", label: "Explore Market" },
              { id: "demands", label: "Buyer Demands" },
              { id: "mylistings", label: "My Listings" },
              { id: "saved", label: "Saved" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-t-xl text-sm font-bold transition-colors ${
                  activeTab === tab.id
                    ? "bg-backgroundSecondary text-primary border-t border-x border-borderPrimary shadow-[0_4px_0_0_var(--background-secondary)]" 
                    : "text-textSecondary hover:text-primary hover:bg-hoverPrimary/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Hero Promo Banner (hide on generic tabs to keep it clean, show fully on explore) */}
          {activeTab === "explore" && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 md:p-10 text-backgroundSecondary shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 h-auto w-full group">
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6">
                <ArchiveRestore className="w-80 h-80 -mt-16 -mr-16" />
              </div>
              
              <div className="relative z-10 max-w-lg">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-backgroundSecondary/20 text-backgroundSecondary text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-md border border-backgroundSecondary/10">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" /> High Demand
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight text-backgroundSecondary leading-tight">
                  Supermarkets need Premium Chili 
                </h2>
                <p className="text-backgroundSecondary/90 leading-relaxed text-base font-medium opacity-90 mb-6">
                  Bulk buyers in Colombo are currently offering up to 15% above market rate for A-Grade authentic green chilis. Minimum 500kg.
                </p>
                <button className="bg-backgroundSecondary text-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-backgroundSecondary/90 transition-all hover:-translate-y-0.5">
                  View Requirements
                </button>
              </div>
            </div>
          )}

          {/* Grid Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.length === 0 ? (
              <div className="col-span-1 md:col-span-2 p-12 text-center flex flex-col items-center justify-center border-2 border-dashed border-borderPrimary rounded-3xl bg-backgroundSecondary/50 opacity-80 mt-4">
                <PackagePlus className="w-12 h-12 text-borderPrimary mb-4" />
                <h3 className="text-xl font-bold text-textPrimary">No Listings Found</h3>
                <p className="text-textSecondary font-medium mt-2">There are currently no listings bridging this category criteria.</p>
              </div>
            ) : filteredListings.map((item) => (
              <div key={item.id} className="flex flex-col p-6 rounded-3xl border border-borderPrimary hover:border-primary/40 bg-backgroundSecondary hover:bg-hoverPrimary/40 transition-all duration-300 shadow-sm hover:shadow-xl group">
                <div className="flex justify-between items-start mb-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
                    item.type === 'Sell' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-secondary/10 text-secondary border-secondary/20'
                  }`}>
                    {item.type === 'Sell' ? 'For Sale' : 'Buyer Request'}
                  </span>
                  <div className="flex items-center gap-1.5 bg-hoverPrimary/50 text-textSecondary px-2.5 py-1.5 rounded-lg text-xs font-bold border border-borderPrimary">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {item.rating}
                  </div>
                </div>
                
                <h3 className="font-bold text-textPrimary text-xl line-clamp-1 group-hover:text-primary transition-colors tracking-tight">{item.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-textSecondary" />
                  <p className="text-2xl font-black text-textPrimary tracking-tight">{item.price}</p>
                </div>
                
                <div className="mt-6 pt-5 border-t border-borderPrimary space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm font-medium text-textSecondary">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {item.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-textSecondary font-medium uppercase tracking-wider mb-0.5">Supplier</span>
                      <div className="flex items-center font-bold text-sm text-textPrimary">
                        {item.farmer}
                        {item.verified && (
                          <ShieldCheck className="h-4 w-4 ml-1 text-primary" />
                        )}
                      </div>
                    </div>
                    {item.mine ? (
                      <button className="text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 border border-primary/20">
                        Edit Listing
                      </button>
                    ) : (
                      <button className="text-sm font-bold text-backgroundSecondary bg-textPrimary hover:bg-primary px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredListings.length > 0 && (
            <button className="w-full py-4 rounded-2xl border-2 border-borderPrimary text-sm font-bold text-textSecondary hover:bg-hoverPrimary hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center">
              Load More Listings
            </button>
          )}
        </div>

        {/* Right Column: Trending & Stats */}
        <div className="xl:col-span-1 space-y-8 flex flex-col">
          
          <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8 flex flex-col">
            <h2 className="text-lg font-bold text-textPrimary mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-3 text-primary" />
              Market Movers
            </h2>
            
            <div className="flex-1 space-y-4">
              {[
                { crop: "Carrot", oldPrice: 220, newPrice: 240, trend: "up" },
                { crop: "Tomato", oldPrice: 200, newPrice: 180, trend: "down" },
                { crop: "Leeks", oldPrice: 140, newPrice: 155, trend: "up" },
                { crop: "Cabbage", oldPrice: 130, newPrice: 130, trend: "neutral" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-borderPrimary last:border-0 last:pb-0 group">
                  <div className="flex flex-col">
                    <span className="font-bold text-textPrimary mb-1 group-hover:text-primary transition-colors">{item.crop}</span>
                    <span className="text-xs text-textSecondary font-medium">Rs. {item.newPrice} / kg</span>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                    item.trend === 'up' ? 'bg-primary/10 text-primary border-primary/20' : 
                    item.trend === 'down' ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                    'bg-hoverPrimary text-textSecondary border-borderPrimary'
                  }`}>
                    {item.trend === 'up' && '▲ '}
                    {item.trend === 'down' && '▼ '}
                    {item.trend === 'neutral' && '- '}
                    {Math.abs(item.newPrice - item.oldPrice)} Rs
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-xl bg-hoverPrimary text-sm font-bold text-primary hover:bg-primary/20 transition-all flex items-center justify-center">
              Full Price Report <ArrowRight className="h-4 w-4 ml-1.5" />
            </button>
          </div>

          <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8 relative overflow-hidden group">
            <div className="absolute opacity-10 -right-6 -bottom-6 transition-transform duration-500 group-hover:scale-110">
              <ShoppingCart className="w-32 h-32" />
            </div>
            <h2 className="text-lg font-bold text-textPrimary mb-2">My Activity</h2>
            <div className="space-y-4 mt-6 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-textSecondary">Active Listings</span>
                <span className="font-bold text-textPrimary">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-textSecondary">Total Sold (This month)</span>
                <span className="font-bold text-textPrimary">450 kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-textSecondary">Revenue Generated</span>
                <span className="font-bold text-primary text-lg">Rs. 95K</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
