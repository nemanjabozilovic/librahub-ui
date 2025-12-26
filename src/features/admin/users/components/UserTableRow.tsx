import { Button } from '@/shared/components/ui/button';
import { CheckCircle, XCircle, UserX, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import type { UserDetails } from '../types';
import { UserEditForm } from './UserEditForm';
import type { UseFormReturn } from 'react-hook-form';
import type { UpdateUserFormData } from '../validations';

interface UserTableRowProps {
  user: UserDetails;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onDisable: () => void;
  onEnable: () => void;
  isCurrentUser: boolean;
  editForm?: {
    form: UseFormReturn<UpdateUserFormData>;
    onSubmit: (data: UpdateUserFormData) => Promise<void>;
    onCancel: () => void;
  };
  getStatusBadge: (status: string) => React.ReactNode;
  getRoleBadges: (roles: string[]) => React.ReactNode;
}

export const UserTableRow = ({
  user,
  isExpanded,
  onToggleExpanded,
  onDisable,
  onEnable,
  isCurrentUser,
  editForm,
  getStatusBadge,
  getRoleBadges,
}: UserTableRowProps) => {
  const fullName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.email;

  return (
    <>
      <tr
        className="table-row"
        onClick={onToggleExpanded}
      >
        <td className="table-cell">
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
            <div>
              <div className="font-medium text-foreground">{fullName}</div>
              <div className="text-sm text-muted-foreground">
                {user.email}
              </div>
            </div>
          </div>
        </td>
        <td className="table-cell">
          <div className="flex flex-wrap gap-1">
            {getRoleBadges(user.roles)}
          </div>
        </td>
        <td className="table-cell">{getStatusBadge(user.status)}</td>
        <td className="table-cell">
          {user.emailVerified ? (
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          )}
        </td>
        <td className="table-cell">
          <div className="table-actions">
            {!isCurrentUser && (
              <>
                {user.status === 'Active' ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDisable();
                    }}
                  >
                    <UserX className="h-4 w-4 mr-1" />
                    Disable
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnable();
                    }}
                  >
                    <UserCheck className="h-4 w-4 mr-1" />
                    Enable
                  </Button>
                )}
              </>
            )}
          </div>
        </td>
      </tr>
      {isExpanded && editForm && (
        <tr>
          <td colSpan={5} className="p-6 bg-muted/30">
            <UserEditForm
              user={user}
              form={editForm.form}
              onSubmit={editForm.onSubmit}
              onCancel={editForm.onCancel}
              isCurrentUser={isCurrentUser}
            />
          </td>
        </tr>
      )}
    </>
  );
};

