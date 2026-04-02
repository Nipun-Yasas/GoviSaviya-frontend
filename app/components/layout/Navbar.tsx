"use client";

import React, { useState } from "react";
import { 
  Bell, 
  Menu, 
  Moon, 
  Sun, 
  UserCircle 
} from "lucide-react";
import { useTheme } from "next-themes";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
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
          <span className="absolute right-2.5 top-2.5 flex h-2.5 w-2.5 rounded-full bg-red-500 ring-4 ring-backgroundSecondary"></span>
        </button>

        {/* Profile */}
        <div className="group flex items-center gap-3 cursor-pointer">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-borderPrimary bg-input text-textSecondary transition-all group-hover:border-primary group-hover:text-primary group-hover:scale-105 active:scale-95 overflow-hidden">
            <UserCircle className="h-7 w-7" />
          </div>
        </div>
      </div>
    </header>
  );
}
