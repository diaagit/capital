import OrganizerSlotPage from "@/components/new custom/OrganizerSlotPage";
import SlotList from "@/components/new custom/SlotList"
import axios from "axios";

type Props = {
  params: {
    eventId: string;
  };
};

const page = async({params}: { params: Promise<{ eventId: string }> }) => {
  const eventId = (await params).eventId

  return (
    <div>
        <OrganizerSlotPage eventId={eventId} />
    </div>
  )
}

export default page