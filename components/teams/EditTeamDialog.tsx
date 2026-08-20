// components/teams/EditTeamDialog.tsx
"use client"
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TeamForm } from './TeamForm';
import type { Team, TeamFormValues } from '@/types/teams.types';

interface EditTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: Team | null;
  isSubmitting: boolean;
  onUpdateTeam: (id: string, values: TeamFormValues) => Promise<void>;
}

export const EditTeamDialog: React.FC<EditTeamDialogProps> = ({
  open,
  onOpenChange,
  team,
  isSubmitting,
  onUpdateTeam,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (team) {
      setImagePreview(team.image?.url || null);
    }
  }, [team]);

  if (!team) return null;

  const initialValues: TeamFormValues = {
    title: team.title || '',
    designation: team.designation || '',
    image: undefined, // We'll use currentImageUrl separately
  };

  const handleSubmit = async (values: TeamFormValues) => {
    await onUpdateTeam(team._id, values);
    // Dialog will close after parent handles success
  };

  const handleCancel = () => {
    setImagePreview(team.image?.url || null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription>
            Update the team member details.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
          <TeamForm
            initialValues={initialValues}
            isSubmitting={isSubmitting}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Update Member"
            mode="edit"
            currentImageUrl={team.image?.url}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};