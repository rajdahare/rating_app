import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, MapPin, User, AlertCircle, Loader, CheckCircle, Sparkles, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const password = watch('password');
  const name = watch('name');
  const address = watch('address');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signup(data);
      toast.success('🎉 Registration successful! Welcome aboard!');
      navigate('/stores');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
    const hasValidLength = value && value.length >= 8 && value.length <= 16;
    return (hasUpperCase && hasSpecialChar && hasValidLength) || 'Password must be 8-16 characters with 1 uppercase & 1 special character';
  };

  const getPasswordStrength = (value) => {
    if (!value) return { strength: 0, label: '', color: '' };
    const hasUpper = /[A-Z]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);
    const hasLength = value.length >= 8 && value.length <= 16;
    
    const checks = [hasUpper, hasSpecial, hasLength].filter(Boolean).length;
    
    if (checks === 3) return { strength: 100, label: 'Strong', color: 'bg-green-500' };
    if (checks === 2) return { strength: 66, label: 'Medium', color: 'bg-yellow-500' };
    if (checks === 1) return { strength: 33, label: 'Weak', color: 'bg-red-500' };
    return { strength: 0, label: 'Very Weak', color: 'bg-red-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-96 h-96 bg-green-400/20 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-2xl z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl mb-6 shadow-2xl cursor-pointer"
          >
            <UserPlus className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-black text-gray-900 mb-3"
          >
            Create Account
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 font-medium flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
            Join us and start rating stores
          </motion.p>
        </div>

        {/* Signup Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)" }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="label flex items-center space-x-2">
                <User className="w-4 h-4 text-green-600" />
                <span>Full Name (20-60 characters)</span>
              </label>
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                {...register('name', { 
                  required: 'Name is required', 
                  minLength: { value: 20, message: 'Minimum 20 characters' },
                  maxLength: { value: 60, message: 'Maximum 60 characters' }
                })} 
                className="input-field"
                placeholder="Enter your full name (min 20 characters)"
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm mt-2 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name.message}
                </motion.p>
              )}
              {name && name.length < 20 && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-amber-600 text-sm mt-2 flex items-center"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    ⚠️
                  </motion.span>
                  <span className="ml-1">{20 - name.length} more characters needed</span>
                </motion.p>
              )}
              {name && name.length >= 20 && (
                <motion.p 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-600 text-sm mt-2 flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Perfect! {name.length}/60 characters
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className="label flex items-center space-x-2">
                <Mail className="w-4 h-4 text-green-600" />
                <span>Email Address</span>
              </label>
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })} 
                className="input-field"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm mt-2 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <label className="label flex items-center space-x-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span>Password</span>
              </label>
              <div className="relative">
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? "text" : "password"}
                  {...register('password', { 
                    required: 'Password is required',
                    validate: validatePassword
                  })} 
                  className="input-field pr-12"
                  placeholder="Create a strong password"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
              
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm mt-2 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password.message}
                </motion.p>
              )}

              {/* Password Strength Indicator */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600">Password Strength</span>
                    <span className={`text-xs font-bold ${passwordStrength.strength === 100 ? 'text-green-600' : passwordStrength.strength >= 66 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength.strength}%` }}
                      className={`h-full ${passwordStrength.color} rounded-full`}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    {[
                      { check: password.length >= 8 && password.length <= 16, label: '8-16 characters' },
                      { check: /[A-Z]/.test(password), label: 'One uppercase letter' },
                      { check: /[!@#$%^&*]/.test(password), label: 'One special character (!@#$%^&*)' }
                    ].map((item, index) => (
                      <motion.p 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`text-xs flex items-center ${item.check ? 'text-green-600' : 'text-gray-500'}`}
                      >
                        {item.check ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <CheckCircle className="w-3 h-3 mr-2" />
                          </motion.div>
                        ) : (
                          <span className="w-3 h-3 mr-2 border-2 border-gray-300 rounded-full" />
                        )}
                        {item.label}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Address Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <label className="label flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Address (Max 400 characters)</span>
              </label>
              <motion.textarea 
                whileFocus={{ scale: 1.02 }}
                {...register('address', { 
                  required: 'Address is required',
                  maxLength: { value: 400, message: 'Max 400 characters' }
                })} 
                className="input-field"
                rows="3"
                placeholder="Enter your complete address"
              />
              {errors.address && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm mt-2 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.address.message}
                </motion.p>
              )}
              {address && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-500 mt-2"
                >
                  {address.length} / 400 characters
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 font-bold hover:text-green-700 hover:underline">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
