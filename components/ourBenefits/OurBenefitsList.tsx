// components/our-benefits/OurBenefitsList.tsx
import { Button } from '@/components/ui/button';
import { OurBenefits } from '../../types/benefit.types';
import { OurBenefitsCard } from './OurBenefitsCard';

interface ListProps {
  items: OurBenefits[];
  onCreateClick: () => void;
  onEdit: (item: OurBenefits) => void;
  onDelete: (id: string) => void;
}

export function OurBenefitsList({ items, onCreateClick, onEdit, onDelete }: ListProps) {
  return (
    <div className="min-h-[20px] w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Benefits</h2>
          <p className="text-gray-600 dark:text-gray-400">Total: {items.length} sections</p>
        </div>
        <Button onClick={onCreateClick}>Create New Section</Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.length > 0 ? (
          items.map(item => (
            <OurBenefitsCard
              key={item._id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-12">No benefit sections found.</p>
        )}
      </div>
    </div>
  );
}