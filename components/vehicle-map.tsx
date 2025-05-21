"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"

// Define vehicle icons for each type
const vehicleIcons: Record<string, L.Icon> = {
  car: new L.Icon({
    iconUrl: "/icons/car-icon.png",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  }),
  truck: new L.Icon({
    iconUrl: "/icons/truck-icon.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  }),
  bus: new L.Icon({
    iconUrl: "/icons/bus-icon.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  }),
  emergency: new L.Icon({
    iconUrl: "/icons/ambulance-icon.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  }),
}

// Utility to generate a random plate number
const generatePlate = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  return `KA${Math.floor(10 + Math.random() * 89)}${chars.charAt(Math.floor(Math.random() * 26))}${chars.charAt(Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 8999)}`
}

// Generate 50 random vehicles around central Bangalore
const generateVehicles = (count = 50) => {
  const types = ["car", "truck", "bus", "emergency"]
  const baseLat = 12.9716
  const baseLng = 77.5946

  return Array.from({ length: count }, (_, i) => ({
    id: `veh${i + 1}`,
    lat: baseLat + (Math.random() - 0.5) * 0.1, // small spread
    lng: baseLng + (Math.random() - 0.5) * 0.1,
    plate: generatePlate(),
    type: types[Math.floor(Math.random() * types.length)],
  }))
}

export function VehicleMap() {
  const [vehicles, setVehicles] = useState(generateVehicles())

  // Simulate live movement
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          lat: v.lat + (Math.random() - 0.5) * 0.0015,
          lng: v.lng + (Math.random() - 0.5) * 0.0015,
        }))
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[400px] w-full rounded-md overflow-hidden">
      <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.lat, vehicle.lng]}
            icon={vehicleIcons[vehicle.type] || vehicleIcons.car}
          >
            <Popup>
              <div>
                <strong>{vehicle.plate}</strong><br />
                Type: {vehicle.type}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
