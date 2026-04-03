"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Leaf, 
  Sprout, 
  ShoppingCart, 
  ArrowRight, 
  CheckCircle2,
  Loader2
} from 'lucide-react';
import axiosInstance from '../util/axiosInstance';
import { API_PATHS } from '../util/apiPaths';
import { useAuth } from '../context/AuthContext';

type Role = 'farmer' | 'buyer' | 'delivery' | null;
type Step = 1 | 2 | 3; // 3 is success

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { login } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    // Farmer fields
    farmSize: '',
    cropTypes: '',
    experience: '',
    farmLocationDetails: '',
    // Buyer fields
    businessName: '',
    buyingPurpose: '',
    preferredCropTypes: '',
    // Delivery fields
    vehicleNumber: '',
    vehicleType: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (!role) {
      setError('Please select an account type to continue.');
      return;
    }
    setError('');
    setStep(2);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setError('');

    const newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (role === 'farmer') {
      if (!formData.cropTypes) newErrors.cropTypes = 'Primary crop types are required';
      if (!formData.farmSize) newErrors.farmSize = 'Total farm size is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        roleName: role?.toUpperCase(),
        // Farmer fields
        farmSize: formData.farmSize,
        cropTypes: formData.cropTypes,
        experience: formData.experience ? parseInt(formData.experience) : null,
        farmLocationDetails: formData.farmLocationDetails,
        // Buyer fields
        businessName: formData.businessName,
        buyingPurpose: formData.buyingPurpose,
        preferredCropTypes: formData.preferredCropTypes
      });

      const data = response.data;

      setStep(3);
      if (data.token) {
        login(data.token, {
          email: data.email || formData.email,
          name: data.fullName || formData.name,
          roles: data.roles || (role ? [role.toUpperCase()] : [])
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (err instanceof Error ? err.message : 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#021407]">
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        <img src="/plants.jpg" alt="Farming Texture" className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-70" />
        <div className="absolute inset-0 bg-[#021407]/60"></div>
      </div>

      {/* Main Layout Area */}
      <div className="fixed inset-0 overflow-y-auto no-scrollbar pt-24 pb-12 z-10 flex flex-col items-center">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-[#B7FF2A] transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-10 w-full max-w-2xl px-6">
          <Link href="/">
            <img src="/logo.png" alt="GoviSaviya Logo" className="h-16 w-auto object-contain rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] mb-6 hover:scale-105 transition-transform" />
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 text-center">
            {step === 1 && "Join GoviSaviya"}
            {step === 2 && (role === 'farmer' ? "Farmer Registration" : "Buyer Registration")}
            {step === 3 && "Welcome Aboard!"}
          </h1>
          <p className="text-white/60 text-lg font-medium text-center">
            {step === 1 && "Select how you'll use our platform."}
            {step === 2 && "Tell us a bit about yourself."}
            {step === 3 && "Your account has been successfully created."}
          </p>
        </div>

        {/* Dynamic Card Container */}
        <div className={`w-full max-w-xl px-4 md:px-0 transition-all duration-500 ease-out transform relative z-20 ${step === 3 ? 'scale-105 opacity-100' : 'scale-100 opacity-100'}`}>
          <div className="absolute -inset-4 bg-black/40 blur-3xl rounded-full z-[-1]"></div>
          <div className="bg-[#021407]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            
            {/* Contextual Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-semibold text-center animate-pulse">
                {error}
              </div>
            )}

            {/* STEP 1: ROLE SELECTION */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
                {/* Farmer Option */}
                <div 
                  onClick={() => setRole('farmer')}
                  className={`relative overflow-hidden cursor-pointer group flex items-center gap-6 p-6 rounded-3xl border-2 transition-all duration-300 ${role === 'farmer' ? 'border-[#B7FF2A] bg-[#B7FF2A]/10 shadow-[0_0_30px_rgba(183,255,42,0.1)]' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors shadow-lg ${role === 'farmer' ? 'bg-[#B7FF2A] text-[#0B4D1E]' : 'bg-white/10 text-white/70 group-hover:text-white'}`}>
                    <Sprout className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-1">Farmer</h3>
                    <p className="text-white/50 font-medium text-sm leading-snug">Access crop analytics, predict yields, and connect directly with high-paying verified buyers.</p>
                  </div>
                  {role === 'farmer' && <div className="absolute top-4 right-4 text-[#B7FF2A]"><CheckCircle2 className="w-6 h-6 fill-[#B7FF2A]/20" /></div>}
                </div>

                {/* Buyer Option */}
                <div 
                  onClick={() => setRole('buyer')}
                  className={`relative overflow-hidden cursor-pointer group flex items-center gap-6 p-6 rounded-3xl border-2 transition-all duration-300 ${role === 'buyer' ? 'border-[#39C400] bg-[#39C400]/10 shadow-[0_0_30px_rgba(57,196,0,0.1)]' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors shadow-lg ${role === 'buyer' ? 'bg-[#39C400] text-white' : 'bg-white/10 text-white/70 group-hover:text-white'}`}>
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-1">Buyer / Vendor</h3>
                    <p className="text-white/50 font-medium text-sm leading-snug">Browse live crop data, discover verified farmers, and purchase premium yields securely.</p>
                  </div>
                  {role === 'buyer' && <div className="absolute top-4 right-4 text-[#39C400]"><CheckCircle2 className="w-6 h-6 fill-[#39C400]/20" /></div>}
                </div>

                {/* Delivery Person Option */}
                <div 
                  onClick={() => setRole('delivery')}
                  className={`relative overflow-hidden cursor-pointer group flex items-center gap-6 p-6 rounded-3xl border-2 transition-all duration-300 ${role === 'delivery' ? 'border-[#FFB72A] bg-[#FFB72A]/10 shadow-[0_0_30px_rgba(255,183,42,0.1)]' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors shadow-lg ${role === 'delivery' ? 'bg-[#FFB72A] text-[#5C3E00]' : 'bg-white/10 text-white/70 group-hover:text-white'}`}>
                    <Leaf className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-1">Delivery Person</h3>
                    <p className="text-white/50 font-medium text-sm leading-snug">Register your vehicle, accept delivery jobs from farmers, and earn by delivering fresh produce.</p>
                  </div>
                  {role === 'delivery' && <div className="absolute top-4 right-4 text-[#FFB72A]"><CheckCircle2 className="w-6 h-6 fill-[#FFB72A]/20" /></div>}
                </div>

                <div className="pt-6">
                  <button 
                    onClick={handleNextStep}
                    className={`w-full py-4 text-black rounded-full font-black text-lg transition-all flex items-center justify-center gap-3 ${role ? 'bg-white hover:bg-[#B7FF2A] hover:scale-105 shadow-[0_10px_30px_rgba(255,255,255,0.2)]' : 'bg-white/30 text-white/50 cursor-not-allowed'}`}
                  >
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: REGISTRATION FORM */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info (Shared) */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" className={`w-full px-5 py-4 bg-black/40 border ${errors.name ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#B7FF2A] focus:ring-[#B7FF2A]'} rounded-2xl focus:outline-none focus:ring-1 text-white placeholder:text-white/20 transition-all font-medium`} />
                    {errors.name && <p className="text-red-400 text-xs font-semibold px-2">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className={`w-full px-5 py-4 bg-black/40 border ${errors.email ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#B7FF2A] focus:ring-[#B7FF2A]'} rounded-2xl focus:outline-none focus:ring-1 text-white placeholder:text-white/20 transition-all font-medium`} />
                    {errors.email && <p className="text-red-400 text-xs font-semibold px-2">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 234 567 8900" className={`w-full px-5 py-4 bg-black/40 border ${errors.phone ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#B7FF2A] focus:ring-[#B7FF2A]'} rounded-2xl focus:outline-none focus:ring-1 text-white placeholder:text-white/20 transition-all font-medium`} />
                    {errors.phone && <p className="text-red-400 text-xs font-semibold px-2">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5 md:col-span-2 relative">
                     <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Location / Region</label>
                     <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="City, State or Region" className={`w-full px-5 py-4 bg-black/40 border ${errors.location ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#B7FF2A] focus:ring-[#B7FF2A]'} rounded-2xl focus:outline-none focus:ring-1 text-white placeholder:text-white/20 transition-all font-medium`} />
                     {errors.location && <p className="text-red-400 text-xs font-semibold px-2">{errors.location}</p>}
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Secure Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className={`w-full px-5 py-4 bg-black/40 border ${errors.password ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#B7FF2A] focus:ring-[#B7FF2A]'} rounded-2xl focus:outline-none focus:ring-1 text-white placeholder:text-white/20 transition-all font-medium`} />
                    {errors.password && <p className="text-red-400 text-xs font-semibold px-2">{errors.password}</p>}
                  </div>

                  <div className="w-full h-px bg-white/10 md:col-span-2 my-2"></div>

                  {/* Farmer Specific Fields */}
                  {role === 'farmer' && (
                    <>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Primary Crop Types</label>
                        <input type="text" name="cropTypes" value={formData.cropTypes} onChange={handleInputChange} placeholder="e.g. Tomatoes, Rice, Wheat" className={`w-full px-5 py-4 bg-black/40 border ${errors.cropTypes ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#B7FF2A] focus:ring-[#B7FF2A]'} rounded-2xl focus:outline-none focus:ring-1 text-white placeholder:text-white/20 transition-all font-medium`} />
                        {errors.cropTypes && <p className="text-red-400 text-xs font-semibold px-2">{errors.cropTypes}</p>}
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Total Farm Size</label>
                        <input type="text" name="farmSize" value={formData.farmSize} onChange={handleInputChange} placeholder="e.g. 50 Acres / 20 Hectares" className={`w-full px-5 py-4 bg-black/40 border ${errors.farmSize ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#B7FF2A] focus:ring-[#B7FF2A]'} rounded-2xl focus:outline-none focus:ring-1 text-white placeholder:text-white/20 transition-all font-medium`} />
                        {errors.farmSize && <p className="text-red-400 text-xs font-semibold px-2">{errors.farmSize}</p>}
                      </div>
                    </>
                  )}

                  {/* Buyer Specific Fields */}
                  {role === 'buyer' && (
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Business/Company Name <span className="text-white/30 lowercase">(Optional)</span></label>
                      <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} placeholder="Fresh Foods Ltd." className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-[#39C400] focus:ring-1 focus:ring-[#39C400] text-white placeholder:text-white/20 transition-all font-medium" />
                    </div>
                  )}

                  {/* Delivery Specific Fields */}
                  {role === 'delivery' && (
                    <>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Vehicle Number</label>
                        <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleInputChange} placeholder="WP ABC-1234" className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-[#FFB72A] focus:ring-1 focus:ring-[#FFB72A] text-white placeholder:text-white/20 transition-all font-medium" />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/50 px-2">Vehicle Type</label>
                        <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} placeholder="e.g. Bike, Mini Truck, Car" className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-[#FFB72A] focus:ring-1 focus:ring-[#FFB72A] text-white placeholder:text-white/20 transition-all font-medium" />
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setStep(1)} disabled={loading} className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-colors disabled:opacity-50">
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                  <button type="submit" disabled={loading} className={`flex-1 py-4 font-black text-lg transition-all rounded-[2rem] flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none ${role === 'farmer' ? 'bg-[#B7FF2A] text-[#0B4D1E] hover:bg-white' : role === 'delivery' ? 'bg-[#FFB72A] text-[#5C3E00] hover:bg-white' : 'bg-[#39C400] text-white hover:bg-white hover:text-[#0B4D1E]'}`}>
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Create Account'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-[#B7FF2A]/20 rounded-full flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-[#B7FF2A] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(183,255,42,0.6)]">
                    <CheckCircle2 className="w-10 h-10 text-[#0B4D1E]" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Registration Complete</h3>
                <p className="text-white/60 font-medium mb-10 max-w-sm">
                  We've configured your {role === 'farmer' ? 'dashboard with crop intelligence' : 'marketplace portal'}. You're fully ready to scale.
                </p>
                <Link href="/login" className="px-10 py-4 bg-white text-black font-extrabold rounded-full hover:bg-[#B7FF2A] transition-colors shadow-xl w-full">
                  Go to Login
                </Link>
              </div>
            )}

          </div>

          {/* Fixed Footer Note */}
          <div className="mt-8 text-center px-4">
             <p className="text-white/50 font-medium text-sm">
               Already have an account?{' '}
               <Link href="/login" className="text-white font-bold hover:text-[#B7FF2A] transition-colors underline decoration-white/30 underline-offset-4">Log in</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
