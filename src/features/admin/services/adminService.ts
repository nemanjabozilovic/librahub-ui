import { apiClient } from '@/shared/services/api/client';
import type {
  UserStatisticsDto,
  BookStatisticsDto,
  OrderStatisticsDto,
  EntitlementStatisticsDto,
} from '../shared/types';
import type { CreateUserRequest, AssignRoleRequest, DisableUserRequest, UpdateUserRequest, UserDetails, UsersListResponse } from '../users/types';
import type { BooksListResponse, BookDetails, RemoveBookRequest, CreateBookRequest, UpdateBookRequest, SetPricingRequest } from '../books/types';
import type { ValueResponse } from '@/shared/types/api.types';

export const adminService = {
  async getUserStatistics(): Promise<UserStatisticsDto> {
    const response = await apiClient.get<UserStatisticsDto>('/admin/statistics/users');
    return response.data;
  },

  async getBookStatistics(): Promise<BookStatisticsDto> {
    const response = await apiClient.get<BookStatisticsDto>('/admin/statistics/books');
    return response.data;
  },

  async getOrderStatistics(): Promise<OrderStatisticsDto> {
    const response = await apiClient.get<OrderStatisticsDto>('/admin/statistics/orders');
    return response.data;
  },

  async getEntitlementStatistics(): Promise<EntitlementStatisticsDto> {
    const response = await apiClient.get<EntitlementStatisticsDto>('/admin/statistics/entitlements');
    return response.data;
  },

  async getUsers(skip: number = 0, take: number = 20): Promise<UsersListResponse> {
    try {
      const response = await apiClient.get<UsersListResponse>(`/users?skip=${skip}&take=${take}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return { users: [], totalCount: 0 };
      }
      throw error;
    }
  },

  async createUser(data: CreateUserRequest): Promise<string> {
    const response = await apiClient.post<ValueResponse>('/users', data);
    return response.data.value;
  },

  async assignRole(userId: string, data: AssignRoleRequest): Promise<void> {
    await apiClient.post(`/users/${userId}/roles`, data);
  },

  async removeRole(userId: string, role: string): Promise<void> {
    await apiClient.delete(`/users/${userId}/roles/${role}`);
  },

  async disableUser(userId: string, data: DisableUserRequest): Promise<void> {
    await apiClient.post(`/users/${userId}/disable`, data);
  },

  async enableUser(userId: string): Promise<void> {
    await apiClient.post(`/users/${userId}/enable`);
  },

  async updateUser(userId: string, data: UpdateUserRequest): Promise<UserDetails> {
    const response = await apiClient.put<UserDetails>(`/users/${userId}`, data);
    return response.data;
  },

  async uploadAvatar(userId: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<ValueResponse>(
      `/users/${userId}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.value;
  },

  async getBooks(searchTerm?: string, page: number = 1, pageSize: number = 20): Promise<BooksListResponse> {
    const params = new URLSearchParams();
    if (searchTerm) params.append('searchTerm', searchTerm);
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    
    const response = await apiClient.get<BooksListResponse>(`/books?${params.toString()}`);
    return response.data;
  },

  async getBook(bookId: string): Promise<BookDetails> {
    const response = await apiClient.get<BookDetails>(`/books/${bookId}`);
    return response.data;
  },

  async removeBook(bookId: string, data: RemoveBookRequest): Promise<void> {
    await apiClient.post(`/books/${bookId}/remove`, data);
  },


  async uploadCover(bookId: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<ValueResponse>(
      `/books/${bookId}/cover`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.value;
  },

  async uploadEdition(bookId: string, file: File, format: string, version?: number): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    if (version !== undefined) {
      formData.append('version', version.toString());
    }
    
    const response = await apiClient.post<ValueResponse>(
      `/books/${bookId}/editions`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.value;
  },

  async createBook(data: CreateBookRequest): Promise<string> {
    const response = await apiClient.post<ValueResponse>('/books', data);
    return response.data.value;
  },

  async updateBook(bookId: string, data: UpdateBookRequest): Promise<BookDetails> {
    const response = await apiClient.put<BookDetails>(`/books/${bookId}`, data);
    return response.data;
  },

  async setPricing(bookId: string, data: SetPricingRequest): Promise<void> {
    await apiClient.post(`/books/${bookId}/pricing`, data);
  },

  async publishBook(bookId: string): Promise<void> {
    await apiClient.post(`/books/${bookId}/publish`);
  },

  async unlistBook(bookId: string): Promise<void> {
    await apiClient.post(`/books/${bookId}/unlist`);
  },
};

