import React, { useState, useEffect } from 'react';
import { Container } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import { X } from 'lucide-react';

interface ContainerModalProps {
  container: Container | null;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (container: Omit<Container, 'id' | 'createdAt'>) => void;
  onUpdate: (container: Container) => void;
  currentUserId: string;
}

const ContainerModal: React.FC<ContainerModalProps> = ({
  container,
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  currentUserId,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    type: 'data' | 'document';
    content: string;
  }>({
    name: '',
    type: 'data',
    content: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (container) {
      setFormData({
        name: container.name,
        type: container.type,
        content: container.content,
      });
    } else {
      setFormData({
        name: '',
        type: 'data',
        content: '',
      });
    }
  }, [container]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (container) {
        await onUpdate({
          ...container,
          name: formData.name,
          type: formData.type as 'data' | 'document',
          content: formData.content,
        });
      } else {
        await onCreate({
          name: formData.name,
          type: formData.type as 'data' | 'document',
          content: formData.content,
          createdBy: currentUserId,
          accessibleBy: [currentUserId],
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        form: 'There was an error saving the container',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">
            {container ? 'Edit Container' : 'Create Container'}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {errors.form && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errors.form}
            </div>
          )}

          <Input
            label="Container Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            fullWidth
          />

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Container Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-base border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="data">Data Container</option>
              <option value="document">Document Container</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={`
                block px-4 py-2 w-full text-base
                border rounded-md h-32
                bg-white text-slate-900
                transition duration-150 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.content ? 'border-red-500' : 'border-slate-300'}
              `}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {container ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContainerModal;