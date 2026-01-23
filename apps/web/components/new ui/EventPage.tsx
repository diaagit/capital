"use client"

import EventSchedule from "@/components/new custom/EventSchedule";
import Hero from "@/components/new custom/EventHero";
import LNavbar from "@/components/new custom/LNavbar";
import EventHero from "@/components/new custom/EventHero";
import { useState } from "react";
import RightSidebarEvent from "../new custom/RightSidebarEvent";

const Page = ({id}:{id:string}) => {
  const eventId = id;
  const [selectedSlot, setSelectedSlot] = useState<{
      slotId: string;
      dayId: string;
      date?: string;
      time?: string;
    } | null>(null);

  const handleSlotSelect = (slotId: string, dayId: string) => {
    // In a real app, you would fetch the slot details from your data
    // For now, we'll set some mock data based on the selection
    setSelectedSlot({
      slotId,
      dayId,
      date: "March 15, 2025",
      time: "2:00 PM"
    });
  };

  const handleProceedToBook = () => {
    // Handle booking logic - would typically navigate to checkout
    console.log("Proceeding to book:", selectedSlot);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-card border-b">
        <LNavbar type="search" />
      </div>

      {/* Hero Section */}
      <EventHero />

      {/* Main Content */}
        <div className="w-full min-h-screen bg-zinc-50 flex justify-center">
          <div className="w-full max-w-7xl flex gap-5 py-10">
            
            <div className="w-[1200px] rounded-2xl bg-white p-2 shadow-md border border-neutral-200 min-h-[400px]">
              <EventSchedule />
            </div>

            <div className="w-[450px] rounded-2xl  bg-white shadow-md border border-neutral-200 min-h-[400px]">
              <RightSidebarEvent />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Page;