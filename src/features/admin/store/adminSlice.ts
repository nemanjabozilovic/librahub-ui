import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  UserStatisticsDto,
  BookStatisticsDto,
  OrderStatisticsDto,
  EntitlementStatisticsDto,
} from '../shared/types';
import type { UserDetails } from '../users/types';
import type { BookDetails } from '../books/types';

interface AdminState {
  statistics: {
    users: {
      data: UserStatisticsDto | null;
      isLoading: boolean;
      error: string | null;
    };
    books: {
      data: BookStatisticsDto | null;
      isLoading: boolean;
      error: string | null;
    };
    orders: {
      data: OrderStatisticsDto | null;
      isLoading: boolean;
      error: string | null;
    };
    entitlements: {
      data: EntitlementStatisticsDto | null;
      isLoading: boolean;
      error: string | null;
    };
  };
  users: {
    items: UserDetails[];
    totalCount: number;
    isLoading: boolean;
    error: string | null;
  };
  books: {
    items: BookDetails[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: AdminState = {
  statistics: {
    users: {
      data: null,
      isLoading: false,
      error: null,
    },
    books: {
      data: null,
      isLoading: false,
      error: null,
    },
    orders: {
      data: null,
      isLoading: false,
      error: null,
    },
    entitlements: {
      data: null,
      isLoading: false,
      error: null,
    },
  },
  users: {
    items: [],
    totalCount: 0,
    isLoading: false,
    error: null,
  },
  books: {
    items: [],
    totalCount: 0,
    page: 1,
    pageSize: 20,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUserStatisticsLoading: (state, action: PayloadAction<boolean>) => {
      state.statistics.users.isLoading = action.payload;
    },
    setUserStatistics: (state, action: PayloadAction<UserStatisticsDto>) => {
      state.statistics.users.data = action.payload;
      state.statistics.users.error = null;
    },
    setUserStatisticsError: (state, action: PayloadAction<string | null>) => {
      state.statistics.users.error = action.payload;
    },
    setBookStatisticsLoading: (state, action: PayloadAction<boolean>) => {
      state.statistics.books.isLoading = action.payload;
    },
    setBookStatistics: (state, action: PayloadAction<BookStatisticsDto>) => {
      state.statistics.books.data = action.payload;
      state.statistics.books.error = null;
    },
    setBookStatisticsError: (state, action: PayloadAction<string | null>) => {
      state.statistics.books.error = action.payload;
    },
    setOrderStatisticsLoading: (state, action: PayloadAction<boolean>) => {
      state.statistics.orders.isLoading = action.payload;
    },
    setOrderStatistics: (state, action: PayloadAction<OrderStatisticsDto>) => {
      state.statistics.orders.data = action.payload;
      state.statistics.orders.error = null;
    },
    setOrderStatisticsError: (state, action: PayloadAction<string | null>) => {
      state.statistics.orders.error = action.payload;
    },
    setEntitlementStatisticsLoading: (state, action: PayloadAction<boolean>) => {
      state.statistics.entitlements.isLoading = action.payload;
    },
    setEntitlementStatistics: (state, action: PayloadAction<EntitlementStatisticsDto>) => {
      state.statistics.entitlements.data = action.payload;
      state.statistics.entitlements.error = null;
    },
    setEntitlementStatisticsError: (state, action: PayloadAction<string | null>) => {
      state.statistics.entitlements.error = action.payload;
    },
    setUsersLoading: (state, action: PayloadAction<boolean>) => {
      state.users.isLoading = action.payload;
    },
    setUsers: (state, action: PayloadAction<{ items: UserDetails[]; totalCount: number }>) => {
      state.users.items = action.payload.items;
      state.users.totalCount = action.payload.totalCount;
      state.users.error = null;
    },
    setUsersError: (state, action: PayloadAction<string | null>) => {
      state.users.error = action.payload;
    },
    updateUser: (state, action: PayloadAction<UserDetails>) => {
      const index = state.users.items.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users.items[index] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users.items = state.users.items.filter(u => u.id !== action.payload);
      state.users.totalCount = Math.max(0, state.users.totalCount - 1);
    },
    setBooksLoading: (state, action: PayloadAction<boolean>) => {
      state.books.isLoading = action.payload;
    },
    setBooks: (state, action: PayloadAction<{ items: BookDetails[]; totalCount: number; page: number; pageSize: number; totalPages: number }>) => {
      state.books.items = action.payload.items;
      state.books.totalCount = action.payload.totalCount;
      state.books.page = action.payload.page;
      state.books.pageSize = action.payload.pageSize;
      state.books.totalPages = action.payload.totalPages;
      state.books.error = null;
    },
    setBooksError: (state, action: PayloadAction<string | null>) => {
      state.books.error = action.payload;
    },
    removeBook: (state, action: PayloadAction<string>) => {
      const book = state.books.items.find(b => b.id === action.payload);
      if (book) {
        book.status = 'Removed';
      }
    },
    updateBook: (state, action: PayloadAction<BookDetails>) => {
      const index = state.books.items.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.books.items[index] = action.payload;
      }
    },
  },
});

export const {
  setUserStatisticsLoading,
  setUserStatistics,
  setUserStatisticsError,
  setBookStatisticsLoading,
  setBookStatistics,
  setBookStatisticsError,
  setOrderStatisticsLoading,
  setOrderStatistics,
  setOrderStatisticsError,
  setEntitlementStatisticsLoading,
  setEntitlementStatistics,
  setEntitlementStatisticsError,
  setUsersLoading,
  setUsers,
  setUsersError,
  updateUser,
  removeUser,
  setBooksLoading,
  setBooks,
  setBooksError,
  removeBook,
  updateBook,
} = adminSlice.actions;

export default adminSlice.reducer;

