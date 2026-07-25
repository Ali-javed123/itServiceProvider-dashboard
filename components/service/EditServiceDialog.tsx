import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryItem, Service, ServiceFormValues } from '@/types/service.types';
import { ServiceForm } from './ServiceForm';

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

  // Update image preview when service changes
  useEffect(() => {
    if (service?.image?.url) {
      setImagePreview(service.image.url);
    } else {
      setImagePreview(null);
    }
  }, [service]);

  const getInitialValues = (): ServiceFormValues => {
    if (!service) {
      return {
        title: '',
        description: '',
        category: '',
        icon: '',
        image: undefined,
      };
    }
    return {
      title: service.title || '',
      description: service.description || '',
      category: service.category || '',
      icon: service.icon || '',
      image: undefined,
    };
  };

  const handleSubmit = async (values: ServiceFormValues) => {
    if (!service) return;
    await onUpdateService(service._id, values);
    // Reset form after successful submission
    setImagePreview(service.image?.url || null);
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset image preview to original service image
    if (service?.image?.url) {
      setImagePreview(service.image.url);
    } else {
      setImagePreview(null);
    }
  };

  // Handle dialog close from outside
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset image preview when dialog closes
      if (service?.image?.url) {
        setImagePreview(service.image.url);
      } else {
        setImagePreview(null);
      }
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
          <ServiceForm
            key={service?._id || 'edit'}
            initialValues={getInitialValues()}
            categories={categories}
            isSubmitting={isSubmitting}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Update Service"
            mode="edit"
            currentImageUrl={service?.image?.url}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};