import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Users, Store, Star, TrendingUp, Loader, ArrowUp } from 'lucide-react';

const DashboardStats = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/dashboard')
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      shadowColor: 'shadow-blue-500/30',
      bgGradient: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Stores',
      value: stats.totalStores,
      icon: Store,
      gradient: 'from-green-500 via-green-600 to-emerald-600',
      shadowColor: 'shadow-green-500/30',
      bgGradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Ratings',
      value: stats.totalRatings,
      icon: Star,
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      shadowColor: 'shadow-yellow-500/30',
      bgGradient: 'from-yellow-50 to-orange-50',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      {statCards.map((stat, index) => (
        <div 
          key={index} 
          className={`relative group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl ${stat.shadowColor} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 overflow-hidden`}
          style={{animationDelay: `${index * 100}ms`}}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
          
          {/* Content */}
          <div className="relative p-8">
            <div className="flex items-start justify-between mb-6">
              <div className={`w-16 h-16 ${stat.iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">Live</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">{stat.title}</p>
              <p className="text-5xl font-black text-gray-900 mb-2">{stat.value}</p>
              <div className="flex items-center text-sm text-gray-600 font-medium">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                <span>System Statistics</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${stat.gradient} opacity-10 rounded-tl-full`}></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
