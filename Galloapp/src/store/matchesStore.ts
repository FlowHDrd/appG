import { create } from 'zustand';
import { CockfightMatch } from '../types';

interface MatchesState {
  matches: CockfightMatch[];
  isLoading: boolean;
  error: string | null;
  fetchMatches: () => Promise<void>;
}

// Mock data for cockfight matches
const mockMatches: CockfightMatch[] = [
  {
    id: 1,
    cock1: 'El Rayo',
    cock2: 'Tornado Negro',
    odds1: 1.8,
    odds2: 2.1,
    startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    status: 'upcoming'
  },
  {
    id: 2,
    cock1: 'Furia Roja',
    cock2: 'Águila Dorada',
    odds1: 2.5,
    odds2: 1.5,
    startTime: new Date(Date.now() + 1800000).toISOString(), // 30 minutes from now
    status: 'upcoming'
  },
  {
    id: 3,
    cock1: 'Relámpago',
    cock2: 'Tormenta',
    odds1: 1.9,
    odds2: 1.9,
    startTime: new Date().toISOString(),
    status: 'live'
  },
  {
    id: 4,
    cock1: 'Vengador',
    cock2: 'Destructor',
    odds1: 1.7,
    odds2: 2.2,
    startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: 'finished',
    winner: 1
  }
];

export const useMatchesStore = create<MatchesState>((set) => ({
  matches: [],
  isLoading: false,
  error: null,
  
  fetchMatches: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ matches: mockMatches, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar las peleas', 
        isLoading: false 
      });
    }
  }
}));