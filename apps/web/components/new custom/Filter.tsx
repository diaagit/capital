import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Filter() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>

      <Accordion type="multiple" className="space-y-2">
        {/* Date Filter */}
        <AccordionItem
          value="date"
          className="border rounded-none shadow-sm px-4 bg-white"
        >
          <AccordionTrigger className="flex items-center justify-between [&>svg:last-child]:hidden no-underline">
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              <span className="text-base font-medium no-underline">Date</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-wrap gap-2 mt-2">
            {["Today", "Tomorrow", "This Weekend"].map((date) => (
              <Button
                key={date}
                variant="outline"
                className="text-[#C251E6] rounded-none hover:text-white hover:bg-[#C251E6]"
              >
                {date}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Languages Filter */}
        <AccordionItem
          value="languages"
          className="border rounded-none shadow-sm px-4  bg-white"
        >
          <AccordionTrigger className="flex items-center justify-between [&>svg:last-child]:hidden">
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              <span className="text-base font-medium">Languages</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-wrap gap-2 mt-2">
            {[
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
            ].map((lang) => (
              <Button
                key={lang}
                variant="outline"
                className="text-[#C251E6] rounded-none hover:text-white hover:bg-[#C251E6]"
              >
                {lang}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Categories Filter */}
        <AccordionItem
          value="categories"
          className="border rounded-none shadow-sm px-4 bg-white"
        >
          <AccordionTrigger className="flex items-center justify-between [&>svg:last-child]:hidden">
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              <span className="text-base font-medium">Categories</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-wrap gap-2 mt-2">
            {[
              "Workshops",
              "Music Shows",
              "Meetups",
              "Theatre",
              "Performances",
              "Exhibitions",
              "Talks",
              "Screening",
            ].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="text-[#C251E6] rounded-none hover:text-white hover:bg-[#C251E6]"
              >
                {category}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem
          value="price"
          className="border rounded-none shadow-sm px-4  bg-white"
        >
          <AccordionTrigger className="flex items-center justify-between [&>svg:last-child]:hidden">
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              <span className="text-base font-medium">Price</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-wrap gap-2 mt-2">
            {["Free", "0-500", "501-2000", "Above 2000"].map((price) => (
              <Button
                key={price}
                variant="outline"
                className="text-[#C251E6] rounded-none hover:text-white hover:bg-[#C251E6]"
              >
                {price}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button className="mt-3 w-full text-[#C251E6] font-semibold border hover:text-white rounded-none py-2 hover:bg-[#C251E6] transition">
        Browse by Venues
      </button>
    </div>
  );
}
