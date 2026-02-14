import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
  placeholder?: string;
  icon?: LucideIcon;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

function OrganizerIconInput({
  placeholder,
  icon: Icon,
  value,
  onChange,
  className,
}: Props) {
  return (
    <div className={cn("relative", className)}>
      {Icon && (
        <Icon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      )}

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "h-9 w-80 rounded-lg border border-gray-200 bg-white",
          "text-sm transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-200",
          "placeholder:text-gray-400",
          Icon ? "pl-9 pr-3" : "px-3"
        )}
      />
    </div>
  );
}

export default OrganizerIconInput;
