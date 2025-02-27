import { create } from 'zustand';
import { Referral } from '../types';

interface ReferralsState {
  referrals: Referral[];
  totalEarnings: number;
  isLoading: boolean;
  error: string | null;
  fetchReferrals: () => Promise<void>;
}

// Mock data for referrals
const mockReferrals: Referral[] = [
  {
    id: 1,
    username: 'usuario1',
    joinDate: new Date(Date.now() - 30 * 86400000).toISOString(), // 30 days ago
    earnings: 50
  },
  {
    id: 2,
    username: 'usuario2',
    joinDate: new Date(Date.now() - 15 * 86400000).toISOString(), // 15 days ago
    earnings: 30
  },
  {
    id: 3,
    username: 'usuario3',
    joinDate: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
    earnings: 20
  }
];

export const useReferralsStore = create<ReferralsState>((set) => ({
  referrals: [],
  totalEarnings: 0,
  isLoading: false,
  error: null,
  
  fetchReferrals: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const totalEarnings = mockReferrals.reduce((sum, ref) => sum + ref.earnings, 0);
      set({ 
        referrals: mockReferrals, 
        totalEarnings,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar los referidos', 
        isLoading: false 
      });
    }
  }
}));