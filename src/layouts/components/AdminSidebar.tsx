import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/ui/button';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ShoppingCart,
  Gift,
} from 'lucide-react';
import { cn } from '../../shared/lib/utils';

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Books',
    href: '/admin/books',
    icon: BookOpen,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Entitlements',
    href: '/admin/entitlements',
    icon: Gift,
  },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-72 shrink-0">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-4 py-3 text-base transition-all duration-200',
                isActive ? 'font-bold bg-card text-foreground' : '',
                !isActive && 'hover:bg-card hover:text-foreground'
              )}
              onClick={() => navigate(item.href)}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};

