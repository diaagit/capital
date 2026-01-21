"use client";

import Image from "next/image";
import Link from "next/link";

export type EventResult = {
  id: string;
  title: string;
  location_name: string;
  banner_url?: string;
};

interface TitleSearchCardProps {
  event: EventResult;
  onSelect: () => void;
}

const TitleSearchCard = ({
  event,
  onSelect,
}: TitleSearchCardProps) => {
  return (
    <Link
      href={`/events/${event.id}`}
      onClick={onSelect}
      className="flex gap-4 p-4 hover:bg-gray-50 border-b last:border-b-0"
    >
      <div className="w-14 h-14 rounded-md bg-gray-200 overflow-hidden shrink-0">
        <Image
          src={event.banner_url ?? "/assets/movie5.jpg"}
          alt={event.title}
          width={56}
          height={56}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {event.title}
        </span>
        <span className="text-xs text-gray-500">
          {event.location_name}
        </span>
      </div>
    </Link>
  );
};

export default TitleSearchCard;