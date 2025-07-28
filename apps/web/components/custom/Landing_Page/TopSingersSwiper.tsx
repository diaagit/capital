"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";

type Singer = {
  name: string;
  image: string;
  date: string;
  city: string;
};

export default function TopSingersSwiper() {
  const [singers, setSingers] = useState<Singer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingers = async () => {
      try {
        const res = await fetch("/api/singers");
        const data = await res.json();
        setSingers(data);
      } catch (error) {
        console.error("Failed to fetch singers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingers();
  }, []);

  const row1 = singers.filter((_, i) => i % 2 === 0);
  const row2 = singers.filter((_, i) => i % 2 !== 0);

  return (
    <section className="py-10 bg-[#0D0D0D] text-white">

      <div className="flex flex-col justify-center items-center text-center mt-12 mb-10">
        <h1 className="text-3xl font-bold">Top Singers</h1>
        <p className="text-lg text-[#999999] mt-2">
          Find the singers you're looking for quickly.{" "}
          <span className="text-[#D580F2] cursor-pointer hover:underline">
            You can see more.
          </span>
        </p>
      </div>

      {loading && (
        <div className="text-center text-[#999999]">Loading top singers...</div>
      )}

      {!loading && singers.length > 0 && (
        <>

          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={3000}
            loop
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="w-full mb-4"
          >
            {row1.map((singer, idx) => (
              <SwiperSlide key={`row1-${idx}`}>
                <SingerCard singer={singer} />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              reverseDirection: true,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={3500}
            loop
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="w-full"
          >
            {row2.map((singer, idx) => (
              <SwiperSlide key={`row2-${idx}`}>
                <SingerCard singer={singer} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      {!loading && singers.length === 0 && (
        <div className="text-center text-[#999999]">
          No singers available at the moment.
        </div>
      )}
    </section>
  );
}

function SingerCard({ singer }: { singer: Singer }) {
  return (
    <div className="bg-[#1c1c1c] p-3 rounded-xl flex items-center gap-4 shadow-md hover:scale-[1.03] transition-transform duration-200">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={singer.image || "/assets/default-avatar.png"}
          alt={singer.name}
          fill
          className="object-cover"
          sizes="80px"
          priority
        />
      </div>
      <div className="text-left">
        <p className="font-semibold text-sm">{singer.name}</p>
        <p className="text-xs text-gray-400">
          {singer.date} • {singer.city}
        </p>
      </div>
    </div>
  );
}
