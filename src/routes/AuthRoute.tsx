import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectUser,
} from '../features/auth/store/authSelectors';
import { getRedirectPathForRole } from '../shared/utils/auth';
import { LoadingSpinner } from '../shared/components';

interface AuthRouteProps {
  children: JSX.Element;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const user = useAppSelector(selectUser);

  if (isLoading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  if (isAuthenticated && user) {
    const redirectPath = getRedirectPathForRole(user);
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

