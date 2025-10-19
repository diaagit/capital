import Filter from "@/components/new custom/Filter";
import EventCard from "@/components/new custom/EventCard";
import { Button } from "@/components/ui/button";

const tags = [
  "Workshops",
  "Music Shows",
  "Meetups",
  "Theatre",
  "Performances",
  "Exhibitions",
  "Talks",
  "Screening",
];

const events = [
  { src: "/assets/movie5.jpg", title: "The Last Horizon", genre: "Action" },
  { src: "/assets/movie2.jpg", title: "Whisper of Time", genre: "Drama" },
  { src: "/assets/movie3.jpg", title: "Nightfall", genre: "Thriller" },
  { src: "/assets/movie4.jpg", title: "Laugh Out Loud", genre: "Comedy" },
  { src: "/assets/movie5.jpg", title: "Romantic Escape", genre: "Romance" },
  { src: "/assets/movie2.jpg", title: "Galactic Quest", genre: "Sci-Fi" },
  { src: "/assets/movie3.jpg", title: "Mystery Manor", genre: "Mystery" },
  { src: "/assets/movie4.jpg", title: "Hero's Return", genre: "Adventure" },
];

export default function Eventlist() {
  return (
    <div className="max-w-7xl mx-auto flex gap-10 mt-10">
      {/* LEFT SIDE: Filters */}
      <aside className="w-[450px]">
        <Filter />
      </aside>

      {/* RIGHT SIDE: Events */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-5">Events in Pune</h1>

        {/* Tag Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className="rounded-full text-[#C251E6] hover:cursor-pointer hover:text-white hover:bg-[#C251E6]"
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Event Cards */}
        <div className=" ">
          <EventCard />
          <EventCard />
        </div>
      </main>
    </div>
  );
}
