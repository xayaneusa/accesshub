import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ContainerList from '../components/containers/ContainerList';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) return null;
  
  const isAdmin = user.role === 'admin';
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              {isAdmin ? 'Admin Dashboard' : 'Worker Dashboard'}
            </h1>
            <p className="text-slate-600 mt-1">
              Welcome back, {user.username}. Here's an overview of your containers.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <ContainerList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;