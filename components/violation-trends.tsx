"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", speeding: 400, redLight: 240, noHelmet: 180, wrongLane: 120 },
  { month: "Feb", speeding: 380, redLight: 220, noHelmet: 170, wrongLane: 110 },
  { month: "Mar", speeding: 420, redLight: 260, noHelmet: 190, wrongLane: 130 },
  { month: "Apr", speeding: 450, redLight: 280, noHelmet: 200, wrongLane: 140 },
  { month: "May", speeding: 470, redLight: 290, noHelmet: 210, wrongLane: 150 },
  { month: "Jun", speeding: 440, redLight: 270, noHelmet: 200, wrongLane: 140 },
]

export function ViolationTrends() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="speeding" fill="hsl(var(--chart-1))" />
          <Bar dataKey="redLight" fill="hsl(var(--chart-2))" />
          <Bar dataKey="noHelmet" fill="hsl(var(--chart-3))" />
          <Bar dataKey="wrongLane" fill="hsl(var(--chart-4))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
