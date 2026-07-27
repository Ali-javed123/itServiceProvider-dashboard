// components/service/EditServiceDialog.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ServiceForm } from './ServiceForm';
import { CategoryItem, ServiceFormValues, Service } from '@/types/service.types';

interface EditServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  categories: CategoryItem[];
  isSubmitting: boolean;
  onUpdateService: (id: string, values: ServiceFormValues) => Promise<void>;
}

export const EditServiceDialog: React.FC<EditServiceDialogProps> = ({
  open,
  onOpenChange,
  service,
  categories,
  isSubmitting,
  onUpdateService,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Reset preview when service changes
  useEffect(() => {
    if (service) {
      setImagePreview(service.image?.url || null);
    }
  }, [service]);

  if (!service) return null;

  const initialValues: ServiceFormValues = {
    title: service.title || '',
    description: service.description || '',
    category: service.category || (categories.length > 0 ? categories[0]._id : ''),
    icon: service.icon || '',
    image: undefined,
  };

  const handleSubmit = async (values: ServiceFormValues) => {
    await onUpdateService(service._id, values);
    // Don't reset preview here - let parent handle it
  };

  const handleCancel = () => {
    setImagePreview(service.image?.url || null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the service details.
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
            submitLabel="Update Service"
            mode="edit"
            currentImageUrl={service.image?.url}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};