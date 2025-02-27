import { create } from 'zustand';
import { AuthState } from '../types';

// This is a mock API call - in a real app, this would call your backend
const mockApiCall = async (endpoint: string, data: any): Promise<any> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (endpoint === '/api/login') {
    // Mock login logic
    if (data.username === 'demo' && data.password === 'password') {
      return {
        id: 1,
        username: 'demo',
        balance: 1000,
        totalInvested: 500,
        totalEarnings: 1200,
        profilePicture: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
        referralCode: 'DEMO123',
        isVip: true
      };
    } else {
      throw new Error('Credenciales inválidas');
    }
  }
  
  if (endpoint === '/api/register') {
    // Mock register logic
    if (data.username && data.phone && data.password) {
      return {
        id: 2,
        username: data.username,
        phone: data.phone,
        balance: 0,
        referralCode: 'NEW' + Math.floor(Math.random() * 1000),
        isVip: false
      };
    } else {
      throw new Error('Datos de registro incompletos');
    }
  }
  
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await mockApiCall('/api/login', { username, password });
      set({ user, isAuthenticated: true, isLoading: false });
      // Save to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error de inicio de sesión', 
        isLoading: false 
      });
    }
  },
  
  register: async (username: string, phone: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await mockApiCall('/api/register', { username, phone, password });
      set({ user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error de registro', 
        isLoading: false 
      });
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  
  clearError: () => set({ error: null })
}));