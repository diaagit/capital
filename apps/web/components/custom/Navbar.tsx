import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <nav className="w-full absolute top-0 left-0 flex justify-between items-center px-10 py-1 bg-transparent text-white z-50">
      <img
        src="/assets/Eventique.png"
        alt="Eventique"
        className="w-[200px] h-[70px] p-4 ml-5"
      />
      <div className="hidden md:flex font-semibold items-center space-x-10">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <Link href="/about" className="hover:text-primary transition-colors">
          About
        </Link>
        <Link rel="stylesheet" href="new_ui_event.tsx" className="hover:text-primary transition-colors">
          Events
        </Link>
        <Link href="/footer" className="hover:text-primary transition-colors">
          Contact Us
        </Link>
      </div>
      <div className="flex items-center space-x-2 text-black mr-5">
        {/* Uncomment if you want the "Book" button */}
        {/* 
        <Button variant="ghost" asChild>
          <Link href="/events">Book</Link>
        </Button>
        */}
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/events">Explore More</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
