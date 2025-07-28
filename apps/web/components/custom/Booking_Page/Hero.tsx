import { MapPin, Share2, CalendarDays, Clock4, Ticket, Heart } from 'lucide-react';
import { FC } from 'react';

const Hero: FC = () => {
  return (
    <div className="relative h-[60vh]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/assets/E-singer1.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />
      <div className="absolute inset-0 bg-black opacity-80" />
      <div className="relative max-w-7xl mx-auto flex h-full">
        <div className="w-1/2 h-full" />
        <div className="z-10 h-full w-1/2 flex flex-col justify-end items-end">
          <div className="text-white pb-10 w-full flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <div className="text-7xl font-bold">ADELE</div>
              <div className="flex gap-4">
                <Heart />
                <Share2 />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2 items-start">
                <div className="flex gap-2 text-zinc-400 items-center">
                  <CalendarDays className="w-5 h-5" />
                  <div className="text-zinc-400 text-xl">Mar 06 - 2025</div>
                </div>
                <div className="flex gap-2 text-zinc-400 items-center">
                  <MapPin className="w-5 h-5" />
                  <div className="text-zinc-400 line-clamp-1 text-xl">
                    Fontainebleau Las Vegas...
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <div className="flex gap-2 text-zinc-400 items-center text-xl">
                  <Clock4 className="w-5 h-5" />
                  <div>20:00 Pm</div>
                </div>
                <div className="flex gap-2 text-zinc-400 items-center text-xl">
                  <Ticket className="w-5 h-5" />
                  <div>₹2499/Person</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-zinc-400">
              <div className="flex flex-col w-1/3">
                <div className="text-xl">SEC</div>
                <div className="text-3xl text-white">450</div>
              </div>
              <div className="flex flex-col items-center w-1/3">
                <div className="text-xl">ROW</div>
                <div className="text-3xl text-white">4</div>
              </div>
              <div className="flex flex-col items-end w-1/3">
                <div className="text-xl">SEAT</div>
                <div className="text-3xl text-white">11K</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
