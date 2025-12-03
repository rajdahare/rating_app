import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Key, Lock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const ChangePassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const newPassword = watch('newPassword');

  const validatePassword = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
    const hasValidLength = value.length >= 8 && value.length <= 16;
    return (hasUpperCase && hasSpecialChar && hasValidLength) || 'Invalid password format';
  };

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    setLoading(true);
    try {
      await updatePassword(data.currentPassword, data.newPassword);
      toast.success('✅ Password updated successfully!');
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Change Password</h2>
          <p className="text-gray-600 mt-2">Update your password to keep your account secure</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="label">
                <Lock className="w-4 h-4 inline mr-2" />
                Current Password
              </label>
              <input 
                type="password"
                {...register('currentPassword', { required: 'Current password is required' })} 
                className="input-field"
                placeholder="Enter current password"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="label">
                <Lock className="w-4 h-4 inline mr-2" />
                New Password
              </label>
              <input 
                type="password"
                {...register('newPassword', { 
                  required: 'New password is required',
                  validate: validatePassword
                })} 
                className="input-field"
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.newPassword.message}
                </p>
              )}
              {newPassword && (
                <div className="mt-2 space-y-1">
                  <p className={`text-xs flex items-center ${newPassword.length >= 8 && newPassword.length <= 16 ? 'text-green-600' : 'text-gray-500'}`}>
                    {newPassword.length >= 8 && newPassword.length <= 16 ? <CheckCircle className="w-3 h-3 mr-1" /> : '○'} 8-16 characters
                  </p>
                  <p className={`text-xs flex items-center ${/[A-Z]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                    {/[A-Z]/.test(newPassword) ? <CheckCircle className="w-3 h-3 mr-1" /> : '○'} One uppercase letter
                  </p>
                  <p className={`text-xs flex items-center ${/[!@#$%^&*]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                    {/[!@#$%^&*]/.test(newPassword) ? <CheckCircle className="w-3 h-3 mr-1" /> : '○'} One special character
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="label">
                <Lock className="w-4 h-4 inline mr-2" />
                Confirm New Password
              </label>
              <input 
                type="password"
                {...register('confirmPassword', { required: 'Please confirm your password' })} 
                className="input-field"
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword.message}
                </p>
              )}
              {watch('confirmPassword') && watch('newPassword') !== watch('confirmPassword') && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
            </div>

            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
