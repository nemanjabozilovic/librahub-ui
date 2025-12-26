import { useAppDispatch } from '../../../app/hooks';
import {
  loginThunk,
  registerThunk,
  logoutThunk,
  refreshTokenThunk,
} from '../store/authThunks';
import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectIsAdmin,
  selectIsLibrarian,
} from '../store/authSelectors';
import { useAppSelector } from '../../../app/hooks';
import type { LoginRequest, RegisterRequest } from '../types/auth.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isLibrarian = useAppSelector(selectIsLibrarian);

  const login = async (credentials: LoginRequest) => {
    return dispatch(loginThunk(credentials));
  };

  const register = async (data: RegisterRequest) => {
    return dispatch(registerThunk(data));
  };

  const logout = async () => {
    return dispatch(logoutThunk());
  };

  const refreshToken = async () => {
    return dispatch(refreshTokenThunk());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    isLibrarian,
    login,
    register,
    logout,
    refreshToken,
  };
};

