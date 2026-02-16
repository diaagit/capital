import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface EventSlot {
  id: string;
  title: string;
  location_name: string;
  event_date?: string;
  capacity: number;
  price: string;
  start_time: string;
  end_time: string;
}

export interface EventData {
  id: string;
  title: string;
  description: string;
  category: string;
  genre: string;
  status: string;
  language: string;
}

interface SlotDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot: EventSlot | null;
  event: EventData | null;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

  const formatTime = (dateTime?: string) => {
  if (!dateTime) return "N/A";

  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

  const formatPrice = (price: string) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "INR",
    }).format(Number(price));

const SlotDetailDialog: React.FC<SlotDetailDialogProps> = ({
  open,
  onOpenChange,
  slot,
  event,
}) => {
  if (!slot && !event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto p-0">

        <div className="px-4 pt-6 pb-2 border-b bg-muted/40">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              {event?.title || slot?.title}
            </DialogTitle>
            <DialogDescription className="text-sm">
              Detailed overview and metadata
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-8">

          {event && (
            <InfoCard title="Event Information">
              <InfoGrid>
                {/* <DetailItem label="Event ID" value={event.id} /> */}
                <DetailItem label="Category" value={Capfirst(event.category)} />
                <DetailItem label="Genre" value={Capfirst(event.genre)} />
                <DetailItem label="Language" value={Capfirst(event.language)} />
                <DetailItem
                  label="Status"
                  value={
                    <StatusBadge status={event.status} />
                  }
                />
              </InfoGrid>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  Description
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {Capfirst(event.description)}
                </p>
              </div>
            </InfoCard>
          )}

          {slot && (
            <InfoCard title="Slot Information">
              <InfoGrid>
                {/* <DetailItem label="Slot ID" value={slot.id} /> */}
                <DetailItem label="Location" value={Capfirst(slot.location_name)} />
                <DetailItem label="Date" value={formatDate(slot.event_date)} />
                <DetailItem
                  label="Time"
                  value={`${formatTime(slot.start_time)} – ${formatTime(
                    slot.end_time
                  )}`}
                />
                <DetailItem
                  label="Capacity"
                  value={`${slot.capacity} seats`}
                />
                <DetailItem
                  label="Price"
                  value={formatPrice(slot.price)}
                />
              </InfoGrid>
            </InfoCard>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="border rounded-xl p-6 shadow-sm bg-background">
    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6">
      {title}
    </h3>
    {children}
  </div>
);

const InfoGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
    {children}
  </div>
);

const Capfirst = (text:string):string =>{
  const firstLetter = text.slice(0,1).toUpperCase();
  const all = text.slice(1,text.length).toLowerCase();
  const full = firstLetter + all;
  return full
}

const DetailItem: React.FC<{
  label: string;
  value: React.ReactNode;
}> = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
      {label}
    </p>
    <div className="text-sm font-medium text-foreground">
      {value || "N/A"}
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const normalized = status.toLowerCase();

   const styles: Record<string, string> = {
    published: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    draft: "bg-amber-100 text-amber-700 border border-amber-200",
    cancelled: "bg-rose-100 text-rose-700 border border-rose-200",
  };

  const badgeStyle =
    styles[normalized] ||
    "bg-gray-100 text-gray-700 border border-gray-200";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${badgeStyle}`}
    >
      {status}
    </span>
  );
};

export default SlotDetailDialog;