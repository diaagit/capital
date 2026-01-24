"use client"

import EventSchedule from "@/components/new custom/EventSchedule";
import LNavbar from "@/components/new custom/LNavbar";
import EventHero from "@/components/new custom/EventHero";
import { useEffect, useMemo, useState } from "react";
import RightSidebarEvent from "../new custom/RightSidebarEvent";
import getBackendUrl from "@/lib/config";
import axios from "axios";

const Page = ({id}:{id:string}) => {
  const eventId = id;
  const URL = getBackendUrl();
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  
  useMemo(()=>{
    async function getData() {
      const response = await axios.get(`${URL}/events/${eventId}/slots`,{headers: {Authorization: `Bearer ${token}`}});
      setData(response.data);
    }
    getData();
  },[])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-50 bg-card border-b">
        <LNavbar type="search" />
      </div>

      <EventHero />

        <div className="w-full min-h-screen bg-zinc-50 flex justify-center">
          <div className="w-full max-w-7xl flex gap-5 py-10">
            
            <div className="w-[1200px] rounded-2xl bg-white p-2 shadow-md border border-neutral-200 min-h-[400px]">
              <EventSchedule />
            </div>

            <div className="w-[450px] rounded-2xl  bg-white shadow-md border border-neutral-200 min-h-[400px]">
              <RightSidebarEvent />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Page;