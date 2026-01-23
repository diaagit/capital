"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MapPin, Filter } from "lucide-react";
import SlotCard, { SlotData } from "./SlotCard";
import MusicFestivalBanner from "./MusicFestivalBanner";

interface ScheduleDay {
  id: string;
  date: string;
  dayOfWeek: string;
  month: string;
  venue: string;
  city: string;
  slots: SlotData[];
}

const mockSchedule: ScheduleDay[] = [
  {
    id: "1",
    date: "15",
    dayOfWeek: "Saturday",
    month: "March 2025",
    venue: "Phoenix Marketcity",
    city: "Mumbai",
    slots: [
      { id: "1-1", time: "10:00 AM", price: 299, availability: "available", seatsLeft: 150 },
      { id: "1-2", time: "2:00 PM", price: 399, originalPrice: 499, availability: "filling", seatsLeft: 23 },
      { id: "1-3", time: "6:00 PM", price: 599, availability: "available", seatsLeft: 80 },
      { id: "1-4", time: "9:00 PM", price: 799, availability: "sold" },
    ],
  },
  {
    id: "2",
    date: "16",
    dayOfWeek: "Sunday",
    month: "March 2025",
    venue: "Phoenix Marketcity",
    city: "Mumbai",
    slots: [
      { id: "2-1", time: "11:00 AM", price: 349, availability: "available", seatsLeft: 200 },
      { id: "2-2", time: "3:00 PM", price: 449, availability: "filling", seatsLeft: 15 },
      { id: "2-3", time: "7:00 PM", price: 649, availability: "available", seatsLeft: 120 },
    ],
  },
  {
    id: "3",
    date: "22",
    dayOfWeek: "Saturday",
    month: "March 2025",
    venue: "Jawaharlal Nehru Stadium",
    city: "Delhi",
    slots: [
      { id: "3-1", time: "10:00 AM", price: 299, availability: "sold" },
      { id: "3-2", time: "2:00 PM", price: 399, availability: "sold" },
      { id: "3-3", time: "6:00 PM", price: 599, availability: "filling", seatsLeft: 8 },
      { id: "3-4", time: "9:00 PM", price: 899, availability: "available", seatsLeft: 45 },
    ],
  },
  {
    id: "4",
    date: "29",
    dayOfWeek: "Saturday",
    month: "March 2025",
    venue: "Shree Shiv Chhatrapati Sports Complex",
    city: "Pune",
    slots: [
      { id: "4-1", time: "11:00 AM", price: 349, availability: "available", seatsLeft: 180 },
      { id: "4-2", time: "4:00 PM", price: 499, availability: "available", seatsLeft: 160 },
      { id: "4-3", time: "8:00 PM", price: 699, originalPrice: 799, availability: "filling", seatsLeft: 32 },
    ],
  },
];

const locations = [
  { value: "all", label: "All Locations" },
  { value: "mumbai", label: "Mumbai, Maharashtra" },
  { value: "delhi", label: "Delhi, NCR" },
  { value: "pune", label: "Pune, Maharashtra" },
  { value: "bangalore", label: "Bangalore, Karnataka" },
];

interface EventScheduleProps {
  onSlotSelect?: (slotId: string, dayId: string) => void;
}

const EventSchedule = ({ onSlotSelect }: EventScheduleProps) => {
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredSchedule =
    selectedLocation === "all"
      ? mockSchedule
      : mockSchedule.filter(day => day.city.toLowerCase() === selectedLocation);

  return (
    <section className="w-full">
      {/* HEADER */}
      {/* SCHEDULE */}
      <div className="flex flex-col gap-6">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map(day => (
            <SlotCard
              key={day.id}
              date={day.date}
              dayOfWeek={day.dayOfWeek}
              month={day.month}
              venue={day.venue}
              city={day.city}
              slots={day.slots}
              onSelectSlot={slotId => onSlotSelect?.(slotId, day.id)}
            />
          ))
        ) : (
          <div className="py-24 text-center">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">
              No shows available
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try selecting a different location
            </p>
          </div>
        )}
      </div>

      {/* PROMO */}
      <MusicFestivalBanner className="mt-16" />
    </section>
  );
};

export default EventSchedule;