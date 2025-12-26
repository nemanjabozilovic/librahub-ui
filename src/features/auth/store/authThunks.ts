import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import { setCredentials, setLoading, setError, logout } from './authSlice';
import type {
  LoginRequest,
  RegisterRequest,
  ResendVerificationEmailRequest,
  CompleteRegistrationRequest,
} from '../types/auth.types';
import type { RootState } from '../../../app/store';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const tokens = await authService.login(credentials);
      const user = await authService.getMe(tokens.accessToken);

      dispatch(setCredentials({ user, tokens }));

      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);

      return { user, tokens };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: RegisterRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await authService.register(data);
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Registration failed. Please try again.';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const verifyEmailThunk = createAsyncThunk(
  'auth/verifyEmail',
  async (token: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await authService.verifyEmail(token);
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Email verification failed. Please try again.';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const tokens = await authService.refreshToken(refreshToken);
      
      const user = await authService.getMe(tokens.accessToken);

      dispatch(
        setCredentials({
          user,
          tokens,
        })
      );

      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);

      return tokens;
    } catch (error: any) {
      dispatch(logout());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(logout());
  }
);

export const initializeAuthThunk = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      dispatch(setLoading(false));
      return null;
    }

    try {
      dispatch(setLoading(true));
      const user = await authService.getMe(accessToken);
      
      const refreshToken = localStorage.getItem('refreshToken');
      const tokens = {
        accessToken,
        refreshToken: refreshToken || '',
        expiresAt: '',
      };
      
      dispatch(setCredentials({ user, tokens }));
      return { user, tokens };
    } catch (error: any) {
      dispatch(logout());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(null);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await authService.forgotPassword(email);
      return email;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to send reset email. Please try again.';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async (
    {
      token,
      newPassword,
      confirmPassword,
    }: { token: string; newPassword: string; confirmPassword: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await authService.resetPassword(token, newPassword, confirmPassword);
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to reset password. Please try again.';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const resendVerificationEmailThunk = createAsyncThunk(
  'auth/resendVerificationEmail',
  async (data: ResendVerificationEmailRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await authService.resendVerificationEmail(data);
      return 'Verification email sent successfully.';
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to send verification email. Please try again.';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const completeRegistrationThunk = createAsyncThunk(
  'auth/completeRegistration',
  async (data: CompleteRegistrationRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await authService.completeRegistration(data);
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to complete registration. Please try again.';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

