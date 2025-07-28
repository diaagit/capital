import Hero from "@/components/custom/Landing_Page/Hero";
import Concert from "@/components/custom/Landing_Page/Concert";
import Show from "@/components/custom/Landing_Page/Show";
import Sport from "@/components/custom/Landing_Page/Sport";
import Festival from "@/components/custom/Landing_Page/Festival";
import Landing from "@/components/custom/Landing_Page/Landing";
import FAQ from "@/components/custom/FAQ";
import TopSingersSwiper from "@/components/custom/Landing_Page/TopSingersSwiper";
import TestimonialsSlider from "@/components/custom/Landing_Page/TestimonialsSlider";

export default function Home() {
  return (
    <main className="bg-[#0D0D0D] text-white">
      <Hero />


      <Concert />
      <Show />
      <TopSingersSwiper />
      <Sport />
      <Festival />
      <Landing />
      <TestimonialsSlider />
      <FAQ />
    </main>
  );
}
