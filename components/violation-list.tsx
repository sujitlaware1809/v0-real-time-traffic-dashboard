"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"

const violationData = [
  {
    id: "V-2023-1248",
    type: "Speeding",
    location: "Main St & 5th Ave",
    date: "2023-05-18",
    time: "08:42 AM",
    status: "Pending Review",
    severity: "high",
  },
  {
    id: "V-2023-1247",
    type: "Red Light",
    location: "Broadway & 7th",
    date: "2023-05-18",
    time: "08:36 AM",
    status: "Confirmed",
    severity: "high",
  },
  {
    id: "V-2023-1246",
    type: "No Helmet",
    location: "Park Ave & 3rd",
    date: "2023-05-18",
    time: "08:30 AM",
    status: "Confirmed",
    severity: "medium",
  },
  {
    id: "V-2023-1245",
    type: "Wrong Lane",
    location: "River Rd & Oak St",
    date: "2023-05-18",
    time: "08:24 AM",
    status: "False Positive",
    severity: "low",
  },
  {
    id: "V-2023-1244",
    type: "No Seatbelt",
    location: "Highland & Market",
    date: "2023-05-18",
    time: "08:18 AM",
    status: "Pending Review",
    severity: "medium",
  },
]

export function ViolationList() {
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
          {violationData.map((violation) => (
            <tr key={violation.id} className="border-b">
              <td className="p-4">
                <Checkbox />
              </td>
              <td className="p-4 font-medium">{violation.id}</td>
              <td className="p-4">{violation.type}</td>
              <td className="p-4">{violation.location}</td>
              <td className="p-4">
                {violation.date} {violation.time}
              </td>
              <td className="p-4">
                <Badge
                  variant={
                    violation.status === "Confirmed"
                      ? "outline"
                      : violation.status === "Pending Review"
                        ? "default"
                        : "secondary"
                  }
                >
                  {violation.status}
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
