import { CalendarDays } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-24 border rounded-2xl bg-white">
      <CalendarDays className="mx-auto mb-4 text-gray-400" size={40} />
      <h3 className="text-lg font-semibold">No Events Found</h3>
      <p className="text-sm text-gray-500 mt-2">
        Try adjusting filters or create your first event.
      </p>
    </div>
  );
}