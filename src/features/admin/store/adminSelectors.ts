import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';
import { calculateRevenue } from '../shared/types';

const selectAdminState = (state: RootState) => state.admin;

export const selectUserStatistics = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.users.data
);

export const selectUserStatisticsLoading = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.users.isLoading
);

export const selectUserStatisticsError = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.users.error
);

export const selectBookStatistics = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.books.data
);

export const selectBookStatisticsLoading = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.books.isLoading
);

export const selectBookStatisticsError = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.books.error
);

export const selectOrderStatistics = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.orders.data
);

export const selectOrderStatisticsLoading = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.orders.isLoading
);

export const selectOrderStatisticsError = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.orders.error
);

export const selectEntitlementStatistics = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.entitlements.data
);

export const selectEntitlementStatisticsLoading = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.entitlements.isLoading
);

export const selectEntitlementStatisticsError = createSelector(
  [selectAdminState],
  (admin) => admin.statistics.entitlements.error
);

export const selectRevenue = createSelector(
  [selectOrderStatistics],
  (orderStats) => calculateRevenue(orderStats)
);

export const selectDashboardSummary = createSelector(
  [selectUserStatistics, selectBookStatistics, selectOrderStatistics, selectEntitlementStatistics, selectRevenue],
  (users, books, orders, entitlements, revenue) => ({
    users,
    books,
    orders,
    entitlements,
    revenue,
  })
);

export const selectDashboardLoading = createSelector(
  [selectUserStatisticsLoading, selectBookStatisticsLoading, selectOrderStatisticsLoading, selectEntitlementStatisticsLoading],
  (usersLoading, booksLoading, ordersLoading, entitlementsLoading) =>
    usersLoading || booksLoading || ordersLoading || entitlementsLoading
);

export const selectDashboardError = createSelector(
  [selectUserStatisticsError, selectBookStatisticsError, selectOrderStatisticsError, selectEntitlementStatisticsError],
  (usersError, booksError, ordersError, entitlementsError) =>
    usersError || booksError || ordersError || entitlementsError
);

export const selectUsers = createSelector(
  [selectAdminState],
  (admin) => admin.users.items
);

export const selectUsersTotalCount = createSelector(
  [selectAdminState],
  (admin) => admin.users.totalCount
);

export const selectUsersLoading = createSelector(
  [selectAdminState],
  (admin) => admin.users.isLoading
);

export const selectUsersError = createSelector(
  [selectAdminState],
  (admin) => admin.users.error
);

export const selectBooks = createSelector(
  [selectAdminState],
  (admin) => admin.books.items
);

export const selectBooksTotalCount = createSelector(
  [selectAdminState],
  (admin) => admin.books.totalCount
);

export const selectBooksPage = createSelector(
  [selectAdminState],
  (admin) => admin.books.page
);

export const selectBooksPageSize = createSelector(
  [selectAdminState],
  (admin) => admin.books.pageSize
);

export const selectBooksTotalPages = createSelector(
  [selectAdminState],
  (admin) => admin.books.totalPages
);

export const selectBooksLoading = createSelector(
  [selectAdminState],
  (admin) => admin.books.isLoading
);

export const selectBooksError = createSelector(
  [selectAdminState],
  (admin) => admin.books.error
);


