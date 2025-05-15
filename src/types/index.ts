export type UserRole = 'admin' | 'worker';

export interface User {
  id: string;
  email: string;
  username: string;
  password: string; // In a real app, this would be hashed
  role: UserRole;
  createdAt: Date;
}

export interface Container {
  id: string;
  name: string;
  type: 'data' | 'document';
  content: string;
  createdBy: string; // User ID
  createdAt: Date;
  accessibleBy: string[]; // List of user IDs who can access
  isPublic: boolean; // If true, all workers can view this container
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}