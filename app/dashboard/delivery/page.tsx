"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Package, 
  User, 
  Phone,
  ArrowRight,
  Loader2,
  AlertCircle,
  TrendingUp,
  Map,
  ChevronRight,
  Navigation
} from "lucide-react";

interface DeliveryJob {
  id: number;
  order?: {
    id: number;
    status: string;
    deliveryAddress: string;
    totalAmount: number;
    buyer?: {
      fullName: string;
      phone: string;
    };
  };
  status: string;
  assignedAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
}

const API_BASE_URL = "http://localhost:8080/govisaviya/api/v1/delivery";

export default function DeliveryDashboard() {
  const [jobs, setJobs] = useState<DeliveryJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setError("Failed to load your dashboard. Please try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
        <p className="text-textSecondary font-bold text-xl animate-pulse">Loading Dashboard Overview...</p>
      </div>
    );
  }

  const jobsArray = Array.isArray(jobs) ? jobs : [];
  const activeJobs = jobsArray.filter(j => j && j.status !== 'DELIVERED');
  const completedJobs = jobsArray.filter(j => j && j.status === 'DELIVERED');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Panel */}
      <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 py-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
             <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                Command Center
             </span>
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-textPrimary leading-tight">
             Delivery <span className="text-primary italic">Overview</span>
          </h1>
          <p className="text-textSecondary text-lg font-medium mt-2">
            Track your efficiency and earnings in real-time.
          </p>
        </div>

        <div className="flex gap-4">
           <div className="bg-backgroundSecondary border border-borderPrimary p-6 rounded-[2rem] shadow-sm flex flex-col justify-center min-w-[160px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-textSecondary mb-1">Performance</p>
              <h3 className="text-2xl font-black text-textPrimary">98.4%</h3>
           </div>
           <div className="bg-primary p-6 rounded-[2rem] shadow-xl text-backgroundSecondary flex flex-col justify-center min-w-[160px]">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Daily Status</p>
              <h3 className="text-2xl font-black">{activeJobs.length} Active</h3>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-10">
          
          <div className="bg-backgroundSecondary border border-borderPrimary rounded-[3rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Truck className="w-40 h-40" />
            </div>
            <h2 className="text-2xl font-bold text-textPrimary mb-4">Quick Status</h2>
            <p className="text-textSecondary font-medium mb-8 max-w-md">
              You currently have {activeJobs.length} shipments needing attention. Complete these to increase your daily earnings.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.location.href='/dashboard/delivery/jobs'}
                className="px-8 py-4 bg-primary text-backgroundSecondary rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Go to Assignments
              </button>
              <button 
                onClick={() => window.location.href='/dashboard/delivery/earnings'}
                className="px-8 py-4 border border-borderPrimary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-hoverPrimary transition-all"
              >
                Financials
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-textPrimary">Next for Delivery</h3>
            {activeJobs.length === 0 ? (
              <div className="py-20 text-center bg-backgroundSecondary/30 rounded-[3rem] border border-dashed border-borderPrimary">
                <p className="text-textSecondary italic">No pending tasks for today.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeJobs.slice(0, 2).map(job => (
                  <div key={job.id} className="bg-backgroundSecondary border border-borderPrimary rounded-3xl p-6 flex items-center justify-between group hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black text-textPrimary text-lg">Trip #{job.order?.id || job.id}</p>
                        <p className="text-sm text-textSecondary font-medium truncate max-w-[200px] md:max-w-md">{job.order?.deliveryAddress}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-textSecondary group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Column */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-backgroundSecondary border border-borderPrimary p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-textSecondary mb-8 flex items-center gap-2">
                 <TrendingUp className="w-4 h-4 text-primary" /> Daily Revenue
              </p>
              <div className="space-y-8">
                 <div>
                    <h3 className="text-5xl font-black text-textPrimary tracking-tighter mb-2">{completedJobs.length}</h3>
                    <p className="text-sm font-bold text-textSecondary">Completed Deliveries</p>
                 </div>
                 <div className="h-px bg-borderPrimary w-full"></div>
                 <div>
                    <h3 className="text-4xl font-black text-textPrimary tracking-tighter mb-2">
                       Rs. {completedJobs.length * 450}
                    </h3>
                    <p className="text-sm font-bold text-textSecondary">Estimated Commissions</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-4 z-50">
           <AlertCircle className="w-6 h-6" />
           <p className="font-bold">{error}</p>
        </div>
      )}
    </div>
  );
}
