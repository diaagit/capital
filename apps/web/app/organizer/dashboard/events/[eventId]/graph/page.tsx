import EventGraphXYFlowPage from "@/components/new custom/EventGraphPage";

export default async function Page({params}: { params: Promise<{ eventId: string }> }) {
    const eventId = (await params).eventId
    return (
        <div>
            <EventGraphXYFlowPage eventId={eventId} />  
        </div>
    ) 
}