import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { MapPin } from 'lucide-react';

import { Separator } from "@/components/ui/separator"
import EventScheduleCard from "./EventScheduleCard";
import { Button } from "@/components/ui/button";

const EventSchedule = () => {
    return (
        <div className="w-3/4 bg-white py-10">
            <div className="flex justify-between  text-black">
                <div className="text-2xl font-semibold">All days and times</div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    <Select>
                        <SelectTrigger className="w-[250px] border-none text-md">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>

                        <SelectContent className="bg-[#1f1f1f] border-none shadow-[0_4px_20px_rgba(0,0,0,0.7)] ring-0 rounded-md">
                            <SelectItem value="pune" className="text-white hover:bg-zinc-800">
                                Pune, Maharashtra, India
                            </SelectItem>
                            <SelectItem value="mumbai" className="text-white hover:bg-zinc-800">
                                Mumbai, Maharashtra, India
                            </SelectItem>
                            <SelectItem value="delhi" className="text-white hover:bg-zinc-800">
                                Delhi, India
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Separator className="bg-gray-700/50 mt-4" />

            {/* Event Cards */}
            <div className="flex flex-col gap-4 mt-4">
                <EventScheduleCard />
                <EventScheduleCard />
                <EventScheduleCard />
                <EventScheduleCard />
            </div>

            {/* Music Festival Banner */}
            <div style={{
                backgroundImage: "url('/assets/musicbg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '25vh',
            }}
                className="rounded-2xl my-4 mt-20 flex flex-col items-center justify-center gap-4"
            >
                <div className="text-zinc-400">In Las Vegas</div>
                <div className="text-white font-bold text-5xl">MUSIC FESTIVAL</div>
                <div className="text-zinc-400">MEHDI LORESTANI WITH DJ HAMED</div>
            </div>


            {/* Concerts Near You */}
            {/* <div className="flex justify-between  text-white mt-20">
                <div className="text-2xl font-semibold">Concerts Near You</div>
                <div><Button variant="link" className="text-white hover:cursor-pointer">See All</Button></div>
            </div>
            <Separator className="bg-gray-700/50 mt-4" />
            {/* CONCERT CARDS WILL GO HERE */}
            {/* <div className="text-white mt-4">
                CONCERT CARD WILL GO HERE
            </div>  */}
        </div>
    )
}

export default EventSchedule