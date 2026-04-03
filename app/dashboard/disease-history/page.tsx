"use client";

import React, { useEffect, useState } from "react";
import { History, Bug, ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import axiosInstance from "../../util/axiosInstance";
import { API_PATHS } from "../../util/apiPaths";

export default function DiseaseHistoryPage() {
  const [historyDocs, setHistoryDocs] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.DISEASE.HISTORY);
        setHistoryDocs(response.data || []);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Link href="/dashboard/disease-detection" className="inline-flex items-center text-sm font-bold text-textSecondary hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Scanner
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <History className="h-3.5 w-3.5 mr-1" /> Archive
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
            Diagnosis History
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Review your past crop scans and AI interpretations.
          </p>
        </div>
      </div>

      <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2rem] p-6 sm:p-8 shadow-sm">
        {loadingHistory ? (
           <div className="flex flex-col items-center justify-center py-24 text-textSecondary">
             <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary/50" />
             <span className="text-sm font-bold tracking-wide uppercase">Fetching Records...</span>
           </div>
        ) : historyDocs.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-borderPrimary rounded-3xl bg-background">
             <p className="text-lg font-bold text-textSecondary text-center">No previous scans found</p>
             <p className="text-sm font-medium text-textSecondary/60 text-center mt-2">Upload a crop image from the scanner to start tracking.</p>
             <Link href="/dashboard/disease-detection" className="mt-6 px-6 py-3 rounded-xl bg-primary text-backgroundSecondary font-bold shadow-md hover:bg-hover hover:-translate-y-0.5 transition-all">
                Scan Now
             </Link>
           </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {historyDocs.map((scan: any, i: number) => (
                <div key={i} className="group flex flex-col border border-borderPrimary rounded-2xl overflow-hidden bg-background hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                  <div className="aspect-[4/3] bg-hoverPrimary relative overflow-hidden flex items-center justify-center">
                    {scan.imageUrls && scan.imageUrls.length > 0 ? (
                      <img src={scan.imageUrls[0]} alt="Scan" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <ImageIcon className="h-10 w-10 text-textSecondary/30" />
                    )}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg break-words text-white text-xs font-bold shadow-md flex items-center">
                      <Bug className="w-3 h-3 mr-1.5 text-primary" />
                      Detected Disease
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-textPrimary text-lg mb-1">{scan.diseaseName ? scan.diseaseName.split(' - ')[0] : 'Unknown'}</h4>
                    {scan.diseaseName && scan.diseaseName.includes(' - ') && (
                       <p className="text-sm font-medium text-textSecondary">
                         {scan.diseaseName.split(' - ').slice(1).join(' - ')}
                       </p>
                    )}
                  </div>
                </div>
             ))}
           </div>
        )}
      </div>
    </div>
  );
}
