"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  UploadCloud, 
  Camera, 
  Image as ImageIcon, 
  Bug, 
  ShieldAlert, 
  CheckCircle,
  Clock,
  History,
  Info,
  Loader2,
  X,
  Leaf,
  AlertTriangle,
  ChevronRight,
  Download
} from "lucide-react";
import axiosInstance from "../../util/axiosInstance";
import { API_PATHS } from "../../util/apiPaths";

export default function DiseaseDetectionPage() {
  const [isHovering, setIsHovering] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [historyDocs, setHistoryDocs] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = () => {
    const originalTitle = document.title;
    const timestamp = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').slice(0, 19);
    document.title = `GoviSaviya_Report_${timestamp}`;
    window.print();
    document.title = originalTitle;
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(f => f.type === 'image/jpeg' || f.type === 'image/png');
    
    if (validFiles.length !== newFiles.length) {
      setError("Only JPEG and PNG images are allowed.");
    }

    setFiles(prev => {
      const combined = [...prev, ...validFiles];
      if (combined.length > 5) {
        setError("Maximum 5 images allowed.");
        return combined.slice(0, 5);
      }
      if (validFiles.length === newFiles.length) {
         setError(null);
      }
      return combined;
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    if (files.length <= 1) {
      setResult(null); // Clear result if last file removed
    }
  };

  const clearAll = () => {
    setFiles([]);
    setResult(null);
    setError(null);
  };

  const handleIdentify = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axiosInstance.post(API_PATHS.DISEASE.IDENTIFY, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
      // Let's refetch history after a successful upload
      try {
         const histResponse = await axiosInstance.get(API_PATHS.DISEASE.HISTORY);
         setHistoryDocs(histResponse.data || []);
      } catch (e) {}
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to identify disease.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="space-y-8 animate-in fade-in duration-500 pb-12 print:hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <Bug className="h-3.5 w-3.5 mr-1" /> AI Vision
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
            Disease Detection
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Upload an image of your crop's leaf, and our AI will identify potential diseases and suggest immediate treatments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
        {/* Upload and Results Zone */}
        <div className="lg:col-span-2 flex flex-col gap-6 print:block print:w-full">
          
          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-destructive font-medium text-sm">{error}</p>
            </div>
          )}

          {!result ? (
            <>
              {/* Dropzone */}
              <div 
                className={`relative flex flex-col items-center justify-center p-10 sm:p-14 transition-all duration-300 rounded-[2rem] border-2 border-dashed shadow-sm
                  ${isHovering ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-borderPrimary bg-backgroundSecondary hover:border-primary/50 hover:bg-hoverPrimary/30'}
                `}
                onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
                onDragLeave={() => setIsHovering(false)}
                onDrop={handleDrop}
              >
                <div className={`p-5 rounded-full mb-6 transition-colors duration-300 ${isHovering ? 'bg-primary text-backgroundSecondary shadow-lg shadow-primary/25' : 'bg-hoverPrimary text-primary border border-primary/10'}`}>
                  <UploadCloud className="h-10 w-10" />
                </div>
                
                <h3 className="text-2xl font-bold text-textPrimary mb-2">Upload Crop Images</h3>
                <p className="text-textSecondary font-medium mb-8 text-center max-w-sm">
                  Drag and drop up to 5 images (JPEG or PNG) of the affected leaf here.
                </p>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  multiple 
                  accept="image/jpeg, image/png"
                />
                <input 
                  type="file" 
                  ref={cameraInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  multiple 
                  accept="image/jpeg, image/png"
                  capture="environment"
                />

                <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-xl bg-primary text-backgroundSecondary font-bold shadow-md hover:shadow-xl hover:bg-hover hover:-translate-y-0.5 transition-all flex items-center border border-primary relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl"></span>
                    <ImageIcon className="h-5 w-5 mr-2 relative z-10" />
                    <span className="relative z-10">Browse Files</span>
                  </button>

                  <button 
                    onClick={() => cameraInputRef.current?.click()}
                    className="md:hidden px-6 py-3 rounded-xl bg-backgroundSecondary border-2 border-borderPrimary text-textPrimary font-bold shadow-sm hover:border-primary/40 hover:bg-hoverPrimary transition-all flex items-center"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Use Camera
                  </button>
                </div>
                
                <p className="mt-8 text-xs font-semibold text-textSecondary uppercase tracking-widest">
                  Supports: JPG, PNG • Max 5 Images
                </p>
              </div>

              {/* Selected Files Preview */}
              {files.length > 0 && (
                <div className="rounded-[2rem] border border-borderPrimary bg-backgroundSecondary p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-textPrimary">Selected Images ({files.length}/5)</h3>
                    <button onClick={clearAll} className="text-sm font-semibold text-textSecondary hover:text-destructive transition-colors">
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                    {files.map((file, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-borderPrimary bg-hoverPrimary">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="preview" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <button 
                          onClick={() => removeFile(idx)}
                          className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-destructive text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleIdentify}
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-primary text-backgroundSecondary font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" /> Analyzing Images...
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-6 w-6" /> Identify Disease
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Results View */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500 print:space-y-8">
              
              <div className="flex items-center justify-between print:hidden">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#39C400]">
                  Analysis Complete
                </h2>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-lg bg-primary text-backgroundSecondary text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" /> Save PDF
                  </button>
                  <button 
                    onClick={clearAll}
                    className="px-4 py-2 rounded-lg border border-borderPrimary text-sm font-bold text-textSecondary hover:bg-hoverPrimary transition-colors flex items-center"
                  >
                    <Camera className="h-4 w-4 mr-2" /> Scan Another
                  </button>
                </div>
              </div>

              {/* Print-only Header */}
              <div className="hidden print:block mb-8 border-b-2 border-primary/20 pb-4">
                <h1 className="text-4xl font-black text-black">Crop Disease Analysis Report</h1>
                <p className="text-gray-600 mt-2 text-lg">AI Generated Diagnostic Protocol - GoviSaviya</p>
                <p className="text-gray-400 mt-1 text-sm font-medium">Date: {new Date().toLocaleDateString()}</p>
              </div>

              {/* Top Matches section */}
              <div className="rounded-[2rem] border border-borderPrimary bg-backgroundSecondary shadow-lg overflow-hidden print:shadow-none print:border-gray-200 print:rounded-xl">
                <div className="p-6 border-b border-borderPrimary bg-gradient-to-br from-backgroundSecondary to-primary/5 print:bg-white print:border-gray-200">
                  <h3 className="font-bold text-lg text-textPrimary flex items-center gap-2 mb-4 print:text-black">
                    <Bug className="h-5 w-5 text-primary print:text-black" /> Potential Pathogens
                  </h3>
                  
                  <div className="space-y-3">
                    {result.result?.results?.map((res: any, idx: number) => (
                      <div key={idx} className={`p-4 rounded-2xl flex items-center justify-between border ${idx === 0 ? 'bg-primary/10 border-primary/30 shadow-inner print:bg-gray-100 print:border-gray-300' : 'bg-background hover:bg-hoverPrimary border-borderPrimary/50 print:bg-white print:border-gray-200'} transition-all print:rounded-lg`}>
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black ${idx === 0 ? 'bg-primary text-primary-foreground print:bg-black print:text-white' : 'bg-hoverPrimary text-textSecondary print:bg-gray-200 print:text-black'}`}>
                            #{idx + 1}
                          </div>
                          <div>
                            <h4 className={`font-bold text-base md:text-lg ${idx === 0 ? 'text-primary' : 'text-textPrimary'}`}>
                              {res.description.split('-')[0].trim()}
                            </h4>
                            {res.description.includes('-') && (
                              <p className="text-xs md:text-sm font-medium text-textSecondary">
                                {res.description.split('-').slice(1).join('-').trim()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-black ${idx === 0 ? 'text-primary' : 'text-textPrimary'}`}>
                            {(res.score * 100).toFixed(1)}%
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-textSecondary">Match</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Solution Section */}
              {result.solution && (
                <div className="rounded-[2rem] border-2 border-[#39C400]/20 bg-gradient-to-br from-[#39C400]/10 to-transparent shadow-lg overflow-hidden relative print:border-gray-300 print:bg-white print:shadow-none print:bg-none print:rounded-xl">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none print:hidden">
                    <Leaf className="w-32 h-32" />
                  </div>
                  <div className="p-6 md:p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-[#39C400] text-white rounded-2xl shadow-md">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-textPrimary">Treatment Protocol</h3>
                        <p className="text-sm font-medium text-[#39C400]">AI Generated Action Plan</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:text-textSecondary prose-headings:text-textPrimary prose-strong:text-textPrimary prose-strong:font-bold prose-ul:text-textSecondary"
                         dangerouslySetInnerHTML={{
                           __html: formatMarkdownToHTML(result.solution)
                         }}
                    />
                  </div>
                </div>
              )}

            </div>
          )}

          {/* AI Tips Section (Only visible when not showing results) */}
          {!result && (
            <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary p-6 sm:p-8 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-hoverPrimary text-primary rounded-2xl shrink-0 border border-primary/10">
                <Info className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-textPrimary text-lg">For Best Results</h3>
                <ul className="mt-2 space-y-2 text-sm text-textSecondary font-medium">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary shrink-0" /> Ensure the leaf is well-lit and in focus.</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary shrink-0" /> Keep a plain background if possible to avoid confusion.</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-primary shrink-0" /> Show the most affected area clearly.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar / Recent Scans */}
        <div className="rounded-[2rem] border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 sm:p-8 flex flex-col h-full print:hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-textPrimary">Recent Scans</h2>
          </div>
          
          <div className="flex-1 space-y-4">
            {loadingHistory ? (
              <div className="flex flex-col items-center justify-center py-12 text-textSecondary">
                <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary/50" />
                <span className="text-sm font-bold tracking-wide uppercase">Connecting...</span>
              </div>
            ) : historyDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-borderPrimary rounded-3xl bg-backgroundSecondary">
                <p className="text-sm font-bold text-textSecondary text-center">No previous scans found</p>
                <p className="text-xs font-medium text-textSecondary/60 text-center mt-1">Upload a crop image to start tracking.</p>
              </div>
            ) : (
              historyDocs.map((scan: any, i: number) => (
                <div key={i} className="group border border-borderPrimary rounded-2xl p-3 sm:p-4 hover:border-primary/40 hover:bg-hoverPrimary/40 transition-all duration-300 flex items-start gap-3 sm:gap-4">
                  {scan.imageUrls && scan.imageUrls.length > 0 ? (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden bg-background border border-borderPrimary group-hover:border-primary/30 relative">
                      <img src={scan.imageUrls[0]} alt="Scan" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl bg-hoverPrimary flex items-center justify-center border border-borderPrimary group-hover:border-primary/30">
                      <ImageIcon className="h-6 w-6 text-textSecondary opacity-50" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                    <h4 className="font-bold text-textPrimary text-sm sm:text-base truncate">{scan.diseaseName ? scan.diseaseName.split(' - ')[0] : 'Unknown'}</h4>
                    {scan.diseaseName && scan.diseaseName.includes(' - ') && (
                       <p className="text-xs sm:text-sm font-medium text-textSecondary truncate">
                         {scan.diseaseName.split(' - ').slice(1).join(' - ')}
                       </p>
                    )}
                    <div className="mt-2 flex items-center">
                       <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-background border border-borderPrimary text-[10px] sm:text-xs font-bold text-textSecondary gap-1">
                         <History className="h-3 w-3" /> Historic Scan
                       </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <Link href="/dashboard/disease-history" className="w-full mt-6 py-3.5 rounded-xl border border-borderPrimary text-sm font-bold text-textSecondary hover:bg-hoverPrimary hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center">
            View Diagnosis History
          </Link>
        </div>
      </div>
    </div>

      {result && (
        <div className="hidden print:block w-full text-black bg-white p-12 sm:p-16">
          <div className="mb-10 text-left">
            <h1 className="text-3xl font-black mb-1">Crop Disease Analysis Report</h1>
            <p className="text-lg text-gray-700">AI Generated Diagnostic - GoviSaviya</p>
            <p className="text-black mt-1 font-bold">Date: {new Date().toLocaleDateString()}</p>
          </div>

          <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Potential Pathogens</h2>
          <div className="space-y-2 mb-8">
            {result.result?.results?.map((res: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-300">
                <span className="font-bold text-base">{res.description}</span>
                <span className="font-bold text-base">{(res.score * 100).toFixed(1)}% Match</span>
              </div>
            ))}
          </div>

          <div style={{ pageBreakBefore: 'always' }} className="break-before-page"></div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Treatment Protocol</h2>
            <div 
              className="prose max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black prose-ul:text-black"
              dangerouslySetInnerHTML={{ __html: formatMarkdownToHTML(result.solution) }}
            />
          </div>
        </div>
      )}
    </>
  );
}

// Simple markdown formatter to handle the Gemini solution properly
function formatMarkdownToHTML(markdown: string) {
  if (!markdown) return '';
  let html = markdown;
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Lists
  html = html.replace(/^\d+\.\s+(.*?)$/gm, '<li>$1</li>');
  
  // Wrap consecutive lists with ol
  html = html.replace(/(<li>.*<\/li>(\n<li>.*<\/li>)*)/g, '<ol class="list-decimal pl-5 space-y-2 my-4">$1</ol>');
  
  // Paragraphs (double newlines)
  html = html.replace(/\n\n/g, '<br/><br/>');
  
  return html;
}
