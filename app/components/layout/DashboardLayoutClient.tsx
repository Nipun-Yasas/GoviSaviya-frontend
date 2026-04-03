"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar, { UserRole } from "./Sidebar";
import Navbar from "./Navbar";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Derive role accurately
  const [role, setRole] = useState<UserRole | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  React.useEffect(() => {
    const checkAuthAndRole = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const savedRoles = localStorage.getItem('userRoles');
      let currentRole: UserRole | null = null;

      if (savedRoles) {
        try {
          const roles = JSON.parse(savedRoles);
          if (roles.includes('ADMIN')) currentRole = "admin";
          else if (roles.includes('BUYER')) currentRole = "buyer";
          else if (roles.includes('DELIVERY')) currentRole = "delivery";
          else if (roles.includes('FARMER')) currentRole = "farmer";
        } catch (e) {}
      }

      if (!currentRole) {
        // No valid role found - clear token and redirect to login
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      setRole(currentRole);

      // Path protection: Ensure user is only in their dashboard area
      // Shared paths allow all logged in users
      const sharedPaths = ["/dashboard/settings"]; 
      const isSharedPath = sharedPaths.includes(pathname);

      if (pathname === "/dashboard") {
        router.push(`/dashboard/${currentRole}`);
        return;
      }

      if (!isSharedPath) {
        const pathPrefix = `/dashboard/${currentRole}`;
        if (!pathname.startsWith(pathPrefix)) {
          // Redirect to their own dashboard home if they try to access another role's dashboard
          router.push(pathPrefix);
          return;
        }
      }

      setIsAuthorized(true);
    };

    checkAuthAndRole();
  }, [pathname, router]);

  if (!role || !isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
