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

type Variant = "home" | "search" | "premier";

interface MovieCarouselProps {
  variant?: Variant;
  title?: string;
}

interface Movie {
  src: string;
  title: string;
  genre: string;
  rating: number;
  duration: number;
  imdbVotes: number;
  language: string;
  votes: number; 
}

const movies: Movie[] = [
  {
    src: "/assets/movie5.jpg",
    title: "The Last Horizon",
    genre: "Action",
    rating: randomRating(),
    duration: randomDuration(),
    imdbVotes: randomVotes(),
    language: "English",
    votes: Math.floor(Math.random() * 900_000 + 10_000), 
  },
  {
    src: "/assets/movie2.jpg",
    title: "Whisper of Time",
    genre: "Drama",
    rating: randomRating(),
    duration: randomDuration(),
    imdbVotes: randomVotes(),
    language: "English",
    votes: Math.floor(Math.random() * 900_000 + 10_000),
  },
  {
    src: "/assets/movie3.jpg",
    title: "Nightfall",
    genre: "Thriller",
    rating: randomRating(),
    duration: randomDuration(),
    imdbVotes: randomVotes(),
    language: "English",
    votes: Math.floor(Math.random() * 900_000 + 10_000),
  },
  {
    src: "/assets/movie4.jpg",
    title: "Laugh Out Loud",
    genre: "Comedy",
    rating: randomRating(),
    duration: randomDuration(),
    imdbVotes: randomVotes(),
    language: "English",
    votes: Math.floor(Math.random() * 900_000 + 10_000),
  },
  {
    src: "/assets/movie5.jpg",
    title: "Nightfall",
    genre: "Thriller",
    rating: randomRating(),
    duration: randomDuration(),
    imdbVotes: randomVotes(),
    language: "English",
    votes: Math.floor(Math.random() * 900_000 + 10_000),
  },
  {
    src: "/assets/movie9.jpg",
    title: "Nightfall",
    genre: "Thriller",
    rating: randomRating(),
    duration: randomDuration(),
    imdbVotes: randomVotes(),
    language: "English",
    votes: Math.floor(Math.random() * 900_000 + 10_000),
  },
];

function randomRating() {
  return Number((Math.random() * 4 + 6).toFixed(1));
}

function randomDuration() {
  return Math.floor(Math.random() * 3 + 1);
}

function randomVotes() {
  return Math.floor(Math.random() * 9 + 1);
}

function formatVotes(votes: number) {
  if (votes >= 1_000_000) return `${(votes / 1_000_000).toFixed(2)}M`;
  if (votes >= 1_000) return `${(votes / 1_000).toFixed(2)}K`;
  return votes.toString();
}

export default function MovieCarousel({
  variant = "home",
  title,
}: MovieCarouselProps) {
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
            See All &gt;
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
        <p className="text-red-500">See All {">"}</p>
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

function MovieCard({ movie, varient }: { movie: Movie,varient?:Variant}) {
  const isGoodRating = movie.rating >= 7.5;

   if(varient === "premier"){
      return (
        <div className="group cursor-pointer">
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 shadow-md transition-all duration-300 group-hover:scale-[1.03]">

            <Image
              src={movie.src}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 150px, 220px"
              className="object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 text-white bg-rose-500 px-2 py-1 w-32 flex items-center gap-1">
              <p className="text-zinc-50 font-semibold">PREMIERE</p>
            </div>

          </div>

          <div className="mt-3 space-y-1">
            <h3 className="text-sm font-semibold text-zinc-50 line-clamp-2">
              {movie.title}
            </h3>

            <p className="text-xs text-gray-200">
              {movie.duration}h • {movie.imdbVotes}M IMDB • {movie.language}
            </p>

            <span className="inline-block text-xs font-medium text-white">
              {movie.genre}
            </span>
          </div>
        </div>
      )
    }

  return (
    <div className="group cursor-pointer">
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 shadow-md transition-all duration-300 group-hover:scale-[1.03]">

        <Image
          src={movie.src}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 150px, 220px"
          className="object-cover"
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

          <span className="text-[11px] text-zinc-100">
            Rating
          </span>

          <span className="ml-auto text-[11px] text-zinc-100 font-medium">
            {formatVotes(movie.votes)} Votes
          </span>
        </div>

      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {movie.title}
        </h3>

        <p className="text-xs text-gray-500">
          {movie.duration}h • {movie.imdbVotes}M IMDB • {movie.language}
        </p>

        <span className="inline-block text-xs font-medium text-indigo-600">
          {movie.genre}
        </span>
      </div>
    </div>
  );
}