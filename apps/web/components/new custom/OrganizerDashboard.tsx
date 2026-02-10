import OrganizerHeader from "@/components/new custom/OrganizerHeader";
import OrganizerEventCard from "@/components/new custom/OrganizerEventCard";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";


type Status = "Live" | "Upcoming" | "Completed";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: Status;
  ticketsSold: number;
  ticketPrice: number;
  totalTickets: number;
};


const events: Event[] = [
  {
    id: 1,
    title: "Kung Fu Panda 4: The Dragon Knight",
    date: "June 5, 2026",
    time: "3:00 PM",
    location: "Rocky Ridge Exhibition Hall, Denver, CO",
    image: "/assets/movie7.jpg",
    status: "Upcoming",
    ticketsSold: 75,
    ticketPrice: 250,
    totalTickets: 130,
  },
  {
    id: 2,
    title: "Men in Black: International Premiere",
    date: "July 10, 2026",
    time: "5:30 PM",
    location: "Grand Cinema Center, Boston, MA",
    image: "/assets/movie8.jpg",
    status: "Live",
    ticketsSold: 90,
    ticketPrice: 300,
    totalTickets: 150,
  },
  {
    id: 3,
    title: "Interstellar IMAX Show",
    date: "August 12, 2026",
    time: "7:00 PM",
    location: "Galaxy Theatre, San Francisco, CA",
    image: "/assets/movie9.jpg",
    status: "Completed",
    ticketsSold: 100,
    ticketPrice: 500,
    totalTickets: 100,
  },
  {
    id: 4,
    title: "Jurassic World: Fallen Kingdom",
    date: "September 1, 2026",
    time: "6:00 PM",
    location: "Prime Multiplex, Chicago, IL",
    image: "/assets/movie6.jpg",
    status: "Upcoming",
    ticketsSold: 21,
    ticketPrice: 180,
    totalTickets: 130,
  },
  {
    id: 5,
    title: "The Matrix Resurrections",
    date: "October 15, 2026",
    time: "8:00 PM",
    location: "Neo Cinema, Los Angeles, CA",
    image: "/assets/movie7.jpg",
    status: "Completed",
    ticketsSold: 21,
    ticketPrice: 380,
    totalTickets: 100,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <OrganizerHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4">
        <Card className="bg-fuchsia-50">
          <CardContent className="p-5">
            <CardTitle>Total Events</CardTitle>
            <CardDescription className="text-2xl font-bold text-black">
              {events.length}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="p-5">
            <CardTitle>Live Events</CardTitle>
            <CardDescription className="text-2xl font-bold text-black">
              {events.filter((e) => e.status === "Live").length}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-orange-50">
          <CardContent className="p-5">
            <CardTitle>Tickets Sold</CardTitle>
            <CardDescription className="text-2xl font-bold text-black">
              {events.reduce((sum, e) => sum + e.ticketsSold, 0)}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardContent className="p-5">
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription className="text-2xl font-bold text-black">
              ₹
              {events.reduce(
                (sum, e) => sum + e.ticketPrice * e.ticketsSold,
                0
              )}
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 mt-10">All Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
          {events.map((event) => (
            <OrganizerEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}



//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-semibold mb-6 mt-10">All Events</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
//           {events.map((event) => (
//             <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="relative">
//                 <Image
//                   src={event.image} 
//                   alt={event.title}
//                   width={300}
//                   height={250}
//                   className="w-full h-60 object-cover"
//                 />
//                 <div className="absolute top-2 right-2">
//                   {getStatusBadge(event.status)}
//                 </div>
//               </div>
//               <div className="p-4">
//                 <div className="flex justify-center items-start mb-2">
//                   <h2 className="text-xl font-semibold">{event.title}</h2>
//                 </div>
//                 <Separator className="my-4 border-gray-200" />
              
//                 <p className="text-gray-600 mb-3 ">
//                   <MapPin size={20} className="inline-block mr-1" />{event.location}
//                   {/* Venue: {event.location} */}
//                 </p>
//                 <p className="text-gray-600 mb-3">
//                   <CalendarDays size={20} className="inline-block mr-1" />{event.date}
//                   {/* Date: {event.date} */}
//                   </p>
//                 <p className="text-gray-600 mb-3">
//                   <Clock size={20} className="inline-block mr-1" />{event.time}
//                   {/* Time: {event.time} */}
//                 </p>
//                 <p className="text-gray-600 mb-3">
//                   <IndianRupee size={20} className="inline-block mr-1" />{event.ticketPrice}
//                 </p>

//                   <div className="mb-3">
//                   <Progress value={(event.ticketsSold / event.totalTickets) * 100} />
//                   <p className="text-sm text-gray-500 mt-1">
//                     {event.ticketsSold} / {event.totalTickets} tickets sold
//                   </p>
//                 </div>
               
//                 <div className="flex  gap-3 mt-4 ">
//                   <Button  size="sm" className="flex-1 mt-4">
//                   {/* <Eye className="mr-2 h-4 w-4" /> */}
//                   View 
//                   </Button>
//                   <Button  size="sm" className="flex-1 mt-4 " >
//                   Manage
//                   </Button>

//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
    

   
      
//   );
// }

