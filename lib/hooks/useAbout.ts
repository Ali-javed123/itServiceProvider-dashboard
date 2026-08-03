// hooks/useAbout.ts
import { useState, useCallback, useEffect } from 'react';
import { aboutService } from '@/utils/about.service.helper';
import { IPage, ApiResponse } from '@/types/about.type';
import { useApi } from '@/lib/useApi';
import { toast } from 'sonner';

export function useAbout() {
  const [aboutData, setAboutData] = useState<IPage | null>(null);
  const [allPages, setAllPages] = useState<IPage[]>([]);
  const { execute, loading, error } = useApi<IPage>();

  // Fetch all about pages
  const fetchAll = useCallback(async () => {
    try {
      const response = await execute(aboutService.getAll());
      if (response?.data) {
        setAllPages(response.data);
        return response.data;
      }
    } catch (err) {
      toast.error('Failed to fetch about pages');
      console.warn('Fetch error:', err);
    }
  }, [execute]);

  // Fetch single about page by ID
  const fetchById = useCallback(async (id: string) => {
    try {
      const response = await execute(aboutService.getById(id));
      if (response?.data) {
        setAboutData(response.data);
        return response.data;
      }
    } catch (err) {
      toast.error('Failed to fetch about page');
      console.warn('Fetch error:', err);
    }
  }, [execute]);

  // Create new about page
  const createAbout = useCallback(async (formData: FormData) => {
    try {
      const response = await execute(aboutService.create(formData));
      if (response?.success) {
        toast.success('About page created successfully');
        await fetchAll();
        return response.data;
      }
    } catch (err) {
      toast.error('Failed to create about page');
      console.warn('Create error:', err);
    }
  }, [execute, fetchAll]);

  // Update about page
  const updateAbout = useCallback(async (id: string, formData: FormData) => {
    try {
      const response = await execute(aboutService.update(id, formData));
      if (response?.success) {
        toast.success('About page updated successfully');
        await fetchById(id);
        await fetchAll();
        return response.data;
      }
    } catch (err) {
      toast.error('Failed to update about page');
      console.warn('Update error:', err);
    }
  }, [execute, fetchById, fetchAll]);

  // Delete about page
  const deleteAbout = useCallback(async (id: string) => {
    try {
      const response = await execute(aboutService.delete(id));
      if (response?.success) {
        toast.success('About page deleted successfully');
        await fetchAll();
        if (aboutData?._id === id) {
          setAboutData(null);
        }
        return true;
      }
    } catch (err) {
      toast.error('Failed to delete about page');
      console.warn('Delete error:', err);
    }
  }, [execute, fetchAll, aboutData]);

  // Initial load
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    aboutData,
    allPages,
    loading,
    error,
    fetchAll,
    fetchById,
    createAbout,
    updateAbout,
    deleteAbout,
  };
}