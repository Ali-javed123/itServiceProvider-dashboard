import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategoryItem } from '@/types/service.types';

interface CategoryFilterProps {
  categories: CategoryItem[];
  selectedCategory: string;
  // Accept possible null and optional event details from Select
  onCategoryChange: (value: string | null, eventDetails?: any) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const getSelectedCategoryName = () => {
    const category = categories.find(cat => cat._id === selectedCategory);
    return category?.serviceCategory || '';
  };

  const getServiceCount = () => {
    const category = categories.find(cat => cat._id === selectedCategory);
    return category?.services?.length || 0;
  };

  return (
    <div className="mb-8 flex items-center gap-4 flex-wrap">
      <Label htmlFor="categoryFilter" className="text-sm font-medium">
        Filter by Category:
      </Label>
      <Select
        value={selectedCategory || categories[0]?._id || ''}
        onValueChange={onCategoryChange}
      >
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.serviceCategory}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <span className="text-sm text-gray-500">
        Showing: <strong>{getSelectedCategoryName()}</strong>
        <span className="ml-2">
          ({getServiceCount()} services)
        </span>
      </span>
    </div>
  );
};