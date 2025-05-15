import React, { useState, useEffect } from 'react';
import { Container, User } from '../../types';
import Button from '../common/Button';
import { X, Check } from 'lucide-react';

interface AccessControlModalProps {
  container: Container;
  isOpen: boolean;
  onClose: () => void;
  availableUsers: User[];
  onUpdateAccess: (containerId: string, userIds: string[]) => void;
}

const AccessControlModal: React.FC<AccessControlModalProps> = ({
  container,
  isOpen,
  onClose,
  availableUsers,
  onUpdateAccess,
}) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (container) {
      setSelectedUserIds(container.accessibleBy || []);
    }
  }, [container]);

  const handleToggleUser = (userId: string) => {
    setSelectedUserIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onUpdateAccess(container.id, selectedUserIds);
    } catch (error) {
      console.error('Error updating access:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">Manage Access</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-slate-600">
              Select which users can access the{' '}
              <span className="font-medium">{container.name}</span> container:
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-lg mb-6">
              {availableUsers.length === 0 ? (
                <p className="p-4 text-slate-500 text-center">No users found</p>
              ) : (
                <ul className="divide-y divide-slate-200">
                  {availableUsers.map((user) => (
                    <li key={user.id} className="px-4 py-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          checked={selectedUserIds.includes(user.id)}
                          onChange={() => handleToggleUser(user.id)}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">
                            {user.username}
                          </p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full uppercase font-medium bg-slate-100 text-slate-800">
                          {user.role}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="flex items-center"
              >
                <Check size={18} className="mr-1" />
                Save Access
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccessControlModal;