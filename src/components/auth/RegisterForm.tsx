import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { UserRole } from '../../types';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'worker' as UserRole
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await register(
        formData.email,
        formData.username,
        formData.password,
        formData.role
      );
      
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setErrors({
          form: error.message
        });
      } else {
        setErrors({
          form: 'Registration failed'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errors.form}
        </div>
      )}
      
      <Input
        type="email"
        name="email"
        label="Email Address"
        placeholder="your@email.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        fullWidth
        required
      />
      
      <Input
        type="text"
        name="username"
        label="Username"
        placeholder="johndoe"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        fullWidth
        required
      />
      
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        fullWidth
        required
      />
      
      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        fullWidth
        required
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Role
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="block w-full px-4 py-2 text-base border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="worker">Worker</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <Button
        type="submit"
        isLoading={isLoading}
        fullWidth
        className="mt-2"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;