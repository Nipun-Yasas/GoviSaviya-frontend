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
  X,
  Sprout,
  History,
  MapPin,
  MessageCircle,
  Truck,
  Coins
} from "lucide-react";


export type UserRole = "farmer" | "buyer" | "admin" | "delivery";

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const allLinks = [
    // Shared
    { name: "Dashboard", href: role === 'buyer' ? "/dashboard/buyer" : role === 'delivery' ? "/dashboard/delivery" : role === 'farmer' ? "/dashboard/farmer" : "/dashboard", icon: LayoutDashboard, roles: ["farmer", "buyer", "admin", "delivery"] },

    
    // Farmer Specific
    { name: "Disease Detection", href: "/dashboard/farmer/disease-detection", icon: Bug, roles: ["farmer"] },
    { name: "Weather", href: "/dashboard/farmer/weather", icon: CloudSun, roles: ["farmer"] },
    { name: "Yield Prediction", href: "/dashboard/farmer/yield-prediction", icon: BarChart3, roles: ["farmer"] },
    { name: "Marketplace", href: "/dashboard/farmer/marketplace", icon: ShoppingCart, roles: ["farmer"] },
    { name: "My Orders", href: "/dashboard/farmer/orders", icon: FileText, roles: ["farmer"] },
    { name: "Chatbot", href: "/dashboard/farmer/chatbot", icon: Bot, roles: ["farmer"] },


    
    // Buyer Specific
    { name: "Marketplace", href: "/dashboard/buyer/marketplace", icon: ShoppingCart, roles: ["buyer"] },

    { name: "My Orders", href: "/dashboard/buyer/orders", icon: History, roles: ["buyer"] },
    { name: "Farmer Directory", href: "/dashboard/buyer/farmer-contact", icon: Users, roles: ["buyer"] },
    { name: "Regional Search", href: "/dashboard/buyer/location-filter", icon: MapPin, roles: ["buyer"] },
    
    // Admin Specific
    { name: "User Management", href: "/dashboard/admin/user-management", icon: Users, roles: ["admin"] },
    { name: "Reports", href: "/dashboard/admin/reports", icon: FileText, roles: ["admin"] },


    // Delivery Specific
    { name: "My Jobs", href: "/dashboard/delivery", icon: Truck, roles: ["delivery"] },
    { name: "Earnings", href: "/dashboard/delivery/earnings", icon: Coins, roles: ["delivery"] },
    
    // Shared
    { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["farmer", "buyer", "admin", "delivery"] },

  ];

  const visibleLinks = allLinks.filter(link => link.roles.includes(role));

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300" 
          onClick={onClose}
        />
      )}

      <aside
        className={`group/sidebar fixed inset-y-0 left-0 z-[70] flex flex-col border-r border-borderPrimary bg-sidebar shadow-2xl transition-[width,transform] duration-300 ease-in-out lg:shadow-none lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"
        } lg:w-24 lg:hover:w-72 overflow-x-hidden`}
      >
        <div className="relative flex h-24 items-center justify-between px-6 py-4">
          <div className="absolute left-0 top-0 flex h-24 w-24 items-center justify-center text-primary transition-all duration-300 pointer-events-none hidden lg:flex lg:opacity-100 lg:group-hover/sidebar:opacity-0 lg:group-hover/sidebar:-translate-x-4">
            <Sprout className="h-10 w-10" />
          </div>

          <div className="flex items-center min-w-[160px] transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:translate-x-4 lg:group-hover/sidebar:translate-x-0">
            <Image 
              src="/logo.png" 
              alt="Govi Saviya Logo" 
              width={160} 
              height={60} 
              className="h-auto w-40 object-contain brightness-110"
              priority
            />
          </div>
          
          <button 
            className="rounded-xl p-2 text-textSecondary hover:bg-hoverPrimary hover:text-primary lg:hidden transition-all active:scale-95"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 no-visible-scrollbar">
          <ul className="space-y-2">
            {visibleLinks.map((link) => {
              const isActive = link.href === "/dashboard" 
                ? pathname === "/dashboard"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
              const Icon = link.icon;
              
              return (
                <li key={`${link.name}-${link.href}`}>
                  <Link

                    href={link.href}
                    className={`group flex items-center rounded-2xl px-4 py-3.5 transition-all duration-300 relative overflow-hidden ${
                      isActive 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 font-semibold" 
                        : "text-textSecondary hover:bg-hoverPrimary hover:text-primary"
                    }`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "text-textSecondary group-hover:text-primary"}`} />
                    <span className="ml-4 whitespace-nowrap transition-all duration-300 font-medium opacity-100 lg:opacity-0 lg:-translate-x-4 lg:group-hover/sidebar:opacity-100 lg:group-hover/sidebar:translate-x-0">
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
