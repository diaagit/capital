"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function CarouselComponent() {
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false, 
      stopOnMouseEnter: false,
    })
  );

  const banners = [
    "/assets/home/Carousel1.jpg",
    "/assets/home/Carousel2.jpg",
    "/assets/home/Carousel3.jpeg",
  ];

  return (
    <section className="w-full flex justify-center">
      <Carousel
        plugins={[autoplay.current]}
        opts={{ loop: true, align: "center" }}
        className="relative w-full max-w-[1800px] mt-8"
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}
      >
        <CarouselContent className="-ml-4">
          {banners.map((src, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[90%] sm:basis-[85%] md:basis-[75%] lg:basis-[65%]"
            >
              <div className="relative overflow-hidden rounded-xl shadow-xl group">
                <Image
                  src={src}
                  alt={`Banner ${index + 1}`}
                  width={1800}
                  height={700}
                  priority={index === 0}
                  className="h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}