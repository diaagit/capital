"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, MapPin, Calendar, Shield, User, Mail, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import QRCode from "qrcode";

interface TicketDetail {
    eventSlot: {
        event: {
            organiser: { email: string };
            status: string;
            title: string;
        };
        location_name: string;
        location_url: string;
    };
    eventSlotId: string;
    is_valid: boolean;
    signature: string;
    user: {
        email: string;
        first_name: string;
        last_name: string;
    };
}

interface ApiResponse {
    message: string;
    ticketDetail: TicketDetail;
}

interface TicketDetailsProps {
    ticketId: string;
}

function getInitials(title: string): string {
    return title
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
}

const PALETTE = [
    { bg: "#EDE9FE", text: "#4C1D95" },
    { bg: "#DBEAFE", text: "#1E3A8A" },
    { bg: "#D1FAE5", text: "#064E3B" },
    { bg: "#FCE7F3", text: "#831843" },
    { bg: "#FEF3C7", text: "#78350F" },
    { bg: "#FFE4E6", text: "#881337" },
];

function titleColor(title: string) {
    let hash = 0;
    for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
    return PALETTE[Math.abs(hash) % PALETTE.length];
}

const TicketDetails = ({ ticketId }: TicketDetailsProps) => {
    const router = useRouter();
    const [ticketDetail, setTicketDetail] = useState<TicketDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [qrDataUrl, setQrDataUrl] = useState<string>("");

    useEffect(() => {
        if (!ticketId) return;
        const fetchTicket = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.warning("You are not logged in");
                    router.push("/login");
                    return;
                }
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tickets/${ticketId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (!res.ok) {
                    const data = await res.json();
                    setError(data.message ?? "Failed to load ticket.");
                    return;
                }
                const data: ApiResponse = await res.json();
                setTicketDetail(data.ticketDetail);
                if (data.ticketDetail.signature) {
                    const url = await QRCode.toDataURL(data.ticketDetail.signature, {
                        width: 160,
                        margin: 1,
                        color: { dark: "#000000", light: "#ffffff" },
                    });
                    setQrDataUrl(url);
                }
            } catch (err) {
                console.error(err);
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [ticketId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[79vh] bg-white rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
                    <p className="text-sm text-gray-400">Loading ticket…</p>
                </div>
            </div>
        );
    }

    if (error || !ticketDetail) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 h-[79vh] bg-white rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-sm text-gray-500">{error ?? "Ticket not found."}</p>
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go back
                </Button>
            </div>
        );
    }

    const { eventSlot, is_valid, user, signature } = ticketDetail;
    const { event, location_name, location_url } = eventSlot;
    const fullName = `${user.first_name} ${user.last_name}`;
    const initials = getInitials(event.title);
    const color = titleColor(event.title);

    return (
        <div className="bg-white rounded-2xl overflow-y-auto h-[79vh]">

            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Tickets
                </button>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Download
                </button>
            </div>

            <div className="flex items-start gap-6 px-8 py-8">

                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-semibold shrink-0 select-none"
                    style={{ backgroundColor: color.bg, color: color.text }}
                >
                    {initials}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 leading-tight">
                                {event.title}
                            </h1>
                            <p className="text-sm text-gray-400 mt-0.5 font-mono"># {ticketId}</p>
                        </div>

                        <span
                            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                            style={
                                is_valid
                                    ? { backgroundColor: "#F0FDF4", color: "#166534" }
                                    : { backgroundColor: "#FEF2F2", color: "#991B1B" }
                            }
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: is_valid ? "#16A34A" : "#DC2626" }}
                            />
                            {is_valid ? "Valid" : "Invalid"}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                            <MapPin className="w-3 h-3" />
                            {location_name}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full capitalize">
                            <Calendar className="w-3 h-3" />
                            {event.status}
                        </span>
                    </div>
                </div>
            </div>

            <Separator />
            <div className="px-8 py-8 flex gap-12">
                <div className="flex-1 space-y-8">
                    <section>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
                            Attendee
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                                    <User className="w-4 h-4 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Name</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">{fullName}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Email</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Separator />
                    <section>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
                            Event
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Venue</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">{location_name}</p>
                                    {location_url && (
                                        <a
                                            href={location_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-violet-600 hover:underline mt-0.5 inline-block"
                                        >
                                            View on map →
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                                    <Building2 className="w-4 h-4 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Organiser</p>
                                    <p className="text-sm font-medium text-gray-900 mt-0.5">{event.organiser.email}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Separator />

                    <section>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                            Reference
                        </p>
                        <div className="bg-gray-50 rounded-xl px-4 py-3">
                            <p className="text-xs text-gray-400 mb-1">Slot ID</p>
                            <p className="text-sm font-mono text-gray-700">{ticketDetail.eventSlotId}</p>
                        </div>
                        {/* {signature && (
                            <div className="bg-gray-50 rounded-xl px-4 py-3 mt-3">
                                <p className="text-xs text-gray-400 mb-1">Signature</p>
                                <p className="text-xs font-mono text-gray-500 break-all leading-relaxed">
                                    {signature.slice(0, 80)}…
                                </p>
                            </div>
                        )} */}
                    </section>
                </div>

                <div className="shrink-0 flex flex-col items-center gap-3">
                    <div className="border border-gray-100 rounded-2xl p-4 bg-white">
                        {qrDataUrl ? (
                            <img
                                src={qrDataUrl}
                                alt="Ticket QR code"
                                width={140}
                                height={140}
                                className="rounded-lg"
                            />
                        ) : (
                            <div className="w-[140px] h-[140px] bg-gray-50 rounded-lg flex items-center justify-center">
                                <p className="text-xs text-gray-300">No QR</p>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 text-center max-w-[140px] leading-relaxed">
                        Scan at entry to verify this ticket
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;