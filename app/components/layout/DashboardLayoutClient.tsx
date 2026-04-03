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

  // Derive role accurately
  const [role, setRole] = useState<UserRole>("farmer");

  React.useEffect(() => {
    const savedRoles = localStorage.getItem('userRoles');
    if (savedRoles) {
      try {
        const roles = JSON.parse(savedRoles);
        if (roles.includes('ADMIN')) setRole("admin");
        else if (roles.includes('BUYER')) setRole("buyer");
        else if (roles.includes('DELIVERY')) setRole("delivery");
        else if (roles.includes('FARMER')) setRole("farmer");
      } catch (e) {}
    } else {
      // Fallback to URL if localStorage is empty
      if (pathname.includes("/dashboard/admin")) setRole("admin");
      else if (pathname.includes("/dashboard/buyer")) setRole("buyer");
      else if (pathname.includes("/dashboard/farmer")) setRole("farmer");
      else if (pathname.includes("/dashboard/delivery")) setRole("delivery");
    }
  }, [pathname]);



  return (
    <div className="flex min-h-screen bg-[var(--background)] font-sans text-textPrimary">
      <Sidebar 
        role={role}
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pt-6 transition-all duration-300 sm:p-6 lg:p-8 bg-transparent">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
