import { AlertCircle } from "lucide-react";

export default function NoEventGridSkeleton() {
  return (
    <div className="min-w-[1200px] min-h-[1000] w-full h-full bg-neutral-100 rounded-md justify-center items-center">
        <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="flex w-full max-w-xl flex-col items-center gap-3 rounded-2xl bg-white p-8 shadow-md">
        
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-7 w-7 text-red-600" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          No events found for this filter
        </h2>

        <p className="text-sm text-gray-500 text-center">
          Try adjusting your filters or search query.
        </p>

        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600">
            Change Category
          </span>
          <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600">
            Reset Filters
          </span>
        </div>

      </div>
    </div>
    </div>
  );
}