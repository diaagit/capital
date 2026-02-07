"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";
import axios from "axios";
import getBackendUrl from "@/lib/config";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2, ImagePlus, FileText, ImageIcon, Tag, SquarePen, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  banner_url: z.string().url(),
  hero_image_url: z.string().url(),
  category: z.enum([
      "movie","concert","sports","theatre","comedy","conference",
      "workshop","exhibition","festival","other"
    ]),
  genre: z.enum([
      "action","drama","comedy","romance","horror","thriller","sci_fi",
      "fantasy","documentary","animation","classical","rock","pop",
      "jazz","hip_hop","sports_general","other"
    ]),
  language: z.enum([
      "english","hindi","marathi","spanish","french","german",
      "japanese","korean","chinese","tamil","telugu","multi_language"
    ]),
  status: z.enum(["draft","published","cancelled"]),
  is_online: z.boolean(),
});
type FormValues = z.infer<typeof schema>;

const categories = [
  "movie","concert","sports","theatre","comedy","conference",
  "workshop","exhibition","festival","other"
];

const genres = [
  "action","drama","comedy","romance","horror","thriller","sci_fi",
  "fantasy","documentary","animation","classical","rock","pop",
  "jazz","hip_hop","sports_general","other"
];

const languages = [
  "english","hindi","marathi","spanish","french","german",
  "japanese","korean","chinese","tamil","telugu","multi_language"
];

export default function EventForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: "draft",
      is_online: false,
    },
  });

  const banner = form.watch("banner_url");
  const hero = form.watch("hero_image_url");

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      router.push("/organizer/login")
    }
  },[])

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      const URL = getBackendUrl();
      const token = localStorage.getItem("token");

      await axios.post(`${URL}/events`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Event was created ");
      form.reset();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-8xl space-y-8">
      <div className="w-full h-fit flex flex-col justify-center rounded-2xl border border-zinc-200 shadow-sm bg-white p-3">
        <div className="flex items-center gap-2">
                <SquarePen className="h-4 w-4 font-bold" />
                <CardTitle className="font-heading text-lg font-semibold">Create an event</CardTitle>
        </div>
        <p className="text-muted-foreground text-sm mt-1">
          Fill in details and publish your event
        </p>
      </div>


      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="rounded-2xl">
          <CardHeader className="pb-1">
            <div className="flex items-center gap-2 ">
                <FileText className="h-4 w-4 font-bold" />
                <CardTitle className="font-heading text-base font-semibold">Basic Information</CardTitle>
            </div>
            <CardDescription>
              Core information about your event
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <Label>Title</Label>
              <Input
                className="mt-2 h-11 flex bg-neutral-50 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="Coldplay Live 2026"
                {...form.register("title")}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                rows={4}
                className="mt-2  flex bg-neutral-50 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="Describe your event..."
                {...form.register("description")}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 font-bold" />
                <CardTitle className="font-heading text-base font-semibold">Media</CardTitle>
            </div>
            <CardDescription>
              Add banners and hero images
            </CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-6">

            {[{ label: "Banner Image", value: banner, name: "banner_url" },
              { label: "Hero Image", value: hero, name: "hero_image_url" }].map((img, i) => (
              <div key={i} className="space-y-3">

                <Label>{img.label}</Label>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden border bg-neutral-100">
                  {img.value ? (
                    <img
                      src={img.value}
                      className="absolute inset-0 h-full w-full object-cover"
                      alt="preview"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm gap-2">
                      <ImagePlus size={18} />
                      Preview
                    </div>
                  )}
                </div>

                <Input
                  className=" flex bg-neutral-50 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Paste image URL"
                  {...form.register(img.name as any)}
                />
              </div>
            ))}

          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 font-bold" />
                <CardTitle className="font-heading text-base font-semibold">Classification</CardTitle>
            </div>
            <CardDescription>
              Categorize your event to improve discovery, filtering, and recommendations.
            </CardDescription>
          </CardHeader>

         <CardContent className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={(v) => form.setValue("category", v as any)}
              defaultValue={form.getValues("category")}
            >
              <SelectTrigger className="w-full bg-neutral-50 min-w-[220px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Genre</Label>
            <Select
              onValueChange={(v) => form.setValue("genre", v as any)}
              defaultValue={form.getValues("genre")}
            >
              <SelectTrigger className="w-full bg-neutral-50 min-w-[220px]">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>

              <SelectContent>
                {genres.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Language</Label>
            <Select
              onValueChange={(v) => form.setValue("language", v as any)}
              defaultValue={form.getValues("language")}
            >
              <SelectTrigger className="w-full bg-neutral-50 min-w-[220px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>

              <SelectContent>
                {languages.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 font-bold" />
                <CardTitle className="font-heading text-base font-semibold">Settings</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="flex items-center justify-between flex-wrap gap-6">
            <div className="w-48">
              <Label>Status</Label>
              <Select
                defaultValue="DRAFT"
                onValueChange={(v) => form.setValue("status", v as any)}
              >
               <SelectTrigger className="mt-2 w-full bg-neutral-50 min-w-[490px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  {/* <SelectItem value="PUBLISHED">Published</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Switch
                onCheckedChange={(v) => form.setValue("is_online", v)}
              />
              <Label>Online event</Label>
            </div>
          </CardContent>
        </Card>

        <div className="sticky bottom-0 bg-muted/30 backdrop-blur supports-[backdrop-filter]:bg-muted/20 p-4 rounded-xl">
          <Button size="lg" className="w-full h-12" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </div>

      </form>
    </div>
  );
}