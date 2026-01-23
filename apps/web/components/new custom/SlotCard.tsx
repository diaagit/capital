"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SlotData {
  id: string;
  time: string;
  price: number;
  originalPrice?: number;
  availability: "available" | "filling" | "sold";
  seatsLeft?: number;
}

export interface EventScheduleCardProps {
  date: string;
  dayOfWeek: string;
  month: string;
  venue: string;
  city: string;
  slots: SlotData[];
  onSelectSlot?: (slotId: string) => void;
}

const SlotCard = ({
  date = "15",
  dayOfWeek = "Saturday",
  month = "March 2025",
  venue = "Downtown Arena",
  city = "Mumbai",
  slots = [
    { id: "1", time: "10:00 AM", price: 299, availability: "available", seatsLeft: 150 },
    { id: "2", time: "2:00 PM", price: 399, originalPrice: 499, availability: "filling", seatsLeft: 23 },
    { id: "3", time: "6:00 PM", price: 599, availability: "available", seatsLeft: 80 },
    { id: "4", time: "9:00 PM", price: 799, availability: "sold" },
  ],
  onSelectSlot,
}: EventScheduleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleSlotClick = (slot: SlotData) => {
    if (slot.availability === "sold") return;
    setSelectedSlot(slot.id);
    onSelectSlot?.(slot.id);
  };

  const getAvailabilityStyles = (availability: SlotData["availability"]) => {
    switch (availability) {
      case "available":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
      case "filling":
        return "bg-amber-500/10 text-amber-600 border-amber-500/30";
      case "sold":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "";
    }
  };

  const getAvailabilityLabel = (availability: SlotData["availability"], seatsLeft?: number) => {
    switch (availability) {
      case "available":
        return seatsLeft ? `${seatsLeft} left` : "Available";
      case "filling":
        return seatsLeft ? `Only ${seatsLeft}` : "Filling fast";
      case "sold":
        return "Sold out";
      default:
        return "";
    }
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary">
            <span className="text-lg font-bold leading-none">{date}</span>
            <span className="text-[10px] uppercase tracking-wide">
              {month.split(" ")[0]}
            </span>
          </div>

          <div className="text-left leading-tight">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              {dayOfWeek}, {month}
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              {venue}, {city}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hidden sm:flex text-xs px-2 py-0.5">
            {slots.filter(s => s.availability !== "sold").length} shows
          </Badge>
          {isExpanded ? (
            <ChevronUp className="w-4.5 h-4.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4.5 h-4.5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
            {slots.map(slot => (
              <button
                key={slot.id}
                onClick={() => handleSlotClick(slot)}
                disabled={slot.availability === "sold"}
                className={cn(
                  "relative h-[96px] px-3 py-2.5 rounded-lg border text-left transition-all",
                  slot.availability === "sold"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-primary hover:shadow-sm",
                  selectedSlot === slot.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border"
                )}
              >
                <div className="flex items-center gap-1.5 text-sm font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {slot.time}
                </div>

                <div className="flex items-center gap-1.5 text-sm mb-1">
                  <span className="font-bold">₹{slot.price}</span>
                  {slot.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{slot.originalPrice}
                    </span>
                  )}
                </div>

                <div
                  className={cn(
                    "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] border",
                    getAvailabilityStyles(slot.availability)
                  )}
                >
                  {slot.availability !== "sold" && <Users className="w-3 h-3" />}
                  {getAvailabilityLabel(slot.availability, slot.seatsLeft)}
                </div>

                {selectedSlot === slot.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotCard;