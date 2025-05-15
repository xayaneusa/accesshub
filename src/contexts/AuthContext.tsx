import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthState } from '../types';
import { authService } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, role: 'admin' | 'worker') => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Check if the user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = authService.getCurrentUser();
        
        if (user) {
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            ...initialState,
            isLoading: false,
          });
        }
      } catch (error) {
        setState({
          ...initialState,
          isLoading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState({ ...state, isLoading: true, error: null });
    
    try {
      const user = await authService.login(email, password);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred during login',
      });
      throw error;
    }
  };

  const register = async (email: string, username: string, password: string, role: 'admin' | 'worker') => {
    setState({ ...state, isLoading: true, error: null });
    
    try {
      const user = await authService.register(email, username, password, role);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred during registration',
      });
      throw error;
    }
  };

  const logout = async () => {
    setState({ ...state, isLoading: true });
    
    try {
      await authService.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred during logout',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);