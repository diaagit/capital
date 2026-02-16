"use client";

import OrganizerHeader from "@/components/new custom/OrganizerHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getBackendUrl from "@/lib/config";
import axios from "axios";

interface Meta {
  totalEvents: number;
  totalPublished: number;
  totalRevenue: number;
  totalTicketsSold: number;
}

interface TopEvent {
  eventId: string;
  eventName: string;
  ticketsSold: number;
  totalRevenue: number;
}

interface SummaryEvent {
  eventId: string;
  eventName: string;
  ticketsSold: number;
  totalRevenue: number;
  attendees: number;
}

interface RevenueData {
  date: string;
  amount: number;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [meta, setMeta] = useState<Meta | null>(null);
  const [topEvents, setTopEvents] = useState<TopEvent[]>([]);
  const [summary, setSummary] = useState<SummaryEvent[]>([]);
  const [revenueTrend, setRevenueTrend] = useState<RevenueData[]>([]);
  const [sortBy, setSortBy] = useState<"revenue" | "tickets">("revenue");
  const [loading, setLoading] = useState(true);
  const [downloadPdf, setDownloadPdf] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("You are not logged in");
      router.push("/organizer/login");
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const URL = getBackendUrl();

    const today = new Date();
    const endDate = today.toISOString().slice(0, 10);

    const start = new Date();
    start.setDate(start.getDate() - 6);
    const startDate = start.toISOString().slice(0, 10);

    async function fetchData() {
      try {
        setLoading(true);

        const [metaRes, topRes, summaryRes, revenueRes] =
          await Promise.all([
            axios.get<ApiResponse<Meta>>(
              `${URL}/organiser/events/analytics`,
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get<ApiResponse<TopEvent[]>>(
              `${URL}/organiser/events/top?limit=5&sortBy=${sortBy}`,
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get<ApiResponse<SummaryEvent[]>>(
              `${URL}/organiser/events/summary`,
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get<ApiResponse<RevenueData[]>>(
              `${URL}/organiser/events/revenue?startDate=${startDate}&endDate=${endDate}`,
              { headers: { Authorization: `Bearer ${token}` } }
            ),
          ]);

        setMeta(metaRes.data.data);
        setTopEvents(topRes.data.data ?? []);
        setSummary(summaryRes.data.data ?? []);
        setRevenueTrend(revenueRes.data.data ?? []);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ?? "Something went wrong"
          );
        } else {
          toast.error("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [sortBy]);

  const isRevenueZero =
    revenueTrend.length > 0 &&
    revenueTrend.every((d) => d.amount === 0);
  
  useEffect(() => {
    if (!downloadPdf) return;

    const generatePdf = async () => {
      const element = document.getElementById("dashboard-root");
      if (!element) return;

      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.backgroundColor = "#ffffff";

      const replaceUnsupportedColors = (el: HTMLElement) => {
        const style = window.getComputedStyle(el);

        const unsupported = ["oklab", "lab", "lch"];
        unsupported.forEach((fn) => {
          if (style.backgroundColor.includes(fn)) el.style.backgroundColor = "#f0f0f0";
          if (style.color.includes(fn)) el.style.color = "#000000";
        });

        el.childNodes.forEach((child) => {
          if (child instanceof HTMLElement) replaceUnsupportedColors(child);
        });
      };

      replaceUnsupportedColors(clonedElement);

      clonedElement.style.position = "absolute";
      clonedElement.style.top = "-9999px";
      document.body.appendChild(clonedElement);

      const canvas = await html2canvas(clonedElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard.pdf");

      document.body.removeChild(clonedElement);
    };

    generatePdf().finally(() => setDownloadPdf(false));
  }, [downloadPdf]);

  return (
    <div id="dashboard-root" className="min-h-screen bg-muted/40 p-6">
      <OrganizerHeader setClick={setDownloadPdf} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard title="Total Events" value={meta?.totalEvents ?? 0} bgColor="bg-green-50" />
            <StatCard title="Published Events" value={meta?.totalPublished ?? 0} bgColor="bg-blue-50" />
            <StatCard title="Tickets Sold" value={meta?.totalTicketsSold ?? 0} bgColor="bg-orange-50" />
            <StatCard
              title="Total Revenue"
              value={meta?.totalRevenue ?? 0}
              prefix="₹ "
              bgColor="bg-red-50"
            />
          </>
        )}
      </div>

      <Card className="mt-10 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between mb-6">
            <CardTitle>Performance Overview</CardTitle>

            <div className="flex gap-2">
              <Button
                variant={sortBy === "revenue" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("revenue")}
              >
                By Revenue
              </Button>
              <Button
                variant={sortBy === "tickets" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("tickets")}
              >
                By Tickets
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading ? (
              <>
                <SkeletonChart />
                <SkeletonChart />
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-medium mb-4">
                    Top Performing Events
                  </h3>

                  {topEvents.length === 0 ? (
                    <div className="h-64 flex items-center justify-center text-muted-foreground bg-neutral-50 border border-gray-200 shadow-xs rounded-lg text-sm">
                      No top performing events yet.
                    </div>
                  ) : (
                    <ChartContainer config={{}}>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topEvents}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="eventName" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar
                            dataKey={
                              sortBy === "revenue"
                                ? "totalRevenue"
                                : "ticketsSold"
                            }
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">
                    Revenue (Last 7 Days)
                  </h3>

                  {revenueTrend.length === 0 ? (
                    <div className="h-64 flex items-center justify-center text-muted-foreground bg-neutral-50 border border-gray-200 shadow-xs rounded-lg text-sm">
                      Revenue data unavailable.
                    </div>
                  ) : isRevenueZero ? (
                    <div className="h-64 flex items-center justify-center text-muted-foreground bg-neutral-50 border border-gray-200 shadow-xs rounded-lg text-sm">
                      No revenue generated in the last 7 days.
                    </div>
                  ) : (
                    <ChartContainer config={{}}>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueTrend}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="amount" />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-10 shadow-sm">
        <CardContent className="p-6">
          <CardTitle className="mb-6">Event Summary</CardTitle>

          {loading ? (
            <div className="space-y-4">
              <SkeletonSummary />
              <SkeletonSummary />
              <SkeletonSummary />
            </div>
          ) : summary.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-muted-foreground bg-neutral-50 border border-gray-200 rounded-lg text-sm">
              No event summary data available.
            </div>
          ) : (
            <div className="space-y-4">
              {summary.map((event) => (
                <div
                  key={event.eventId}
                  className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm"
                >
                  <div>
                    <p className="font-medium">{event.eventName}</p>
                    <p className="text-sm text-muted-foreground">
                      Attendees: {event.attendees}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₹ {event.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.ticketsSold} Tickets
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  prefix = "",
  bgColor = "bg-white",
}: {
  title: string;
  value: number;
  prefix?: string;
  bgColor?: string;
}) {
  return (
    <Card className={`border shadow-sm ${bgColor}`}>
      <CardContent className="p-6">
        <CardTitle className="text-sm text-muted-foreground mb-2">
          {title}
        </CardTitle>
        <CardDescription className="text-2xl font-bold text-black">
          {prefix}
          {value.toLocaleString()}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

function SkeletonCard() {
  return (
    <div className="border shadow-sm bg-gray-100 animate-pulse h-24 rounded-lg" />
  );
}

function SkeletonChart() {
  return (
    <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
  );
}

function SkeletonSummary() {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-100 animate-pulse h-20" />
  );
}