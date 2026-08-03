// lib/hooks/useAboutManagement.ts
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { aboutService } from '@/utils/about.service.helper';
import { IPage } from '@/types/about.type';

export const useAboutManagement = () => {
  const [aboutPages, setAboutPages] = useState<IPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<IPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all about pages
  const fetchAllAboutPages = async () => {
    setLoading(true);
    try {
      const response = await aboutService.getAll();
      if (response?.success && response?.data) {
        setAboutPages(response.data);
        if (response.data.length > 0) {
          setSelectedPage(response.data[0]);
        }
      }
    } catch (error) {
      console.warn('❌ Error fetching about pages:', error);
      toast.error('Failed to load about pages');
    } finally {
      setLoading(false);
    }
  };

  // Create new about page - ✅ Changed to return Promise<void>
  const createAboutPage = async (formData: FormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await aboutService.create(formData);
      
      if (response?.success) {
        toast.success('About page created successfully!');
        await fetchAllAboutPages();
      } else {
        toast.error(response?.message || 'Failed to create about page');
      }
    } catch (error: any) {
      console.warn('Error creating about page:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update about page - ✅ Changed to return Promise<void>
  const updateAboutPage = async (id: string, formData: FormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await aboutService.update(id, formData);
      
      if (response?.success) {
        toast.success('About page updated successfully!');
        await fetchAllAboutPages();
      } else {
        toast.error(response?.message || 'Failed to update about page');
      }
    } catch (error: any) {
      console.warn('Error updating about page:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete about page - ✅ Changed to return Promise<void>
  const deleteAboutPage = async (id: string): Promise<void> => {
    if (!confirm('Are you sure you want to delete this about page?')) return;
    
    try {
      const response = await aboutService.delete(id);
      
      if (response?.success) {
        toast.success('About page deleted successfully!');
        await fetchAllAboutPages();
      } else {
        toast.error(response?.message || 'Failed to delete about page');
      }
    } catch (error: any) {
      console.warn('Error deleting about page:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchAllAboutPages();
  }, []);

  return {
    aboutPages,
    selectedPage,
    setSelectedPage,
    loading,
    isSubmitting,
    createAboutPage,
    updateAboutPage,
    deleteAboutPage,
    fetchAllAboutPages,
  };
};