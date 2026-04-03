"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  TrendingUp, 
  Store,
  Tag,
  ShieldCheck,
  PackagePlus,
  ArrowRight,
  Loader2,
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
  LayoutGrid,
  List as ListIcon,
  ShoppingBag,
  Coins,
  History
} from "lucide-react";

// API Configuration
const API_BASE_URL = "http://localhost:8080/govisaviya/api/v1/marketplace";

interface ProductListing {
  id: number;
  name: string;
  description: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  availableQuantity: number;
  location: string;
  imageUrl: string | null;
  farmer: {
    fullName: string;
    email: string;
  };
  createdAt: string;
}

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("explore");
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductListing | null>(null);
  
  // Form State for new/edit listing
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    category: "VEGETABLE",
    pricePerUnit: 0,
    unit: "KG",
    availableQuantity: 0,
    location: "",
  });

  useEffect(() => {
    fetchListings();
    const savedRoles = localStorage.getItem('userRoles');
    if (savedRoles) {
      try { setUserRoles(JSON.parse(savedRoles)); } catch (e) {}
    }
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setListings(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
      // Mock data fallback omitted for brevity in full implementation but would go here
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const isFarmer = userRoles.includes('FARMER');
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem("userEmail") : null;

  // Farmer Specific Stats
  const farmerStats = useMemo(() => {
    const myItems = listings.filter(item => item.farmer.email === userEmail);
    return {
      totalProducts: myItems.length,
      totalQuantity: myItems.reduce((acc, curr) => acc + curr.availableQuantity, 0),
      totalOrders: 0, // Mock for now
      earnings: 0 // Mock for now
    };
  }, [listings, userEmail]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormState({
      name: "",
      description: "",
      category: "VEGETABLE",
      pricePerUnit: 0,
      unit: "KG",
      availableQuantity: 0,
      location: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductListing) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      description: product.description || "",
      category: product.category,
      pricePerUnit: product.pricePerUnit,
      unit: product.unit,
      availableQuantity: product.availableQuantity,
      location: product.location,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchListings();
      alert("Deleted successfully");
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingProduct) {
        await axios.put(`${API_BASE_URL}/products/${editingProduct.id}`, formState, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE_URL}/products`, formState, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsModalOpen(false);
      fetchListings();
      alert(editingProduct ? "Updated successfully" : "Listed successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const filteredListings = listings.filter(item => {
    if (activeTab === "explore") return true;
    if (activeTab === "mylistings") return item.farmer.email === userEmail;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header & Quick Stats */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-textPrimary mb-2 flex items-center gap-3">
              Marketplace {activeTab === 'mylistings' && <span className="text-primary font-medium text-lg bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Management</span>}
            </h1>
            <p className="text-textSecondary text-lg font-medium">
              {activeTab === 'mylistings' ? "Monitor your stock and manage your public listings." : "Discover bulk buyers, list your harvest, and negotiate prices."}
            </p>
          </div>
          <div className="flex gap-3">
            {isFarmer && (
              <button 
                onClick={handleOpenAddModal}
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-backgroundSecondary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Product
              </button>
            )}
          </div>
        </div>

        {/* 2. Summary Cards (Only for Farmer in Management Tab) */}
        {isFarmer && activeTab === 'mylistings' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Products", value: farmerStats.totalProducts, icon: ShoppingBag, color: "bg-blue-500" },
              { label: "Stock Volume", value: `${farmerStats.totalQuantity} kg`, icon: PackagePlus, color: "bg-primary" },
              { label: "Total Orders", value: farmerStats.totalOrders, icon: History, color: "bg-purple-500" },
              { label: "Earnings (Rs)", value: farmerStats.earnings.toLocaleString(), icon: Coins, color: "bg-orange-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-backgroundSecondary border border-borderPrimary p-6 rounded-[2rem] shadow-sm flex items-center gap-5 hover:border-primary/30 transition-all group">
                <div className={`p-4 rounded-2xl ${stat.color} text-backgroundSecondary shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-textPrimary">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Main Interface */}
      <div className="bg-transparent space-y-6">
        
        {/* Tab Selection */}
        <div className="flex items-center justify-between border-b border-borderPrimary">
          <div className="flex gap-1">
            {[
              { id: "explore", label: "Public Market", icon: Store },
              { id: "mylistings", label: "My Listings", icon: ListIcon, hide: !isFarmer },
            ].filter(t => !t.hide).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
                  activeTab === tab.id ? "text-primary" : "text-textSecondary hover:text-textPrimary"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-4px_10px_rgba(var(--primary-rgb),0.5)]"></div>}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-textSecondary bg-backgroundSecondary border border-borderPrimary px-4 py-2 rounded-xl text-xs font-bold">
             <Search className="w-4 h-4" />
             <input placeholder="Quick search..." className="bg-transparent outline-none w-32" />
          </div>
        </div>

        {/* Content View */}
        {loading ? (
             <div className="p-32 text-center flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-textSecondary font-bold text-lg">Synchronizing your marketplace...</p>
             </div>
        ) : (
          <>
            {activeTab === 'explore' ? (
              /* EXPLORE GRID */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.length === 0 ? (
                  <EmptyState isFarmer={isFarmer} onAdd={handleOpenAddModal} />
                ) : filteredListings.map(item => <ExploreCard key={item.id} product={item} />)}
              </div>
            ) : (
              /* MY LISTINGS TABLE / DETAIL VIEW */
              <div className="bg-backgroundSecondary border border-borderPrimary rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-hoverPrimary/50 border-b border-borderPrimary">
                        <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Product</th>
                        <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Category</th>
                        <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Price</th>
                        <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Stock</th>
                        <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest">Status</th>
                        <th className="p-6 text-xs font-black uppercase text-textSecondary tracking-widest text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredListings.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-20 text-center">
                            <EmptyState isFarmer={true} onAdd={handleOpenAddModal} small />
                          </td>
                        </tr>
                      ) : filteredListings.map(item => (
                        <tr key={item.id} className="border-b border-borderPrimary hover:bg-hoverPrimary/30 transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-input flex items-center justify-center text-textSecondary border border-borderPrimary overflow-hidden">
                                {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover" /> : <Tag className="w-5 h-5" />}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-textPrimary group-hover:text-primary transition-colors">{item.name}</span>
                                <span className="text-[10px] text-textSecondary opacity-70 flex items-center mt-1"><MapPin className="w-3 h-3 mr-1" /> {item.location}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className="px-3 py-1 rounded-lg bg-hoverPrimary border border-borderPrimary text-[10px] font-black uppercase tracking-widest text-textSecondary">
                              {item.category}
                            </span>
                          </td>
                          <td className="p-6 font-bold text-textPrimary">Rs. {item.pricePerUnit} <span className="text-[10px] opacity-50">/ {item.unit}</span></td>
                          <td className="p-6">
                            <div className="flex flex-col gap-1.5">
                              <span className="text-sm font-bold text-textPrimary">{item.availableQuantity} {item.unit}</span>
                              <div className="w-24 h-1.5 bg-input rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all" style={{ width: item.availableQuantity > 0 ? '60%' : '0%' }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              item.availableQuantity > 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${item.availableQuantity > 0 ? 'bg-primary' : 'bg-destructive'}`}></div>
                              {item.availableQuantity > 0 ? 'Active' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => handleOpenEditModal(item)} className="p-2.5 rounded-xl hover:bg-primary/10 hover:text-primary text-textSecondary transition-all cursor-pointer" title="Edit">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteProduct(item.id)} className="p-2.5 rounded-xl hover:bg-destructive/10 hover:text-destructive text-textSecondary transition-all cursor-pointer" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. Modals */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-backgroundSecondary w-full max-w-xl rounded-[3rem] border border-borderPrimary shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-borderPrimary flex justify-between items-center bg-hoverPrimary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary text-backgroundSecondary shadow-lg">
                  {editingProduct ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-textPrimary tracking-tight">{editingProduct ? "Edit Product" : "Launch Listing"}</h2>
                  <p className="text-xs font-bold text-textSecondary uppercase tracking-widest">Market Integration Portal</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all text-textSecondary">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary px-1">Product Identity</label>
                  <input required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} placeholder="e.g. Premium White Rice" 
                    className="w-full px-6 py-4 bg-input border border-borderPrimary rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-bold" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary px-1">Base Category</label>
                  <select value={formState.category} onChange={e => setFormState({...formState, category: e.target.value})}
                    className="w-full px-6 py-4 bg-input border border-borderPrimary rounded-2xl focus:border-primary outline-none font-bold">
                    <option value="VEGETABLE">Vegetable</option>
                    <option value="FRUIT">Fruit</option>
                    <option value="GRAIN">Grain</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary px-1">Pricing (Rs/{formState.unit})</label>
                  <input type="number" required value={formState.pricePerUnit} onChange={e => setFormState({...formState, pricePerUnit: Number(e.target.value)})}
                    className="w-full px-6 py-4 bg-input border border-borderPrimary rounded-2xl focus:border-primary outline-none font-bold" />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary px-1">Quantity</label>
                   <div className="flex bg-input border border-borderPrimary rounded-2xl overflow-hidden focus-within:border-primary focus-within:ring-1 transition-all">
                      <input type="number" required value={formState.availableQuantity} onChange={e => setFormState({...formState, availableQuantity: Number(e.target.value)})}
                        className="flex-1 px-6 py-4 bg-transparent outline-none font-bold" />
                      <select value={formState.unit} onChange={e => setFormState({...formState, unit: e.target.value})} className="px-4 bg-hoverPrimary border-l border-borderPrimary outline-none text-xs font-black">
                        <option value="KG">KG</option>
                        <option value="BAG">BAG</option>
                        <option value="PLANT">PLANT</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary px-1">Origin Location</label>
                  <input required value={formState.location} onChange={e => setFormState({...formState, location: e.target.value})} placeholder="Nuwara Eliya" 
                    className="w-full px-6 py-4 bg-input border border-borderPrimary rounded-2xl focus:border-primary outline-none font-bold" />
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary px-1">Detailed Description</label>
                  <textarea rows={3} value={formState.description} onChange={e => setFormState({...formState, description: e.target.value})} placeholder="Tell buyers about your harvest quality, farming methods, etc."
                    className="w-full px-6 py-4 bg-input border border-borderPrimary rounded-2xl focus:border-primary outline-none font-bold no-scrollbar resize-none text-sm"></textarea>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-5 border border-borderPrimary font-black text-xs uppercase tracking-widest text-textSecondary rounded-2xl hover:bg-hoverPrimary transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-5 bg-primary text-backgroundSecondary font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_10px_40px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-1 transition-all">
                  {editingProduct ? "Save Changes" : "Confirm Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components for cleaner structure
function ExploreCard({ product }: { product: ProductListing }) {
  return (
    <div className="flex flex-col p-6 rounded-[2rem] border border-borderPrimary hover:border-primary/40 bg-backgroundSecondary hover:bg-hoverPrimary/40 transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden">
      <div className="flex justify-between items-start mb-5 relative z-10">
        <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">Market Live</span>
        <div className="flex items-center gap-1 bg-hoverPrimary/50 text-textSecondary px-2 py-1 rounded-lg text-[10px] font-bold border border-borderPrimary shrink-0">
          <Star className="h-3 w-3 fill-primary text-primary" /> 4.8
        </div>
      </div>
      
      <h3 className="font-bold text-textPrimary text-xl line-clamp-1 group-hover:text-primary transition-colors tracking-tight mb-2">{product.name}</h3>
      <div className="flex items-center gap-2 mb-6">
        <p className="text-2xl font-black text-textPrimary tracking-tighter">Rs. {product.pricePerUnit}</p>
        <span className="text-[10px] text-textSecondary font-bold uppercase tracking-widest opacity-60">/ {product.unit}</span>
      </div>
      
      <div className="mt-auto pt-6 border-t border-borderPrimary flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-[10px] font-bold text-textSecondary">
            <MapPin className="h-3 w-3 mr-1 text-primary" /> {product.location}
          </div>
          <span className="text-[10px] font-black text-primary uppercase tracking-widest">{product.availableQuantity} {product.unit} available</span>
        </div>
        <button className="h-12 w-12 bg-textPrimary hover:bg-primary text-backgroundSecondary rounded-2xl flex items-center justify-center transition-all shadow-md group-hover:scale-105 active:scale-95 cursor-pointer">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ isFarmer, onAdd, small }: { isFarmer: boolean, onAdd: () => void, small?: boolean }) {
  return (
    <div className={`col-span-full border-2 border-dashed border-borderPrimary rounded-[3rem] bg-backgroundSecondary/50 flex flex-col items-center justify-center ${small ? 'p-10' : 'p-32'}`}>
      <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center text-textSecondary mb-6 opacity-30">
        <PackagePlus className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-bold text-textPrimary mb-2">No Active Listings</h3>
      <p className="text-textSecondary font-medium max-w-xs text-center mb-8">This view is currently empty. Start growing your local presence by adding a new product.</p>
      {isFarmer && (
        <button onClick={onAdd} className="px-8 py-4 bg-primary text-backgroundSecondary rounded-2xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Your First Product
        </button>
      )}
    </div>
  );
}
