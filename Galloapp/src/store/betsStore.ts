import { create } from 'zustand';
import { Bet } from '../types';

interface BetsState {
  bets: Bet[];
  isLoading: boolean;
  error: string | null;
  fetchUserBets: () => Promise<void>;
  placeBet: (matchId: number, amount: number, selectedCock: 1 | 2, odds: number) => Promise<void>;
}

// Mock data for user bets
const mockBets: Bet[] = [
  {
    id: 1,
    matchId: 1,
    userId: 1,
    amount: 100,
    selectedCock: 1,
    potentialWin: 180,
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 2,
    matchId: 4,
    userId: 1,
    amount: 200,
    selectedCock: 1,
    potentialWin: 340,
    status: 'won',
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: 3,
    matchId: 3,
    userId: 1,
    amount: 150,
    selectedCock: 2,
    potentialWin: 285,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

export const useBetsStore = create<BetsState>((set, get) => ({
  bets: [],
  isLoading: false,
  error: null,
  
  fetchUserBets: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ bets: mockBets, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar las apuestas', 
        isLoading: false 
      });
    }
  },
  
  placeBet: async (matchId: number, amount: number, selectedCock: 1 | 2, odds: number) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBet: Bet = {
        id: Math.max(0, ...get().bets.map(b => b.id)) + 1,
        matchId,
        userId: 1, // Assuming current user id is 1
        amount,
        selectedCock,
        potentialWin: amount * odds,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      set(state => ({ 
        bets: [...state.bets, newBet], 
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al realizar la apuesta', 
        isLoading: false 
      });
    }
  }
}));