"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, MapPin, Save, Info, AlertTriangle, AlertCircle, CheckCircle, Thermometer, Droplets, Wind, CloudRain, Cloud, CloudSun } from "lucide-react";
import axiosInstance from "../../util/axiosInstance";
import { API_PATHS } from "../../util/apiPaths";

export default function MonitorPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<number[][]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [existingPolygon, setExistingPolygon] = useState<any | null>(null);
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [soilData, setSoilData] = useState<any | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const mapRef = useRef<any>(null);
  const drawnItemsRef = useRef<any>(null);

  useEffect(() => {
    // If scripts are already loaded, just initialize and fetch data
    if ((window as any).L && (window as any).L.Control?.geocoder) {
      if (!mapRef.current) initializeMap();
      fetchExistingPolygon();
      return;
    }

    if ((window as any).scriptsLoading) return;
    (window as any).scriptsLoading = true;

    const linkL = document.createElement("link");
    linkL.rel = "stylesheet";
    linkL.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(linkL);

    const linkDraw = document.createElement("link");
    linkDraw.rel = "stylesheet";
    linkDraw.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css";
    document.head.appendChild(linkDraw);

    const linkGeo = document.createElement("link");
    linkGeo.rel = "stylesheet";
    linkGeo.href = "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css";
    document.head.appendChild(linkGeo);

    const scriptL = document.createElement("script");
    scriptL.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    scriptL.async = true;

    scriptL.onload = () => {
      const scriptGeo = document.createElement("script");
      scriptGeo.src = "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js";
      scriptGeo.async = true;
      scriptGeo.onload = () => {
        const scriptDraw = document.createElement("script");
        scriptDraw.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js";
        scriptDraw.async = true;
        scriptDraw.onload = () => {
           initializeMap();
           fetchExistingPolygon();
        };
        document.body.appendChild(scriptDraw);
      };
      document.body.appendChild(scriptGeo);
    };
    
    document.body.appendChild(scriptL);
  }, []);

  const fetchExistingPolygon = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.MONITOR.MY_POLYGON);
      if (response.data && response.data.geoJson) {
        setExistingPolygon(response.data);
        const geoData = JSON.parse(response.data.geoJson);
        displayExistingPolygon(geoData);
        // Fetch weather and soil once we have coordinates and ID
        fetchStats(response.data.centerLat, response.data.centerLon, response.data.agroPolygonId);
      }
    } catch (err) {
      console.error("Error fetching polygon:", err);
    }
  };

  const fetchStats = async (lat: number, lon: number, polygonId: string) => {
    setLoadingStats(true);
    try {
      const [wRes, sRes] = await Promise.all([
        axiosInstance.get(`${API_PATHS.MONITOR.WEATHER}?lat=${lat}&lon=${lon}`),
        axiosInstance.get(`${API_PATHS.MONITOR.SOIL}?polygonId=${polygonId}`)
      ]);
      setWeatherData(wRes.data);
      setSoilData(sRes.data);
    } catch (err) {
      console.error("Error fetching monitors:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const displayExistingPolygon = (geoData: any) => {
    const L = (window as any).L;
    if (!L || !mapRef.current || !drawnItemsRef.current) return;

    drawnItemsRef.current.clearLayers();
    const layer = L.geoJSON(geoData, {
      style: {
        color: '#39C400',
        fillOpacity: 0.3,
        weight: 3
      }
    });
    
    drawnItemsRef.current.addLayer(layer);
    mapRef.current.fitBounds(layer.getBounds(), { padding: [20, 20] });
    
    // Extract coordinates to state for consistency
    if (geoData.geometry && geoData.geometry.coordinates[0]) {
       setCoordinates(geoData.geometry.coordinates[0]);
    }
    setName(existingPolygon?.name || "");
  };

  const initializeMap = () => {
    if (!mapContainer.current) return;
    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapContainer.current).setView([7.8731, 80.7718], 13);
    mapRef.current = map;

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri'
    }).addTo(map);

    const geocoder = (L as any).Control.Geocoder.nominatim();
    const searchControl = (L as any).Control.geocoder({
      query: '',
      placeholder: 'Search for your location...',
      defaultMarkGeocode: false,
      geocoder: geocoder
    }).addTo(map);

    searchControl.on('markgeocode', (e: any) => {
      map.fitBounds(e.geocode.bbox);
      map.setView(e.geocode.center, 17);
    });

    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: { featureGroup: drawnItems },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: { color: '#39C400', fillOpacity: 0.2 }
        },
        polyline: false, rectangle: false, circle: false, marker: false, circlemarker: false
      }
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e: any) => {
      drawnItems.clearLayers(); 
      const layer = e.layer;
      drawnItems.addLayer(layer);
      const coords = layer.getLatLngs()[0].map((ll: any) => [ll.lng, ll.lat]);
      if (coords.length > 0) coords.push([...coords[0]]);
      setCoordinates(coords);
      setError(null);
    });

    map.on(L.Draw.Event.DELETED, () => setCoordinates([]));
  };

  const handleSubmit = async () => {
    if (!name.trim()) { setError("Please provide a name for this land area."); return; }
    if (coordinates.length < 4) { setError("Please draw a valid polygon on the map."); return; }

    setLoading(true); setError(null); setSuccess(false);

    try {
      await axiosInstance.post(API_PATHS.MONITOR.POLYGON, {
        name: name,
        coordinates: coordinates
      });
      setSuccess(true);
      setIsEditing(false);
      fetchExistingPolygon();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to save polygon configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <MapPin className="h-3.5 w-3.5 mr-1" /> Geo-Spatial
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
            Crop Field Monitor
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Define the geographical boundaries of your farmland to initiate continuous satellite monitoring and precision agriculture analytics.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-hoverPrimary border border-primary/20 flex items-start gap-4 shadow-sm mb-6">
         <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0">
           <AlertCircle className="w-6 h-6" />
         </div>
         <div>
           <h3 className="font-bold text-textPrimary">Requirement Note</h3>
           <p className="text-sm font-medium text-textSecondary mt-1">
             The size of the marked land should be between <strong className="text-primary">1 to 1000 Hectares</strong> for optimized precision tracking. Extremely small or overly large spans may result in diminished satellite resolution accuracy. Please ensure your drawing respects these bounds before beginning the process.
           </p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Map Section */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="rounded-[2rem] border border-borderPrimary bg-backgroundSecondary shadow-lg overflow-hidden flex flex-col h-[600px] relative">
             <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-bold shadow-xl flex items-center pointer-events-none">
               <MapPin className="w-4 h-4 mr-2 text-primary" />
               Draw your boundaries
             </div>
             
             {/* The Map Mount Point */}
             <div ref={mapContainer} className="w-full h-full bg-borderPrimary/30 z-[10]" />
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Field Details & Stats */}
          <div className="rounded-[2rem] border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 sm:p-8 flex flex-col">
            {existingPolygon && !isEditing ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-textPrimary flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Field Details
                  </h2>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-md border border-primary/20">Active Monitoring</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-background border border-borderPrimary group hover:border-primary/30 transition-colors">
                    <p className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-1">Field Name</p>
                    <p className="text-lg font-bold text-textPrimary">{existingPolygon.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-background border border-borderPrimary">
                      <p className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-1">Area</p>
                      <p className="text-lg font-bold text-textPrimary">{existingPolygon.area.toFixed(2)} Ha</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-background border border-borderPrimary">
                      <p className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-1">Center Coordinates</p>
                      <p className="text-sm font-medium text-textPrimary font-mono">
                        {existingPolygon.centerLat.toFixed(4)}°N, {existingPolygon.centerLon.toFixed(4)}°E
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-textPrimary mb-6 flex items-center">
                   <Save className="w-5 h-5 mr-2 text-primary" />
                   {existingPolygon ? "Update Polygon" : "New Monitoring"}
                </h2>
                <div className="space-y-6">
                   <div>
                     <label className="block text-sm font-bold text-textSecondary mb-2">Land Name</label>
                     <input
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="e.g. Tomato Field A"
                       className="w-full bg-background border border-borderPrimary rounded-xl px-4 py-3 text-textPrimary font-medium focus:outline-none focus:border-primary transition-all"
                     />
                   </div>
                   <div className={`p-4 rounded-xl border ${coordinates.length >= 4 ? 'border-[#39C400]/30 bg-[#39C400]/5' : 'border-borderPrimary bg-background'} transition-all`}>
                      <div className="flex items-center text-sm font-bold">
                        {coordinates.length >= 4 ? <CheckCircle className="w-4 h-4 mr-2 text-[#39C400]" /> : <Info className="w-4 h-4 mr-2 text-textSecondary" />}
                        <span className={coordinates.length >= 4 ? "text-[#39C400]" : "text-textSecondary"}>
                          {coordinates.length >= 4 ? "Polygon Ready" : "Draw on Map"}
                        </span>
                      </div>
                   </div>
                   <button 
                      onClick={handleSubmit}
                      disabled={loading || coordinates.length < 4}
                      className="w-full py-4 rounded-xl bg-primary text-backgroundSecondary font-black text-lg flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                   >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                      SAVE
                   </button>
                   {existingPolygon && (
                     <button onClick={() => setIsEditing(false)} className="w-full text-sm font-bold text-textSecondary hover:underline">Cancel</button>
                   )}
                </div>
              </div>
            )}
          </div>

          {/* Weather & Soil Stats Card (Only when polygon exists and not editing) */}
          {existingPolygon && !isEditing && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Weather Monitor */}
              <div className="rounded-[2rem] border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 overflow-hidden relative group">
                <div className="absolute -top-6 -right-6 text-primary/10 group-hover:scale-110 transition-transform duration-700">
                  <Cloud className="w-32 h-32" />
                </div>
                <h3 className="font-bold text-textPrimary mb-6 flex items-center gap-2">
                  <CloudSun className="w-5 h-5 text-primary" /> Weather Monitor
                </h3>
                
                {loadingStats ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary/40" /></div>
                ) : weatherData ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-4xl font-black text-textPrimary">
                        {(weatherData.main.temp - 273.15).toFixed(1)}°
                      </span>
                      <span className="text-sm font-bold text-textSecondary flex items-center gap-1 mt-1">
                        <Thermometer className="w-3 h-3" /> {weatherData.weather[0].main}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-textSecondary flex items-center gap-1"><Droplets className="w-3 h-3" /> Humidity</span>
                        <span className="text-textPrimary">{weatherData.main.humidity}%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-textSecondary flex items-center gap-1"><Wind className="w-3 h-3" /> Wind</span>
                        <span className="text-textPrimary">{weatherData.wind.speed}m/s</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-textSecondary flex items-center gap-1"><CloudRain className="w-3 h-3" /> Rain</span>
                        <span className="text-textPrimary">{weatherData.rain?.['1h'] || 0}mm</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-textSecondary uppercase">Stats Unavailable</p>
                )}
              </div>

              {/* Soil Monitor */}
              <div className="rounded-[2rem] border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 overflow-hidden relative group">
                <h3 className="font-bold text-textPrimary mb-6 flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/20 rounded-lg flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(57,196,0,0.6)]" />
                  </div>
                  Soil Analysis
                </h3>

                {loadingStats ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary/40" /></div>
                ) : soilData ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background border border-borderPrimary rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                          <Droplets className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-textSecondary">Moisture</span>
                      </div>
                      <span className="text-lg font-black text-textPrimary">{(soilData.moisture * 100).toFixed(1)}%</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-background border border-borderPrimary rounded-2xl">
                        <p className="text-[10px] font-bold text-textSecondary uppercase mb-1">Surface Temp</p>
                        <p className="text-base font-black text-textPrimary">{(soilData.t0 - 273.15).toFixed(1)}°C</p>
                      </div>
                      <div className="p-3 bg-background border border-borderPrimary rounded-2xl">
                        <p className="text-[10px] font-bold text-textSecondary uppercase mb-1">10cm Depth</p>
                        <p className="text-base font-black text-textPrimary">{(soilData.t10 - 273.15).toFixed(1)}°C</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center border-2 border-dashed border-borderPrimary rounded-3xl">
                     <p className="text-xs font-bold text-textSecondary flex items-center justify-center gap-2">
                       <Info className="w-4 h-4" /> NO SENSOR DATA
                     </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
