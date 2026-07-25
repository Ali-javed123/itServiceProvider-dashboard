// components/CategoryList.tsx
import React from 'react';
import { CategoryCard } from './CategoryCard';
import type { ServiceCategory } from '../../types/serviceCategory';

interface CategoryListProps {
  categories: ServiceCategory[];
  onEdit: (category: ServiceCategory) => void;
  onDelete: (id: string, name: string) => void;
  disabled?: boolean;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
  disabled = false,
}) => {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-[trnasparent] rounded-lg">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No categories found
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
            disabled={disabled}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Total Categories: {categories.length}
      </div>
    </>
  );
};