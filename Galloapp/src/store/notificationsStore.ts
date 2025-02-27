import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: 1,
    userId: 1,
    message: 'Has ganado 340 en tu apuesta reciente',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: 2,
    userId: 1,
    message: 'Nuevo usuario registrado con tu código de referido',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 3,
    userId: 1,
    message: 'Depósito de 500 confirmado en tu cuenta',
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  
  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const unreadCount = mockNotifications.filter(n => !n.read).length;
      set({ 
        notifications: mockNotifications, 
        unreadCount,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar las notificaciones', 
        isLoading: false 
      });
    }
  },
  
  markAsRead: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => {
        const updatedNotifications = state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        );
        const unreadCount = updatedNotifications.filter(n => !n.read).length;
        return { 
          notifications: updatedNotifications, 
          unreadCount,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al marcar notificación como leída', 
        isLoading: false 
      });
    }
  },
  
  markAllAsRead: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => {
        const updatedNotifications = state.notifications.map(n => ({ ...n, read: true }));
        return { 
          notifications: updatedNotifications, 
          unreadCount: 0,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al marcar todas las notificaciones como leídas', 
        isLoading: false 
      });
    }
  }
}));