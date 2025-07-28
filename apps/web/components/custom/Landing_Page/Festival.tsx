import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Card from "@/components/custom/ConcertsCard"

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
]

const Festival = () => {
  return (
    <div className="max-w-7xl mx-auto bg-[#0D0D0D] text-white mt-20">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-3xl font-bold">Festival</h1>
        <p className="text-xl hover:text-[#D580F2] hover:cursor-pointer transition-colors">
          See More
        </p>
      </div>

      <Separator className="bg-gray-700/50" />

      <div className="flex flex-wrap gap-3 pt-5">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className={`rounded-full text-sm px-4 py-1 ${
              category === "All"
                ? "bg-[#D580F2] text-white border-none"
                : "bg-[#1b1a1a] text-white border border-gray-600 hover:bg-[#2a2a2a]"
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
  )
}

export default Festival
