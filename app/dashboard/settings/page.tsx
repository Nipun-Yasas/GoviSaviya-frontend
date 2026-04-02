"use client";

import React, { useState } from "react";
import { 
  User, 
  MapPin, 
  Bell, 
  Shield, 
  Moon, 
  Smartphone, 
  Mail, 
  Save,
  LogOut,
  Settings as SettingsIcon,
  Languages,
  CheckCircle2
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-borderPrimary pb-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-hoverPrimary text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <SettingsIcon className="h-3.5 w-3.5 mr-1" /> Preferences
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
            Account Settings
          </h1>
          <p className="text-textSecondary text-lg font-medium">
            Manage your personal profile, notification preferences, and farm details.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 pt-4">
        
        {/* Settings Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          {[
            { id: "profile", label: "Profile Information", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "preferences", label: "App Preferences", icon: Moon },
            { id: "security", label: "Security & Privacy", icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-5 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary text-backgroundSecondary shadow-md"
                  : "bg-backgroundSecondary border border-transparent text-textSecondary hover:bg-hoverPrimary hover:border-borderPrimary hover:text-primary"
              }`}
            >
              <tab.icon className="h-5 w-5 shrink-0" />
              {tab.label}
            </button>
          ))}
          
          <div className="mt-8 pt-4 border-t border-borderPrimary">
            <button className="flex items-center gap-3 px-5 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:border-destructive/30 border border-transparent w-full">
              <LogOut className="h-5 w-5 shrink-0" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Settings Content */}
        <div className="flex-1 space-y-8">
          
          {activeTab === "profile" && (
            <div className="animate-in slide-in-from-right-4 duration-500">
              <div className="bg-backgroundSecondary border border-borderPrimary rounded-3xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-textPrimary mb-6 flex items-center">
                  <User className="h-5 w-5 mr-3 text-primary" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">First Name</label>
                    <input 
                      type="text" 
                      defaultValue="Sunil"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-borderPrimary text-textPrimary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue="Peiris"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-borderPrimary text-textPrimary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
                      <input 
                        type="tel" 
                        defaultValue="+94 77 123 4567"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-borderPrimary text-textPrimary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
                      <input 
                        type="email" 
                        defaultValue="sunil.peiris@govisaviya.lk"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-borderPrimary text-textPrimary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-textPrimary mb-6 flex items-center border-t border-borderPrimary pt-8">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  Farm Details
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">Farm Name / Estate</label>
                    <input 
                      type="text" 
                      defaultValue="Green Valley Harvests"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-borderPrimary text-textPrimary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">Base Location</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-background border border-borderPrimary text-textPrimary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none">
                      <option>Nuwara Eliya District</option>
                      <option>Badulla District</option>
                      <option>Kandy District</option>
                    </select>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button className="flex items-center gap-2 bg-primary text-backgroundSecondary px-8 py-3.5 rounded-xl font-bold hover:bg-hover hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg hover:shadow-xl">
                    <Save className="h-5 w-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="animate-in slide-in-from-right-4 duration-500">
              <div className="bg-backgroundSecondary border border-borderPrimary rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-textPrimary mb-2 flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-primary" />
                  Alert Preferences
                </h2>
                <p className="text-textSecondary text-sm font-medium mb-6 pb-6 border-b border-borderPrimary">
                  Control how GoviSaviya communicates critical farming information to you.
                </p>

                {[
                  { title: "Severe Weather Alerts", desc: "Receive immediate SMS for storms or extreme heat near your location.", active: true },
                  { title: "Market Price Shifts", desc: "Get notified when prices for your specified crops drop or rise heavily.", active: true },
                  { title: "AI Disease Diagnosis", desc: "Email copies of your plant disease analysis reports.", active: false },
                  { title: "Buyer Inquiries", desc: "In-app popups when a new bulk buyer contacts your listing.", active: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between p-4 rounded-2xl hover:bg-hoverPrimary/40 transition-colors border border-transparent hover:border-borderPrimary">
                    <div className="max-w-[75%]">
                      <h4 className="font-bold text-textPrimary text-base mb-1">{item.title}</h4>
                      <p className="text-sm text-textSecondary font-medium">{item.desc}</p>
                    </div>
                    {/* Custom Toggle Mock */}
                    <div className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.active ? 'bg-primary' : 'bg-borderPrimary'}`}>
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-backgroundSecondary shadow ring-0 transition duration-200 ease-in-out ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="animate-in slide-in-from-right-4 duration-500">
              <div className="bg-backgroundSecondary border border-borderPrimary rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center">
                    <Moon className="h-5 w-5 mr-3 text-primary" />
                    Appearance
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl border-2 border-primary bg-primary/5 flex flex-col items-center justify-center gap-3 cursor-pointer relative overflow-hidden group">
                      <div className="absolute right-3 top-3 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="h-10 w-10 bg-textPrimary rounded-full flex items-center justify-center">
                        <Moon className="h-5 w-5 text-backgroundSecondary" />
                      </div>
                      <span className="font-bold text-textPrimary">System / Dark Mode</span>
                    </div>
                    <div className="p-5 rounded-2xl border-2 border-borderPrimary hover:border-primary/50 bg-backgroundSecondary flex flex-col items-center justify-center gap-3 cursor-pointer group transition-colors">
                      <div className="h-10 w-10 bg-hoverPrimary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Sun className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-bold text-textSecondary group-hover:text-textPrimary transition-colors">Light Mode</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-borderPrimary">
                  <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center">
                    <Languages className="h-5 w-5 mr-3 text-primary" />
                    Language
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {["English", "සිංහල", "தமிழ்"].map((lang, i) => (
                      <button key={i} className={`p-4 rounded-xl border text-sm font-bold transition-all ${i === 0 ? 'border-primary bg-primary/10 text-primary' : 'border-borderPrimary bg-backgroundSecondary text-textSecondary hover:bg-hoverPrimary hover:border-primary/40 focus:outline-none'}`}>
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "security" && (
            <div className="animate-in slide-in-from-right-4 duration-500">
               <div className="bg-backgroundSecondary border border-borderPrimary rounded-3xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-textPrimary mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-primary" />
                  Security
                </h2>
                <p className="text-textSecondary text-sm font-medium mb-8 pb-8 border-b border-borderPrimary">
                  Update your standard security protocol and passwords.
                </p>
                
                <div className="space-y-6 max-w-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">Current Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-borderPrimary text-textPrimary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-2 border-t border-borderPrimary pt-6">
                    <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">New Password</label>
                    <input 
                      type="password" 
                      placeholder="At least 8 characters"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-borderPrimary text-textPrimary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-textSecondary uppercase tracking-wider">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-3 rounded-xl bg-background border border-borderPrimary text-textPrimary font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono"
                    />
                  </div>
                  <div className="pt-4">
                    <button className="bg-textPrimary text-backgroundSecondary px-6 py-3 rounded-xl font-bold hover:bg-primary transition-all shadow-md active:scale-95">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
