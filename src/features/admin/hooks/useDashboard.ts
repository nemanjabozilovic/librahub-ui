import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAllStatisticsThunk } from '../store/adminThunks';
import {
  selectUserStatistics,
  selectBookStatistics,
  selectOrderStatistics,
  selectEntitlementStatistics,
  selectRevenue,
  selectUserStatisticsLoading,
  selectBookStatisticsLoading,
  selectOrderStatisticsLoading,
  selectEntitlementStatisticsLoading,
  selectUserStatisticsError,
  selectBookStatisticsError,
  selectOrderStatisticsError,
  selectEntitlementStatisticsError,
} from '../store/adminSelectors';

export const useDashboard = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserStatistics);
  const books = useAppSelector(selectBookStatistics);
  const orders = useAppSelector(selectOrderStatistics);
  const entitlements = useAppSelector(selectEntitlementStatistics);
  const revenue = useAppSelector(selectRevenue);
  
  const usersLoading = useAppSelector(selectUserStatisticsLoading);
  const booksLoading = useAppSelector(selectBookStatisticsLoading);
  const ordersLoading = useAppSelector(selectOrderStatisticsLoading);
  const entitlementsLoading = useAppSelector(selectEntitlementStatisticsLoading);
  
  const usersError = useAppSelector(selectUserStatisticsError);
  const booksError = useAppSelector(selectBookStatisticsError);
  const ordersError = useAppSelector(selectOrderStatisticsError);
  const entitlementsError = useAppSelector(selectEntitlementStatisticsError);

  const isLoading = usersLoading || booksLoading || ordersLoading || entitlementsLoading;
  const error = usersError || booksError || ordersError || entitlementsError;
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && !isLoading) {
      hasFetched.current = true;
      dispatch(fetchAllStatisticsThunk());
    }
  }, [dispatch, isLoading]);

  const summary = {
    users,
    books,
    orders,
    entitlements,
    revenue,
  };

  return {
    summary,
    isLoading,
    error,
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
  };
};

