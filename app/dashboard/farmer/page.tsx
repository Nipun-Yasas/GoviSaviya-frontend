import React from "react";
import {
  TrendingUp,
  Sprout,
  Droplets,
  Sun,
  Wind,
  AlertCircle,
  Calendar,
  ArrowRight,
  ChevronRight,
  PackageCheck,
  LineChart,
  Leaf,
  Apple,
  Vegan, // using valid lucide icons
} from "lucide-react";

export default function FarmerDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-textPrimary">
            Farmer Dashboard
          </h1>
          <p className="text-textSecondary">
            Welcome back! Here's what's happening on your farm today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center justify-center rounded-lg bg-backgroundSecondary px-4 py-2 text-sm font-medium text-textPrimary shadow-sm border border-borderPrimary hover:bg-hoverPrimary transition-colors">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Task
          </button>
          <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all">
            <Sprout className="mr-2 h-4 w-4" />
            Add Crop
          </button>
        </div>
      </div>

      {/* Quick Weather & Alerts Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary to-primary p-6 md:p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 opacity-20 transition-transform duration-700 hover:scale-110">
            <Sun className="h-48 w-48" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between h-full gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                  Current Weather
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold tracking-tighter">28°C</span>
                <span className="text-white/90 text-lg font-medium leading-tight max-w-[150px]">Sunny, Expected rain tomorrow</span>
              </div>
            </div>
            <div className="flex gap-6 text-white/90 bg-white/10 px-5 py-4 rounded-2xl backdrop-blur-sm border border-white/10 self-start md:self-auto">
              <div className="flex flex-col items-center justify-center gap-1">
                <Droplets className="h-6 w-6" />
                <span className="text-sm font-semibold">45%</span>
              </div>
              <div className="w-px h-full bg-white/20" />
              <div className="flex flex-col items-center justify-center gap-1">
                <Wind className="h-6 w-6" />
                <span className="text-sm font-semibold">12 km/h</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-3xl bg-backgroundSecondary border border-borderPrimary p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-hoverPrimary p-3 text-primary shrink-0">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-textPrimary text-lg">Action Required</h3>
              <p className="text-sm text-textSecondary mt-1 leading-relaxed">
                Soil moisture levels are critically low in Sector A. Irrigation recommended within 24h.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Revenue",
            value: "Rs. 245,000",
            trend: "+12.5%",
            trendUp: true,
            icon: TrendingUp,
            color: "text-primary",
            bg: "bg-hoverPrimary",
            trendColor: "text-primary"
          },
          {
            title: "Active Crops",
            value: "4 Fields",
            trend: "2 harvesting soon",
            trendUp: true,
            icon: Sprout,
            color: "text-secondary",
            bg: "bg-hoverPrimary",
            trendColor: "text-secondary"
          },
          {
            title: "Pending Orders",
            value: "12",
            trend: "3 urgent",
            trendUp: false,
            icon: PackageCheck,
            color: "text-secondary",
            bg: "bg-secondary/10",
            trendColor: "text-secondary"
          },
          {
            title: "Yield Forecast",
            value: "8.5 Tons",
            trend: "+4% vs last season",
            trendUp: true,
            icon: LineChart,
            color: "text-textLoop",
            bg: "bg-hoverPrimary",
            trendColor: "text-textLoop"
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-3xl border border-borderPrimary bg-backgroundSecondary p-6 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden cursor-default"
          >
            <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-500 blur-2xl ${stat.bg.split(' ')[0]}`}></div>
            <div className="flex items-start justify-between mb-4">
              <div className={`rounded-2xl p-3 ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center text-sm bg-hoverPrimary px-2.5 py-1 rounded-full">
                <span className={`font-semibold ${stat.trendColor}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-textPrimary tracking-tight">
                {stat.value}
              </h3>
              <p className="mt-1 text-sm font-medium text-textSecondary">
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Crops Widget */}
        <div className="lg:col-span-2 rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-textPrimary">Crop Monitoring</h2>
              <p className="text-sm text-textSecondary mt-1">Status of your currently planted fields</p>
            </div>
            <button className="text-sm font-semibold text-primary bg-hoverPrimary px-4 py-2 rounded-xl hover:bg-primary/20 flex items-center transition-colors">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "Carrots - Sector A", stage: "Maturation", progress: 85, daysLeft: 12, health: "Excellent", Icon: Vegan },
              { name: "Tomatoes - Sector C", stage: "Flowering", progress: 45, daysLeft: 40, health: "Good", Icon: Apple },
              { name: "Chili Peppers - Sector B", stage: "Vegetative", progress: 20, daysLeft: 70, health: "Needs Water", Icon: Leaf },
            ].map((crop, i) => (
              <div key={i} className="group border border-borderPrimary rounded-2xl p-5 hover:border-primary/40 hover:bg-hoverPrimary/40 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-hoverPrimary flex items-center justify-center text-primary group-hover:rotate-6 transition-transform duration-300 border border-primary/10">
                      <crop.Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-textPrimary text-base">{crop.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-textSecondary bg-background px-2 py-0.5 rounded-md border border-borderPrimary">
                          Stage: {crop.stage}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${crop.health === 'Needs Water' ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                          Health: {crop.health}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="text-lg font-bold text-textPrimary leading-none">{crop.daysLeft} <span className="text-sm font-medium text-textSecondary">Days</span></p>
                    <p className="text-xs text-textSecondary mt-1">to harvest</p>
                  </div>
                </div>
                <div className="w-full bg-borderPrimary/50 rounded-full h-2.5 mt-5 overflow-hidden relative">
                  <div 
                    className="bg-gradient-to-r from-secondary to-primary h-2.5 rounded-full transition-all duration-1000 ease-out relative" 
                    style={{ width: `${crop.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Prices Widget */}
        <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-textPrimary">Live Market</h2>
              <p className="text-sm text-textSecondary mt-1">Current prices in Colombo</p>
            </div>
          </div>
          
          <div className="flex-1 space-y-5">
            {[
              { crop: "Carrot", price: "Rs. 280/kg", change: "+15", trend: "up" },
              { crop: "Tomato", price: "Rs. 150/kg", change: "-10", trend: "down" },
              { crop: "Green Chili", price: "Rs. 850/kg", change: "+45", trend: "up" },
              { crop: "Potato", price: "Rs. 180/kg", change: " 0", trend: "neutral" },
              { crop: "Cabbage", price: "Rs. 120/kg", change: "-5", trend: "down" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-hoverPrimary text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/10">
                    {item.crop.charAt(0)}
                  </div>
                  <span className="font-semibold text-textPrimary group-hover:text-primary transition-colors">{item.crop}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-textPrimary">{item.price}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-bold w-16 text-center shadow-sm ${
                    item.trend === 'up' ? 'bg-primary/10 text-primary border border-primary/20' :
                    item.trend === 'down' ? 'bg-destructive/10 text-destructive border border-destructive/20' :
                    'bg-hoverPrimary text-textSecondary border border-borderPrimary'
                  }`}>
                    {item.trend === 'up' && '▲ '}{item.trend === 'down' && '▼ '}{item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-3.5 rounded-xl border-2 border-borderPrimary text-sm font-bold text-textSecondary hover:bg-hoverPrimary hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2 group shadow-sm">
            View All Prices
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
