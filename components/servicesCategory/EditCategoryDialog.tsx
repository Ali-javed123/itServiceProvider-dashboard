// components/EditCategoryDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm } from './CategoryForm';
import { getInitialFormValues } from '../../utils/service.category.helper';
import type { ServiceCategory, ServiceCategoryFormValues } from '../../types/serviceCategory';

interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: ServiceCategory | null;
  onSubmit: (values: ServiceCategoryFormValues) => void;
  isSubmitting?: boolean;
}

export const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
  open,
  onOpenChange,
  category,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          key={category?._id || 'edit'}
          initialValues={getInitialFormValues(category || undefined)}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
          submitLabel="Update Category"
        />
      </DialogContent>
    </Dialog>
  );
};