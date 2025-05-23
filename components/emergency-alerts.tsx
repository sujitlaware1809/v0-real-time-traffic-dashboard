"use client";
import { AlertTriangle, ArrowUpRight, Car, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Mock data for emergency alerts
const emergencyData = [
  {
    id: 1,
    type: "Accident",
    location: "Broadway & 7th Ave",
    time: "10 min ago",
    severity: "high",
    status: "Active",
    description: "Two-vehicle collision, emergency services dispatched",
  },
  {
    id: 2,
    type: "Vehicle Breakdown",
    location: "Main St & 5th Ave",
    time: "25 min ago",
    severity: "medium",
    status: "Pending",
    description: "Truck broken down in right lane causing congestion",
  },
  {
    id: 3,
    type: "Traffic Jam",
    location: "Highway 101 North",
    time: "45 min ago",
    severity: "medium",
    status: "Resolving",
    description: "Heavy congestion due to construction work",
  },
]

export function EmergencyAlerts() {
  return (
    <div className="space-y-4">
      {emergencyData.map((emergency, index) => (
        <div key={emergency.id}>
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 rounded-full p-1.5 ${
                emergency.severity === "high"
                  ? "bg-red-500/20 text-red-500"
                  : emergency.severity === "medium"
                    ? "bg-amber-500/20 text-amber-500"
                    : "bg-blue-500/20 text-blue-500"
              }`}
            >
              {emergency.type === "Accident" ? <AlertTriangle className="h-4 w-4" /> : <Car className="h-4 w-4" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{emergency.type}</h4>
                <Badge
                  variant={
                    emergency.status === "Active"
                      ? "destructive"
                      : emergency.status === "Pending"
                        ? "default"
                        : "outline"
                  }
                >
                  {emergency.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{emergency.description}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{emergency.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{emergency.location}</span>
                </div>
              </div>
            </div>
          </div>
          {index < emergencyData.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
      <Button variant="outline" className="mt-2 w-full">
        View All Incidents
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
