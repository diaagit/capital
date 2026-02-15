import EventSlotsPage from "@/components/new custom/OrganizerSlotPage";

const page = async({params}: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId

  return (
    <div>
        <EventSlotsPage eventId={eventId} />
    </div>
  )
}

export default page