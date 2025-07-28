"use client"; 

import dynamic from "next/dynamic";
import Hero from "@/components/custom/About_Page/Hero";

const About = dynamic(() => import("@/components/custom/About_Page/About"), {
  ssr: false,
});

export default function AboutPage() {
  return (
    <div className="bg-[#0D0D0D] text-white">
      <Hero />
      <About />
    </div>
  );
}
