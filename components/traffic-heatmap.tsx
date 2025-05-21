"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

type VehicleType = "car" | "truck" | "bus" | "emergency";

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  plate: string;
  type: VehicleType;
  speed: number;
  heading: number;
  moveSpeed: number;
}

export function TrafficHeatmap() {
  // Fix for Leaflet icon default marker issue in Next.js
  useEffect(() => {
    // This workaround is needed for leaflet's default icon images
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/images/marker-icon-2x.png",
      iconUrl: "/images/marker-icon.png",
      shadowUrl: "/images/marker-shadow.png",
    });
  }, []);

  // Define vehicle icons for each type
  const getVehicleIcon = (type: VehicleType) => {
    const colors: Record<VehicleType, string> = {
      car: "#3B82F6", // blue
      truck: "#EAB308", // yellow
      bus: "#22C55E", // green
      emergency: "#EF4444", // red
    };
    
    // Create a div icon with colored circle
    return L.divIcon({
      className: "custom-div-icon",
      html: `<div style="background-color: ${colors[type]}; 
                     width: 16px; 
                     height: 16px; 
                     border-radius: 50%; 
                     border: 2px solid white;
                     box-shadow: 0 0 4px rgba(0,0,0,0.4);">
             </div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  };

  // Utility to generate a random plate number
  const generatePlate = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return `${chars.charAt(Math.floor(Math.random() * 26))}${chars.charAt(Math.floor(Math.random() * 26))}${Math.floor(10 + Math.random() * 89)}${chars.charAt(Math.floor(Math.random() * 26))}${chars.charAt(Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 8999)}`;
  };

  // Generate random vehicles around a city center
  const generateVehicles = (count = 50): Vehicle[] => {
    const types: VehicleType[] = ["car", "car", "car", "truck", "bus", "car", "car", "truck", "emergency"];
    const baseLat = 12.9716;
    const baseLng = 77.5946;
    
    const speedRanges: Record<VehicleType, [number, number]> = {
      car: [0.0003, 0.0008],
      truck: [0.0002, 0.0005],
      bus: [0.0002, 0.0004],
      emergency: [0.0005, 0.001],
    };

    return Array.from({ length: count }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      const speedRange = speedRanges[type];
      
      return {
        id: `veh${i + 1}`,
        lat: baseLat + (Math.random() - 0.5) * 0.1,
        lng: baseLng + (Math.random() - 0.5) * 0.1,
        plate: generatePlate(),
        type,
        speed: Math.floor(30 + Math.random() * 60),
        heading: Math.random() * 360,
        moveSpeed: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
      };
    });
  };

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [mapCenter] = useState<[number, number]>([12.9716, 77.5946]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Generate initial vehicles
  useEffect(() => {
    setVehicles(generateVehicles(100)); // Increased vehicle count for better heatmap effect
    setMapLoaded(true);
  }, []);

  // Simulate vehicle movement
  useEffect(() => {
    if (!vehicles.length) return;
    
    const interval = setInterval(() => {
      setVehicles(prev => 
        prev.map(v => {
          const radians = (v.heading * Math.PI) / 180;
          const newLat = v.lat + Math.sin(radians) * v.moveSpeed;
          const newLng = v.lng + Math.cos(radians) * v.moveSpeed;
          
          const newHeading = Math.random() < 0.1 
            ? (v.heading + (Math.random() * 60 - 30)) % 360 
            : v.heading;
          
          if (Math.abs(newLat - 12.9716) > 0.1 || Math.abs(newLng - 77.5946) > 0.1) {
            const toCenter = Math.atan2(12.9716 - v.lat, 77.5946 - v.lng) * (180 / Math.PI);
            return {
              ...v,
              heading: toCenter,
              lat: v.lat + Math.sin(radians) * v.moveSpeed,
              lng: v.lng + Math.cos(radians) * v.moveSpeed,
            };
          }
          
          return {
            ...v,
            lat: newLat,
            lng: newLng,
            heading: newHeading,
          };
        })
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, [vehicles]);

  if (!mapLoaded) {
    return (
      <div className="flex h-[400px] items-center justify-center bg-muted">
        <span>Loading traffic heatmap...</span>
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full rounded-md overflow-hidden border relative">
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Heatmap Layer - This would be replaced with actual heatmap implementation */}
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.lat, vehicle.lng]}
            icon={getVehicleIcon(vehicle.type)}
          >
            <Popup>
              <div className="p-1">
                <div className="font-medium">{vehicle.plate}</div>
                <div className="text-xs mt-1">
                  <div>Type: <span className="capitalize">{vehicle.type}</span></div>
                  <div>Speed: {vehicle.speed} km/h</div>
                  {vehicle.type === "emergency" && (
                    <div className="text-red-500 font-medium mt-1">
                      Emergency Vehicle
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Heatmap Controls */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md z-[1000]">
        <div className="text-sm font-medium mb-2">Traffic Density</div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-400"></div>
          <span className="text-xs">Low</span>
          <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
          <span className="text-xs">Medium</span>
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-xs">High</span>
        </div>
      </div>
    </div>
  );
}