"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

type Testimonial = {
  text: string;
  name: string;
  image: string;
  rating: number;
};

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-10 bg-[#0D0D0D] text-white">
      {/* Header */}
      <div className="text-center mt-12 mb-10">
        <h2 className="text-3xl font-bold mb-2">Loved by Thousands</h2>
        <p className="text-lg text-[#999999]">
          Smooth, easy ticket buying — hear it from our happy users.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-[#999999]">Loading testimonials...</div>
      )}

      {!loading && testimonials.length > 0 && (
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={4500}
          loop
          spaceBetween={24}
          slidesPerView={1.5}
          breakpoints={{
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
          className="w-full"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-[#1c1c1c] p-4 rounded-xl shadow-md h-52 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200">
                <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                  “{t.text}”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image
                      src={t.image || "/assets/default-avatar.png"}
                      alt={t.name || "User"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <div
                      className="text-purple-400 text-xs"
                      aria-label={`${t.rating} out of 5 stars`}
                    >
                      {"★".repeat(t.rating)}
                      <span className="text-gray-600">
                        {"★".repeat(5 - t.rating)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* No testimonials fallback */}
      {!loading && testimonials.length === 0 && (
        <div className="text-center text-[#999999]">No testimonials found.</div>
      )}
    </section>
  );
}
