// components/home-banner/CreateBannerDialog.tsx
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { BannerForm } from './BannerForm';
import { BannerFormData } from '@/validation/banner.validation';

interface CreateBannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreateBanner: (formData: FormData) => Promise<boolean>;
}

export const CreateBannerDialog: React.FC<CreateBannerDialogProps> = ({
  open,
  onOpenChange,
  isSubmitting,
  onCreateBanner,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const initialValues: BannerFormData = {
    title: '',
    heading: '',
    btnTextOne: '',
    btnTextTwo: '',
    image: undefined,
  };

  const handleSubmit = async (values: BannerFormData) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('heading', values.heading);
    formData.append('btnTextOne', values.btnTextOne);
    formData.append('btnTextTwo', values.btnTextTwo);
    
    if (values.image instanceof File) {
      formData.append('image', values.image);
    }

    const success = await onCreateBanner(formData);
    if (success) {
      setImagePreview(null);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Create New Banner</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new home banner.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
          <BannerForm
            initialValues={initialValues}
            isSubmitting={isSubmitting}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Create Banner"
            mode="create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};