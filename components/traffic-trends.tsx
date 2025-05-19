"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", downtown: 4000, residential: 2400, industrial: 2400 },
  { day: "Tue", downtown: 3000, residential: 1398, industrial: 2210 },
  { day: "Wed", downtown: 2000, residential: 9800, industrial: 2290 },
  { day: "Thu", downtown: 2780, residential: 3908, industrial: 2000 },
  { day: "Fri", downtown: 1890, residential: 4800, industrial: 2181 },
  { day: "Sat", downtown: 2390, residential: 3800, industrial: 2500 },
  { day: "Sun", downtown: 3490, residential: 4300, industrial: 2100 },
]

export function TrafficTrends() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="downtown" stroke="hsl(var(--chart-1))" strokeWidth={2} />
          <Line type="monotone" dataKey="residential" stroke="hsl(var(--chart-2))" strokeWidth={2} />
          <Line type="monotone" dataKey="industrial" stroke="hsl(var(--chart-3))" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
