"use client";

import React from "react";
import { 
  TrendingUp, 
  BarChart3, 
  Sprout, 
  Calendar, 
  Map, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  Coins,
  Scale,
  LineChart,
  Target
} from "lucide-react";

export default function YieldPredictionPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <BarChart3 className="h-3.5 w-3.5 mr-1" /> Predictive AI
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
            Yield Prediction
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Forecast your harvest volume and projected revenue using machine learning insights.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Macro Overview */}
        <div className="lg:col-span-2 space-y-8 flex flex-col">
          
          {/* Main Harvest Projection Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row justify-between gap-8 h-auto w-full group">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6">
              <LineChart className="w-80 h-80 -mt-16 -mr-16" />
            </div>
            
            <div className="relative z-10 flex flex-col justify-center">
              <h2 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-3 border-b border-white/20 pb-2 w-max">Season YX-26 Forecast</h2>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl sm:text-7xl font-black tracking-tighter">18.5</span>
                <span className="text-2xl sm:text-3xl font-medium tracking-tight opacity-90">Tons</span>
              </div>
              <p className="text-white/80 text-lg font-medium mb-6">Total Expected Volume across all active sectors</p>
              
              <div className="flex items-center gap-6 mt-2 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 w-fit">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/20 text-white">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Vs Last Season</p>
                    <p className="font-bold text-lg text-white">+ 12.4%</p>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/20 text-white">
                    <Coins className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Est Revenue</p>
                    <p className="font-bold text-lg text-white">Rs. 3.2M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graphical Representation Mock */}
          <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-textPrimary">Growth Trajectory</h2>
                <p className="text-sm text-textSecondary font-medium">Estimated maturity and weight progress over time</p>
              </div>
              <div className="hidden sm:flex p-2 bg-hoverPrimary rounded-lg text-primary text-sm font-bold items-center">
                <Target className="h-4 w-4 mr-2" /> 95% Confidence
              </div>
            </div>

            {/* Custom Bar Chart UI Mock */}
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 mt-8 pb-4 relative">
              {/* Target Line marker */}
              <div className="absolute top-1/4 left-0 w-full border-t border-dashed border-secondary/40 z-0"></div>
              <span className="absolute top-[20%] left-0 text-xs font-bold text-secondary">Target Yield</span>

              {[
                { month: "Jan", val: 20 },
                { month: "Feb", val: 35 },
                { month: "Mar", val: 55 },
                { month: "Apr", val: 78, active: true },
                { month: "May", val: 92, proj: true },
                { month: "Jun", val: 100, proj: true },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center flex-1 z-10 group">
                  <div 
                    className={`w-full rounded-t-xl transition-all duration-500 hover:opacity-80 relative ${
                      bar.active ? 'bg-primary shadow-lg shadow-primary/20' : 
                      bar.proj ? 'bg-hoverPrimary border-t-2 border-primary border-dashed' : 
                      'bg-secondary/40'
                    }`}
                    style={{ height: `${bar.val}%` }}
                  >
                    {bar.active && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-textPrimary text-backgroundSecondary text-xs font-bold px-2 py-1 rounded shadow">
                        Current
                      </div>
                    )}
                  </div>
                  <span className={`mt-4 text-sm font-bold ${bar.active ? 'text-primary' : 'text-textSecondary'}`}>
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                sector: "Sector A - Carrots",
                area: "2.5 Acres",
                forecast: "8.2 Tons",
                status: "optimal",
                progress: 85
              },
              {
                sector: "Sector B - Cabbage",
                area: "1.2 Acres",
                forecast: "4.1 Tons",
                status: "warning",
                progress: 40
              }
            ].map((sector, i) => (
              <div key={i} className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-hoverPrimary text-primary rounded-xl group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                      <Map className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-textPrimary text-lg">{sector.sector}</h3>
                      <p className="text-xs text-textSecondary font-medium">{sector.area}</p>
                    </div>
                  </div>
                </div>
                <div className="my-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">Proj. Yield</span>
                    <span className="text-2xl font-black text-textPrimary">{sector.forecast}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2.5 overflow-hidden border border-borderPrimary/50">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-1000 ${sector.status === 'optimal' ? 'bg-primary' : 'bg-secondary'}`}
                      style={{ width: `${sector.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl border border-borderPrimary text-sm font-bold text-textSecondary hover:bg-hoverPrimary hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center">
                  View Sector Details
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: AI Analysis Factors */}
        <div className="lg:col-span-1 space-y-8">
          
          <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8 border-b border-borderPrimary pb-6">
              <div className="p-3 bg-hoverPrimary text-primary rounded-xl">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-textPrimary">AI Factors</h2>
                <p className="text-sm text-textSecondary font-medium">Influencing your forecast</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              {[
                { 
                  title: "Consistent Sunlight", 
                  desc: "Above average sun hours this month boosted photosynthesis rates significantly.", 
                  impact: "positive" 
                },
                { 
                  title: "Soil Moisture Drop", 
                  desc: "Sector B experienced mild drought stress lowering cabbage volume predictions.", 
                  impact: "negative" 
                },
                { 
                  title: "Pest Control Success", 
                  desc: "Early intervention mitigated potential 15% damage to Sector A crops.", 
                  impact: "positive" 
                }
              ].map((factor, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-1">
                    {factor.impact === 'positive' ? (
                      <div className="p-1 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="p-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 shrink-0">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-textPrimary mb-1">{factor.title}</h4>
                    <p className="text-sm text-textSecondary leading-relaxed font-medium">
                      {factor.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-borderPrimary bg-hoverPrimary p-5 rounded-2xl">
              <h4 className="font-bold text-textPrimary text-sm mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-primary" /> Next Forecast Update
              </h4>
              <p className="text-xs text-textSecondary font-medium leading-relaxed">
                The model recalibrates every 48 hours using the latest climate and satellite soil data. 
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
