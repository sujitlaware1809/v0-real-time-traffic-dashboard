"use client"
import { Chart, ChartContainer, ChartLegend } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data for traffic density over time
const trafficData = [
  { time: "00:00", downtown: 20, residential: 10, industrial: 5 },
  { time: "02:00", downtown: 15, residential: 5, industrial: 5 },
  { time: "04:00", downtown: 10, residential: 5, industrial: 10 },
  { time: "06:00", downtown: 30, residential: 25, industrial: 20 },
  { time: "08:00", downtown: 80, residential: 70, industrial: 60 },
  { time: "10:00", downtown: 70, residential: 50, industrial: 65 },
  { time: "12:00", downtown: 65, residential: 45, industrial: 70 },
  { time: "14:00", downtown: 60, residential: 40, industrial: 75 },
  { time: "16:00", downtown: 75, residential: 60, industrial: 65 },
  { time: "18:00", downtown: 90, residential: 80, industrial: 60 },
  { time: "20:00", downtown: 70, residential: 65, industrial: 40 },
  { time: "22:00", downtown: 45, residential: 40, industrial: 20 },
]

// Custom tooltip component for recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-md border bg-background p-3 shadow-md">
      <p className="mb-1 font-medium">{label}</p>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <div className="mr-1.5 h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]" />
            <span className="text-sm text-muted-foreground">Downtown:</span>
          </div>
          <span className="text-sm font-medium">{payload[0].value}%</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <div className="mr-1.5 h-2 w-2 rounded-full bg-[hsl(var(--chart-2))]" />
            <span className="text-sm text-muted-foreground">Residential:</span>
          </div>
          <span className="text-sm font-medium">{payload[1].value}%</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <div className="mr-1.5 h-2 w-2 rounded-full bg-[hsl(var(--chart-3))]" />
            <span className="text-sm text-muted-foreground">Industrial:</span>
          </div>
          <span className="text-sm font-medium">{payload[2].value}%</span>
        </div>
      </div>
    </div>
  )
}

export function TrafficOverview() {
  return (
    <div className="h-[300px] w-full">
      <Chart>
        <ChartLegend
          categories={[
            { name: "Downtown", color: "hsl(var(--chart-1))" },
            { name: "Residential", color: "hsl(var(--chart-2))" },
            { name: "Industrial", color: "hsl(var(--chart-3))" },
          ]}
        />
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trafficData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="time" className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
              <YAxis
                className="text-xs text-muted-foreground"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="downtown"
                className="fill-[hsl(var(--chart-1))] stroke-[hsl(var(--chart-1))]"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="residential"
                className="fill-[hsl(var(--chart-2))] stroke-[hsl(var(--chart-2))]"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="industrial"
                className="fill-[hsl(var(--chart-3))] stroke-[hsl(var(--chart-3))]"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Chart>
    </div>
  )
}
