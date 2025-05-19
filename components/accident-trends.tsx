"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", accidents: 42, emergencies: 18 },
  { month: "Feb", accidents: 38, emergencies: 16 },
  { month: "Mar", accidents: 45, emergencies: 20 },
  { month: "Apr", accidents: 40, emergencies: 17 },
  { month: "May", accidents: 35, emergencies: 15 },
  { month: "Jun", accidents: 30, emergencies: 12 },
]

export function AccidentTrends() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="accidents" stroke="hsl(var(--chart-1))" strokeWidth={2} />
          <Line type="monotone" dataKey="emergencies" stroke="hsl(var(--chart-2))" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
