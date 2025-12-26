import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import type { UserStatisticsDto } from '../types';

interface UsersStatsSectionProps {
  statistics: UserStatisticsDto | null;
  isLoading?: boolean;
  error?: string | null;
}

export const UsersStatsSection = ({ statistics, isLoading, error }: UsersStatsSectionProps) => {
  if (isLoading && !statistics) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Users Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Users Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!statistics) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Users Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-2xl font-bold text-foreground">{statistics.total}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Active</div>
            <div className="text-2xl font-bold text-green-600">{statistics.active}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Disabled</div>
            <div className="text-2xl font-bold text-red-600">{statistics.disabled}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{statistics.pending}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">New (30 days)</div>
            <div className="text-2xl font-bold text-blue-600">{statistics.newLast30Days}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">New (7 days)</div>
            <div className="text-2xl font-bold text-blue-600">{statistics.newLast7Days}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface BooksStatsSectionProps {
  statistics: import('../types').BookStatisticsDto | null;
  isLoading?: boolean;
  error?: string | null;
}

export const BooksStatsSection = ({ statistics, isLoading, error }: BooksStatsSectionProps) => {
  if (isLoading && !statistics) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Books Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Books Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!statistics) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Books Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-2xl font-bold text-foreground">{statistics.total}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Published</div>
            <div className="text-2xl font-bold text-green-600">{statistics.published}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Draft</div>
            <div className="text-2xl font-bold text-yellow-600">{statistics.draft}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Unlisted</div>
            <div className="text-2xl font-bold text-gray-600">{statistics.unlisted}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">New (30 days)</div>
            <div className="text-2xl font-bold text-blue-600">{statistics.newLast30Days}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface OrdersStatsSectionProps {
  statistics: import('../types').OrderStatisticsDto | null;
  isLoading?: boolean;
  error?: string | null;
}

export const OrdersStatsSection = ({ statistics, isLoading, error }: OrdersStatsSectionProps) => {
  if (isLoading && !statistics) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Orders Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Orders Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!statistics) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Orders Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-2xl font-bold text-foreground">{statistics.total}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Paid</div>
            <div className="text-2xl font-bold text-green-600">{statistics.paid}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{statistics.pending}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Cancelled</div>
            <div className="text-2xl font-bold text-red-600">{statistics.cancelled}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface EntitlementsStatsSectionProps {
  statistics: import('../types').EntitlementStatisticsDto | null;
  isLoading?: boolean;
  error?: string | null;
}

export const EntitlementsStatsSection = ({ statistics, isLoading, error }: EntitlementsStatsSectionProps) => {
  if (isLoading && !statistics) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Entitlements Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Entitlements Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!statistics) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Entitlements Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-2xl font-bold text-foreground">{statistics.total}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Active</div>
            <div className="text-2xl font-bold text-green-600">{statistics.active}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Revoked</div>
            <div className="text-2xl font-bold text-red-600">{statistics.revoked}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Granted (30 days)</div>
            <div className="text-2xl font-bold text-blue-600">{statistics.grantedLast30Days}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface RevenueStatsSectionProps {
  revenue: import('../types').RevenueDto | null;
  isLoading?: boolean;
  error?: string | null;
}

export const RevenueStatsSection = ({ revenue, isLoading, error }: RevenueStatsSectionProps) => {
  if (isLoading && !revenue) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Revenue Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Revenue Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!revenue) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Revenue Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="text-2xl font-bold text-foreground">
              {revenue.currency} {revenue.total.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Last 30 Days</div>
            <div className="text-2xl font-bold text-green-600">
              {revenue.currency} {revenue.last30Days.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Last 7 Days</div>
            <div className="text-2xl font-bold text-blue-600">
              {revenue.currency} {revenue.last7Days.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

