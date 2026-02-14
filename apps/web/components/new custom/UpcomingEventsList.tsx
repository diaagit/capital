"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  Plus,
  MapPin,
  Pencil,
  Trash2,
  CalendarDays,
  TrendingUp,
  Ticket,
  Zap,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import OrganizerPaginationBar from "./OrganizerPaginationBar";
import OrganizerStatCard from "./OrganizerStatCards";
import OrganizerIconInput from "./Organizer_Search_Icon_Input";
import getBackendUrl from "@/lib/config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import EmptyState from "./EmptyState";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import DeleteModal from "./DeletModal";

interface BackendInterface {
  data: any[];
  meta: {
    byStatus: {
      draft: number;
      published: number;
      cancelled: number;
    };
    totalRevenue: number;
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
  message: string;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft: "bg-amber-50 text-amber-700 border-amber-200",
    cancelled: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={styles[status]}>
        {status === "published" && (
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        )}
        {status}
      </Badge>

      {status === "draft" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <Info size={14} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              Add slots to publish the event
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export default function OrganizerEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(5);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      router.push("/organizer/login")
    }
  },[])

  const fetchEvents = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/organizer/login");
      return;
    }

    if (initialLoading) {
      setInitialLoading(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await axios.get<BackendInterface>(
        `${getBackendUrl()}/organiser/events`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page,
            limit,
            search: debouncedSearch,
            status: filter !== "All" ? filter : undefined,
            sort,
          },
        }
      );

      setEvents(res.data.data);
      setMeta(res.data.meta);
    } catch {
      toast.error("Failed to load events");
    } finally {
      setInitialLoading(false);
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, filter, sort, router, initialLoading]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if(!token){
      toast.warning("You are not logged in")
      router.push("/organizer/login")
    }
    try {
      await axios.delete(
        `${getBackendUrl()}/events/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Event successfully deleted");
      fetchEvents();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (initialLoading) return <PageSkeleton />;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white p-2">
      <div className="mx-auto px-6 py-12 space-y-10">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              All Events
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your shows & monitor performance
            </p>
          </div>

          <Link href="/organizer/dashboard/events/new-event">
            <Button className="gap-2 rounded-xl bg-black text-white">
              <Plus size={16} />
              Add Event
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <OrganizerStatCard
            icon={CalendarDays}
            title="Total Events"
            value={meta?.total?.toString() || "0"}
          />
          <OrganizerStatCard
            icon={TrendingUp}
            title="Revenue"
            value={`₹${(meta?.totalRevenue || 0).toLocaleString()}`}
          />
          <OrganizerStatCard
            icon={Zap}
            title="Live Now"
            value={meta?.byStatus?.published?.toString() || "0"}
            highlight
          />
        </div>
        <div className="flex bg-white border shadow-sx p-3 rounded-md flex-wrap gap-3 items-center justify-between">
          <div className="flex justify-between items-center w-full">
            <OrganizerIconInput
              icon={Search}
              placeholder="Search events..."
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <div className="flex gap-3">
              <Select
              value={filter}
              onValueChange={(v) => {
                setFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest</SelectItem>
                <SelectItem value="date-asc">Oldest</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>

          
        </div>

        {events.length === 0 ? (
          <EmptyState type="events" />
        ) : (
          <div className="space-y-4">
            {events.map((e) => (
              <EventRow
                key={e.id}
                event={e}
                onClick={() =>
                  router.push(`/organizer/dashboard/events/${e.id}`)
                }
                onEdit={()=>{router.push(`/organizer/dashboard/events/edit/${e.id}`)}}
                onDelete={() => handleDelete(e.id)}
              />
            ))}
          </div>
        )}
        <OrganizerPaginationBar
          page={meta?.page || 1}
          totalPages={meta?.totalPages || 1}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
}

const EventRow = ({ event, onClick, onEdit,onDelete }: any) => {
  const firstSlot = event.slots?.[0];

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex flex-col sm:flex-row gap-4 items-center p-3 bg-white border rounded-2xl shadow-sm transition-all hover:shadow-lg hover:-translate-y-[2px]"
    >
      <div className="relative h-28 sm:h-24 sm:w-44 shrink-0 overflow-hidden rounded-xl">
        <img
          src={event.banner_url}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="font-semibold">{event.title}</h3>

        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} />
            {firstSlot
              ? new Date(firstSlot.event_date).toDateString()
              : "No Date"}
          </span>

          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {firstSlot?.location_name || "Online"}
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <StatusBadge status={event.status} />
          <span className="text-xs flex items-center gap-1">
            <Ticket size={13} />
            {event.ticketsSold || 0} sold
          </span>
        </div>

        <Progress
          value={
            firstSlot
              ? ((event.ticketsSold || 0) / firstSlot.capacity) * 100
              : 0
          }
          className="h-1.5"
        />
      </div>

      <div className="flex sm:flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {e.stopPropagation(); onEdit()}}
            >
              <Pencil size={12} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
             <p>Edit Event</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={(e) => e.stopPropagation()}>
              <DeleteModal
                usage="event"
                onConfirm={() => onDelete()}
              >
                <Button size="sm" variant="outline">
                  <Trash2 size={12} />
                </Button>
              </DeleteModal>
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <p>Delete Event</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export function PageSkeleton() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white p-2">
      <div className="mx-auto px-6 py-12 space-y-10">

        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-4 w-64 rounded-md" />
          </div>

          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-5 space-y-4"
            >
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          ))}
        </div>
        <div className="flex bg-white border shadow-sx p-3 rounded-md flex-wrap gap-3 items-center justify-between">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-9 w-64 rounded-lg" />

            <div className="flex gap-3">
              <Skeleton className="h-9 w-40 rounded-md" />
              <Skeleton className="h-9 w-40 rounded-md" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-4 items-center p-3 bg-white border rounded-2xl shadow-sm"
            >
              <Skeleton className="h-28 sm:h-24 sm:w-44 w-full rounded-xl" />

              <div className="flex-1 space-y-3 w-full">
                <Skeleton className="h-5 w-48 rounded-md" />

                <div className="flex gap-4">
                  <Skeleton className="h-3 w-28 rounded-md" />
                  <Skeleton className="h-3 w-24 rounded-md" />
                </div>

                <div className="flex gap-4 items-center">
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <Skeleton className="h-4 w-16 rounded-md" />
                </div>

                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>

              <div className="flex sm:flex-col gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 py-6">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}