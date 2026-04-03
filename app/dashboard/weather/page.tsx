"use client"

import React, { useState, useEffect } from "react";
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
  Sunset,
  Loader2,
  Cloud
} from "lucide-react";
import axiosInstance from "@/app/util/axiosInstance";
import { API_PATHS } from "@/app/util/apiPaths";

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

interface WeatherEntry {
  dt: number;
  weather: Weather[];
  main: MainWeather;
  wind: WindData;
  clouds: { all: number };
  rain?: { "3h": number };
}

const K_TO_C = (k?: number) => {
  if (k === undefined || k === null || isNaN(k)) return 0;
  return Math.round(k - 273.15);
};

export default function WeatherPage() {
  const [currentWeather, setCurrentWeather] = useState<WeatherEntry | null>(null);
  const [forecastData, setForecastData] = useState<WeatherEntry[]>([]);
  const [polygon, setPolygon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch Polygon to get location
        const polyResponse = await axiosInstance.get(API_PATHS.MONITOR.MY_POLYGON);
        const polyData = polyResponse.data;
        setPolygon(polyData);

        const lat = polyData?.centerLat || 37.6739;
        const lon = polyData?.centerLon || 121.1867;

        // 2. Fetch Current Weather & Forecast in parallel
        const [currentRes, forecastRes] = await Promise.all([
          axiosInstance.get(API_PATHS.MONITOR.WEATHER, { params: { lat, lon } }),
          axiosInstance.get(API_PATHS.MONITOR.FORECAST, { params: { lat, lon } })
        ]);

        setCurrentWeather(currentRes.data);
        
        // Handle forecast array (checking for potential wrapping)
        const fData = forecastRes.data;
        if (Array.isArray(fData)) {
          setForecastData(fData);
        } else if (fData && typeof fData === 'object') {
          const list = fData.list || fData.data || Object.values(fData).find(v => Array.isArray(v)) || [];
          setForecastData(list as WeatherEntry[]);
        }

      } catch (err: any) {
        console.error("Error fetching weather context:", err);
        setError(err.response?.data?.message || "Could not retrieve weather for your location.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <Cloud className="h-6 w-6 text-primary/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-textSecondary font-medium animate-pulse">Fetching latest climate data...</p>
      </div>
    );
  }

  if (error || !currentWeather) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="p-4 rounded-full bg-destructive/10 text-destructive mb-2">
          <AlertTriangle className="h-12 w-12" />
        </div>
        <h3 className="text-xl font-bold text-textPrimary">Weather Data Unavailable</h3>
        <p className="text-textSecondary max-w-md">
          {error || "We couldn't find a field polygon or weather station for this area."}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-hoverPrimary transition-colors shadow-lg shadow-primary/20"
        >
          Retry
        </button>
      </div>
    );
  }

  const current = currentWeather;
  const weatherData = forecastData; // For legacy helper calls
  
  // Group elements for 7-day forecast (one per day - ideally midday)
  const dailyForecast = (() => {
    const groups: { [key: string]: WeatherEntry } = {};
    weatherData.forEach(entry => {
      if (!entry || !entry.dt || isNaN(entry.dt)) return;
      
      const dateObj = new Date(entry.dt * 1000);
      if (isNaN(dateObj.getTime())) return;

      const date = dateObj.toISOString().split('T')[0];
      // Prefer midday data (12:00:00) if available for the daily summary
      const isMidday = dateObj.getUTCHours() === 12;
      if (!groups[date] || isMidday) {
        groups[date] = entry;
      }
    });
    return Object.values(groups).sort((a, b) => a.dt - b.dt).slice(0, 7);
  })();

  const getWeatherIcon = (main?: string) => {
    if (!main) return Cloud;
    switch (main.toLowerCase()) {
      case 'clouds': return CloudSun;
      case 'rain': return CloudRain;
      case 'clear': return Sun;
      case 'thunderstorm': return CloudLightning;
      case 'drizzle': return CloudRain;
      default: return Cloud;
    }
  };

  const IconComponent = getWeatherIcon(current?.weather?.[0]?.main);

  // Chart Component
  const WeatherChart = () => {
    const data = weatherData.slice(0, 12)
      .filter(d => d && d.dt && !isNaN(d.dt))
      .map(d => ({
        time: new Date(d.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        temp: K_TO_C(d.main.temp)
      }));

    const maxTemp = Math.max(...data.map(d => d.temp));
    const minTemp = Math.min(...data.map(d => d.temp));
    const range = maxTemp - minTemp || 1;
    
    // Scale to a height of 100
    const points = data.map((d, i) => {
      const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
      const y = 100 - ((d.temp - minTemp) / range) * 70 - 15; // Increased margin
      return `${x},${y}`;
    }).join(' ');

    const areaPoints = `0,100 ${points} 100,100`;

    return (
      <div className="mt-8 relative h-40 w-full overflow-hidden">
        {data.length > 0 ? (
          <>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                fill="url(#chartGradient)"
                points={data.length > 1 ? areaPoints : `0,100 50,${100 - ((data[0].temp - minTemp) / range) * 70 - 15} 100,100`}
              />
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                points={data.length > 1 ? points : `50,${100 - ((data[0].temp - minTemp) / range) * 70 - 15}`}
                className="text-primary"
                style={{ vectorEffect: 'non-scaling-stroke' }}
              />
            </svg>
            <div className="absolute inset-0 flex justify-between pointer-events-none">
              {data.map((d, i) => (
                <div key={i} className="flex flex-col justify-end items-center h-full group" style={{ width: `${100 / data.length}%` }}>
                  <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center">
                    <span className="text-[10px] font-bold text-primary bg-backgroundSecondary border border-primary/20 px-1 rounded shadow-sm">
                      {d.temp}°
                    </span>
                  </div>
                  <div className="w-px h-1 grow bg-borderPrimary/20" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-textSecondary text-xs">No trend data available</div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-hoverPrimary text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <MapPin className="h-3.5 w-3.5 mr-1" /> {polygon?.name || "Current Field Location"}
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
          <p className="text-textPrimary font-bold text-lg">
            {new Date(current.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <p className="text-textSecondary font-medium">Updated just now</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Big Current Weather + Hourly */}
        <div className="xl:col-span-2 space-y-8 flex flex-col">
          
          {/* Hero Current Weather */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row justify-between gap-8 h-auto w-full group">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6">
              <IconComponent className="w-80 h-80 -mt-16 -mr-16" />
            </div>
            
            <div className="relative z-10 flex flex-col justify-center">
              <h2 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-2">Current Condition</h2>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-7xl sm:text-8xl font-black tracking-tighter">{K_TO_C(current.main.temp)}°</span>
                <span className="text-2xl sm:text-3xl font-medium tracking-tight opacity-90 capitalize">
                  {current?.weather?.[0]?.description || "Conditions unavailable"}
                </span>
              </div>
              <p className="text-white/80 text-lg font-medium">
                Feels like {K_TO_C(current?.main?.feels_like || 273.15)}° • High {K_TO_C(current?.main?.temp_max || 273.15)}° / Low {K_TO_C(current?.main?.temp_min || 273.15)}°
              </p>
              
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
                { icon: Droplets, label: "Humidity", value: `${current?.main?.humidity || 0}%` },
                { icon: Wind, label: "Wind", value: `${Math.round((current?.wind?.speed || 0) * 3.6)} km/h` },
                { icon: Umbrella, label: "Rain (3h)", value: `${current?.rain?.["3h"] || 0} mm` },
                { icon: ThermometerSun, label: "Pressure", value: `${current?.main?.pressure || 0} hPa` },
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
          <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-textPrimary">Temperature Trends</h2>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-hoverPrimary/50 text-primary text-[10px] font-bold uppercase tracking-wider">
                <div className="w-2 h-2 rounded-full bg-primary" /> 12H Forecast
              </div>
            </div>
            
            <WeatherChart />
            
            <div className="flex overflow-x-auto mt-6 pb-4 gap-4 no-visible-scrollbar shrink-0">
              {weatherData.slice(0, 12).map((hour, i) => {
                const HourIcon = getWeatherIcon(hour?.weather?.[0]?.main);
                const isNow = i === 0;
                return (
                  <div 
                    key={i} 
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl min-w-[90px] border transition-all duration-300 ${
                      isNow 
                      ? 'bg-primary text-backgroundSecondary border-primary shadow-lg shadow-primary/20 scale-105' 
                      : 'bg-background border-borderPrimary text-textPrimary hover:border-primary/40 hover:bg-hoverPrimary/40'
                    }`}
                  >
                    <span className={`text-sm font-bold mb-3 ${isNow ? 'text-backgroundSecondary/90' : 'text-textSecondary'}`}>
                      {isNow ? 'Now' : new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </span>
                    <HourIcon className={`h-8 w-8 mb-3 ${isNow ? 'text-backgroundSecondary' : 'text-textPrimary'}`} />
                    <span className="text-xl font-bold">{K_TO_C(hour?.main?.temp)}°</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Farming Advisory Action Plan - Commented for now
          <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8">
            ... content ...
          </div>
          */}
        </div>

        {/* Right Column: 7-Day Forecast */}
        <div className="xl:col-span-1 rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 lg:p-8 flex flex-col h-fit">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-textSecondary" />
              <h2 className="text-xl font-bold text-textPrimary">7-Day Forecast</h2>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            {dailyForecast.map((day, i) => {
              const DayIcon = getWeatherIcon(day?.weather?.[0]?.main);
              const dateObj = new Date(day.dt * 1000);
              const dayName = i === 0 ? "Today" : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
              
              // Calculate a simple progress percentage for the bar (based on temp range 0-40)
              const progress = Math.min(100, Math.max(10, ((K_TO_C(day?.main?.temp) / 40) * 100)));

              return (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-borderPrimary last:border-0 hover:bg-hoverPrimary/30 rounded-xl px-2 transition-colors">
                  <span className={`w-12 font-bold ${i === 0 ? 'text-primary' : 'text-textPrimary'}`}>{dayName}</span>
                  <DayIcon className="h-6 w-6 text-textSecondary shrink-0" />
                  
                  <div className="flex items-center gap-3 flex-1 px-2">
                    <span className="text-xs font-bold text-textSecondary w-6 text-right">{K_TO_C(day.main.temp_min)}°</span>
                    <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden border border-borderPrimary/50">
                      <div 
                        className="h-full bg-gradient-to-r from-secondary to-primary rounded-full relative"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-textPrimary w-6">{K_TO_C(day.main.temp_max)}°</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-borderPrimary">
            {weatherData.slice(0, 12).some(w => w?.weather?.[0]?.main === 'Thunderstorm' || ((w?.wind?.speed || 0) * 3.6) > 25) ? (
              <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
                <div>
                  <h4 className="font-bold text-textPrimary text-sm mb-1">Weather Alert</h4>
                  <p className="text-xs text-textSecondary font-medium leading-relaxed">
                    Severe conditions detected. High winds or thunderstorms expected. Protect sensitive crops and secure equipment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/10 border border-secondary/30 p-4 rounded-2xl flex items-start gap-3">
                <CloudSun className="h-6 w-6 text-secondary shrink-0" />
                <div>
                  <h4 className="font-bold text-textPrimary text-sm mb-1">Status: Stable</h4>
                  <p className="text-xs text-textSecondary font-medium leading-relaxed">
                    No severe weather warnings for the next 24 hours. Ideal conditions for most routine farming tasks.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
