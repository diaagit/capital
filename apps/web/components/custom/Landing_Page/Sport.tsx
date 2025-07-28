import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Card from "@/components/custom/ConcertsCard";

const categories = [
  "All",
  "Pop",
  "Rock",
  "Jazz & Blues",
  "Hip-Hop & Rap",
  "Alternative",
  "Classical",
  "Opera",
  "Country",
];

const Sport = () => {
  return (
    <div className="max-w-7xl mx-auto bg-[#0D0D0D] text-white mt-20 px-4">

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
        <h1 className="text-3xl font-bold">Sport</h1>
        <button className="text-xl text-[#D580F2] hover:underline cursor-pointer">
          See more
        </button>
      </div>

      <Separator className="bg-gray-700/50" />

      <div className="flex flex-wrap gap-3 pt-5">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="outline"
            className={`rounded-full text-sm px-4 py-1 transition-all duration-200 ${
              category === "All"
                ? "bg-[#D580F2] text-white border-none shadow-lg"
                : "bg-[#1b1a1a] text-white border border-gray-600 hover:bg-[#2b2b2b]"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="mt-8">
        <Card />
      </div>
    </div>
  );
};

export default Sport;
