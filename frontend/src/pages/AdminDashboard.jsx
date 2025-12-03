import React, { useState } from 'react';
import DashboardStats from '../components/admin/DashboardStats';
import UserList from '../components/admin/UserList';
import StoreList from '../components/admin/StoreList';
import { Users, Store, LayoutDashboard, Sparkles } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Users Management', icon: Users, color: 'from-blue-500 to-indigo-500' },
    { id: 'stores', label: 'Stores Management', icon: Store, color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:rotate-3 hover:scale-110 transition-all duration-300">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-5xl font-black text-gray-900">Admin Dashboard</h1>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              <p className="text-lg text-gray-600 font-medium">Manage your platform with powerful controls</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Tabs Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Tab Buttons */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-2">
            <div className="flex space-x-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 transform
                    ${activeTab === tab.id 
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105` 
                      : 'text-gray-600 hover:bg-white/50 hover:scale-105'
                    }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <div className="animate-fade-in">
              {activeTab === 'users' ? <UserList /> : <StoreList />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
