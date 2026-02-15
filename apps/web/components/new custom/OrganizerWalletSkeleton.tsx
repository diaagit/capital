import { Skeleton } from "../ui/skeleton";

export default function OrganizerWalletSkeleton() {
  return (
    <div className="h-full bg-background">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-8 w-28 rounded-md" />
            <Skeleton className="h-8 w-36 rounded-md" />
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Skeleton className="h-72 lg:col-span-2 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 lg:col-span-2 rounded-xl" />
        </div>

      </div>
    </div>
  );
}