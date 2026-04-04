"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  Smartphone, 
  MapPin, 
  Mail, 
  Loader2,
  AlertCircle,
  ChevronRight,
  MoreVertical,
  User as UserIcon,
  ToggleLeft,
  ToggleRight,
  UserCheck,
  UserX
} from "lucide-react";
import axiosInstance from "../../../util/axiosInstance";
import { API_PATHS } from "../../../util/apiPaths";

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  enabled: boolean;
  roles: string[];
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("ALL");
  const [submittingIds, setSubmittingIds] = useState<number[]>([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.ALL);
      setUsers(response.data || []);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please ensure you have administrative privileges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    setSubmittingIds(prev => [...prev, userId]);
    try {
      const endpoint = currentStatus 
        ? API_PATHS.USERS.DISABLE(userId) 
        : API_PATHS.USERS.ENABLE(userId);
      
      await axiosInstance.patch(endpoint);
      
      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, enabled: !currentStatus } 
          : user
      ));
    } catch (err: any) {
      alert(err.response?.data?.message || `Failed to ${currentStatus ? 'disable' : 'enable'} user.`);
    } finally {
      setSubmittingIds(prev => prev.filter(id => id !== userId));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === "ALL" || user.roles.includes(filterRole);
    
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 text-[10px] font-black uppercase border border-purple-500/20"><Shield className="w-2.5 h-2.5 mr-1" /> Admin</span>;
      case "FARMER":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-green-500/10 text-green-600 text-[10px] font-black uppercase border border-green-500/20"><UserIcon className="w-2.5 h-2.5 mr-1" /> Farmer</span>;
      case "BUYER":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase border border-blue-500/20"><UserIcon className="w-2.5 h-2.5 mr-1" /> Buyer</span>;
      case "DELIVERY":
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase border border-amber-500/20"><UserIcon className="w-2.5 h-2.5 mr-1" /> Delivery</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-500/10 text-slate-600 text-[10px] font-black uppercase border border-slate-500/20">{role}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
            <Users className="h-3.5 w-3.5 mr-1" /> System Administration
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2">
          User Management
        </h1>
        <p className="text-textSecondary text-lg font-medium">
          Manage system users, monitor their activities, and control their access to the platform.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search users by name, email, phone or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-backgroundSecondary border border-borderPrimary rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
           <Filter className="w-5 h-5 text-textSecondary mr-1" />
           <select 
             value={filterRole}
             onChange={(e) => setFilterRole(e.target.value)}
             className="bg-backgroundSecondary border border-borderPrimary rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm text-textPrimary min-w-[150px]"
           >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Administrators</option>
              <option value="FARMER">Farmers</option>
              <option value="BUYER">Buyers</option>
              <option value="DELIVERY">Delivery Personnel</option>
           </select>
        </div>
      </div>

      {error && (
        <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-3xl flex items-center gap-4 text-destructive">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <p className="font-bold text-sm">{error}</p>
          <button 
            onClick={fetchUsers}
            className="ml-auto px-4 py-2 bg-destructive text-white text-xs font-black rounded-xl hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
      )}

      <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
             <Loader2 className="w-12 h-12 animate-spin text-primary/40 mb-4" />
             <p className="text-textSecondary font-bold uppercase tracking-widest text-xs">Accessing User Database...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-6">
             <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-textSecondary/20" />
             </div>
             <p className="text-xl font-bold text-textPrimary mb-2">No users found</p>
             <p className="text-textSecondary font-medium max-w-sm">We couldn't find any users matching your current search or filter criteria.</p>
             <button 
                onClick={() => {setSearchTerm(""); setFilterRole("ALL");}}
                className="mt-6 text-primary font-black text-sm uppercase tracking-wider hover:underline"
             >
                Clear all filters
             </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-hoverPrimary/30 border-b border-borderPrimary text-left">
                  <th className="px-6 py-5 text-[10px] font-black text-textSecondary uppercase tracking-widest">User Information</th>
                  <th className="px-6 py-5 text-[10px] font-black text-textSecondary uppercase tracking-widest">Contact Details</th>
                  <th className="px-6 py-5 text-[10px] font-black text-textSecondary uppercase tracking-widest">Roles & Access</th>
                  <th className="px-6 py-5 text-[10px] font-black text-textSecondary uppercase tracking-widest text-right">Account Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderPrimary">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-hoverPrimary/5 transition-colors group">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border ${user.enabled ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                           <UserIcon className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="font-black text-textPrimary text-base mb-1 flex items-center gap-2">
                             {user.fullName}
                             {!user.enabled && <span className="px-1.5 py-0.5 rounded bg-destructive/10 text-destructive text-[8px] font-black">DISABLED</span>}
                           </p>
                           <p className="text-xs text-textSecondary flex items-center gap-1 font-medium">
                             <MapPin className="w-3 h-3" /> {user.location}
                           </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                       <div className="space-y-1.5">
                          <p className="text-sm font-bold text-textPrimary flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-textSecondary" /> {user.email}
                          </p>
                          <p className="text-xs text-textSecondary flex items-center gap-2 font-medium">
                            <Smartphone className="w-3.5 h-3.5 text-textSecondary" /> {user.phone}
                          </p>
                       </div>
                    </td>
                    <td className="px-6 py-6">
                       <div className="flex flex-wrap gap-2">
                          {user.roles.map((role, idx) => (
                            <React.Fragment key={idx}>
                              {getRoleBadge(role)}
                            </React.Fragment>
                          ))}
                       </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                       <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => toggleUserStatus(user.id, user.enabled)}
                            disabled={submittingIds.includes(user.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all shadow-sm active:scale-95 disabled:opacity-50 ${
                              user.enabled 
                              ? 'bg-destructive/10 text-destructive hover:bg-destructive hover:text-white border border-destructive/20' 
                              : 'bg-green-500/10 text-green-600 hover:bg-green-600 hover:text-white border border-green-500/20'
                            }`}
                          >
                            {submittingIds.includes(user.id) ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : user.enabled ? (
                              <>
                                <UserX className="w-3.5 h-3.5" />
                                Disable Access
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-3.5 h-3.5" />
                                Restore Access
                              </>
                            )}
                          </button>
                          
                          <button className="p-2 text-textSecondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all group-hover:bg-primary/5">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-backgroundSecondary border border-borderPrimary rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#39C400]/10 flex items-center justify-center text-[#39C400]">
                      <UserCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-textPrimary uppercase tracking-widest text-[10px]">Active Users</h4>
              </div>
              <p className="text-3xl font-black text-textPrimary">
                  {users.filter(u => u.enabled).length}
              </p>
              <p className="text-xs text-textSecondary mt-1 font-medium italic">Contributing to ecosystem</p>
          </div>
          
          <div className="bg-backgroundSecondary border border-borderPrimary rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                      <UserX className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-textPrimary uppercase tracking-widest text-[10px]">Disabled Accounts</h4>
              </div>
              <p className="text-3xl font-black text-textPrimary">
                  {users.filter(u => !u.enabled).length}
              </p>
              <p className="text-xs text-textSecondary mt-1 font-medium italic">Pending reactivation</p>
          </div>

          <div className="bg-backgroundSecondary border border-borderPrimary rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                      <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-textPrimary uppercase tracking-widest text-[10px]">System Admins</h4>
              </div>
              <p className="text-3xl font-black text-textPrimary">
                  {users.filter(u => u.roles.includes("ADMIN")).length}
              </p>
              <p className="text-xs text-textSecondary mt-1 font-medium italic">Full platform control</p>
          </div>
      </div>
    </div>
  );
}
