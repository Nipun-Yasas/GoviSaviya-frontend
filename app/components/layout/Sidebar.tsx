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
  X,
  Sprout
} from "lucide-react";

export type UserRole = "farmer" | "buyer" | "admin";

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300" 
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`group/sidebar fixed inset-y-0 left-0 z-[70] flex flex-col border-r border-borderPrimary bg-sidebar shadow-2xl transition-[width,transform] duration-300 ease-in-out lg:shadow-none lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"
        } lg:w-24 lg:hover:w-72 overflow-x-hidden`}
      >
        {/* Header */}
        <div className="relative flex h-24 items-center justify-between px-6 py-4">
          
          {/* Mini logo icon for collapsed state on desktop */}
          <div className="absolute left-0 top-0 flex h-24 w-24 items-center justify-center text-primary transition-all duration-300 pointer-events-none hidden lg:flex lg:opacity-100 lg:group-hover/sidebar:opacity-0 lg:group-hover/sidebar:-translate-x-4">
            <Sprout className="h-10 w-10" />
          </div>

          {/* Full logo for expanded state */}
          <div className="flex items-center min-w-[160px] transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:translate-x-4 lg:group-hover/sidebar:translate-x-0">
            <Image 
              src="/logo.png" 
              alt="Govi Saviya Logo" 
              width={160} 
              height={60} 
              className="h-auto w-40 object-contain brightness-110 dark:brightness-100"
              priority
            />
          </div>
          
          {/* Mobile Close Button */}
          <button 
            className="rounded-xl p-2 text-textSecondary hover:bg-hoverPrimary hover:text-primary lg:hidden transition-all active:scale-95"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 no-visible-scrollbar">
          <ul className="space-y-2">
            {visibleLinks.map((link) => {
              const isActive = link.href === "/dashboard" 
                ? pathname === "/dashboard"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
              const Icon = link.icon;
              
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group flex items-center rounded-2xl px-4 py-3.5 transition-all duration-300 relative overflow-hidden ${
                      isActive 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 font-semibold" 
                        : "text-textSecondary hover:bg-hoverPrimary hover:text-primary"
                    }`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "text-textSecondary group-hover:text-primary"}`} />
                    <span 
                      className="ml-4 whitespace-nowrap transition-all duration-300 font-medium opacity-100 lg:opacity-0 lg:-translate-x-4 lg:group-hover/sidebar:opacity-100 lg:group-hover/sidebar:translate-x-0"
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white/20 rounded-l-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
