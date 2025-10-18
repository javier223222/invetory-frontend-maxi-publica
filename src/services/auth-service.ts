import { authApi } from '@/lib/api/auth';
import { LoginRequest, RegisterRequest, User } from '@/types/user';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginRequest) {
    try {
      const response = await authApi.login(credentials);
      authApi.storeAuth(response.data.token, response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(data: RegisterRequest) {
    try {
      const response = await authApi.register(data);
      const loginResponse = await this.login(data);
      return loginResponse;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    authApi.logout();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  getUser(): User | null {
    return authApi.getStoredUser();
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }
}

export const authService = AuthService.getInstance();