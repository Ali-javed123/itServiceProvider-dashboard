import { Button } from '@/components/ui/button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Service } from '@/types/service.types';

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onDelete }) => {
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-cyan-500/40 hover:from-blue-500 hover:to-cyan-500 transition-all duration-500">
      <div className="h-full rounded-2xl p-3 bg-white/90 dark:bg-[#0B1220]/90 backdrop-blur-xl shadow-lg dark:shadow-lg hover:shadow-2xl transition-all">
        
        <div className="mb-4 h-48 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <img
            src={service.image?.url || 'https://images.ctfassets.net/wowgx05xsdrr/5Gy0HRFtGJkW5GapIiCk8N/24a26fae1eac4c7e2b786b7e209c5779/article-thumbnail-person-multi-region-checkout-product-catalog-gradient-sunset-bigcommerce.png?fm=webp&w=3840&q=75'}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition">
          <div className="flex items-center justify-center w-full h-full">
            <i className={service.icon}/>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {service.title || "Web Development"}
        </h3>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-1">
          {service.description || 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, illum.'}
        </p>

        <div className="mt-auto pt-4 flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(service)}
            className="flex items-center gap-1"
          >
            <FaEdit className="h-3 w-3" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(service._id)}
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