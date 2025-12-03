import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Mail, TrendingUp, Award, Loader, Store as StoreIcon, Sparkles, Users, Target } from 'lucide-react';

const StoreOwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/stores/my-store')
      .then(res => setStores(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const renderStars = (rating, maxRating = 5) => {
    return Array.from({ length: maxRating }, (_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: i * 0.1, type: "spring" }}
      >
        <Star
          className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      </motion.div>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-purple-600 font-bold text-lg"
          >
            Loading your dashboard...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <StoreIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">No Stores Assigned</h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              No stores are currently assigned to your account. Please contact an administrator to get started.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-8 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
      />

      <div className="relative container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center space-x-4 mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10 text-pink-500" />
            </motion.div>
            <h1 className="text-6xl font-black text-gray-900">Store Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 font-medium">Manage your store performance and customer ratings</p>
        </motion.div>
        
        <AnimatePresence>
          {stores.map((store, storeIndex) => {
            const totalRatings = store.ratings ? store.ratings.length : 0;
            const avgRating = store.rating || 0;

            return (
              <motion.div 
                key={store.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: storeIndex * 0.2 }}
                className="mb-10"
              >
                {/* Store Info Card */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 mb-8"
                >
                  <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 p-10 text-white overflow-hidden">
                    {/* Decorative Elements */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [360, 180, 0]
                      }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"
                    />

                    <div className="relative flex items-start justify-between">
                      <div className="flex-1">
                        <motion.h2 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-4xl font-black mb-3"
                        >
                          {store.name}
                        </motion.h2>
                        <motion.p 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-purple-100 text-lg mb-2"
                        >
                          {store.address}
                        </motion.p>
                        {store.email && (
                          <motion.p 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-purple-100"
                          >
                            {store.email}
                          </motion.p>
                        )}
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl"
                      >
                        <StoreIcon className="w-12 h-12" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                    {[
                      {
                        icon: Award,
                        label: 'Average Rating',
                        value: avgRating.toFixed(1),
                        color: 'from-yellow-500 to-orange-500',
                        bgColor: 'bg-yellow-100',
                        iconColor: 'text-yellow-600'
                      },
                      {
                        icon: TrendingUp,
                        label: 'Total Ratings',
                        value: totalRatings,
                        color: 'from-blue-500 to-indigo-500',
                        bgColor: 'bg-blue-100',
                        iconColor: 'text-blue-600'
                      },
                      {
                        icon: Users,
                        label: 'Unique Customers',
                        value: totalRatings,
                        color: 'from-green-500 to-emerald-500',
                        bgColor: 'bg-green-100',
                        iconColor: 'text-green-600'
                      }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <motion.div 
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}
                          >
                            <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                          </motion.div>
                          <div className="flex items-center space-x-2 bg-green-100 px-3 py-1.5 rounded-full">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            </motion.div>
                            <span className="text-sm font-bold text-green-600">Live</span>
                          </div>
                        </div>
                        
                        <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">{stat.label}</p>
                        <motion.p 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.8 + index * 0.1 }}
                          className="text-5xl font-black text-gray-900 mb-3"
                        >
                          {stat.value}
                        </motion.p>
                        {index === 0 && (
                          <div className="flex space-x-1">
                            {renderStars(avgRating)}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Ratings Table */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)" }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50"
                >
                  <div className="px-10 py-8 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">Customer Ratings</h3>
                        <p className="text-gray-600 font-medium">See what customers think about your store</p>
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Target className="w-12 h-12 text-purple-500" />
                      </motion.div>
                    </div>
                  </div>

                  {store.ratings && store.ratings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                            <th className="px-10 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Customer</th>
                            <th className="px-10 py-5 text-left text-sm font-black text-gray-700 uppercase tracking-wider">Email</th>
                            <th className="px-10 py-5 text-center text-sm font-black text-gray-700 uppercase tracking-wider">Rating</th>
                            <th className="px-10 py-5 text-center text-sm font-black text-gray-700 uppercase tracking-wider">Stars</th>
                          </tr>
                        </thead>
                        <tbody>
                          <AnimatePresence>
                            {store.ratings.map((r, idx) => (
                              <motion.tr 
                                key={r.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + idx * 0.1 }}
                                whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.05)' }}
                                className="border-b border-gray-100"
                              >
                                <td className="px-10 py-6">
                                  <div className="flex items-center space-x-4">
                                    <motion.div 
                                      whileHover={{ scale: 1.1, rotate: 5 }}
                                      className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg"
                                    >
                                      {r.user ? r.user.name.charAt(0).toUpperCase() : 'U'}
                                    </motion.div>
                                    <div>
                                      <p className="font-bold text-gray-900">{r.user ? r.user.name : 'Unknown User'}</p>
                                      <p className="text-sm text-gray-500">Customer #{idx + 1}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-10 py-6">
                                  <div className="flex items-center space-x-2 text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span>{r.user ? r.user.email : '-'}</span>
                                  </div>
                                </td>
                                <td className="px-10 py-6 text-center">
                                  <motion.span 
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-2xl font-black text-2xl shadow-lg"
                                  >
                                    {r.rating}
                                  </motion.span>
                                </td>
                                <td className="px-10 py-6">
                                  <div className="flex justify-center space-x-1">
                                    {renderStars(r.rating)}
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-16 text-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">No Ratings Yet</h3>
                      <p className="text-gray-600 text-lg">Your store hasn't received any customer ratings yet.</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
