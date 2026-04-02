"use client";

import React, { useState } from "react";
import { 
  UploadCloud, 
  Camera, 
  Image as ImageIcon, 
  Bug, 
  ShieldAlert, 
  CheckCircle,
  Clock,
  History,
  Info
} from "lucide-react";

export default function DiseaseDetectionPage() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Zone */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div 
            className={`relative flex flex-col items-center justify-center p-12 transition-all duration-300 rounded-3xl border-2 border-dashed bg-backgroundSecondary shadow-sm
              ${isHovering ? 'border-primary bg-hoverPrimary scale-[1.01]' : 'border-borderPrimary hover:border-primary/50 hover:bg-hoverPrimary/30'}`}
            onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
            onDragLeave={() => setIsHovering(false)}
            onDrop={(e) => { e.preventDefault(); setIsHovering(false); }}
          >
            <div className={`p-5 rounded-full mb-6 transition-colors duration-300 ${isHovering ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-hoverPrimary text-primary border border-primary/10'}`}>
              <UploadCloud className="h-10 w-10" />
            </div>
            
            <h3 className="text-2xl font-bold text-textPrimary mb-2">Upload Crop Image</h3>
            <p className="text-textSecondary font-medium mb-8 text-center max-w-sm">
              Drag and drop an image of the affected leaf here, or click to browse files.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-md hover:shadow-xl hover:bg-hover hover:-translate-y-0.5 transition-all flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Browse Files
              </button>
              <button className="px-6 py-3 rounded-xl bg-backgroundSecondary border-2 border-borderPrimary text-textPrimary font-bold shadow-sm hover:border-primary/40 hover:bg-hoverPrimary transition-all flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Use Camera
              </button>
            </div>
            
            <p className="mt-8 text-xs font-semibold text-textSecondary uppercase tracking-widest">
              Supports: JPG, PNG, WEBP • Max Size: 10MB
            </p>
          </div>

          {/* AI Tips Section */}
          <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary p-6 sm:p-8 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0 border border-blue-100 dark:border-blue-800">
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
        </div>

        {/* Recent Scans Side Panel */}
        <div className="rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm p-6 sm:p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-textPrimary">Recent Scans</h2>
            <div className="p-2 bg-hoverPrimary text-primary rounded-xl">
              <History className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            {[
              {
                crop: "Tomato Plant",
                date: "Today, 10:42 AM",
                status: "action",
                diagnosis: "Late Blight",
                confidence: "94%"
              },
              {
                crop: "Carrot Fields",
                date: "Yesterday, 3:15 PM",
                status: "healthy",
                diagnosis: "Healthy",
                confidence: "98%"
              },
              {
                crop: "Chili Plant",
                date: "Mon, 1:20 PM",
                status: "warning",
                diagnosis: "Leaf Curl",
                confidence: "87%"
              }
            ].map((scan, i) => (
              <div key={i} className="group border border-borderPrimary rounded-2xl p-4 hover:border-primary/40 hover:bg-hoverPrimary/40 transition-all duration-300 cursor-pointer flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-textPrimary">{scan.crop}</h4>
                    <span className="text-xs font-medium text-textSecondary flex items-center mt-0.5">
                      <Clock className="h-3 w-3 mr-1" /> {scan.date}
                    </span>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    scan.status === 'healthy' ? 'bg-primary/10 text-primary border border-primary/20' : 
                    scan.status === 'warning' ? 'bg-orange-50 text-orange-600 border border-orange-200' : 
                    'bg-red-50 text-red-600 border border-red-200'
                  }`}>
                    {scan.status === 'healthy' ? <CheckCircle className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
                  </div>
                </div>
                
                <div className="bg-background px-3 py-2 rounded-xl flex items-center justify-between border border-borderPrimary/50">
                  <span className={`text-sm font-bold ${
                    scan.status === 'healthy' ? 'text-primary' : 
                    scan.status === 'warning' ? 'text-orange-600' : 
                    'text-red-500'
                  }`}>
                    {scan.diagnosis}
                  </span>
                  <span className="text-xs font-bold text-textSecondary">
                    {scan.confidence} Match
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3.5 rounded-xl border border-borderPrimary text-sm font-bold text-textSecondary hover:bg-hoverPrimary hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center">
            View Diagnosis History
          </button>
        </div>
      </div>
    </div>
  );
}
