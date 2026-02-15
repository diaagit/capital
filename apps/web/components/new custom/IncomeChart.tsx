import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IncomeChartProps {
  data: { month: string; amount: number }[];
}

export function IncomeChart({ data }: IncomeChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.month + "-01").toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    }),
  }));

  const hasIncome = formatted.length > 0;

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Monthly Income
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[280px]">
          {!hasIncome ? (
            // ✅ Empty State
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">
                No income data available yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Once you start earning, your monthly income will appear here.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formatted}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="incomeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#22c55e"
                      stopOpacity={0.18}
                    />
                    <stop
                      offset="100%"
                      stopColor="#22c55e"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="hsl(var(--border) / 0.4)"
                />

                <XAxis
                  dataKey="label"
                  tick={{
                    fontSize: 12,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fontSize: 12,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) =>
                    `₹${(v / 1000).toFixed(0)}k`
                  }
                />

                <Tooltip
                  cursor={{ stroke: "#15803d", strokeWidth: 1 }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value: number) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    "Income",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#15803d"
                  strokeWidth={2.5}
                  fill="url(#incomeGradient)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: "#15803d",
                    strokeWidth: 2,
                    fill: "#ffffff",
                  }}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}