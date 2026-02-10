import Image from "next/image";
import { MapPin, Clock, CalendarDays, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Status = "Live" | "Upcoming" | "Completed";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: Status;
  ticketsSold: number;
  ticketPrice: number;
  totalTickets: number;
};


const colorMap: Record<Status, { dot: string; border: string }> = {
  Live: { dot: "bg-green-500", border: "border-green-300" },
  Upcoming: { dot: "bg-yellow-500", border: "border-yellow-300" },
  Completed: { dot: "bg-red-500", border: "border-red-300" },
};

function StatusBadge({ status }: { status: Status }) {
  const { dot, border } = colorMap[status];

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-2 px-3 py-1 bg-white/40 ${border}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      {status}
    </Badge>
  );
}


export default function OrganizerEventCard({ event }: { event: Event }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden ">
      <div className="relative">
        <Image
          src={event.image}
          alt={event.title}
          width={300}
          height={250}
          className="w-full h-60 object-cover"
        />

        <div className="absolute top-2 right-2">
          <StatusBadge status={event.status} />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-center mb-2">
          {event.title}
        </h2>

        <Separator className="my-4 border-gray-200" />

        <p className="text-gray-600 mb-3 flex items-center gap-2">
          <MapPin size={18} />
          {event.location}
        </p>

        <p className="text-gray-600 mb-3 flex items-center gap-2">
          <CalendarDays size={18} />
          {event.date}
        </p>

        <p className="text-gray-600 mb-3 flex items-center gap-2">
          <Clock size={18} />
          {event.time}
        </p>

        <p className="text-gray-700 mb-3 flex items-center gap-2 font-medium">
          <IndianRupee size={18} />
          ₹{event.ticketPrice}
        </p>

        <Progress value={(event.ticketsSold / event.totalTickets) * 100} />

        <p className="text-sm text-gray-500 mt-1">
          {event.ticketsSold} / {event.totalTickets} tickets sold
        </p>

        <div className="flex gap-3 mt-5">
          <Button size="sm" className="flex-1 h-10">
            View
          </Button>

          <Button size="sm"  className="flex-1 h-10">
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
}
