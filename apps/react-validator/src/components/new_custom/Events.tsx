import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import getBackendUrl from "@/lib/config";
import {
  Search,
  MapPin,
  CalendarDays,
  Clapperboard,
  Music,
  Trophy,
  Mic2,
  PartyPopper,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DashboardHeader from "./DashboardHeader";
import CategoryCarousel from "./CategoryCarousel";

interface Slot {
  id: string;
  event_date: string;
  location_name: string;
}

interface EventInterface {
  id: string;
  title: string;
  description: string;
  banner_url: string;
  hero_image_url: string;
  category: string;
  genre: string;
  language: string;
  status: string;
  slots: Slot[];
}

interface BackendResponse {
  message: string;
  data: {
    events: EventInterface[];
    meta: string[];
  };
}

const EventsComponent = () => {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [location, setLocation] = useState("");
  const [meta, setMeta] = useState<string[]>([]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);

      const URL = getBackendUrl();
      const token = localStorage.getItem("token");

      const res = await axios.get<BackendResponse>(`${URL}/validator/events`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: debouncedSearch,
          location_name: location,
        },
      });

      setMeta(res.data.data.meta || []);
      setEvents(res.data.data.events || []);
    } catch (error) {
      console.error("Error fetching events", error);
      setEvents([]);
      setMeta([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, location]);
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const resetFilters = () => {
    setSearch("");
    setLocation("");
  };

  const groupedEvents = useMemo(() => {
    const groups: Record<string, EventInterface[]> = {};
    events.forEach((event) => {
      const key = event.category?.toLowerCase() || "others";
      if (!groups[key]) groups[key] = [];
      groups[key].push(event);
    });
    return groups;
  }, [events]);

  const categoryIcons: Record<string, any> = {
    movie: Clapperboard,
    music: Music,
    sports: Trophy,
    comedy: Mic2,
    event: PartyPopper,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
      <DashboardHeader
        title="Discover Experiences"
        subtitle="Movies, music, sports & more happening near you"
        icon={<CalendarDays className="h-5 w-5 text-primary" />}
      />

      <div className="px-4 py-6 space-y-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-3 items-center">
          <div className="flex items-center gap-3 bg-zinc-50 border border-gray-200 rounded-xl px-4 h-12 flex-1">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search movies, concerts, events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-full"
            />
          </div>
          <div className="flex items-center gap-3 bg-zinc-50 border border-gray-200 rounded-xl px-4 h-12 w-full md:w-64">
            <MapPin className="w-4 h-4 text-gray-400" />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="border-0 shadow-none bg-transparent h-full p-0 focus:ring-0">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {meta.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(search || location) && (
            <Button
              variant="outline"
              onClick={resetFilters}
              className="h-12 px-4 rounded-xl flex items-center gap-2"
            >
              <X size={16} />
              Reset
            </Button>
          )}
        </div>
        {!loading &&
          Object.entries(groupedEvents).map(([category, items]) => (
            <CategoryCarousel
              key={category}
              title={category}
              icon={categoryIcons[category] || Clapperboard}
              items={items}
            />
          ))}
        {loading && (
          <div className="space-y-10 animate-pulse">
            {[1, 2].map((section) => (
              <div key={section} className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-5 h-5 bg-gray-300 rounded" />
                  <div className="w-40 h-6 bg-gray-300 rounded" />
                </div>
                <div className="flex gap-6 px-6 overflow-hidden">
                  {[1, 2, 3, 4, 5,6,7,8,9,10].map((card) => (
                    <div key={card} className="w-[250px] flex-shrink-0 space-y-3">
                      <div className="w-full h-[330px] bg-gray-300 rounded-2xl" />
                      <div className="h-4 bg-gray-300 rounded w-3/4" />
                      <div className="h-4 bg-gray-300 rounded w-1/2" />
                      <div className="h-3 bg-gray-300 rounded w-1/3" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default EventsComponent;