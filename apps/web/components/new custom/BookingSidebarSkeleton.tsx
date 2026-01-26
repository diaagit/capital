const BookingSidebarSkeleton = () => (
  <div className="h-full bg-card rounded-xl border shadow-lg p-5 space-y-6 animate-pulse">
    <div className="h-6 w-40 bg-muted rounded" />

    <div className="space-y-3">
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-3/4 bg-muted rounded" />
      <div className="h-4 w-2/3 bg-muted rounded" />
    </div>

    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-14 w-full bg-muted rounded-lg" />
      ))}
    </div>

    <div className="h-12 w-full bg-muted rounded-lg" />
  </div>
);

export default BookingSidebarSkeleton;