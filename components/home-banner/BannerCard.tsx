// components/home-banner/BannerCard.tsx
'use client';

import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IBanner } from '@/types/banner.types';

interface BannerCardProps {
  banner: IBanner;
  onEdit: (banner: IBanner) => void;
  onDelete: (id: string) => void;
}

export const BannerCard: React.FC<BannerCardProps> = ({ banner, onEdit, onDelete }) => {
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-cyan-500/40 hover:from-blue-500 hover:to-cyan-500 transition-all duration-500">
      <div className="h-full rounded-2xl p-4 bg-white/90 dark:bg-[#0B1220]/90 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all">
        
        {/* Image */}
        <div className="mb-4 h-48 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <img
            src={banner.image?.url || 'https://via.placeholder.com/400x300'}
            alt={banner.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {banner.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {banner.heading}
        </p>

        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
            {banner.btnTextOne}
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
            {banner.btnTextTwo}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(banner)}
            className="flex items-center gap-1"
          >
            <FaEdit className="h-3 w-3" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(banner._id)}
            className="flex items-center gap-1"
          >
            <FaTrash className="h-3 w-3" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};