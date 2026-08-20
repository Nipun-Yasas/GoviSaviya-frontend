"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Coins,
  TrendingUp,
  Calendar,
  Download,
  ArrowUpRight,
  Package,
  Loader2,
  ChevronRight,
  Filter
} from "lucide-react";

interface DeliveryJob {
  id: number;
  order: {
    id: number;
    totalAmount: number;
  };
  status: string;
  deliveredAt: string;
}

const API_BASE_URL = "http://localhost:8080/govisaviya/api/v1/delivery";

export default function DeliveryEarnings() {
  const [jobs, setJobs] = useState<DeliveryJob[]>([]);
  const [loading, setLoading] = useState(true);

  const DELIVERY_FEE = 450; // Mock flat fee per delivery

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data.filter((j: any) => j.status === 'DELIVERED'));
    } catch (err) {
      console.error("Failed to fetch earnings:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalEarnings = jobs.length * DELIVERY_FEE;
  const currentMonthEarnings = jobs.filter(j => {
    const d = new Date(j.deliveredAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length * DELIVERY_FEE;

  if (loading) {
    return (
      <div className="p-32 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-textSecondary font-bold text-lg">Calculating your earnings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2 flex items-center gap-3">
            Earnings <Coins className="text-primary w-8 h-8" />
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Track your income and delivery payouts.
          </p>
        </div>
        <button className="bg-backgroundSecondary border border-borderPrimary px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-hoverPrimary transition-all flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-primary p-8 rounded-[2.5rem] shadow-xl text-backgroundSecondary relative overflow-hidden group">
          <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">Total Balance</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black">Rs. {totalEarnings}</h3>
            <span className="text-xs font-bold opacity-60">LKR</span>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold text-white/80">
            <div className="bg-white/20 px-2 py-1 rounded-md tracking-tighter self-start font-black">
              +12%
            </div>
            <span>from last month</span>
          </div>
        </div>

        <div className="bg-backgroundSecondary border border-borderPrimary p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary mb-2">Current Month</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-textPrimary">Rs. {currentMonthEarnings}</h3>
            <span className="text-xs font-bold text-textSecondary">LKR</span>
          </div>
          <p className="mt-8 text-xs font-medium text-textSecondary">
            Based on {jobs.filter(j => new Date(j.deliveredAt).getMonth() === new Date().getMonth()).length} successful deliveries.
          </p>
        </div>

        <div className="bg-backgroundSecondary border border-borderPrimary p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary mb-2">Estimated Next Payout</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-textPrimary">Rs. {totalEarnings > 0 ? 3500 : 0}</h3>
            <span className="text-xs font-bold text-textSecondary">LKR</span>
          </div>
          <p className="mt-8 text-xs font-bold text-primary flex items-center gap-2 group cursor-pointer">
            View Schedule <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-textPrimary">Transaction History</h2>
          <button className="p-2 border border-borderPrimary rounded-xl text-textSecondary hover:bg-hoverPrimary transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-hoverPrimary/50 border-b border-borderPrimary">
                <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Date</th>
                <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Description</th>
                <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Type</th>
                <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b border-borderPrimary hover:bg-hoverPrimary/30 transition-colors">
                  <td className="p-6 font-bold text-textPrimary text-sm">
                    {new Date(job.deliveredAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-textPrimary">Delivery Commission</span>
                      <span className="text-[10px] text-textSecondary uppercase tracking-widest">Order #{job.order.id}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest">
                      Payout
                    </span>
                  </td>
                  <td className="p-6 text-right font-black text-textPrimary">
                    + Rs. {DELIVERY_FEE}
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-textSecondary opacity-50 font-medium">No payout records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
