"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar, { UserRole } from "./Sidebar";
import Navbar from "./Navbar";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Derive role from the URL path
  let role: UserRole = "farmer"; // Default
  if (pathname.includes("/dashboard/admin")) role = "admin";
  else if (pathname.includes("/dashboard/buyer")) role = "buyer";
  else if (pathname.includes("/dashboard/farmer")) role = "farmer";

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar 
        role={role}
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50/50 p-4 pt-6 transition-all duration-300 dark:bg-slate-950/50 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
