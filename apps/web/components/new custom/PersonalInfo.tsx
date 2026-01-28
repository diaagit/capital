"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import getBackendUrl from "@/lib/config";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { DragDropAvatar } from "./DragDropAvatar";
import { toast } from "sonner";

/* ---------------- TYPES ---------------- */

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  profilePic: string | null;
  publicKey: string;
  city: string | null;
  state: string | null;
  date: string | null;
  zip_code: string | null;
}

interface UserResponse {
  message: string;
  data: UserData;
}

const PersonalInfo = () => {
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [zipCode,setZipCode] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");
  const [date,setDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get<UserResponse>(`${getBackendUrl()}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit() {
    try {
      const URL = getBackendUrl();
      const token = localStorage.getItem("token");
      const res = await axios.put(`${URL}/user/me`,{
        firstName,lastName,profileImageUrl: avatarPreview,zipCode,state,city,date: new Date(date)
      },{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      if(res.status === 200){
        toast.success("Your personal information was successfully updated");
        setEditable(false)
      }
    } catch (error) {
      console.log("Error took place:",error);
      toast.error("Error took place:",error)
    }
  }

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCity(user.city ?? "");
      setState(user.state ?? "");
      setZipCode(user.zip_code ?? "");
      setDate(user.date ?? "");
    }
  }, [user]);


  if (loading) return <ProfileSkeleton />;
  if (!user) return null;

  const avatarSrc = avatarPreview || user.profilePic || "https://i.pravatar.cc/300";

  return (
    <div className="bg-white rounded-2xl p-10 h-[79vh] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <DragDropAvatar
              src={avatarSrc}
              disabled={!editable}
              name={user.firstName}
              onChange={(file) => setAvatarPreview(URL.createObjectURL(file))}
            />

            <div>
              <h2 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-500 hover:text-red-600"
            onClick={() => setEditable(!editable)}
          >
            {editable ? "Cancel" : "Edit"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
              <Label>First Name</Label>
              <Input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} disabled={!editable}/>
          </div>

          <div className="space-y-2">
              <Label>Last Name</Label>
              <Input type="text"  value={lastName} onChange={(e)=>{setLastName(e.target.value)}} disabled={!editable}/>
          </div>

          <div className="space-y-2 col-span-2">
              <Label>Email</Label>
              <Input value={user.email} disabled />
          </div>

          <div className="space-y-2">
            <Label>City</Label>
            <Input
              placeholder="Enter Your City"
              value={city}
              disabled={!editable}
              onChange={(e)=>{setCity(e.target.value)}}
            />
          </div>

          <div className="space-y-2">
              <Label>State</Label>
              <Input placeholder="Enter Your Zip Code" value={state} onChange={(e)=>{setState(e.target.value)}} disabled={!editable}/>
          </div>

          <div className="space-y-2">
              <Label>Zip Code</Label>
              <Input placeholder="Enter Your Zip Code" value={zipCode} onChange={(e)=>{setZipCode(e.target.value)}} disabled={!editable}/>
          </div>

          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Input
              type="date"
              disabled={!editable}
              value={date}
              onChange={(e)=>{setDate(e.target.value)}}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Public Key</Label>
            <Input value={user.publicKey} readOnly />
          </div>
        </div>

        {editable && (
          <div className="flex justify-end gap-4 border-t pt-6">
            <Button variant="outline" onClick={() => setEditable(false)}>
              Discard
            </Button>
            <Button variant="outline" onClick={handleSubmit} className="border-gray-300 bg-red-50 transition text-red-600 hover:text-black hover:bg-gray-300">
              Submit changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;