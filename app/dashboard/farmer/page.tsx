import React from "react";

export default function FarmerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Farmer Dashboard 
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Welcome back! Here's what's happening on your farm today.
        </p>
      </div>

      

      {/* Content Placeholder */}
      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-slate-500">Farmer specific analytics and tools will appear here.</p>
      </div>
    </div>
  );
}
