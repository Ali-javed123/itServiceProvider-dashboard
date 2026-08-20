// components/our-benefits/OurBenefitsCard.tsx
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { OurBenefits } from '../../types/benefit.types';

interface CardProps {
  item: OurBenefits;
  onEdit: (item: OurBenefits) => void;
  onDelete: (id: string) => void;
}


export function OurBenefitsCard({ item, onEdit, onDelete }: CardProps) {
  const firstFeatured = item.featured?.[0];
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-cyan-500/40 hover:from-blue-500 hover:to-cyan-500 transition-all duration-500">
      <div className="h-full rounded-2xl p-3 bg-white/90 dark:bg-[#0B1220]/90 backdrop-blur-xl shadow-lg dark:shadow-lg hover:shadow-2xl transition-all">
        {firstFeatured?.image?.url && (
          <div className="mb-4 h-48 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <img
              src={firstFeatured.image.url}
              alt={firstFeatured.heading}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.subHeading}</p>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Button: {item.btnText}</p>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-blue-600 dark:text-blue-400">{item.featured?.length || 0} Features</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">{item.list?.length || 0} List items</span>
        </div>
        <div className="mt-auto pt-4 flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={() => onEdit(item)} className="flex items-center gap-1">
            <FaEdit className="h-3 w-3" /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(item._id!)} className="flex items-center gap-1">
            <FaTrash className="h-3 w-3" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}