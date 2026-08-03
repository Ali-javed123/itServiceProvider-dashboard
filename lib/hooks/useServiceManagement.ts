// lib/hooks/useServiceManagement.ts
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { CategoryItem, ServiceFormValues, CategoryResponse } from '@/types/service.types';

export const useServiceManagement = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const getServiceCategory = async () => {
    try {
      const response = await api.get<CategoryResponse>('/service-category');
      
      const payload = response.data;
      if (payload && payload.success && Array.isArray(payload.data)) {
        setCategories(payload.data);
        if (payload.data.length > 0) {
          setSelectedCategory(payload.data[0]._id);
        }
      } else if (Array.isArray(payload)) {
        setCategories(payload);
        if (payload.length > 0) {
          setSelectedCategory(payload[0]._id);
        }
      }
    } catch (error) {
      console.warn('❌ Error fetching service categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const createService = async (values: ServiceFormValues): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // ✅ Append all text fields
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('icon', values.icon);
      
      // ✅ Append image if exists
      if (values.image && values.image instanceof File) {
        formData.append('image', values.image);
        console.log('📸 Image attached:', values.image.name, values.image.size);
      }

      // ✅ Log FormData entries for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response: any = await api.post('/service', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // ✅ Important for FormData
        },
      });

      if (response.success) {
        toast.success('Service created successfully!');
        await getServiceCategory();
        return true;
      } else {
        toast.error(response.message || 'Failed to create service');
        return false;
      }
    } catch (error: any) {
      console.warn('Error creating service:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateService = async (id: string, values: ServiceFormValues): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // ✅ Append all text fields
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('icon', values.icon);
      
      // ✅ Append image only if new file is selected
      if (values.image && values.image instanceof File) {
        formData.append('image', values.image);
        console.log('📸 New image attached:', values.image.name, values.image.size);
      }

      // ✅ Log FormData entries
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response: any = await api.put(`/service/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.success) {
        toast.success('Service updated successfully!');
        await getServiceCategory();
        return true;
      } else {
        toast.error(response.message || 'Failed to update service');
        return false;
      }
    } catch (error: any) {
      console.warn('Error updating service:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteService = async (id: string): Promise<boolean> => {
    if (!confirm('Are you sure you want to delete this service?')) return false;
    
    try {
      const response: any = await api.delete(`/service/${id}`);
      
      if (response.success) {
        toast.success('Service deleted successfully!');
        await getServiceCategory();
        return true;
      } else {
        toast.error(response.message || 'Failed to delete service');
        return false;
      }
    } catch (error: any) {
      console.warn('Error deleting service:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
      return false;
    }
  };

  useEffect(() => {
    getServiceCategory();
  }, []);

  return {
    categories,
    loading,
    isSubmitting,
    selectedCategory,
    setSelectedCategory,
    createService,
    updateService,
    deleteService,
    getServiceCategory,
  };
};