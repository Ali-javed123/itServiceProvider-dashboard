// lib/hooks/useOurBenefits.ts
import { useState, useEffect, useCallback } from 'react';
import { ourBenefitsService } from '../../utils/ourBenefits.helper';
import { OurBenefits } from '../../types/benefit.types';

export function useOurBenefits() {
  const [allItems, setAllItems] = useState<OurBenefits[]>([]);
  const [selectedItem, setSelectedItem] = useState<OurBenefits | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ourBenefitsService.getAll();
      setAllItems(data.data);
      console.log('Get data', data);
      if (data.length > 0) {
        setSelectedItem(data?.data[0]);
      } else {
        setSelectedItem(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single by id
  const fetchById = useCallback(async (id: string) => {
    const found = allItems.find(item => item._id === id);
    if (found) {
      setSelectedItem(found);
    } else {
      await fetchAll();
    }
  }, [allItems, fetchAll]);

  // Create
  const createItem = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const newItem = await ourBenefitsService.create(formData);
      setAllItems(prev => [...prev, newItem]);
      setSelectedItem(newItem);
      return newItem;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update
  const updateItem = useCallback(async (id: string, formData: FormData) => {
    setLoading(true);
    try {
      const updated = await ourBenefitsService.update(id, formData);
      setAllItems(prev => prev.map(item => item._id === id ? updated : item));
      setSelectedItem(updated);
      return updated;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete
  const deleteItem = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await ourBenefitsService.delete(id);
      setAllItems(prev => prev.filter(item => item._id !== id));
      if (selectedItem?._id === id) {
        setSelectedItem(allItems.length > 1 ? allItems[0] : null);
      }
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [allItems, selectedItem]);

  // Load on mount
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);


  console.log("selectedItem:",selectedItem)
  return {
    allItems,
    selectedItem,
    loading,
    error,
    fetchAll,
    fetchById,
    createItem,
    updateItem,
    deleteItem,
  };
}