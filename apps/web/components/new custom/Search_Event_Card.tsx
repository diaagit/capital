import { Movie, MovieCard, randomDuration, randomRating, randomVotes } from "./EventCard";
import NoEventGridSkeleton from "./NoEventGridSkeleton";

interface Props {
  events: any[];
}

interface BackendEvent {
  id: string;
  title: string;
  banner_url?: string | null;
  genre?: string;
  language?: string;
}

const FALLBACK_IMAGE = "https://theposterdb.com/api/assets/9798/view";

function mapEventToMovie(event: BackendEvent): Movie {
  return {
    id: event.id,
    src:
      typeof event.banner_url === "string" && event.banner_url.length > 0
        ? event.banner_url
        : FALLBACK_IMAGE,

    title: event.title ?? "Untitled Event",
    genre: event.genre ?? "other",
    language: event.language ?? "english",

    rating: randomRating(),
    duration: randomDuration(),
    imdbVotes: randomVotes(),
    votes: Math.floor(Math.random() * 900_000 + 10_000),
  };
}

export default function EventGrid({ events }: Props) {
  if (!events.length) {
    return <NoEventGridSkeleton />;
  }

  const movies = events.map(mapEventToMovie);

  return (
    <div className="w-full">
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}