import Image from "next/image"
import { Search, Menu, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const LNavbar = () => {
  return (
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
          <div className=" relative w-full max-w-xl rounded-2xl ">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <Input className="pl-10 w-full" placeholder="Search for Events, Concerts and Movies" type="text" />
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-center items-center">
        <div className="">
          <div className="flex items-center gap-2">
            {/* <MapPin className="w-6 h-6" /> */}
            <Select>
              <SelectTrigger className=" border-none text-md">
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
  )
}

export default LNavbar


// import { Search, Menu, MapPin } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"


// const LNavbar = () => {
//   return (
//     <div className="relative flex items-center left-0 top-0">
//       <img
//         src="/assets/Eventique.png"
//         alt="Eventique"
//         className="w-[150px] h-[70px] p-4 ml-43 mt-0"
//       />

//       <div className=" relative w-full max-w-xl rounded-2xl ">
//         <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
//         <Input className="pl-10 " placeholder="Search for Events, Concerts and Movies" type="text" />
//       </div>


// <div className=" justify-end flex items-center absolute right-0 mr-50">
//   <div className="flex items-center gap-2">
//     {/* <MapPin className="w-6 h-6" /> */}
//     <Select>
//       <SelectTrigger className=" border-none text-md">
//         <SelectValue placeholder="Location" />
//       </SelectTrigger>
//       <SelectContent className="bg-[#1f1f1f] border-none shadow-[0_4px_20px_rgba(0,0,0,0.7)] ring-0 rounded-md">
//         <SelectItem value="pune" className="text-white hover:bg-zinc-800">
//           Pune
//         </SelectItem>
//         <SelectItem value="mumbai" className="text-white hover:bg-zinc-800">
//           Mumbai
//         </SelectItem>
//         <SelectItem value="delhi" className="text-white hover:bg-zinc-800">
//           Delhi
//         </SelectItem>
//       </SelectContent>
//     </Select>
//   </div>
// <Button className="bg-[#C14FE6] hover:cursor-pointer ml-4  text-white">
//   Sign in
// </Button>
//         <div className="ml-4 justify-center items-center">
//           <Sheet>
//             <SheetTrigger><Menu className="w-[30px] h-[30px]" /></SheetTrigger>
//             <SheetContent>
//               <SheetHeader>
//                 <SheetTitle className="text-2xl font-bold mb-4">Hey!</SheetTitle>
//                 <SheetDescription className="flex flex-col gap-4">
//                   <a href="/newlanding" className="hover:bg-black hover:text-white p-2 rounded">Home</a>
//                   <a href="/events" className="hover:bg-black hover:text-white p-2 rounded">Events</a>
//                   <a href="/concerts" className="hover:bg-black hover:text-white p-2 rounded">Concerts</a>
//                   <a href="/movies" className="hover:bg-black hover:text-white p-2 rounded">Movies</a>
//                   <a href="/about" className="hover:bg-black hover:text-white p-2 rounded">About Us</a>
//                   <a href="/contact" className="hover:bg-black hover:text-white p-2 rounded">Contact Us</a>
//                 </SheetDescription>
//               </SheetHeader>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//       {/* <div className="  absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-b-lg">

//             </div> */}
//     </div>


//   );
// };

// export default LNavbar;