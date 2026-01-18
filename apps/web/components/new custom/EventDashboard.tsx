import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Client-side chart components
import DonutChart from "./DonutChart";
import RevenueBarChart from "./RevenueBarChart";

// SAMPLE DATA
const KPIS = [
  { title: "Upcoming Events", value: 345 },
  { title: "Total Bookings", value: 1798 },
  { title: "Tickets Sold", value: 1250 },
];

const eventsSample = [
  {
    id: "e1",
    title: "Rhythm & Beats Music Festival",
    category: "Music",
    date: "Apr 20, 2029",
    time: "12:00 PM - 11:00 PM",
    image: "/assets/movie7.jpg",
    price: "$60",
  },
  {
    id: "e2",
    title: "Champions League Screening Night",
    category: "Sport",
    date: "Apr 20, 2029",
    time: "07:00 PM - 10:00 PM",
    image: "/assets/movie7.jpg",
    price: "$30",
  },
  {
    id: "e3",
    title: "Culinary Delights Festival",
    category: "Food & Culinary",
    date: "Mar 3, 2029",
    time: "11:00 AM - 08:00 PM",
    image: "/assets/movie7.jpg",
    price: "$40",
  },
];

export default function DashboardPage() {
  const events = eventsSample;

  return (
    <div className=" bg-slate-50 min-h-screen">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {KPIS.map((kpi) => (
          <Card key={kpi.title} className="p-4 shadow-sm border rounded-xl">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{kpi.title}</p>
                <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
              </div>

              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-violet-400 flex items-center justify-center text-white font-bold">
                {kpi.title[0]}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DONUT CHART */}
            <DonutChart />

            {/* REVENUE BAR CHART */}
            <RevenueBarChart />
          </div>

          {/* Popular Categories + All Events */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* POPULAR */}
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { name: "Music", percent: 40, color: "#fb7185" },
                  { name: "Sports", percent: 35, color: "#a78bfa" },
                  { name: "Fashion", percent: 15, color: "#38bdf8" },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between">
                      <p className="text-sm text-slate-600">{item.name}</p>
                      <p className="font-semibold">{item.percent}%</p>
                    </div>

                    <div className="w-full h-3 bg-slate-200 rounded-full mt-2">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${item.percent}%`,
                          background: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ALL EVENTS */}
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>All Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-xl overflow-hidden border  shadow-sm"
                    >
                      <Image
                        src={ev.image}
                        width={400}
                        height={200}
                        alt={ev.title}
                        className="w-full h-28 object-cover"
                      />

                      <div className="p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-semibold">{ev.title}</h4>
                          <p className="text-pink-500 font-bold">{ev.price}</p>
                        </div>

                        <p className="text-xs text-slate-500 mt-1">{ev.date}</p>
                      </div>
                    </div>
                  ))}
                  
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RECENT BOOKINGS */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="py-2">Invoice ID</th>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Event</th>
                      <th>Qty</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody className="text-slate-700">
                    <tr className="border-t">
                      <td className="py-3">INV10011</td>
                      <td>2029/02/15</td>
                      <td>Jackson Moore</td>
                      <td>Symphony Under the Stars</td>
                      <td>2</td>
                      <td>$100</td>
                      <td><Badge>Confirmed</Badge></td>
                    </tr>

                    <tr className="border-t">
                      <td className="py-3">INV10012</td>
                      <td>2029/02/16</td>
                      <td>Alicia Smithson</td>
                      <td>Runway Revolution 2024</td>
                      <td>1</td>
                      <td>$120</td>
                      <td><Badge variant="secondary">Pending</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* FEATURED EVENT */}
          <Card className="rounded-xl shadow-sm p-0 overflow-hidden">
            <Image
              src="/assets/movie7.jpg"
              width={800}
              height={400}
              alt="Featured Event"
              className="w-full h-50 object-cover rounded-t-xl"
            />

            <CardContent className="py-1 mb-2">
              <div className="flex flex-col justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{events[0].title}</h3>
                  <p className="text-slate-500 text-sm">
                    Sunset Park, Los Angeles, CA
                  </p>
                </div>

                <div className="text-right flex justify-between items-center w-full mt-4">
                  <p className="text-xs text-slate-500">Apr 20, 2029</p>
                  <Button size="sm" className="mt-2">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CALENDAR */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader><CardTitle>March 2029</CardTitle></CardHeader>

            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-2 bg-white rounded shadow-sm"
                  >
                    {i + 1 <= 31 ? i + 1 : ""}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* RECENT ACTIVITY */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm">
                    <strong>Admin Stefanus Weber</strong> reviewed a refund 
                    request for Invoice <span>INV1004</span>
                  </p>
                  <p className="text-xs text-slate-500">05:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1545996124-1bde1b09b0b2" />
                  <AvatarFallback>WM</AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm">
                    <strong>Wella McGrath</strong> updated ticket 
                    prices for "Runway Revolution 2024"
                  </p>
                  <p className="text-xs text-slate-500">02:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}




// "use client";

// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// // 📊 Recharts
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";

// // KPI SAMPLE
// const KPIS = [
//   { title: "Upcoming Events", value: 345 },
//   { title: "Total Bookings", value: 1798 },
//   { title: "Tickets Sold", value: 1250 },
// ];

// // EVENTS LIST
// const eventsSample = [
//   {
//     id: "e1",
//     title: "Rhythm & Beats Music Festival",
//     category: "Music",
//     date: "Apr 20, 2029",
//     time: "12:00 PM - 11:00 PM",
//     image:
//       "https://images.unsplash.com/photo-1506152983158-1f4a3c02b0d4?auto=format&fit=crop&w=1200&q=60",
//     price: "$60",
//   },
//   {
//     id: "e2",
//     title: "Champions League Screening Night",
//     category: "Sport",
//     date: "Apr 20, 2029",
//     time: "07:00 PM - 10:00 PM",
//     image:
//       "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=60",
//     price: "$30",
//   },
//   {
//     id: "e3",
//     title: "Culinary Delights Festival",
//     category: "Food & Culinary",
//     date: "Mar 3, 2029",
//     time: "11:00 AM - 08:00 PM",
//     image:
//       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60",
//     price: "$40",
//   },
// ];

// // DONUT CHART DATA
// const ticketData = [
//   { name: "Sold Out", value: 1251 },
//   { name: "Fully Booked", value: 834 },
//   { name: "Available", value: 695 },
// ];
// const COLORS = ["#f472b6", "#a78bfa", "#38bdf8"];

// // MONTHLY REVENUE DATA
// const revenueData = [
//   { month: "Jan", revenue: 40000 },
//   { month: "Feb", revenue: 55000 },
//   { month: "Mar", revenue: 62000 },
//   { month: "Apr", revenue: 48000 },
//   { month: "May", revenue: 70000 },
// ];

// export default function EventDashboard() {
//   const events = eventsSample;

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       {/* KPI CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {KPIS.map((kpi) => (
//           <Card
//             key={kpi.title}
//             className="p-4 shadow-sm border border-slate-200 rounded-xl"
//           >
//             <CardContent className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-500">{kpi.title}</p>
//                 <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
//               </div>
//               <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-violet-400 flex items-center justify-center text-white font-bold">
//                 {kpi.title[0]}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT COLUMN */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* DONUT CHART */}
//             <Card className="rounded-xl shadow-sm">
//               <CardHeader>
//                 <CardTitle>Ticket Sales Overview</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative h-52">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={ticketData}
//                         dataKey="value"
//                         nameKey="name"
//                         innerRadius={60}
//                         outerRadius={80}
//                         paddingAngle={4}
//                       >
//                         {ticketData.map((_, i) => (
//                           <Cell key={i} fill={COLORS[i]} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>

//                   {/* Center Label */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-center">
//                       <p className="text-xs text-slate-500">Total Tickets</p>
//                       <p className="text-xl font-bold">2,780</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-around mt-4 text-sm">
//                   {ticketData.map((item, i) => (
//                     <div key={i} className="flex flex-col items-center">
//                       <div
//                         className="w-3 h-3 rounded-full mb-1"
//                         style={{ background: COLORS[i] }}
//                       />
//                       <p className="font-semibold">{item.name}</p>
//                       <p className="text-slate-500">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* BAR GRAPH */}
//             <Card className="rounded-xl shadow-sm">
//               <CardHeader>
//                 <CardTitle>Revenue (Monthly)</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-52">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={revenueData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar
//                         dataKey="revenue"
//                         fill="url(#colorRevenue)"
//                         radius={[6, 6, 0, 0]}
//                       />
//                       <defs>
//                         <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="0%" stopColor="#a78bfa" />
//                           <stop offset="100%" stopColor="#f472b6" />
//                         </linearGradient>
//                       </defs>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div className="mt-4">
//                   <p className="text-sm text-slate-500">Total Revenue</p>
//                   <h3 className="text-xl font-bold">$348,805</h3>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Popular Events + All Events */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* POPULAR */}
//             <Card className="rounded-xl shadow-sm">
//               <CardHeader>
//                 <CardTitle>Popular Categories</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-5">
//                 {[
//                   { name: "Music", percent: 40, color: "#fb7185" },
//                   { name: "Sports", percent: 35, color: "#a78bfa" },
//                   { name: "Fashion", percent: 15, color: "#38bdf8" },
//                 ].map((item) => (
//                   <div key={item.name}>
//                     <div className="flex justify-between">
//                       <p className="text-sm text-slate-600">{item.name}</p>
//                       <p className="font-semibold">{item.percent}%</p>
//                     </div>
//                     <div className="w-full h-3 bg-slate-200 rounded-full mt-2">
//                       <div
//                         className="h-3 rounded-full"
//                         style={{
//                           width: `${item.percent}%`,
//                           background: item.color,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* ALL EVENTS GRID */}
//             <Card className="rounded-xl shadow-sm">
//               <CardHeader>
//                 <CardTitle>All Events</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {events.map((ev) => (
//                     <div
//                       key={ev.id}
//                       className="rounded-xl overflow-hidden border bg-white shadow-sm"
//                     >
//                       <img
//                         src={ev.image}
//                         className="w-full h-28 object-cover"
//                       />
//                       <div className="p-3">
//                         <div className="flex justify-between">
//                           <h4 className="text-sm font-semibold">{ev.title}</h4>
//                           <p className="text-pink-500 font-bold">{ev.price}</p>
//                         </div>
//                         <p className="text-xs text-slate-500 mt-1">{ev.date}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Recent Bookings */}
//           <Card className="rounded-xl shadow-sm">
//             <CardHeader>
//               <CardTitle>Recent Bookings</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="text-slate-500">
//                     <tr>
//                       <th className="py-2">Invoice ID</th>
//                       <th>Date</th>
//                       <th>Name</th>
//                       <th>Event</th>
//                       <th>Qty</th>
//                       <th>Amount</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-slate-700">
//                     <tr className="border-t">
//                       <td className="py-3">INV10011</td>
//                       <td>2029/02/15</td>
//                       <td>Jackson Moore</td>
//                       <td>Symphony Under the Stars</td>
//                       <td>2</td>
//                       <td>$100</td>
//                       <td>
//                         <Badge>Confirmed</Badge>
//                       </td>
//                     </tr>
//                     <tr className="border-t">
//                       <td className="py-3">INV10012</td>
//                       <td>2029/02/16</td>
//                       <td>Alicia Smithson</td>
//                       <td>Runway Revolution 2024</td>
//                       <td>1</td>
//                       <td>$120</td>
//                       <td>
//                         <Badge variant="secondary">Pending</Badge>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="space-y-6">
//           {/* FEATURED EVENT */}
//           <Card className="rounded-xl shadow-sm">
//             <img
//               src= "/assets/movie7.jpg"
//               className="w-full h-40 object-cover rounded-t-xl"
//             />
//             <CardContent>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-bold">{events[0].title}</h3>
//                   <p className="text-slate-500 text-sm">
//                     Sunset Park, Los Angeles, CA
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-slate-500">Apr 20, 2029</p>
//                   <Button size="sm" className="mt-2">
//                     View Details
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* CALENDAR */}
//           <Card className="rounded-xl shadow-sm">
//             <CardHeader>
//               <CardTitle>March 2029</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
//                 {Array.from({ length: 35 }).map((_, i) => (
//                   <div key={i} className="p-2 bg-white rounded shadow-sm">
//                     {i + 1 <= 31 ? i + 1 : ""}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* RECENT ACTIVITY */}
//           <Card className="rounded-xl shadow-sm">
//             <CardHeader>
//               <CardTitle>Recent Activity</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5">
//               {/* Activity 1 */}
//               <div className="flex items-start gap-3">
//                 <Avatar>
//                   <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60" />
//                   <AvatarFallback>AS</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="text-sm">
//                     <strong>Admin Stefanus Weber</strong> reviewed a refund
//                     request for Invoice ID: <span>INV1004</span>
//                   </p>
//                   <p className="text-xs text-slate-500">05:30 PM</p>
//                 </div>
//               </div>

//               {/* Activity 2 */}
//               <div className="flex items-start gap-3">
//                 <Avatar>
//                   <AvatarImage src="https://images.unsplash.com/photo-1545996124-1bde1b09b0b2?auto=format&fit=crop&w=256&q=60" />
//                   <AvatarFallback>WM</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="text-sm">
//                     <strong>Wella McGrath</strong> updated ticket prices for
//                     the event: "Runway Revolution 2024"
//                   </p>
//                   <p className="text-xs text-slate-500">02:00 PM</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }























// "use client";
// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

// // 📊 Recharts imports
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";

// // KPI Sample
// const KPIS = [
//   { title: "Upcoming Events", value: 345 },
//   { title: "Total Bookings", value: 1798 },
//   { title: "Tickets Sold", value: 1250 },
// ];

// // Events Sample
// const eventsSample = [
//   {
//     id: "e1",
//     title: "Rhythm & Beats Music Festival",
//     category: "Music",
//     date: "Apr 20, 2029",
//     time: "12:00 PM - 11:00 PM",
//     image:
//       "https://images.unsplash.com/photo-1506152983158-1f4a3c02b0d4?auto=format&fit=crop&w=1200&q=60",
//     price: "$60",
//   },
//   {
//     id: "e2",
//     title: "Champions League Screening Night",
//     category: "Sport",
//     date: "Apr 20, 2029",
//     time: "07:00 PM - 10:00 PM",
//     image:
//       "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=60",
//     price: "$30",
//   },
//   {
//     id: "e3",
//     title: "Culinary Delights Festival",
//     category: "Food & Culinary",
//     date: "Mar 3, 2029",
//     time: "11:00 AM - 08:00 PM",
//     image:
//       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60",
//     price: "$40",
//   },
// ];

// // 📊 Donut Chart Data
// const ticketData = [
//   { name: "Sold Out", value: 1251 },
//   { name: "Fully Booked", value: 834 },
//   { name: "Available", value: 695 },
// ];

// const COLORS = ["#fb7185", "#a78bfa", "#38bdf8"];

// // 📈 Revenue Chart Data
// const revenueData = [
//   { month: "Jan", revenue: 40000 },
//   { month: "Feb", revenue: 55000 },
//   { month: "Mar", revenue: 62000 },
//   { month: "Apr", revenue: 48000 },
//   { month: "May", revenue: 70000 },
// ];

// export default function EventDashboard() {
//   const events = eventsSample || [];

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       {/* KPI ROW */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {KPIS.map((kpi) => (
//           <Card key={kpi.title} className="p-4">
//             <CardContent className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-500">{kpi.title}</p>
//                 <h3 className="text-2xl font-semibold mt-1">{kpi.value}</h3>
//               </div>
//               <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-violet-400 flex items-center justify-center text-white font-bold">
//                 {kpi.title[0]}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT SIDE (Charts + Lists) */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* DONUT CHART */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Ticket Sales</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-52">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={ticketData}
//                         dataKey="value"
//                         nameKey="name"
//                         innerRadius={50}
//                         outerRadius={70}
//                         paddingAngle={5}
//                       >
//                         {ticketData.map((_, i) => (
//                           <Cell key={i} fill={COLORS[i]} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>

//                 <div className="flex justify-around mt-4 text-sm">
//                   {ticketData.map((item, i) => (
//                     <div key={i} className="flex flex-col items-center">
//                       <div
//                         className="w-3 h-3 rounded-full mb-1"
//                         style={{ background: COLORS[i] }}
//                       />
//                       <p className="font-semibold">{item.name}</p>
//                       <p className="text-slate-500">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* BAR CHART */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Sales Revenue</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-52">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={revenueData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 <div className="mt-4">
//                   <p className="text-sm text-slate-500">Total Revenue</p>
//                   <h3 className="text-xl font-semibold">$348,805</h3>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* POPULAR EVENTS + ALL EVENTS */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* POPULAR EVENTS */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Popular Events</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {[
//                     { name: "Music", percent: 40, color: "#fb7185" },
//                     { name: "Sports", percent: 35, color: "#a78bfa" },
//                     { name: "Fashion", percent: 15, color: "#38bdf8" },
//                   ].map((item) => (
//                     <div
//                       key={item.name}
//                       className="flex items-center justify-between"
//                     >
//                       <div>
//                         <p className="text-sm text-slate-500">{item.name}</p>
//                         <div className="w-48 h-3 bg-slate-100 rounded-full mt-2">
//                           <div
//                             className="h-3 rounded-full"
//                             style={{
//                               width: `${item.percent}%`,
//                               background: item.color,
//                             }}
//                           />
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-semibold">{item.percent}%</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* ALL EVENTS */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>All Events</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {events.map((ev) => (
//                     <div
//                       key={ev.id}
//                       className="rounded-lg overflow-hidden border bg-white"
//                     >
//                       <img
//                         src={ev.image}
//                         className="w-full h-28 object-cover"
//                       />
//                       <div className="p-3">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h4 className="text-sm font-semibold">{ev.title}</h4>
//                             <p className="text-xs text-slate-500">{ev.date}</p>
//                           </div>
//                           <p className="text-pink-500 font-bold">{ev.price}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* RECENT BOOKINGS TABLE */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Bookings</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="text-slate-500">
//                     <tr>
//                       <th className="py-2">Invoice ID</th>
//                       <th>Date</th>
//                       <th>Name</th>
//                       <th>Event</th>
//                       <th>Qty</th>
//                       <th>Amount</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-slate-700">
//                     <tr className="border-t">
//                       <td className="py-3">INV10011</td>
//                       <td>2029/02/15</td>
//                       <td>Jackson Moore</td>
//                       <td>Symphony Under the Stars</td>
//                       <td>2</td>
//                       <td>$100</td>
//                       <td>
//                         <Badge>Confirmed</Badge>
//                       </td>
//                     </tr>
//                     <tr className="border-t">
//                       <td className="py-3">INV10012</td>
//                       <td>2029/02/16</td>
//                       <td>Alicia Smithson</td>
//                       <td>Runway Revolution 2024</td>
//                       <td>1</td>
//                       <td>$120</td>
//                       <td>
//                         <Badge variant="secondary">Pending</Badge>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="space-y-6">
//           <Card>
//             <img
//               src={events[0].image}
//               className="w-full h-40 object-cover rounded-t-lg"
//             />
//             <CardContent>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-bold">{events[0].title}</h3>
//                   <p className="text-slate-500 text-sm">
//                     Sunset Park, Los Angeles, CA
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-slate-500">Apr 20, 2029</p>
//                   <Button size="sm" className="mt-2">
//                     View Details
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Calendar */}
//           <Card>
//             <CardHeader>
//               <CardTitle>March 2029</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
//                 {Array.from({ length: 35 }).map((_, i) => (
//                   <div key={i} className="p-2 bg-white rounded">
//                     {i + 1 <= 31 ? i + 1 : ""}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recent Activity */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Activity</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <Avatar>
//                     <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60" />
//                     <AvatarFallback>AS</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm">
//                       <strong>Admin Stefanus Weber</strong> reviewed a refund
//                       request for Invoice ID: <span>INV1004</span>
//                     </p>
//                     <p className="text-xs text-slate-500">05:30 PM</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <Avatar>
//                     <AvatarImage src="https://images.unsplash.com/photo-1545996124-1bde1b09b0b2?auto=format&fit=crop&w=256&q=60" />
//                     <AvatarFallback>WM</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm">
//                       <strong>Wella McGrath</strong> updated ticket prices for
//                       the event: "Runway Revolution 2024"
//                     </p>
//                     <p className="text-xs text-slate-500">02:00 PM</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }






// Without the graphs/charts code:
// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

// // Sample data — replace with your props or fetch from API
// const KPIS = [
//   { title: "Upcoming Events", value: 345 },
//   { title: "Total Bookings", value: 1798 },
//   { title: "Tickets Sold", value: 1250 },
// ];

// const eventsSample = [
//   {
//     id: "e1",
//     title: "Rhythm & Beats Music Festival",
//     category: "Music",
//     date: "Apr 20, 2029",
//     time: "12:00 PM - 11:00 PM",
//     image: "https://images.unsplash.com/photo-1506152983158-1f4a3c02b0d4?auto=format&fit=crop&w=1200&q=60",
//     price: "$60",
//   },
//   {
//     id: "e2",
//     title: "Champions League Screening Night",
//     category: "Sport",
//     date: "Apr 20, 2029",
//     time: "07:00 PM - 10:00 PM",
//     image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=60",
//     price: "$30",
//   },
//   {
//     id: "e3",
//     title: "Culinary Delights Festival",
//     category: "Food & Culinary",
//     date: "Mar 3, 2029",
//     time: "11:00 AM - 08:00 PM",
//     image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60",
//     price: "$40",
//   },
// ];

// export default function EventDashboard() {
//   // defensive access in case events array is undefined
//   const events = eventsSample || [];

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       {/* Top KPI row */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {KPIS.map((kpi) => (
//           <Card key={kpi.title} className="p-4">
//             <CardContent className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-500">{kpi.title}</p>
//                 <h3 className="text-2xl font-semibold mt-1">{kpi.value}</h3>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-violet-400 flex items-center justify-center text-white font-bold">
//                   {/* Icon placeholder */}
//                   <span className="text-sm">{kpi.title[0]}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left column: Charts & lists (span 2 on large) */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Ticket Sales donut + small stats */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Ticket Sales</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col md:flex-row items-center gap-6">
//                   <div className="w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-inner">
//                     {/* simple donut mockup */}
//                     <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="text-2xl font-bold">2,780</div>
//                         <div className="text-xs text-slate-500">Total Ticket</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-1">
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-sm text-slate-500">Sold Out</p>
//                           <p className="font-semibold">1,251</p>
//                         </div>
//                         <Badge>45%</Badge>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-sm text-slate-500">Fully Booked</p>
//                           <p className="font-semibold">834</p>
//                         </div>
//                         <Badge variant="secondary">30%</Badge>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-sm text-slate-500">Available</p>
//                           <p className="font-semibold">695</p>
//                         </div>
//                         <Badge variant="outline">25%</Badge>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Revenue chart mock */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Sales Revenue</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-48 flex items-center justify-center text-slate-400">Bar chart placeholder</div>
//                 <div className="mt-4">
//                   <p className="text-sm text-slate-500">Total Revenue</p>
//                   <h3 className="text-xl font-semibold">$348,805</h3>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Popular Events + All Events cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Popular Events</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-slate-500">Music</p>
//                       <div className="w-48 bg-slate-100 rounded-full h-3 overflow-hidden mt-2">
//                         <div className="h-3 rounded-full" style={{ width: "40%", background: "linear-gradient(90deg,#a78bfa,#fb7185)" }} />
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold">40%</p>
//                       <p className="text-xs text-slate-500">20,000 Events</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-slate-500">Sports</p>
//                       <div className="w-48 bg-slate-100 rounded-full h-3 overflow-hidden mt-2">
//                         <div className="h-3 rounded-full" style={{ width: "35%", background: "linear-gradient(90deg,#fb7185,#f0abfc)" }} />
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold">35%</p>
//                       <p className="text-xs text-slate-500">17,500 Events</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-slate-500">Fashion</p>
//                       <div className="w-48 bg-slate-100 rounded-full h-3 overflow-hidden mt-2">
//                         <div className="h-3 rounded-full" style={{ width: "15%", background: "linear-gradient(90deg,#0ea5e9,#6366f1)" }} />
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold">15%</p>
//                       <p className="text-xs text-slate-500">12,500 Events</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>All Events</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {events?.map((ev) => (
//                     <div key={ev.id} className="rounded-lg overflow-hidden border bg-white shadow-sm">
//                       <div className="h-28 bg-slate-200">
//                         <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
//                       </div>
//                       <div className="p-3">
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h4 className="text-sm font-semibold">{ev.title}</h4>
//                             <p className="text-xs text-slate-500">{ev.date}</p>
//                           </div>
//                           <div className="text-pink-500 font-bold">{ev.price}</div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Recent Bookings table mock */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Bookings</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="text-slate-500 text-left">
//                     <tr>
//                       <th className="py-2">Invoice ID</th>
//                       <th className="py-2">Date</th>
//                       <th className="py-2">Name</th>
//                       <th className="py-2">Event</th>
//                       <th className="py-2">Qty</th>
//                       <th className="py-2">Amount</th>
//                       <th className="py-2">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-slate-700">
//                     <tr className="border-t">
//                       <td className="py-3">INV10011</td>
//                       <td>2029/02/15</td>
//                       <td>Jackson Moore</td>
//                       <td>Symphony Under the Stars</td>
//                       <td>2</td>
//                       <td>$100</td>
//                       <td><Badge>Confirmed</Badge></td>
//                     </tr>
//                     <tr className="border-t">
//                       <td className="py-3">INV10012</td>
//                       <td>2029/02/16</td>
//                       <td>Alicia Smithson</td>
//                       <td>Runway Revolution 2024</td>
//                       <td>1</td>
//                       <td>$120</td>
//                       <td><Badge variant="secondary">Pending</Badge></td>
//                     </tr>
//                     <tr className="border-t">
//                       <td className="py-3">INV10013</td>
//                       <td>2029/02/17</td>
//                       <td>Marcus Rawless</td>
//                       <td>Global Wellness Summit</td>
//                       <td>3</td>
//                       <td>$240</td>
//                       <td><Badge>Confirmed</Badge></td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right column: Upcoming event card, calendar, activity */}
//         <div className="space-y-6">
//           <Card>
//             <div className="overflow-hidden rounded-t-lg">
//               <img src={events[0]?.image} alt="upcoming" className="w-full h-40 object-cover" />
//             </div>
//             <CardContent>
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="text-lg font-bold">{events[0]?.title}</h3>
//                   <p className="text-sm text-slate-500">Sunset Park, Los Angeles, CA</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-slate-500">Apr 20, 2029</p>
//                   <Button size="sm" className="mt-2">View Details</Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>March 2029</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
//                 {Array.from({ length: 35 }).map((_, i) => (
//                   <div key={i} className="p-2 bg-white rounded">{(i + 1) <= 31 ? i + 1 : ""}</div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Activity</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <Avatar>
//                     <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=60" />
//                     <AvatarFallback>AS</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm"><span className="font-semibold">Admin Stefanus Weber</span> reviewed a refund request for Invoice ID: <span className="font-mono">INV1004</span></p>
//                     <p className="text-xs text-slate-500">05:30 PM</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <Avatar>
//                     <AvatarImage src="https://images.unsplash.com/photo-1545996124-1bde1b09b0b2?auto=format&fit=crop&w=256&q=60" />
//                     <AvatarFallback>WM</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm"><span className="font-semibold">Wella McGrath</span> updated ticket prices for the event: "Runway Revolution 2024"</p>
//                     <p className="text-xs text-slate-500">02:00 PM</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
