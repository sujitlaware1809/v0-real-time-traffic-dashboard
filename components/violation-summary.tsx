"use client"

import { Chart, ChartContainer, ChartLegend } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data for violation types
const violationData = [
  { name: "Speeding", count: 32 },
  { name: "Red Light", count: 24 },
  { name: "No Helmet", count: 18 },
  { name: "No Seatbelt", count: 14 },
  { name: "Wrong Lane", count: 9 },
  { name: "Illegal Parking", count: 7 },
  { name: "Overloading", count: 5 },
]

// Custom tooltip component for recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-md border bg-background p-3 shadow-md">
      <p className="mb-1 font-medium">{label}</p>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">Count:</span>
        <span className="text-sm font-medium">{payload[0].value}</span>
      </div>
    </div>
  )
}

export function ViolationSummary() {
  return (
    <div className="h-[300px] w-full">
      <Chart>
        <ChartLegend categories={[{ name: "Violations", color: "hsl(var(--chart-1))" }]} />
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={violationData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
              <XAxis
                dataKey="name"
                className="text-xs text-muted-foreground"
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" className="fill-[hsl(var(--chart-1))]" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Chart>
    </div>
  )
}
