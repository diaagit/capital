import Hero from "@/components/custom/Booking_Page/Hero";
import Ticket from "@/components/custom/Booking_Page/Ticket";
import VenueMap from "@/components/custom/Booking_Page/VenueMap";

const Page = () => {
  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen">
      <Hero />
      <div className="max-w-7xl mx-auto mt-10 flex flex-col lg:flex-row gap-8 p-4">
        <div className="flex-1 lg:flex-[2]">
          <VenueMap />
        </div>

        <div className="flex-1 lg:flex-[1]">
          <Ticket />
        </div>
      </div>
    </div>
  );
};

export default Page;
