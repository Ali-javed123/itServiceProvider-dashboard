// services/about.service.ts
import { api } from '@/lib/api';
import { IPage, CreatePageDto, UpdatePageDto, ApiResponse } from '@/types/about.type';

const BASE_URL = '/aboutus';

export const aboutService = {
  // Get all about pages
  getAll: async (): Promise<ApiResponse<IPage[]>> => {
    return api.get<IPage[]>(BASE_URL);
  },

  // Get single about page by ID
  getById: async (id: string): Promise<ApiResponse<IPage>> => {
    return api.get<IPage>(`${BASE_URL}/${id}`);
  },

  // Create new about page with FormData (for file uploads)
  create: async (data: FormData): Promise<ApiResponse<IPage>> => {
    return api.post<IPage, FormData>(BASE_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update existing about page
  update: async (id: string, data: FormData): Promise<ApiResponse<IPage>> => {
    return api.put<IPage, FormData>(`${BASE_URL}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete about page
  delete: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete<null>(`${BASE_URL}/${id}`);
  },
};