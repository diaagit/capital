"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventSlot } from "@/components/new ui/EventPage";
import { useRouter } from "next/navigation";

export interface SlotCardProps {
  venue: string;
  city: string;
  slots: EventSlot[];
  eventId: string;
}

const SlotCard = ({ venue, city, slots, eventId }: SlotCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const router = useRouter();

  const getAvailabilityStyles = (capacity: number) => {
    if (capacity <= 0) return "bg-muted text-muted-foreground border-border";
    if (capacity < 10) return "bg-amber-500/10 text-amber-600 border-amber-500/30";
    return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
  };

  const getAvailabilityLabel = (capacity: number) => {
    if (capacity <= 0) return "Sold out";
    if (capacity < 10) return `Only ${capacity} left`;
    return `${capacity} left`;
  };

  const [dayOfWeek, datePart] = slots[0].eventDate.split(", ");
  const [dateNum, monthName] = datePart.split(" ").slice(0, 2);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary">
            <span className="text-lg font-semibold leading-none">{dateNum}</span>
            <span className="text-[10px] uppercase tracking-wide">
              {monthName}
            </span>
          </div>

          <div className="text-left leading-tight">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-gray-900">
                {dayOfWeek}, {datePart}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-gray-600 truncate max-w-[220px]">
                {venue}, {city}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="hidden sm:flex text-xs px-2 py-0.5">
            {slots.filter(s => s.capacity > 0).length} shows
          </Badge>

          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {slots.map(slot => (
              <button
                key={slot.id}
                onClick={() => router.push(`/event/${eventId}/book/${slot.id}`)}
                disabled={slot.capacity <= 0}
                className={cn(
                  "relative h-[110px] px-4 py-3 rounded-xl border text-left transition-all flex flex-col justify-between overflow-hidden",
                  slot.capacity <= 0
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:border-primary hover:shadow-sm",
                )}
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-gray-900 truncate">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-gray-900">₹{slot.price}</span>

                  <div
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border",
                      getAvailabilityStyles(slot.capacity)
                    )}
                  >
                    {slot.capacity > 0 && <Users className="w-3 h-3" />}
                    {getAvailabilityLabel(slot.capacity)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotCard;