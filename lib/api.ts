// lib/api.ts
import { apiClient, ApiErrorResponse } from './axios-client';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

// Standard API Response Wrapper (Aapke backend ke hisaab se change kar lein)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Generic Request Config with AbortController support (Next.js 16 best practice)
type RequestConfig = AxiosRequestConfig & {
  signal?: AbortSignal;
};

// --- FUNCTIONAL API WRAPPER ---
export const api = {
  /**
   * GET Request
   */
  get: async <T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(url, config);
    return response.data;
  },

  /**
   * POST Request
   */
  post: async <T, D = any>(url: string, data?: D, config?: RequestConfig): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(url, data, config);
    return response.data;
  },

  /**
   * PUT Request
   */
  put: async <T, D = any>(url: string, data?: D, config?: RequestConfig): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(url, data, config);
    return response.data;
  },

  /**
   * PATCH Request
   */
  patch: async <T, D = any>(url: string, data?: D, config?: RequestConfig): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.patch(url, data, config);
    return response.data;
  },

  /**
   * DELETE Request
   */
  delete: async <T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(url, config);
    return response.data;
  },
};