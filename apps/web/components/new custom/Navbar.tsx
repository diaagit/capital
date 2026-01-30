"use client"

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import getBackendUrl from "@/lib/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

interface DataProps{
    firstName: string;
    proficPic: string;
}

interface BackendProps {
    message: string;
    data: DataProps;
}

const Navbar = () => {
    const [data,setData] = useState<DataProps>({
        firstName: "",
        proficPic: ""
    });
    const router = useRouter();

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

    return (
        <div className="flex justify-end items-center w-full bg-white px-6 py-3 rounded-2xl my-10 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-center items-center gap-3">
                <Button className="flex items-center justify-center transition-colors hover:text-[#D580F2] hover:cursor-pointer bg-black rounded-full w-10 h-10">
                    <Bell className="w-5 h-5 text-white" />
                </Button>

                <Avatar>
                    <AvatarImage src={data.proficPic ?? "https://github.com/shadcn.png" }/>
                    <AvatarFallback>{data.firstName ?? "Ronak"}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default Navbar;
