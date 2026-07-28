// components/home-banner/BannerSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export const BannerSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Carousel Skeleton */}
      <div className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-gray-200 dark:from-gray-800 to-gray-300 dark:to-gray-700">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-4">
              {/* Heading Skeleton */}
              <Skeleton className="h-12 w-3/4 md:h-14 lg:h-16" />
              
              {/* Subtitle Skeleton */}
              <Skeleton className="h-6 w-1/2 md:h-8" />
              
              {/* Buttons Skeleton */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Controls Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Image Skeleton */}
              <Skeleton className="h-48 w-full" />
              
              <div className="p-4 space-y-3">
                {/* Title Skeleton */}
                <Skeleton className="h-6 w-3/4" />
                
                {/* Heading Skeleton */}
                <Skeleton className="h-4 w-1/2" />
                
                {/* Tags Skeleton */}
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
                
                {/* Buttons Skeleton */}
                <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};