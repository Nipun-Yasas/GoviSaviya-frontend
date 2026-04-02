"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Bell, 
  Menu, 
  Moon, 
  Sun, 
  UserCircle,
  MapPin,
  Sprout,
  Shield,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-borderPrimary bg-backgroundSecondary px-6 py-4 dark:bg-backgroundSecondary sm:px-8">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-2xl bg-input lg:hidden animate-pulse" />
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="h-11 w-11 rounded-2xl bg-input animate-pulse" />
          <div className="h-11 w-11 rounded-2xl bg-input animate-pulse" />
          <div className="h-11 w-11 rounded-2xl bg-input animate-pulse" />
        </div>
      </header>
    );
  }
  
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-borderPrimary bg-backgroundSecondary/80 px-6 py-4 backdrop-blur-xl dark:bg-backgroundSecondary/90 sm:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="group flex h-11 w-11 items-center justify-center rounded-2xl bg-input text-textSecondary transition-all hover:bg-hoverPrimary hover:text-primary active:scale-90 lg:hidden cursor-pointer"
        >
          <Menu className="h-6 w-6 transition-transform group-hover:rotate-12 pointer-events-none" />
        </button>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="group flex h-11 w-11 items-center justify-center rounded-2xl bg-input text-textSecondary transition-all hover:bg-hoverPrimary hover:text-primary active:scale-95"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 transition-transform group-hover:rotate-45" />
          ) : (
            <Moon className="h-5 w-5 transition-transform group-hover:-rotate-12" />
          )}
        </button>

        {/* Notifications */}
        <button className="group relative flex h-11 w-11 items-center justify-center rounded-2xl bg-input text-textSecondary transition-all hover:bg-hoverPrimary hover:text-primary active:scale-95">
          <Bell className="h-5 w-5 transition-transform group-hover:ring-2 ring-primary/20 rounded-full" />
          <span className="absolute right-2.5 top-2.5 flex h-2.5 w-2.5 rounded-full bg-destructive ring-4 ring-backgroundSecondary"></span>
        </button>

        {/* Profile Dropdown Trigger */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="group flex items-center gap-3 cursor-pointer focus:outline-none"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border-2 transition-all overflow-hidden ${
              isProfileOpen 
              ? "border-primary text-primary scale-105 shadow-md shadow-primary/20 bg-primary/10" 
              : "border-borderPrimary bg-input text-textSecondary group-hover:border-primary group-hover:text-primary group-hover:scale-105 active:scale-95"
            }`}>
              <UserCircle className="h-7 w-7" />
            </div>
          </button>

          {/* Dropdown Modal Container */}
          {isProfileOpen && (
            <div className="absolute right-0 top-14 w-[340px] rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 z-50 overflow-hidden transform origin-top-right">
              
              {/* Premium User Banner */}
              <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-borderPrimary relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                  <Sprout className="w-32 h-32" />
                </div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-primary text-backgroundSecondary flex items-center justify-center shadow-lg transform -rotate-3 border-2 border-primary/20">
                    <UserCircle className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="font-bold text-textPrimary text-xl tracking-tight">Sunil Peiris</h3>
                    <p className="text-sm font-medium text-textSecondary flex items-center mt-1">
                      <Sprout className="h-3.5 w-3.5 mr-1 text-primary" /> Verified Farmer
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-textSecondary bg-backgroundSecondary/50 backdrop-blur-sm px-3 py-2 rounded-xl border border-borderPrimary w-fit relative z-10">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> Green Valley Harvests, Nuwara Eliya
                </div>
              </div>

              {/* Statistics & Links */}
              <div className="p-3">
                <div className="grid grid-cols-2 gap-2 mb-3">
                   <div className="bg-hoverPrimary rounded-2xl p-3 flex flex-col items-center justify-center border border-transparent hover:border-primary/20 transition-colors">
                     <span className="text-secondary font-black text-2xl tracking-tighter">4</span>
                     <span className="text-[10px] font-bold text-textSecondary uppercase tracking-wider">Active Fields</span>
                   </div>
                   <div className="bg-hoverPrimary rounded-2xl p-3 flex flex-col items-center justify-center border border-transparent hover:border-primary/20 transition-colors">
                     <span className="text-primary font-black text-2xl tracking-tighter">4.8</span>
                     <span className="text-[10px] font-bold text-textSecondary uppercase tracking-wider">Market Rating</span>
                   </div>
                </div>

                <div className="space-y-1">
                  <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold text-textPrimary hover:bg-hoverPrimary hover:text-primary transition-all group border border-transparent hover:border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-hoverPrimary group-hover:bg-primary/10 transition-colors">
                        <SettingsIcon className="h-4 w-4 text-textSecondary group-hover:text-primary transition-colors" /> 
                      </div>
                      Account Settings
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-primary" />
                  </Link>
                  <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold text-textPrimary hover:bg-hoverPrimary hover:text-primary transition-all group border border-transparent hover:border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-hoverPrimary group-hover:bg-primary/10 transition-colors">
                         <Shield className="h-4 w-4 text-textSecondary group-hover:text-primary transition-colors" /> 
                      </div>
                      Privacy & Security
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-primary" />
                  </button>
                </div>
              </div>
              
              {/* Footer Actions */}
              <div className="p-3 bg-hoverPrimary/50 border-t border-borderPrimary">
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl text-sm font-bold text-destructive bg-backgroundSecondary border border-destructive/20 hover:bg-destructive hover:text-backgroundSecondary transition-all shadow-sm active:scale-95"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}
