import LNavbar from "@/components/new custom/LNavbar";
import Eventlist from "@/components/new custom/Eventlist";

type Props = {
  searchParams: {
    q?: string;
    location?: string;
  };
};

const EventListingPage = ({ searchParams }: Props) => {
  return (
    <div>
      <LNavbar type="home" />
      <Eventlist searchParams={searchParams} />
    </div>
  );
};

export default EventListingPage;