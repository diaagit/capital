import React from "react";
import { Node, Edge, Position } from "@xyflow/react";
import { GraphData } from "@/components/new custom/EventGraphPage";

export const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const getLocationColor = (
  locationName: string,
  totalLocations: number
) => {
  const hash = hashString(locationName);

  const hueStep = 360 / totalLocations;
  const hue = Math.floor((hash % totalLocations) * hueStep);

  return {
    bg: `hsl(${hue}, 70%, 92%)`,
    border: `hsl(${hue}, 65%, 45%)`,
    shadow: `hsla(${hue}, 65%, 45%, 0.18)`,
  };
};

export function buildGraphFromData(
  data: GraphData
): { nodes: Node[]; edges: Edge[] } {
  const newNodes: Node[] = [];
  const newEdges: Edge[] = [];

  const eventSection: Node = {
    id: "event-section",
    position: { x: 120, y: 20 },
    draggable: false,
    selectable: false,
    data: {
      label: (
        <div className="text-xs font-semibold uppercase tracking-wide bg-indigo-600 rounded-md p-2 text-zinc-100 border-2 border-blue-800">
          Event
        </div>
      ),
    },
    style: {
      background: "transparent",
      border: "none",
    },
  };

  const locationSection: Node = {
    id: "location-section",
    position: { x: 600, y: 20 },
    draggable: true,
    selectable: false,
    data: {
      label: (
        <div className="text-xs font-semibold uppercase tracking-wide bg-orange-400 rounded-md p-2 text-gray-700 border-2 border-orange-300">
          Locations
        </div>
      ),
    },
    style: {
      background: "transparent",
      border: "none",
    },
  };

  newNodes.push(eventSection, locationSection);

  const eventNode: Node = {
    id: data.event.id,
    position: { x: 100, y: 220 },
    sourcePosition: Position.Right,
    targetPosition: Position.Right,
    draggable: false,
    data: {
      label: (
        <div className="font-heading font-bold text-base leading-tight">
          {data.event.title}
        </div>
      ),
    },
    style: {
      background: "hsl(243, 75%, 59%)",
      color: "#fff",
      borderRadius: 12,
      border: "2px solid hsl(243, 75%, 45%)",
      padding: "14px 20px",
      textAlign: "center",
      boxShadow: "0 8px 24px -6px hsla(243, 75%, 59%, 0.35)",
      minWidth: 200,
    },
  };

  newNodes.push(eventNode);

  let yOffset = 100;

  const totalLocations = Object.keys(data.slotsByLocation).length;

  Object.entries(data.slotsByLocation).forEach(
    ([location, slots], locIndex) => {

      const colors = getLocationColor(location, totalLocations);

      const locationLabelNode: Node = {
        id: `location-${locIndex}`,
        position: { x: 600, y: yOffset },
        draggable: true,
        selectable: false,
        data: {
          label: (
            <div className="font-semibold text-sm text-gray-600 bg-gray-200 text-center">
              {location}
            </div>
          ),
        },
        style: {
          background: "transparent",
          border: "none",
        },
      };

      newNodes.push(locationLabelNode);

      yOffset += 40;

      slots.forEach((slot) => {
        const slotNode: Node = {
          id: slot.id,
          position: { x: 600, y: yOffset },
          sourcePosition: Position.Left,
          targetPosition: Position.Left,
          draggable: true,
          data: {
            label: (
              <div className="text-center">
                <div className="font-heading font-semibold text-sm leading-tight">
                  {slot.title}
                </div>
                <div className="text-xs mt-1 opacity-70">
                  {slot.location_name}
                </div>
                {slot.event_date && (
                  <div className="text-xs mt-0.5 opacity-50">
                    {formatDate(slot.event_date)}
                  </div>
                )}
              </div>
            ),
          },
          style: {
            background: colors.bg,
            borderRadius: 10,
            border: `1.5px solid ${colors.border}`,
            padding: "10px 14px",
            textAlign: "center",
            boxShadow: `0 4px 12px -3px ${colors.shadow}`,
            minWidth: 180,
            cursor: "grab",
          },
        };

        newNodes.push(slotNode);

        newEdges.push({
          id: `edge-${slot.id}`,
          source: data.event.id,
          target: slot.id,
          animated: true,
          style: {
            stroke: colors.border,
            strokeWidth: 2,
          },
        });

        yOffset += 120;
      });

      yOffset += 40;
    }
  );

  const hasSlots = Object.keys(data.slotsByLocation).length > 0;

  if (!hasSlots) {
    newNodes.push({
      id: "add-slot",
      position: { x: 600, y: 220 },
      draggable: false,
      selectable: false,
      data: {
        label: (
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold shadow-lg cursor-pointer hover:scale-110 transition">
            +
          </div>
        ),
      },
      style: {
        background: "transparent",
        border: "none",
      },
    });
  }

  return { nodes: newNodes, edges: newEdges };
}