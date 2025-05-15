import React, { useState, useEffect } from 'react';
import { Container, User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { containerService } from '../../services/containerService';
import { authService } from '../../services/authService';
import ContainerCard from './ContainerCard';
import ContainerModal from './ContainerModal';
import AccessControlModal from './AccessControlModal';
import Button from '../common/Button';
import { Plus } from 'lucide-react';

interface ContainerListProps {
  type?: 'data' | 'document';
}

const ContainerList: React.FC<ContainerListProps> = ({ type }) => {
  const { user } = useAuth();
  const [containers, setContainers] = useState<Container[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [editingContainer, setEditingContainer] = useState<Container | null>(null);
  const [accessContainer, setAccessContainer] = useState<Container | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  
  const isAdmin = user?.role === 'admin';
  
  const loadContainers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let data;
      
      if (isAdmin) {
        data = await containerService.getAllContainers();
      } else if (user) {
        data = await containerService.getContainersByUser(user.id);
      } else {
        data = [];
      }
      
      // Filter by type if specified
      if (type) {
        data = data.filter(container => container.type === type);
      }
      
      setContainers(data);
    } catch (error) {
      setError('Failed to load containers');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadUsers = async () => {
    if (isAdmin) {
      try {
        const users = await authService.getAllUsers();
        setAvailableUsers(users);
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    }
  };
  
  useEffect(() => {
    loadContainers();
    loadUsers();
  }, [user, isAdmin, type]);
  
  const handleCreateContainer = async (container: Omit<Container, 'id' | 'createdAt'>) => {
    try {
      await containerService.createContainer(container);
      loadContainers();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create container:', error);
    }
  };
  
  const handleEditContainer = async (container: Container) => {
    setEditingContainer(container);
    setIsModalOpen(true);
  };
  
  const handleUpdateContainer = async (container: Container) => {
    try {
      // In a real app, you would call the API to update the container
      // For simplicity, we're just refreshing the container list
      loadContainers();
      setIsModalOpen(false);
      setEditingContainer(null);
    } catch (error) {
      console.error('Failed to update container:', error);
    }
  };
  
  const handleDeleteContainer = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this container?')) {
      try {
        await containerService.deleteContainer(id);
        loadContainers();
      } catch (error) {
        console.error('Failed to delete container:', error);
      }
    }
  };
  
  const handleManageAccess = (container: Container) => {
    setAccessContainer(container);
    setIsAccessModalOpen(true);
  };
  
  const handleUpdateAccess = async (containerIdToUpdate: string, userIds: string[]) => {
    try {
      await containerService.updateContainerAccess(containerIdToUpdate, userIds);
      loadContainers();
      setIsAccessModalOpen(false);
      setAccessContainer(null);
    } catch (error) {
      console.error('Failed to update access:', error);
    }
  };
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading containers...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">
          {type 
            ? `${type.charAt(0).toUpperCase() + type.slice(1)} Containers` 
            : 'All Containers'}
        </h2>
        
        {isAdmin && (
          <Button 
            onClick={() => {
              setEditingContainer(null);
              setIsModalOpen(true);
            }}
            className="flex items-center"
          >
            <Plus size={18} className="mr-1" />
            New Container
          </Button>
        )}
      </div>
      
      {containers.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
          <p className="text-slate-600">No containers found</p>
          {isAdmin && (
            <Button 
              variant="primary" 
              size="sm" 
              className="mt-4"
              onClick={() => {
                setEditingContainer(null);
                setIsModalOpen(true);
              }}
            >
              Create your first container
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {containers.map(container => (
            <ContainerCard
              key={container.id}
              container={container}
              isAdmin={isAdmin}
              onDelete={handleDeleteContainer}
              onEdit={handleEditContainer}
              onManageAccess={handleManageAccess}
            />
          ))}
        </div>
      )}
      
      {isModalOpen && (
        <ContainerModal
          container={editingContainer}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingContainer(null);
          }}
          onCreate={handleCreateContainer}
          onUpdate={handleUpdateContainer}
          currentUserId={user?.id || ''}
        />
      )}
      
      {isAccessModalOpen && accessContainer && (
        <AccessControlModal
          container={accessContainer}
          isOpen={isAccessModalOpen}
          onClose={() => {
            setIsAccessModalOpen(false);
            setAccessContainer(null);
          }}
          availableUsers={availableUsers}
          onUpdateAccess={handleUpdateAccess}
        />
      )}
    </div>
  );
};

export default ContainerList;