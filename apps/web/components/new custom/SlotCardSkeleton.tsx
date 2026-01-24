"use client";

import { Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SlotCardSkeletonProps {
  venue: string;
  city: string;
  date: string;
  eventId: string;
}

const SlotCardSkeleton = ({ venue, city, date }: SlotCardSkeletonProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [dayOfWeek, datePart] = date.split(", ");
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

        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {/* Skeleton slot boxes */}
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[110px] rounded-xl border border-gray-200 bg-gray-50 animate-pulse"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotCardSkeleton;