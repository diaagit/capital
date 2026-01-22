import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Variant } from "./EventCard";

export function MovieSkeleton({ variant }: { variant?: Variant }) {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-[2/3] rounded-lg bg-gray-300" />

      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-300" />
        <div className="h-3 w-2/3 rounded bg-gray-300" />
        <div className="h-3 w-1/3 rounded bg-gray-300" />
      </div>

      {variant === "premier" && (
        <div className="absolute bottom-2 left-2 h-5 w-24 rounded bg-gray-300" />
      )}
    </div>
  );
}

export function MovieCarouselSkeleton({
  variant,
  title,
}: {
  variant?: Variant;
  title?: string;
}) {
  const count = variant === "search" ? 8 : 10;

  if (variant === "search") {
    return (
      <section className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto mt-10 px-4">
      {title && (
        <div className="mb-4 h-6 w-48 rounded bg-gray-300 animate-pulse" />
      )}

      <Carousel>
        <CarouselContent className="-ml-2">
          {Array.from({ length: count }).map((_, i) => (
            <CarouselItem
              key={i}
              className="pl-4 basis-[160px] sm:basis-[190px] md:basis-[220px]"
            >
              <MovieSkeleton variant={variant} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}