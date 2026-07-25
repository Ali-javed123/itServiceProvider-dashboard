import { Button } from '@/components/ui/button';
import { CategoryItem } from '@/types/service.types';
import { ServiceCard } from './ServiceCard';

interface ServiceListProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCreateClick: () => void;
  onEditService: (service: any) => void;
  onDeleteService: (id: string) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({
  categories,
  selectedCategory,
  onCreateClick,
  onEditService,
  onDeleteService,
}) => {
  const filteredCategories = categories.filter(cat => cat._id === selectedCategory);

  return (
    <>
      {filteredCategories.map((category) => (
        <div key={category._id} className="mb-12">
          <div className="min-h-[20px] w-full flex justify-between items-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {category.serviceCategory}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Slug: {category.slug} | Services: {category.services?.length || 0}
              </p>
            </div>
            <div className='mb-8'>
              <Button className='px-4 py-3 font-bold text-md' onClick={onCreateClick}>
                Create Service
              </Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category?.services && category?.services?.length > 0 ? (
              category.services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onEdit={onEditService}
                  onDelete={onDeleteService}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No services in this category</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};