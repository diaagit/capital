import ArtistSidebar from "@/components/custom/Event_Page/ArtistSidebar";
import EventSchedule from "@/components/custom/Event_Page/EventSchedule";
import Hero from "@/components/custom/Event_Page/Hero";

const Page = () => {
  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-6 p-4">
        
        <div className="flex-1 lg:flex-[2]">
          <EventSchedule />
        </div>

        <div className="flex-1 lg:flex-[1]">
          <ArtistSidebar />
        </div>
      </div>
    </div>
  );
};

export default Page;
