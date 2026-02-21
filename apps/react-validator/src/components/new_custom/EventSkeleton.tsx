const EventCardSkeleton = () => (
  <div className="rounded-lg border border-border bg-card p-5 space-y-4">
    <div className="flex justify-between">
      <div className="h-5 w-2/3 rounded bg-muted animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-muted via-secondary to-muted" />
      <div className="h-5 w-16 rounded-full bg-muted animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-muted via-secondary to-muted" />
    </div>
    <div className="h-4 w-full rounded bg-muted animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-muted via-secondary to-muted" />
    <div className="h-10 w-full rounded-md bg-muted animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-muted via-secondary to-muted" />
  </div>
);

export default EventCardSkeleton;