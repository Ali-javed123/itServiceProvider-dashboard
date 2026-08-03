// components/whyChooseUs/CreateChooseUsDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { WhyChooseUsForm } from './WhyChooseUsForm';
import { ChooseUsFormValues } from '@/types/whyChooseUs.types';

interface CreateChooseUsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreateSection: (values: ChooseUsFormValues) => Promise<void>;
}

export const CreateChooseUsDialog: React.FC<CreateChooseUsDialogProps> = ({
  open,
  onOpenChange,
  isSubmitting,
  onCreateSection,
}) => {
  const initialValues: ChooseUsFormValues = {
  title: '',
  heading: '',
  description: '',
  subHeading: '',
  btnText: '',
  featured: [{ icon: '', title: '' }], // Always an array with at least one empty feature
  image: undefined,
};

  const handleSubmit = async (values: ChooseUsFormValues) => {
    await onCreateSection(values);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Create New Section</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new "Why Choose Us" section.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
          <WhyChooseUsForm
            initialValues={initialValues}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Create Section"
            mode="create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};