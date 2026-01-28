import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRef } from "react";

export const DragDropAvatar = ({
  src,
  disabled,
  onChange,
  name,
}: {
  src: string;
  disabled: boolean;
  name: string;
  onChange: (file: File) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) onChange(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "relative group cursor-pointer",
        disabled && "cursor-not-allowed opacity-70"
      )}
    >
      <Avatar className="h-24 w-24 border">
        <AvatarImage src={src} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>

      {!disabled && (
        <div className="absolute inset-0 bg-black/40 text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          Upload
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => e.target.files && onChange(e.target.files[0])}
      />
    </div>
  );
};