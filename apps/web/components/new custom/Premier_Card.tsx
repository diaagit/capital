import { PlayCircle } from "lucide-react";
import MovieCarousel from "./EventCard";

export default function Premier_Card() {
  return (
    <section className="bg-[#1f2533] text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2a3145] via-[#242b3d] to-[#293144] px-6 py-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-rose-500/90 shadow-lg">
            <PlayCircle className="w-6 h-6 text-white" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-300">
              Premieres
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              Want to watch Movies & Shows every Friday?
            </h3>
          </div>
        </div>

        <MovieCarousel variant="premier" title="Premieres" />
      </div>
    </section>
  );
}