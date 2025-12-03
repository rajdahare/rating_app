import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Heart,
  Star,
  Shield,
  Zap,
  Award,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Store className="w-6 h-6" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-black">RatingPro</h3>
                <p className="text-sm text-blue-300">Excellence in Every Rating</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The most advanced platform for managing stores, users, and ratings. Built with cutting-edge technology.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, color: 'hover:text-blue-400' },
                { icon: Twitter, color: 'hover:text-sky-400' },
                { icon: Instagram, color: 'hover:text-pink-400' },
                { icon: Linkedin, color: 'hover:text-blue-500' },
                { icon: Github, color: 'hover:text-gray-400' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center ${social.color} transition-colors`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '#' },
                { name: 'Features', path: '#' },
                { name: 'Pricing', path: '#' },
                { name: 'Contact', path: '#' }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"
                      whileHover={{ scale: 1.5 }}
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              Services
            </h4>
            <ul className="space-y-3">
              {[
                'Store Management',
                'User Analytics',
                'Rating Systems',
                'API Integration',
                'Custom Solutions'
              ].map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"
                      whileHover={{ scale: 1.5 }}
                    />
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3 text-gray-300"
              >
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <span>123 Business Street, Tech City, TC 12345</span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-gray-300"
              >
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:contact@ratingpro.com" className="hover:text-white transition-colors">
                  contact@ratingpro.com
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-gray-300"
              >
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </motion.li>
            </ul>

            {/* Newsletter */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
              <p className="text-sm font-semibold mb-3">Subscribe to Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-r-lg font-semibold text-sm"
                >
                  →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8 border-y border-white/20 mb-8"
        >
          {[
            { icon: Shield, label: 'Secure & Safe', value: '100%' },
            { icon: Zap, label: 'Lightning Fast', value: '<100ms' },
            { icon: Award, label: 'Top Rated', value: '5.0' },
            { icon: Store, label: 'Active Stores', value: '10K+' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl mb-3"
              >
                <stat.icon className="w-6 h-6 text-blue-400" />
              </motion.div>
              <p className="text-2xl font-black mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center"
          >
            Made with <Heart className="w-4 h-4 mx-1 text-red-400 fill-red-400" /> by RatingPro Team
            <span className="mx-2">•</span>
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </motion.a>
            <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-white transition-colors">
              Terms of Service
            </motion.a>
            <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </motion.a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 z-50 cursor-pointer"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;

