// hooks/useWhyChooseUsManagement.ts
import { useState, useEffect, useCallback } from 'react';
import { IChooseUs, CreateChooseUsInput, UpdateChooseUsInput } from '@/types/whyChooseUs.types';
import { whyChooseUsService } from '@/utils/whyChooseUs.helper';
import { toast } from 'sonner';
export const useWhyChooseUsManagement = () => {
  const [sections, setSections] = useState<IChooseUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  // const { toast } = useToast();

  const fetchSections = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const data = await whyChooseUsService.getSections();
      setSections(data);
    } catch (error: any) {
      setFetchError(error.message || 'Failed to fetch sections');
            toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const createSection = async (data: CreateChooseUsInput): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      const newSection = await whyChooseUsService.createSection(data);
      setSections(prev => [...prev, newSection]);
      toast.success('ChoooseUs created successfully!');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create chooseUs');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSection = async (id: string, data: UpdateChooseUsInput): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      const updatedSection = await whyChooseUsService.updateSection(id, data);
      setSections(prev => prev.map(item => 
        item._id === id ? updatedSection : item
      ));
      toast.success('chooseUs updated successfully!');
      return true;
    } catch (error: any) {
      toast.error('Failed to update chooseUs');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteSection = async (id: string): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      await whyChooseUsService.deleteSection(id);
      setSections(prev => prev.filter(item => item._id !== id));
      toast(
         'chooseUs deleted successfully!',
       );
      return true;
    } catch (error: any) {
      toast.error('Failed to delete chooseUs');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    sections,
    loading,
    isSubmitting,
    fetchError,
    fetchSections,
    createSection,
    updateSection,
    deleteSection,
  };
};