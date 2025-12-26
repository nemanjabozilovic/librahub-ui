import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  selectIsAuthenticated,
  selectIsAdmin,
  selectIsLibrarian,
  selectAuthLoading,
  selectUser,
} from '../features/auth/store/authSelectors';
import { getRedirectPathForRole } from '../shared/utils/auth';
import { LoadingSpinner } from '../shared/components';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: 'Admin' | 'Librarian';
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isLibrarian = useAppSelector(selectIsLibrarian);
  const user = useAppSelector(selectUser);

  if (isLoading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'Admin' && !isAdmin) {
    const redirectPath = getRedirectPathForRole(user);
    return <Navigate to={redirectPath} replace />;
  }

  if (requiredRole === 'Librarian' && !isLibrarian) {
    const redirectPath = getRedirectPathForRole(user);
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

