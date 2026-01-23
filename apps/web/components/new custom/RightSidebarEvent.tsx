import { MapPin } from "lucide-react";

export default function RightSidebarEvent() {
  return (
    <div className="w-full h-full flex flex-col gap-5 p-4">
      <div className="w-full rounded-md border bg-white p-4 space-y-3">
        
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">Event Location</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Phoenix Marketcity, Kurla<br />
          Mumbai, Maharashtra 400070
        </p>

        <div className="w-full h-48 rounded-md overflow-hidden">
          <iframe
            title="event-location"
            src="https://www.google.com/maps?q=Phoenix+Marketcity+Kurla+Mumbai&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="w-full h-full rounded-md bg-yellow-400" />      

    </div>
  );
}