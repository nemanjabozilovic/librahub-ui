import type { User } from '@/features/auth/types/auth.types';

export const getRedirectPathForRole = (user: User | null): string => {
  if (!user || !user.roles || user.roles.length === 0) {
    return '/library';
  }

  if (user.roles.includes('Admin')) {
    return '/admin/dashboard';
  }

  if (user.roles.includes('Librarian')) {
    return '/admin/books';
  }

  return '/library';
};

export const getUserId = (user: User | null): string | undefined => {
  return user?.userId;
};

