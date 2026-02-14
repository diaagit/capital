import { CalendarDays } from "lucide-react";

type PropUsage = {
  type: "events" | "slots"
}

export default function EmptyState({type}: PropUsage) {
  return (
    <div className="text-center py-24 border rounded-2xl bg-white">
      <CalendarDays className="mx-auto mb-4 text-gray-400" size={40} />
      <h3 className="text-lg font-semibold">{type === "events" ? "No Events Found" : "No Slots Found"}</h3>
      <p className="text-sm text-gray-500 mt-2">
        {type === "events" ? "Try adjusting filters or create your first event." : "Try adjusting filters or create your first slot."}
      </p>
    </div>
  );
}