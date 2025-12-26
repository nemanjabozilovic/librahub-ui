import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/auth/store/authSelectors';

interface RoleRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
  const user = useAppSelector(selectUser);

  if (!user || !allowedRoles.some((role) => user.roles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

