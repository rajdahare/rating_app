import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, Star, Users, Shield, TrendingUp, CheckCircle, Zap, Award, Target, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div 
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 4 }}
          className="absolute top-40 right-20 w-80 h-80 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative container mx-auto px-4 py-20 md:py-32"
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8 border border-blue-100"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </motion.div>
            <span className="text-sm font-semibold text-gray-700">Professional Rating Management System</span>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-tight">
            Transform Your
            <motion.span 
              className="block mt-2"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[length:200%_auto]">
                Rating Experience
              </span>
            </motion.span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            The most advanced platform for managing stores, users, and ratings. Built with cutting-edge technology for unmatched performance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/signup" 
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden flex items-center justify-center space-x-3"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Zap className="w-6 h-6" />
                  <span>Get Started Free</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/login" 
                className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-xl border-2 border-gray-200 hover:border-blue-300 flex items-center justify-center"
              >
                Sign In →
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 text-gray-600 font-semibold">
            {['100% Secure', 'Real-time Updates', 'Enterprise Ready'].map((text, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="relative container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage ratings at scale
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {[
            {
              icon: Shield,
              title: 'Admin Control Center',
              description: 'Complete dashboard with real-time analytics, user management, and comprehensive controls',
              gradient: 'from-purple-500 to-pink-500',
              bgGradient: 'from-purple-50 to-pink-50'
            },
            {
              icon: Store,
              title: 'Store Management',
              description: 'Track ratings, analyze customer feedback, and monitor performance with beautiful visualizations',
              gradient: 'from-green-500 to-emerald-500',
              bgGradient: 'from-green-50 to-emerald-50'
            },
            {
              icon: Star,
              title: 'Smart Rating System',
              description: 'Intuitive 1-5 star ratings with real-time updates and instant feedback mechanisms',
              gradient: 'from-yellow-500 to-orange-500',
              bgGradient: 'from-yellow-50 to-orange-50'
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden cursor-pointer"
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0`}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative container mx-auto px-4 py-20"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, label: 'Performance', value: 'Lightning Fast' },
              { icon: Shield, label: 'Security', value: 'Bank-Grade' },
              { icon: Award, label: 'Support', value: '24/7 Available' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.1 }}
                className="text-center text-white"
              >
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg"
                >
                  <stat.icon className="w-10 h-10" />
                </motion.div>
                <motion.p 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                  className="text-5xl font-black mb-3"
                >
                  {stat.value}
                </motion.p>
                <p className="text-xl font-semibold text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative container mx-auto px-4 py-20"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 md:p-16 max-w-5xl mx-auto border border-white/50">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-12">
            Why Choose <span className="gradient-text">Our Platform</span>?
          </h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              'Modern & Responsive Design',
              'Military-Grade Security',
              'Role-Based Access Control',
              'Real-time Rating Updates',
              'Advanced Search & Filtering',
              'Comprehensive Dashboard',
              'JWT Authentication',
              'RESTful API Architecture'
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10, scale: 1.05 }}
                className="flex items-center space-x-4 group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-gray-700 font-semibold text-lg group-hover:text-blue-600 transition-colors">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative container mx-auto px-4 py-20 pb-32"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl overflow-hidden max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-16 h-16 mx-auto mb-6" />
            </motion.div>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-6"
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto"
            >
              Join thousands of businesses using our platform for seamless rating management
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/signup" 
                className="inline-flex items-center space-x-3 px-12 py-6 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/50"
              >
                <Users className="w-6 h-6" />
                <span>Create Free Account Now</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
