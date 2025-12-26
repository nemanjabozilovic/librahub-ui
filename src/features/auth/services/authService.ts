import { apiClient } from '@/shared/services/api/client';
import type {
  LoginRequest,
  RegisterRequest,
  ResendVerificationEmailRequest,
  CompleteRegistrationRequest,
  AuthTokens,
  User,
} from '../types/auth.types';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthTokens> {
    const response = await apiClient.post<AuthTokens>(
      '/auth/login',
      credentials
    );
    return response.data;
  },

  async register(data: RegisterRequest): Promise<void> {
    await apiClient.post('/auth/register', data);
  },

  async getMe(token: string): Promise<User> {
    const response = await apiClient.get<User>('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await apiClient.post<AuthTokens>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  },

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/verify-email', { token });
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      token,
      newPassword,
      confirmPassword,
    });
  },

  async resendVerificationEmail(
    data: ResendVerificationEmailRequest
  ): Promise<void> {
    await apiClient.post('/auth/resend-verification-email', data);
  },

  async completeRegistration(
    data: CompleteRegistrationRequest
  ): Promise<void> {
    await apiClient.post('/users/complete-registration', data);
  },
};

