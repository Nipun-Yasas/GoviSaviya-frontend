"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Bug, 
  CloudSun, 
  BarChart3, 
  ShoppingCart, 
  Bot, 
  Settings,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

export type UserRole = "farmer" | "buyer" | "admin";

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const allLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["farmer", "buyer", "admin"] },
    { name: "Disease Detection", href: "/dashboard/disease-detection", icon: Bug, roles: ["farmer"] }, // Removed 🌿
    { name: "Weather", href: "/dashboard/weather", icon: CloudSun, roles: ["farmer"] }, // Removed 🌦️
    { name: "Yield Prediction", href: "/dashboard/yield-prediction", icon: BarChart3, roles: ["farmer"] }, // Removed 📊
    { name: "Marketplace", href: "/dashboard/marketplace", icon: ShoppingCart, roles: ["farmer", "buyer"] }, // Removed 🛒
    { name: "Chatbot", href: "/dashboard/chatbot", icon: Bot, roles: ["farmer"] }, // Removed 🤖
    { name: "User Management", href: "/dashboard/users", icon: Users, roles: ["admin"] },
    { name: "Reports", href: "/dashboard/reports", icon: FileText, roles: ["admin"] },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["farmer", "buyer", "admin"] }, // Removed ⚙️
  ];

  const visibleLinks = allLinks.filter(link => link.roles.includes(role));

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-green-200/50 bg-white shadow-xl transition-all duration-300 ease-in-out dark:border-green-800/30 dark:bg-green-950/90 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-20" : "lg:w-64"} w-64`}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between px-4 py-4">
          <div className={`flex items-center space-x-2 ${collapsed ? "lg:hidden" : ""}`}>
            <Image 
              src="/logo.png" 
              alt="Govi Saviya Logo" 
              width={140} 
              height={50} 
              className="h-auto w-32 object-contain"
              priority
            />
          </div>
          
          {/* Mobile Close Button */}
          <button 
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <ul className="space-y-1.5">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              const Icon = link.icon;
              
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 ${
                      isActive 
                        ? "bg-green-100 font-medium text-green-800 shadow-sm dark:bg-green-900/50 dark:text-green-300" 
                        : "text-gray-600 hover:bg-green-50 hover:text-green-700 dark:text-gray-400 dark:hover:bg-green-900/30 dark:hover:text-green-300"
                    }`}
                    title={collapsed ? link.name : undefined}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-green-600 dark:text-green-400" : "text-gray-500 group-hover:text-green-600 dark:text-gray-500 dark:group-hover:text-green-400"} transition-colors`} />
                    <span 
                      className={`ml-3 whitespace-nowrap transition-all duration-300 ${
                        collapsed ? "lg:hidden lg:opacity-0" : "opacity-100"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Collapse Button (Desktop Only) */}
        <div className="hidden border-t border-green-100 p-4 dark:border-green-900/50 lg:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-xl bg-gray-50 p-2 text-gray-500 transition-colors hover:bg-green-100 hover:text-green-700 dark:bg-green-900/20 dark:text-gray-400 dark:hover:bg-green-800/40 dark:hover:text-green-300"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      </aside>
    </>
  );
}
