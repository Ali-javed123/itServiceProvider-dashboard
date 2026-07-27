// components/service/CreateServiceDialog.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ServiceForm } from './ServiceForm';
import { CategoryItem, ServiceFormValues } from '@/types/service.types';

interface CreateServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CategoryItem[];
  isSubmitting: boolean;
  onCreateService: (values: ServiceFormValues) => Promise<void>;
}

export const CreateServiceDialog: React.FC<CreateServiceDialogProps> = ({
  open,
  onOpenChange,
  categories,
  isSubmitting,
  onCreateService,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const initialValues: ServiceFormValues = {
    title: '',
    description: '',
    category: categories.length > 0 ? categories[0]._id : '',
    icon: '',
    image: undefined,
  };

  const handleSubmit = async (values: ServiceFormValues) => {
    await onCreateService(values);
    // Reset preview after submission
    setImagePreview(null);
  };

  const handleCancel = () => {
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Create New Service</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new service.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
          <ServiceForm
            initialValues={initialValues}
            categories={categories}
            isSubmitting={isSubmitting}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Create Service"
            mode="create"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};