import { Badge } from "@/components/ui/badge";
import concertHero from "@/assets/concert-hero.jpg";

interface EventHeroProps {
  title?: string;
  tagline?: string;
  eventType?: string;
  genre?: string;
  duration?: string;
  venue?: string;
}

const EventHero = ({
  title = "Adele",
  tagline = "A Night to Remember — Adele Live with Her Greatest Hits",
  eventType = "LIVE CONCERT",
  genre = "Pop / Soul",
  duration = "2h 30m",
  venue = "Live Arena, London"
}: EventHeroProps) => {
  return (
    <section className="relative h-[45vh] min-h-[360px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{
          backgroundImage: `url('/assets/E-singer1.png')`,
        }}
      />

      {/* Dark Gradient Overlay */}
      <div 
        className="absolute inset-0" 
        style={{ background: 'var(--gradient-hero)' }} 
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-end">
        <div className="pb-10 max-w-2xl">
          {/* Event Type Badge */}
          <Badge variant="default" className="mb-3">
            {eventType}
          </Badge>

          {/* Artist Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-primary-foreground drop-shadow-lg">
            {title}
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-base sm:text-lg text-primary-foreground/80">
            {tagline}
          </p>

          {/* Meta Info */}
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-primary-foreground/90">
            <span className="flex items-center gap-1.5">
              <span>🎤</span>
              <span>{genre}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>⏱</span>
              <span>{duration}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>📍</span>
              <span>{venue}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;