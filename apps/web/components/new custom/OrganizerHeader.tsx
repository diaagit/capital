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
import { useState } from "react";
import { useRouter } from "next/navigation"
import { SelectArrow } from "@radix-ui/react-select";


export default function OrganizerHeader() {
const router = useRouter();
const [date, setDate] = useState<Date | undefined>();
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-3xl font-sans-serif font-bold">
          Welcome back, Organizer!
        </h1>
        <div className="relative w-[500px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="pl-9 rounded-xl bg-neutral-50"/>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button className="rounded-xl px-5" onClick={() => router.push("/organizer/events/create")}>
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>

        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-[120px] rounded-xl bg-neutral-50">
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
                className="rounded-xl bg-neutral-50 flex items-center gap-2"
              >
                <CalendarDays className="h-4 w-4" />

                {date ? format(date, "PPP") : "Pick Date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>


         
        </div>
      </div>    

    </div>
  );
}
