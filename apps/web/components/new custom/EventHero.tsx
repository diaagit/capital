"use client";

import { Badge } from "@/components/ui/badge";
import { AppWindowMac, Clapperboard, Globe, MapPinned } from "lucide-react";
import { useState } from "react";

interface EventHeroProps {
  id: string;
  title: string;
  description: string;
  category: string;
  genre?: string;
  language?: string;
  is_online: boolean;
  banner_url?: string | null;
  hero_image_url?: string | null;
}

const DESCRIPTION_LIMIT = 160;

const EventHero = ({
  title,
  hero_image_url,
  description,
  category,
  genre,
  language,
  is_online,
}: EventHeroProps) => {
  const [expanded, setExpanded] = useState(false);

  const coverImage = hero_image_url || "/assets/E-singer1.png";
  const isLong = description.length > DESCRIPTION_LIMIT;

  const visibleText =
    expanded || !isLong
      ? description
      : description.slice(0, DESCRIPTION_LIMIT) + "...";

  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('${coverImage}')` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-end">
        <div className="pb-14 max-w-3xl space-y-4">

          <Badge
            variant="secondary"
            className="w-fit bg-black/60 text-white border border-white/10 backdrop-blur"
          >
            {category.toUpperCase()}
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            {title}
          </h1>

          <div className="max-w-xl">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              {visibleText}
            </p>

            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-sm font-medium text-red-400 hover:text-red-300 transition"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-5 text-sm text-white/90">
            
            {genre && (
              <span className="flex items-center gap-2">
                <span><Clapperboard className="w-5 h-5 text-zinc-50" /></span>
                <span className="capitalize">{genre}</span>
              </span>
            )}

            {language && (
              <span className="flex items-center gap-2">
                <span><Globe className="w-5 h-5 text-blue-300" /></span>
                <span className="capitalize">{language}</span>
              </span>
            )}

            <span className="flex items-center gap-2">
              <span>{is_online ? <AppWindowMac className="w-5 h-5 text-red-300" /> : <MapPinned className="w-5 h-5 text-indigo-300" />}</span>
              <span>{is_online ? "Online" : "In-person"}</span>
            </span>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;