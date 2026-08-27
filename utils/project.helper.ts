// lib/api/ourBenefits.helper.ts
import { api } from '@/lib/api';
import { Project } from '@/types/projects.type';
import { ApiResponse } from '@/types/api';

const BASE_URL = '/projects';

export const ProjectService = {
  /**
   * Get all benefit sections
   */
  getAll: async (): Promise<any> => {
    return api.get<Project[]>(BASE_URL);
  },

  /**
   * Get a single benefit section by ID
   */
  getById: async (id: string): Promise<any> => {
    return api.get<Project>(`${BASE_URL}/${id}`);
  },

  /**
   * Create a new benefit section with image uploads
   * IMPORTANT: Do NOT set Content-Type header
   */
  create: async (formData: FormData): Promise<any> => {
    // Let the browser set the Content-Type with boundary
    return api.post<Project, FormData>(BASE_URL, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  },

  /**
   * Update an existing benefit section
   * IMPORTANT: Do NOT set Content-Type header
   */
  update: async (id: string, formData: FormData): Promise<any> => {
    return api.put<Project, FormData>(`${BASE_URL}/${id}`, formData);
  },

  /**
   * Delete a benefit section
   */
  delete: async (id: string): Promise<any> => {
    return api.delete<null>(`${BASE_URL}/${id}`);
  },
};