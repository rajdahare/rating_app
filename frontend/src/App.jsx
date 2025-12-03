import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import UserStoreList from './pages/UserStoreList';
import ChangePassword from './pages/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Landing page redirect based on authentication
const LandingRedirect = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Home />;
  }
  
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  if (user.role === 'store_owner') return <Navigate to="/owner" replace />;
  return <Navigate to="/stores" replace />;
};

// Wrapper to conditionally show footer
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const noFooterPaths = ['/admin', '/owner', '/stores', '/change-password'];
  const showFooter = !noFooterPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<LandingRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              {/* Store Owner Routes */}
              <Route element={<ProtectedRoute allowedRoles={['store_owner']} />}>
                 <Route path="/owner" element={<StoreOwnerDashboard />} />
              </Route>

              {/* Normal User Routes */}
              <Route element={<ProtectedRoute allowedRoles={['normal_user', 'admin']} />}>
                 <Route path="/stores" element={<UserStoreList />} />
              </Route>

              {/* Shared Authenticated Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin', 'normal_user', 'store_owner']} />}>
                  <Route path="/change-password" element={<ChangePassword />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </LayoutWrapper>
        </div>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="backdrop-blur-xl bg-white/90 shadow-2xl"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
