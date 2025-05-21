"use client"

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { type: "Helmet", count: 23 },
  { type: "Red Light", count: 16 },
  { type: "Overspeed", count: 48 },
  { type: "Triple Load", count: 12 },
  { type: "Lane Violation", count: 19 },
]

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ReBarChart data={data}>
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#FB6D3A" radius={[4, 4, 0, 0]} />
      </ReBarChart>
    </ResponsiveContainer>
  )
}
