"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  title?: string;
}

const events = [
  { src: "/assets/home/BestEvents1.png", alt: "Comedy Shows", genre: "Comedy Shows" },
  { src: "/assets/home/BestEvents2.png", alt: "Amusement Parks", genre: "Amusement Parks" },
  { src: "/assets/home/BestEvents3.png", alt: "Cricket", genre: "Cricket" },
  { src: "/assets/home/BestEvents4.png", alt: "Kids", genre: "Kids" },
  { src: "/assets/home/BestEvents5.png", alt: "Adventures", genre: "Adventures" },
  { src: "/assets/home/BestEvents6.png", alt: "Art & Craft", genre: "Art & Craft" },
  { src: "/assets/home/BestEvents8.png", alt: "Games", genre: "Games" },
  { src: "/assets/home/BestEvents9.png", alt: "Music", genre: "Music" },
];

export default function HomeCard({ title }: Props) {
  return (
    <section className="w-full max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
        {title ?? "The Best of Live Events"}
        
      </h2>

      <Carousel opts={{align: "start", slidesToScroll: 4}} className="relative w-full">
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem
              key={index}
              className="basis-[45%] sm:basis-[30%] md:basis-[22%] lg:basis-[18%]"
            >
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 group-hover:shadow-xl">
                  <Image
                    src={event.src}
                    alt={event.alt}
                    width={300}
                    height={300}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>

                <p className="mt-3 text-sm font-medium text-gray-800 text-center">
                  {event.genre}
                </p>
              </div>
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