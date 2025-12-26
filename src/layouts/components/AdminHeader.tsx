import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { getRedirectPathForRole } from '../../shared/utils/auth';

export const AdminHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.email;
  };

  const getDashboardPath = () => {
    if (!user) return '/admin/dashboard';
    return getRedirectPathForRole(user);
  };

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={getDashboardPath()} className="text-xl font-bold text-foreground">
            LibraHub
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{getUserDisplayName()}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

