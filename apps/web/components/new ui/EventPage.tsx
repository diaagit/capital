"use client";
import EventSchedule from "@/components/new custom/EventSchedule";
import LNavbar from "@/components/new custom/LNavbar";
import EventHero from "@/components/new custom/EventHero";
import { useEffect, useState } from "react";
import RightSidebarEvent from "../new custom/RightSidebarEvent";
import getBackendUrl from "@/lib/config";
import axios from "axios";
import EventHeroSkeleton from "../new custom/EventHeroSkeleton";

export interface BackendEvent {
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

export interface EventSlotsMeta {
  totalSlots: number;
  locations: string[];
}

export interface EventSlotRaw {
  event_date: string;   // ISO string
  start_time: string;   // ISO string
  end_time: string;     // ISO string
}

export interface EventSlot {
  id: string;
  location: string;
  locationUrl?: string;
  capacity: number;
  price: number;
  eventDate: string;   // "Monday, 20 April 2026"
  startTime: string;   // "12:00 am"
  endTime: string;     // "02:00 am"
  raw: EventSlotRaw;
}

export interface EventSlotsResponse {
  event: BackendEvent;
  slots: EventSlot[];
  meta: EventSlotsMeta;
}

const Page = ({ id }: { id: string }) => {
  const eventId = id;
  const URL = getBackendUrl();

  const [data, setData] = useState<EventSlotsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!eventId) return;

    let fullUrl = `${URL}/events/${eventId}/slots`;

    if (location.trim() !== "") {
      fullUrl = `${URL}/events/${eventId}/slots?location=${location}`;
    }

    if(location === "All"){
      fullUrl = `${URL}/events/${eventId}/slots`;
    }

    async function getData() {
      try {
        const response = await axios.get(fullUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch event slots", err);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [eventId, location]);

  const event = data?.event;
  const meta = data ? data.meta : { locations: [], totalSlots: 0 };
  const slots = data ? data.slots : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-50 bg-card border-b">
        <LNavbar type="search" />
      </div>

      {loading || !data ? (
        <EventHeroSkeleton />
      ) : (
        <EventHero {...data.event} />
      )}

      <div className="w-full min-h-screen bg-zinc-50 flex justify-center">
        <div className="w-full max-w-7xl flex gap-5 py-10">
          <div className="flex-1 rounded-2xl bg-white p-2 shadow-md border border-neutral-200 min-h-[400px]">
            <EventSchedule slots={slots} meta={meta} location={location} setLocation={setLocation} />
          </div>

          <div className="w-[450px] rounded-2xl bg-white shadow-md border border-neutral-200 min-h-[400px]">
            <RightSidebarEvent slots={slots} meta={meta} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;