"use client";

import {
  LayoutDashboard,
  Tickets,
  SquareCheckBig,
  ReceiptIndianRupee,
  Settings,
  LogOut,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function VerifierSideNav() {
  const pathname = usePathname();

  const linkBase =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";

  const linkInactive =
    "text-muted-foreground hover:text-foreground hover:bg-muted";

  const linkActive =
    "bg-muted text-foreground";

  const link = (href: string) =>
    `${linkBase} ${
      pathname === href ? linkActive : linkInactive
    }`;

  return (
    <aside className="flex h-full w-full flex-col bg-background">

      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/home" className="flex items-center gap-2">
          <Image
            src="/assets/forget-password/Capital-White.svg"
            alt="Capital"
            width={26}
            height={26}
            className="invert"
          />
          <span className="text-base font-semibold tracking-tight">
            Capital
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">

        <Link href="/newverifierdashboard" className={link("/newverifierdashboard")}>
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link href="/newverifierdashboard/events" className={link("/newverifierdashboard/events")}>
          <Tickets size={18} />
          Events
        </Link>

        <Link href="/newverifierdashboard/bookings" className={link("/newverifierdashboard/bookings")}>
          <SquareCheckBig size={18} />
          Bookings
        </Link>

        <Link href="/newverifierdashboard/invoices" className={link("/newverifierdashboard/invoices")}>
          <ReceiptIndianRupee size={18} />
          Invoices
        </Link>

        <Separator className="my-4" />

        <Link href="/newdashboard/settings" className={link("/newdashboard/settings")}>
          <Settings size={18} />
          Settings
        </Link>

        <Link href="/logout" className={`${linkBase} text-red-500 hover:bg-red-50`}>
          <LogOut size={18} />
          Logout
        </Link>
      </nav>
    </aside>
  );
}