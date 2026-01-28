"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useRef, useState } from "react";
import getBackendUrl from "@/lib/config";
import TitleSearchCard from "./Title_Search_Card";
import { useRouter } from "next/navigation";
import axios from "axios";

const cities = ["Pune", "Mumbai", "Delhi"];
const categories = [
  "movie",
  "concert",
  "sports",
  "theatre",
  "comedy",
];

type EventResult = {
  id: string;
  title: string;
  location_name: string;
  banner_url?: string;
  organiser?: {
    first_name: string;
  };
};

interface LNavbarType {
  type?: "home" | "search";
};

const LNavbar = ({ type }: LNavbarType) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EventResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [city, setCity] = useState("pune");

  const searchRef = useRef<HTMLDivElement>(null);

  const handleLogout = useCallback(async() => {
    router.push("/login")
    const URL = getBackendUrl();
    const response = await axios.get(`${URL}/user/logout`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
    localStorage.removeItem("token");
  }, [])

  useEffect(() => {
    setMounted(true);
    setSignedIn(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const URL = getBackendUrl();

        const res = await fetch(
          `${URL}/events?title=${encodeURIComponent(query)}&city=${city}`
        );
        const data = await res.json();

        const eventsArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.events)
          ? data.events
          : [];

        setResults(eventsArray);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, city]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  //bg-[#1f2533]
  return (
    <header className="w-full">
      <div className="bg-[#1f2533]"> 
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 w-full max-w-4xl">
            <Link href="/home" className="flex items-center gap-2 shrink-0">
              <Image
                src="/assets/forget-password/Capital-White.svg"
                alt="Capital"
                width={32}
                height={32}
              />
              <span className="text-white text-xl font-semibold">
                Capital
              </span>
            </Link>

            <div ref={searchRef} className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setOpen(true)}
                placeholder="Search for Movies, Events, Plays, Sports"
                className="pl-11 h-10 bg-white"
              />

              {open && (
                <div className="absolute top-12 left-0 w-full bg-white rounded-lg shadow-2xl border z-50 max-h-[400px] overflow-y-auto">
                  {loading && (
                    <div className="p-4 text-sm text-gray-500">
                      Searching events...
                    </div>
                  )}

                  {!loading && results.length === 0 && (
                    <div className="p-4 text-sm text-gray-500">
                      No events found
                    </div>
                  )}

                  {!loading &&
                    results.map((event) => (
                      <TitleSearchCard
                        key={event.id}
                        event={event}
                        onSelect={() => setOpen(false)}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-9 px-3 rounded-md bg-transparent border border-white/20 text-white text-sm">
                <MapPin className="mr-1 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="bg-[#1f2533] border border-white/20 rounded-lg shadow-2xl">
                {cities.map((c) => (
                  <SelectItem
                    key={c}
                    value={c.toLowerCase()}
                    className="text-zinc-200"
                  >
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {mounted && !signedIn && (
              <Button onClick={() => router.push("/login")} className="h-9 px-5 bg-[#f84464] hover:bg-[#e13b58] text-white">
                Sign in
              </Button>
            )}
            {mounted && signedIn && (
              <Button onClick={handleLogout} className="h-9 px-5 bg-[#f84464] hover:bg-[#e13b58] text-white">
                Log Out
              </Button>
            )}
            <Menu className="text-zinc-50" onClick={()=>{router.push("/dashboard/personal")}}/>
          </div>
        </div>
      </div>

      {type === "home" ? (
        <div className="bg-[#f5f5f5] border-b">
          <div className="max-w-7xl mx-auto px-6 h-10 flex items-center gap-6 text-sm font-medium text-gray-800">
            {categories.map((item) => (
              <Link
                key={item}
                href={`/search?category=${item}`}
                className="hover:cursor-pointer  border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-500 hover:text-red-600"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>
        </div>
        ): null
      }
    </header>
  );
};

export default LNavbar;