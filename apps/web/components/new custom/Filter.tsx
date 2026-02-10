"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { EventCategory, EventLanguage } from "@/lib/types/eventCard";

export type EventType = "Movies" | "Events" | "Sports" | "Plays" | "Concerts";

interface FilterProps {
  type?: EventType;
}

const CATEGORY_MAP: Record<
  EventType,
  { value: EventCategory; label: string }[]
> = {
  Movies: [{ value: "movie", label: "Movies" }],

  Events: [
    { value: "workshop", label: "Workshops" },
    { value: "conference", label: "Conferences" },
    { value: "exhibition", label: "Exhibitions" },
    { value: "festival", label: "Festivals" },
    { value: "other", label: "Other Events" },
  ],

  Sports: [{ value: "sports", label: "Sports" }],
  Plays: [{ value: "theatre", label: "Theatre & Plays" }],
  Concerts: [
    { value: "concert", label: "Concerts" },
    { value: "comedy", label: "Comedy Shows" },
  ],
};

const PRICE_MAP: Record<string, { min?: number; max?: number }> = {
  Free: { min: 0, max: 0 },
  "0-500": { min: 0, max: 500 },
  "501-2000": { min: 501, max: 2000 },
  "Above 2000": { min: 2000 },
};

const PRICE_FILTERS = Object.keys(PRICE_MAP);

export default function Filter({ type }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resolvedType: EventType = useMemo(() => {
    return type && CATEGORY_MAP[type] ? type : "Events";
  }, [type]);

  const categories = CATEGORY_MAP[resolvedType];

  const [filters, setFilters] = useState<{
    category?: EventCategory;
    language?: EventLanguage;
    minPrice?: number;
    maxPrice?: number;
  }>({});

  useEffect(() => {
    setFilters({
      category: searchParams.get("category") as EventCategory | undefined,
      language: searchParams.get("language") as EventLanguage | undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
    });
  }, [searchParams]);

  const applyFilters = (next: typeof filters) => {
    const params = new URLSearchParams();

    if (next.category) params.set("category", next.category);
    if (next.language) params.set("language", next.language);
    if (next.minPrice !== undefined)
      params.set("minPrice", String(next.minPrice));
    if (next.maxPrice !== undefined)
      params.set("maxPrice", String(next.maxPrice));

    router.push(`/search?${params.toString()}`);
  };

  const toggle = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => {
    const updated = {
      ...filters,
      [key]: filters[key] === value ? undefined : value,
    };
    setFilters(updated);
    applyFilters(updated);
  };

  const applyPrice = (label: string) => {
    const range = PRICE_MAP[label];
    const updated = {
      ...filters,
      minPrice: range.min,
      maxPrice: range.max,
    };
    setFilters(updated);
    applyFilters(updated);
  };

  const clearAll = () => {
    setFilters({});
    router.push("/search");
  };

  const pill = (active: boolean) =>
    clsx(
      "rounded-full px-4 py-1.5 text-sm border transition-all",
      active
        ? "bg-red-500 text-white border-red-500"
        : "border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-500 hover:text-red-600"
    );

  return (
    <aside className="p-6 bg-white border rounded-xl w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button
          onClick={clearAll}
          className="text-sm text-red-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {/* LANGUAGE */}
        <FilterSection title="Language" value="language">
          {Object.values(EventLanguage).map((lang) => (
            <Button
              key={lang}
              variant="outline"
              className={pill(filters.language === lang)}
              onClick={() => toggle("language", lang)}
            >
              {lang.replace("_", " ")}
            </Button>
          ))}
        </FilterSection>

        {/* CATEGORY */}
        <FilterSection title="Category" value="category">
          {categories.map(({ value, label }) => (
            <Button
              key={value}
              variant="outline"
              className={pill(filters.category === value)}
              onClick={() => toggle("category", value)}
            >
              {label}
            </Button>
          ))}
        </FilterSection>

        {/* PRICE */}
        <FilterSection title="Price" value="price">
          {PRICE_FILTERS.map((price) => {
            const range = PRICE_MAP[price];
            const active =
              filters.minPrice === range.min &&
              filters.maxPrice === range.max;

            return (
              <Button
                key={price}
                variant="outline"
                className={pill(active)}
                onClick={() => applyPrice(price)}
              >
                {price}
              </Button>
            );
          })}
        </FilterSection>
      </Accordion>
    </aside>
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
      className="border rounded-lg bg-gray-50 px-4 py-2"
    >
      <AccordionTrigger className="group flex justify-between py-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="flex flex-wrap gap-2 pt-3 pb-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}