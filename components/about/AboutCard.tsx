// components/about/AboutCard.tsx
import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IPage } from '@/types/about.type';

interface AboutCardProps {
  about: IPage;
  onEdit: (about: IPage) => void;
  onDelete: (id: string) => void;
}

export const AboutCard: React.FC<AboutCardProps> = ({ about, onEdit, onDelete }) => {
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-cyan-500/40 hover:from-blue-500 hover:to-cyan-500 transition-all duration-500">
      <div className="h-full rounded-2xl p-3 bg-white/90 dark:bg-[#0B1220]/90 backdrop-blur-xl shadow-lg dark:shadow-lg hover:shadow-2xl transition-all">
        
        <div className="mb-4 h-48 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <img
            src={about.image_one?.url || 'https://via.placeholder.com/400x300'}
            alt={about.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex gap-2 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
            <i className={about.imgIcon1} />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
            <i className={about.imgIcon2} />
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {about.title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {about.description}
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-blue-600 dark:text-blue-400">
            {about.features?.length || 0} Features
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">{about.btnText}</span>
        </div>

        <div className="mt-auto pt-4 flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(about)}
            className="flex items-center gap-1"
          >
            <FaEdit className="h-3 w-3" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(about._id as string)}
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