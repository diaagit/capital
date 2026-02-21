import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VerifierCard from "./eventCard";

interface Props {
  title: string;
  icon: any;
  items: any[];
}

const CategoryCarousel = ({ title, icon: Icon, items }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScrollPosition();
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 800;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(checkScrollPosition, 400);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center gap-3 px-2">
        <Icon className="w-5 h-5 text-pink-500" />
        <h2 className="text-2xl font-bold capitalize tracking-wide">
          {title}
        </h2>
      </div>

      <div className="relative">

        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                       bg-black/70 hover:bg-black text-white 
                       p-3 rounded-full shadow-lg transition"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                       bg-black/70 hover:bg-black text-white 
                       p-3 rounded-full shadow-lg transition"
          >
            <ChevronRight size={20} />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScrollPosition}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4"
        >
          {items.map((event) => (
            <div key={event.id} className="flex-shrink-0">
              <VerifierCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;