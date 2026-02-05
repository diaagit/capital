"use client"
import { Bell, HandCoins, LogOut, Settings, Ticket, UserRound, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import getBackendUrl from "@/lib/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface DataProps{
    firstName: string;
    proficPic: string;
}

interface BackendProps {
    message: string;
    data: DataProps;
}

export default function Sidebar() {
    const router = useRouter();
     const [data,setData] = useState<DataProps>({
        firstName: "",
        proficPic: ""
    });

    useEffect(()=>{
        const URL = getBackendUrl()
        const token = localStorage.getItem("token");
        if(!token){
            toast.warning("You are logged in");
            router.push("/login")
        }
    },[])

    useEffect(()=>{
        const URL = getBackendUrl()
        const token = localStorage.getItem("token");
        async function getData() {
            const res = await axios.get<BackendProps>(`${URL}/user/profile`,{headers:{
                Authorization: `Bearer ${token}`
            }})
            if(res.status === 200){
                setData(res.data.data);
            }
            }
        getData()
    },[])

    const removeToken = async () => {
        try {
            const URL = getBackendUrl();
            const token = localStorage.getItem("token");
            if(!token){
                toast.warning("You are not logged in")
                router.push("/login");
            }
            router.push("/login");
            
            const res = await axios.get(`${URL}/user/logout`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.status === 200){
                localStorage.removeItem("token");
            }
        } catch (error) {
            toast.error("Error took place ",error)
        }
    }
    const linkClass =
        "text-md p-3 rounded-sm flex items-center gap-2 py-2 transition-colors hover:border-gray-300 hover:bg-red-50  hover:text-red-600";
    const formatName = (name = "Ronak") =>
    name.charAt(0).toUpperCase() + name.slice(1);

    const getInitial = (name = "R") =>
    name.charAt(0).toUpperCase();

    return (
        <div className="w-64 bg-white min-h-[900px] p-5 rounded-2xl flex flex-col gap-8 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
            <Link href={"/home"}>
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
            </Link>

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
                <Link href="/dashboard/cards" className={linkClass}>
                    <Wallet className="w-5 h-5" />
                    Cards
                </Link>
                <Link href="/dashboard/transactions" className={linkClass}>
                    <HandCoins className="w-5 h-5" />
                    Transactions
                </Link>
            </nav>

            <Separator />

            {/* Settings & Logout */}
            <nav className="mt-auto flex flex-col gap-3">
                {/* <Link href="/newdashboard/settings" className={linkClass}>
                    <Settings className="w-5 h-5" />
                    Settings
                </Link> */}
                <Link href="/logout" className={linkClass}>
                    <LogOut className="w-5 h-5" />
                    Logout
                </Link>
                <div className="flex items-center justify-between rounded-md bg-neutral-800 px-3 py-2 text-white">
                    <p className="text-sm font-medium truncate">
                    {formatName(data.firstName)}
                    </p>

                    <Avatar className="h-10 w-10 rounded-full">
                    <AvatarImage
                        src={
                        data.proficPic || "https://github.com/shadcn.png"
                        }
                        alt="Profile"
                    />
                    <AvatarFallback className="rounded-full">
                        {getInitial(data.firstName)}
                    </AvatarFallback>
                    </Avatar>
                </div>
            </nav>
        </div>
    );
}