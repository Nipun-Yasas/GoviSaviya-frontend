"use client";

import React, { useEffect, useState } from "react";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Loader2,
  Calendar,
  MapPin,
  Package,
  ChevronRight,
  Filter,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "../../../util/axiosInstance";
import { API_PATHS } from "../../../util/apiPaths";

interface FertilizerRequest {
  id: number;
  fertilizerType: string;
  quantityRequested: string;
  landArea: string;
  purpose: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  remarks?: string;
  documentUrls?: string[];
}

export default function MyFertilizerRequestsPage() {
  const [requests, setRequests] = useState<FertilizerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.FERTILIZER.MY_REQUESTS);
        setRequests(response.data || []);
      } catch (err: any) {
        console.error("Failed to fetch requests:", err);
        setError("Could not load your requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusStyle = (status: FertilizerRequest["status"]) => {
    switch (status) {
      case "APPROVED":
        return {
          bg: "bg-[#39C400]/10",
          text: "text-[#39C400]",
          border: "border-[#39C400]/20",
          icon: CheckCircle2
        };
      case "REJECTED":
        return {
          bg: "bg-destructive/10",
          text: "text-destructive",
          border: "border-destructive/20",
          icon: XCircle
        };
      default:
        return {
          bg: "bg-amber-500/10",
          text: "text-amber-600",
          border: "border-amber-500/20",
          icon: Clock
        };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Link href="/dashboard/fertilizer-request" className="inline-flex items-center text-sm font-bold text-textSecondary hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Submit New Request
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <FileText className="h-3.5 w-3.5 mr-1" /> History
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
            My Fertilizer Requests
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Track the status of your subsidy applications and review past submissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 rounded-xl bg-backgroundSecondary border border-borderPrimary text-textSecondary hover:text-primary hover:border-primary/30 transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] p-6 sm:p-8 shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-textSecondary">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary/40" />
            <span className="text-sm font-bold tracking-widest uppercase opacity-60">Loading Applications...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <p className="text-lg font-bold text-textPrimary">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-bold">Try Again</button>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-borderPrimary rounded-3xl bg-background">
            <FileText className="w-16 h-16 text-textSecondary/20 mb-4" />
            <p className="text-xl font-bold text-textSecondary">No requests found</p>
            <p className="text-sm font-medium text-textSecondary/60 mt-2 mb-8">You haven't submitted any fertilizer requests yet.</p>
            <Link href="/dashboard/fertilizer-request" className="px-8 py-3 bg-primary text-backgroundSecondary font-bold rounded-xl shadow-lg hover:bg-hover transition-all">
              Apply Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {requests.map((req) => {
              const status = getStatusStyle(req.status);
              const StatusIcon = status.icon;
              
              return (
                <div key={req.id} className="group relative bg-background border border-borderPrimary rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary/10 group-hover:bg-primary transition-colors" />
                  
                  <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full ${status.bg} ${status.text} ${status.border} border text-[10px] font-black tracking-widest uppercase mb-1`}>
                          <StatusIcon className="w-3 h-3 mr-1.5" /> {req.status}
                        </span>
                        <div className="flex items-center text-textSecondary text-xs font-bold gap-1.5">
                           <Calendar className="w-3.5 h-3.5" />
                           {new Date(req.submittedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-hoverPrimary rounded-xl text-primary shrink-0">
                            <Package className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-textSecondary tracking-wider">Type</p>
                            <p className="text-lg font-bold text-textPrimary leading-none mt-1">{req.fertilizerType}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-hoverPrimary rounded-xl text-primary shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-textSecondary tracking-wider">Quantity</p>
                            <p className="text-lg font-bold text-textPrimary leading-none mt-1">{req.quantityRequested}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-hoverPrimary rounded-xl text-primary shrink-0">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-textSecondary tracking-wider">Area</p>
                            <p className="text-lg font-bold text-textPrimary leading-none mt-1">{req.landArea}</p>
                          </div>
                        </div>
                      </div>

                      {req.remarks && (
                        <div className="p-4 bg-hoverPrimary/50 rounded-2xl border border-borderPrimary/50 mt-4">
                          <p className="text-xs font-black text-textSecondary uppercase mb-1 flex items-center gap-1.5">
                            <AlertCircle className="w-3 h-3" /> Admin Remarks
                          </p>
                          <p className="text-sm font-medium text-textPrimary italic">{req.remarks}</p>
                        </div>
                      )}
                    </div>

                    <div className="lg:pl-8 lg:border-l border-borderPrimary flex items-center justify-between lg:justify-end gap-4 min-w-[140px]">
                      <div className="text-right flex-1 lg:flex-none">
                        <Link href={`/dashboard/farmer/fertilizer-requests/${req.id}`} className="group/btn flex items-center text-sm font-bold text-primary hover:text-hover transition-colors">
                          View Details <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
