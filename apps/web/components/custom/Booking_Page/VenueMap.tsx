import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import CircularSeating from "../Seating_Chart/CircularSeating";


const VenueMap = () => {
  const filters = [
    {
      placeholder: "Tickets",
      options: [
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "more", label: "More than 3" },
      ],
    },
    {
      placeholder: "Perks",
      options: [
        { value: "vip", label: "VIP Lounge" },
        { value: "food", label: "Free Snacks" },
        { value: "merch", label: "Merchandise" },
      ],
    },
    {
      placeholder: "Front Rows",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      placeholder: "Price",
      options: [
        { value: "1k-10k", label: "₹1000 - ₹10000" },
        { value: "10k-20k", label: "₹10000 - ₹20000" },
        { value: "20k+", label: "₹20000+" },
      ],
    },
  ];

  return (
    <div className="w-4/6">
      <div>
        <div className="text-3xl font-semibold text-white">Filters</div>
        <Separator className="bg-gray-700/50 my-4" />
      </div>

      <div className="flex gap-4 flex-wrap">
        {filters.map((filter, i) => (
          <Select key={i}>
            <SelectTrigger
              className="text-white border-3 border-[#A62FCA] rounded-full text-md px-4 py-2
                hover:border-[#C14FE6] hover:text-white hover:cursor-pointer 
                hover:shadow-[0_0_12px_#C14FE6] hover:scale-[1.03]
                transition-all duration-300 ease-in-out transform"
            >
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-[#1f1f1f] border-none shadow-[0_4px_20px_rgba(0,0,0,0.7)] rounded-md">
              {filter.options.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="text-white hover:bg-zinc-800"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      <div className="w-full flex justify-center items-center mt-20">
        <CircularSeating />
      </div>
    </div>
  );
};

export default VenueMap;
