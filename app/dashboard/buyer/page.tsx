import React from "react";
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
  Apple
} from "lucide-react";

export default function BuyerDashboard() {
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 md:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/10">
              <TrendingDown className="h-3.5 w-3.5 mr-1" /> Market Trend
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight text-white">Vegetable Prices Dropping</h2>
          <p className="text-white/90 leading-relaxed text-base sm:text-lg font-medium opacity-90 max-w-md">
            Expect up to 15% discount on bulk purchases of carrots and tomatoes this week due to regional harvest surpluses.
          </p>
          <button className="mt-8 bg-white text-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-white/90 transition-all hover:-translate-y-0.5 active:translate-y-0">
            Browse Daily Deals
          </button>
        </div>
        
        <div className="hidden md:flex relative z-10 p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex-col items-center justify-center shadow-2xl">
          <TrendingDown className="h-12 w-12 text-white mb-2" />
          <span className="text-4xl font-black tracking-tighter">-15%</span>
          <span className="text-white/80 text-sm font-medium mt-1 uppercase tracking-widest">Avg Price Drop</span>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute -right-8 -bottom-16 opacity-[0.08] pointer-events-none transition-transform duration-1000 hover:scale-105 hover:-rotate-3">
          <ShoppingCart className="w-80 h-80" />
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { title: "Active Orders", value: "3", subtext: "2 arriving tomorrow", icon: Clock },
          { title: "Favorite Farmers", value: "8", subtext: "3 new listings today", icon: Star },
          { title: "Total Spent", value: "Rs. 124,500", subtext: "This month", icon: ShoppingCart },
        ].map((stat, i) => (
          <div key={i} className="rounded-3xl border border-borderPrimary bg-backgroundSecondary p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-5 cursor-default group">
            <div className="rounded-2xl p-4 bg-hoverPrimary text-primary shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 border border-primary/10">
              <stat.icon className="h-7 w-7" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold text-textSecondary uppercase tracking-wide">{stat.title}</p>
              <p className="mt-1 text-3xl font-bold text-textPrimary tracking-tight">{stat.value}</p>
              <p className="mt-1 flex items-center text-xs font-medium text-textSecondary">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60 mr-2"></span>
                {stat.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fresh Listings */}
      <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-textPrimary">Fresh Local Listings</h2>
            <p className="text-sm text-textSecondary mt-1 font-medium">Recently harvested produce near you</p>
          </div>
          <button className="text-sm font-semibold text-primary bg-hoverPrimary px-4 py-2.5 rounded-xl hover:bg-primary/20 flex items-center transition-colors">
            View Marketplace <ArrowRight className="h-4 w-4 ml-1.5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              item: "Premium Long Carrots",
              farmer: "Sunil Perera",
              location: "Nuwara Eliya",
              price: "Rs. 250/kg",
              qty: "Available: 500kg",
              rating: "4.9",
              Icon: Vegan
            },
            {
              item: "Organic Green Cabbage",
              farmer: "Kamal Silva",
              location: "Bandarawela",
              price: "Rs. 120/kg",
              qty: "Available: 200kg",
              rating: "4.7",
              Icon: Leaf
            },
            {
              item: "Fresh Red Tomatoes",
              farmer: "Nimal Fernando",
              location: "Badulla",
              price: "Rs. 140/kg",
              qty: "Available: 800kg",
              rating: "4.8",
              Icon: Apple
            }
          ].map((listing, i) => (
            <div key={i} className="flex flex-col p-6 rounded-2xl border border-borderPrimary hover:border-primary/40 bg-background hover:bg-hoverPrimary/40 transition-all duration-300 shadow-sm hover:shadow-xl group">
              <div className="flex justify-between items-start mb-5">
                <div className="h-14 w-14 rounded-2xl bg-hoverPrimary flex items-center justify-center text-primary group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 border border-primary/10 shadow-sm">
                  <listing.Icon className="h-7 w-7" />
                </div>
                <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg text-xs font-bold border border-primary/20">
                  <Star className="h-3.5 w-3.5 fill-primary" /> {listing.rating}
                </div>
              </div>
              <h3 className="font-bold text-textPrimary text-lg line-clamp-1 group-hover:text-primary transition-colors">{listing.item}</h3>
              <p className="text-2xl font-black text-textPrimary mt-1.5 tracking-tight">{listing.price}</p>
              
              <div className="mt-5 pt-5 border-t border-borderPrimary space-y-3">
                <div className="flex items-center text-sm font-medium text-textSecondary bg-backgroundSecondary/50 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {listing.farmer} • {listing.location}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-textSecondary bg-hoverPrimary border border-borderPrimary px-3 py-2 rounded-xl">{listing.qty}</span>
                  <button className="text-sm font-bold text-white bg-primary hover:bg-hover px-5 py-2 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
