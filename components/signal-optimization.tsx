"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MoreHorizontal } from "lucide-react"

const optimizationData = [
  {
    id: 1,
    intersection: "Main St & 5th Ave",
    timestamp: "Today, 10:42 AM",
    type: "AI Optimization",
    changes: "Reduced wait time by 28%",
    status: "Applied",
  },
  {
    id: 2,
    intersection: "Broadway & 7th",
    timestamp: "Today, 09:15 AM",
    type: "AI Optimization",
    changes: "Increased throughput by 32%",
    status: "In Progress",
  },
  {
    id: 3,
    intersection: "Park Ave & 3rd",
    timestamp: "Today, 08:30 AM",
    type: "Manual Override",
    changes: "Emergency vehicle priority",
    status: "Applied",
  },
  {
    id: 4,
    intersection: "River Rd & Oak St",
    timestamp: "Yesterday, 05:45 PM",
    type: "AI Optimization",
    changes: "Balanced flow for rush hour",
    status: "Applied",
  },
  {
    id: 5,
    intersection: "Highland & Market",
    timestamp: "Yesterday, 02:20 PM",
    type: "AI Optimization",
    changes: "Reduced wait time by 18%",
    status: "Applied",
  },
]

export function SignalOptimization() {
  return (
    <div className="space-y-4">
      {optimizationData.map((item) => (
        <div key={item.id} className="rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{item.intersection}</h4>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{item.timestamp}</span>
              </div>
              <p className="mt-2 text-sm">{item.changes}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge
                variant={
                  item.status === "Applied" ? "outline" : item.status === "In Progress" ? "default" : "secondary"
                }
              >
                {item.status}
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Optimizations
      </Button>
    </div>
  )
}
