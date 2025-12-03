import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Search, MapPin, Mail, StarOff, Loader, Sparkles } from 'lucide-react';

const UserStoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingLoading, setRatingLoading] = useState(null);
  const [hoveredStore, setHoveredStore] = useState(null);
  const { register, handleSubmit } = useForm();
  const [filters, setFilters] = useState({});

  const fetchStores = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const res = await API.get(`/stores?${params.toString()}`);
      setStores(res.data);
    } catch (error) {
      toast.error('Failed to fetch stores');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const onSearch = (data) => {
    const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''));
    setFilters(cleanData);
  };

  const handleRate = async (storeId, rating) => {
    setRatingLoading(storeId);
    try {
      await API.post('/stores/rate', { storeId, rating });
      toast.success('⭐ Rating submitted successfully!');
      fetchStores();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setRatingLoading(null);
    }
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"
      />
      
      <div className="relative container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <h1 className="text-5xl font-black text-gray-900">Discover Stores</h1>
          </div>
          <p className="text-lg text-gray-600 font-medium">Rate and review your favorite stores</p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ boxShadow: "0 20px 50px -12px rgba(59, 130, 246, 0.25)" }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-8 border border-white/50"
        >
          <form onSubmit={handleSubmit(onSearch)} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <motion.div 
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  {...register('name')} 
                  placeholder="Search by store name" 
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                />
              </motion.div>
            </div>
            <div className="flex-1">
              <motion.div 
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  {...register('address')} 
                  placeholder="Search by address" 
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                />
              </motion.div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="btn-primary whitespace-nowrap px-8"
            >
              <Search className="w-4 h-4 inline mr-2" />
              Search
            </motion.button>
          </form>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader className="w-16 h-16 text-blue-600" />
              </motion.div>
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 text-gray-600 font-medium"
              >
                Loading amazing stores...
              </motion.p>
            </motion.div>
          ) : stores.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <StarOff className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No stores found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </motion.div>
          ) : (
            /* Stores Grid */
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {stores.map((store, index) => {
                const userRating = store.ratings && store.ratings.length > 0 ? store.ratings[0].rating : 0;
                return (
                  <motion.div 
                    key={store.id}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.03,
                      boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
                    }}
                    onHoverStart={() => setHoveredStore(store.id)}
                    onHoverEnd={() => setHoveredStore(null)}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/50 cursor-pointer"
                  >
                    {/* Store Header */}
                    <motion.div 
                      className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white overflow-hidden"
                      animate={{
                        backgroundPosition: hoveredStore === store.id ? ['0% 50%', '100% 50%'] : '0% 50%'
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.div
                        className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
                        animate={{
                          scale: hoveredStore === store.id ? 1.5 : 1,
                          rotate: hoveredStore === store.id ? 360 : 0
                        }}
                        transition={{ duration: 0.6 }}
                      />
                      <h3 className="text-2xl font-black mb-2 relative z-10">{store.name}</h3>
                      <div className="flex items-start space-x-2 text-blue-100 relative z-10">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <p className="text-sm">{store.address}</p>
                      </div>
                      {store.email && (
                        <div className="flex items-center space-x-2 text-blue-100 mt-2 relative z-10">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <p className="text-sm">{store.email}</p>
                        </div>
                      )}
                    </motion.div>

                    {/* Store Body */}
                    <div className="p-6">
                      {/* Overall Rating */}
                      <div className="mb-6">
                        <p className="text-sm font-bold text-gray-500 mb-3">Overall Rating</p>
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            {renderStars(store.rating || 0)}
                          </div>
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: index * 0.1 + 0.5 }}
                            className="text-3xl font-black text-gray-900"
                          >
                            {store.rating ? store.rating.toFixed(1) : 'NR'}
                          </motion.span>
                        </div>
                      </div>

                      {/* User Rating Section */}
                      <div className="border-t-2 border-gray-100 pt-4">
                        <p className="text-sm font-bold text-gray-700 mb-3">
                          {userRating > 0 ? 'Your Rating' : 'Rate this store'}
                        </p>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <motion.button 
                              key={star}
                              onClick={() => handleRate(store.id, star)}
                              disabled={ratingLoading === store.id}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all transform disabled:opacity-50 disabled:cursor-not-allowed
                                ${userRating >= star 
                                  ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg' 
                                  : 'bg-gray-100 text-gray-400 hover:bg-yellow-50 hover:text-yellow-600'}
                              `}
                            >
                              {ratingLoading === store.id ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : (
                                star
                              )}
                            </motion.button>
                          ))}
                        </div>
                        {userRating > 0 && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-green-600 mt-3 font-bold flex items-center"
                          >
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5 }}
                            >
                              ✓
                            </motion.span>
                            <span className="ml-1">You rated this store {userRating}/5</span>
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserStoreList;
