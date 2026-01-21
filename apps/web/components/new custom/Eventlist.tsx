"use client";

import Filter, { EventType } from "@/components/new custom/Filter";
import { Button } from "@/components/ui/button";
import MovieCarousel from "@/components/new custom/EventCard";
import axios from "axios";
import getBackendUrl from "@/lib/config";
import { useState } from "react";

type Props = {
  searchParams: {
    q?: string;
    location?: string;
  };
};

const tags = [
  "Workshops",
  "Music Shows",
  "Meetups",
  "Theatre",
  "Performances",
  "Exhibitions",
  "Talks",
  "Screening",
];

export default function Eventlist({ searchParams }: Props) {
  //const { status, organiser, title, location } = req.query;
  const [data,setData] = useState("");
  const [status,setStatus] = useState("");
  const [organiser,setOrganiser] = useState("");
  const [location,setLocation] = useState("");

  const URL = getBackendUrl();
  async function GetData() {
    const res = await axios.get(
        `${URL}/events?title=${encodeURIComponent(searchParams.q)}&city=${searchParams.location}`
    );  
    if(res.status === 200){
      setData(res.data)
    }
  }
  return (
    <div className="w-full max-w-7xl mx-auto flex gap-10 mt-10">
      <aside className="w-[300px]">
        <Filter type={searchParams.q as EventType} />
      </aside>

      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-5">Events in Pune</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className="rounded-full text-[#C251E6] hover:cursor-pointer hover:text-white hover:bg-[#C251E6]"
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="">
          <MovieCarousel variant="search" />
        </div>
      </main>
    </div>
  );
}