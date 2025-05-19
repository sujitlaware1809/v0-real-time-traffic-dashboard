"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"

const vehicleData = [
  {
    id: "ABC-1234",
    type: "Car",
    make: "Toyota",
    model: "Camry",
    lastSeen: "Today, 10:42 AM",
    location: "Main St & 5th Ave",
    status: "Active",
    flagged: false,
  },
  {
    id: "DEF-5678",
    type: "Truck",
    make: "Ford",
    model: "F-150",
    lastSeen: "Today, 10:38 AM",
    location: "Broadway & 7th",
    status: "Active",
    flagged: true,
  },
  {
    id: "GHI-9012",
    type: "Bus",
    make: "Mercedes",
    model: "Sprinter",
    lastSeen: "Today, 10:35 AM",
    location: "Park Ave & 3rd",
    status: "Active",
    flagged: false,
  },
  {
    id: "JKL-3456",
    type: "Car",
    make: "Honda",
    model: "Civic",
    lastSeen: "Today, 10:30 AM",
    location: "River Rd & Oak St",
    status: "Active",
    flagged: false,
  },
  {
    id: "MNO-7890",
    type: "Motorcycle",
    make: "Harley-Davidson",
    model: "Street Glide",
    lastSeen: "Today, 10:25 AM",
    location: "Highland & Market",
    status: "Active",
    flagged: true,
  },
]

export function VehicleList() {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="h-10 px-4 text-left font-medium">
              <Checkbox />
            </th>
            <th className="h-10 px-4 text-left font-medium">License Plate</th>
            <th className="h-10 px-4 text-left font-medium">Type</th>
            <th className="h-10 px-4 text-left font-medium">Make & Model</th>
            <th className="h-10 px-4 text-left font-medium">Last Seen</th>
            <th className="h-10 px-4 text-left font-medium">Location</th>
            <th className="h-10 px-4 text-left font-medium">Status</th>
            <th className="h-10 px-4 text-left font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {vehicleData.map((vehicle) => (
            <tr key={vehicle.id} className="border-b">
              <td className="p-4">
                <Checkbox />
              </td>
              <td className="p-4 font-medium">{vehicle.id}</td>
              <td className="p-4">{vehicle.type}</td>
              <td className="p-4">
                {vehicle.make} {vehicle.model}
              </td>
              <td className="p-4">{vehicle.lastSeen}</td>
              <td className="p-4">{vehicle.location}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{vehicle.status}</Badge>
                  {vehicle.flagged && <Badge variant="destructive">Flagged</Badge>}
                </div>
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
