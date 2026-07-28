// lib/api/banner.api.ts
import { api } from '@/lib/api';
import { IBanner, ApiResponse } from '@/types/banner.types';

const BASE_URL = '/homebanner';

export const bannerApi = {
  // Get all banners
  getAll: async (): Promise<ApiResponse<IBanner[]>> => {
    return api.get<IBanner[]>(`/homebanner`);
  },

  // Get single banner by ID
  getById: async (id: string): Promise<ApiResponse<IBanner>> => {
    return api.get<IBanner>(`${BASE_URL}/${id}`);
  },

  // Create banner with FormData
  create: async (formData: FormData): Promise<ApiResponse<IBanner>> => {
    return api.post<IBanner, FormData>(`/homebanner`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update banner with FormData
  update: async (id: string, formData: FormData): Promise<ApiResponse<IBanner>> => {
    return api.put<IBanner, FormData>(`${BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete banner
  delete: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete<null>(`${BASE_URL}/${id}`);
  },
};