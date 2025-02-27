export interface User {
  id?: number;
  username: string;
  phone?: string;
  balance: number;
  totalInvested?: number;
  totalEarnings?: number;
  profilePicture?: string;
  referralCode?: string;
  isVip?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export interface CockfightMatch {
  id: number;
  cock1: string;
  cock2: string;
  odds1: number;
  odds2: number;
  startTime: string;
  status: 'upcoming' | 'live' | 'finished';
  winner?: 1 | 2 | null;
}

export interface Bet {
  id: number;
  matchId: number;
  userId: number;
  amount: number;
  selectedCock: 1 | 2;
  potentialWin: number;
  status: 'pending' | 'won' | 'lost';
  createdAt: string;
}

export interface Notification {
  id: number;
  userId: number;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Referral {
  id: number;
  username: string;
  joinDate: string;
  earnings: number;
}

export interface Transaction {
  id: number;
  userId: number;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'referral';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  createdAt: string;
}