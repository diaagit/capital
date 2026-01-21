"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";

export type EventType = "Movies" | "Events" | "Sports" | "Plays" | "Concerts";

interface FilterProps {
  type?: EventType;
}

const CATEGORY_MAP: Record<EventType, string[]> = {
  Movies: ["Screening"],
  Events: ["Workshops", "Meetups", "Exhibitions", "Talks", "Performances"],
  Sports: ["Sports"],
  Plays: ["Theatre"],
  Concerts: ["Music Shows"],
};

const DATE_FILTERS = ["Today", "Tomorrow", "This Weekend"];
const LANGUAGES = [
  "Hindi",
  "English",
  "Marathi",
  "Tamil",
  "Telugu",
  "Gujarati",
  "Punjabi",
  "Malayalam",
  "Bengali",
  "Kannada",
];
const PRICE_FILTERS = ["Free", "0-500", "501-2000", "Above 2000"];

export default function Filter({ type }: FilterProps) {
  const finalType: EventType = type ?? "Events";

  const [selected, setSelected] = useState<{
    date?: string;
    language?: string;
    category?: string;
    price?: string;
  }>({
    category: CATEGORY_MAP[finalType][0],
  });

  const toggle = (key: keyof typeof selected, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value,
    }));
  };

  const pill = (active: boolean) =>
    clsx(
      "rounded-none transition",
      active
        ? "bg-[#C251E6] text-white border-[#C251E6]"
        : "text-[#C251E6] hover:bg-[#C251E6] hover:text-white"
    );

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>

      <Accordion type="multiple" className="space-y-3">
        {/* DATE */}
        <FilterSection title="Date" value="date">
          {DATE_FILTERS.map((date) => (
            <Button
              key={date}
              variant="outline"
              className={pill(selected.date === date)}
              onClick={() => toggle("date", date)}
            >
              {date}
            </Button>
          ))}
        </FilterSection>

        {/* LANGUAGES */}
        <FilterSection title="Languages" value="languages">
          {LANGUAGES.map((lang) => (
            <Button
              key={lang}
              variant="outline"
              className={pill(selected.language === lang)}
              onClick={() => toggle("language", lang)}
            >
              {lang}
            </Button>
          ))}
        </FilterSection>

        {/* CATEGORIES */}
        <FilterSection title="Categories" value="categories">
          {CATEGORY_MAP[finalType].map((category) => (
            <Button
              key={category}
              variant="outline"
              className={pill(selected.category === category)}
              onClick={() => toggle("category", category)}
            >
              {category}
            </Button>
          ))}
        </FilterSection>

        {/* PRICE */}
        <FilterSection title="Price" value="price">
          {PRICE_FILTERS.map((price) => (
            <Button
              key={price}
              variant="outline"
              className={pill(selected.price === price)}
              onClick={() => toggle("price", price)}
            >
              {price}
            </Button>
          ))}
        </FilterSection>
      </Accordion>

      <button className="mt-4 w-full text-[#C251E6] font-semibold border py-2 rounded-none hover:bg-[#C251E6] hover:text-white transition">
        Browse by Venues
      </button>
    </div>
  );
}

function FilterSection({
  title,
  value,
  children,
}: {
  title: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem
      value={value}
      className="border rounded-lg bg-white px-4 shadow-sm"
    >
      <AccordionTrigger className="flex items-center justify-between [&>svg:last-child]:hidden">
        <div className="flex items-center gap-2">
          <ChevronDown className="w-4 h-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
          <span className="font-medium">{title}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="flex flex-wrap gap-2 mt-3">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}