export interface UserStatisticsDto {
  total: number;
  active: number;
  disabled: number;
  pending: number;
  newLast30Days: number;
  newLast7Days: number;
}

export interface BookStatisticsDto {
  total: number;
  published: number;
  draft: number;
  unlisted: number;
  newLast30Days: number;
}

export interface PeriodStatistics {
  count: number;
  revenue: number;
}

export interface OrderStatisticsDto {
  total: number;
  paid: number;
  pending: number;
  cancelled: number;
  refunded: number;
  last30Days: PeriodStatistics;
  last7Days: PeriodStatistics;
  totalRevenue: number;
  currency: string;
}

export interface EntitlementStatisticsDto {
  total: number;
  active: number;
  revoked: number;
  grantedLast30Days: number;
}

export interface RevenueDto {
  total: number;
  last30Days: number;
  last7Days: number;
  currency: string;
}

export const calculateRevenue = (orderStats: OrderStatisticsDto | null): RevenueDto => {
  if (!orderStats) {
    return {
      total: 0,
      last30Days: 0,
      last7Days: 0,
      currency: 'USD',
    };
  }

  return {
    total: orderStats.totalRevenue,
    last30Days: orderStats.last30Days.revenue,
    last7Days: orderStats.last7Days.revenue,
    currency: orderStats.currency,
  };
};

export interface DashboardSummary {
  users: UserStatisticsDto | null;
  books: BookStatisticsDto | null;
  orders: OrderStatisticsDto | null;
  entitlements: EntitlementStatisticsDto | null;
  revenue: RevenueDto;
}

