const TicketSkeleton = () => {
  return (
    <div className="w-full rounded-xl border bg-card p-4 shadow-sm animate-pulse">
      <div className="flex flex-col gap-3">

        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-lg bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-28 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
        </div>

        <div className="h-px bg-gray-200" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="space-y-1">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          <div className="space-y-1">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          <div className="col-span-2 flex justify-end items-end">
            <div className="h-8 w-28 bg-gray-200 rounded" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketSkeleton