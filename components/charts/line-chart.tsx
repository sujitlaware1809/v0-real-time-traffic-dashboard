"use client"

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { hour: "00:00", Downtown: 30, Residential: 20, Industrial: 40 },
  { hour: "06:00", Downtown: 60, Residential: 35, Industrial: 55 },
  { hour: "12:00", Downtown: 90, Residential: 60, Industrial: 80 },
  { hour: "18:00", Downtown: 120, Residential: 75, Industrial: 90 },
  { hour: "21:00", Downtown: 100, Residential: 65, Industrial: 60 },
]

export function LineChart() {
  return (
    <div className="w-full h-[250px] -mt-4"> {/* Negative margin to pull up */}
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart 
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis 
            dataKey="hour"
            tickMargin={5}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickMargin={5}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="Downtown" 
            stroke="hsl(var(--chart-1))" 
            strokeWidth={2} 
            dot={{ r: 3 }} 
          />
          <Line 
            type="monotone" 
            dataKey="Residential" 
            stroke="hsl(var(--chart-2))" 
            strokeWidth={2} 
            dot={{ r: 3 }} 
          />
          <Line 
            type="monotone" 
            dataKey="Industrial" 
            stroke="hsl(var(--chart-3))" 
            strokeWidth={2} 
            dot={{ r: 3 }} 
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  )
}