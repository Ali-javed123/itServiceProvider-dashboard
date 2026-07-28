// components/about/AboutPageSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export function AboutPageSkeleton() {
  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))] py-20">
      <div className="container mx-auto">
        <div className="flex justify-end mb-4">
          <Skeleton className="w-32 h-10" />
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full max-w-[520px] h-[520px] mx-auto">
            <Skeleton className="absolute top-0 left-0 w-[90%] h-[95%] rounded-2xl" />
            <Skeleton className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-32 h-12" />
          </div>
        </div>
      </div>
    </div>
  );
}   