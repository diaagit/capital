"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  CreditCard,
  ShieldCheck,
  Clapperboard,
  Drum,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import getBackendUrl from "@/lib/config";
import BookingSidebarSkeleton from "./BookingSidebarSkeleton";
import { Alert } from "../ui/alert";
import PurchaseSuccessDialog from "./PurchaseSuccessDialog";

interface EventResponse {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface SlotResponse {
  id: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location_name: string;
  price: string;
  event: EventResponse;
}

interface BackendResponse {
  message: string;
  slot: SlotResponse;
}

interface TicketTier {
  id: "standard" | "premium" | "vip";
  name: string;
  multiplier: number;
  description: string;
}

interface BookingSidebarProps {
  eventId: string;
  slotId: string;
  card: string;
}

const TICKET_TIERS: TicketTier[] = [
  {
    id: "standard",
    name: "Standard",
    multiplier: 1,
    description: "General admission seating",
  },
  {
    id: "premium",
    name: "Premium",
    multiplier: 2,
    description: "Enhanced viewing experience",
  },
  {
    id: "vip",
    name: "VIP",
    multiplier: 3,
    description: "The ultimate experience",
  },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const getToken = (length: number) => {
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
  let randomString = "";

  for(let x=0;x<length;x++){
    randomString += allLetters.charAt(Math.floor(Math.random()*allLetters.length));
  }

  return randomString.toLocaleUpperCase();
}

const BookingSidebar = ({ eventId, slotId, card }: BookingSidebarProps) => {
  const [slot, setSlot] = useState<SlotResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);
  const [ticketURL, setTicketURL] = useState("");

  const [selectedTier, setSelectedTier] =
    useState<TicketTier["id"]>("standard");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const URL = getBackendUrl();
    const token = localStorage.getItem("token");

    async function fetchSlot() {
      try {
        const res = await axios.get<BackendResponse>(
          `${URL}/events/${eventId}/${slotId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSlot(res.data.slot);
      } catch (err) {
        console.error("Failed to fetch slot", err);
        setSlot(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSlot();
  }, [eventId, slotId]);

  const basePrice = Number(slot?.price || 0);

  const currentTier = useMemo(
    () => TICKET_TIERS.find((t) => t.id === selectedTier),
    [selectedTier]
  );

  const ticketPrice = basePrice * (currentTier?.multiplier || 1);
  const subtotal = ticketPrice * quantity;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;
  
  if (loading) return <BookingSidebarSkeleton />;

  if (!slot)
    return (
      <div className="p-5 border rounded-xl">
        Failed to load booking details
      </div>
    );

  async function handleSubmit() {
    const URL = getBackendUrl();
    const userToken = localStorage.getItem("token");

    if (!card) {
      alert("Atleast one card must be selected");
      return;
    }

    const token = getToken(6);

    try {
      const res = await axios.post(
        `${URL}/tickets/purchase`,
        {
          token: token,
          cardNumber: card,
          quantity: quantity,
          eventSlotId: slotId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        setTicketURL(res.data.ticketURL);
        setSuccessOpen(true);
      }
    } catch (err) {
      console.error("Purchase failed", err);
      alert("Ticket purchase failed. Please try again.");
    }
  }

  return (
    <div className="h-full bg-card rounded-xl border shadow-lg overflow-hidden flex flex-col">
      <div className="bg-primary/5 p-5 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Ticket className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Book Tickets</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Select your preferred ticket type
        </p>
      </div>

      <div className="p-5 space-y-5">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              {slot.event.category === "movie" ? <Clapperboard className="w-4 h-4" /> : <Drum className="w-4 h-4" />  }
              {(slot.event.category).slice(0,1).toLocaleUpperCase() + (slot.event.category).slice(1,slot.event.category.length)}
            </span>
            <span className="font-medium">
              {slot.event.title}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Date
            </span>
            <span className="font-medium">
              {formatDate(slot.event_date)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              Time
            </span>
            <span className="font-medium">
              {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Venue
            </span>
            <span className="font-medium">{slot.location_name}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          {TICKET_TIERS.map((tier) => {
            const tierPrice = basePrice * tier.multiplier;

            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={cn(
                  "w-full p-3 rounded-lg border-2 text-left transition",
                  selectedTier === tier.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{tier.name}</span>
                  <Badge>₹{tierPrice}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {tier.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Tickets</label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity === 1}
            >
              −
            </Button>

            <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
              <Users className="w-4 h-4" />
              <span className="font-semibold w-6 text-center">
                {quantity}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              disabled={quantity === 10}
            >
              +
            </Button>
          </div>
        </div>

        <Separator />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>
              {currentTier?.name} × {quantity}
            </span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>₹{serviceFee}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span className="text-primary">₹{total}</span>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={handleSubmit}>
          <CreditCard className="w-4 h-4 mr-2" />
          Proceed to Book
        </Button>

        <div className="flex justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4" />
          Secure checkout • Instant confirmation
        </div>
      </div>
      <PurchaseSuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        ticketURL={ticketURL}
      />
    </div>
  );
};

export default BookingSidebar;