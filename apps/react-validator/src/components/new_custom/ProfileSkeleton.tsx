export const ProfileSkeleton = () => (
  <div className="bg-white rounded-2xl p-10 h-[79vh] animate-pulse">
    <div className="flex items-center gap-6">
      <div className="h-24 w-24 rounded-full bg-gray-200" />
      <div className="space-y-3">
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="h-3 w-64 bg-gray-200 rounded" />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6 mt-10">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  </div>
);