import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export interface EventData {
  id: string;
  title: string;
  description: string;
}

interface EventHeaderProps {
  event: EventData;
}

const GraphEventHeader: React.FC<EventHeaderProps> = ({ event }) => {
  const router = useRouter();
  const dotStyles = { Open: "bg-emerald-500 shadow-emerald-400/70", "Filling Fast": "bg-amber-500 shadow-amber-400/70", "Sold Out": "bg-red-500 shadow-red-400/70" };
  return (
    <div className="mb-6">
      <button
            onClick={() => router.push("/organizer/dashboard/events")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground rounded-lg p-2 hover:text-red-600 hover:underline hover:bg-red-100 mb-4"
          >
            <ArrowLeft size={14} />
            Back to Events
      </button>
      <div className="flex items-center gap-3 mb-2">
        <div className={`h-2 w-2 rounded-full animate-ping ${dotStyles["Open"]}`} />
        <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
          Event Graph
        </span>
      </div>
      <h1 className="font-heading text-3xl font-bold text-foreground tracking-tight">
        {event.title}
      </h1>
      <p className="text-muted-foreground mt-1 w-full">
        {event.description}
      </p>
    </div>
  );
};

export default GraphEventHeader;