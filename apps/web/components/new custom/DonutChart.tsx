"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ticketData = [
  { name: "Sold Out", value: 1251 },
  { name: "Fully Booked", value: 834 },
  { name: "Available", value: 695 },
];

const COLORS = ["#f472b6", "#a78bfa", "#38bdf8"];

export default function DonutChart() {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>Ticket Sales Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ticketData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
              >
                {ticketData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-slate-500">Total Tickets</p>
              <p className="text-xl font-bold">2,780</p>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-4 text-sm">
          {ticketData.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-3 h-3 rounded-full mb-1"
                style={{ background: COLORS[i] }}
              />

              <p className="font-semibold">{item.name}</p>
              <p className="text-slate-500">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
