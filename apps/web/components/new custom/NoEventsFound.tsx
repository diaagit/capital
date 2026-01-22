import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Variant } from "./EventCard";

export function NoEventsFound({
  variant,
  title,
}: {
  variant?: Variant;
  title?: string;
}) {
  if (variant === "search") {
    return (
      <section className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold text-gray-700">
          No events found
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your filters or search keywords
        </p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto mt-10 px-4">
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          {title}
        </h2>
      )}

      <Carousel>
        <CarouselContent className="-ml-2">
          <CarouselItem className="pl-4 basis-full">
            <div className="w-full h-[260px] flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
              <p className="text-lg font-semibold text-gray-700">
                No events available
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Check back later or explore other categories
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}