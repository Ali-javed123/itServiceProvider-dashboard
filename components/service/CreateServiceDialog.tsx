import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryItem, ServiceFormValues } from '@/types/service.types';
import { ServiceForm } from './ServiceForm';

interface CreateServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CategoryItem[];
  isSubmitting: boolean;
  onCreateService: (values: ServiceFormValues) => Promise<void> | void;
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
    category: '',
    icon: '',
    image: undefined,
  };

  const handleSubmit = async (values: ServiceFormValues) => {
    await onCreateService(values);
    // Reset form after successful submission
    setImagePreview(null);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setImagePreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Create New Service</DialogTitle>
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