// components/CreateCategoryDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm } from './CategoryForm';
import { getInitialFormValues } from '../../utils/service.category.helper';
import type { ServiceCategoryFormValues } from '../../types/serviceCategory';

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ServiceCategoryFormValues) => void;
  isSubmitting?: boolean;
}

export const CreateCategoryDialog: React.FC<CreateCategoryDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          initialValues={getInitialFormValues()}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
          submitLabel="Create Category"
        />
      </DialogContent>
    </Dialog>
  );
};