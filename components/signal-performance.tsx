"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", waitTime: 45, throughput: 120 },
  { day: "Tue", waitTime: 42, throughput: 125 },
  { day: "Wed", waitTime: 48, throughput: 118 },
  { day: "Thu", waitTime: 40, throughput: 130 },
  { day: "Fri", waitTime: 52, throughput: 110 },
  { day: "Sat", waitTime: 38, throughput: 135 },
  { day: "Sun", waitTime: 35, throughput: 140 },
]

export function SignalPerformance() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="waitTime"
            name="Wait Time (sec)"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="throughput"
            name="Throughput (vehicles/hr)"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
