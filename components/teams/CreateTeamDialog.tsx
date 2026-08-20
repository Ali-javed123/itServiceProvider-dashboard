// components/teams/CreateTeamDialog.tsx
"use client"

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TeamForm } from './TeamForm';
import type { TeamFormValues } from '@/types/teams.types';

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreateTeam: (values: TeamFormValues) => Promise<void>;
}

export const CreateTeamDialog: React.FC<CreateTeamDialogProps> = ({
  open,
  onOpenChange,
  isSubmitting,
  onCreateTeam,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const initialValues: TeamFormValues = {
    title: '',
    designation: '',
    image: undefined,
  };

  const handleSubmit = async (values: TeamFormValues) => {
    await onCreateTeam(values);
    setImagePreview(null);
    // The parent will close the dialog after success? Or we can close after submit.
    // We'll close after successful creation in parent; for now we keep it open
  };

  const handleCancel = () => {
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new team member.
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
            submitLabel="Add Member"
            mode="create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};