// components/about/AboutList.tsx
import { Button } from '@/components/ui/button';
import { IPage } from '@/types/about.type';
import { AboutCard } from './AboutCard';

interface AboutListProps {
  aboutPages: IPage[];
  onCreateClick: () => void;
  onEditAbout: (about: IPage) => void;
  onDeleteAbout: (id: string) => void;
}

export const AboutList: React.FC<AboutListProps> = ({
  aboutPages,
  onCreateClick,
  onEditAbout,
  onDeleteAbout,
}) => {
  return (
    <div className="min-h-[20px] w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            About Pages
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Total: {aboutPages.length} pages
          </p>
        </div>
        <div>
          <Button className="px-4 py-3 font-bold text-md" onClick={onCreateClick}>
            Create About Page
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aboutPages.length > 0 ? (
          aboutPages.map((about) => (
            <AboutCard
              key={about._id}
              about={about}
              onEdit={onEditAbout}
              onDelete={onDeleteAbout}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-12">
            No about pages created yet.
          </p>
        )}
      </div>
    </div>
  );
};