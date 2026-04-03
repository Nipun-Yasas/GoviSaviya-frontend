"use client";

import React, { useEffect, useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Package, 
  MapPin, 
  MessageSquare, 
  FileIcon, 
  ExternalLink,
  Loader2,
  Calendar,
  Layers,
  FileText
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axiosInstance from "../../../../util/axiosInstance";
import { API_PATHS } from "../../../../util/apiPaths";

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

export default function RequestDetailsPage() {
  const { id } = useParams();
  const [request, setRequest] = useState<FertilizerRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        // Use the function from API_PATHS to get the correct URL
        const endpoint = typeof API_PATHS.FERTILIZER.GET_DETAILS === 'function'
            ? API_PATHS.FERTILIZER.GET_DETAILS(id as string)
            : `${API_PATHS.FERTILIZER.SUBMIT}/${id}`; // fallback if function undefined

        const response = await axiosInstance.get(endpoint);
        setRequest(response.data);
      } catch (err: any) {
        console.error("Failed to fetch request details:", err);
        setError("Could not load application details. It may not exist or you don't have access.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const getStatusStyle = (status: FertilizerRequest["status"]) => {
    switch (status) {
      case "APPROVED":
        return {
          bg: "bg-[#39C400]/10",
          text: "text-[#39C400]",
          border: "border-[#39C400]/20",
          label: "Approved",
          icon: CheckCircle2
        };
      case "REJECTED":
        return {
          bg: "bg-destructive/10",
          text: "text-destructive",
          border: "border-destructive/20",
          label: "Rejected",
          icon: XCircle
        };
      default:
        return {
          bg: "bg-amber-500/10",
          text: "text-amber-600",
          border: "border-amber-500/20",
          label: "Pending Review",
          icon: Clock
        };
    }
  };

  const isImage = (url: string) => {
    const images = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const ext = url.split('.').pop()?.toLowerCase() || '';
    return images.includes(ext);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-textSecondary font-bold animate-pulse uppercase tracking-widest text-sm">Verifying Record...</p>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
          <XCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-textPrimary mb-2">Something went wrong</h2>
        <p className="text-textSecondary mb-8 max-w-md">{error || "The requested application could not be found."}</p>
        <Link href="/dashboard/farmer/fertilizer-requests" className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to History
        </Link>
      </div>
    );
  }

  const statusStyle = getStatusStyle(request.status);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="max-w-5xl">
        <Link href="/dashboard/farmer/fertilizer-requests" className="inline-flex items-center text-sm font-bold text-textSecondary hover:text-primary transition-colors mb-4 group">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back to History
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary">Application Details</h1>
            <p className="text-textSecondary font-medium">Order ID: #FERT-{request.id.toString().padStart(5, '0')}</p>
          </div>
          <span className={`inline-flex items-center px-4 py-2 rounded-2xl ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border-2 text-sm font-black tracking-widest uppercase`}>
            <StatusIcon className="w-4 h-4 mr-2" /> {statusStyle.label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] p-8 sm:p-10 shadow-sm">
            <h3 className="text-xl font-bold text-textPrimary mb-8 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" /> Application Overview
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-1">
                <p className="text-xs font-black text-textSecondary uppercase tracking-widest flex items-center gap-2">
                  <Package className="w-3.5 h-3.5" /> Fertilizer Type
                </p>
                <p className="text-xl font-bold text-textPrimary">{request.fertilizerType}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-black text-textSecondary uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Requested Quantity
                </p>
                <p className="text-xl font-bold text-textPrimary">{request.quantityRequested}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-black text-textSecondary uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Cultivation Land Area
                </p>
                <p className="text-xl font-bold text-textPrimary">{request.landArea}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-black text-textSecondary uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Submitted On
                </p>
                <p className="text-xl font-bold text-textPrimary">
                   {new Date(request.submittedAt).toLocaleDateString(undefined, { 
                     year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                   })}
                </p>
              </div>

              <div className="md:col-span-2 space-y-3 p-6 bg-background rounded-3xl border border-borderPrimary">
                <p className="text-xs font-black text-textSecondary uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> Purpose of Request
                </p>
                <p className="text-base font-medium text-textPrimary leading-relaxed">
                  {request.purpose}
                </p>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] p-8 sm:p-10 shadow-sm">
            <h3 className="text-xl font-bold text-textPrimary mb-6 flex items-center gap-2">
              <FileIcon className="w-5 h-5 text-primary" /> Supporting Documents
            </h3>
            
            {!request.documentUrls || request.documentUrls.length === 0 ? (
               <div className="p-8 border-2 border-dashed border-borderPrimary rounded-3xl bg-background flex flex-col items-center justify-center">
                  <p className="text-textSecondary font-bold opacity-40">No documents attached</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {request.documentUrls.map((url, i) => (
                   <div key={i} className="group relative flex flex-col bg-background border border-borderPrimary rounded-3xl overflow-hidden hover:border-primary/40 transition-all shadow-sm">
                      {isImage(url) ? (
                        <div className="aspect-video bg-hoverPrimary overflow-hidden">
                           <img src={url} alt={`Document ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-hoverPrimary flex items-center justify-center flex-col gap-2">
                           <FileIcon className="w-10 h-10 text-primary opacity-20" />
                           <span className="text-xs font-bold text-textSecondary uppercase">File Document</span>
                        </div>
                      )}
                      
                      <div className="p-4 flex items-center justify-between border-t border-borderPrimary">
                        <span className="text-sm font-bold text-textPrimary truncate max-w-[150px]">
                           {url.split('/').pop() || `Document ${i+1}`}
                        </span>
                        <a 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-inner"
                        >
                           <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                   </div>
                 ))}
               </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2rem] p-8 shadow-sm">
             <h3 className="font-bold text-lg text-textPrimary mb-4">Submission Status</h3>
             <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="relative">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative ${request.status === 'PENDING' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-primary text-white shadow-lg shadow-primary/30'}`}>
                          <CheckCircle2 className="w-5 h-5" />
                       </div>
                       <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-borderPrimary ${request.status !== 'PENDING' ? 'bg-primary' : ''}`} />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-black text-textPrimary uppercase">Request Submitted</p>
                       <p className="text-xs font-medium text-textSecondary">Your application has been received.</p>
                       <p className="text-[10px] text-textSecondary mt-1 font-bold">{new Date(request.submittedAt).toLocaleDateString()}</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="relative">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative ${request.status === 'PENDING' ? 'bg-hoverPrimary text-textSecondary' : request.status === 'APPROVED' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-destructive text-white shadow-lg shadow-destructive/30'}`}>
                          {request.status === 'PENDING' ? <Clock className="w-5 h-5" /> : request.status === 'APPROVED' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                       </div>
                    </div>
                    <div className="flex-1">
                       <p className={`text-sm font-black uppercase ${request.status === 'PENDING' ? 'text-textSecondary opacity-50' : 'text-textPrimary'}`}>Review Result</p>
                       <p className="text-xs font-medium text-textSecondary">
                          {request.status === 'PENDING' ? 'Currently under evaluation by officials.' : `The application was ${request.status === 'APPROVED' ? 'Approved' : 'Rejected'}.`}
                       </p>
                    </div>
                 </div>
             </div>
          </div>

          {request.remarks && (
            <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8">
               <div className="flex items-center gap-3 mb-4 text-primary">
                 <MessageSquare className="w-5 h-5" />
                 <h3 className="font-bold text-lg">Official Remarks</h3>
               </div>
               <p className="text-sm font-medium text-textPrimary italic leading-relaxed">
                 "{request.remarks}"
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
