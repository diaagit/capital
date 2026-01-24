const EventHeroSkeleton = () => {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-neutral-900">
      
      {/* Background shimmer */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-800" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-end">
        <div className="pb-14 max-w-3xl w-full space-y-4">

          {/* Category badge */}
          <div className="h-7 w-28 rounded-md bg-white/20 animate-pulse" />

          {/* Title */}
          <div className="space-y-3">
            <div className="h-10 w-3/4 rounded-lg bg-white/20 animate-pulse" />
            <div className="h-10 w-1/2 rounded-lg bg-white/20 animate-pulse" />
          </div>

          {/* Description */}
          <div className="mt-4 space-y-2 max-w-xl">
            <div className="h-4 w-full rounded bg-white/15 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-white/15 animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-white/15 animate-pulse" />
          </div>

          {/* Meta info */}
          <div className="mt-6 flex gap-5">
            <div className="h-4 w-20 rounded bg-white/20 animate-pulse" />
            <div className="h-4 w-24 rounded bg-white/20 animate-pulse" />
            <div className="h-4 w-28 rounded bg-white/20 animate-pulse" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default EventHeroSkeleton;