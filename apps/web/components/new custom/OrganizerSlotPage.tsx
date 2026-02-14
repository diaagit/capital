"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  ArrowUpDown,
  CalendarDays,
  Zap,
  TicketCheck,
  ArrowLeft,
  Clock,
  Users,
  IndianRupee,
  Pencil,
  Copy,
  Trash2,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import OrganizerIconInput from "./Organizer_Search_Icon_Input";
import OrganizerStatCard from "./OrganizerStatCards";
import OrganizerPaginationBar from "./OrganizerPaginationBar";
import { useRouter } from "next/navigation";
import { Progress } from "../ui/progress";
import EmptyState from "./EmptyState";
import getBackendUrl from "@/lib/config";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import DeleteModal from "./DeletModal";

export interface SlotType {
  id: string;
  name: string;
  time: string;
  date: Date;
  capacity: number;
  booked: number;
  price: number;
  status: "Open" | "Filling Fast" | "Sold Out";
  locationUrl: string;
}

export default function EventSlotsPage({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, [page, limit, search, filter, sort]);

  const getExcel = async (slotId: string) => {
    const URL = getBackendUrl();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${URL}/organiser/${eventId}/${slotId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = new Blob([response.data]);
      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);
      link.download = "event-report.xlsx";
      link.click();

    } catch (error) {
      console.error(error);
      alert("Download failed");
    }
  };

  const fetchSlots = async () => {
    const URL = getBackendUrl();
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await axios.get(
        `${URL}/organiser/${eventId}/slots`,
        {
          params: {
            page,
            limit,
            location: search || undefined,
            sort,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mapped: SlotType[] = res.data.slots.map((slot: any) => {
        const booked = slot.booked ?? 0;
        const capacity = slot.capacity ?? 0;

        let status: SlotType["status"] = "Open";
        const percentage =
          capacity === 0 ? 0 : Math.round((booked / capacity) * 100);

        if (capacity > 0 && booked >= capacity) status = "Sold Out";
        else if (percentage >= 70) status = "Filling Fast";

        return {
          id: slot.id,
          name: slot.location || "Slot",
          locationUrl: slot.locationUrl ?? "#",
          time: `${new Date(slot.startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} – ${new Date(slot.endTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
          date: new Date(slot.eventDate),
          capacity,
          booked,
          price: slot.price,
          status,
        };
      });

      const filtered =
        filter === "All"
          ? mapped
          : mapped.filter((s) => s.status === filter);

      setSlots(filtered);
      setMeta(res.data.meta);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = meta?.totalPages || 1;
  const totalCapacity = meta?.totalCapacity || 0;
  const totalBooked = meta?.totalBooked || 0;
  const openCount = slots.filter(
    (s) => s.status === "Open" || s.status === "Filling Fast"
  ).length;

  return (
    <div className="h-full bg-background">
      <div className="w-full mx-auto px-6 py-10 space-y-8">
        <div>
          <button
            onClick={() =>
              router.push("/organizer/dashboard/events")
            }
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft size={14} />
            Back to Events
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Event Slots</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage time slots & track availability
              </p>
            </div>

            <Button className="gap-2">
              <Plus size={16} />
              Add Slot
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <OrganizerStatCard
            icon={CalendarDays}
            title="Total Slots"
            value={meta?.totalSlots?.toString() || "0"}
          />
          <OrganizerStatCard
            icon={TicketCheck}
            title="Booked / Capacity"
            value={`${totalBooked} / ${totalCapacity}`}
          />
          <OrganizerStatCard
            icon={Zap}
            title="Available Slots"
            value={openCount.toString()}
            highlight
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 border p-4 rounded-xl bg-card">
          <OrganizerIconInput
            icon={Search}
            placeholder="Filter by location"
            value={search}
            onChange={(e: any) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <div className="flex gap-3">
            <Select onValueChange={setFilter} defaultValue="All">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Filling Fast">Filling Fast</SelectItem>
                <SelectItem value="Sold Out">Sold Out</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => {
              setSort(value);
              setPage(1);
            }} defaultValue="date-desc">
              <SelectTrigger className="w-52">
                <ArrowUpDown size={14} className="mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>

                <SelectItem value="date-desc">Date: Newest First</SelectItem>
                <SelectItem value="date-asc">Date: Oldest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="capacity-asc">Capacity: Low to High</SelectItem>
                <SelectItem value="capacity-desc">Capacity: High to Low</SelectItem>

              </SelectContent>
            </Select>
              
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">
            Loading slots...
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <EmptyState type="slots" />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 
                p-6 
                bg-white
                rounded-xl 
                border border-slate-200 
                shadow-sm">
            {slots.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                onDelete={() => {}}
                onDownload={() => {
                  getExcel(slot.id);
                }}
              />
            ))}
          </div>

        )}

        <OrganizerPaginationBar
          limit={limit}
          setLimit={setLimit}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

function occupancy(booked: number, capacity: number) {
  if (!capacity) return 0;
  return Math.min(Math.round((booked / capacity) * 100), 100);
}

export function SlotCard({
  slot,
  onDelete,
  onDownload,
}: {
  slot: SlotType;
  onDelete: () => void;
  onDownload: () => void;
}) {
  const pct = occupancy(slot.booked, slot.capacity);

  return (
    <div className="flex flex-col gap-4 p-5 bg-card border rounded-xl hover:shadow-md transition">
      <div className="flex justify-between">
        <div>
          <Link href={slot.locationUrl}>
            <h3 className="font-semibold">{slot.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <CalendarDays size={13} />
            {slot.date.toDateString()}
          </p>
        </div>
        <SlotStatusBadge status={slot.status} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricPill icon={Clock} label="Time" value={slot.time} />
        <MetricPill
          icon={Users}
          label="Capacity"
          value={`${Math.min(slot.booked, slot.capacity)} / ${slot.capacity}`}
        />
        <MetricPill
          icon={IndianRupee}
          label="Price"
          value={`₹${slot.price}`}
        />
      </div>

      <div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{pct}% filled</span>
          <span>
            {Math.max(slot.capacity - slot.booked, 0)} seats left
          </span>
        </div>
        <Progress value={pct} className="h-1.5" />
      </div>

      <div className="flex gap-2 pt-2 border-t">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline" className="flex-1 gap-1">
              <Pencil size={13} />
              Edit
            </Button> 
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit the given slot details</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              onClick={onDownload}
              className="flex-1 gap-1"
            >
              <Download size={13} />
              Export Excel
            </Button> 
          </TooltipTrigger>
          <TooltipContent>
            <p>Download detailed revenue and ticket sales report</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
              <div onClick={(e) => e.stopPropagation()}>
                  <DeleteModal
                    usage="slot"
                      onConfirm={() => onDelete()}
                  >
                  <Button size="sm" variant="outline">
                      <Trash2 size={12} />
                  </Button>
                  </DeleteModal>
                    </div>
            </TooltipTrigger>
        
                  <TooltipContent>
                    <p>Delete Slot</p>
                  </TooltipContent>
                </Tooltip>
      </div>
    </div>
  );
}

function MetricPill({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-muted/60 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
        <Icon size={11} />
        {label}
      </p>
      <p className="text-sm font-semibold mt-0.5 truncate">{value}</p>
    </div>
  );
}

function SlotStatusBadge({
  status,
}: {
  status: "Open" | "Filling Fast" | "Sold Out";
}) {
  const styles = {
    Open: "bg-emerald-50 text-emerald-600 border-emerald-200",
    "Filling Fast": "bg-amber-50 text-amber-600 border-amber-200",
    "Sold Out": "bg-red-50 text-red-600 border-red-200",
  };

  const dotStyles = {
    Open: "bg-emerald-500 shadow-emerald-400/70",
    "Filling Fast": "bg-amber-500 shadow-amber-400/70",
    "Sold Out": "bg-red-500 shadow-red-400/70",
  };

  return (
    <span
      className={`relative text-xs px-2 h-8 flex gap-2 justify-center items-center rounded-full border font-medium ${styles[status]}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${dotStyles[status]}`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotStyles[status]}`}
        ></span>
      </span>

      {status}
    </span>
  );
}