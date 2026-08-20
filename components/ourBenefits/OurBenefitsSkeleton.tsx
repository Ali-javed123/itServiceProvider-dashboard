// components/our-benefits/OurBenefitsSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export function OurBenefitsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-end gap-3">
        <Skeleton className="w-20 h-10" />
        <Skeleton className="w-20 h-10" />
      </div>
      <div className="rounded-[20px] p-5 bg-gray-100 dark:bg-gray-800">
        <Skeleton className="w-full h-64" />
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    </div>
  );
}