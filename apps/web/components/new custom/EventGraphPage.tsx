"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import getBackendUrl from "@/lib/config";
import GraphEventHeader from "./GraphHeader";
import { EventData } from "./GraphHeader";
import { EventSlot } from "./Slotdetails";
import EventGraph from "./EventGraph";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface SlotsByLocation {
  [location: string]: EventSlot[];
}

export interface GraphData {
  event: EventData;
  slotsByLocation: SlotsByLocation;
}

interface EventGraphPageProps {
  eventId: string;
}

const EventGraphPage: React.FC<EventGraphPageProps> = ({ eventId }) => {
  const router = useRouter();
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submission,setSubmission] = useState<boolean>(false);

  useEffect(()=> {
    const token = localStorage.getItem("token");
    if(!token){
      toast.warning("You are not logged in")
      router.push("/organizer/login")
    }
  },[])

  const fetchGraphData = async () => {
      setLoading(true);
      setError(null);
      const URL = getBackendUrl();
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${URL}/organiser/${eventId}/graph`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.data) {
          setGraphData(res.data.data);
        } else {
          setError("No graph data found for this event.");
        }
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Failed to fetch graph data.");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchGraphData();
  }, [eventId]);

  useEffect(() => {
    if (!submission) return;

    fetchGraphData();
    setSubmission(false);
  }, [submission]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-gray-500">
        Loading graph...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center text-red-600">
        <p className="mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!graphData) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center text-gray-600">
        <p>No slots available for this event.</p>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          onClick={() => alert("Redirect to create a new slot")}
        >
          Create a New Slot
        </button>
      </div>
    );
  }

  const hasSlots = Object.values(graphData.slotsByLocation).flat().length > 0;

  return (
    <div className="w-full p-6">

      <GraphEventHeader event={graphData.event} />

      {hasSlots ? (
        <EventGraph data={graphData} eventId={eventId} submit={submission} setSubmit={setSubmission}/>
      ) : (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-white rounded shadow-md">
          <p className="text-gray-700 mb-4">No slots available for this event.</p>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            onClick={() => alert("Redirect to create a new slot")}
          >
            Create a New Slot
          </button>
        </div>
      )}
    </div>
  );
};

export default EventGraphPage;