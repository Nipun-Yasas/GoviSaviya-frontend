"use client";

import React from "react";
import {
  TrendingUp,
  Sprout,
  Droplets,
  Sun,
  Wind,
  AlertCircle,
  Calendar,
  ArrowRight,
  ChevronRight,
  PackageCheck,
  LineChart,
  Leaf,
  Apple,
  Vegan,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  User as UserIcon,
  Package
} from "lucide-react";
import axios from "axios";

export default function FarmerDashboard() {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [deliveryPersons, setDeliveryPersons] = React.useState<any[]>([]);
  const [assigningOrder, setAssigningOrder] = React.useState<any | null>(null);

  const API_MARKET = "http://localhost:8080/govisaviya/api/v1/marketplace";
  const API_DELIVERY = "http://localhost:8080/govisaviya/api/v1/delivery";

  React.useEffect(() => {
    fetchOrders();
    fetchDeliveryPersons();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_MARKET}/orders/farmer`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) { }
  };

  const fetchDeliveryPersons = async () => {
    try {
      const res = await axios.get(`${API_DELIVERY}/persons`);
      setDeliveryPersons(res.data);
    } catch (err) { }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_MARKET}/orders/${id}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) { }
  };

  const assignDelivery = async (orderId: number, deliveryPersonId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_DELIVERY}/assign`, null, {
        params: { orderId, deliveryPersonId },
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssigningOrder(null);
      fetchOrders();
      alert("Driver assigned!");
    } catch (err) { }
  };

  const farmerStats = React.useMemo(() => {
    const ordersArray = Array.isArray(orders) ? orders : [];

    const totalRevenue = ordersArray
      .filter(o => o?.status === 'DELIVERED')
      .reduce((acc, curr) => acc + (curr?.totalAmount || 0), 0);

    const pendingOrdersCount = ordersArray.filter(o => o?.status === 'PENDING').length;
    const activeOrdersCount = ordersArray.filter(o =>
      o && (o.status === 'ACCEPTED' || o.status === 'ASSIGNED' || o.status === 'PICKED_UP')
    ).length;

    return {
      revenue: totalRevenue,
      pending: pendingOrdersCount,
      active: activeOrdersCount
    };
  }, [orders]);


  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-textPrimary">
            Farmer Dashboard
          </h1>
          <p className="text-textSecondary">
            Welcome back! Here's what's happening on your farm today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center justify-center rounded-lg bg-backgroundSecondary px-4 py-2 text-sm font-medium text-textPrimary shadow-sm border border-borderPrimary hover:bg-hoverPrimary transition-colors">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Task
          </button>
          <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all">
            <Sprout className="mr-2 h-4 w-4" />
            Add Crop
          </button>
        </div>
      </div>

      {/* Assignment Modal */}
      {assigningOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-backgroundSecondary w-full max-w-lg rounded-[3rem] border border-borderPrimary shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-borderPrimary flex justify-between items-center bg-hoverPrimary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary text-backgroundSecondary shadow-lg">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-textPrimary tracking-tight">Assign Delivery</h2>
                  <p className="text-xs font-bold text-textSecondary uppercase tracking-widest">Order #{assigningOrder.id}</p>
                </div>
              </div>
              <button onClick={() => setAssigningOrder(null)} className="p-3 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all text-textSecondary">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
              <p className="text-sm font-bold text-textSecondary mb-4">Select a verified delivery person:</p>
              {deliveryPersons.map(person => (
                <div key={person.id} className="p-4 rounded-2xl bg-hoverPrimary/30 border border-borderPrimary flex items-center justify-between group hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <UserIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-textPrimary">{person.fullName}</h4>
                      <p className="text-[10px] text-textSecondary font-black uppercase tracking-widest">{person.vehicleType} • {person.vehicleNumber}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => assignDelivery(assigningOrder.id, person.id)}
                    className="p-3 bg-textPrimary text-backgroundSecondary rounded-xl hover:bg-primary transition-all scale-0 group-hover:scale-100 uppercase text-[10px] font-black"
                  >
                    Assign
                  </button>
                </div>
              ))}
              {deliveryPersons.length === 0 && (
                <div className="p-8 text-center text-textSecondary font-medium">No available drivers.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Weather & Alerts Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary to-primary p-6 md:p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 opacity-20 transition-transform duration-700 hover:scale-110">
            <Sun className="h-48 w-48" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between h-full gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                  Weather
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold tracking-tighter">28°C</span>
                <span className="text-white/90 text-lg font-medium leading-tight max-w-[150px]">Sunny / Showers</span>
              </div>
            </div>
            <div className="flex gap-6 text-white/90 bg-white/10 px-5 py-4 rounded-2xl backdrop-blur-sm border border-white/10 self-start md:self-auto">
              <div className="flex flex-col items-center justify-center gap-1">
                <Droplets className="h-6 w-6" />
                <span className="text-sm font-semibold">45%</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Wind className="h-6 w-6" />
                <span className="text-sm font-semibold">12 km/h</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-3xl bg-backgroundSecondary border border-borderPrimary p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-hoverPrimary p-3 text-primary shrink-0">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-textPrimary text-lg">Field Alert</h3>
              <p className="text-sm text-textSecondary mt-1"> Irrigation recommended for Sector A.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: `Rs. ${farmerStats.revenue.toLocaleString()}`, trend: "Earnings", icon: TrendingUp, color: "text-primary", bg: "bg-hoverPrimary", trendColor: "text-primary" },
          { title: "Active Jobs", value: `${farmerStats.active} Orders`, trend: "Ongoing", icon: Truck, color: "text-secondary", bg: "bg-hoverPrimary", trendColor: "text-secondary" },
          { title: "Pending Approval", value: `${farmerStats.pending}`, trend: "Take action", icon: PackageCheck, color: "text-secondary", bg: "bg-secondary/10", trendColor: "text-secondary" },
          { title: "Yield Forecast", value: "8.5 Tons", trend: "+4% season", icon: LineChart, color: "text-textLoop", bg: "bg-hoverPrimary", trendColor: "text-textLoop" },
        ].map((stat, i) => (
          <div key={i} className="rounded-3xl border border-borderPrimary bg-backgroundSecondary p-6 shadow-sm hover:shadow-lg transition-all group relative overflow-hidden">
            <div className="flex items-start justify-between mb-4">
              <div className={`rounded-2xl p-3 ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${stat.trendColor} bg-hoverPrimary px-2 py-1 rounded-md`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-black text-textPrimary tracking-tight">{stat.value}</h3>
              <p className="mt-1 text-sm font-bold text-textSecondary">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Orders & Crops */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-backgroundSecondary border border-borderPrimary p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-textPrimary">Incoming Orders</h2>
                <p className="text-sm text-textSecondary mt-1">Accept and coordinate logistics</p>
              </div>
              <button
                onClick={() => window.location.href = '/dashboard/farmer/orders'}
                className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary/20 transition-all flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {(Array.isArray(orders) ? orders : []).filter(o => o && (o.status === 'PENDING' || o.status === 'ACCEPTED')).slice(0, 3).map((order) => (

                <div key={order.id} className="group border border-borderPrimary rounded-2xl p-5 hover:border-primary/40 hover:bg-hoverPrimary/40 transition-all shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-hoverPrimary flex items-center justify-center text-primary border border-primary/10">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-textPrimary">Order #{order.id}</h4>
                        <p className="text-xs text-textSecondary font-medium">{order.buyer.fullName} • Rs. {order.totalAmount}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {order.status === 'PENDING' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ACCEPTED')}
                          className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase rounded-lg hover:shadow-lg transition-all"
                        >
                          Accept
                        </button>
                      )}
                      {order.status === 'ACCEPTED' && order.deliveryRequired && (
                        <button
                          onClick={() => setAssigningOrder(order)}
                          className="px-4 py-2 bg-blue-500 text-white text-[10px] font-black uppercase rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <Truck className="w-4 h-4" /> Assign Driver
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {(Array.isArray(orders) ? orders : []).filter(o => o && (o.status === 'PENDING' || o.status === 'ACCEPTED')).length === 0 && (

                <p className="text-center py-10 text-textSecondary opacity-50 font-medium">No active orders to process.</p>
              )}
            </div>
          </div>

          <div className="bg-backgroundSecondary border border-borderPrimary p-8 rounded-[2.5rem] shadow-sm">
            <h2 className="text-xl font-bold text-textPrimary mb-8">Crop Monitoring</h2>
            <div className="space-y-4">
              {[
                { name: "Carrots - Sector A", stage: "Maturation", progress: 85, health: "Excellent", Icon: Vegan },
                { name: "Tomatoes - Sector C", stage: "Flowering", progress: 45, health: "Good", Icon: Apple },
              ].map((crop, i) => (
                <div key={i} className="border border-borderPrimary rounded-2xl p-5 group hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-hoverPrimary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <crop.Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-textPrimary">{crop.name}</h4>
                        <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">{crop.stage}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-primary px-3 py-1 bg-primary/10 rounded-lg">{crop.health}</span>
                  </div>
                  <div className="w-full bg-borderPrimary/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${crop.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8 h-fit">
          <div className="bg-backgroundSecondary border border-borderPrimary p-8 rounded-[2.5rem] shadow-sm">
            <h2 className="text-xl font-bold text-textPrimary mb-8">Live Market</h2>
            <div className="space-y-5">
              {[
                { crop: "Carrot", price: "Rs. 280/kg" },
                { crop: "Tomato", price: "Rs. 150/kg" },
                { crop: "Green Chili", price: "Rs. 850/kg" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-1">
                  <span className="font-bold text-textPrimary">{item.crop}</span>
                  <span className="text-sm font-black text-primary">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-4 bg-textPrimary text-backgroundSecondary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-lg">
            View Full Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
