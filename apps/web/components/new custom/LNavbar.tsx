"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  LogOutIcon,
  Wallet,
  Ticket,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useCallback, useEffect, useRef, useState } from "react";
import getBackendUrl from "@/lib/config";
import TitleSearchCard from "./Title_Search_Card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const cities = ["Pune", "Mumbai", "Delhi"];

const categories = ["movie", "concert", "sports", "theatre", "comedy"];

type EventResult = {
  id: string;
  title: string;
  location_name: string;
  banner_url?: string;
  organiser?: {
    first_name: string;
  };
};

interface ProfileResponse {
  message: string;
  data: {
    firstName: string;
    proficPic: string;
  };
}

interface LNavbarType {
  type?: "home" | "search";
}

const LNavbar = ({ type }: LNavbarType) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EventResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [signedIn, setSignedIn] = useState(false);
  const [city, setCity] = useState("pune");

  const searchRef = useRef<HTMLDivElement>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const handleLogout = useCallback(async () => {
    try {
      const URL = getBackendUrl();

      await axios.get(`${URL}/user/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}

    localStorage.removeItem("token");
    setSignedIn(false);

    router.replace("/login");
  }, [router, token]);

  useEffect(() => {
    if (!token) {
      setSignedIn(false);
      return;
    }

    setSignedIn(true);

    const getUserProfile = async () => {
      try {
        const URL = getBackendUrl();

        const res = await axios.get<ProfileResponse>(`${URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(res.data.data.firstName);
        setProfile(res.data.data.proficPic);
      } catch {
        toast.error("Session expired");
        localStorage.removeItem("token");
        setSignedIn(false);
      }
    };

    getUserProfile();
  }, [token]);

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

        setResults(Array.isArray(data?.events) ? data.events : data);
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
      if (!searchRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="w-full">
      <div className="bg-[#1f2533]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 w-full max-w-4xl">
            <Link href="/home" className="flex items-center gap-2">
              <Image
                src="/assets/forget-password/Capital-White.svg"
                alt="Capital"
                width={32}
                height={32}
              />
              <span className="text-white text-xl font-semibold">Capital</span>
            </Link>

            <div ref={searchRef} className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events"
                className="pl-11 h-10 bg-white"
              />

              {open && (
                <div className="absolute top-12 left-0 w-full bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
                  {loading && (
                    <div className="p-4 text-sm text-gray-500">Searching…</div>
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
          <div className="flex items-center gap-4">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-9 px-3 text-white border-white/20">
                <MapPin className="mr-1 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {!signedIn ? (
              <Button
                onClick={() => router.push("/login")}
                className="bg-[#f84464]"
              >
                Sign in
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={profile} />
                    <AvatarFallback>{name?.[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={()=>{
                    router.push("/dashboard/personal")
                  }}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => {
                    router.push("/dashboard/tickets")
                  }}>
                    <Ticket className="mr-2 h-4 w-4" />
                    Tickets
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => {
                    router.push("/dashboard/payment")
                  }}>
                    <Wallet className="mr-2 h-4 w-4" />
                    Wallet
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {type === "home" && (
        <div className="bg-[#f5f5f5] border-b">
          <div className="max-w-7xl mx-auto px-6 h-10 flex gap-6 items-center">
            {categories.map((item) => (
              <Link key={item} href={`/search?category=${item}`}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default LNavbar;