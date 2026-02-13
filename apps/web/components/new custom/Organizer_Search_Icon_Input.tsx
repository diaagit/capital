import { cn } from "@/lib/utils";

function OrganizerIconInput({ placeholder, icon: Icon, value, setValue, className }: any) {
  return (
    <div className={cn("relative", className)}>
      <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-xl border bg-gray-50 pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-200 transition"
      />
    </div>
  );
}

export default OrganizerIconInput