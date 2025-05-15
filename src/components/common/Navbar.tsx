import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">SecureAccess</span>
            </Link>
          </div>

          <div className="flex items-center">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-700">
                  <span className="mr-1">Logged in as:</span>
                  <span className="font-medium">{user.username}</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 capitalize">
                    {user.role}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <User size={16} />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;