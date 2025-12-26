import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminService } from '../services/adminService';
import {
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
  setBooksLoading,
  setBooks,
  setBooksError,
  removeBook,
  updateBook,
} from './adminSlice';
import type { CreateUserRequest, AssignRoleRequest, DisableUserRequest, UpdateUserRequest } from '../users/types';
import type { RemoveBookRequest, CreateBookRequest, UpdateBookRequest, SetPricingRequest } from '../books/types';
import type { RootState } from '../../../app/store';

export const fetchAllStatisticsThunk = createAsyncThunk(
  'admin/fetchAllStatistics',
  async (_, { dispatch }) => {
    dispatch(setUserStatisticsLoading(true));
    dispatch(setBookStatisticsLoading(true));
    dispatch(setOrderStatisticsLoading(true));
    dispatch(setEntitlementStatisticsLoading(true));

    dispatch(setUserStatisticsError(null));
    dispatch(setBookStatisticsError(null));
    dispatch(setOrderStatisticsError(null));
    dispatch(setEntitlementStatisticsError(null));

    const results = await Promise.allSettled([
      adminService.getUserStatistics(),
      adminService.getBookStatistics(),
      adminService.getOrderStatistics(),
      adminService.getEntitlementStatistics(),
    ]);

    if (results[0].status === 'fulfilled') {
      dispatch(setUserStatistics(results[0].value));
    } else {
      const errorMessage =
        results[0].reason?.response?.data?.message ||
        'Failed to load user statistics.';
      dispatch(setUserStatisticsError(errorMessage));
    }
    dispatch(setUserStatisticsLoading(false));

    if (results[1].status === 'fulfilled') {
      dispatch(setBookStatistics(results[1].value));
    } else {
      const errorMessage =
        results[1].reason?.response?.data?.message ||
        'Failed to load book statistics.';
      dispatch(setBookStatisticsError(errorMessage));
    }
    dispatch(setBookStatisticsLoading(false));

    if (results[2].status === 'fulfilled') {
      dispatch(setOrderStatistics(results[2].value));
    } else {
      const errorMessage =
        results[2].reason?.response?.data?.message ||
        'Failed to load order statistics.';
      dispatch(setOrderStatisticsError(errorMessage));
    }
    dispatch(setOrderStatisticsLoading(false));

    if (results[3].status === 'fulfilled') {
      dispatch(setEntitlementStatistics(results[3].value));
    } else {
      const errorMessage =
        results[3].reason?.response?.data?.message ||
        'Failed to load entitlement statistics.';
      dispatch(setEntitlementStatisticsError(errorMessage));
    }
    dispatch(setEntitlementStatisticsLoading(false));

    return {
      users: results[0].status === 'fulfilled' ? results[0].value : null,
      books: results[1].status === 'fulfilled' ? results[1].value : null,
      orders: results[2].status === 'fulfilled' ? results[2].value : null,
      entitlements: results[3].status === 'fulfilled' ? results[3].value : null,
    };
  }
);

