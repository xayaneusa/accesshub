import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';
import { authService } from '../services/authService';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';
import { Trash2, UserPlus, Users as UsersIcon } from 'lucide-react';

const Users: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
    
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate, user]);
  
  const loadUsers = async () => {
    setIsUsersLoading(true);
    setError(null);
    
    try {
      const data = await authService.getAllUsers();
      setUsers(data);
    } catch (error) {
      setError('Failed to load users');
      console.error(error);
    } finally {
      setIsUsersLoading(false);
    }
  };
  
  useEffect(() => {
    if (user && user.role === 'admin') {
      loadUsers();
    }
  }, [user]);
  
  const handleDeleteUser = async (id: string) => {
    // Prevent deleting current user
    if (id === user?.id) {
      alert("You cannot delete your own account");
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await authService.deleteUser(id);
        loadUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };
  
  if (isLoading || isUsersLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user || user.role !== 'admin') return null;
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
              <p className="text-slate-600 mt-1">
                Manage user accounts and their access levels
              </p>
            </div>
            
            <Link to="/register">
              <Button className="flex items-center">
                <UserPlus size={18} className="mr-2" />
                Add New User
              </Button>
            </Link>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center">
              <UsersIcon size={20} className="text-slate-500 mr-2" />
              <h2 className="font-medium text-slate-800">All Users</h2>
            </div>
            
            {users.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-slate-800">{u.username}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-slate-600">{u.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full uppercase font-medium ${
                            u.role === 'admin' 
                              ? 'bg-indigo-100 text-indigo-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteUser(u.id)}
                            disabled={u.id === user.id}
                            className="inline-flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            <span>Delete</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;