import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BalanceChartProps {
  wallet: number;
  cards: number;
}

export function BalanceChart({ wallet, cards }: BalanceChartProps) {
  const data = [
    { name: "Wallet", value: wallet },
    { name: "Cards", value: cards },
  ];

const COLORS = ["#3B82F6", "#10B981"];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Balance Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];

      return (
        <div className="rounded-lg border bg-card px-3 py-2 shadow-md">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.payload.fill }}
            />
            <span className="text-sm font-medium">
              {item.name}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            ₹{item.value.toLocaleString("en-IN")}
          </p>
        </div>
      );
    }
    return null;
  };