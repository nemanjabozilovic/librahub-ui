import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';

const selectAuthState = (state: RootState) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectAccessToken = createSelector(
  [selectAuthState],
  (auth) => auth.accessToken
);

export const selectRefreshToken = createSelector(
  [selectAuthState],
  (auth) => auth.refreshToken
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

export const selectUserRoles = createSelector(
  [selectUser],
  (user) => user?.roles || []
);

export const selectIsAdmin = createSelector(
  [selectUserRoles],
  (roles) => roles.includes('Admin')
);

export const selectIsLibrarian = createSelector(
  [selectUserRoles],
  (roles) => roles.includes('Librarian') || roles.includes('Admin')
);

