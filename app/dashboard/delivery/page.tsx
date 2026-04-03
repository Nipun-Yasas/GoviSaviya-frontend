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
  AlertCircle
} from "lucide-react";

interface DeliveryJob {
  id: number;
  order: {
    id: number;
    status: string;
    deliveryAddress: string;
    totalAmount: number;
    buyer: {
      fullName: string;
      phone: string;
    };
  };
  status: string;
  assignedAt: string;
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
      setError("Failed to load delivery jobs.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (jobId: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_BASE_URL}/status/${jobId}?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchJobs();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="p-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-textSecondary font-bold text-lg">Loading your delivery jobs...</p>
      </div>
    );
  }

  const jobsArray = Array.isArray(jobs) ? jobs : [];
  const activeJobs = jobsArray.filter(j => j && j.status !== 'DELIVERED');
  const completedJobs = jobsArray.filter(j => j && j.status === 'DELIVERED');


  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2 flex items-center gap-3">
            Delivery Dashboard <Truck className="text-primary w-8 h-8" />
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Manage your assignments and track your deliveries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Jobs */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-textPrimary flex items-center gap-2">
            Active Assignments <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">{activeJobs.length}</span>
          </h2>

          {activeJobs.length === 0 ? (
            <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2rem] p-12 text-center">
              <Package className="w-12 h-12 text-textSecondary opacity-30 mx-auto mb-4" />
              <p className="text-textSecondary font-medium">No active jobs at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {activeJobs.map(job => (
                <div key={job.id} className="bg-backgroundSecondary border border-borderPrimary rounded-[2rem] p-8 shadow-sm hover:border-primary/40 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        job.order.status === 'ACCEPTED' ? 'bg-blue-500/10 text-blue-500' :
                        job.order.status === 'ASSIGNED' ? 'bg-primary/10 text-primary' :
                        'bg-orange-500/10 text-orange-500'
                      }`}>
                        {job.order.status === 'ACCEPTED' ? 'New Request' :
                         job.order.status === 'ASSIGNED' ? 'Accepted / Waiting for Pickup' :
                         job.order.status === 'PICKED_UP' ? 'Picked Up / Underway' :
                         job.order.status}
                      </span>
                      <h3 className="text-xl font-bold text-textPrimary mt-2">Order #{job.order.id}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-textSecondary font-bold">Assigned On</p>
                      <p className="font-bold text-textPrimary">{new Date(job.assignedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-y border-borderPrimary py-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest">Delivery Address</p>
                          <p className="font-bold text-textPrimary">{job.order.deliveryAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest">Buyer</p>
                          <p className="font-bold text-textPrimary">{job.order.buyer.fullName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest">Contact</p>
                          <p className="font-bold text-textPrimary">{job.order.buyer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest">Order Amount</p>
                          <p className="font-bold text-textPrimary">Rs. {job.order.totalAmount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {job.order.status === 'ACCEPTED' && (
                      <button 
                        onClick={() => updateStatus(job.id, 'ASSIGNED')}
                        className="flex-1 py-4 bg-primary text-backgroundSecondary rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-lg transition-all"
                      >
                        Accept Job
                      </button>
                    )}
                    {job.order.status === 'ASSIGNED' && (
                      <button 
                        onClick={() => updateStatus(job.id, 'PICKED_UP')}
                        className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-lg transition-all"
                      >
                        Pick Up from Farmer
                      </button>
                    )}
                    {job.order.status === 'PICKED_UP' && (
                      <button 
                        onClick={() => updateStatus(job.id, 'DELIVERED')}
                        className="flex-1 py-4 bg-green-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-lg transition-all"
                      >
                        Mark as Delivered
                      </button>
                    )}
                    {job.order.status === 'ACCEPTED' && (
                      <button 
                        className="px-6 py-4 border border-destructive/20 text-destructive rounded-2xl font-black text-sm uppercase hover:bg-destructive/5 transition-all"
                      >
                        Reject
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Stats & Recently Completed */}
        <div className="space-y-8">
          <div className="bg-primary p-8 rounded-[2.5rem] shadow-xl text-backgroundSecondary relative overflow-hidden group">
            <Truck className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70 mb-1">Total Deliveries</p>
            <h3 className="text-5xl font-black mb-4">{completedJobs.length}</h3>
            <p className="text-sm font-medium opacity-80">You're making fresh food accessible!</p>
          </div>

          <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-textPrimary mb-6">Recent History</h3>
            <div className="space-y-4">
              {completedJobs.slice(0, 5).map(job => (
                <div key={job.id} className="flex items-center gap-4 p-4 rounded-2xl bg-hoverPrimary/30 border border-borderPrimary">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-textPrimary">Order #{job.order.id}</p>
                    <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold">Delivered</p>
                  </div>
                </div>
              ))}
              {completedJobs.length === 0 && (
                <p className="text-center py-6 text-textSecondary text-sm">No completed jobs yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
