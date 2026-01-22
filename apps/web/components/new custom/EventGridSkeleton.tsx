export default function EventGridSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[2/3] rounded-lg bg-gray-300" />
          <div className="mt-3 space-y-2">
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}