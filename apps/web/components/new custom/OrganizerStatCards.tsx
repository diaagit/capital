import { cn } from "@/lib/utils";

function OrganizerStatCard({
  icon: Icon,
  title,
  value,
  highlight,
}: {
  icon: any;
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={cn(
      "rounded-2xl border p-6 flex items-center gap-4 shadow-sm bg-white",
      highlight && "border-emerald-200 bg-emerald-50"
    )}>
      <div className="rounded-xl p-3 bg-indigo-50 text-indigo-600">
        <Icon size={20} />
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}

export default OrganizerStatCard;