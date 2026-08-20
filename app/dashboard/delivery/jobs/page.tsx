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

export default function MyJobsPage() {
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
      setError("Failed to load your delivery jobs.");
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
      alert("Failed to update trip status.");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
        <p className="text-textSecondary font-bold text-xl animate-pulse">Loading Your Assignments...</p>
      </div>
    );
  }

  const jobsArray = Array.isArray(jobs) ? jobs : [];
  const activeJobs = jobsArray.filter(j => j && j.status !== 'DELIVERED');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <section className="py-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
            Job Queue
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-textPrimary leading-tight">
          Current <span className="text-primary italic">Assignments</span>
        </h1>
        <p className="text-textSecondary text-lg font-medium mt-2">
          Manage your active delivery trips and track pending pickups.
        </p>
      </section>

      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-textPrimary flex items-center gap-3">
            Active Trips
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
            <h3 className="text-xl font-bold text-textPrimary mb-2">Queue Empty</h3>
            <p className="text-textSecondary font-medium max-w-sm mx-auto">
              No active delivery requests found. Check back later for new assignments.
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
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${job.status === 'ASSIGNED' ? 'bg-primary/10 text-primary' : 'bg-orange-500/10 text-orange-500'
                          }`}>
                          {job.status === 'ASSIGNED' ? 'Ready for Pickup' : 'Trip Underway'}
                        </span>
                      </div>
                      <h3 className="text-3xl font-black text-textPrimary">Trip #{job.order?.id || job.id}</h3>
                      <p className="text-textSecondary font-bold mt-1">Assigned {new Date(job.assignedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="text-xs font-black uppercase tracking-widest text-textSecondary mb-1">Items Total</p>
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
                  {job.status === 'ASSIGNED' && (
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

                  {job.status === 'PICKED_UP' && (
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-10 py-5 rounded-full shadow-2xl flex items-center gap-4 z-50 animate-in fade-in slide-in-from-bottom-10">
          <AlertCircle className="w-6 h-6" />
          <p className="font-bold">{error}</p>
        </div>
      )}
    </div>
  );
}
