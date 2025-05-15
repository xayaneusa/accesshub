import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

// Container pages
import ContainerList from './components/containers/ContainerList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes for any authenticated user */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/containers" element={
              <Dashboard />
            } />
            <Route path="/containers/data" element={
              <div className="min-h-screen bg-gray-100 flex flex-col">
                <Dashboard />
                <div className="mt-[-120px] ml-64 mr-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <ContainerList type="data" />
                  </div>
                </div>
              </div>
            } />
            <Route path="/containers/document" element={
              <div className="min-h-screen bg-gray-100 flex flex-col">
                <Dashboard />
                <div className="mt-[-120px] ml-64 mr-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <ContainerList type="document" />
                  </div>
                </div>
              </div>
            } />
          </Route>
          
          {/* Admin-only routes */}
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route path="/users" element={<Users />} />
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;