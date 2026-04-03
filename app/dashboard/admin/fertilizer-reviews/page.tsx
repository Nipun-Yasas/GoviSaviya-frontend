"use client";

import React, { useEffect, useState } from "react";
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  Loader2,
  AlertCircle,
  MessageSquare,
  FileText,
  User,
  ExternalLink,
  MapPin,
  X
} from "lucide-react";
import axiosInstance from "../../../util/axiosInstance";
import { API_PATHS } from "../../../util/apiPaths";

interface FertilizerRequest {
  id: number;
  farmerName?: string;
  farmerEmail?: string;
  fertilizerType: string;
  quantityRequested: string;
  landArea: string;
  purpose: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  remarks?: string;
  documentUrls?: string[];
}

export default function AdminFertilizerReviewsPage() {
  const [requests, setRequests] = useState<FertilizerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  
  // Review Modal State
  const [selectedRequest, setSelectedRequest] = useState<FertilizerRequest | null>(null);
  const [reviewData, setReviewData] = useState({ status: "APPROVED", remarks: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchAllRequests = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.FERTILIZER.ADMIN.ALL);
      setRequests(response.data || []);
    } catch (err: any) {
      console.error("Failed to fetch all requests:", err);
      setError("Failed to load requests for review. Please check your admin privileges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    setSubmitting(true);
    try {
      const endpoint = API_PATHS.FERTILIZER.ADMIN.REVIEW(selectedRequest.id);
      await axiosInstance.patch(endpoint, reviewData);
      
      // Update local state and close modal
      setRequests(prev => prev.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: reviewData.status as any, remarks: reviewData.remarks } 
          : req
      ));
      setSelectedRequest(null);
      setReviewData({ status: "APPROVED", remarks: "" });
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update request.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.fertilizerType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.farmerName && req.farmerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (req.farmerEmail && req.farmerEmail.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === "ALL" || req.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: FertilizerRequest["status"]) => {
    switch (status) {
      case "APPROVED":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#39C400]/10 text-[#39C400] text-xs font-black uppercase border border-[#39C400]/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</span>;
      case "REJECTED":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-black uppercase border border-destructive/20"><XCircle className="w-3 h-3 mr-1" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-black uppercase border border-amber-500/20"><Clock className="w-3 h-3 mr-1" /> Pending</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
            <ClipboardCheck className="h-3.5 w-3.5 mr-1" /> Admin Portal
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
          Fertilizer Application Review
        </h1>
        <p className="text-textSecondary text-lg font-medium">
          Approve or reject fertilizer subsidy requests from farmers across the region.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by farmer name, email or type..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-backgroundSecondary border border-borderPrimary rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
           <Filter className="w-5 h-5 text-textSecondary mr-1" />
           <select 
             value={filterStatus}
             onChange={(e) => setFilterStatus(e.target.value)}
             className="bg-backgroundSecondary border border-borderPrimary rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm text-textPrimary"
           >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending Only</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
           </select>
        </div>
      </div>

      <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
             <Loader2 className="w-12 h-12 animate-spin text-primary/40 mb-4" />
             <p className="text-textSecondary font-bold uppercase tracking-widest text-xs">Fetching All Records...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <AlertCircle className="w-16 h-16 text-textSecondary/20 mb-4" />
             <p className="text-lg font-bold text-textSecondary">No applications found</p>
             <p className="text-sm text-textSecondary/60 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-hoverPrimary/30 border-b border-borderPrimary text-left">
                  <th className="px-6 py-4 text-xs font-black text-textSecondary uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-4 text-xs font-black text-textSecondary uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-xs font-black text-textSecondary uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-black text-textSecondary uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderPrimary">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-hoverPrimary/10 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                           <User className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="font-bold text-textPrimary">{req.farmerName || "Unknown Farmer"}</p>
                           <p className="text-xs text-textSecondary truncate max-w-[150px]">{req.farmerEmail || "No Email"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <p className="text-sm font-bold text-textPrimary">{req.fertilizerType} - {req.quantityRequested}</p>
                       <p className="text-xs text-textSecondary flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {req.landArea}</p>
                    </td>
                    <td className="px-6 py-5 text-center">
                       {getStatusBadge(req.status)}
                    </td>
                    <td className="px-6 py-5 text-right">
                       {req.status === "PENDING" ? (
                         <button 
                           onClick={() => setSelectedRequest(req)}
                           className="px-4 py-2 bg-primary text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                         >
                           Review Request
                         </button>
                       ) : (
                         <button 
                           onClick={() => setSelectedRequest(req)}
                           className="p-2 text-textSecondary hover:text-primary transition-colors"
                           title="View Details"
                         >
                           <ChevronRight className="w-5 h-5" />
                         </button>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] w-full max-w-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-borderPrimary flex items-center justify-between">
                 <h3 className="text-2xl font-bold text-textPrimary">
                   {selectedRequest.status === "PENDING" ? "Review Application" : "Application Details"}
                 </h3>
                 <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-hoverPrimary rounded-full transition-all">
                    <X className="w-6 h-6 text-textSecondary" />
                 </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto space-y-8 scrollbar-hide">
                 <div className="grid grid-cols-2 gap-6 p-6 bg-background rounded-3xl border border-borderPrimary">
                    <div>
                       <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-1">Farmer Name</p>
                       <p className="font-bold text-textPrimary">{selectedRequest.farmerName || "N/A"}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-1">Status</p>
                       {getStatusBadge(selectedRequest.status)}
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-1">Request Detail</p>
                       <p className="font-bold text-textPrimary">{selectedRequest.fertilizerType} ({selectedRequest.quantityRequested})</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-1">Land Area</p>
                       <p className="font-bold text-textPrimary">{selectedRequest.landArea}</p>
                    </div>
                    <div className="col-span-2">
                       <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest mb-1">Purpose</p>
                       <p className="text-sm font-medium text-textPrimary">{selectedRequest.purpose}</p>
                    </div>
                 </div>

                 {selectedRequest.documentUrls && selectedRequest.documentUrls.length > 0 && (
                   <div className="space-y-4">
                      <p className="text-xs font-black text-textSecondary uppercase tracking-widest flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" /> Attached Documents
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedRequest.documentUrls.map((url, i) => (
                           <a 
                             key={i} 
                             href={url} 
                             target="_blank" 
                             className="flex items-center justify-between p-3 bg-background border border-borderPrimary rounded-xl hover:border-primary/40 transition-all text-sm font-bold text-textPrimary"
                           >
                              <span className="truncate">Supplied Doc {i+1}</span>
                              <ExternalLink className="w-4 h-4 text-primary" />
                           </a>
                        ))}
                      </div>
                   </div>
                 )}

                 {selectedRequest.status === "PENDING" ? (
                   <form onSubmit={handleReview} className="space-y-6 pt-4 border-t border-borderPrimary">
                      <div className="space-y-3">
                         <label className="text-xs font-black text-textSecondary uppercase tracking-widest ml-1">Decision</label>
                         <div className="grid grid-cols-2 gap-4">
                            <button 
                              type="button" 
                              onClick={() => setReviewData(prev => ({ ...prev, status: "APPROVED" }))}
                              className={`py-3 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all ${reviewData.status === "APPROVED" ? "bg-[#39C400] border-[#39C400] text-white shadow-lg" : "bg-background border-borderPrimary text-textSecondary hover:border-primary/30"}`}
                            >
                               <CheckCircle2 className="w-4 h-4" /> Approve
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setReviewData(prev => ({ ...prev, status: "REJECTED" }))}
                              className={`py-3 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all ${reviewData.status === "REJECTED" ? "bg-destructive border-destructive text-white shadow-lg" : "bg-background border-borderPrimary text-textSecondary hover:border-primary/30"}`}
                            >
                               <XCircle className="w-4 h-4" /> Reject
                            </button>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-xs font-black text-textSecondary uppercase tracking-widest ml-1 flex items-center gap-2">
                           <MessageSquare className="w-4 h-4 text-primary" /> Official Remarks
                         </label>
                         <textarea 
                           required
                           value={reviewData.remarks}
                           onChange={(e) => setReviewData(prev => ({ ...prev, remarks: e.target.value }))}
                           placeholder="Enter collection code, eligibility notes, or rejection reason..."
                           className="w-full bg-background border border-borderPrimary rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-24"
                         />
                      </div>

                      <button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
                      >
                         {submitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Complete Review"}
                      </button>
                   </form>
                 ) : (
                   <div className="pt-6 border-t border-borderPrimary space-y-4">
                      <div className="p-6 bg-primary/5 rounded-3xl border border-primary/20">
                         <p className="text-xs font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                           <MessageSquare className="w-4 h-4" /> Final Remarks
                         </p>
                         <p className="text-sm font-medium text-textPrimary leading-relaxed italic">
                           "{selectedRequest.remarks || "No remarks provided."}"
                         </p>
                      </div>
                      <p className="text-center text-[10px] font-bold text-textSecondary uppercase tracking-widest">
                        Note: Processed applications cannot be modified.
                      </p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
