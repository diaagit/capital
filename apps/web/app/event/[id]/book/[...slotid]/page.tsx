import BookingPage from "@/components/new ui/BookingPage";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; slotid: string[] }>;
}) => {
  const { id, slotid } = await params;

  return (
    <>
      <BookingPage eventId={id} slotId={slotid[0]} />
    </>
  );
};

export default Page;