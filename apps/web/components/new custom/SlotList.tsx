
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, MapPin } from "lucide-react";

const slots = [
    {
        id: 1,
        title: "Morning Yoga Session",
        category: "Wellness",
        image: "/assets/movie6.jpg",
        description:
            "Start your day with a refreshing yoga session focused on stretching and breathing.",
        location: "Fitness Court, Mumbai",
        date: "25 May 2029",
        time: "7:00 AM - 9:00 AM",
        filled: 70,
        available: 30,
        price: 15,
    },
    {
        id: 2,
        title: "AI Masterclass Workshop",
        category: "Technology",
        image: "/assets/movie7.jpg",
        description:
            "Hands-on workshop on generative AI, prompt engineering, and model tuning.",
        location: "Tech Hub, Bangalore",
        date: "28 May 2029",
        time: "3:00 PM - 6:00 PM",
        filled: 50,
        available: 10,
        price: 25,
    },
];

export default function SlotList() {
    return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
           
            {slots.map((slot) => (
                <div
                    key={slot.id}
                    className="flex items-center gap-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                    {/* IMAGE */}
                    <div className="relative w-[180px] h-[120px] shrink-0 rounded-xl overflow-hidden">
                        <Image
                            src={slot.image}
                            alt={slot.title}
                            fill
                            className="object-cover rounded-xl"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 space-y-1">
                        <Badge
                            variant="outline"
                            className="rounded-full bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
                        >
                            {slot.category}
                        </Badge>

                        <div className="text-lg font-semibold">{slot.title}</div>
                        <div className="text-gray-500 text-sm line-clamp-2">
                            {slot.description}
                        </div>

                        {/* DETAILS */}
                        <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                {slot.location}
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                {slot.date}
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                {slot.time}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex flex-col items-end w-[215px]">
                        {/* PROGRESS BAR */}
                        <div className="w-full flex items-center gap-3 ">
                            <Progress value={slot.filled} className="h-2 bg-pink-100" />
                            <span className="text-sm font-bold text-gray-700">
                                {slot.filled}%
                            </span>
                        </div>

                        {/* AVAILABILITY + PRICE */}
                        <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-2 w-36 bg-blue-50 px-4 py-2 rounded-xl text-blue-700 border border-blue-200">
                                <div className="flex justify-center items-center gap-2 ">
                                    <span className="text-lg font-semibold">987</span>
                                    <span className="text-sm font-semibold">Tickets Left</span>
                                </div>
                            </div>

                            <div className="bg-pink-50 text-pink-600 px-4 py-2 rounded-xl border border-pink-200 text-lg font-bold">
                                ₹{slot.price}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


// "use client";

// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Calendar, Clock, MapPin } from "lucide-react";

// export interface Slot {
//   id: number;
//   title: string;
//   category: string;
//   image: string;
//   description: string;
//   location: string;
//   date: string;
//   time: string;
//   filled: number;
//   available: number;
//   price: number;
// }

// export default function SlotList({ slots }: { slots: Slot[] }) {
//   if (!slots || slots.length === 0) {
//     return (
//       <div className="p-10 text-center text-gray-500">
//         No slots available for this event.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
//       {slots.map((slot) => (
//         <div
//           key={slot.id}
//           className="flex items-center gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
//         >
//           {/* LEFT IMAGE */}
//           <div className="relative w-[180px] h-[120px] shrink-0 rounded-xl overflow-hidden">
//             <Image
//               src={slot.image}
//               alt={slot.title}
//               fill
//               className="object-cover rounded-xl"
//             />
//           </div>

//           {/* MIDDLE CONTENT */}
//           <div className="flex-1 space-y-1">
//             <Badge
//               variant="outline"
//               className="rounded-full bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
//             >
//               {slot.category}
//             </Badge>

//             <div className="text-lg font-semibold">{slot.title}</div>

//             <div className="text-gray-500 text-sm line-clamp-2">
//               {slot.description}
//             </div>

//             <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
//               <div className="flex items-center gap-2">
//                 <MapPin size={16} />
//                 {slot.location}
//               </div>

//               <div className="flex items-center gap-2">
//                 <Calendar size={16} />
//                 {slot.date}
//               </div>

//               <div className="flex items-center gap-2">
//                 <Clock size={16} />
//                 {slot.time}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex flex-col items-end w-[200px]">
//             {/* Progress */}
//             <div className="w-full flex items-center gap-3">
//               <Progress value={slot.filled} className="h-2 bg-blue-100" />
//               <span className="text-sm font-bold text-gray-700">
//                 {slot.filled}%
//               </span>
//             </div>

//             {/* Availability + Price */}
//             <div className="flex items-center gap-3 mt-3">
//               <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-blue-700 border border-blue-200">
//                 <span className="text-lg font-semibold">
//                   {slot.available}
//                 </span>
//               </div>

//               <div className="bg-pink-50 text-pink-600 px-4 py-2 rounded-xl border border-pink-200 text-lg font-bold">
//                 ₹{slot.price}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

