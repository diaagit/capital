import { Button } from '@/components/ui/button';
import { MapPin, Share2, BookmarkMinus, CalendarDays, Clock4 } from 'lucide-react';
import { Badge } from "@/components/ui/badge"

const EventScheduleCard = () => {
    return (
        <div className=' text-black p-4  transform transition duration-200
             hover:-translate-y-1 hover:scale-101 hover:cursor-pointer flex flex-col gap-5 bg-white  rounded-2xl px-10 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]'>
                
            <div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-4'>
                        <MapPin className='text-[#C14FE6]' />
                        <div className='font-semibold'>Fontainebleau Las Vegas - Complex, Las Vegas, Nevada, USA</div>
                    </div>

                    <div className='flex justify-between items-center gap-4'>
                        <Share2 />
                        <BookmarkMinus />
                        <Button
                            variant="outline"
                            className="bg-white text-[#C14FE6] border-2 border-[#C14FE6]
             hover:bg-[#C14FE6] hover:text-white
             transform transition duration-200
             hover:-translate-y-1 hover:scale-105 hover:cursor-pointer">
                            Get Tickets
                        </Button>
                    </div>

                </div>
                <div className="w-full border-t-2 border-dashed border-zinc-600 my-4" />



                <div className='flex justify-between items-center'>
                    <div className='flex flex-col gap-2 items-start px-10'>
                        <div className='flex gap-2 text-zinc-600 justify-center items-center'>
                            <CalendarDays className='w-5 h-5'/>
                            <div className='text-zinc-600'>Mar 06 - 2025</div>
                        </div>
                        <div className='flex gap-2 text-zinc-600 justify-center items-center'>
                            <Clock4 className='w-5 h-5'/>
                            <div>20:00 Pm</div>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-4">
                            <Badge className="bg-[#252018] text-[#C14FE6] ] px-5 py-2 text-sm rounded-2xl ">
                                Popular
                            </Badge>
                            <Badge className="bg-[#252018] text-[#C14FE6] px-5 py-2 text-sm rounded-2xl">
                                Best Selling
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventScheduleCard;