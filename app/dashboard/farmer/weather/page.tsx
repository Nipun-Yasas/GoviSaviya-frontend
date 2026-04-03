"use client";

import React from "react";
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Droplets, 
  Wind, 
  ThermometerSun, 
  CloudLightning, 
  Umbrella, 
  Sprout, 
  AlertTriangle,
  CalendarDays,
  MapPin,
  Sunrise,
  Sunset
} from "lucide-react";

export default function WeatherPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-hoverPrimary text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <MapPin className="h-3.5 w-3.5 mr-1" /> Nuwara Eliya, Sri Lanka
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              Live Updates
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
            Weather & Climate
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Hyper-local forecasting tailored to optimize your farming activities.
          </p>
        </div>
        <div className="text-right">
          <p className="text-textPrimary font-bold text-lg">Thursday, 2nd April</p>
          <p className="text-textSecondary font-medium">Updated 5 min ago</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Big Current Weather + Hourly */}
        <div className="xl:col-span-2 space-y-8 flex flex-col">
          
          {/* Hero Current Weather */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row justify-between gap-8 h-auto w-full group">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6">
              <CloudSun className="w-80 h-80 -mt-16 -mr-16" />
            </div>
            
            <div className="relative z-10 flex flex-col justify-center">
              <h2 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-2">Current Condition</h2>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-7xl sm:text-8xl font-black tracking-tighter">24°</span>
                <span className="text-2xl sm:text-3xl font-medium tracking-tight opacity-90">Partly Cloudy</span>
              </div>
              <p className="text-white/80 text-lg font-medium">Feels like 26° • High 28° / Low 18°</p>
              
              <div className="flex items-center gap-6 mt-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 w-fit">
                <div className="flex items-center gap-2">
                  <Sunrise className="h-6 w-6 text-white/90" />
                  <div>
                    <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Sunrise</p>
                    <p className="font-bold text-white">06:12 AM</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <Sunset className="h-6 w-6 text-backgroundSecondary/80" />
                  <div>
                    <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Sunset</p>
                    <p className="font-bold text-white">06:24 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 shrink-0 sm:self-center">
              {[
                { icon: Droplets, label: "Humidity", value: "68%" },
                { icon: Wind, label: "Wind", value: "12 km/h" },
                { icon: Umbrella, label: "Rain Prob", value: "20%" },
                { icon: ThermometerSun, label: "UV Index", value: "5 Mod" },
              ].map((stat, i) => (
                <div key={i} className="bg-black/10 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex flex-col items-start gap-1 w-full sm:w-32 hover:bg-white/10 transition-colors">
                  <stat.icon className="h-6 w-6 text-white/80 mb-1" />
                  <span className="text-xs text-white/70 font-bold uppercase tracking-wider">{stat.label}</span>
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-textPrimary mb-6">Today's Timeline</h2>
            <div className="flex overflow-x-auto pb-4 gap-4 no-visible-scrollbar shrink-0">
              {[
                { time: "Now", temp: "24°", icon: CloudSun, highlight: true },
                { time: "1:00 PM", temp: "26°", icon: Sun },
                { time: "2:00 PM", temp: "27°", icon: Sun },
                { time: "3:00 PM", temp: "28°", icon: Sun },
                { time: "4:00 PM", temp: "26°", icon: CloudSun },
                { time: "5:00 PM", temp: "24°", icon: CloudRain },
                { time: "6:00 PM", temp: "22°", icon: CloudRain },
                { time: "7:00 PM", temp: "20°", icon: CloudLightning },
              ].map((hour, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl min-w-[90px] border transition-all duration-300 ${
                    hour.highlight 
                    ? 'bg-primary text-backgroundSecondary border-primary shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-background border-borderPrimary text-textPrimary hover:border-primary/40 hover:bg-hoverPrimary/40'
                  }`}
                >
                  <span className={`text-sm font-bold mb-3 ${hour.highlight ? 'text-backgroundSecondary/90' : 'text-textSecondary'}`}>{hour.time}</span>
                  <hour.icon className={`h-8 w-8 mb-3 ${hour.highlight ? 'text-backgroundSecondary' : 'text-textPrimary'}`} />
                  <span className="text-xl font-bold">{hour.temp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Farming Advisory Action Plan */}
          <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-hoverPrimary text-primary shrink-0">
                <Sprout className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-textPrimary">Smart Farm Advisory</h2>
                <p className="text-sm text-textSecondary font-medium">AI-driven task recommendations for today</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-borderPrimary hover:border-primary bg-hoverPrimary/50 p-5 rounded-2xl transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-backgroundSecondary text-xs font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider">Optimal</span>
                </div>
                <h4 className="font-bold text-textPrimary text-lg mb-1">Fertilizer Application</h4>
                <p className="text-sm text-textSecondary font-medium">Low winds and incoming evening rain ensure excellent soil absorption.</p>
              </div>
              <div className="border border-destructive/20 bg-destructive/10 p-5 rounded-2xl transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-destructive/20 text-destructive text-xs font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider">Avoid</span>
                </div>
                <h4 className="font-bold text-textPrimary text-lg mb-1">Heavy Irrigation</h4>
                <p className="text-sm text-textSecondary font-medium">Save water and resources. Rain probability increases significantly after 5 PM.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 7-Day Forecast */}
        <div className="xl:col-span-1 rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-textSecondary" />
              <h2 className="text-xl font-bold text-textPrimary">7-Day Forecast</h2>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-between gap-2">
            {[
              { day: "Today", low: 18, high: 28, icon: CloudSun, progress: 65 },
              { day: "Fri", low: 19, high: 26, icon: CloudRain, progress: 50 },
              { day: "Sat", low: 17, high: 24, icon: CloudLightning, progress: 40 },
              { day: "Sun", low: 16, high: 25, icon: Sun, progress: 75 },
              { day: "Mon", low: 18, high: 27, icon: Sun, progress: 80 },
              { day: "Tue", low: 19, high: 28, icon: CloudSun, progress: 70 },
              { day: "Wed", low: 18, high: 26, icon: CloudRain, progress: 55 },
            ].map((day, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-borderPrimary last:border-0 hover:bg-hoverPrimary/30 rounded-xl px-2 transition-colors">
                <span className={`w-12 font-bold ${i === 0 ? 'text-primary' : 'text-textPrimary'}`}>{day.day}</span>
                <day.icon className="h-6 w-6 text-textSecondary shrink-0" />
                
                <div className="flex items-center gap-3 flex-1 px-2">
                  <span className="text-xs font-bold text-textSecondary w-6 text-right">{day.low}°</span>
                  <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden border border-borderPrimary/50">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-primary rounded-full relative"
                      style={{ width: `${day.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-textPrimary w-6">{day.high}°</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-borderPrimary">
            <div className="bg-secondary/10 border border-secondary/30 p-4 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-secondary shrink-0" />
              <div>
                <h4 className="font-bold text-textPrimary text-sm mb-1">Weather Alert</h4>
                <p className="text-xs text-textSecondary font-medium leading-relaxed">
                  Possible thunderstorms isolated in the northern sectors this weekend. Secure loose equipment.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
