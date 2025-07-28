"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const StadiumSeating = () => {
  return (
    <TooltipProvider>
      <div className="relative w-[600px] h-[600px] bg-black mx-auto mt-10 rounded-xl">

        <div className="absolute top-[40%] left-[50%] w-[180px] h-[100px] bg-gray-500 -translate-x-1/2 -translate-y-1/2 rounded-md z-40 flex items-center justify-center text-white font-semibold text-lg">
          STAGE
        </div>

        {[
          { label: "T.GOLD", price: 200, top: "20%", left: "50%", w: 200, h: 60 },
          { label: "T.BRONZ", price: 150, top: "10%", left: "30%", w: 120, h: 60 },
          { label: "T.BRONZ", price: 150, top: "10%", left: "70%", w: 120, h: 60 },
          { label: "T.STANDARD", price: 100, top: "2%", left: "15%", w: 100, h: 60 },
          { label: "T.STANDARD", price: 100, top: "2%", left: "85%", w: 100, h: 60 },
        ].map((zone, i) => (
          <Tooltip key={`top-${i}`}>
            <TooltipTrigger asChild>
              <div
                className="absolute bg-[#111] text-white text-xs flex items-center justify-center cursor-pointer rounded-sm hover:bg-purple-800 transition"
                style={{
                  top: zone.top,
                  left: zone.left,
                  width: `${zone.w}px`,
                  height: `${zone.h}px`,
                  transform: "translate(-50%, 0)",
                }}
              >
                {zone.label}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-900 text-white px-3 py-2 text-sm rounded-md shadow-xl">
              🎟 {zone.label} – ${zone.price}
            </TooltipContent>
          </Tooltip>
        ))}

        {[
          { label: "B.GOLD", price: 200, top: "60%", left: "50%", w: 200, h: 60 },
          { label: "B.BRONZ", price: 150, top: "75%", left: "30%", w: 120, h: 60 },
          { label: "B.BRONZ", price: 150, top: "75%", left: "70%", w: 120, h: 60 },
          { label: "B.STANDARD", price: 100, top: "88%", left: "15%", w: 100, h: 60 },
          { label: "B.STANDARD", price: 100, top: "88%", left: "85%", w: 100, h: 60 },
        ].map((zone, i) => (
          <Tooltip key={`bottom-${i}`}>
            <TooltipTrigger asChild>
              <div
                className="absolute bg-[#111] text-white text-xs flex items-center justify-center cursor-pointer rounded-sm hover:bg-purple-800 transition"
                style={{
                  top: zone.top,
                  left: zone.left,
                  width: `${zone.w}px`,
                  height: `${zone.h}px`,
                  transform: "translate(-50%, 0)",
                }}
              >
                {zone.label}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-900 text-white px-3 py-2 text-sm rounded-md shadow-xl">
              🎟 {zone.label} – ${zone.price}
            </TooltipContent>
          </Tooltip>
        ))}

        {[
          { label: "L.BRONZ", price: 120, top: "40%", left: "0%", rotate: "-90deg" },
          { label: "R.BRONZ", price: 120, top: "40%", left: "100%", rotate: "90deg" },
        ].map((zone, i) => (
          <Tooltip key={`side-${i}`}>
            <TooltipTrigger asChild>
              <div
                className="absolute w-[80px] h-[150px] bg-[#111] text-white text-xs flex items-center justify-center cursor-pointer rounded-sm hover:bg-purple-800 transition"
                style={{
                  top: zone.top,
                  left: zone.left,
                  transform: `translate(-50%, -50%) rotate(${zone.rotate})`,
                }}
              >
                {zone.label}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-900 text-white px-3 py-2 text-sm rounded-md shadow-xl">
              🎟 {zone.label} – ${zone.price}
            </TooltipContent>
          </Tooltip>
        ))}

        {[
          { side: "Left", top: "40%", left: "20%" },
          { side: "Right", top: "40%", left: "80%" },
        ].map((vip, i) => (
          <Tooltip key={`vip-${i}`}>
            <TooltipTrigger asChild>
              <div
                className="absolute w-[60px] h-[160px] bg-gray-700 text-white text-xs flex items-center justify-center rounded-md cursor-pointer hover:bg-purple-700 transition"
                style={{
                  top: vip.top,
                  left: vip.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                VIP
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-900 text-white px-3 py-2 text-sm rounded-md shadow-xl">
              🏆 VIP – $500
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default StadiumSeating;
