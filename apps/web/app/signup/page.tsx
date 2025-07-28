import { Checkbox } from "@/components/ui/checkbox";
import { Mail, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/S-signinbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex items-center justify-center w-full h-screen"
    >
      <div className="w-full max-w-md bg-black/60 p-8 rounded-lg shadow-xl">

        <div className="flex flex-col justify-center items-center">
          <img
            src="/assets/Eventique3.png"
            alt="Eventique"
            className="w-[200px]"
          />
          <p className="text-zinc-400 text-sm mt-5">
            Please enter your details to sign up
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5">

          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="w-full pl-10 pr-4 py-2 rounded bg-[#1F1F1F] text-zinc-400 border-none placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C14FE6]"
            />
          </div>

          <div className="relative w-full">
            <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              className="w-full pl-10 pr-4 py-2 rounded bg-[#1F1F1F] text-zinc-400 border-none placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C14FE6]"
            />
          </div>

          <div className="relative w-full">
            <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              className="w-full pl-10 pr-4 py-2 rounded bg-[#1F1F1F] text-zinc-400 border-none placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#C14FE6]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="bg-transparent border border-zinc-400 data-[state=checked]:bg-[#C14FE6] data-[state=checked]:border-[#C14FE6]"
            />
            <label
              htmlFor="remember"
              className="text-sm text-white leading-none"
            >
              Remember me
            </label>
          </div>
        </div>

        <div className="mt-10">
          <Button
            className="bg-[#191919] text-[#C14FE6] border-2 border-[#C14FE6] w-full
              hover:bg-[#C14FE6] hover:text-white transition duration-200
              hover:-translate-y-1 hover:scale-105"
          >
            Sign Up
          </Button>

          <p className="mt-4 text-center text-zinc-500 text-sm">
            Have an Eventique account?{" "}
            <Link href="/login">
              <Button variant="link" className="text-[#C14FE6]">
                Login
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
