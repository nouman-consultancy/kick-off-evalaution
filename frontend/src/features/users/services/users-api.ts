import { apiClient } from '@/shared/lib/api';
import { API_ENDPOINTS } from '@/shared/lib/constants';

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: 'user' | 'admin';
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  role?: 'user' | 'admin';
  avatar?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const usersApi = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get(API_ENDPOINTS.users.list, {
      params: { page, limit },
    });
    return response.data.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await apiClient.get(API_ENDPOINTS.users.get(id));
    return response.data.data;
  },

  create: async (data: CreateUserDto): Promise<User> => {
    const response = await apiClient.post(API_ENDPOINTS.users.create, data);
    return response.data.data;
  },

  update: async (id: number, data: UpdateUserDto): Promise<User> => {
    const response = await apiClient.patch(API_ENDPOINTS.users.update(id), data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.users.delete(id));
  },
};