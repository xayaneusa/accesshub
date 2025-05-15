import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FolderClosed, 
  Database, 
  FileText,
  Settings
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;
  
  const isAdmin = user.role === 'admin';
  
  const links = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
      show: true
    },
    {
      name: 'Users',
      path: '/users',
      icon: <Users size={20} />,
      show: isAdmin
    },
    {
      name: 'All Containers',
      path: '/containers',
      icon: <FolderClosed size={20} />,
      show: true
    },
    {
      name: 'Data Containers',
      path: '/containers/data',
      icon: <Database size={20} />,
      show: true
    },
    {
      name: 'Document Containers',
      path: '/containers/document',
      icon: <FileText size={20} />,
      show: true
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
      show: true
    }
  ];
  
  return (
    <div className="bg-slate-800 text-white w-64 py-6 px-4 min-h-screen">
      <div className="mb-8">
        <h2 className="font-bold text-xl px-4">
          {isAdmin ? 'Admin Portal' : 'Worker Portal'}
        </h2>
        <div className="text-slate-400 text-sm px-4 mt-1">
          Welcome, {user.username}
        </div>
      </div>
      
      <nav>
        <ul className="space-y-1">
          {links.filter(link => link.show).map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`
                    flex items-center px-4 py-3 rounded-md transition-colors
                    ${isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'}
                  `}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;