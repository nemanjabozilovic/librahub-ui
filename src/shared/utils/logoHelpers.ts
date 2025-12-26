import { useTheme } from '../hooks/useTheme';

export const useLogoPath = (): string => {
  const { theme } = useTheme();
  return theme === 'dark' ? '/images/logo-dark.png' : '/images/logo.png';
};

export const getLogoPath = (theme: 'light' | 'dark'): string => {
  return theme === 'dark' ? '/images/logo-dark.png' : '/images/logo.png';
};

