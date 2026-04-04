import React from "react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Admin Control Center 
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Managing users, monitoring transactions, and reporting.
        </p>
      </div>

      

      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-slate-500">Administrative tools and system overviews will appear here.</p>
      </div>
    </div>
  );
}
