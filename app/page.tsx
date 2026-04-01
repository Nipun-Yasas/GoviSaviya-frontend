"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Leaf,
  CloudSun,
  BarChart,
  ShoppingCart,
  Bot,
  Camera,
  Cpu,
  Sprout,
  TrendingUp,
  ShieldCheck,
  Coins,
  Users,
  ArrowRight,
  Search,
  Play,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* 1. HERO SECTION */}
      <section className="sticky top-0 w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden bg-secondary z-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/paddy_field.jpg"
            alt="Beautiful green paddy field for SmartAgri background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle gradient overlays similar to design */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent w-full md:w-3/4" />
        </div>

        {/* Top Navbar */}
        <div className="absolute top-6 left-0 right-0 z-40 w-full px-4 md:px-12 flex justify-center">
          <header className="flex items-center justify-between w-full max-w-[1400px] px-3 py-2.5 md:px-4 md:py-3 text-white bg-black/10 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
            
            <div className="flex items-center ml-2">
              <img src="/logo.png" alt="SmartAgri Logo" className="h-10 md:h-12 w-auto object-contain rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
            </div>
            
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-white/80">
              <Link href="#features" className="hover:text-[#B7FF2A] transition-colors">Features</Link>
              <Link href="#workflow" className="hover:text-[#B7FF2A] transition-colors">How it Works</Link>
              <Link href="#benefits" className="hover:text-[#B7FF2A] transition-colors">Benefits</Link>
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login" className="flex items-center justify-center px-5 py-2 text-sm font-semibold text-white/90 hover:text-white border border-transparent hover:border-white/20 rounded-full transition-all">
                Log In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-3 pl-5 pr-1 py-1 text-sm font-bold text-black bg-white rounded-full hover:scale-105 hover:bg-[#B7FF2A] transition-all duration-300 shadow-xl group"
              >
                Register
                <div className="w-8 h-8 flex items-center justify-center bg-black group-hover:bg-[#0B4D1E] rounded-full text-white group-hover:text-[#B7FF2A] transition-colors">
                  <ArrowUpRight className="w-4 h-4 ml-0.5" />
                </div>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-white hover:text-[#B7FF2A] transition-colors z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </header>
        </div>

        {/* Mobile Sidebar Navigation */}
        <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-[#021407] border-l border-white/10 p-6 flex flex-col pt-24">
            <nav className="flex flex-col gap-6 text-xl font-bold text-white mb-12">
              <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#B7FF2A] transition-colors">Features</Link>
              <Link href="#workflow" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#B7FF2A] transition-colors">How it Works</Link>
              <Link href="#benefits" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#B7FF2A] transition-colors">Benefits</Link>
            </nav>

            <div className="mt-auto flex flex-col gap-4 pb-12">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center px-5 py-3 text-base font-semibold text-white hover:bg-white/10 border border-white/20 rounded-full transition-all">
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex justify-center items-center gap-2 py-3 text-base font-bold text-black bg-white rounded-full hover:bg-[#B7FF2A] transition-all duration-300 group"
              >
                Register
                <div className="w-8 h-8 flex items-center justify-center bg-black group-hover:bg-[#0B4D1E] rounded-full text-white group-hover:text-[#B7FF2A] transition-colors">
                  <ArrowUpRight className="w-4 h-4 ml-0.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 flex flex-col justify-center h-full w-full px-6 md:px-12 pb-12 pt-[15vh] max-w-[1400px] mx-auto">
           <div className="flex flex-col lg:flex-row justify-between items-end w-full h-full pb-8">
              
              {/* Left Side: Tag, Heading, Paragraph, Buttons */}
              <div className="w-full lg:w-3/5 flex flex-col items-start gap-4 mt-auto">
                 {/* Pill tag */}
                 <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#d4f971]"></div>
                   Provide Future Proof Solutions
                 </div>
                 
                 {/* Heading */}
                 <h1 className="text-6xl md:text-[5.5rem] lg:text-[7.5rem] font-medium tracking-tight text-white leading-[0.95] drop-shadow-2xl">
                    Smart Farming <br/>
                    <span className="font-serif italic font-light opacity-95 block pt-2">Intelligence.</span>
                 </h1>
                 
                 {/* Paragraph */}
                 <p className="text-base md:text-lg font-normal text-white/80 leading-relaxed drop-shadow-lg max-w-xl mt-4">
                    farming starts with smarter insights. Unlock efficiency, resilience, and long-term sustainability climate-aware solutions.
                 </p>

                 {/* Buttons */}
                 <div className="flex flex-wrap items-center gap-4 mt-6">
                   <Link href="#features" className="flex items-center gap-3 pl-6 pr-2 py-2 text-sm font-bold text-green-950 bg-[#d4f971] rounded-full hover:scale-105 transition-transform shadow-xl">
                     Start Investing 
                     <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-green-950">
                       <ArrowUpRight className="w-4 h-4 ml-0.5" />
                     </div>
                   </Link>
                   <Link href="/login" className="flex items-center gap-3 pl-6 pr-2 py-2 text-sm font-bold text-black bg-white rounded-full hover:scale-105 transition-transform shadow-xl">
                     Meet the Farmers 
                     <div className="w-8 h-8 flex items-center justify-center bg-green-950 rounded-full text-white">
                       <ArrowUpRight className="w-4 h-4 ml-0.5" />
                     </div>
                   </Link>
                 </div>
              </div>

              {/* Right Side: Floating Card structure */}
              <div className="w-full lg:w-auto mt-12 lg:mt-0 relative hidden lg:block">
                <div className="flex flex-col w-[360px] p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl relative overflow-hidden group hover:bg-white/20 transition-colors shadow-2xl">
                   {/* Text Header */}
                   <div className="px-4 pt-3 pb-2 flex justify-between items-start">
                     <span className="text-white/90 font-medium text-sm drop-shadow-md">SmartAgri - Crop AI Insights</span>
                   </div>
                   {/* Floating external button */}
                   <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center z-20 shadow-xl text-black hover:scale-110 cursor-pointer transition-transform">
                      <ArrowUpRight className="w-4 h-4 ml-0.5" />
                   </div>
                   {/* Image container */}
                   <div className="relative w-full h-44 rounded-2xl overflow-hidden flex items-center justify-center bg-black/20">
                     <Image src="/paddy_field.jpg" alt="Preview Image" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                   </div>
                   {/* Slide indicators */}
                   <div className="px-4 py-4 flex items-center justify-start gap-2">
                      <div className="w-8 h-0.5 bg-white rounded-full shadow-md"></div>
                      <div className="w-8 h-0.5 bg-white/30 rounded-full shadow-md"></div>
                      <div className="w-8 h-0.5 bg-white/30 rounded-full shadow-md"></div>
                   </div>
                </div>
              </div>

           </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION (Bento Grid) */}
      <section id="features" className="py-32 bg-[#021407] relative overflow-hidden z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/10">
        <div className="max-w-7xl px-6 mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black tracking-[0.2em] text-[#B7FF2A] uppercase mb-4">Powerful Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Intelligence at your fingertips.</h3>
            <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto font-medium">Discover the precision tools empowering modern farmers to detect issues early and scale effectively without lifting a finger.</p>
          </div>

          {/* Interactive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[320px]">
            
            {/* Bento 1: Large Image Feature */}
            <div className="md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 group rounded-3xl bg-white/5 backdrop-blur-md overflow-hidden relative border border-white/10 hover:border-[#1FAA00]/30 transition-all duration-500 hover:shadow-2xl">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800" alt="Crop Disease" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end text-white">
                <div className="w-12 h-12 bg-[#B7FF2A] rounded-xl flex items-center justify-center mb-5 text-[#0B4D1E] shadow-lg group-hover:-translate-y-2 transition-transform duration-500">
                  <Leaf className="w-6 h-6" />
                </div>
                <h4 className="text-3xl font-extrabold mb-3">Instant Disease Detection</h4>
                <p className="text-white/80 leading-relaxed font-medium max-w-sm">
                  Upload plant images and detect diseases instantly using our advanced AI computer vision models.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#B7FF2A] font-bold text-sm cursor-pointer opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  See how it works <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Bento 2: Weather */}
            <div className="md:col-span-1 lg:col-span-2 row-span-1 group rounded-3xl overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 w-full h-full">
                <img src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800" alt="Weather" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/20 transition-colors duration-500"></div>
              </div>
              <div className="relative p-8 flex flex-col justify-center h-full z-10 border border-white/10 rounded-3xl group-hover:bg-black/20 transition-colors duration-500">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 text-white shadow-md group-hover:bg-[#1FAA00] group-hover:text-white transition-colors duration-300">
                  <CloudSun className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Real-time Weather Analytics</h4>
                <p className="text-white/60 text-sm leading-relaxed font-medium">
                  Hyper-local weather insights driven by precise satellite data to make timely decisions.
                </p>
              </div>
            </div>

            {/* Bento 3: Yield */}
            <div className="md:col-span-1 lg:col-span-1 row-span-1 group rounded-3xl overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 w-full h-full">
                <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800" alt="Yield Fields" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/20 transition-colors duration-500"></div>
              </div>
              <div className="relative p-8 flex flex-col justify-center h-full z-10 text-white border border-white/10 rounded-3xl group-hover:bg-black/20 transition-colors duration-500">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:-translate-y-1 transition-transform group-hover:bg-[#B7FF2A] group-hover:text-black">
                  <BarChart className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">Yield Prediction</h4>
                <p className="text-white/60 text-sm leading-relaxed font-medium">
                  Predict upcoming crop yields using historical soil and climate patterns.
                </p>
              </div>
            </div>

            {/* Bento 4: Marketplace */}
            <div className="md:col-span-2 lg:col-span-1 row-span-1 group rounded-3xl overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 w-full h-full">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" alt="Fresh Market" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-zinc-900/20 group-hover:from-zinc-900/80 transition-colors duration-500"></div>
              </div>
              <div className="relative p-8 flex flex-col justify-end h-full z-10 text-white border border-white/10 rounded-3xl group-hover:bg-black/20 transition-colors duration-500">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white border border-white/20 group-hover:bg-[#B7FF2A] group-hover:text-black transition-colors duration-300">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Direct Marketplace</h4>
                <p className="text-white/60 text-sm leading-relaxed font-medium mb-4">
                  Bypass middlemen. Sell directly to verified buyers.
                </p>
                <div className="flex items-center gap-2 text-[#B7FF2A] font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform cursor-pointer">
                    Explore vendors <ArrowRight className="w-4 h-4 ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          SCROLLING LOWER SECTIONS (PARALLAX WRAPPER)
          ======================================================= */}
      <div className="relative z-20 w-full bg-[url('/paddy_field2.jpg')] bg-fixed bg-cover bg-center">
        {/* Dark mask over the background so text remains legible, restoring previous look */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

        {/* 3. HOW IT WORKS SECTION (Interactive Stepper) */}
        <section id="workflow" className="py-32 relative overflow-hidden bg-transparent">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1FAA00] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#39C400] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

          <div className="max-w-7xl px-6 mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black tracking-[0.2em] text-[#B7FF2A] uppercase mb-4">Workflow</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Three steps to modern farming.</h3>
            <p className="mt-6 text-xl text-white/50 max-w-2xl mx-auto font-medium">A seamless, intuitive process designed to integrate directly into your daily routine.</p>
          </div>

          <div className="flex flex-col gap-24">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-6">
                <div className="text-[#B7FF2A] font-black font-mono text-6xl md:text-8xl opacity-30 leading-none">01</div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-xl backdrop-blur-md">
                  <Camera className="w-8 h-8" />
                </div>
                <h4 className="text-4xl font-extrabold text-white tracking-tight">Upload your Data</h4>
                <p className="text-lg text-white/50 leading-relaxed font-medium max-w-lg">Easily capture live imagery of your crops directly from the field, or upload historical data arrays. Our system intelligently maps the input directly to your secure tenant environment without friction.</p>
              </div>
              <div className="w-full md:w-1/2 relative h-[350px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                <img src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=1000" alt="Upload Data" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-6 md:pl-8">
                <div className="text-[#B7FF2A] font-black font-mono text-6xl md:text-8xl opacity-30 leading-none">02</div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-[#B7FF2A] border border-white/10 shadow-xl backdrop-blur-md">
                  <Cpu className="w-8 h-8" />
                </div>
                <h4 className="text-4xl font-extrabold text-white tracking-tight">AI Engine Analyzes</h4>
                <p className="text-lg text-white/50 leading-relaxed font-medium max-w-lg">Our deeply trained convolutional neural networks process millions of data points instantly. The system cross-references weather patterns, historical soil yields, and real-time biological telemetry.</p>
              </div>
              <div className="w-full md:w-1/2 relative h-[350px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" alt="AI Analyzes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-6">
                <div className="text-[#B7FF2A] font-black font-mono text-6xl md:text-8xl opacity-50 leading-none drop-shadow-[0_0_15px_rgba(183,255,42,0.3)]">03</div>
                <div className="w-16 h-16 bg-[#B7FF2A] rounded-2xl flex items-center justify-center text-[#0B4D1E] shadow-xl hover:scale-110 transition-transform">
                  <Sprout className="w-8 h-8" />
                </div>
                <h4 className="text-4xl font-extrabold text-white tracking-tight">Instant Insights</h4>
                <p className="text-lg text-white/50 leading-relaxed font-medium max-w-lg">Stop guessing. Receive immediate, highly accurate actionable recommendations straight to your dashboard. Predict yields, optimize watering schedules, and combat disease before it spreads.</p>
              </div>
              <div className="w-full md:w-1/2 relative h-[350px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(183,255,42,0.15)] border border-[#B7FF2A]/20 group">
                <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1000" alt="Instant Insights" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* 4. DASHBOARD PREVIEW SECTION (Clean Interface) */}
        <section className="py-32 relative overflow-hidden bg-transparent">
          <div className="max-w-7xl px-6 mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Your Farming Command Center</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Everything you need to manage your farm in one beautifully designed intelligent interface.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Interactive Dashboard Container */}
            <div className="p-4 md:p-8 bg-white/10 backdrop-blur-3xl rounded-[3rem] shadow-[0_20px_80px_rgba(0,0,0,0.5)] border border-white/20 relative group">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Main disease panel mock */}
                <div className="md:col-span-7 bg-black/40 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col gap-6 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-[#B7FF2A]/50">
                  <div className="flex justify-between items-center pb-5 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 text-[#B7FF2A] rounded-2xl flex items-center justify-center">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-lg leading-tight">Disease Scan Result</h5>
                        <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Today, 09:41 AM</span>
                      </div>
                    </div>
                    <span className="px-4 py-1.5 bg-red-500/20 text-red-400 text-xs font-black uppercase tracking-wider rounded-full border border-red-500/30">High Risk</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-full sm:w-36 h-36 bg-white/5 rounded-2xl overflow-hidden relative shrink-0 border border-white/10">
                      <img src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=200" alt="Blight" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center w-full">
                      <h6 className="font-extrabold text-white mb-2 text-2xl">Tomato Blight Detected</h6>
                      <p className="text-sm font-bold text-[#B7FF2A] mb-4 uppercase tracking-wider">AI Confidence: 94.2%</p>
                      <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden shadow-inner hidden md:block">
                        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 w-[94%] h-full rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col gap-6">
                  {/* Weather panel mock */}
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl text-white transform transition-transform duration-500 group-hover:-translate-y-2 relative overflow-hidden group/weather hover:border-[#39C400]/50">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#39C400] rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2 group-hover/weather:opacity-40 transition-opacity duration-700"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div>
                        <h5 className="font-bold text-white/60 text-sm tracking-wider uppercase mb-2">Farm Weather</h5>
                        <h2 className="text-5xl font-black text-white">28°C</h2>
                      </div>
                      <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                        <CloudSun className="w-6 h-6 text-[#B7FF2A]" />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-white/70 pt-4 border-t border-white/10 font-medium relative z-10">
                      <span>Humidity: 65%</span>
                      <span className="text-[#B7FF2A] font-bold">Rain in 2h</span>
                    </div>
                  </div>

                  {/* Marketplace panel mock */}
                  <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 transform transition-transform duration-500 group-hover:-translate-y-2 hover:border-[#B7FF2A]/50">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                      <div className="p-3 bg-white/10 text-[#B7FF2A] rounded-2xl border border-white/5">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                      <h5 className="font-bold text-white text-lg">Active Offers</h5>
                    </div>
                    <div className="flex justify-between items-center py-4 px-5 bg-white/5 rounded-2xl mb-3 border border-white/5 hover:bg-white/10 hover:border-[#B7FF2A]/30 transition-colors cursor-pointer">
                      <span className="text-sm font-bold text-white">100kg Tomatoes</span>
                      <span className="text-sm font-black text-[#1FAA00] bg-white/90 px-3 py-1 rounded-lg shadow-sm">$120.00</span>
                    </div>
                    <div className="flex justify-between items-center py-4 px-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-[#B7FF2A]/30 transition-colors cursor-pointer">
                      <span className="text-sm font-bold text-white">50kg Rice</span>
                      <span className="text-sm font-black text-[#1FAA00] bg-white/90 px-3 py-1 rounded-lg shadow-sm">$45.00</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        </section>

        {/* 5. BENEFITS SECTION (Minimalist Typography) */}
        <section id="benefits" className="py-32 relative overflow-hidden bg-transparent">
          <div className="max-w-7xl px-6 mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">Why Choose SmartAgri?</h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto font-medium">Measurable results that matter to your livelihood and farming future.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            <div className="group overflow-hidden rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_rgba(183,255,42,0.1)] transition-all duration-500 hover:-translate-y-2 relative h-[380px] border border-white/10">
              <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600" alt="Increase Yield" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20 group-hover:bg-[#39C400] transition-colors duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">Increase Yield</h4>
                <p className="text-white/80 text-sm font-medium leading-relaxed">Optimize your harvest with data-driven predictions.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_rgba(183,255,42,0.1)] transition-all duration-500 hover:-translate-y-2 relative h-[380px] border border-white/10">
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600" alt="Stop Diseases" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20 group-hover:bg-[#1FAA00] transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">Stop Diseases</h4>
                <p className="text-white/80 text-sm font-medium leading-relaxed">Catch crop health issues early to protect your fields.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_rgba(183,255,42,0.1)] transition-all duration-500 hover:-translate-y-2 relative h-[380px] border border-white/10">
              <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600" alt="Higher Profit" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20 group-hover:bg-[#B7FF2A] group-hover:text-[#0B4D1E] transition-colors duration-300">
                  <Coins className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">Higher Profit</h4>
                <p className="text-white/80 text-sm font-medium leading-relaxed">Better yields and direct sales equal much higher profits.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_rgba(183,255,42,0.1)] transition-all duration-500 hover:-translate-y-2 relative h-[380px] border border-white/10">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" alt="No Middlemen" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent flex flex-col justify-end p-8 w-full">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20 group-hover:bg-[#0B4D1E] transition-colors duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">No Middlemen</h4>
                <p className="text-white/80 text-sm font-medium leading-relaxed">Connect straight to verifiable buyers for top prices.</p>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* 6. CALL TO ACTION SECTION (High Contrast) */}
        <section className="py-40 relative bg-transparent overflow-hidden">
          <div className="max-w-4xl px-6 mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white leading-tight">Start your smart farming journey today.</h2>
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-medium">
            Join thousands of modern farmers increasing their yield and profits through the power of AI.
          </p>
          <Link
            href="/dashboard"
            className="group inline-flex items-center justify-center px-10 py-5 text-lg font-black text-[#0B4D1E] transition-all bg-[#B7FF2A] rounded-full hover:bg-white hover:scale-105 shadow-[0_10px_40px_rgba(183,255,42,0.3)]"
          >
            Launch Dashboard <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        </section>

        {/* FOOTER */}
        <footer className="text-white/50 py-16 text-center border-t border-white/5 bg-[#021407] relative z-20">
          <div className="flex items-center justify-center mb-6 hover:scale-105 transition-transform cursor-pointer w-max mx-auto">
            <img src="/logo.png" alt="SmartAgri Logo" className="h-16 w-auto object-contain rounded-2xl shadow-[0_5px_20px_rgba(255,255,255,0.05)]" />
          </div>
          <p className="text-sm font-medium">© {new Date().getFullYear()} SmartAgri Platform. All rights reserved. Cultivating the future.</p>
        </footer>
      </div>
    </div>
  );
}
