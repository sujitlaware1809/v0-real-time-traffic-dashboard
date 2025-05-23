"use client"

import { useEffect, useState } from "react"
import React, { Fragment } from 'react';

// Dynamically import Leaflet components only on client side
let MapContainer: any, TileLayer: any, Circle: any, Tooltip: any, Marker: any, L: any;

if (typeof window !== 'undefined') {
  const leaflet = require('react-leaflet');
  MapContainer = leaflet.MapContainer;
  TileLayer = leaflet.TileLayer;
  Circle = leaflet.Circle;
  Tooltip = leaflet.Tooltip;
  Marker = leaflet.Marker;
  L = require('leaflet');
  require('leaflet/dist/leaflet.css');
}

// 📶 Generate live traffic density points
const generateTrafficPoints = (count = 100) => {
  const baseLat = 12.9716
  const baseLng = 77.5946
  return Array.from({ length: count }, (_, i) => ({
    id: `tp-${i}`,
    lat: baseLat + (Math.random() - 0.5) * 0.1,
    lng: baseLng + (Math.random() - 0.5) * 0.1,
    density: Math.random() * 100,
  }))
}

// 📷 Generate fixed CCTV camera positions (only once)
const generateFixedCCTVPoints = () => {
  const baseLat = 12.9716
  const baseLng = 77.5946
  return Array.from({ length: 30 }, (_, i) => ({
    id: `cctv-${i}`,
    lat: baseLat + (Math.random() - 0.5) * 0.1,
    lng: baseLng + (Math.random() - 0.5) * 0.1,
    description: `CCTV – Zone ${i + 1}`,
  }))
}

// 🏗 Construction Zones
const constructionZones = [
  { lat: 12.968, lng: 77.588, description: "Metro Work" },
  { lat: 12.960, lng: 77.605, description: "Flyover Expansion" },
  { lat: 12.980, lng: 77.599, description: "Bridge Repair" },
  { lat: 12.975, lng: 77.582, description: "Underground Cable Work" },
]

// 🚫 Road Barriers
const barriers = [
  { lat: 12.966, lng: 77.590, description: "Police Checkpoint" },
  { lat: 12.959, lng: 77.584, description: "Entry Restricted" },
]

// 🚦 Signals
const signals = [
  { lat: 12.974, lng: 77.596, description: "Signal – Main Rd" },
  { lat: 12.965, lng: 77.589, description: "Signal – Market" },
  { lat: 12.978, lng: 77.601, description: "Signal – Junction 5" },
]

export function CityMap() {
  const [isClient, setIsClient] = useState(false);
  const [trafficPoints, setTrafficPoints] = useState<any[]>([]);
  const [fixedCCTVPoints, setFixedCCTVPoints] = useState<any[]>([]);
  const [icons, setIcons] = useState<any>({});

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
    setTrafficPoints(generateTrafficPoints());
    setFixedCCTVPoints(generateFixedCCTVPoints());
    
    // Initialize icons only on client side
    if (typeof window !== 'undefined' && L) {
      setIcons({
        constructionIcon: new L.Icon({
          iconUrl: "/icons/construction.png",
          iconSize: [26, 26],
          iconAnchor: [13, 26],
        }),
        cameraIcon: new L.Icon({
          iconUrl: "/icons/camera.png",
          iconSize: [20, 20],
          iconAnchor: [10, 20],
        }),
        barrierIcon: new L.Icon({
          iconUrl: "/icons/barrier.png",
          iconSize: [24, 24],
          iconAnchor: [12, 24],
        }),
        signalIcon: new L.Icon({
          iconUrl: "/icons/signal.png",
          iconSize: [22, 22],
          iconAnchor: [11, 22],
        })
      });
    }
  }, []);

  // 🔁 Update only traffic points every 4 seconds
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setTrafficPoints(generateTrafficPoints())
    }, 4000)
    return () => clearInterval(interval)
  }, [isClient])

  // Don't render on server side
  if (!isClient || !MapContainer) {
    return (
      <div className="h-[400px] w-full rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse bg-gray-300 h-4 w-32 mx-auto mb-2 rounded"></div>
          <div className="text-gray-600 text-sm">Loading traffic map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full rounded-md overflow-hidden">
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

        {/* 🔥 Real-time Traffic Density and Incidents */}
        {trafficPoints.map((point) => {
          let fillColor = "#4CAF50"
          let incidentLevel = "Smooth"
          if (point.density > 75) {
            fillColor = "#FF3B30"
            incidentLevel = "Heavy Congestion"
          } else if (point.density > 50) {
            fillColor = "#FF9500"
            incidentLevel = "Moderate Traffic"
          } else if (point.density > 25) {
            fillColor = "#FFD600"
            incidentLevel = "Minor Slowdown"
          }

          return (
            <Circle
              key={point.id}
              center={[point.lat, point.lng]}
              radius={95}
              pathOptions={{
                fillColor,
                color: "transparent",
                fillOpacity: 0.4,
              }}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                <div className="text-xs">
                  Density: {Math.round(point.density)}% <br />
                  Incident: {incidentLevel}
                </div>
              </Tooltip>
            </Circle>
          )
        })}

        {/* 📷 Fixed-position CCTV Cameras */}
        {fixedCCTVPoints.map((cam) => (
          <Marker
            key={cam.id}
            position={[cam.lat, cam.lng]}
            icon={icons.cameraIcon}
          >
            <Tooltip>{cam.description}</Tooltip>
          </Marker>
        ))}

        {/* 🏗 Construction Zones */}
        {constructionZones.map((zone, i) => (
          <Fragment key={`cz-fragment-${i}`}>
            <Circle
              center={[zone.lat, zone.lng]}
              radius={60}
              pathOptions={{
                fillColor: "#FFA726",
                color: "#FB8C00",
                fillOpacity: 0.3,
              }}
            >
              <Tooltip>{zone.description}</Tooltip>
            </Circle>
            <Marker
              position={[zone.lat, zone.lng]}
              icon={icons.constructionIcon}
            />
          </Fragment>
        ))}

        {/* 🚫 Barriers */}
        {barriers.map((bar, i) => (
          <Marker
            key={`barrier-${i}`}
            position={[bar.lat, bar.lng]}
            icon={icons.barrierIcon}
          >
            <Tooltip>{bar.description}</Tooltip>
          </Marker>
        ))}

        {/* 🚦 Signals */}
        {signals.map((sig, i) => (
          <Marker
            key={`signal-${i}`}
            position={[sig.lat, sig.lng]}
            icon={icons.signalIcon}
          >
            <Tooltip>{sig.description}</Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}