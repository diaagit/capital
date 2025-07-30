// app/api/singers/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const singers = [
    { name: "Drake", date: "20 June", city: "Toronto", image: "/assets/image.png" },
    { name: "Taylor Swift", date: "10 July", city: "Nashville", image: "/assets/image-2.png" },
    { name: "Ed Sheeran", date: "25 August", city: "Los Angeles", image: "/assets/image-5.png" },
    { name: "Billie Eilish", date: "30 September", city: "Chicago", image: "/assets/image-3.png" },
    { name: "Adele", date: "5 May", city: "New York", image: "/assets/image-4.png" },
    { name: "Bad Bunny", date: "14 September", city: "Miami", image: "/assets/image-6.png" },
    { name: "The Weeknd", date: "7 July", city: "Las Vegas", image: "/assets/image-3.png" },
    { name: "Katy Perry", date: "2 October", city: "Houston", image: "/assets/image-2.png" },
    { name: "Justin Bieber", date: "15 August", city: "Atlanta", image: "/assets/image-4.png" },
    { name: "Beyoncé", date: "22 June", city: "Philadelphia", image: "/assets/image.png" },
    { name: "Post Malone", date: "18 July", city: "Phoenix", image: "/assets/image-2.png" },
    { name: "Rihanna", date: "12 September", city: "San Diego", image: "/assets/image-6.png" },
    { name: "Sia", date: "28 October", city: "Dallas", image: "/assets/image-6.png" },
    { name: "Shawn Mendes", date: "3 November", city: "San Jose", image: "/assets/image-5.png" },
    { name: "Halsey", date: "9 December", city: "Austin", image: "/assets/image-4.png" },
    { name: "Camila Cabello", date: "21 January", city: "Seattle", image: "/assets/image-2.png" },
  ];

  return NextResponse.json(singers, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
    },
  });
}

