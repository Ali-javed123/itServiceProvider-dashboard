// hooks/useCategories.ts
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import type { ServiceCategory, ServiceCategoryFormValues, CategoryResponse, SingleCategoryResponse } from '../../types/serviceCategory';

export const useCategories = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const isSubmittingRef = useRef<boolean>(false);

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get<CategoryResponse>('/service-category', {
    // headers: {
    //   "Cache-Control": "no-cache",
    //   "Pragma": "no-cache",
    //   "Expires": "0",
    // },

      });
      
      const payload = response.data;
      if (payload?.success && Array.isArray(payload.data)) {
        setCategories(payload.data);
      } else if (Array.isArray(payload)) {
        setCategories(payload);
      } else {
        setCategories([]);
        console.warn('⚠️ Unexpected data format:', payload);
      }
    } catch (err: any) {
      console.error('❌ Error fetching categories:', err);
      setError(err.message || 'Failed to load categories');
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create category
// Create category
const createCategory = useCallback(
    async (values: ServiceCategoryFormValues) => {
      if (isSubmittingRef.current || isButtonDisabled) return;

      isSubmittingRef.current = true;
      setIsButtonDisabled(true);
      setIsSubmitting(true);

      try {
        const payload = await api.post<ServiceCategory>(
          "/service-category",
          values
        );

        console.log("Payload:", payload);

        if (payload?.success && payload?.data) {
          toast.success(
            `Category "${payload.data.serviceCategory}" created successfully!`
          );

          await fetchCategories();

          return {
            success: true,
            data: payload.data,
          };
        }

        toast.error(payload?.message ?? "Failed to create category");
        return { success: false };
      } catch (err: any) {
        console.error("❌ Error creating category:", err);
        toast.error(
          err?.response?.data?.message ??
            err?.message ??
            "Failed to create category"
        );
        return { success: false };
      } finally {
        setIsSubmitting(false);
        setTimeout(() => {
          isSubmittingRef.current = false;
          setIsButtonDisabled(false);
        }, 500);
      }
    },
    [fetchCategories, isButtonDisabled]
  );
  // Update category
  const updateCategory = useCallback(async (id: string, values: ServiceCategoryFormValues) => {
    if (!id || isSubmittingRef.current || isButtonDisabled) return;
    
    isSubmittingRef.current = true;
    setIsButtonDisabled(true);
    setIsSubmitting(true);
    
    try {
      const response = await api.put<SingleCategoryResponse>(`/service-category/${id}`, values);
      const payload = response.data;
      console.log("pyload",payload?.success)
      if (payload.success ) {
        console.log("")
  toast.success(
    `Category "${payload.data.serviceCategory}" created successfully!`
  );

  await fetchCategories();

  return {
    success: true,
    data: payload.data,
  };
}

      toast.error(payload?.message || 'Failed to update category');
      return { success: false };
    } catch (err: any) {
      console.error('❌ Error updating category:', err);
      toast.error(err.response?.data?.message || 'Failed to update category');
      return { success: false };
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        isSubmittingRef.current = false;
        setIsButtonDisabled(false);
      }, 500);
    }
  }, [fetchCategories, isButtonDisabled]);

  // Delete category
  const deleteCategory = useCallback(async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    if (isSubmittingRef.current || isButtonDisabled) return;
    
    isSubmittingRef.current = true;
    setIsButtonDisabled(true);
    
    try {
      const response = await api.delete<{ success: boolean; message?: string }>(
        `/service-category/${id}`
      );
      const payload = response.data;
      
      if (response?.success) {
        toast.success('Category deleted successfully!');
        await fetchCategories();
        return { success: true };
      }
      toast.error(payload?.message || 'Failed to delete category');
      return { success: false };
    } catch (err: any) {
      console.error('❌ Error deleting category:', err);
      toast.error(err.response?.data?.message || 'Failed to delete category');
      return { success: false };
    } finally {
      setTimeout(() => {
        isSubmittingRef.current = false;
        setIsButtonDisabled(false);
      }, 500);
    }
  }, [fetchCategories, isButtonDisabled]);




  
  return {
    categories,
    loading,
    error,
    isSubmitting,
    isButtonDisabled,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};



