"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ChartProps {
  salesByDay: number[];
}

const Chart = ({ salesByDay }: ChartProps) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const chartData = daysOfWeek.map((day, index) => ({
    day,
    transition: salesByDay[index],
  }));

  const chartConfig = {
    transition: {
      label: "Transition",
      color: "#1e293b",
    },
  } satisfies ChartConfig;
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Total transition (Saturday - Friday)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[400px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="transition"
              fill="var(--color-transition)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
