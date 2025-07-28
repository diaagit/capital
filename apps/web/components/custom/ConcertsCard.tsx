import { CalendarDays, MapPin } from "lucide-react";
import { FC } from "react";

interface EventItem {
  name: string;
  date: string;
  location: string;
  price: string;
  image: string;
  highlight?: boolean;
  timeLeft?: string;
}

const events: EventItem[] = [
  {
    name: "Nora Bayes",
    date: "May 6, 2025",
    location: "Hagen",
    price: "$779.58",
    timeLeft: "06:34:15",
    image: "/assets/image.png",
    highlight: true,
  },
  {
    name: "Tony Bennett",
    date: "Aug 2, 2025",
    location: "Salem (OR)",
    price: "$589.99",
    image: "/assets/image-2.png",
  },
  {
    name: "Ella Fitzgerald",
    date: "Sep 15, 2025",
    location: "New York",
    price: "$699.00",
    image: "/assets/image.png",
    highlight: true,
    timeLeft: "12:45:30",
  },
  {
    name: "Louis Armstrong",
    date: "Oct 20, 2025",
    location: "Chicago",
    price: "$499.99",
    image: "/assets/image-2.png",
    highlight: false,
    timeLeft: "08:20:10",
  },
];

const ConcertsCard: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden bg-black shadow-md"
        >
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-[250px] object-cover"
          />

          {event.highlight && event.timeLeft && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
              ⏱ Time to end <span className="ml-1">{event.timeLeft}</span>
            </div>
          )}

          <div className="p-4 bg-[#1b1a1a]">
            <h3 className="text-lg font-semibold text-white">{event.name}</h3>

            <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
              <CalendarDays className="w-4 h-4" />
              {event.date}
            </div>

            <div className="text-sm text-gray-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {event.location}
            </div>

            <p className="text-md mt-2 text-[#D580F2] font-medium">
              from {event.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConcertsCard;
