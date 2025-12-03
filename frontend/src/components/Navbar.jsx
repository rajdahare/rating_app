import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Store, Key, Menu, X, Shield, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const getRoleBadge = () => {
    const badges = {
      admin: { color: 'from-purple-500 to-pink-500', icon: Shield },
      store_owner: { color: 'from-green-500 to-emerald-500', icon: Store },
      normal_user: { color: 'from-blue-500 to-indigo-500', icon: Sparkles }
    };
    return badges[user?.role] || badges.normal_user;
  };

  const badge = getRoleBadge();

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-2xl' 
        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${
              scrolled ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-white'
            }`}>
              <Store className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-blue-600'}`} />
            </div>
            <span className={`text-2xl font-black transition-colors ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Rating<span className={scrolled ? 'text-blue-600' : 'text-blue-200'}>Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* User Info */}
                <div className={`flex items-center space-x-3 px-4 py-2 rounded-2xl ${
                  scrolled ? 'bg-gray-50' : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  <div className={`w-10 h-10 bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <badge.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                      {user.name.length > 15 ? user.name.substring(0, 15) + '...' : user.name}
                    </p>
                    <p className={`text-xs font-semibold capitalize ${scrolled ? 'text-blue-600' : 'text-blue-200'}`}>
                      {user.role.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                
                {/* Navigation Links */}
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isActive('/admin')
                        ? scrolled
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-white text-blue-600 shadow-lg'
                        : scrolled
                          ? 'hover:bg-gray-100 text-gray-700'
                          : 'hover:bg-white/20 text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                
                {user.role === 'store_owner' && (
                  <Link 
                    to="/owner" 
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isActive('/owner')
                        ? scrolled
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                          : 'bg-white text-green-600 shadow-lg'
                        : scrolled
                          ? 'hover:bg-gray-100 text-gray-700'
                          : 'hover:bg-white/20 text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                
                {user.role === 'normal_user' && (
                  <Link 
                    to="/stores" 
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isActive('/stores')
                        ? scrolled
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                          : 'bg-white text-blue-600 shadow-lg'
                        : scrolled
                          ? 'hover:bg-gray-100 text-gray-700'
                          : 'hover:bg-white/20 text-white'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Stores</span>
                  </Link>
                )}
                
                <Link 
                  to="/change-password" 
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    scrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/20 text-white'
                  }`}
                >
                  <Key className="w-4 h-4" />
                  <span>Password</span>
                </Link>
                
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2.5 rounded-xl hover:from-red-600 hover:to-pink-600 font-semibold shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    scrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/20 text-white'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className={`px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    scrolled 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/50' 
                      : 'bg-white text-blue-600 hover:shadow-xl'
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
              scrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/20 text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            {user ? (
              <div className="space-y-3">
                <div className={`p-4 rounded-2xl ${scrolled ? 'bg-gray-50' : 'bg-white/20 backdrop-blur-sm'}`}>
                  <p className={`font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>{user.name}</p>
                  <p className={`text-sm font-semibold capitalize ${scrolled ? 'text-blue-600' : 'text-blue-200'}`}>
                    {user.role.replace('_', ' ')}
                  </p>
                </div>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-3 hover:bg-white/20 rounded-xl font-semibold text-white">
                    Dashboard
                  </Link>
                )}
                {user.role === 'store_owner' && (
                  <Link to="/owner" className="block px-4 py-3 hover:bg-white/20 rounded-xl font-semibold text-white">
                    Dashboard
                  </Link>
                )}
                {user.role === 'normal_user' && (
                  <Link to="/stores" className="block px-4 py-3 hover:bg-white/20 rounded-xl font-semibold text-white">
                    Stores
                  </Link>
                )}
                <Link to="/change-password" className="block px-4 py-3 hover:bg-white/20 rounded-xl font-semibold text-white">
                  Change Password
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 bg-red-500 rounded-xl hover:bg-red-600 font-semibold text-white">
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/login" className="block px-4 py-3 hover:bg-white/20 rounded-xl font-semibold text-white">
                  Login
                </Link>
                <Link to="/signup" className="block px-4 py-3 bg-white text-blue-600 rounded-xl font-bold">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
