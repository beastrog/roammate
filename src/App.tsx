import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import TripDiscovery from './pages/TripDiscovery';
import UserProfile from './pages/UserProfile';
import GuideMarketplace from './pages/GuideMarketplace';
import Login from './pages/Login';
import Trips from './pages/Trips';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function AppContent() {
  const { isAuthenticated, login } = useAuth();
  
  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/discover" element={<TripDiscovery />} />
        <Route path="/guides" element={<GuideMarketplace />} />
        <Route path="/login" element={
          isAuthenticated ? 
          <Navigate to="/trips" replace /> : 
          <Login onLogin={login} />
        } />
        
        {/* Protected routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        
        <Route path="/trips" element={
          <ProtectedRoute>
            <Trips />
          </ProtectedRoute>
        } />
        
        {/* 404 route */}
        <Route path="*" element={
          <div className="min-h-[80vh] flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">404</h2>
                <p className="text-xl text-gray-600 mb-6">Page not found</p>
                <Link 
                  to="/" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Go back home
                </Link>
              </div>
            </div>
        } />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;