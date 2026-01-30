import { Bell, LogOut, Settings, Ticket, UserRound, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
    const linkClass =
        "text-md p-3 rounded-sm flex items-center gap-2 py-2 transition-colors hover:border-gray-300 hover:bg-red-50  hover:text-red-600";

    return (
        <div className="w-1/4 bg-white h-[92vh] p-5 mr-10 mt-10 rounded-2xl flex flex-col gap-5 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">

            {/* Logo */}
            <div className="flex justify-center gap-3 rounded-sm items-center w-full h-16 bg-[#1f2533]">
                <Image
                    src="/assets/forget-password/Capital-White.svg"
                    alt="Capital"
                    width={32}
                    height={32}
                />
                <span className="text-white text-xl font-semibold">
                    Capital
                </span>
            </div>

            <Separator />

            {/* Main Links */}
            <nav className="flex flex-col gap-2">
                <Link href="/dashboard/personal" className={linkClass}>
                    <UserRound className="w-5 h-5" />
                    Personal Info
                </Link>

                <Link href="/dashboard/tickets" className={linkClass}>
                    <Ticket className="w-5 h-5" />
                    Tickets
                </Link>
                <Link href="/dashboard/payment" className={linkClass}>
                    <Wallet className="w-5 h-5" />
                    Wallets
                </Link>
                <Link href="/dashboard/notifications" className={linkClass}>
                    <Bell className="w-5 h-5" />
                    Notifications
                </Link>
            </nav>

            <Separator />

            {/* Settings & Logout */}
            <nav className="flex flex-col gap-2">
                {/* <Link href="/newdashboard/settings" className={linkClass}>
                    <Settings className="w-5 h-5" />
                    Settings
                </Link> */}
                <Link href="/logout" className={linkClass}>
                    <LogOut className="w-5 h-5" />
                    Logout
                </Link>
            </nav>
        </div>
    );
}
