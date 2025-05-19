"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", speeding: 42, redLight: 24, other: 18 },
  { day: "Tue", speeding: 38, redLight: 22, other: 16 },
  { day: "Wed", speeding: 45, redLight: 26, other: 20 },
  { day: "Thu", speeding: 40, redLight: 23, other: 17 },
  { day: "Fri", speeding: 48, redLight: 28, other: 22 },
  { day: "Sat", speeding: 52, redLight: 30, other: 24 },
  { day: "Sun", speeding: 35, redLight: 20, other: 15 },
]

export function ViolationAnalytics() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="speeding" stackId="a" fill="hsl(var(--chart-1))" />
          <Bar dataKey="redLight" stackId="a" fill="hsl(var(--chart-2))" />
          <Bar dataKey="other" stackId="a" fill="hsl(var(--chart-3))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
