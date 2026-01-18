import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const events = [
  {
    id: 1,
    title: "Jurassic World: Fallen Kingdom",
    date: "June 5, 2024 - 3:00 PM",
    location: "Rocky Ridge Exhibition Hall, Denver, CO",
    image: "/assets/movie7.jpg",
    status: "Upcoming",
    ticketsSold: 75,
    ticketPrice: 250,
  },
  {
    id: 2,
    title: "Avengers: Endgame",
    date: "July 10, 2024 - 5:30 PM",
    location: "Grand Cinema Center, Boston, MA",
    image: "/assets/movie8.jpg",
    status: "Live",
    ticketsSold: 40,
    ticketPrice: 300,
  },
  {
    id: 3,
    title: "Interstellar IMAX Show",
    date: "August 12, 2024 - 7:00 PM",
    location: "Galaxy Theatre, San Francisco, CA",
    image: "/assets/movie9.jpg",
    status: "Completed",
    ticketsSold: 100,
    ticketPrice: 500,
  },
  {
    id: 4,
    title: "The Dark Knight Re-Release",
    date: "September 1, 2024 - 9:00 PM",
    location: "Prime Multiplex, Chicago, IL",
    image: "/assets/movie6.jpg",
    status: "Upcoming",
    ticketsSold: 20,
    ticketPrice: 180,
  },
];

// ✔ FIXED BADGE COLORS — Exactly as you wanted
const getStatusBadge = (status: string) => {
  const colorMap: any = {
    Live: {
      dot: "bg-green-500",
      border: "border-green-300",
    },
    Upcoming: {
      dot: "bg-yellow-500",
      border: "border-yellow-300",
    },
    Completed: {
      dot: "bg-gray-500",
      border: "border-gray-300",
    },
  };

  const { dot, border } = colorMap[status];

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-2 px-3 py-1 backdrop-blur-sm bg-white/40 ${border}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`}></span>
      {status}
    </Badge>
  );
};

export default function UpcomingEventsList() {
  return (
    <div className="rounded-2xl bg-gray-50 py-5 px-10 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
      <div className="text-xl mb-4">Upcoming Events</div>

      {/* 3 cards per row */}
      <div className="grid grid-cols-3 gap-6">

        {events.map((event) => (
          <Link
            href={`/newverifierdashboard/events/${event.id}`}
            key={event.id}
            className="bg-white w-fit rounded-xl overflow-hidden cursor-pointer block"
          >
            {/* Image Section */}
            <div className="relative w-[300px] h-[250px] rounded-xl">

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10">
                {getStatusBadge(event.status)}
              </div>

              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="rounded-xl object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>

            {/* Info */}
            <div className="mx-5 py-5">
              <div className="text-gray-500">{event.date}</div>

              <div className="text-lg font-semibold line-clamp-1">
                {event.title}
              </div>

              <div className="flex items-center gap-2 text-gray-500 mt-1 line-clamp-1">
                <MapPin height={15} width={15} />
                <div className="line-clamp-1">{event.location}</div>
              </div>

              {/* Progress + % + Price */}
              <div className="flex items-center gap-4 mt-4 w-full">

                {/* Progress Bar - will take 75% width naturally using flex */}
                <div className="flex-1">
                  <Progress
                    value={event.ticketsSold}
                    className="h-2 bg-pink-100"
                  />
                </div>

                {/* Percentage */}
                <span className="text-sm font-semibold text-gray-700 w-10 text-center">
                  {event.ticketsSold}%
                </span>

                {/* Price */}
                <span className="text-xl font-semibold text-pink-500 w-12 text-right">
                  ₹{event.ticketPrice}
                </span>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}

