import EventSchedule from "@/components/new custom/EventSchedule";
import Hero from "@/components/new custom/EventHero";

const Page = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-6 p-4">
        
        <div className="flex-1 lg:flex-[2]">
          <EventSchedule />
        </div>
      </div>
    </div>
  );
};

export default Page;
