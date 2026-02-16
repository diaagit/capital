"use client";

import { Button } from "@/components/ui/button";
import { Plus,Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getBackendUrl from "@/lib/config";
import axios from "axios";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface BackendProps {
  firstName: string;
  proficPic: string;
}

interface Props {
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrganizerHeader({ setClick }:Props){
  const router = useRouter();

  const [userData, setUserData] = useState<BackendProps>({
    firstName: "",
    proficPic: "",
  });

  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Your session expired, please login");
      router.push("/organizer/login");
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const URL = getBackendUrl();

    async function getData() {
      try {
        const res = await axios.get(`${URL}/organiser/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data.data);
      } catch {
        setUserData({
          firstName: "Organiser",
          proficPic: "https://i.pravatar.cc/300",
        });
      }
    }

    getData();
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userData.firstName || "Organiser"} 👋
        </h1>
        <div>
          <div className="w-full flex justify-end items-center gap-3 md:w-96">
            <Button
              className="h-10 rounded-md px-5 shadow-sm transition-colors hover:shadow-inner hover:bg-gray-200 hover:text-black hover:border hover:border-neutral-200"
              onClick={() =>
                router.push("/organizer/dashboard/events/new-event")
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button
                className="h-10 rounded-md px-5 shadow-sm bg-green-700 text-white transition-colors hover:shadow-inner hover:bg-gray-200 hover:text-black hover:border hover:border-neutral-200"
                onClick={() => setClick(true)}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Complete Dashboard</p>
              </TooltipContent>
            </Tooltip> */}
        </div>
        </div>
      </div>
    </div>
  );
}