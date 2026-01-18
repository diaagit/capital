import Card from "@/components/custom/ConcertsCard";
import FAQ from "@/components/custom/FAQ";
import { MapPin, LayoutGrid, CalendarDays, CircleDollarSign } from "lucide-react";

const Page = () => {
  return (
    <div className="bg-[#0D0D0D] text-white">
        
      <div className="max-w-7xl mx-auto py-12">
        <div className="flex justify-around items-center flex-wrap gap-6 text-[#999999]">
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold">What</p>
            <LayoutGrid className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold">Where</p>
            <MapPin className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold">When</p>
            <CalendarDays className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold">Price</p>
            <CircleDollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <div className="flex justify-center pt-10">
          <a href="/events">
            <button className="bg-[#d46cf6] text-white px-6 py-3 rounded-lg hover:bg-[#B06BCF] transition duration-300">
              View More Concerts
            </button>
          </a>
        </div>
      </div>

      <div className="relative">
        <img
          src="/assets/show-banner.png"
          alt="Banner"
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-1/3 left-12 max-w-lg">
          <h1 className="text-4xl font-bold">Start exploring events today!</h1>
          <p className="text-xl text-[#999999] mt-4">
            Find concerts, shows, and more near you.
          </p>
          <a href="/events">
            <button className="bg-[#d46cf6] text-white py-3 px-14 mt-4 rounded-lg hover:bg-[#B06BCF] transition duration-300">
              Start
            </button>
          </a>
        </div>
      </div>

      <div className="mt-20 max-w-7xl mx-auto px-4">
        <FAQ />
      </div>
    </div>
  );
};

export default Page;
