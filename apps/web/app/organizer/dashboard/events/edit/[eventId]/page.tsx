import EventForm from "@/components/new custom/event-form";

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const eventId = (await params).eventId

  return <EventForm id={eventId} />;
}