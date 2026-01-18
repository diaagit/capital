import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { CircleDollarSign, Ticket, BarChart3 } from "lucide-react";

export default function EventDashboard() {
  const pieData = [
    { name: "Music", value: 14172, color: "#A66CFF" },
    { name: "Sport", value: 12476, color: "#3B82F6" },
    { name: "Fashion", value: 9806, color: "#FBBF24" },
    { name: "Art & Design", value: 7661, color: "#8B5CF6" },
  ];

  const lineData = [
    { day: "Sun", bookings: 900 },
    { day: "Mon", bookings: 1396 },
    { day: "Tue", bookings: 1100 },
    { day: "Wed", bookings: 1600 },
    { day: "Thu", bookings: 1300 },
    { day: "Fri", bookings: 1500 },
    { day: "Sat", bookings: 1480 },
  ];

  return (
    <div className="space-y-6 bg-[#f9f9ff]">
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="shadow-md p-4">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Bookings</CardTitle>
            <CircleDollarSign className="text-[#A66CFF]" size={30} />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">55,000</p>
          </CardContent>
        </Card>

        <Card className="shadow-md p-4">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Tickets Sold</CardTitle>
            <Ticket className="text-[#3B82F6]" size={30} />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">45,000</p>
          </CardContent>
        </Card>

        <Card className="shadow-md p-4">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Earnings</CardTitle>
            <BarChart3 className="text-[#FBBF24]" size={30} />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$275,450</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Overview Line Chart */}
      <Card className="shadow-md p-6">
        <CardHeader className="flex justify-between">
          <CardTitle>Bookings Overview</CardTitle>
          <Button variant="outline">This Week</Button>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#A66CFF"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bookings Category Section */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="shadow-md p-6">
          <CardHeader className="flex justify-between">
            <CardTitle>Bookings Category</CardTitle>
            <Button variant="outline">This Week</Button>
          </CardHeader>
          <CardContent>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md p-6">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pieData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium">{item.name}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${(item.value / 15000) * 100}%`, background: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}