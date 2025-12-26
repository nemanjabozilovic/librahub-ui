import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  fetchBooksThunk,
  fetchBookStatisticsThunk,
} from '../../store/adminThunks';
import {
  selectBooks,
  selectBooksLoading,
  selectBooksError,
  selectBooksTotalCount,
  selectBooksPage,
  selectBooksPageSize,
  selectBooksTotalPages,
  selectBookStatistics,
} from '../../store/adminSelectors';

export const useBooks = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const isLoading = useAppSelector(selectBooksLoading);
  const error = useAppSelector(selectBooksError);
  const totalCount = useAppSelector(selectBooksTotalCount);
  const currentPage = useAppSelector(selectBooksPage);
  const pageSize = useAppSelector(selectBooksPageSize);
  const totalPages = useAppSelector(selectBooksTotalPages);
  const statistics = useAppSelector(selectBookStatistics);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && !isLoading) {
      hasFetched.current = true;
      dispatch(fetchBooksThunk({ page: 1, pageSize: 50 }));
      if (!statistics) {
        dispatch(fetchBookStatisticsThunk());
      }
    }
  }, [dispatch, isLoading, statistics]);

  const refreshBooks = (searchTerm?: string, page?: number) => {
    dispatch(fetchBooksThunk({ searchTerm, page: page || currentPage, pageSize }));
  };

  const refreshStatistics = () => {
    dispatch(fetchBookStatisticsThunk());
  };

  return {
    books,
    isLoading,
    error,
    totalCount,
    currentPage,
    pageSize,
    totalPages,
    statistics,
    refreshBooks,
    refreshStatistics,
  };
};

