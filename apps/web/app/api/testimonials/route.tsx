// app/api/testimonials/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const testimonials = [
    {
      name: "Jane Cooper",
      text: "Finally a platform where reselling tickets isn’t a scam! Blockchain ensures legitimacy and keeps everything traceable. This is the future",
      image: "/assets/t-1.png",
      rating: 5,
    },
    {
      name: "Leslie Alexander",
      text: "UI is minimal, fast, and modern. Payment was instant and I loved receiving my verified ticket immediately in my wallet.",
      image: "/assets/t-2.png",
      rating: 4,
    },
    {
      name: "Jenny Wilson",
      text: "I didn’t expect blockchain to be this user-friendly. Kudos to the team for merging technology with convenience so beautifully.",
      image: "/assets/t-1.png",
      rating: 5,
    },
    {
      name: "Jane Cooper",
      text: "Payment was instant and I loved receiving my verified ticket immediately in my wallet.",
      image: "/assets/t-1.png",
      rating: 3,
    },
    {
      name: "Leslie Alexander",
      text: "My favorite thing? No more fake tickets or overpriced third-party sellers. Eventique truly empowers event-goers and creators alike.",
      image: "/assets/t-2.png",
      rating: 4,
    },
    {
      name: "Jenny Wilson",
      text: "Loved the smooth checkout and real-time ticket validation. Eventique makes me feel in control of my purchases without depending on middlemen",
      image: "/assets/t-1.png",
      rating: 5,
    },
    {
      name: "Bessie Cooper",
      text: "Booking tickets has never been this seamless. I was amazed at how secure and transparent the whole process felt. The blockchain integration is genius!",
      image: "/assets/t-1.png",
      rating: 4,
    },
  ];

  return NextResponse.json(testimonials, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
    },
  });
}
