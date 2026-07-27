// components/CategoryCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { formatDate } from '../../utils/service.category.helper';
import type { ServiceCategory } from '../../types/serviceCategory';

interface CategoryCardProps {
  category: ServiceCategory;
  onEdit: (category: ServiceCategory) => void;
  onDelete: (id: string, name: string) => void;
  disabled?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
  disabled = false,
}) => {
  return (
    <div className="group relative bg-[--card] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border  dark:hover:shadow-gray-950 shadow-gray-900  border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {category.serviceCategory}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Slug: {category.slug}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Services: {category.services?.length || 0}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Created: {formatDate(category.createdAt)}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap justify-end mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(category)}
          className="flex items-center gap-1"
          disabled={disabled}
        >
          <FaEdit className="h-3 w-3" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(category._id, category.serviceCategory)}
          className="flex items-center gap-1"
          disabled={disabled}
        >
          <FaTrash className="h-3 w-3" />
          Delete
        </Button>
      </div>
    </div>
  );
};