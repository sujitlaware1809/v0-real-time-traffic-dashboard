"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "00:00", volume: 20 },
  { time: "02:00", volume: 15 },
  { time: "04:00", volume: 10 },
  { time: "06:00", volume: 30 },
  { time: "08:00", volume: 80 },
  { time: "10:00", volume: 70 },
  { time: "12:00", volume: 65 },
  { time: "14:00", volume: 60 },
  { time: "16:00", volume: 75 },
  { time: "18:00", volume: 90 },
  { time: "20:00", volume: 70 },
  { time: "22:00", volume: 45 },
]

export function TrafficAnalytics() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="volume"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
