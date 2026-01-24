"use client";

import EventScheduleCard from "./EventScheduleCard";
import LeftSidebarHeader from "./LeftSidebarHeader";
import { EventSlot, EventSlotsMeta } from "../new ui/EventPage";
import MusicFestivalBanner from "./MusicFestivalBanner";

interface EventScheduleProps {
  meta: EventSlotsMeta;
  slots: EventSlot[];
  location: string;
  setLocation: (location: string) => void;
  eventId: string;
}

const EventSchedule = ({ slots, meta, location, setLocation, eventId }: EventScheduleProps) => {

  const groupedByLocation = slots.reduce((acc, slot) => {
    if (!acc[slot.location]) acc[slot.location] = [];
    acc[slot.location].push(slot);
    return acc;
  }, {} as Record<string, EventSlot[]>);

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-white flex flex-col">
      <LeftSidebarHeader
        locations={["All", ...meta.locations]}
        selectedLocation={location}
        onLocationChange={setLocation}
      />

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6">
        <div className="flex flex-col gap-4">
          {Object.keys(groupedByLocation).map((loc) => (
            <EventScheduleCard
              key={loc}
              location={loc}
              slots={groupedByLocation[loc]}
              eventId={eventId}
            />
          ))}
        </div>
        <MusicFestivalBanner className="mt-16" />
      </div>

    </div>
  );
};

export default EventSchedule;