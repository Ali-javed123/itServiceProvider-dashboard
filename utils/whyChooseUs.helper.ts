// services/whyChooseUs.service.ts
import {api} from '@/lib/api'; // Your API client instance
import { IChooseUs, CreateChooseUsInput, UpdateChooseUsInput } from '@/types/whyChooseUs.types';

export const whyChooseUsService = {
  // Get all sections
  getSections: async (): Promise<IChooseUs[]> => {
    const response = await api.get('/chooseus');
    return response.data as any;
  },

  // Create new section
  createSection: async (data: CreateChooseUsInput): Promise<IChooseUs> => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append(key, value);
      } else if (key === 'featured') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    const response = await api.post('/chooseus', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as any;
  },

  // Update section
  updateSection: async (id: string, data: UpdateChooseUsInput): Promise<IChooseUs> => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') return;
      if (key === 'image' && value instanceof File) {
        formData.append(key, value);
      } else if (key === 'featured' && value) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const response = await api.put(`/chooseus/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as any;
  },

  // Delete section
  deleteSection: async (id: string): Promise<void> => {
    await api.delete(`/chooseus/${id}`);
  },
};