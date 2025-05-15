import { User, UserRole } from '../types';

// In a real application, this would be stored in a database
const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    username: 'admin',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin',
    createdAt: new Date(),
  },
];

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Store user in localStorage (in a real app, this would be a JWT token)
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  },

  register: async (
    email: string,
    username: string,
    password: string,
    role: UserRole
  ): Promise<User> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      email,
      username,
      password, // In a real app, this would be hashed
      role,
      createdAt: new Date(),
    };

    users.push(newUser);

    // Store user in localStorage (in a real app, this would be a JWT token)
    localStorage.setItem('user', JSON.stringify(newUser));

    return newUser;
  },

  logout: async (): Promise<void> => {
    // Remove user from localStorage
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Method to get all users - only for admin
  getAllUsers: async (): Promise<User[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return users;
  },

  // Method to delete a user - only for admin
  deleteUser: async (id: string): Promise<void> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  },
};