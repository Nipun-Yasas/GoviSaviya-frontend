import React from "react";

export default function BuyerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Buyer Dashboard 
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Find the best produce directly from farmers.
        </p>
      </div>

      

      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-slate-500">Buyer marketplace activities and orders will appear here.</p>
      </div>
    </div>
  );
}
