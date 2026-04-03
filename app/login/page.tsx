"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Leaf } from 'lucide-react';
import axiosInstance from '../util/axiosInstance';
import { API_PATHS } from '../util/apiPaths';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setError('');
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const data = response.data;

      // Store auth data
      if (data.token) {
        login(data.token, {
          email: data.email,
          name: data.fullName,
          roles: data.roles || []
        });
      }

      // Role-based redirection
      const roles = data.roles || [];
      if (roles.includes('ADMIN')) {
        router.push('/dashboard/admin');
      } else if (roles.includes('FARMER')) {
        router.push('/dashboard/farmer');
      } else if (roles.includes('BUYER')) {
        router.push('/dashboard/buyer');
      } else {
        router.push('/dashboard');
      }

    } catch (err: any) {
      setError(err.response?.data?.message || (err instanceof Error ? err.message : 'Login failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-white relative overflow-hidden bg-[#021407]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/plants.jpg" alt="Farming Background" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-[#021407]/50"></div>
      </div>

      {/* Content */}
      <div className="fixed inset-0 overflow-y-auto no-scrollbar pt-16 pb-12 z-10 flex flex-col items-center justify-center">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-[#B7FF2A] transition-colors font-medium bg-black/20 px-4 py-2 rounded-full backdrop-blur-md">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>
        
        <div className="w-full max-w-lg px-4 md:px-0 relative z-20">
          <div className="absolute -inset-4 bg-black/40 blur-3xl rounded-full z-[-1]"></div>
          <div className="bg-[#021407]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_120px_rgba(0,0,0,0.9)] transition-shadow duration-500">
            <div className="flex justify-center mb-8">
              <Link href="/" className="inline-block">
                <img src="/logo.png" alt="GoviSaviya Logo" className="h-16 w-auto object-contain rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
              </Link>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-center text-white">Welcome back</h1>
            <p className="text-white/80 mb-8 font-medium text-center text-lg">Log in to your command center.</p>

            <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-semibold flex items-center justify-center">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-white/90 px-1">Email Address</label>
              <input
                type="email"
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-5 py-4 bg-white/5 border ${errors.email ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#B7FF2A] focus:ring-[#B7FF2A]'} rounded-2xl focus:outline-none focus:ring-1 text-white placeholder:text-white/30 transition-all font-medium`}
              />
              {errors.email && <p className="text-red-400 text-xs font-semibold px-2">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-white/90">Password</label>
                <Link href="#" className="text-xs font-bold text-[#B7FF2A] hover:underline">Forgot password?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-4 bg-white/5 border ${errors.password ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#B7FF2A] focus:ring-[#B7FF2A]'} rounded-2xl focus:outline-none focus:ring-1 text-white placeholder:text-white/30 transition-all font-medium`}
              />
              {errors.password && <p className="text-red-400 text-xs font-semibold px-2">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#B7FF2A] text-[#0B4D1E] hover:bg-white rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(183,255,42,0.2)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-[#B7FF2A] disabled:hover:shadow-none mt-4"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Log In'}
            </button>
          </form>

          <p className="mt-8 text-center text-white/80 font-medium">
            Don't have an account?{' '}
            <Link href="/register" className="text-white font-bold hover:text-[#B7FF2A] transition-colors underline decoration-white/30 underline-offset-4">
              Sign up
            </Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
