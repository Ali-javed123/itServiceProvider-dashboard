// lib/api/ourBenefits.helper.ts
import { api } from '@/lib/api';
import { OurBenefits } from '@/types/benefit.types';
import { ApiResponse } from '@/types/api';

const BASE_URL = '/ourbenefits';

export const ourBenefitsService = {
  /**
   * Get all benefit sections
   */
  getAll: async (): Promise<any> => {
    return api.get<OurBenefits[]>(BASE_URL);
  },

  /**
   * Get a single benefit section by ID
   */
  getById: async (id: string): Promise<any> => {
    return api.get<OurBenefits>(`${BASE_URL}/${id}`);
  },

  /**
   * Create a new benefit section with image uploads
   * IMPORTANT: Do NOT set Content-Type header
   */
  create: async (formData: FormData): Promise<any> => {
    // Let the browser set the Content-Type with boundary
    return api.post<OurBenefits, FormData>(BASE_URL, formData);
  },

  /**
   * Update an existing benefit section
   * IMPORTANT: Do NOT set Content-Type header
   */
  update: async (id: string, formData: FormData): Promise<any> => {
    return api.put<OurBenefits, FormData>(`${BASE_URL}/${id}`, formData);
  },

  /**
   * Delete a benefit section
   */
  delete: async (id: string): Promise<any> => {
    return api.delete<null>(`${BASE_URL}/${id}`);
  },
};