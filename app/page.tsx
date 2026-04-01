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

      {/* 2. FEATURES SECTION */}
      <section id="features" className="py-24 bg-backgroundSecondary text-foreground">
        <div className="max-w-7xl px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-textLoop uppercase mb-3">Core Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-textPrimary">Everything you need to grow smarter</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-hoverPrimary rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-borderPrimary">
              <div className="w-14 h-14 bg-backgroundSecondary rounded-xl flex items-center justify-center mb-6 text-primary shadow-sm border border-borderPrimary">
                <Leaf className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-textPrimary mb-3 flex items-center gap-2">
                Crop Disease Detection <span className="text-2xl">🌿</span>
              </h4>
              <p className="text-textSecondary">
                Upload plant images and detect diseases instantly using our advanced AI computer vision models.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-hoverPrimary rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-borderPrimary">
              <div className="w-14 h-14 bg-backgroundSecondary rounded-xl flex items-center justify-center mb-6 text-primary shadow-sm border border-borderPrimary">
                <CloudSun className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-textPrimary mb-3 flex items-center gap-2">
                Weather Forecasting <span className="text-2xl">🌦️</span>
              </h4>
              <p className="text-textSecondary">
                Get real-time, hyper-local weather insights to make better and timely farming decisions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-hoverPrimary rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-borderPrimary">
              <div className="w-14 h-14 bg-backgroundSecondary rounded-xl flex items-center justify-center mb-6 text-primary shadow-sm border border-borderPrimary">
                <BarChart className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-textPrimary mb-3 flex items-center gap-2">
                Yield Prediction <span className="text-2xl">📊</span>
              </h4>
              <p className="text-textSecondary">
                Predict your upcoming crop yield using historical climate patterns, soil data, and machine learning.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-hoverPrimary rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-borderPrimary lg:col-start-1 lg:col-end-2">
              <div className="w-14 h-14 bg-backgroundSecondary rounded-xl flex items-center justify-center mb-6 text-primary shadow-sm border border-borderPrimary">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-textPrimary mb-3 flex items-center gap-2">
                Marketplace <span className="text-2xl">🛒</span>
              </h4>
              <p className="text-textSecondary">
                Bypass the middlemen. Sell your crops directly to buyers and businesses at the best prices.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-hoverPrimary rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-borderPrimary lg:col-start-2 lg:col-end-4 md:col-span-2">
              <div className="w-14 h-14 bg-backgroundSecondary rounded-xl flex items-center justify-center mb-6 text-primary shadow-sm border border-borderPrimary">
                <Bot className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-textPrimary mb-3 flex items-center gap-2">
                AI Farming Assistant <span className="text-2xl">🤖</span>
              </h4>
              <p className="text-textSecondary">
                Access a 24/7 intelligent chatbot trained on vast agricultural databases. Ask farming questions and get instant, reliable AI answers in your preferred language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-24 bg-background border-y border-borderPrimary">
        <div className="max-w-7xl px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-4">How SmartAgri Works</h2>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto">Three simple steps to transform your farming experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mt-10">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[48px] left-[16%] right-[16%] h-1 bg-gradient-to-r from-hoverPrimary via-borderPrimary to-hoverPrimary z-0 rounded-full"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-backgroundSecondary rounded-full flex items-center justify-center shadow-lg border-4 border-hoverPrimary mb-6 relative">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-btnHoverText font-bold rounded-full flex items-center justify-center border-2 border-backgroundSecondary shadow-md">1</span>
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-textPrimary mb-2 flex items-center gap-2 text-center justify-center">Upload Data <span className="text-xl">📸</span></h4>
              <p className="text-textSecondary">Take a picture of your crop or input your basic farm details into the app.</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-backgroundSecondary rounded-full flex items-center justify-center shadow-lg border-4 border-hoverPrimary mb-6 relative">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-secondary text-btnHoverText font-bold rounded-full flex items-center justify-center border-2 border-backgroundSecondary shadow-md">2</span>
                <Cpu className="w-10 h-10 text-secondary" />
              </div>
              <h4 className="text-xl font-bold text-textPrimary mb-2 flex items-center gap-2 text-center justify-center">AI Analyzes <span className="text-xl">🤖</span></h4>
              <p className="text-textSecondary">Our advanced smart models securely process your data in seconds.</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-backgroundSecondary rounded-full flex items-center justify-center shadow-lg border-4 border-hoverPrimary mb-6 relative">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-textLoop text-btnHoverText font-bold rounded-full flex items-center justify-center border-2 border-backgroundSecondary shadow-md">3</span>
                <Sprout className="w-10 h-10 text-textLoop" />
              </div>
              <h4 className="text-xl font-bold text-textPrimary mb-2 flex items-center gap-2 text-center justify-center">Get Insights <span className="text-xl">🌱</span></h4>
              <p className="text-textSecondary">Receive accurate insights, market prices, and take the right action immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DASHBOARD PREVIEW SECTION */}
      <section className="py-24 bg-backgroundSecondary overflow-hidden">
        <div className="max-w-7xl px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-5">Your Farming Command Center</h2>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto">Everything you need to manage your farm in one beautifully designed dashboard.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hoverPrimary/80 rounded-full blur-3xl -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Main disease panel mock */}
              <div className="md:col-span-7 bg-background p-6 rounded-2xl shadow-xl border border-borderPrimary flex flex-col gap-4 transform transition-transform hover:-translate-y-1">
                <div className="flex justify-between items-center pb-4 border-b border-borderPrimary">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-hoverPrimary text-primary rounded-xl">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-textPrimary leading-tight">Disease Scan Result</h5>
                      <span className="text-xs font-medium text-textSecondary">Today, 09:41 AM</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full border border-destructive/20">High Risk</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-backgroundSecondary rounded-xl overflow-hidden relative shrink-0 shadow-inner">
                    <div className="absolute inset-0 bg-secondary opacity-60"></div>
                    <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-btnHoverText opacity-80" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h6 className="font-bold text-textPrimary mb-1 text-lg">Tomato Blight Detected 🌿</h6>
                    <p className="text-sm font-medium text-textSecondary mb-3">Confidence: 94.2%</p>
                    <div className="w-full bg-backgroundSecondary h-2.5 rounded-full overflow-hidden shadow-inner border border-borderPrimary">
                      <div className="bg-destructive w-[94%] h-full rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-6">
                {/* Weather panel mock */}
                <div className="bg-secondary p-6 rounded-2xl shadow-xl text-btnHoverText transform transition-transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="font-medium text-background mb-1">Farm Weather <span className="text-lg">🌦️</span></h5>
                      <h2 className="text-4xl md:text-5xl font-bold text-btnHoverText">28°C</h2>
                    </div>
                    <div className="p-2 bg-backgroundSecondary/20 rounded-xl backdrop-blur-sm">
                      <CloudSun className="w-10 h-10 text-textLoop" />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-background pt-4 border-t border-background/20 font-medium">
                    <span>Humidity: 65%</span>
                    <span>Rain expected in 2h</span>
                  </div>
                </div>

                {/* Marketplace panel mock */}
                <div className="bg-background p-6 rounded-2xl shadow-xl border border-borderPrimary transform transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-borderPrimary">
                    <div className="p-2.5 bg-hoverPrimary text-primary rounded-xl">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-textPrimary">Active Requests 🛒</h5>
                  </div>
                  <div className="flex justify-between items-center py-2.5 px-3.5 bg-backgroundSecondary rounded-xl mb-3 border border-borderPrimary transition-colors hover:bg-hoverPrimary">
                    <span className="text-sm font-semibold text-textPrimary">100kg Tomatoes</span>
                    <span className="text-sm font-bold text-primary bg-hoverPrimary px-2.5 py-1 rounded-md border border-borderPrimary/50">$120.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 px-3.5 bg-backgroundSecondary rounded-xl border border-borderPrimary transition-colors hover:bg-hoverPrimary">
                    <span className="text-sm font-semibold text-textPrimary">50kg Rice</span>
                    <span className="text-sm font-bold text-primary bg-hoverPrimary px-2.5 py-1 rounded-md border border-borderPrimary/50">$45.00</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION */}
      <section className="py-24 bg-card text-card-foreground relative overflow-hidden border-y border-borderPrimary">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mt-32 -mr-32 w-96 h-96 bg-hoverPrimary rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl px-6 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-sm text-textPrimary">Why Choose SmartAgri?</h2>
            <p className="text-textSecondary text-lg max-w-2xl mx-auto">Measurable results that matter to your livelihood and farming future.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-backgroundSecondary/60 backdrop-blur-md p-8 rounded-2xl border border-borderPrimary text-center hover:bg-hoverPrimary/60 transition-all hover:-translate-y-2 shadow-xl">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-btnHoverText shadow-lg rotate-3">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-textPrimary">Increase Yield <span className="text-xl">🌾</span></h4>
              <p className="text-textSecondary text-sm font-medium leading-relaxed">Optimize your harvest with data-driven predictions and smart farming.</p>
            </div>
            <div className="bg-backgroundSecondary/60 backdrop-blur-md p-8 rounded-2xl border border-borderPrimary text-center hover:bg-hoverPrimary/60 transition-all hover:-translate-y-2 shadow-xl">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 text-btnHoverText shadow-lg -rotate-3">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-textPrimary">Reduce Diseases <span className="text-xl">🌿</span></h4>
              <p className="text-textSecondary text-sm font-medium leading-relaxed">Catch crop health issues early before they spread and protect your investment.</p>
            </div>
            <div className="bg-backgroundSecondary/60 backdrop-blur-md p-8 rounded-2xl border border-borderPrimary text-center hover:bg-hoverPrimary/60 transition-all hover:-translate-y-2 shadow-xl">
              <div className="w-16 h-16 bg-textLoop rounded-2xl flex items-center justify-center mx-auto mb-6 text-btnHoverText shadow-lg rotate-3">
                <Coins className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-textPrimary">Increase Income <span className="text-xl">💰</span></h4>
              <p className="text-textSecondary text-sm font-medium leading-relaxed">Better yield and direct sales means significantly more profit for your family.</p>
            </div>
            <div className="bg-backgroundSecondary/60 backdrop-blur-md p-8 rounded-2xl border border-borderPrimary text-center hover:bg-hoverPrimary/60 transition-all hover:-translate-y-2 shadow-xl">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 text-btnHoverText shadow-lg -rotate-3">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-textPrimary">No Middlemen <span className="text-xl">🛒</span></h4>
              <p className="text-textSecondary text-sm font-medium leading-relaxed">Connect directly to end buyers in our verified marketplace for best prices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[url('/paddy_field.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-4xl px-6 mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-sm text-btnHoverText">Start your smart farming journey today</h2>
          <p className="text-xl text-background mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of modern farmers increasing their yield and profits through the power of AI.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-primary transition-all bg-backgroundSecondary rounded-full hover:bg-hoverPrimary hover:scale-105 shadow-2xl"
          >
            Launch Dashboard <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-backgroundSecondary py-12 text-center border-t border-borderPrimary">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-1.5 bg-primary/20 rounded-lg">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">SmartAgri</span>
        </div>
        <p className="text-sm opacity-80">© {new Date().getFullYear()} SmartAgri Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
