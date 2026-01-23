import Eventpage from "@/components/new ui/EventPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const eventId = (await params).id

  return <Eventpage id={eventId} />;
}