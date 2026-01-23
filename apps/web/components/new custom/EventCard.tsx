"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatEnumLabel } from "@/lib/formater/enumFormatter";
import { MovieCarouselSkeleton } from "./EventSkeletonCard";
import { EventCategory, EventGenre, EventLanguage } from "@/lib/types/eventCard";
import Link from "next/link";
import { NoEventsFound } from "./NoEventsFound";
import { useRouter } from "next/router";

export type Variant = "home" | "search" | "premier";

interface MovieCarouselProps {
  variant?: Variant;
  title?: string;
  category?: EventCategory,
  genre?: EventGenre,
  language?: EventLanguage
}

export interface Movie {
  id: string
  src: string;
  title: string;
  genre: string;
  rating: number;
  duration: number;
  imdbVotes: number;
  language: string;
  votes: number; 
}

// const movies: Movie[] = [
//   {
//     src: "/assets/movie5.jpg",
//     title: "The Last Horizon",
//     genre: "Action",
//     rating: randomRating(),
//     duration: randomDuration(),
//     imdbVotes: randomVotes(),
//     language: "English",
//     votes: Math.floor(Math.random() * 900_000 + 10_000), 
//   },
//   {
//     src: "/assets/movie2.jpg",
//     title: "Whisper of Time",
//     genre: "Drama",
//     rating: randomRating(),
//     duration: randomDuration(),
//     imdbVotes: randomVotes(),
//     language: "English",
//     votes: Math.floor(Math.random() * 900_000 + 10_000),
//   },
//   {
//     src: "/assets/movie3.jpg",
//     title: "Nightfall",
//     genre: "Thriller",
//     rating: randomRating(),
//     duration: randomDuration(),
//     imdbVotes: randomVotes(),
//     language: "English",
//     votes: Math.floor(Math.random() * 900_000 + 10_000),
//   },
//   {
//     src: "/assets/movie4.jpg",
//     title: "Laugh Out Loud",
//     genre: "Comedy",
//     rating: randomRating(),
//     duration: randomDuration(),
//     imdbVotes: randomVotes(),
//     language: "English",
//     votes: Math.floor(Math.random() * 900_000 + 10_000),
//   },
//   {
//     src: "/assets/movie5.jpg",
//     title: "Nightfall",
//     genre: "Thriller",
//     rating: randomRating(),
//     duration: randomDuration(),
//     imdbVotes: randomVotes(),
//     language: "English",
//     votes: Math.floor(Math.random() * 900_000 + 10_000),
//   },
//   {
//     src: "/assets/movie9.jpg",
//     title: "Nightfall",
//     genre: "Thriller",
//     rating: randomRating(),
//     duration: randomDuration(),
//     imdbVotes: randomVotes(),
//     language: "English",
//     votes: Math.floor(Math.random() * 900_000 + 10_000),
//   },
// ];

export function randomRating() {
  return Number((Math.random() * 4 + 6).toFixed(1));
}

export function randomDuration() {
  return Math.floor(Math.random() * 3 + 1);
}

export function randomVotes() {
  return Math.floor(Math.random() * 9 + 1);
}

export function formatVotes(votes?: number | null) {
  if (typeof votes !== "number" || Number.isNaN(votes)) {
    return "0";
  }

  if (votes >= 1_000_000) return `${(votes / 1_000_000).toFixed(2)}M`;
  if (votes >= 1_000) return `${(votes / 1_000).toFixed(2)}K`;
  return votes.toString();
}

