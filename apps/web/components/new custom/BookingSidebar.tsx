"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Ticket, CreditCard, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import getBackendUrl from "@/lib/config";

interface EventResponse {
  id: string;
  organiserId: string;
  title: string;
  description: string;
  banner_url: string;
  hero_image_url: string;
  status: string;
  category: string;
  genre: string;
  language: string;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

interface SlotResponse {
  id: string;
  eventId: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location_name: string;
  location_url: string;
  capacity: number;
  price: string;
  event: EventResponse[]
}

interface BackendRespone {
  message: string;
  slot: any
}

interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
}

const ticketTiers: TicketTier[] = [
  {
    id: "standard",
    name: "Standard",
    price: 299,
    description: "General admission seating",
    perks: ["Entry access", "Standard seating"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 599,
    description: "Enhanced viewing experience",
    perks: ["Priority entry", "Premium seating", "Complimentary drink"],
  },
  {
    id: "vip",
    name: "VIP",
    price: 999,
    description: "The ultimate experience",
    perks: ["VIP entry", "Front row seats", "Meet & greet", "Exclusive merch"],
  },
];

interface BookingSidebarProps {
  selectedDate?: string;
  selectedTime?: string;
  venue?: string;
  onProceedToBook?: () => void;
  eventId: string;
  slotId: string;
}

const BookingSidebar = ({
  selectedDate,
  selectedTime,
  venue = "Downtown Arena",
  onProceedToBook,
  eventId,
  slotId,
}: BookingSidebarProps) => {
  const [selectedTier, setSelectedTier] = useState<string>("standard");
  const [quantity, setQuantity] = useState(1);
  const [event, setEvent] = useState();
  const currentTier = ticketTiers.find(t => t.id === selectedTier);
  const subtotal = (currentTier?.price || 0) * quantity;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;
  
  useEffect(() => {
    const URL = getBackendUrl();
    const token = localStorage.getItem("token");

    async function getEvent() {
      const res = await axios.get<BackendRespone>(`${URL}/events/${eventId}/${slotId}`,{headers:{
        Authorization: `Bearer ${token}`
      }})
      const data = res.data.slot
      setEvent(data);
    }

    getEvent();
  },[eventId, slotId])

  return (
    <div className="h-full bg-card rounded-xl border shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-primary/5 p-5 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Ticket className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Book Tickets</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Select your preferred ticket type
        </p>
      </div>

      <div className="p-5 space-y-5">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Date
            </span>
            <span className="font-medium text-card-foreground">
              {selectedDate || "Select a show"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              Time
            </span>
            <span className="font-medium text-card-foreground">
              {selectedTime || "Select a slot"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Venue
            </span>
            <span className="font-medium text-card-foreground">{venue}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <label className="text-sm font-medium text-card-foreground">Select Ticket Type</label>
          <div className="space-y-2">
            {ticketTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={cn(
                  "w-full p-3 rounded-lg border-2 text-left transition-all duration-200",
                  selectedTier === tier.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-card-foreground">{tier.name}</span>
                  <Badge>
                    ₹{tier.price}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{tier.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-card-foreground">Number of Tickets</label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-card-foreground w-6 text-center">{quantity}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              disabled={quantity >= 10}
            >
              +
            </Button>
            <span className="text-xs text-muted-foreground">Max 10 tickets</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentTier?.name} × {quantity}
            </span>
            <span className="text-card-foreground">₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Fee</span>
            <span className="text-card-foreground">₹{serviceFee}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-semibold">
            <span className="text-card-foreground">Total</span>
            <span className="text-primary">₹{total}</span>
          </div>
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={onProceedToBook}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Proceed to Book
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure checkout • Instant confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;