"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EventScheduleCard from "./EventScheduleCard";
import LeftSidebarHeader from "./LeftSidebarHeader";



const EventSchedule = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] bg-white flex flex-col">

      <div>
        <LeftSidebarHeader />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6">
        <div className="flex flex-col gap-4">
          <EventScheduleCard />
          <EventScheduleCard />
          <EventScheduleCard />
          <EventScheduleCard />
        </div>

        <div
          style={{
            backgroundImage: "url('/assets/musicbg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="rounded-2xl my-16 h-[260px] flex flex-col items-center justify-center gap-3 text-center"
        >
          <div className="text-zinc-300 text-sm">In Las Vegas</div>
          <div className="text-white font-bold text-4xl lg:text-5xl">
            MUSIC FESTIVAL
          </div>
          <div className="text-zinc-300 text-sm">
            MEHDI LORESTANI WITH DJ HAMED
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;