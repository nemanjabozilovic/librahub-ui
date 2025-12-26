import { AdminLayout } from '../../../layouts/AdminLayout';
import { Button } from '../../../shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { UserPlus } from 'lucide-react';
import {
  CreateUserForm,
  DisableUserForm,
  UserTableRow,
  UserSearchBar,
  useUsers,
  useUserState,
  useUserActions,
  useUserForm,
  filterUsers,
  getStatusBadge,
  getRoleBadges,
  type UpdateUserFormData,
} from '../../../features/admin/users';
import { UsersStatsSection } from '../../../features/admin/shared';

export const AdminUsersPage = () => {
  const {
    users,
    isLoading,
    error,
    totalCount,
    statistics: userStatistics,
    statisticsLoading: userStatisticsLoading,
    statisticsError: userStatisticsError,
    refreshUsers,
    refreshStatistics,
  } = useUsers();

  const {
    showCreateForm,
    setShowCreateForm,
    selectedUser,
    actionType,
    expandedUserId,
    setExpandedUserId,
    searchQuery,
    setSearchQuery,
    openAction,
    closeAction,
    toggleExpanded,
  } = useUserState();

  const {
    isCurrentUser,
    createUser,
    updateUser,
    disableUser,
    enableUser,
  } = useUserActions({
    refreshUsers,
    refreshStatistics,
    closeAction,
    setExpandedUserId,
  });

  const expandedUser = users.find((u) => u.id === expandedUserId);
  const updateForm = useUserForm(expandedUser);

  const handleUpdateUser = async (data: UpdateUserFormData) => {
    if (!expandedUserId || isCurrentUser(expandedUserId)) return;
    await updateUser(expandedUserId, data);
    updateForm.reset();
  };

  const handleDisableUser = async (data: { reason: string }) => {
    if (!selectedUser || isCurrentUser(selectedUser.id)) return;
    await disableUser(selectedUser.id, data);
  };

  const handleEnableUser = async (userId: string) => {
    if (isCurrentUser(userId)) return;
    await enableUser(userId);
  };

  const filteredUsers = filterUsers(users, searchQuery);

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Manage Users</h1>
            <p className="text-muted-foreground">Create, update, and manage user accounts, roles, and permissions</p>
          </div>
          <Button onClick={() => setShowCreateForm(!showCreateForm)} className="gap-2">
            <UserPlus className="h-4 w-4" />
            {showCreateForm ? 'Cancel' : 'Create User'}
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">{error}</div>
        )}

        <UsersStatsSection
          statistics={userStatistics}
          isLoading={userStatisticsLoading}
          error={userStatisticsError}
        />

        {showCreateForm && (
          <CreateUserForm
            onSubmit={createUser}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        {actionType === 'disable' && selectedUser && !isCurrentUser(selectedUser.id) && (
          <DisableUserForm
            user={selectedUser}
            onSubmit={handleDisableUser}
            onCancel={closeAction}
          />
        )}

        {isLoading && users.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Users ({totalCount})</CardTitle>
                <UserSearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
            </CardHeader>
            <CardContent>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? 'No users found matching your search' : 'No users found'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-foreground">Full Name</th>
                        <th className="text-left p-4 font-medium text-foreground">Role</th>
                        <th className="text-left p-4 font-medium text-foreground">Status</th>
                        <th className="text-left p-4 font-medium text-foreground">Email Verified</th>
                        <th className="text-right p-4 font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <UserTableRow
                          key={user.id}
                          user={user}
                          isExpanded={expandedUserId === user.id}
                          onToggleExpanded={() => toggleExpanded(user.id)}
                          onDisable={() => {
                            if (!isCurrentUser(user.id)) {
                              openAction('disable', user);
                            }
                          }}
                          onEnable={() => handleEnableUser(user.id)}
                          isCurrentUser={isCurrentUser(user.id)}
                          editForm={
                            expandedUserId === user.id
                              ? {
                                  form: updateForm,
                                  onSubmit: handleUpdateUser,
                                  onCancel: () => {
                                    setExpandedUserId(null);
                                    updateForm.reset();
                                  },
                                }
                              : undefined
                          }
                          getStatusBadge={getStatusBadge}
                          getRoleBadges={getRoleBadges}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

