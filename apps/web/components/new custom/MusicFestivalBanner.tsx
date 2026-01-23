import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import musicFestivalBg from "@/assets/music-festival-bg.jpg";
import { cn } from "@/lib/utils";

interface MusicFestivalBannerProps {
  className?: string;
  title?: string;
  subtitle?: string;
  location?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const MusicFestivalBanner = ({
  className,
  title = "MUSIC FESTIVAL",
  subtitle = "MEHDI LORESTANI WITH DJ HAMED",
  location = "In Las Vegas",
  ctaText = "Learn More",
  onCtaClick
}: MusicFestivalBannerProps) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden group cursor-pointer",
        className
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('/assets/music-festival-bg.jpg')` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 px-6 min-h-[200px] lg:min-h-[280px]">
        <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-3">
          {location}
        </span>

        <h3 className="text-3xl lg:text-5xl font-bold text-primary-foreground tracking-tight mb-2">
          {title}
        </h3>

        <p className="text-primary-foreground/70 text-sm lg:text-base tracking-widest mb-6">
          {subtitle}
        </p>

        <Button
          variant="outline"
          className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-300 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 -translate-y-2"
          onClick={onCtaClick}
        >
          {ctaText}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MusicFestivalBanner;