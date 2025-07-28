import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import EventScheduleCard from "./EventScheduleCard";

const EventSchedule = () => {
  return (
    <div className="w-3/4 bg-[#0D0D0D] py-10">
      <div className="flex justify-between text-white">
        <h2 className="text-2xl font-semibold">All days and times</h2>
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          <Select>
            <SelectTrigger className="w-[250px] border-none text-md">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="bg-[#1f1f1f] border-none shadow-[0_4px_20px_rgba(0,0,0,0.7)] ring-0 rounded-md">
              <SelectItem value="pune" className="text-white hover:bg-zinc-800">
                Pune, Maharashtra, India
              </SelectItem>
              <SelectItem value="mumbai" className="text-white hover:bg-zinc-800">
                Mumbai, Maharashtra, India
              </SelectItem>
              <SelectItem value="delhi" className="text-white hover:bg-zinc-800">
                Delhi, India
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="bg-gray-700/50 mt-4" />

      <div className="flex flex-col gap-4 mt-4">
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
          height: "25vh",
        }}
        className="rounded-2xl my-4 flex flex-col items-center justify-center gap-4"
      >
        <p className="text-zinc-400">In Las Vegas</p>
        <h3 className="text-white font-bold text-5xl">MUSIC FESTIVAL</h3>
        <p className="text-zinc-400">MEHDI LORESTANI WITH DJ HAMED</p>
      </div>

      <div className="flex justify-between text-white mt-20">
        <h2 className="text-2xl font-semibold">Concerts Near You</h2>
        <Button variant="link" className="text-white hover:cursor-pointer">
          See All
        </Button>
      </div>
      <Separator className="bg-gray-700/50 mt-4" />
      <div className="text-white mt-4">CONCERT CARD WILL GO HERE</div>
    </div>
  );
};

export default EventSchedule;
