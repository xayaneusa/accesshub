import React from 'react';
import { Container } from '../../types';
import { Database, FileText, Trash2, Edit, Users } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface ContainerCardProps {
  container: Container;
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onEdit: (container: Container) => void;
  onManageAccess: (container: Container) => void;
}

const ContainerCard: React.FC<ContainerCardProps> = ({ 
  container, 
  isAdmin, 
  onDelete, 
  onEdit,
  onManageAccess
}) => {
  const Icon = container.type === 'data' ? Database : FileText;
  
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${container.type === 'data' ? 'bg-blue-100' : 'bg-indigo-100'}`}>
            <Icon size={20} className={container.type === 'data' ? 'text-blue-700' : 'text-indigo-700'} />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-slate-800">{container.name}</h3>
            <p className="text-sm text-slate-500 capitalize">{container.type} container</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex-1">
        <p className="text-sm text-slate-600">{container.content}</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 mb-2">
          Created: {new Date(container.createdAt).toLocaleDateString()}
        </div>
        
        {isAdmin && (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={() => onEdit(container)}
            >
              <Edit size={14} />
              <span>Edit</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={() => onManageAccess(container)}
            >
              <Users size={14} />
              <span>Access</span>
            </Button>
            
            <Button 
              variant="danger" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={() => onDelete(container.id)}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ContainerCard;