"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "Now", actual: 65, predicted: 65 },
  { time: "+1h", actual: null, predicted: 72 },
  { time: "+2h", actual: null, predicted: 80 },
  { time: "+3h", actual: null, predicted: 85 },
  { time: "+4h", actual: null, predicted: 78 },
  { time: "+5h", actual: null, predicted: 70 },
  { time: "+6h", actual: null, predicted: 68 },
  { time: "+7h", actual: null, predicted: 62 },
  { time: "+8h", actual: null, predicted: 55 },
]

export function PredictiveAnalytics() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis label={{ value: "Traffic Density (%)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="actual"
            name="Actual"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            name="Predicted"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-medium">Peak Traffic Prediction</h4>
          <p className="mt-2 text-2xl font-bold">85%</p>
          <p className="text-xs text-muted-foreground">Expected in 3 hours</p>
        </div>
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-medium">Congestion Risk</h4>
          <p className="mt-2 text-2xl font-bold text-amber-500">Medium</p>
          <p className="text-xs text-muted-foreground">Downtown area</p>
        </div>
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-medium">Recommended Action</h4>
          <p className="mt-2 text-sm">Optimize signal timing in downtown area</p>
          <p className="text-xs text-muted-foreground">To prevent congestion buildup</p>
        </div>
      </div>
    </div>
  )
}
