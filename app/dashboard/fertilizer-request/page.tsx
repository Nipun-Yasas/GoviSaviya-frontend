"use client";

import React, { useState, useRef } from "react";
import { 
  UploadCloud, 
  FileText, 
  ClipboardList, 
  CheckCircle,
  Loader2,
  X,
  Plus,
  Info,
  AlertTriangle,
  FileIcon,
  Package,
  MapPin,
  MessageSquare
} from "lucide-react";
import axiosInstance from "../../util/axiosInstance";
import { API_PATHS } from "../../util/apiPaths";

export default function FertilizerRequestPage() {
  const [formData, setFormData] = useState({
    fertilizerType: "Urea",
    quantityRequested: "",
    landArea: "",
    purpose: ""
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setError(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setError("Please upload at least one supporting document (e.g. Deed, NIC).");
      return;
    }

    setLoading(true);
    setError(null);

    const submissionData = new FormData();
    submissionData.append('fertilizerType', formData.fertilizerType);
    submissionData.append('quantityRequested', formData.quantityRequested);
    submissionData.append('landArea', formData.landArea);
    submissionData.append('purpose', formData.purpose);
    
    files.forEach(file => {
      submissionData.append('documents', file);
    });

    try {
      await axiosInstance.post(API_PATHS.FERTILIZER.SUBMIT, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess(true);
      // Reset form
      setFormData({
        fertilizerType: "Urea",
        quantityRequested: "",
        landArea: "",
        purpose: ""
      });
      setFiles([]);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-textPrimary mb-2 text-center">Request Submitted Successfully!</h1>
        <p className="text-textSecondary text-lg mb-8 text-center max-w-md">
          Your fertilizer request has been received and is currently being processed. You can track the status in your dashboard.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="px-8 py-3 bg-primary text-backgroundSecondary font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
            <ClipboardList className="h-3.5 w-3.5 mr-1" /> Subsidy Program
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
          Fertilizer Request
        </h1>
        <p className="text-textSecondary text-lg font-medium">
          Apply for subsidized fertilizer for your cultivation. Please provide accurate details and supporting documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] p-8 sm:p-10 shadow-sm space-y-8">
            {error && (
              <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-start gap-3 animate-in slide-in-from-top-2">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-destructive font-medium text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-textPrimary flex items-center gap-2 ml-1">
                  <Package className="w-4 h-4 text-primary" /> Fertilizer Type
                </label>
                <select 
                  name="fertilizerType"
                  value={formData.fertilizerType}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-borderPrimary rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-textPrimary"
                >
                  <option value="Urea">Urea</option>
                  <option value="TSP">TSP (Triple Super Phosphate)</option>
                  <option value="MOP">MOP (Muriate of Potash)</option>
                  <option value="Organic">Organic Fertilizer</option>
                  <option value="Compost">Compost</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-textPrimary flex items-center gap-2 ml-1">
                  <FileText className="w-4 h-4 text-primary" /> Quantity Requested
                </label>
                <input 
                  type="text"
                  name="quantityRequested"
                  placeholder="e.g. 100 kg"
                  value={formData.quantityRequested}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-borderPrimary rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-textPrimary placeholder:text-textSecondary/40"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-textPrimary flex items-center gap-2 ml-1">
                  <MapPin className="w-4 h-4 text-primary" /> Land Area
                </label>
                <input 
                  type="text"
                  name="landArea"
                  placeholder="e.g. 2.5 Acres"
                  value={formData.landArea}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background border border-borderPrimary rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-textPrimary placeholder:text-textSecondary/40"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-textPrimary flex items-center gap-2 ml-1">
                  <MessageSquare className="w-4 h-4 text-primary" /> Purpose for Request
                </label>
                <textarea 
                  name="purpose"
                  placeholder="Describe your cultivation and why you need this fertilizer..."
                  value={formData.purpose}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full bg-background border border-borderPrimary rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-textPrimary placeholder:text-textSecondary/40 resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-textPrimary flex items-center gap-2 ml-1">
                <UploadCloud className="w-4 h-4 text-primary" /> Supporting Documents
              </label>
              
              <div 
                className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer
                  ${isHovering ? 'border-primary bg-primary/5' : 'border-borderPrimary bg-background hover:border-primary/50'}
                `}
                onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
                onDragLeave={() => setIsHovering(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsHovering(false);
                  if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                />
                <div className="w-12 h-12 bg-hoverPrimary text-primary rounded-full flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-textPrimary font-bold">Upload Documents</p>
                <p className="text-textSecondary text-xs mt-1">Upload NIC, Land Deed, and other proofs (PDF, JPG, PNG)</p>
              </div>

              {files.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-background border border-borderPrimary rounded-xl group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="shrink-0 p-2 bg-primary/10 text-primary rounded-lg">
                          <FileIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-textPrimary truncate">{file.name}</p>
                          <p className="text-[10px] text-textSecondary uppercase font-black">{(file.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                        className="p-1 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-backgroundSecondary font-black text-lg rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                </div>
              ) : "Submit Request"}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-xl font-bold text-textPrimary mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" /> Required Documents
            </h3>
            <ul className="space-y-4">
              {[
                "National Identity Card (NIC) Scan",
                "Certified Copy of Land Deed",
                "Grama Niladhari Certificate",
                "Details of Previous Cultivation"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-textSecondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <CheckCircle className="w-6 h-6" />
              <h3 className="font-bold text-lg">Terms & Conditions</h3>
            </div>
            <p className="text-sm font-medium text-textSecondary leading-relaxed">
              By submitting this request, you certify that the information provided is true and accurate. Subsidized fertilizer is strictly for personal cultivation and cannot be resold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
