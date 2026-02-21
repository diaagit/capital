import { CalendarDays, MapPin } from "lucide-react";
interface EventCardProps {
  event: {
    id: string;
    title: string;
    banner_url: string;
    category: string;
    language: string;
    genre: string;
    slots: {
      id: string;
      event_date: string;
      location_name: string;
    }[];
  };
}

const VerifierCard = ({ event }: EventCardProps) => {
  const nextSlot = event.slots?.[0];

  return (
    <div className="group w-[250px] rounded-3xl overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      
      <div className="relative w-full h-[340px] rounded-3xl overflow-hidden shadow-lg">
        <img
          src={event.banner_url || "/placeholder.jpg"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
          {event.category}
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
          <h3 className="text-lg font-bold leading-snug line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
            {event.title}
          </h3>

          <p className="text-xs text-gray-300">
            {event.genre} • {event.language}
          </p>

          {nextSlot && (
            <div className="mt-2 space-y-1 text-xs text-gray-200">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                {new Date(nextSlot.event_date).toLocaleDateString(undefined, {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="line-clamp-1">{nextSlot.location_name}</span>
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded-full">{event.genre}</span>
          <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded-full">{event.language}</span>
        </div>
      </div>
    </div>
  );
};

export default VerifierCard;