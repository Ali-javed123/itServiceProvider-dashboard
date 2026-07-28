// components/home-banner/EditBannerDialog.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { BannerForm } from './BannerForm';
import { BannerFormData } from '@/validation/banner.validation';
import { IBanner } from '@/types/banner.types';

interface EditBannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  banner: IBanner | null;
  isSubmitting: boolean;
  onUpdateBanner: (id: string, formData: FormData) => Promise<boolean>;
}

export const EditBannerDialog: React.FC<EditBannerDialogProps> = ({
  open,
  onOpenChange,
  banner,
  isSubmitting,
  onUpdateBanner,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (banner) {
      setImagePreview(banner.image?.url || null);
    }
  }, [banner]);

  if (!banner) return null;

  const initialValues: BannerFormData = {
    title: banner.title || '',
    heading: banner.heading || '',
    btnTextOne: banner.btnTextOne || '',
    btnTextTwo: banner.btnTextTwo || '',
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
    } else if (banner.image?.url) {
      formData.append('existingImage', banner.image.url);
    }

    const success = await onUpdateBanner(banner._id, formData);
    if (success) {
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setImagePreview(banner.image?.url || null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Edit Banner</DialogTitle>
          <DialogDescription>
            Update the banner details.
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
            submitLabel="Update Banner"
            mode="edit"
            currentImage={banner.image?.url}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};