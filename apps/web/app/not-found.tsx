"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/Error.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
      className="flex flex-col items-center justify-center text-white text-center relative"
    >
    
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="text-[200px] font-extrabold text-[#C14FE6] drop-shadow-lg">
          404
        </h1>
        <p className="text-2xl font-medium max-w-md text-[#d1d1d1]">
          Oops! The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link href="/">
          <Button
            className="bg-[#C14FE6] text-white text-lg px-8 py-4 rounded-lg 
                       hover:bg-[#a93bce] transition transform duration-200 
                       hover:scale-105"
          >
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
