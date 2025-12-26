import { AdminLayout } from '../../../layouts/AdminLayout';
import { useDashboard } from '../../../features/admin/hooks/useDashboard';
import {
  UsersStatsSection,
  BooksStatsSection,
  OrdersStatsSection,
  EntitlementsStatsSection,
  RevenueStatsSection,
} from '../../../features/admin/shared';

export const AdminDashboardPage = () => {
  const {
    users,
    books,
    orders,
    entitlements,
    revenue,
    usersLoading,
    booksLoading,
    ordersLoading,
    entitlementsLoading,
    usersError,
    booksError,
    ordersError,
    entitlementsError,
  } = useDashboard();

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of system statistics and key metrics</p>
        </div>

        <UsersStatsSection
          statistics={users}
          isLoading={usersLoading}
          error={usersError}
        />
        <BooksStatsSection
          statistics={books}
          isLoading={booksLoading}
          error={booksError}
        />
        <OrdersStatsSection
          statistics={orders}
          isLoading={ordersLoading}
          error={ordersError}
        />
        <EntitlementsStatsSection
          statistics={entitlements}
          isLoading={entitlementsLoading}
          error={entitlementsError}
        />
        <RevenueStatsSection
          revenue={revenue}
          isLoading={ordersLoading}
          error={ordersError}
        />
      </div>
    </AdminLayout>
  );
};

