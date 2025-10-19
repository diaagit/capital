import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

const Footer: FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto py-20">
        {/* Logo */}
        <div className="flex flex-col justify-center items-center w-full">
          <img
            src="/assets/Eventique2.png"
            alt="Eventique"
            className="w-[200px]"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center items-center mt-10 space-x-4">
         <Link href="/newlanding" className="text-white px-3 py-1 rounded hover:bg-white/10 transition">
            Home
          </Link>
          <Link href="/contact" className="text-white px-3 py-1 rounded hover:bg-white/10 transition">
            Contact
          </Link>
          <Link href="/about" className="text-white px-3 py-1 rounded hover:bg-white/10 transition">
            About
          </Link>
          <Link href="/privacy-policy" className="text-white px-3 py-1 rounded hover:bg-white/10 transition">
            Privacy Policy
          </Link>

        </div>

        {/* Social Icons */}
        <div className="flex gap-4 p-6 justify-center">
          {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTelegramPlane].map(
            (Icon, index) => (
              <Button
                key={index}
                variant="ghost"
                className="bg-white text-black rounded-full w-12 h-12 p-0 flex items-center justify-center hover:bg-gray-200"
              >
                <Icon className="w-5 h-5" />
              </Button>
            )
          )}
        </div>

        {/* Separator */}
        <Separator className="bg-gray-700/50 mb-4" />

        {/* Footer Text */}
        <div className="text-center text-sm text-gray-400 mt-10">
          <p>
            Copyright © {year}{" "}
            <span className="text-white font-semibold">Eventique</span>. All
            rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1 mt-1">
            Built with <span className="text-red-500">❤️</span> by the Eventique
            team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
