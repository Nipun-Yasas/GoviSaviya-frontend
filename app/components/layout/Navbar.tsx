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
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-green-200/50 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-green-800/30 dark:bg-green-950/80 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 lg:hidden" />
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800" />
          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800" />
          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>
      </header>
    );
  }
  
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-green-200/50 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-green-800/30 dark:bg-green-950/80 sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-green-700 transition-colors hover:bg-green-100 hover:text-green-900 focus:outline-none dark:text-green-400 dark:hover:bg-green-900 dark:hover:text-green-50 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full p-2 text-green-700 transition-all hover:bg-green-100 hover:text-green-900 dark:text-green-400 dark:hover:bg-green-900 dark:hover:text-green-50"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative rounded-full p-2 text-green-700 transition-all hover:bg-green-100 hover:text-green-900 dark:text-green-400 dark:hover:bg-green-900 dark:hover:text-green-50">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-green-950"></span>
        </button>

        {/* Profile */}
        <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-green-200 bg-green-100 transition-transform hover:scale-105 dark:border-green-800 dark:bg-green-900 sm:h-9 sm:w-9">
          <button className="flex h-full w-full items-center justify-center text-green-700 focus:outline-none dark:text-green-400">
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