export const createUserThunk = createAsyncThunk(
  'admin/createUser',
  async (data: CreateUserRequest, { dispatch, rejectWithValue }) => {
    try {
      const userId = await adminService.createUser(data);
      await dispatch(fetchUsersThunk({ skip: 0, take: 20 }));
      return userId;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to create user. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const assignRoleThunk = createAsyncThunk(
  'admin/assignRole',
  async (
    { userId, data }: { userId: string; data: AssignRoleRequest },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await adminService.assignRole(userId, data);
      const state = getState() as RootState;
      const user = state.admin.users.items.find(u => u.id === userId);
      if (user && !user.roles.includes(data.role)) {
        dispatch(updateUser({ ...user, roles: [...user.roles, data.role] }));
      }
      return { userId, role: data.role };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to assign role. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeRoleThunk = createAsyncThunk(
  'admin/removeRole',
  async (
    { userId, role }: { userId: string; role: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await adminService.removeRole(userId, role);
      const state = getState() as RootState;
      const user = state.admin.users.items.find(u => u.id === userId);
      if (user) {
        dispatch(updateUser({ ...user, roles: user.roles.filter(r => r !== role) }));
      }
      return { userId, role };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to remove role. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const disableUserThunk = createAsyncThunk(
  'admin/disableUser',
  async (
    { userId, data }: { userId: string; data: DisableUserRequest },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await adminService.disableUser(userId, data);
      const state = getState() as RootState;
      const user = state.admin.users.items.find(u => u.id === userId);
      if (user) {
        dispatch(updateUser({ ...user, status: 'Disabled' }));
      }
      return userId;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to disable user. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const enableUserThunk = createAsyncThunk(
  'admin/enableUser',
  async (userId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      await adminService.enableUser(userId);
      const state = getState() as RootState;
      const user = state.admin.users.items.find(u => u.id === userId);
      if (user) {
        dispatch(updateUser({ ...user, status: 'Active' }));
      }
      return userId;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to enable user. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUsersThunk = createAsyncThunk(
  'admin/fetchUsers',
  async ({ skip = 0, take = 20 }: { skip?: number; take?: number } = {}, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setUsersLoading(true));
      dispatch(setUsersError(null));

      const response = await adminService.getUsers(skip, take);
      dispatch(setUsers({ items: response.users, totalCount: response.totalCount }));

      return response;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load users. Please try again.';
      dispatch(setUsersError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setUsersLoading(false));
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'admin/updateUser',
  async (
    { userId, data }: { userId: string; data: UpdateUserRequest },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const updatedUser = await adminService.updateUser(userId, data);
      const state = getState() as RootState;
      const userIndex = state.admin.users.items.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        dispatch(updateUser(updatedUser));
      }
      return updatedUser;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to update user. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchBooksThunk = createAsyncThunk(
  'admin/fetchBooks',
  async (
    { searchTerm, page = 1, pageSize = 20 }: { searchTerm?: string; page?: number; pageSize?: number } = {},
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setBooksLoading(true));
      dispatch(setBooksError(null));

      const response = await adminService.getBooks(searchTerm, page, pageSize);
      dispatch(setBooks({
        items: response.books,
        totalCount: response.totalCount,
        page: response.page,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
      }));

      return response;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load books. Please try again.';
      dispatch(setBooksError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setBooksLoading(false));
    }
  }
);

export const removeBookThunk = createAsyncThunk(
  'admin/removeBook',
  async (
    { bookId, data }: { bookId: string; data: RemoveBookRequest },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await adminService.removeBook(bookId, data);
      dispatch(removeBook(bookId));
      return bookId;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to remove book. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserStatisticsThunk = createAsyncThunk(
  'admin/fetchUserStatistics',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setUserStatisticsLoading(true));
      dispatch(setUserStatisticsError(null));

      const statistics = await adminService.getUserStatistics();
      dispatch(setUserStatistics(statistics));

      return statistics;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load user statistics. Please try again.';
      dispatch(setUserStatisticsError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setUserStatisticsLoading(false));
    }
  }
);

export const fetchBookStatisticsThunk = createAsyncThunk(
  'admin/fetchBookStatistics',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setBookStatisticsLoading(true));
      dispatch(setBookStatisticsError(null));

      const statistics = await adminService.getBookStatistics();
      dispatch(setBookStatistics(statistics));

      return statistics;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load book statistics. Please try again.';
      dispatch(setBookStatisticsError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setBookStatisticsLoading(false));
    }
  }
);

export const fetchOrderStatisticsThunk = createAsyncThunk(
  'admin/fetchOrderStatistics',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setOrderStatisticsLoading(true));
      dispatch(setOrderStatisticsError(null));

      const statistics = await adminService.getOrderStatistics();
      dispatch(setOrderStatistics(statistics));

      return statistics;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load order statistics. Please try again.';
      dispatch(setOrderStatisticsError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setOrderStatisticsLoading(false));
    }
  }
);

export const fetchEntitlementStatisticsThunk = createAsyncThunk(
  'admin/fetchEntitlementStatistics',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setEntitlementStatisticsLoading(true));
      dispatch(setEntitlementStatisticsError(null));

      const statistics = await adminService.getEntitlementStatistics();
      dispatch(setEntitlementStatistics(statistics));

      return statistics;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to load entitlement statistics. Please try again.';
      dispatch(setEntitlementStatisticsError(errorMessage));
      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setEntitlementStatisticsLoading(false));
    }
  }
);

export const createBookThunk = createAsyncThunk(
  'admin/createBook',
  async (data: CreateBookRequest, { rejectWithValue }) => {
    try {
      const bookId = await adminService.createBook(data);
      return bookId;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to create book. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateBookThunk = createAsyncThunk(
  'admin/updateBook',
  async (
    { bookId, data }: { bookId: string; data: UpdateBookRequest },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const updatedBook = await adminService.updateBook(bookId, data);
      dispatch(updateBook(updatedBook));
      return updatedBook;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to update book. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const setPricingThunk = createAsyncThunk(
  'admin/setPricing',
  async (
    { bookId, data }: { bookId: string; data: SetPricingRequest },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await adminService.setPricing(bookId, data);
      const updatedBook = await adminService.getBook(bookId);
      dispatch(updateBook(updatedBook));
      return updatedBook;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to set pricing. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const publishBookThunk = createAsyncThunk(
  'admin/publishBook',
  async (bookId: string, { dispatch, rejectWithValue }) => {
    try {
      await adminService.publishBook(bookId);
      const updatedBook = await adminService.getBook(bookId);
      dispatch(updateBook(updatedBook));
      return updatedBook;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to publish book. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const unlistBookThunk = createAsyncThunk(
  'admin/unlistBook',
  async (bookId: string, { dispatch, rejectWithValue }) => {
    try {
      await adminService.unlistBook(bookId);
      const updatedBook = await adminService.getBook(bookId);
      dispatch(updateBook(updatedBook));
      return updatedBook;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to unlist book. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

