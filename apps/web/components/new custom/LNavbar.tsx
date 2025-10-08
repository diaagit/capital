import Image from "next/image";
import { Search, Menu, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LNavbar = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center max-w-7xl mx-auto pb-1 pt-5">
        <div className="flex gap-5 justify-start items-center w-1/2">
          <div>
            <Image
              alt="Logo"
              width={150}
              height={70}
              src={"/assets/Eventique.png"}
            />
          </div>

          <div className="w-full">
            <div className="relative w-full max-w-xl rounded-2xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-10 w-full"
                placeholder="Search for Events, Concerts and Movies"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-center items-center">
          <div className="">
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="border-none text-md">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-[#1f1f1f] border-none shadow-[0_4px_20px_rgba(0,0,0,0.7)] ring-0 rounded-md">
                  <SelectItem value="pune" className="text-white hover:bg-zinc-800">
                    Pune
                  </SelectItem>
                  <SelectItem value="mumbai" className="text-white hover:bg-zinc-800">
                    Mumbai
                  </SelectItem>
                  <SelectItem value="delhi" className="text-white hover:bg-zinc-800">
                    Delhi
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="bg-[#C251E6] hover:cursor-pointer text-white hover:bg-[#C251E6]">
            Sign in
          </Button>
        </div>
      </div>

      <div className="bg-gray-100 py-2 text-center shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 ">
          <Link href="/neweventlisting" className="text-gray-700 hover:font-semibold px-3 py-1">
            Events
          </Link>
          <Link href="/neweventlisting" className="text-gray-700 hover:font-semibold px-3 py-1">
            Movies
          </Link>
          <Link href="/neweventlisting" className="text-gray-700 hover:font-semibold px-3 py-1 ">
            Concerts
          </Link>
          
          
        </div>
      </div>
    </div>
  );
};

export default LNavbar;





