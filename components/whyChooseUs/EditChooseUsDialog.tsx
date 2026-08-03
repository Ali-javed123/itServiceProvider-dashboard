// components/whyChooseUs/EditChooseUsDialog.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { WhyChooseUsForm } from './WhyChooseUsForm';
import { IChooseUs, ChooseUsFormValues } from '@/types/whyChooseUs.types';

interface EditChooseUsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: IChooseUs | null;
  isSubmitting: boolean;
  onUpdateSection: (id: string, values: ChooseUsFormValues) => Promise<void>;
}

export const EditChooseUsDialog: React.FC<EditChooseUsDialogProps> = ({
  open,
  onOpenChange,
  section,
  isSubmitting,
  onUpdateSection,
}) => {
  if (!section) return null;

  const initialValues: ChooseUsFormValues = {
  title: section.title || '',
  heading: section.heading || '',
  description: section.description || '',
  subHeading: section.subHeading || '',
  btnText: section.btnText || '',
  featured: Array.isArray(section.featured) && section.featured.length > 0 
    ? section.featured 
    : [{ icon: '', title: '' }], // Fallback to empty feature if none exist
  image: undefined,
};


  const handleSubmit = async (values: ChooseUsFormValues) => {
    await onUpdateSection(section._id, values);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Edit Section</DialogTitle>
          <DialogDescription>
            Update the section details.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
          <WhyChooseUsForm
            initialValues={initialValues}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Update Section"
            mode="edit"
            currentImageUrl={section.image?.url}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};