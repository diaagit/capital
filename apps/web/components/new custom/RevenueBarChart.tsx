"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const revenueData = [
  { month: "Jan", revenue: 40000 },
  { month: "Feb", revenue: 55000 },
  { month: "Mar", revenue: 62000 },
  { month: "Apr", revenue: 48000 },
  { month: "May", revenue: 70000 },
];

export default function RevenueBarChart() {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>Revenue (Monthly)</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>

              <Bar
                dataKey="revenue"
                fill="url(#colorRevenue)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4">
          <p className="text-sm text-slate-500">Total Revenue</p>
          <h3 className="text-xl font-bold">$348,805</h3>
        </div>
      </CardContent>
    </Card>
  );
}
