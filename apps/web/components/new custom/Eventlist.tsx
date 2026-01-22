"use client";

import Filter, { EventType } from "@/components/new custom/Filter";
import axios from "axios";
import getBackendUrl from "@/lib/config";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EventGridSkeleton from "./EventGridSkeleton";
import EventGrid from "./Search_Event_Card";
import Pagination from "./Pagination";

const LIMIT = 12;

export default function Eventlist() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const URL = getBackendUrl();

  const page = Number(searchParams.get("page") ?? 1);

  const [events, setEvents] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
      const res = await axios.get(`${URL}/events`, {
        params: {
          ...Object.fromEntries(searchParams.entries()),
          page,
          limit: LIMIT,
        },
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

        setEvents(res.data.events);
        setTotal(res.data.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [searchParams, page]);

  const changePage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex gap-10 mt-10">
      <aside className="w-[300px] shrink-0">
        <Filter type={searchParams.get("type") as EventType} />
      </aside>

      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Events</h1>

        {loading ? (
          <EventGridSkeleton />
        ) : (
          <div>
            <EventGrid events={events} />

            <Pagination
              page={page}
              total={total}
              limit={LIMIT}
              onPageChange={changePage}
            />
          </div>
        )}
      </main>
    </div>
  );
}