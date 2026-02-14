"use client";

import { MapPin } from "lucide-react";
import { EventSlot, EventSlotsMeta } from "@/components/new ui/EventPage";

interface RightSidebarEventProps {
  slots: EventSlot[];
  meta: EventSlotsMeta;
}

function getActiveLocation(slots: EventSlot[]) {
  const grouped: Record<string, EventSlot[]> = {};

  for (const slot of slots) {
    if (!grouped[slot.location]) {
      grouped[slot.location] = [];
    }
    grouped[slot.location].push(slot);
  }

  for (const location of Object.keys(grouped)) {
    const hasAvailable = grouped[location].some(
      slot => slot.capacity > 0
    );

    if (hasAvailable) {
      return {
        location,
        mapUrl: grouped[location][0].locationUrl,
      };
    }
  }

  return null;
}

export function getMapEmbedUrl(location: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;
}

export default function RightSidebarEvent({
  slots,
  meta,
}: RightSidebarEventProps) {
  const activeLocation = getActiveLocation(slots);

  return (
    <div className="w-full h-full flex flex-col gap-5 p-4">

      <div className="w-full rounded-xl border bg-white p-4 space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">First Event Location</h3>
        </div>

        {activeLocation ? (
          <>
            <p className="text-sm text-muted-foreground">
              {activeLocation.location}
            </p>

            <div className="w-full h-48 rounded-md overflow-hidden">
              <iframe
                title="event-location"
                src={getMapEmbedUrl(activeLocation.location)}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            No upcoming slots available
          </p>
        )}
      </div>

      <div className="w-full rounded-xl border bg-white p-4 space-y-3">
        <h3 className="font-semibold text-base">Event Summary</h3>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Slots</span>
          <span className="font-medium">{meta.totalSlots}</span>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Locations</p>
          <div className="flex flex-wrap gap-2">
            {meta.locations.map(loc => (
              <span
                key={loc}
                className="text-xs px-2 py-1 rounded-full border bg-gray-50"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}