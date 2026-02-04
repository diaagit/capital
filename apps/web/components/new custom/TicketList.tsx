"use client";

import { ChevronRight, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import getBackendUrl from "@/lib/config";
import axios from "axios";
import TicketSkeleton from "./TicketListSkeleton";

type FilterType = "ALL" | "issue" | "cancel" | "use" | "expired";

const statusClasses: Record<string, string> = {
  ISSUED: "px-3 py-1 bg-green-100 text-green-700",
  CANCELLED: "px-3 py-1 bg-red-100 text-red-700",
  USED: "px-3 py-1 bg-blue-100 text-blue-700",
  EXPIRED: "px-3 py-1 bg-gray-100 text-gray-700",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const TicketList = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [data, setData] = useState<any>({
    ticketRecords: [],
    meta: {
      issued: "0",
      cancelled: "0",
      used: "0",
      expired: "0",
      total: "0",
    },
  });
  const [loading, setLoading] = useState(false);

  const fetchTickets = async (filter: FilterType) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("You are not logged in");
        router.push("/login");
        return;
      }

      const url = new URL(`${getBackendUrl()}/tickets/my`);
      if (filter !== "ALL") url.searchParams.set(filter, "true");

      const res = await axios.get(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setData(res.data);
      }
    } catch {
      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets("ALL");
  }, []);

  useEffect(() => {
    if (activeFilter !== "ALL") {
      fetchTickets(activeFilter);
    }
  }, [activeFilter]);

  return (
    <div className="w-full min-h-full flex flex-col bg-white rounded-xl">
      <div className="sticky top-0 z-10 bg-white">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex flex-col justify-center mb-1">
            <h1 className="text-3xl font-semibold tracking-tight">Tickets</h1>
            <p className="text-muted-foreground text-sm">
              View, track and manage all your tickets in one place
            </p>
          </div>
        </div>

        <Separator />
      </div>

      <div className="sticky top-0 z-10 bg-white p-3 border-b flex gap-2">
        {activeFilter === "ALL" ? (
          <>
            <Button size="sm" onClick={() => setActiveFilter("issue")}>
              Issued ({data.meta.issued})
            </Button>
            <Button size="sm" variant="outline" onClick={() => setActiveFilter("cancel")}>
              Cancelled ({data.meta.cancelled})
            </Button>
            <Button size="sm" variant="outline" onClick={() => setActiveFilter("use")}>
              Used ({data.meta.used})
            </Button>
            <Button size="sm" variant="outline" onClick={() => setActiveFilter("expired")}>
              Expired ({data.meta.expired})
            </Button>
          </>
        ) : (
          <>
            <Button size="sm">{activeFilter.toUpperCase()}</Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setActiveFilter("ALL");
                fetchTickets("ALL");
              }}
            >
              Reset
            </Button>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {loading && (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            <TicketSkeleton />
          </div>
        )}

        {!loading && data.ticketRecords.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Ticket className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium">No tickets found</p>
            <p className="text-xs">
              {activeFilter === "ALL"
                ? "You haven’t booked any tickets yet."
                : `No ${activeFilter.toUpperCase()} tickets available.`}
            </p>
          </div>
        )}

        {!loading &&
          data.ticketRecords.map((ticket: any) => (
            <div key={ticket.id} className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex flex-col gap-3">

                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Ticket className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {ticket.eventSlot.event.title}
                      </h3>
                      <Link
                        href={ticket.eventSlot.location_url}
                        className="text-sm text-muted-foreground"
                      >
                        {ticket.eventSlot.location_name}
                      </Link>
                    </div>
                  </div>

                  <Badge className={statusClasses[ticket.status]}>
                    {ticket.status}
                  </Badge>
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Order Date</p>
                    <p className="font-medium">
                      {formatDate(ticket.issued_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Total Paid</p>
                    <p className="font-medium">
                      {ticket.eventSlot.price} ₹
                    </p>
                  </div>

                  <div className="flex items-end justify-end col-span-2">
                    <Link href={`/tickets/${ticket.id}`}>
                      <Button variant="ghost" size="sm">
                        Ticket Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TicketList;