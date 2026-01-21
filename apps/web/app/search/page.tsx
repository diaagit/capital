import EventListingPage from "@/components/new ui/EventListingPage";

type Props = {
  searchParams: {
    q?: string;
    location?: string;
  };
};

export default function Page({ searchParams }: Props) {
  return <EventListingPage searchParams={searchParams} />;
}