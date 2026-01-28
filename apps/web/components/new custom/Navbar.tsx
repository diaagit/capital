import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const Navbar = () => {
    return (
        <div className="flex justify-end items-center w-full bg-white px-6 py-3 rounded-2xl my-10 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
            {/* Right: Bell + Avatar */}
            <div className="flex justify-center items-center gap-3">
                <Button className="flex items-center justify-center transition-colors hover:text-[#D580F2] hover:cursor-pointer bg-black rounded-full w-10 h-10">
                    <Bell className="w-5 h-5 text-white" />
                </Button>

                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default Navbar;
