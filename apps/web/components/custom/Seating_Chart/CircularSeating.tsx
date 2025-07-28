"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CircularSeating = () => {
  return (
    <TooltipProvider>
      <div className="relative w-[400px] h-[400px] mx-auto mt-10 bg-black rounded-full">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-gray-500 rounded-b-full z-50 flex items-end justify-center text-white font-semibold text-sm">
          STAGE
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[#0f0f0f] z-10 cursor-pointer hover:bg-[#2a2a2a]/60 transition" />
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="center"
            className="bg-zinc-900 text-white border-none shadow-xl rounded-md px-4 py-2"
          >
            <div className="text-sm flex flex-col items-center">
              <div className="flex items-center gap-2">🎫 Zone C</div>
              <div className="text-purple-400 font-bold text-lg mt-1">$100</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <div className="absolute top-[270px] left-1/2 -translate-x-1/2 z-10 text-white text-sm font-bold pointer-events-none">
          C
        </div>

        <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-black rounded-full z-15 pointer-events-none" />

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[#161616] z-20 cursor-pointer hover:bg-[#3a3a3a]/60 transition" />
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="center"
            className="bg-zinc-900 text-white border-none shadow-xl rounded-md px-4 py-2"
          >
            <div className="text-sm flex flex-col items-center">
              <div className="flex items-center gap-2">🎫 Zone B</div>
              <div className="text-purple-400 font-bold text-lg mt-1">$200</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <div className="absolute top-[230px] left-1/2 -translate-x-1/2 z-20 text-white text-sm font-bold pointer-events-none">
          B
        </div>

        <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[260px] h-[260px] bg-black rounded-full z-25 pointer-events-none" />

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[260px] h-[260px] rounded-full bg-[#1f1f1f] z-30 cursor-pointer hover:bg-[#4a4a4a]/60 transition" />
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="center"
            className="bg-zinc-900 text-white border-none shadow-xl rounded-md px-4 py-2"
          >
            <div className="text-sm flex flex-col items-center">
              <div className="flex items-center gap-2">🎫 Zone A</div>
              <div className="text-purple-400 font-bold text-lg mt-1">$300</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <div className="absolute top-[190px] left-1/2 -translate-x-1/2 z-30 text-white text-sm font-bold pointer-events-none">
          A
        </div>

        <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-black rounded-full z-35 pointer-events-none" />

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-[#333] rounded-full z-40 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-purple-700 transition">
              VIP+
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="center"
            className="bg-zinc-900 text-white border-none shadow-xl rounded-md px-4 py-2"
          >
            <div className="text-sm flex flex-col items-center">
              <div className="flex items-center gap-2">🏆 VIP Seat</div>
              <div className="text-purple-400 font-bold text-lg mt-1">$450</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default CircularSeating;
