import { Container, User } from '../types';

// In a real application, this would be stored in a database
const containers: Container[] = [
  {
    id: '1',
    name: 'Financial Reports',
    type: 'data',
    content: 'Q1 2025 Financial Data',
    createdBy: '1', // Admin user ID
    createdAt: new Date(),
    accessibleBy: ['1'], // Initially only accessible by admin
    isPublic: true, // Visible to all workers
  },
  {
    id: '2',
    name: 'Company Policies',
    type: 'document',
    content: 'Employee Handbook and Policies',
    createdBy: '1', // Admin user ID
    createdAt: new Date(),
    accessibleBy: ['1'], // Initially only accessible by admin
    isPublic: true, // Visible to all workers
  },
];

export const containerService = {
  // Get all containers accessible by a user
  getContainersByUser: async (userId: string, role: 'admin' | 'worker'): Promise<Container[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (role === 'worker') {
      // Workers can see all public containers
      return containers.filter(container => container.isPublic);
    } else {
      // Admins can see containers they created or have explicit access to
      return containers.filter(container => 
        container.createdBy === userId || container.accessibleBy.includes(userId)
      );
    }
  },
  
  // Get all containers (admin only)
  getAllContainers: async (adminId: string): Promise<Container[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Return only containers created by this admin
    return containers.filter(container => container.createdBy === adminId);
  },
  
  // Create a new container
  createContainer: async (container: Omit<Container, 'id' | 'createdAt'>): Promise<Container> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const newContainer: Container = {
      ...container,
      id: (containers.length + 1).toString(),
      createdAt: new Date(),
    };
    
    containers.push(newContainer);
    
    return newContainer;
  },
  
  // Update container access permissions
  updateContainerAccess: async (
    containerId: string, 
    userIds: string[], 
    isPublic: boolean
  ): Promise<Container> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const containerIndex = containers.findIndex((c) => c.id === containerId);
    
    if (containerIndex === -1) {
      throw new Error('Container not found');
    }
    
    containers[containerIndex] = {
      ...containers[containerIndex],
      accessibleBy: userIds,
      isPublic,
    };
    
    return containers[containerIndex];
  },
  
  // Delete a container
  deleteContainer: async (containerId: string, userId: string): Promise<void> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const containerIndex = containers.findIndex(
      (c) => c.id === containerId && c.createdBy === userId
    );
    
    if (containerIndex !== -1) {
      containers.splice(containerIndex, 1);
    } else {
      throw new Error('Container not found or you do not have permission to delete it');
    }
  },
};