export default function MovieCarousel({
  variant = "home",
  title,
  category,
  genre,
  language,
}: MovieCarouselProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const searchQuery = {
    ...(category && { category }),
    ...(genre && { genre }),
    ...(language && { language }),
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/events`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              category,
              genre,
              language,
              limit: variant === "search" ? 20 : 10,
              sortBy: variant === "premier" ? "created_at" : "price",
              order: "desc",
            },
          }
        );

        const mapped: Movie[] = res.data.events.map((event: any) => ({
          id: event.id,
          src: event.banner_url ?? "/assets/movie9.jpg",
          title: event.title,
          genre: event.genre,
          rating: event.rating ?? randomRating(),
          duration: event.duration ?? randomDuration(),
          imdbVotes: event.imdbVotes ?? randomVotes(),
          language: event.language ?? "English",
          votes: event.votes ?? Math.floor(Math.random() * 900_000 + 10_000),
        }));

        setMovies(mapped);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [category, genre, language, variant]);

  if (loading) {
    return <MovieCarouselSkeleton variant={variant} title={title} />;
  }

  if (!movies.length) {
    return <NoEventsFound variant={variant} title={title} />;
  }

  if (variant === "search") {
    return (
      <section className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </section>
    );
  }

  if (variant === "premier") {
    return (
      <section className="w-full max-w-7xl mx-auto mt-10 px-4">
        <div className="w-full flex justify-between items-center p-2 mb-2">
          <div>
            {title && (
              <>
                <h2 className="text-2xl font-bold">{title}</h2>
                <span className="text-sm text-zinc-100">
                  Brand new releases every Friday
                </span>
              </>
            )}
          </div>

          <p className="text-red-500 cursor-pointer hover:underline">
            <Link
              href={{
                pathname: "/search",
                query: searchQuery,
              }}
              className="text-red-500 hover:text-red-800"
            >
              See All &gt;
            </Link>
          </p>
        </div>

        <Carousel
          className="relative"
          opts={{ align: "start", slidesToScroll: 3 }}
        >
          <CarouselContent className="-ml-2">
            {movies.map((movie, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-[160px] sm:basis-[190px] md:basis-[220px]"
              >
                <MovieCard movie={movie} varient="premier" />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className="!left-3 !bg-stone-700 text-white hover:!bg-stone-900 hover:text-zinc-50 
            !rounded-full !w-10 !h-10 
            disabled:opacity-0 disabled:pointer-events-none"
          />

          <CarouselNext
            className="!right-3 !bg-stone-700 text-white hover:!bg-stone-900 hover:text-zinc-50 
            !rounded-full !w-10 !h-10 
            disabled:opacity-0 disabled:pointer-events-none"
          />
        </Carousel>
      </section>
    );
  }
  return (
    <section className="w-full max-w-7xl mx-auto mt-10 px-4">
      <div className="w-full flex justify-between items-center p-2 mb-2">
        <div>{title && <h2 className="text-2xl font-bold">{title}</h2>}</div>
        <Link
          href={{
            pathname: "/search",
            query: searchQuery,
          }}
          className="text-red-500 hover:text-red-800"
        >
          See All &gt;
        </Link>
      </div>

      <Carousel className="relative" opts={{align: "start", slidesToScroll: 3}}>
        <CarouselContent className="-ml-2">
          {movies.map((movie, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[160px] sm:basis-[190px] md:basis-[220px]"
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="!left-3 !bg-stone-700 text-white hover:!bg-stone-900 hover:text-zinc-50 
          !rounded-full !w-10 !h-10 
          disabled:opacity-0 disabled:pointer-events-none"
        />

        <CarouselNext
          className="!right-3 !bg-stone-700 text-white hover:!bg-stone-900 hover:text-zinc-50 
          !rounded-full !w-10 !h-10 
          disabled:opacity-0 disabled:pointer-events-none"
        />

      </Carousel>
    </section>
  );
}

export function MovieCard({
  movie,
  varient,
}: {
  movie: Movie;
  varient?: Variant;
}) {
  const isGoodRating = movie.rating >= 7.5;
  const FALLBACK_IMAGE = "https://theposterdb.com/api/assets/9798/view";

  const [imgSrc, setImgSrc] = useState(
    movie.src && movie.src !== "N/A" ? movie.src : FALLBACK_IMAGE
  );

  return (
    <Link href={`/event/${movie.id}`} className="block">
      <div className="group cursor-pointer max-w-[240px]">
        {varient === "premier" ? (
          <>
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 shadow-md transition-all duration-300 group-hover:scale-[1.03]">
              <Image
                src={imgSrc}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 150px, 220px"
                className="object-cover"
                onError={() => setImgSrc(FALLBACK_IMAGE)}
              />
              <div className="absolute bottom-0 left-0 right-0 text-white bg-rose-500 px-2 py-1 w-32 flex items-center gap-1">
                <p className="text-zinc-50 font-semibold">PREMIERE</p>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <h3 className="text-sm font-semibold text-zinc-50 line-clamp-2">
                {formatEnumLabel(movie.title)}
              </h3>

              <p className="text-xs text-gray-200">
                {movie.duration}h • {movie.imdbVotes}M IMDB •{" "}
                {formatEnumLabel(movie.language)}
              </p>

              <span className="inline-block text-xs font-medium text-white">
                {formatEnumLabel(movie.genre)}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 shadow-md transition-all duration-300 group-hover:scale-[1.03]">
              <Image
                src={imgSrc}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 150px, 220px"
                className="object-cover"
                onError={() => setImgSrc(FALLBACK_IMAGE)}
              />

              <div className="absolute bottom-0 left-0 right-0 bg-stone-800/95 px-3 py-2 flex items-center gap-1">
                {isGoodRating ? (
                  <ThumbsUp className="w-5 h-5 text-green-400 fill-green-900" />
                ) : (
                  <ThumbsDown className="w-5 h-5 text-red-400 fill-red-900" />
                )}

                <span className="text-xs font-bold text-white">
                  {movie.rating}/10
                </span>

                <span className="text-[11px] text-zinc-100">Rating</span>

                <span className="ml-auto text-[11px] text-zinc-100 font-medium">
                  {formatVotes(movie.votes)} Votes
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                {formatEnumLabel(movie.title)}
              </h3>

              <p className="text-xs text-gray-500">
                {movie.duration}h • {movie.imdbVotes}M IMDB •{" "}
                {formatEnumLabel(movie.language)}
              </p>

              <span className="inline-block text-xs font-medium text-indigo-600">
                {formatEnumLabel(movie.genre)}
              </span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
