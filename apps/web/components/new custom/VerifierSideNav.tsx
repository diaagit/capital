import { Bell, LogOut, Settings, Ticket, UserRound, Wallet,LayoutDashboard,Tickets  ,SquareCheckBig  ,ReceiptIndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function VerifierSideNav() {
    const linkClass =
        "text-md flex items-center gap-2 py-2 transition-colors hover:text-[#C251E6]";

    return (
        <div className="w-1/4 bg-white h-[90vh] p-10 mr-10 mt-10 rounded-2xl flex flex-col gap-5 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">

            {/* Logo */}
            <div className="flex justify-center items-center w-full">
                <Image alt="Logo" height={50} src="/assets/Eventique.png" width={180} />
            </div>

            <Separator />

            {/* Main Links */}
            <nav className="flex flex-col gap-2">
                <Link href="/newverifierdashboard" className={linkClass}>
                    <LayoutDashboard  className="w-5 h-5" />
                    Dashboard
                </Link>
                <Link href="/newverifierdashboard/events" className={linkClass}>
                    <Tickets  className="w-5 h-5" />
                    Events
                </Link>
                <Link href="/newverifierdashboard/bookings" className={linkClass}>
                    <SquareCheckBig  className="w-5 h-5" />
                    Bookings
                </Link>
                <Link href="/newverifierdashboard/invoices" className={linkClass}>
                    <ReceiptIndianRupee  className="w-5 h-5" />
                    Invoices
                </Link>
            </nav>

            <Separator />

            {/* Settings & Logout */}
            <nav className="flex flex-col gap-2">
                <Link href="/newdashboard/settings" className={linkClass}>
                    <Settings className="w-5 h-5" />
                    Settings
                </Link>
                <Link href="/logout" className={linkClass}>
                    <LogOut className="w-5 h-5" />
                    Logout
                </Link>
            </nav>
        </div>
    );
}
