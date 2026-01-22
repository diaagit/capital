import EventListingPage from "@/components/new ui/EventListingPage";
import { Suspense } from "react";

export default function Page({ searchParams }: any) {
  return (
    <Suspense fallback={<div className="mt-10 text-center">Loading events...</div>}>
      <EventListingPage searchParams={searchParams} />;
    </Suspense>
  )
}