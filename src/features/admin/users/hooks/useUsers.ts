import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  fetchUsersThunk,
  fetchUserStatisticsThunk,
} from '../../store/adminThunks';
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectUsersTotalCount,
  selectUserStatistics,
  selectUserStatisticsLoading,
  selectUserStatisticsError,
} from '../../store/adminSelectors';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const totalCount = useAppSelector(selectUsersTotalCount);
  const statistics = useAppSelector(selectUserStatistics);
  const statisticsLoading = useAppSelector(selectUserStatisticsLoading);
  const statisticsError = useAppSelector(selectUserStatisticsError);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && !isLoading) {
      hasFetched.current = true;
      dispatch(fetchUsersThunk({ skip: 0, take: 50 }));
      if (!statistics) {
        dispatch(fetchUserStatisticsThunk());
      }
    }
  }, [dispatch, isLoading, statistics]);

  const refreshUsers = (skip?: number, take?: number) => {
    dispatch(fetchUsersThunk({ skip: skip || 0, take: take || 50 }));
  };

  const refreshStatistics = () => {
    dispatch(fetchUserStatisticsThunk());
  };

  return {
    users,
    isLoading,
    error,
    totalCount,
    statistics,
    statisticsLoading,
    statisticsError,
    refreshUsers,
    refreshStatistics,
  };
};

