"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"

const accidentData = [
  {
    id: "A-2023-0087",
    type: "Vehicle Collision",
    location: "Main St & 5th Ave",
    date: "2023-05-18",
    time: "08:42 AM",
    status: "Active",
    severity: "high",
  },
  {
    id: "A-2023-0086",
    type: "Vehicle Breakdown",
    location: "Broadway & 7th",
    date: "2023-05-18",
    time: "08:36 AM",
    status: "Resolved",
    severity: "medium",
  },
  {
    id: "A-2023-0085",
    type: "Road Hazard",
    location: "Park Ave & 3rd",
    date: "2023-05-18",
    time: "08:30 AM",
    status: "Resolved",
    severity: "low",
  },
  {
    id: "A-2023-0084",
    type: "Vehicle Collision",
    location: "River Rd & Oak St",
    date: "2023-05-18",
    time: "08:24 AM",
    status: "Active",
    severity: "high",
  },
  {
    id: "A-2023-0083",
    type: "Medical Emergency",
    location: "Highland & Market",
    date: "2023-05-18",
    time: "08:18 AM",
    status: "Resolved",
    severity: "high",
  },
]

export function AccidentList() {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="h-10 px-4 text-left font-medium">
              <Checkbox />
            </th>
            <th className="h-10 px-4 text-left font-medium">ID</th>
            <th className="h-10 px-4 text-left font-medium">Type</th>
            <th className="h-10 px-4 text-left font-medium">Location</th>
            <th className="h-10 px-4 text-left font-medium">Date & Time</th>
            <th className="h-10 px-4 text-left font-medium">Status</th>
            <th className="h-10 px-4 text-left font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {accidentData.map((accident) => (
            <tr key={accident.id} className="border-b">
              <td className="p-4">
                <Checkbox />
              </td>
              <td className="p-4 font-medium">{accident.id}</td>
              <td className="p-4">{accident.type}</td>
              <td className="p-4">{accident.location}</td>
              <td className="p-4">
                {accident.date} {accident.time}
              </td>
              <td className="p-4">
                <Badge
                  variant={
                    accident.status === "Active" ? "destructive" : accident.status === "Pending" ? "default" : "outline"
                  }
                >
                  {accident.status}
                </Badge>
              </td>
              <td className="p-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center p-4">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}
