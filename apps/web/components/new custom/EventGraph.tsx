// EventGraphXYFlowPage.tsx
import React, { useEffect, useState } from "react";
import { Node, Edge, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import axios from "axios";

interface EventSlot {
  id: string;
  title: string;
  location_name: string;
}

interface EventData {
  id: string;
  title: string;
  description: string;
}

interface SlotsByLocation {
  [location: string]: EventSlot[];
}

interface GraphData {
  event: EventData;
  slotsByLocation: SlotsByLocation;
}

const EventGraphXYFlowPage: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const res = await axios.get(`/organiser/${eventId}/graph`);
        const data: GraphData = res.data.data;

        const eventNode: Node = {
          id: data.event.id,
          data: { label: data.event.title },
          position: { x: 400, y: 100 },
          width: 160,
          height: 60,
        };

        const newNodes: Node[] = [eventNode];
        const newEdges: Edge[] = [];

        let xOffset = 0;
        let yOffset = 200;

        Object.keys(data.slotsByLocation).forEach((location) => {
          const slots = data.slotsByLocation[location];

          slots.forEach((slot, index) => {
            const slotNode: Node = {
              id: slot.id,
              data: { label: `${slot.title} (${slot.location_name})` },
              position: { x: 150 * index + xOffset, y: yOffset },
              width: 140,
              height: 50,
            };

            newNodes.push(slotNode);

            newEdges.push({
              id: `edge-${slot.id}`,
              source: data.event.id,
              target: slot.id,
            });
          });

          yOffset += 150;
          xOffset = 0;
        });

        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error("Error fetching XYFlow graph:", error);
      }
    };

    fetchGraph();
  }, [eventId]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
};

export default EventGraphXYFlowPage;