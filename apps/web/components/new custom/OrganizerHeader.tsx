"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Search, Plus, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getBackendUrl from "@/lib/config";
import axios from "axios";

interface BackendProps {
  firstName: string;
  proficPic: string;
}

export default function OrganizerHeader() {
  const router = useRouter();

  const [userData, setUserData] = useState<BackendProps>({
    firstName: "",
    proficPic: "",
  });

  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Your session expired, please login");
      router.push("/organizer/login");
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const URL = getBackendUrl();

    async function getData() {
      try {
        const res = await axios.get(`${URL}/organiser/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data.data);
      } catch {
        setUserData({
          firstName: "Organiser",
          proficPic: "https://i.pravatar.cc/300",
        });
      }
    }

    getData();
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userData.firstName || "Organiser"} 👋
        </h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search events..."
            className="pl-9 h-10 rounded-xl bg-white border shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Button
          className="h-10 rounded-xl px-5 shadow-sm"
          onClick={() =>
            router.push("/organizer/dashboard/events/new-event")
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>

        <div className="flex flex-wrap items-center gap-3">
          <Select>
            <SelectTrigger className="h-10 w-[140px] rounded-xl bg-white border shadow-sm">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="live">Live</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-10 rounded-xl bg-white flex items-center gap-2 shadow-sm"
              >
                <CalendarDays className="h-4 w-4" />
                {date ? format(date, "PPP") : "Pick Date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}