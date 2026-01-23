"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const locations = [
  { value: "all", label: "All Locations" },
  { value: "mumbai", label: "Mumbai, Maharashtra" },
  { value: "delhi", label: "Delhi, NCR" },
  { value: "pune", label: "Pune, Maharashtra" },
  { value: "bangalore", label: "Bangalore, Karnataka" },
];

export default function LeftSidebarHeader() {
    return (
        <div className="sticky top-0 z-30 bg-white px-6 pt-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">
              All Shows & Timings
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground mt-1">
              Select a date and time slot to book your tickets
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <Select>
              <SelectTrigger className="w-[220px] h-10">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="mt-6" />
      </div>
    )
}