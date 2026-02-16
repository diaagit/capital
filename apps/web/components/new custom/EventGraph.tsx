import React, { useMemo, useCallback, useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  type NodeMouseHandler,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { GraphData } from "./EventGraphPage";
import SlotDetailDialog, { EventSlot } from "./Slotdetails";
import { buildGraphFromData } from "@/lib/graphBuilder";
import { SlotFormData, SlotFormDialog } from "./SlotFormDailog";
import getBackendUrl from "@/lib/config";
import axios from "axios";
import { Button } from "../ui/button";

interface EventGraphProps {
  data: GraphData;
  eventId: string;
  submit: boolean;
  setSubmit: Dispatch<SetStateAction<boolean>>;
}

export interface EventData {
  id: string;
  title: string;
  category: string;
  genre: string;
  status: string;
  language: string;
  description: string;
}

const EventGraph: React.FC<EventGraphProps> = ({ data , eventId, submit, setSubmit}) => {
  const graph = useMemo(() => buildGraphFromData(data), [data]);
  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);
  const [slotDialogOpen, setSlotDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<EventSlot | null>(null);
  const [selectedIsEvent, setSelectedIsEvent] = useState(false);

  const allSlots = useMemo(
    () => Object.values(data.slotsByLocation).flat(),
    [data]
  );

  useEffect(() => {
    setNodes(graph.nodes);
    setEdges(graph.edges);
  }, [graph, setNodes, setEdges]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (node.id === "add-slot") {
        setSlotDialogOpen(true);
        return;
      }

      if (node.id === data.event.id) {
        setSelectedSlot(null);
        setSelectedIsEvent(true);
      } else {
        const slot = allSlots.find((s) => s.id === node.id) ?? null;
        setSelectedSlot(slot);
        setSelectedIsEvent(false);
      }

      setDialogOpen(true);
    },
    [data.event.id, allSlots]
  );

  async function handleSubmit(payload: SlotFormData) {
    const URL = getBackendUrl();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${URL}/events/${eventId}/slots`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSlotDialogOpen(false);
      setSubmit(prev => !prev);
    } catch (error) {
      console.error("Error creating slot:", error);
    }
  }

  return (
    <>
      <SlotFormDialog
        open={slotDialogOpen}
        onOpenChange={setSlotDialogOpen}
        onSubmit={handleSubmit}
        mode="create"
      />

      <div className="w-full h-[600px] rounded-lg border border-border bg-card overflow-hidden shadow-md">
          <div className="absolute top-4 right-4 z-10">
            <Button onClick={() => setSlotDialogOpen(true)}>
              Create New Slot
            </Button>
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            attributionPosition="bottom-center"
            proOptions={{ hideAttribution: true }}
          >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <SlotDetailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        slot={selectedSlot}
        event={selectedIsEvent ? (data.event as EventData) : null}
      />
    </>
  );
};

export default EventGraph;