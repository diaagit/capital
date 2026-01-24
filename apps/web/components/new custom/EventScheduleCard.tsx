"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import SlotCard from "./SlotCard";
import MusicFestivalBanner from "./MusicFestivalBanner";
import { EventSlot } from "@/components/new ui/EventPage";

interface EventScheduleProps {
  location: string;
  slots: EventSlot[];
}

const EventSchedule = ({ location, slots }: EventScheduleProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Group slots by eventDate
  const groupedSlots = slots.reduce((acc, slot) => {
    if (!acc[slot.eventDate]) acc[slot.eventDate] = [];
    acc[slot.eventDate].push(slot);
    return acc;
  }, {} as Record<string, EventSlot[]>);

  const dates = Object.keys(groupedSlots);

  // If no slots
  if (slots.length === 0) {
    return (
      <section className="w-full">
        <div className="py-24 text-center">
          <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No shows available</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try selecting a different location
          </p>
        </div>

        <MusicFestivalBanner className="mt-16" />
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* SLOTS */}
      <div className="flex flex-col gap-6">
        {dates.map((dateKey) => (
          <SlotCard
            key={dateKey}
            venue={location}
            city={location}
            slots={groupedSlots[dateKey]}
          />
        ))}
      </div>

      {/* PROMO */}
      {/* <MusicFestivalBanner className="mt-16" /> */}
    </section>
  );
};

export default EventSchedule;