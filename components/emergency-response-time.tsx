"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { type: "Vehicle Collision", time: 4.2 },
  { type: "Medical Emergency", time: 3.8 },
  { type: "Road Hazard", time: 5.6 },
  { type: "Vehicle Fire", time: 3.5 },
  { type: "Vehicle Breakdown", time: 7.2 },
]

export function EmergencyResponseTime() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="type" />
          <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="time" fill="hsl(var(--chart-1))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
