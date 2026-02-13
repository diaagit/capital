"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  MapPin,
  Pencil,
  Trash2,
  ArrowUpDown,
  CalendarDays,
  TrendingUp,
  Ticket,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

const initialEvents = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  title: `Event ${i + 1}`,
  date: new Date(2024, 5, i + 1),
  location: "City Hall",
  image: "/assets/movie7.jpg",
  status: i % 3 === 0 ? "Live" : i % 3 === 1 ? "Upcoming" : "Completed",
  ticketsSold: Math.floor(Math.random() * 100),
  revenue: Math.floor(Math.random() * 50000),
}));

const PER_PAGE = 6;

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Live: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Upcoming: "bg-amber-50 text-amber-700 border-amber-200",
    Completed: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status === "Live" && (
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      )}
      {status}
    </Badge>
  );
}

export default function OrganizerEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let data = [...events];

    if (search)
      data = data.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );

    if (filter !== "All") data = data.filter((e) => e.status === filter);

    data.sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return a.date.getTime() - b.date.getTime();
        case "date-desc":
          return b.date.getTime() - a.date.getTime();
        case "revenue":
          return b.revenue - a.revenue;
        case "sales":
          return b.ticketsSold - a.ticketsSold;
        default:
          return 0;
      }
    });

    return data;
  }, [events, search, filter, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      toast.warning("You are not logged in");
      router.push("/organizer/login")
    }
    const URL = getBackendUrl();
    async function getData() {
      try {
        const res = await axios.get(`${URL}/organiser/events`,{headers:{
          Authorization: `Bearer ${token}`
        }})
        const data = res.data.data
      } catch (error) {
        toast.error("Error took place: ", error)
      }
    }
    getData();
  },[])

  const handleDelete = (id: number) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  const revenue = events.reduce((a, b) => a + b.revenue, 0);
  const liveCount = events.filter((e) => e.status === "Live").length;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white p-2">
      <div className="mx-auto px-6 py-12 space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Events</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage shows & monitor performance
            </p>
          </div>

          <Button className="gap-2 shadow-md rounded-xl bg-black text-white hover:bg-black/90">
            <Plus size={16} />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <OrganizerStatCard icon={CalendarDays} title="Total Events" value={events.length.toString()} />
          <OrganizerStatCard icon={TrendingUp} title="Revenue" value={`₹${revenue.toLocaleString()}`} />
          <OrganizerStatCard icon={Zap} title="Live Now" value={liveCount.toString()} highlight />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
          <OrganizerIconInput
            placeholder="Search events..."
            icon={Search}
            value={search}
            setValue={setSearch}
            className="w-[600px]"
          />

          <div className="flex gap-3">
            <Select onValueChange={setFilter} defaultValue="All">
              <SelectTrigger className="w-36 rounded-lg bg-card border-border text-foreground">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Live">Live</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>


            <Select onValueChange={setSort} defaultValue="date-desc">
              <SelectTrigger className="w-44 rounded-lg">
                <ArrowUpDown size={14} className="mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="revenue">By Revenue</SelectItem>
                <SelectItem value="sales">By Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {paginated.map((e) => (
            <EventRow key={e.id} event={e} onDelete={() => handleDelete(e.id)} />
          ))}
        </div>

        <OrganizerPaginationBar page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

function EventRow({ event, onDelete }: { event: any; onDelete: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center p-5 bg-white border rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all">

      <div className="relative h-40 sm:h-36 sm:w-60 shrink-0 overflow-hidden rounded-xl shadow">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex-1 text-center sm:text-left space-y-3">
        <h3 className="font-semibold text-lg">{event.title}</h3>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarDays size={13} /> {event.date.toDateString()}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={13} /> {event.location}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5">
          <StatusBadge status={event.status} />
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
            <Ticket size={14} />
            {event.ticketsSold}% sold
          </span>
          <span className="text-sm font-semibold text-foreground">
            ₹{event.revenue.toLocaleString()}
          </span>
        </div>

        <Progress value={event.ticketsSold} className="h-2 mt-3 bg-muted" indicatorColor="bg-blue-700" />
      </div>

      <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0">
        <Button size="sm" variant="outline" className="gap-1.5 rounded-lg text-xs">
          <Pencil size={13} />
          Edit
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onDelete}
          className="gap-1.5 rounded-lg text-xs text-destructive border-destructive/20 hover:bg-destructive/5"
        >
          <Trash2 size={13} />
          Delete
        </Button>
      </div>
    </div>
  );
}