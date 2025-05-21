"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Circle, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter, Download } from "lucide-react"

// 🚦 Icons
const helmetIcon = new L.Icon({
  iconUrl: "/icons/helmet.png",
  iconSize: [22, 22],
  iconAnchor: [11, 22],
})

const speedIcon = new L.Icon({
  iconUrl: "/icons/speed.png",
  iconSize: [22, 22],
  iconAnchor: [11, 22],
})

const tripleIcon = new L.Icon({
  iconUrl: "/icons/triple.png",
  iconSize: [22, 22],
  iconAnchor: [11, 22],
})

const wrongWayIcon = new L.Icon({
  iconUrl: "/icons/wrong-way.png",
  iconSize: [22, 22],
  iconAnchor: [11, 22],
})

// 🔁 Generate data
const generateViolations = (count = 30) => {
  const baseLat = 12.9716
  const baseLng = 77.5946
  const types = ["Helmet", "Overspeeding", "Triple Riding", "Wrong Way"]

  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)]
    return {
      id: `v-${i}`,
      lat: baseLat + (Math.random() - 0.5) * 0.05,
      lng: baseLng + (Math.random() - 0.5) * 0.05,
      type,
      severity: Math.floor(Math.random() * 3) + 1,
      time: new Date().toLocaleTimeString(),
    }
  })
}

export default function ViolationMap() {
  const [timePeriod, setTimePeriod] = useState("now")
  const [violations, setViolations] = useState(generateViolations())

  useEffect(() => {
    const interval = setInterval(() => {
      setViolations(generateViolations())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-1">
        <CardTitle className="text-base">Violation Hotspot Map</CardTitle>
        <CardDescription className="text-xs">
          Live traffic rule violations with severity markers
        </CardDescription>
      </CardHeader>

      {/* Controls - Tight top right */}
      <div className="absolute top-2 right-2 z-[1000] flex gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-gray-200">
        <Select value={timePeriod} onValueChange={(value) => setTimePeriod(value)}>
          <SelectTrigger className="h-7 w-[100px] text-xs px-1">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="now">Now</SelectItem>
            <SelectItem value="1h">1h</SelectItem>
            <SelectItem value="6h">6h</SelectItem>
            <SelectItem value="24h">24h</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="h-7 w-7 p-1">
          <Filter className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline" size="icon" className="h-7 w-7 p-1">
          <Download className="h-3.5 w-3.5" />
        </Button>
      </div>

      <CardContent className="p-0">
        <div className="h-[500px] w-full">
          <MapContainer
            center={[12.9716, 77.5946]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {violations.map((v) => {
              let icon = helmetIcon
              let color = "#81C784" // Green for helmet

              if (v.type === "Overspeeding") {
                icon = speedIcon
                color = "#EF5350" // Red
              } else if (v.type === "Triple Riding") {
                icon = tripleIcon
                color = "#FFA726" // Orange
              } else if (v.type === "Wrong Way") {
                icon = wrongWayIcon
                color = "#AB47BC" // Violet
              }

              return (
                <Marker key={v.id} position={[v.lat, v.lng]} icon={icon}>
                  <Tooltip direction="top" offset={[0, -10]}>
                    <div className="text-xs">
                      {v.type} <br />
                      Severity: {v.severity} <br />
                      Time: {v.time}
                    </div>
                  </Tooltip>
                  <Circle
                    center={[v.lat, v.lng]}
                    radius={40 + v.severity * 25}
                    pathOptions={{
                      fillColor: color,
                      color: "transparent",
                      fillOpacity: 0.35,
                    }}
                  />
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}
