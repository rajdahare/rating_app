import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Store as StoreIcon, Plus, X, Mail, MapPin, Star, Loader, AlertCircle, User } from 'lucide-react';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/stores');
      setStores(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch stores');
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    try {
      const res = await API.get('/admin/users?role=store_owner');
      setOwners(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStores();
    fetchOwners();
  }, []);

  const onAddStore = async (data) => {
    try {
      await API.post('/admin/stores', data);
      toast.success('✅ Store added successfully!');
      setShowAddModal(false);
      reset();
      fetchStores();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add store');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stores Management</h2>
          <p className="text-gray-600 mt-1">Manage stores and their information</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Store</span>
        </button>
      </div>

      {/* Stores Table/Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : stores.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <StoreIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No stores found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Store</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Address</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((s, idx) => (
                <tr key={s.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                        <StoreIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{s.name}</p>
                        <p className="text-xs text-gray-500">ID: {s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{s.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{s.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                      <span className="font-bold text-yellow-800">{s.rating?.toFixed(1) || '0.0'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Store Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Add New Store</h3>
                  <p className="text-green-100 text-sm mt-1">Register a new store</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onAddStore)} className="p-6 space-y-4">
              <div>
                <label className="label">
                  <StoreIcon className="w-4 h-4 inline mr-2" />
                  Store Name
                </label>
                <input 
                  {...register('name', { required: true })} 
                  placeholder="Enter store name" 
                  className="input-field"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Store name is required
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Store Email
                </label>
                <input 
                  type="email"
                  {...register('email', { required: true })} 
                  placeholder="store@example.com" 
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Valid email is required
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address (Max 400 characters)
                </label>
                <textarea 
                  {...register('address', { required: true, maxLength: 400 })} 
                  placeholder="Store address" 
                  className="input-field"
                  rows="3"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Address is required (max 400 characters)
                  </p>
                )}
              </div>
              
              <div>
                <label className="label">
                  <User className="w-4 h-4 inline mr-2" />
                  Assign Owner (Optional)
                </label>
                <select {...register('ownerId')} className="input-field">
                  <option value="">No owner assigned</option>
                  {owners.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all font-medium">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreList;
