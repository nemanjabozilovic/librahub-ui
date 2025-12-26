import { cn } from '@/shared/lib/utils';
import type { UserDetails } from '../types';

export const getStatusBadge = (status: string) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  switch (status) {
    case 'Active':
      return (
        <span className={cn(baseClasses, 'bg-green-100 text-green-800')}>
          Active
        </span>
      );
    case 'Disabled':
      return (
        <span className={cn(baseClasses, 'bg-red-100 text-red-800')}>
          Disabled
        </span>
      );
    case 'Pending':
      return (
        <span className={cn(baseClasses, 'bg-yellow-100 text-yellow-800')}>
          Pending
        </span>
      );
    default:
      return <span className={baseClasses}>{status}</span>;
  }
};

export const getRoleBadges = (roles: string[]) => {
  return roles.map((role) => (
    <span
      key={role}
      className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mr-1"
    >
      {role}
    </span>
  ));
};

export const filterUsers = (users: UserDetails[], searchQuery: string): UserDetails[] => {
  if (!searchQuery.trim()) return users;
  const query = searchQuery.toLowerCase();
  return users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      user.email.toLowerCase().includes(query) ||
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      fullName.includes(query)
    );
  });
};

