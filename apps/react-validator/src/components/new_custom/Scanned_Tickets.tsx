import { useEffect, useState } from "react"
import { Ticket, Download, CalendarDays } from "lucide-react"
import DashboardHeader from "./DashboardHeader"
import axios from "axios"
import getBackendUrl from "@/lib/config"

interface Organiser {
  first_name: string
  last_name: string
}

interface EventSlot {
  id: string
  capacity: number
  event_date: string
  start_time: string
  end_time: string
  location_name: string
  location_url: string
  price: number
}

const EventStatus = {
  draft: "draft",
  published: "published",
  cancelled: "cancelled",
} as const

type EventStatus = typeof EventStatus[keyof typeof EventStatus]

interface Event {
  id: string
  title: string
  description: string
  banner_url: string
  hero_image_url: string
  category: string
  genre: string
  language: string
  status: string
  is_online: boolean
  created_at: string
  organiser: Organiser
  eventSlot: EventSlot
}

const statusMap: Record<EventStatus, string> = {
  draft: "bg-amber-100 text-amber-700 border border-amber-200",
  published: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  cancelled: "bg-rose-100 text-rose-700 border border-rose-200",
}

const ScannedTickets = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      const URL = getBackendUrl()
      const token = localStorage.getItem("token")
      const res = await axios.get(`${URL}/validator/scanned/events`,{headers: {
        Authorization: `Bearer ${token}`
      }})
      setEvents(res.data.data || [])
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDownload = async (eventId: string) => {
    try {
      const URL = getBackendUrl()

      const response = await axios.get(
        `${URL}/validator/download`,
        {
          params: { eventId },
          responseType: "blob",
        }
      )

      const blob = new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })

      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `tickets_${eventId}.xlsx`
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Error downloading file:", error)
    }
  }
  return (
    <div className="bg-white w-full h-full overflow-y-auto flex flex-col gap-6 p-6">
      <DashboardHeader
        title="Scanned Tickets"
        subtitle="Track and manage all scanned entries in real time."
        icon={<Ticket />}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-40 bg-gray-200" />
              <div className="p-5 space-y-4">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="space-y-2">
                  <div className="h-3 w-1/2 bg-gray-200 rounded" />
                  <div className="h-3 w-2/3 bg-gray-200 rounded" />
                </div>
                <div className="h-9 w-full bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full min-h-[350px] border border-dashed border-gray-300 rounded-xl bg-gray-50 text-center p-10">
          <CalendarDays className="w-8 h-8 text-gray-500" />
          <h3 className="mt-4 text-base font-semibold text-gray-800">
            No Events Yet
          </h3>
          <p className="text-sm text-gray-500">
            Start scanning tickets to view and download your event details here.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-72 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.banner_url}
                  alt={event.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span
                  className={`absolute top-3 left-3 flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${
                    statusMap[event.status as EventStatus] ??
                    "bg-gray-100 text-gray-700 border border-gray-200"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  {event.status.charAt(0).toUpperCase() +
                    event.status.slice(1)}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-base font-semibold text-gray-900 line-clamp-1">
                  {event.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {event.category} • {event.genre}
                </p>

                <div className="mt-2 text-sm text-gray-600">
                  {event.eventSlot.location_name}
                </div>

                <div className="flex-1" />

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  {/* SLOT PAGE COMMENTED OUT
                  <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg hover:bg-gray-100 transition">
                    Slots
                  </button>
                  */}

                  <button
                    onClick={() => handleDownload(event.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    <Download size={16} />
                    Excel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ScannedTickets