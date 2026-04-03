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
  const [updating, setUpdating] = useState<number | null>(null);
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
      setError("Failed to load your latest delivery jobs. Please try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (jobId: number, status: string) => {
    try {
      setUpdating(jobId);
      const token = localStorage.getItem("token");
      await axios.patch(`${API_BASE_URL}/status/${jobId}?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchJobs();
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update trip status. Please check your connection.");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
        <p className="text-textSecondary font-bold text-xl animate-pulse">Initializing Command Center...</p>
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
                Live Console
             </span>
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-textPrimary leading-tight">
             My Delivery <span className="text-primary italic">Operations</span>
          </h1>
          <p className="text-textSecondary text-lg font-medium mt-2">
            Managing fresh food distribution across your region.
          </p>
        </div>

        <div className="flex gap-4">
           <div className="bg-backgroundSecondary border border-borderPrimary p-6 rounded-[2rem] shadow-sm flex flex-col justify-center min-w-[160px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-textSecondary mb-1">Success Rate</p>
              <h3 className="text-2xl font-black text-textPrimary">98.4%</h3>
           </div>
           <div className="bg-primary p-6 rounded-[2rem] shadow-xl text-backgroundSecondary flex flex-col justify-center min-w-[160px]">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Session Active</p>
              <h3 className="text-2xl font-black">{activeJobs.length} Trips</h3>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Jobs Section */}
        <div className="lg:col-span-8 space-y-10">
          
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-bold text-textPrimary flex items-center gap-3">
                Active Assignments
                <span className="bg-primary/20 text-primary text-xs w-6 h-6 flex items-center justify-center rounded-full font-black">
                   {activeJobs.length}
                </span>
             </h2>
             <button 
                onClick={fetchJobs}
                className="p-3 border border-borderPrimary rounded-2xl hover:bg-hoverPrimary transition-all text-textSecondary"
              >
                <Clock className="w-5 h-5" />
             </button>
          </div>

          {activeJobs.length === 0 ? (
            <div className="bg-backgroundSecondary/50 border-2 border-dashed border-borderPrimary rounded-[3rem] py-24 px-12 text-center group">
              <div className="bg-backgroundSecondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-borderPrimary group-hover:scale-110 transition-transform">
                <Package className="w-10 h-10 text-textSecondary opacity-30" />
              </div>
              <h3 className="text-xl font-bold text-textPrimary mb-2">Standby Mode</h3>
              <p className="text-textSecondary font-medium max-w-sm mx-auto">
                No active delivery request found. You'll see new assignments here when farmers allocate jobs.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {activeJobs.map(job => (
                <div 
                   key={job.id} 
                   className="bg-backgroundSecondary border border-borderPrimary rounded-[3rem] p-4 md:p-10 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                     <Truck className="w-48 h-48 rotate-12" />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                    <div className="flex gap-6">
                      <div className="bg-primary/10 w-20 h-20 rounded-[2rem] flex items-center justify-center border border-primary/20">
                         <Truck className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            job.order?.status === 'ASSIGNED' ? 'bg-primary/10 text-primary' :
                            'bg-orange-500/10 text-orange-500'
                          }`}>
                            {job.order?.status === 'ASSIGNED' ? 'Ready for Pickup' : 'Trip Underway'}
                          </span>
                        </div>
                        <h3 className="text-3xl font-black text-textPrimary">Trip #{job.order?.id || job.id}</h3>
                        <p className="text-textSecondary font-bold mt-1">Assigned {new Date(job.assignedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                       <p className="text-xs font-black uppercase tracking-widest text-textSecondary mb-1">Trip Value</p>
                       <p className="text-3xl font-black text-primary">Rs. {job.order?.totalAmount || 0}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 mb-10 p-8 bg-hoverPrimary/40 rounded-[2.5rem] border border-borderPrimary relative z-10">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-backgroundSecondary p-3 rounded-2xl shadow-sm">
                           <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-textSecondary uppercase tracking-widest mb-1">Drop-off Destination</p>
                          <p className="text-lg font-black text-textPrimary leading-tight">{job.order?.deliveryAddress || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-backgroundSecondary p-3 rounded-2xl shadow-sm">
                           <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-textSecondary uppercase tracking-widest mb-1">Customer Profile</p>
                          <p className="text-lg font-black text-textPrimary">{job.order?.buyer?.fullName || "Buyer"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4 cursor-pointer group/btn" onClick={() => window.open(`tel:${job.order?.buyer?.phone}`)}>
                        <div className="bg-backgroundSecondary p-3 rounded-2xl shadow-sm group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                           <Phone className="w-6 h-6 text-primary group-hover/btn:text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-textSecondary uppercase tracking-widest mb-1">Direct Contact</p>
                          <p className="text-lg font-black text-textPrimary hover:text-primary transition-colors">{job.order?.buyer?.phone || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="bg-backgroundSecondary p-3 rounded-2xl shadow-sm">
                            <Navigation className="w-6 h-6 text-primary" />
                         </div>
                         <div>
                           <p className="text-[11px] font-black text-textSecondary uppercase tracking-widest mb-1">Logistics Status</p>
                           <p className="text-lg font-black text-textPrimary">{job.status}</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 relative z-10 overflow-hidden">
                    {/* Dynamic Action Buttons */}
                    {job.order?.status === 'ASSIGNED' && (
                      <button 
                        disabled={updating === job.id}
                        onClick={() => updateStatus(job.id, 'PICKED_UP')}
                        className="flex-1 group/action bg-primary text-backgroundSecondary p-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                         {updating === job.id ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                           <>
                             Confirm Job Pickup <ArrowRight className="w-5 h-5 group-hover/action:translate-x-2 transition-transform" />
                           </>
                         )}
                      </button>
                    )}

                    {job.order?.status === 'PICKED_UP' && (
                      <button 
                        disabled={updating === job.id}
                        onClick={() => updateStatus(job.id, 'DELIVERED')}
                        className="flex-1 group/action bg-green-500 text-white p-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                         {updating === job.id ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                           <>
                             Verify Delivery Success <CheckCircle2 className="w-5 h-5" />
                           </>
                         )}
                      </button>
                    )}

                    {job.order?.status === 'ASSIGNED' && (
                      <button 
                         className="px-10 py-6 border border-borderPrimary rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] text-textSecondary hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all whitespace-nowrap"
                      >
                         Relinquish Job
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar / Performance Section */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Total Statistics */}
           <div className="bg-backgroundSecondary border border-borderPrimary p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-textSecondary mb-8 flex items-center gap-2">
                 <TrendingUp className="w-4 h-4 text-primary" /> Performance Overview
              </p>
              
              <div className="space-y-8">
                 <div>
                    <h3 className="text-5xl font-black text-textPrimary tracking-tighter mb-2">{completedJobs.length}</h3>
                    <p className="text-sm font-bold text-textSecondary">Completed Trip Cycles</p>
                 </div>
                 <div className="h-px bg-borderPrimary w-full"></div>
                 <div>
                    <h3 className="text-4xl font-black text-textPrimary tracking-tighter mb-2">
                       Rs. {completedJobs.length * 450} <span className="text-sm text-textSecondary opacity-40">Earned</span>
                    </h3>
                    <p className="text-sm font-bold text-textSecondary">Commission Revenue Today</p>
                 </div>
              </div>

              <button 
                 onClick={() => window.location.href='/dashboard/delivery/earnings'}
                 className="w-full mt-12 py-5 bg-hoverPrimary/50 border border-borderPrimary rounded-[2rem] font-black text-xs uppercase tracking-widest text-textPrimary hover:bg-primary hover:text-backgroundSecondary transition-all flex items-center justify-center gap-2"
              >
                 View Ledger Statistics <ChevronRight className="w-4 h-4" />
              </button>
           </div>

           {/* Quick History Feed */}
           <div className="bg-backgroundSecondary border border-borderPrimary p-10 rounded-[3rem] shadow-sm">
              <h3 className="text-xl font-bold text-textPrimary mb-8">Recent Payouts</h3>
              <div className="space-y-4">
                 {completedJobs.slice(0, 4).map(job => (
                    <div key={job.id} className="flex items-center justify-between p-4 rounded-3xl bg-hoverPrimary/30 border border-borderPrimary/50">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                             <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="font-bold text-sm text-textPrimary">Trip #{job.order?.id || job.id}</p>
                             <p className="text-[9px] font-black uppercase tracking-widest text-textSecondary">Delivered</p>
                          </div>
                       </div>
                       <p className="font-black text-xs text-primary">+ Rs. 450</p>
                    </div>
                 ))}
                 {completedJobs.length === 0 && (
                    <div className="py-12 text-center">
                       <p className="text-textSecondary opacity-50 font-bold text-sm italic">Queue Empty</p>
                    </div>
                 )}
              </div>
           </div>
        </div>

      </div>

      {error && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-4 z-50 animate-in fade-in slide-in-from-bottom-10">
           <AlertCircle className="w-6 h-6" />
           <p className="font-bold">{error}</p>
           <button onClick={fetchJobs} className="underline font-black uppercase text-xs tracking-widest ml-4">Retry</button>
        </div>
      )}

    </div>
  );
}
