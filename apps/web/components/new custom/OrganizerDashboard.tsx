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

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <OrganizerHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard title="Total Events" value={meta?.totalEvents ?? 0}  bgColor="bg-green-50"/>
        <StatCard title="Published Events" value={meta?.totalPublished ?? 0} bgColor="bg-blue-50" />
        <StatCard title="Tickets Sold" value={meta?.totalTicketsSold ?? 0} bgColor="bg-orange-50" />
        <StatCard
          title="Total Revenue"
          value={meta?.totalRevenue ?? 0}
          prefix="₹ "
          bgColor="bg-red-50"
        />
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
            <div>
              <h3 className="text-sm font-medium mb-4">
                Top Performing Events
              </h3>

              {!loading && topEvents.length === 0 && (
                <div className="h-64 flex items-center justify-center text-muted-foreground bg-neutral-50 border border-gray-200 shadow-xs rounded-lg text-sm">
                  No top performing events yet.
                </div>
              )}

              {!loading && topEvents.length > 0 && (
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

              {!loading && revenueTrend.length === 0 && (
                <div className="h-64 flex items-center justify-center text-muted-foreground bg-neutral-50 border border-gray-200 shadow-xs rounded-lg text-sm">
                  Revenue data unavailable.
                </div>
              )}

              {!loading && isRevenueZero && (
                <div className="h-64 flex items-center justify-center text-muted-foreground bg-neutral-50 border border-gray-200 shadow-xs rounded-lg text-sm ">
                  No revenue generated in the last 7 days.
                </div>
              )}

              {!loading &&
                revenueTrend.length > 0 &&
                !isRevenueZero && (
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={revenueTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="amount"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                )}
            </div>
          </div>
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