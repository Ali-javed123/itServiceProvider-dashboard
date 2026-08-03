// components/whyChooseUs/SectionCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pen, Trash2 } from 'lucide-react';
import { IChooseUs } from '@/types/whyChooseUs.types';

interface SectionCardProps {
  section: IChooseUs;
  onEdit: (section: IChooseUs) => void;
  onDelete: (id: string) => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  onEdit,
  onDelete,
}) => {
  // Ensure featured is always an array
  const features = Array.isArray(section.featured) ? section.featured : [];

  return (
    <div className="rounded-[20px] bg-gradient-to-br from-[hsl(var(--card-foreground))] to-[hsl(var(--card-foreground)/0.95)] dark:from-[hsl(var(--primary))] dark:to-[hsl(var(--primary)/0.95)] shadow-lg shadow-[hsl(var(--color-shadow)/0.1)] border-2 border-[--primary] p-5">
      
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <div className="w-6 h-6 text-blue-600 dark:text-blue-400">✓</div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {section.heading || 'Why Choose Us'}
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {section.subHeading || 'Why Our Technology Solutions Company Stands Out?'}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
          {section.description || 'There are many variations of passages of Lorem Ipsum available...'}
        </p>
        <div className="h-1 w-24 bg-[var(--color-theme)] mx-auto rounded-full"></div>
      </div>

      {/* Image Display */}
      {section.image?.url && (
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <img
              src={section.image.url}
              alt={section.title || 'Why Choose Us'}
              className="rounded-lg object-cover w-full h-64 md:h-80"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Features Grid - Fixed to handle array properly */}
      {features.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-[var(--color-theme)]"
              >
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0">
                    {feature.icon ? (
                      <i className={`${feature.icon} text-2xl`} />
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2">
                      {feature.title || `Feature ${idx + 1}`}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Banner Section */}
      <div className="rounded-[20px] bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--background)/0.95)] dark:from-[hsl(var(--background))] dark:to-[hsl(var(--background)/0.95)] shadow-lg shadow-[hsl(var(--background)/0.1)] border-2 border-[--primary)] p-8 mt-3">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {section.title || 'Get The Best source for IT solutions and Service'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to experience our exceptional service?
          </p>
          <button className="bg-neutral-300  hover:bg-neutral-400 dark:bg-neutral-900 dark:hover:bg-mist-900 dark:text-white text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            {section.btnText || 'Choose Us'}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(section)}
          className="border-blue-200 shadow-lg hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/30"
        >
          <Pen className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(section._id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};