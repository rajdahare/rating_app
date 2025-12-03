import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserPlus, Search, Filter, X, AlertCircle, Loader, User, Mail, MapPin, Shield } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [showAddModal, setShowAddModal] = useState(false);
  const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd }, reset: resetAdd } = useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const res = await API.get(`/admin/users?${params.toString()}`);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const onFilterSubmit = (data) => {
    const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''));
    setFilters(cleanData);
  };

  const onAddUser = async (data) => {
    try {
      await API.post('/admin/users', data);
      toast.success('✅ User added successfully!');
      setShowAddModal(false);
      resetAdd();
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add user');
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-700 border-purple-200',
      normal_user: 'bg-blue-100 text-blue-700 border-blue-200',
      store_owner: 'bg-green-100 text-green-700 border-green-200'
    };
    return styles[role] || styles.normal_user;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
          <p className="text-gray-600 mt-1">Manage system users and their roles</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="btn-primary flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filter Form */}
      <form onSubmit={handleSubmit(onFilterSubmit)} className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input 
            {...register('name')} 
            placeholder="Filter by name" 
            className="input-field py-2"
          />
          <input 
            {...register('email')} 
            placeholder="Filter by email" 
            className="input-field py-2"
          />
          <input 
            {...register('address')} 
            placeholder="Filter by address" 
            className="input-field py-2"
          />
          <select {...register('role')} className="input-field py-2">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="normal_user">Normal User</option>
            <option value="store_owner">Store Owner</option>
          </select>
          <button type="submit" className="btn-primary flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </form>

      {/* Users Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Address</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Role</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Store Rating</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-500">ID: {u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{u.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{u.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadge(u.role)}`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {u.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {u.role === 'store_owner' ? (
                      u.stores && u.stores.length > 0 ? (
                        <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                          ⭐ {u.stores[0].rating?.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">No store</span>
                      )
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Add New User</h3>
                  <p className="text-blue-100 text-sm mt-1">Create a new user account</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitAdd(onAddUser)} className="p-6 space-y-4">
              <div>
                <label className="label">Name (20-60 characters)</label>
                <input 
                  {...registerAdd('name', { required: true, minLength: 20, maxLength: 60 })} 
                  placeholder="Full name (minimum 20 characters)" 
                  className="input-field"
                />
                {errorsAdd.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Name must be between 20-60 characters
                  </p>
                )}
              </div>

              <div>
                <label className="label">Email</label>
                <input 
                  type="email"
                  {...registerAdd('email', { required: true })} 
                  placeholder="user@example.com" 
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Password</label>
                <input 
                  type="password"
                  {...registerAdd('password', { 
                    required: true, 
                    pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/ 
                  })} 
                  placeholder="8-16 chars, 1 uppercase, 1 special" 
                  className="input-field"
                />
                {errorsAdd.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Password must be 8-16 chars with uppercase & special char
                  </p>
                )}
              </div>

              <div>
                <label className="label">Address</label>
                <textarea 
                  {...registerAdd('address', { required: true, maxLength: 400 })} 
                  placeholder="Complete address" 
                  className="input-field"
                  rows="3"
                />
              </div>

              <div>
                <label className="label">Role</label>
                <select {...registerAdd('role', { required: true })} className="input-field">
                  <option value="normal_user">Normal User</option>
                  <option value="store_owner">Store Owner</option>
                  <option value="admin">Admin</option>
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
                <button type="submit" className="flex-1 btn-primary">
                  <UserPlus className="w-4 h-4 inline mr-2" />
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
