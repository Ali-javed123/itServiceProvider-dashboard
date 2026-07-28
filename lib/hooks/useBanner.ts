// lib/hooks/useBanner.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { bannerApi } from '@/utils/banner.api';
import { IBanner } from '@/types/banner.types';

export const useBanner = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<IBanner | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all banners
  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const response = await bannerApi.getAll();
      if (response?.success && response?.data) {
        setBanners(response.data);
        if (response.data.length > 0) {
          setSelectedBanner(response.data[0]);
        }
      } else {
        toast.error(response?.message || 'Failed to load banners');
      }
    } catch (error: any) {
      console.error('❌ Error fetching banners:', error);
      toast.error(error?.message || 'Failed to load banners');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single banner
  const fetchBannerById = useCallback(async (id: string) => {
    try {
      const response = await bannerApi.getById(id);
      if (response?.success && response?.data) {
        setSelectedBanner(response.data);
        return response.data;
      }
    } catch (error: any) {
      console.error('❌ Error fetching banner:', error);
      toast.error(error?.message || 'Failed to load banner');
    }
  }, []);

  // Create banner
  const createBanner = useCallback(async (formData: FormData): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const response = await bannerApi.create(formData);
      if (response?.success) {
        toast.success('Banner created successfully!');
        await fetchBanners();
        return true;
      } else {
        toast.error(response?.message || 'Failed to create banner');
        return false;
      }
    } catch (error: any) {
      console.error('Error creating banner:', error);
      toast.error(error?.message || 'Something went wrong');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchBanners]);

  // Update banner
  const updateBanner = useCallback(async (id: string, formData: FormData): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const response = await bannerApi.update(id, formData);
      if (response?.success) {
        toast.success('Banner updated successfully!');
        await fetchBanners();
        return true;
      } else {
        toast.error(response?.message || 'Failed to update banner');
        return false;
      }
    } catch (error: any) {
      console.error('Error updating banner:', error);
      toast.error(error?.message || 'Something went wrong');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchBanners]);

  // Delete banner
  const deleteBanner = useCallback(async (id: string): Promise<boolean> => {
    if (!confirm('Are you sure you want to delete this banner?')) return false;
    
    try {
      const response = await bannerApi.delete(id);
      if (response?.success) {
        toast.success('Banner deleted successfully!');
        await fetchBanners();
        return true;
      } else {
        toast.error(response?.message || 'Failed to delete banner');
        return false;
      }
    } catch (error: any) {
      console.error('Error deleting banner:', error);
      toast.error(error?.message || 'Something went wrong');
      return false;
    }
  }, [fetchBanners]);

  // Initial load
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return {
    banners,
    selectedBanner,
    setSelectedBanner,
    loading,
    isSubmitting,
    fetchBanners,
    fetchBannerById,
    createBanner,
    updateBanner,
    deleteBanner,
  };
};