import { apiClient } from './client';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '@/types/user';

export const authApi = {
  login: async (credentials: LoginRequest) => {
    return apiClient.post<LoginResponse>('/usuarios/login', credentials);
  },

  register: async (data: RegisterRequest) => {
    return apiClient.post<User>('/usuarios', data);
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      document.cookie = 'token=; path=/; max-age=0';
    }
  },

  getStoredUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  storeAuth: (token: string, user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 días
    }
  }
};