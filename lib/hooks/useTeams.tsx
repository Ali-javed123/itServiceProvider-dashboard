// hooks/useTeams.ts
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import type { Team, TeamFormValues, TeamResponse } from '@/types/teams.types';

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isSubmittingRef = useRef<boolean>(false);

  // Fetch all teams
  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<TeamResponse>('/teams');
      const payload = response.data;
      if (payload?.success && Array.isArray(payload.data)) {
        setTeams(payload.data);
      } else if (Array.isArray(payload)) {
        setTeams(payload);
      } else {
        setTeams([]);
        console.warn('⚠️ Unexpected team data format:', payload);
      }
    } catch (err: any) {
      console.error('❌ Error fetching teams:', err);
      setError(err.message || 'Failed to load team members');
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create team (with image)
  const createTeam = useCallback(
    async (values: TeamFormValues) => {
      if (isSubmittingRef.current) return;

      isSubmittingRef.current = true;
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('designation', values.designation);
        if (values.image instanceof File) {
          formData.append('image', values.image);
        }

        const response = await api.post<TeamResponse>('/teams', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const payload = response as any;
        if (payload?.success && payload?.data) {
          toast.success(`Team member "${payload.data.title}" created successfully!`);
          await fetchTeams();
          return { success: true, data: payload.data };
        }
        toast.error(payload?.message || 'Failed to create team member');
        return { success: false };
      } catch (err: any) {
        console.error('❌ Error creating team:', err);
        toast.error(err?.response?.data?.message || err?.message || 'Failed to create team member');
        return { success: false };
      } finally {
        setIsSubmitting(false);
        isSubmittingRef.current = false;
      }
    },
    [fetchTeams]
  );

  // Update team (with optional image)
  const updateTeam = useCallback(
    async (id: string, values: TeamFormValues) => {
      if (isSubmittingRef.current) return;

      isSubmittingRef.current = true;
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('designation', values.designation);
        // If image is a File, append it; if it's a string (existing URL) or null, we skip
        if (values.image instanceof File) {
          formData.append('image', values.image);
        }

        const response = await api.put<TeamResponse>(`/teams/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const payload = response as any;
        console.log("payload",payload)
        if (payload?.success && payload?.data) {
          toast.success(`Team member "${payload.data.title}" updated successfully!`);
          await fetchTeams();
          return { success: true, data: payload.data };
        }
        toast.error(payload?.message || 'Failed to update team member');
        return { success: false };
      } catch (err: any) {
        console.error('❌ Error updating team:', err);
        toast.error(err?.response?.data?.message || err?.message || 'Failed to update team member');
        return { success: false };
      } finally {
        setIsSubmitting(false);
        isSubmittingRef.current = false;
      }
    },
    [fetchTeams]
  );

  // Delete team
  const deleteTeam = useCallback(
    async (id: string, name: string) => {
      if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
      if (isSubmittingRef.current) return;

      isSubmittingRef.current = true;
      try {
        const response = await api.delete<{ success: boolean; message?: string }>(`/teams/${id}`);
        const payload = response;
        if (payload?.success) {
          toast.success('Team member deleted successfully!');
          await fetchTeams();
          return { success: true };
        }
        toast.error(payload?.message || 'Failed to delete team member');
        return { success: false };
      } catch (err: any) {
        console.error('❌ Error deleting team:', err);
        toast.error(err?.response?.data?.message || err?.message || 'Failed to delete team member');
        return { success: false };
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [fetchTeams]
  );

  return {
    teams,
    loading,
    error,
    isSubmitting,
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam,
  };
};