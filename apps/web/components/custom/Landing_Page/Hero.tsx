import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Music4,
  Theater,
  Dumbbell,
  FerrisWheel,
  MapPin,
  LayoutGrid,
  CalendarDays,
  BookmarkMinus,
  Ticket,
  PartyPopper,
} from "lucide-react";

const Hero = () => {
  return (
    <div>
      {/* Background Section */}
      <div
        style={{
          backgroundImage: "url('/assets/L-top.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
        }}
        className="text-white relative"
      >
        <div className="max-w-7xl mx-auto h-full flex flex-col items-center justify-center gap-10">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-7xl font-bold leading-snug">
              What <span className="text-[#D580F2]">Events</span> <br /> would
              you like to go to?
            </h1>
            <p className="text-xl text-zinc-300 mt-4">
              More than 100 events in different countries are now available to
              you.
            </p>
          </div>

          {/* Category Bar */}
          <div className="bg-[#1b1a1a] p-8 mt-6 rounded-xl w-[90%] max-w-7xl mx-auto shadow-lg border-2 border-[#3b393b] space-y-6">
            <div className="flex justify-around items-center flex-wrap gap-4 text-xl">
              <div className="flex items-center gap-2 hover:text-[#D580F2] cursor-pointer transition">
                <Music4 className="w-5 h-5" /> Concerts
              </div>
              <div className="flex items-center gap-2 hover:text-[#D580F2] cursor-pointer transition">
                <Theater className="w-5 h-5" /> Shows
              </div>
              <div className="flex items-center gap-2 hover:text-[#D580F2] cursor-pointer transition">
                <Dumbbell className="w-5 h-5" /> Sports
              </div>
              <div className="flex items-center gap-2 hover:text-[#D580F2] cursor-pointer transition">
                <FerrisWheel className="w-5 h-5" /> Festivals
              </div>
            </div>

            <Separator className="bg-gray-700/50" />

            {/* Search Filters */}
            <div className="flex justify-around items-center flex-wrap gap-4">
              {/* Event Type */}
              <div className="flex items-center gap-2">
                <LayoutGrid className="text-[#999999] w-8 h-8" />
                <div>
                  <p className="text-xl font-semibold">What</p>
                  <p className="text-xs text-[#999999]">Event Type</p>
                </div>
              </div>

              <div className="h-12 w-[1px] bg-gray-700/50" />

              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="text-[#999999] w-8 h-8" />
                <div>
                  <p className="text-xl font-semibold">Where</p>
                  <p className="text-xs text-[#999999]">Location</p>
                </div>
              </div>

              <div className="h-12 w-[1px] bg-gray-700/50" />

              {/* Date */}
              <div className="flex items-center gap-2">
                <CalendarDays className="text-[#999999] w-8 h-8" />
                <div>
                  <p className="text-xl font-semibold">When</p>
                  <p className="text-xs text-[#999999]">Date</p>
                </div>
              </div>

              {/* Search Button */}
              <Button className="p-0 rounded-md bg-transparent hover:scale-110 transition">
                <img
                  src="/assets/icon button.png"
                  alt="search"
                  className="w-[45px]"
                />
              </Button>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="flex gap-12 items-center justify-center text-sm text-[#999999] mt-4">
            <div className="flex gap-2 items-center">
              <BookmarkMinus /> Book Anytime
            </div>
            <div className="flex gap-2 items-center">
              <Ticket /> Refundable Tickets
            </div>
            <div className="flex gap-2 items-center">
              <PartyPopper /> Smart Deals
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
