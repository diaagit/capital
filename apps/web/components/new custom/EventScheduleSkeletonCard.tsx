"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import MusicFestivalBanner from "./MusicFestivalBanner";
import SlotCardSkeleton from "./SlotCardSkeleton";

interface EventScheduleSkeletonProps {
  location: string;
  eventId: string;
}

const EventScheduleSkeleton = ({ location, eventId }: EventScheduleSkeletonProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Dummy date slots
  const dummyDates = ["Monday, 02 March 2026", "Thursday, 30 April 2026"];

  return (
    <section className="w-full">
      <div className="flex flex-col gap-6">
        {dummyDates.map((dateKey) => (
          <SlotCardSkeleton
            key={dateKey}
            venue={location}
            city={location}
            date={dateKey}
            eventId={eventId}
          />
        ))}
      </div>

      <MusicFestivalBanner className="mt-16" />
    </section>
  );
};

export default EventScheduleSkeleton;