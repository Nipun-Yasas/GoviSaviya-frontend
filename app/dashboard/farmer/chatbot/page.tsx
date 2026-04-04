"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Send, 
  Paperclip, 
  Mic, 
  User, 
  MoreVertical, 
  Sparkles, 
  Sprout, 
  CloudRain, 
  Bug, 
  TrendingUp,
  Image as ImageIcon
} from "lucide-react";

const MOCK_CHAT = [
  {
    id: 1,
    role: "assistant",
    message: "Ayubowan! I am your GoviSaviya AI Advisor. How can I assist you with your farming today?",
    time: "09:00 AM",
    isInitial: true
  },
  {
    id: 2,
    role: "user",
    message: "My carrot leaves are starting to turn yellow around the edges. What should I do?",
    time: "09:05 AM"
  },
  {
    id: 3,
    role: "assistant",
    message: "Yellowing edges on carrot leaves typically point to a **Potassium deficiency** or early symptoms of **Alternaria leaf blight**. To give you an exact diagnosis, could you please upload a clear, close-up photo of the affected leaves?",
    time: "09:05 AM"
  },
  {
    id: 4,
    role: "user",
    message: "Sure, here is the photo.",
    image: true,
    time: "09:07 AM"
  },
  {
    id: 5,
    role: "assistant",
    message: "Thank you. Based on the image analysis, I detect strong visual signs of **Alternaria Leaf Blight**. \n\n**Immediate Actions:**\n1. Apply a copper-based fungicide to the affected sectors.\n2. Ensure proper spacing between crops to reduce humidity.\n3. Avoid overhead watering (the weather forecast predicts rain tomorrow, so holding off irrigation is advised anyway).",
    time: "09:08 AM"
  }
];

export default function ChatbotPage() {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    // In a real app, you would append this to the chat and call the API
    setInputText("");
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> GoviSaviya Intelligence
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-textPrimary">
            AI Advisory
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Chat Area */}
        <div className="lg:col-span-3 rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm flex flex-col overflow-hidden relative group">
          
          {/* Top Bar */}
          <div className="p-4 sm:p-6 border-b border-borderPrimary flex items-center justify-between shrink-0 bg-backgroundSecondary z-10 relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-primary border-2 border-backgroundSecondary" />
              </div>
              <div>
                <h2 className="font-bold text-textPrimary text-lg">GoviSaviya Agri-GPT</h2>
                <p className="text-sm font-medium text-textSecondary flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Connected and ready
                </p>
              </div>
            </div>
            <button className="p-2 text-textSecondary hover:bg-hoverPrimary hover:text-primary rounded-xl transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-visible-scrollbar bg-hoverPrimary/20 relative">
            <div className="max-w-screen-md mx-auto space-y-6">
              <div className="text-center pb-4">
                <span className="text-xs font-bold text-textSecondary uppercase tracking-widest bg-backgroundSecondary px-4 py-1.5 rounded-full shadow-sm border border-borderPrimary">Today</span>
              </div>
              
              {MOCK_CHAT.map((chat) => (
                <div key={chat.id} className={`flex gap-4 ${chat.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  
                  {/* Avatar */}
                  <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center border shadow-sm ${
                    chat.role === 'assistant' 
                    ? 'bg-primary/10 border-primary/20 text-primary' 
                    : 'bg-backgroundSecondary border-borderPrimary text-textSecondary'
                  }`}>
                    {chat.role === 'assistant' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>

                  {/* Message Bubble Base */}
                  <div className={`flex flex-col max-w-[80%] ${chat.role === 'user' ? 'items-end' : 'items-start'}`}>
                    
                    {chat.image ? (
                      /* Image Rendering Mock */
                      <div className="rounded-2xl p-2 bg-backgroundSecondary border border-borderPrimary shadow-sm mb-1 hover:border-primary/50 transition-colors cursor-pointer group/img">
                        <div className="w-56 h-40 bg-hoverPrimary rounded-xl flex items-center justify-center border border-borderPrimary relative overflow-hidden">
                           <ImageIcon className="h-10 w-10 text-primary/30 group-hover/img:scale-110 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                           <span className="absolute bottom-2 left-3 text-white text-xs font-bold tracking-wider uppercase">upload_img.jpg</span>
                        </div>
                      </div>
                    ) : (
                      /* Text Rendering */
                      <div className={`px-5 py-3.5 shadow-sm whitespace-pre-wrap text-sm sm:text-base leading-relaxed ${
                        chat.role === 'user'
                        ? 'bg-primary text-backgroundSecondary rounded-2xl rounded-tr-none'
                        : 'bg-backgroundSecondary text-textPrimary border border-borderPrimary rounded-2xl rounded-tl-none'
                      }`}>
                        {/* Cheap regex bold to fake markdown */}
                        {chat.message.split('**').map((text, i) => (
                          i % 2 === 1 ? <strong key={i} className={chat.role === 'user' ? 'text-white' : 'text-primary'}>{text}</strong> : <span key={i}>{text}</span>
                        ))}
                      </div>
                    )}
                    
                    <span className="text-[10px] font-bold text-textSecondary mt-1.5 px-1 uppercase tracking-wider">{chat.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-6 bg-backgroundSecondary border-t border-borderPrimary shrink-0 z-10">
            <form onSubmit={handleSubmit} className="max-w-screen-md mx-auto relative flex items-center">
              <button type="button" className="absolute left-3 text-textSecondary hover:text-primary transition-colors p-2 rounded-xl hover:bg-hoverPrimary">
                <Paperclip className="h-5 w-5" />
              </button>
              
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about crops, diseases, or market prices..."
                className="w-full pl-14 pr-24 py-4 rounded-2xl bg-hoverPrimary/50 border border-borderPrimary text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-backgroundSecondary transition-all shadow-inner font-medium text-sm sm:text-base"
              />
              
              <div className="absolute right-2 flex items-center gap-1">
                <button type="button" className="text-textSecondary hover:text-primary transition-colors p-2 rounded-xl hover:bg-hoverPrimary">
                  <Mic className="h-5 w-5" />
                </button>
                <button type="submit" disabled={!inputText.trim()} className="bg-primary text-backgroundSecondary p-2.5 rounded-xl hover:bg-hover disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-md active:scale-95">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
            <p className="text-center mt-3 text-xs font-semibold tracking-wider text-textSecondary uppercase">AI generated advice may vary. Always double-check critical actions.</p>
          </div>
        </div>

        {/* Right Sidebar: Suggestions */}
        <div className="hidden lg:flex lg:col-span-1 rounded-3xl border border-borderPrimary bg-backgroundSecondary shadow-sm flex-col p-6 overflow-y-auto no-visible-scrollbar">
          
          <h3 className="font-bold text-textPrimary mb-6 flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" /> Suggested Topics
          </h3>
          
          <div className="space-y-3 flex-1">
            {[
              { icon: Bug, title: "Identify Disease", desc: "Upload a photo for diagnosis" },
              { icon: Sprout, title: "Crop Selection", desc: "What to plant this season" },
              { icon: CloudRain, title: "Weather Impact", desc: "How rain affects your yield" },
              { icon: TrendingUp, title: "Market Prices", desc: "Check current average rates" },
            ].map((sug, i) => (
              <button key={i} className="w-full text-left p-4 rounded-2xl border border-borderPrimary hover:border-primary/40 hover:bg-hoverPrimary group transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-hoverPrimary group-hover:bg-primary text-primary group-hover:text-backgroundSecondary transition-colors border border-primary/10">
                    <sug.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-textPrimary group-hover:text-primary transition-colors mb-0.5">{sug.title}</h4>
                    <p className="text-xs font-medium text-textSecondary">{sug.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-borderPrimary">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-5 rounded-2xl border border-primary/20">
              <h4 className="font-bold text-textPrimary text-sm mb-2 text-primary">Need Exact Match?</h4>
              <p className="text-xs text-textSecondary font-medium leading-relaxed mb-4">
                You can directly share diagnostic reports with verified agronomists through the platform.
              </p>
              <button className="w-full py-2.5 rounded-xl bg-backgroundSecondary text-primary text-xs font-bold border border-primary/30 hover:bg-hoverPrimary transition-all shadow-sm">
                Find Expert
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
