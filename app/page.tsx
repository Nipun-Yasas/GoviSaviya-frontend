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
  ArrowUpRight
} from 'lucide-react';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden bg-secondary">
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
            
            <div className="flex items-center gap-2 font-medium text-lg tracking-tight ml-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-green-500 flex items-center justify-center shadow-inner">
                 <Leaf className="w-4 h-4 text-white" />
              </div>
              SmartAgri
            </div>
            
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-white/80">
              <Link href="#" className="hover:text-white transition-colors">Product</Link>
              <Link href="#" className="hover:text-white transition-colors">About Us</Link>
              <Link href="#" className="hover:text-white transition-colors">Services</Link>
              <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="#" className="hover:text-white transition-colors">Blog</Link>
            </nav>

            <Link
              href="/login"
              className="hidden sm:flex items-center gap-3 pl-5 pr-1 py-1 text-sm font-semibold text-black bg-white rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Contact Us
              <div className="w-8 h-8 flex items-center justify-center bg-[#063b27] rounded-full text-white">
                <ArrowUpRight className="w-4 h-4 ml-0.5" />
              </div>
            </Link>
            
          </header>
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
      <section id="features" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute -top-[300px] -right-[300px] w-[800px] h-[800px] bg-gray-50 rounded-full blur-[100px] -z-10"></div>
        <div className="max-w-7xl px-6 mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black tracking-[0.2em] text-[#008F00] uppercase mb-4">Powerful Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">Intelligence at your fingertips.</h3>
            <p className="mt-6 text-lg text-zinc-500 max-w-2xl mx-auto font-medium">Discover the precision tools empowering modern farmers to detect issues early and scale effectively without lifting a finger.</p>
          </div>

          {/* Interactive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[320px]">
            
            {/* Bento 1: Large Image Feature */}
            <div className="md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 group rounded-3xl bg-zinc-50 overflow-hidden relative border border-zinc-100 hover:border-[#1FAA00]/30 transition-all duration-500 hover:shadow-2xl">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1629881622312-d04b6134dc15?q=80&w=800" alt="Crop Disease" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
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
                <Image src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800" alt="Weather" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-md group-hover:bg-white/60 transition-colors duration-500"></div>
              </div>
              <div className="relative p-8 flex flex-col justify-center h-full z-10">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 text-zinc-900 shadow-md group-hover:bg-[#1FAA00] group-hover:text-white transition-colors duration-300">
                  <CloudSun className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 mb-2">Real-time Weather Analytics</h4>
                <p className="text-zinc-700 text-sm leading-relaxed font-medium">
                  Hyper-local weather insights driven by precise satellite data to make timely decisions.
                </p>
              </div>
            </div>

            {/* Bento 3: Yield */}
            <div className="md:col-span-1 lg:col-span-1 row-span-1 group rounded-3xl overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 w-full h-full">
                <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800" alt="Yield Fields" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-[#0B4D1E]/80 backdrop-blur-sm group-hover:bg-[#0B4D1E]/60 transition-colors duration-500"></div>
              </div>
              <div className="relative p-8 flex flex-col justify-center h-full z-10 text-white">
                <div className="w-12 h-12 bg-[#B7FF2A] rounded-xl flex items-center justify-center mb-6 text-[#0B4D1E] shadow-lg group-hover:-translate-y-1 transition-transform">
                  <BarChart className="w-5 h-5" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">Yield Prediction</h4>
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  Predict upcoming crop yields using historical soil and climate patterns.
                </p>
              </div>
            </div>

            {/* Bento 4: Marketplace */}
            <div className="md:col-span-2 lg:col-span-1 row-span-1 group rounded-3xl overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 w-full h-full">
                <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800" alt="Fresh Market" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-zinc-900/20 group-hover:from-zinc-900/80 transition-colors duration-500"></div>
              </div>
              <div className="relative p-8 flex flex-col justify-end h-full z-10 text-white">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-[#B7FF2A] border border-white/20">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Direct Marketplace</h4>
                <p className="text-white/70 text-sm leading-relaxed font-medium mb-4">
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

      {/* 3. HOW IT WORKS SECTION (Interactive Stepper) */}
      <section className="py-32 bg-zinc-50 relative border-y border-zinc-200">
        <div className="max-w-7xl px-6 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-black tracking-[0.2em] text-[#008F00] uppercase mb-4">Workflow</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">Three steps to modern farming.</h3>
            </div>
            <p className="text-lg text-zinc-500 font-medium max-w-sm">A seamless, intuitive process designed to integrate directly into your daily routine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative pb-10">
            {/* Connecting line for desktop under the cards */}
            <div className="hidden md:block absolute bottom-[88px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-zinc-200 via-[#1FAA00] to-zinc-200 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col group bg-white rounded-[2rem] border border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:border-[#39C400]/30 transition-all duration-500 hover:-translate-y-3 overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600" alt="Upload Data" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute top-4 right-4 text-4xl font-black text-white/50 group-hover:text-white transition-colors">01</div>
              </div>
              <div className="p-8 pt-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-[#0B4D1E] shadow-xl border border-zinc-100 -mt-12 relative z-20 group-hover:bg-[#0B4D1E] group-hover:text-[#B7FF2A] transition-colors duration-300">
                  <Camera className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 mb-3">Upload your Data</h4>
                <p className="text-zinc-500 text-base leading-relaxed font-medium">Easily take a picture of your crop or input directly into the app.</p>
              </div>
              {/* Timeline dot */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-200 border-4 border-white group-hover:bg-[#39C400] transition-colors duration-300 shadow-sm"></div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col group bg-white rounded-[2rem] border border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:border-[#39C400]/30 transition-all duration-500 hover:-translate-y-3 overflow-hidden md:mt-12">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600" alt="AI Analyzes" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute top-4 right-4 text-4xl font-black text-white/50 group-hover:text-white transition-colors">02</div>
              </div>
              <div className="p-8 pt-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-[#006400] shadow-xl border border-zinc-100 -mt-12 relative z-20 group-hover:bg-[#0B4D1E] group-hover:text-[#B7FF2A] transition-colors duration-300">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 mb-3">AI Engine Analyzes</h4>
                <p className="text-zinc-500 text-base leading-relaxed font-medium">Our advanced smart models process your data in seconds to find anomalies.</p>
              </div>
              {/* Timeline dot */}
              <div className="absolute -bottom-10 md:bottom-auto md:-top-16 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-200 border-4 border-white group-hover:bg-[#39C400] transition-colors duration-300 shadow-sm md:mt-4"></div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col group bg-white rounded-[2rem] border border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:border-[#006400] transition-all duration-500 hover:-translate-y-3 overflow-hidden">
               <div className="relative h-48 w-full overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=600" alt="Instant Insights" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute top-4 right-4 text-4xl font-black text-white/50 group-hover:text-[#B7FF2A] transition-colors">03</div>
              </div>
              <div className="p-8 pt-6 bg-[#0B4D1E] h-full">
                <div className="w-14 h-14 bg-[#B7FF2A] rounded-2xl flex items-center justify-center mb-6 text-[#0B4D1E] shadow-xl border-4 border-[#0B4D1E] -mt-12 relative z-20 transition-transform duration-300 group-hover:scale-110">
                  <Sprout className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Instant Insights</h4>
                <p className="text-[#8EF300]/80 text-base leading-relaxed font-medium">Receive perfectly accurate insights and take the right action immediately.</p>
              </div>
              {/* Timeline dot */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-200 border-4 border-white group-hover:bg-[#B7FF2A] transition-colors duration-300 shadow-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DASHBOARD PREVIEW SECTION (Clean Interface) */}
      <section className="py-32 bg-white overflow-hidden relative border-b border-gray-100">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[400px] bg-[#F7FAF7] rounded-[100%] blur-[80px] -z-10"></div>
        <div className="max-w-7xl px-6 mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-6 tracking-tight">Your Farming Command Center</h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto">Everything you need to manage your farm in one beautifully designed intelligent interface.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Interactive Dashboard Container */}
            <div className="p-4 md:p-8 bg-white/50 backdrop-blur-3xl rounded-[3rem] shadow-[0_20px_80px_rgba(0,0,0,0.07)] border border-white relative group">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Main disease panel mock */}
                <div className="md:col-span-7 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 flex flex-col gap-6 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
                  <div className="flex justify-between items-center pb-5 border-b border-zinc-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#F0FAF0] text-[#006400] rounded-2xl">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-zinc-900 text-lg leading-tight">Disease Scan Result</h5>
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Today, 09:41 AM</span>
                      </div>
                    </div>
                    <span className="px-4 py-1.5 bg-red-50 text-red-600 text-xs font-black uppercase tracking-wider rounded-full border border-red-100">High Risk</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-full sm:w-36 h-36 bg-zinc-50 rounded-2xl overflow-hidden relative shrink-0 border border-zinc-200">
                      <Image src="https://images.unsplash.com/photo-1592982537447-6f296d9b24b4?q=80&w=200" alt="Blight" fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center w-full">
                      <h6 className="font-extrabold text-zinc-900 mb-2 text-2xl">Tomato Blight Detected</h6>
                      <p className="text-sm font-bold text-[#1FAA00] mb-4 uppercase tracking-wider">AI Confidence: 94.2%</p>
                      <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 w-[94%] h-full rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col gap-6">
                  {/* Weather panel mock */}
                  <div className="bg-zinc-900 p-8 rounded-3xl shadow-xl text-white transform transition-transform duration-500 group-hover:-translate-y-2 relative overflow-hidden group/weather">
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
                  <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-zinc-100">
                      <div className="p-3 bg-zinc-50 text-zinc-900 rounded-2xl border border-zinc-200/50">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                      <h5 className="font-bold text-zinc-900 text-lg">Active Offers</h5>
                    </div>
                    <div className="flex justify-between items-center py-4 px-5 bg-zinc-50 rounded-2xl mb-3 border border-zinc-200/50 hover:bg-[#F0FAF0] hover:border-[#39C400]/30 transition-colors cursor-pointer">
                      <span className="text-sm font-bold text-zinc-900">100kg Tomatoes</span>
                      <span className="text-sm font-black text-[#006400] bg-white px-3 py-1 rounded-lg border border-zinc-100 shadow-sm">$120.00</span>
                    </div>
                    <div className="flex justify-between items-center py-4 px-5 bg-zinc-50 rounded-2xl border border-zinc-200/50 hover:bg-[#F0FAF0] hover:border-[#39C400]/30 transition-colors cursor-pointer">
                      <span className="text-sm font-bold text-zinc-900">50kg Rice</span>
                      <span className="text-sm font-black text-[#006400] bg-white px-3 py-1 rounded-lg border border-zinc-100 shadow-sm">$45.00</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION (Minimalist Typography) */}
      <section className="py-32 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl px-6 mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-zinc-900 tracking-tight">Why Choose SmartAgri?</h2>
            <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-medium">Measurable results that matter to your livelihood and farming future.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            <div className="group overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative h-[380px]">
              <Image src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600" alt="Increase Yield" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20 group-hover:bg-[#39C400] transition-colors duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">Increase Yield</h4>
                <p className="text-white/80 text-sm font-medium leading-relaxed">Optimize your harvest with data-driven predictions.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative h-[380px]">
              <Image src="https://images.unsplash.com/photo-1530836369250-ef71a3a5e48c?q=80&w=600" alt="Stop Diseases" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20 group-hover:bg-[#1FAA00] transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">Stop Diseases</h4>
                <p className="text-white/80 text-sm font-medium leading-relaxed">Catch crop health issues early to protect your fields.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative h-[380px]">
              <Image src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=600" alt="Higher Profit" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20 group-hover:bg-[#B7FF2A] group-hover:text-[#0B4D1E] transition-colors duration-300">
                  <Coins className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold mb-2 text-white">Higher Profit</h4>
                <p className="text-white/80 text-sm font-medium leading-relaxed">Better yields and direct sales equal much higher profits.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative h-[380px]">
              <Image src="https://images.unsplash.com/photo-1628102491629-77858c6530a6?q=80&w=600" alt="No Middlemen" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
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
      <section className="py-40 relative overflow-hidden bg-[#0B4D1E]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1FAA00] rounded-full blur-[150px] opacity-20 -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#B7FF2A] rounded-full blur-[150px] opacity-10 -z-10 -translate-x-1/2 translate-y-1/2"></div>
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
      <footer className="bg-zinc-950 text-zinc-400 py-16 text-center border-t border-zinc-900">
        <div className="flex items-center justify-center gap-2 mb-6 hover:text-white transition-colors cursor-pointer w-max mx-auto">
          <div className="p-1.5 bg-zinc-900 rounded-lg">
            <Leaf className="w-5 h-5 text-[#B7FF2A]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">SmartAgri</span>
        </div>
        <p className="text-sm font-medium">© {new Date().getFullYear()} SmartAgri Platform. All rights reserved. Cultivating the future.</p>
      </footer>
    </div>
  );
}
