"use client"

import { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Circle, Tooltip, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, MapPin, AlertTriangle, Clock, Zap, Layers } from "lucide-react"

// Type definitions
type SignalStatus = "green" | "yellow" | "red";
type Signal = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  status: SignalStatus;
  duration: number;
  trafficVolume: number;
  congested: boolean;
  waitTime: number;
};

type CongestionSeverity = "high" | "medium" | "low";

// Custom signal icons for each status
const greenSignalIcon = new L.Icon({
  iconUrl: "/icons/signal-green.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

const yellowSignalIcon = new L.Icon({
  iconUrl: "/icons/signal-yellow.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

const redSignalIcon = new L.Icon({
  iconUrl: "/icons/signal-red.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

// Function to get the appropriate icon based on signal status
const getSignalIcon = (status: SignalStatus) => {
  switch (status) {
    case "green": return greenSignalIcon;
    case "yellow": return yellowSignalIcon;
    case "red": return redSignalIcon;
    default: return greenSignalIcon;
  }
}

// Incident icon
const incidentIcon = new L.Icon({
  iconUrl: "/icons/warning.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

// Traffic congestion areas
const congestionAreas = [
  { id: "cong-1", lat: 12.9786, lng: 77.6096, radius: 300, severity: "high" },
  { id: "cong-2", lat: 12.9616, lng: 77.5746, radius: 200, severity: "medium" },
  { id: "cong-3", lat: 12.9516, lng: 77.6046, radius: 150, severity: "low" },
]

// More realistic signal names and locations around Bangalore
const signalLocations = [
  { id: "s1", lat: 12.9716, lng: 77.5946, name: "Majestic Junction" },
  { id: "s2", lat: 12.9770, lng: 77.5773, name: "Rajajinagar Signal" },
  { id: "s3", lat: 12.9603, lng: 77.6430, name: "Indiranagar 100ft Road" },
  { id: "s4", lat: 12.9261, lng: 77.6221, name: "Silk Board Junction" },
  { id: "s5", lat: 12.9982, lng: 77.6034, name: "Hebbal Flyover" },
  { id: "s6", lat: 12.9892, lng: 77.5740, name: "Yeshwanthpur Junction" },
  { id: "s7", lat: 12.9539, lng: 77.5756, name: "Lalbagh West Gate" },
  { id: "s8", lat: 12.9335, lng: 77.6141, name: "Bannerghatta Road" },
  { id: "s9", lat: 12.9786, lng: 77.6408, name: "Old Airport Road" },
  { id: "s10", lat: 12.9979, lng: 77.5909, name: "Mekhri Circle" },
  { id: "s11", lat: 12.9587, lng: 77.6369, name: "Koramangala Junction" },
  { id: "s12", lat: 12.9426, lng: 77.5560, name: "Kengeri Signal" },
]

// Traffic incidents
const trafficIncidents = [
  { 
    id: "inc-1", 
    lat: 12.9561, 
    lng: 77.6011, 
    type: "Accident", 
    description: "Minor collision causing moderate delays",
    time: "10:35 AM"
  },
  { 
    id: "inc-2", 
    lat: 12.9761, 
    lng: 77.5846, 
    type: "Road Work",
    description: "Lane closed for repairs, expect 15-minute delays",
    time: "08:15 AM"
  },
]

// Signal timing patterns with longer durations (approximately 30 seconds)
const timingPatterns: Record<string, { green: [number, number]; yellow: [number, number]; red: [number, number]; }> = {
  morning: {
    green: [25, 40],
    yellow: [3, 5],
    red: [30, 50],
  },
  afternoon: {
    green: [20, 35],
    yellow: [3, 5],
    red: [25, 40],
  },
  evening: {
    green: [30, 45],
    yellow: [3, 5],
    red: [30, 50],
  },
  night: {
    green: [20, 30],
    yellow: [3, 5],
    red: [20, 35],
  },
}

// Get traffic pattern based on time
const getTrafficPattern = () => {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 10) return "morning";
  if (hour >= 10 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 22) return "evening";
  return "night";
}

// Generate a random time within a range
const getRandomTime = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getColor = (status: SignalStatus) => {
  switch (status) {
    case "green": return "#4CAF50"
    case "yellow": return "#FFC107"
    case "red": return "#F44336"
    default: return "#9E9E9E"
  }
}

// Congestion color mapping
const getCongestionColor = (severity: CongestionSeverity) => {
  switch (severity) {
    case "high": return "#FF0000"
    case "medium": return "#FFA500"
    case "low": return "#FFFF00"
    default: return "#9E9E9E"
  }
}
const generateRealisticSignals = (prevSignals: Signal[] = []): Signal[] => {
  const pattern = getTrafficPattern();

  return signalLocations.map((location) => {
    const prevSignal = prevSignals.find((s) => s.id === location.id);

    // If the signal exists and still has time left, decrement time by a smaller amount
    // to make the timer changes slower (appear longer)
    if (prevSignal && prevSignal.duration > 0) {
      return {
        ...prevSignal,
        duration: Math.max(prevSignal.duration - 0.25, 0), // Slow down timer by updating at 1/4 speed
      };
    }

    // When time expires, change signal state
    let newStatus: SignalStatus, newDuration: number;

    if (!prevSignal) {
      // First-time initialization
      const r = Math.random();
      if (r < 0.4) {
        newStatus = "green";
        newDuration = getRandomTime(timingPatterns[pattern].green[0], timingPatterns[pattern].green[1]);
      } else if (r < 0.5) {
        newStatus = "yellow";
        newDuration = getRandomTime(timingPatterns[pattern].yellow[0], timingPatterns[pattern].yellow[1]);
      } else {
        newStatus = "red";
        newDuration = getRandomTime(timingPatterns[pattern].red[0], timingPatterns[pattern].red[1]);
      }
    } else {
      // Cycle through states
      if (prevSignal.status === "green") {
        newStatus = "yellow";
        newDuration = getRandomTime(timingPatterns[pattern].yellow[0], timingPatterns[pattern].yellow[1]);
      } else if (prevSignal.status === "yellow") {
        newStatus = "red";
        newDuration = getRandomTime(timingPatterns[pattern].red[0], timingPatterns[pattern].red[1]);
      } else {
        newStatus = "green";
        newDuration = getRandomTime(timingPatterns[pattern].green[0], timingPatterns[pattern].green[1]);
      }
    }

    // Calculate traffic volume (busier during rush hours)
    const trafficVolume = Math.floor(Math.random() * 100) +
      (pattern === "morning" || pattern === "evening" ? 50 : 20);

    return {
      ...location,
      status: newStatus,
      duration: newDuration,
      trafficVolume,
      congested: Math.random() < getCongestionProbability(),
      waitTime: newStatus === "red" ? Math.floor(Math.random() * 120) + 10 : 0,
    };
  });
}

// Helper for congestion probability
function getCongestionProbability(): number {
  const pattern = getTrafficPattern();
  if (pattern === "morning" || pattern === "evening") return 0.5;
  if (pattern === "afternoon") return 0.3;
  return 0.1;
}

function MapCenterController() {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map.setView([pos.coords.latitude, pos.coords.longitude], 13);
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    }
  }, [map]);

  return null;
}

export function SignalControlMap() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [mapMode, setMapMode] = useState<"standard" | "satellite">("standard");
  const [showCongestion, setShowCongestion] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const animationRef = useRef<null>(null);

  // Initialize signals and current time
  useEffect(() => {
    setSignals(generateRealisticSignals());

    // Update current time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Add placeholder signal icon images (in a real application, these would be actual image files)
    // This is a workaround since we can't actually create new image files
    console.log("Signal icons would be created at runtime in a real application");

    return () => clearInterval(timeInterval);
  }, []);

  // Update signals at a slower rate to create longer visual transitions
  useEffect(() => {
    if (!autoRefresh) return;

    // Use a slower interval for updates (250ms instead of animation frames)
    // This makes the countdown appear slower, resulting in longer-appearing signal changes
    const updateInterval = setInterval(() => {
      setSignals((prev) => generateRealisticSignals(prev));
    }, 250);

    return () => {
      clearInterval(updateInterval);
    };
  }, [autoRefresh]);

  return (
    <Card className="relative overflow-hidden border-gray-200 shadow-lg">
      <CardHeader className="pb-1 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              Bangalore Traffic Signal Network
              <Badge variant="outline" className="bg-green-100 text-green-800 animate-pulse">LIVE</Badge>
            </CardTitle>
            <CardDescription className="text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" /> 
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
              {' • '}
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge 
              variant={autoRefresh ? "default" : "outline"} 
              className="cursor-pointer" 
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <Zap className="h-3 w-3 mr-1" />
              {autoRefresh ? "Live" : "Paused"}
            </Badge>
            <Badge 
              variant={showCongestion ? "default" : "outline"} 
              className="cursor-pointer" 
              onClick={() => setShowCongestion(!showCongestion)}
            >
              Traffic
            </Badge>
            <Badge 
              variant={showIncidents ? "default" : "outline"} 
              className="cursor-pointer" 
              onClick={() => setShowIncidents(!showIncidents)}
            >
              Incidents
            </Badge>
          </div>
        </div>
        
        {/* Signal Status Summary */}
        <div className="mt-2 flex items-center gap-3 text-xs">
          <div className="flex items-center">
            <img src="/icons/signal-green.png" className="w-4 h-4 mr-1" alt="Green signal" />
            <span className="font-medium">{signals.filter(s => s.status === "green").length}</span>
          </div>
          <div className="flex items-center">
            <img src="/icons/signal-yellow.png" className="w-4 h-4 mr-1" alt="Yellow signal" />
            <span className="font-medium">{signals.filter(s => s.status === "yellow").length}</span>
          </div>
          <div className="flex items-center">
            <img src="/icons/signal-red.png" className="w-4 h-4 mr-1" alt="Red signal" />
            <span className="font-medium">{signals.filter(s => s.status === "red").length}</span>
          </div>
        </div>
      </CardHeader>

      {/* Map Layer Controls */}
      <div className="absolute top-16 right-2 z-[999] bg-white/90 rounded px-2 py-1 text-xs shadow-md border border-gray-200">
        <div className="flex items-center gap-1 mb-1">
          <Layers className="h-3 w-3" />
          <span className="font-semibold">Layers</span>
        </div>
        <div className="space-y-1">
          <div 
            className={`px-2 py-1 rounded cursor-pointer ${mapMode === "standard" ? "bg-blue-100" : ""}`}
            onClick={() => setMapMode("standard")}
          >
            Standard
          </div>
          <div 
            className={`px-2 py-1 rounded cursor-pointer ${mapMode === "satellite" ? "bg-blue-100" : ""}`}
            onClick={() => setMapMode("satellite")}
          >
            Satellite
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-2 z-[999] bg-white/90 rounded px-3 py-2 text-xs shadow-md space-y-1 border border-gray-200">
        <div className="font-semibold mb-1">Signal Status</div>
        <div className="flex items-center">
          <img src="/icons/signal-green.png" className="w-4 h-4 mr-1" alt="Green signal" />
          <span>Green – Go</span>
        </div>
        <div className="flex items-center">
          <img src="/icons/signal-yellow.png" className="w-4 h-4 mr-1" alt="Yellow signal" />
          <span>Yellow – Wait</span>
        </div>
        <div className="flex items-center">
          <img src="/icons/signal-red.png" className="w-4 h-4 mr-1" alt="Red signal" />
          <span>Red – Stop</span>
        </div>
        
        {showCongestion && (
          <>
            <div className="font-semibold mt-2 mb-1">Traffic Congestion</div>
            <div><span className="inline-block w-3 h-3 rounded-full bg-[#FFFF00] opacity-50 mr-2"></span>Low</div>
            <div><span className="inline-block w-3 h-3 rounded-full bg-[#FFA500] opacity-50 mr-2"></span>Medium</div>
            <div><span className="inline-block w-3 h-3 rounded-full bg-[#FF0000] opacity-50 mr-2"></span>High</div>
          </>
        )}
      </div>

      <CardContent className="p-0">
        <div className="h-[500px] w-full">
          <MapContainer
            center={[12.9716, 77.5946]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <MapCenterController />
            
            {/* Map Layers */}
            {mapMode === "standard" ? (
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
            ) : (
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              />
            )}

            {/* Traffic Congestion Areas */}
            {showCongestion && congestionAreas.map((area) => (
              <Circle
                key={area.id}
                center={[area.lat, area.lng]}
                radius={area.radius}
                pathOptions={{
                  fillColor: getCongestionColor(area.severity as CongestionSeverity),
                  color: getCongestionColor(area.severity as CongestionSeverity),
                  fillOpacity: 0.25,
                  weight: 1,
                }}
              >
                <Tooltip direction="top">
                  <div className="text-xs">
                    <strong>Traffic Congestion</strong><br />
                    Severity: {area.severity.toUpperCase()}<br />
                    Est. Delay: {area.severity === "high" ? "15-20 min" : area.severity === "medium" ? "5-10 min" : "2-5 min"}
                  </div>
                </Tooltip>
              </Circle>
            ))}

            {/* Traffic Incidents */}
            {showIncidents && trafficIncidents.map((incident) => (
              <Marker
                key={incident.id}
                position={[incident.lat, incident.lng]}
                icon={incidentIcon}
              >
                <Popup>
                  <div className="text-xs">
                    <div className="font-bold text-red-600 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {incident.type}
                    </div>
                    <div>{incident.description}</div>
                    <div className="text-gray-500 mt-1">Reported at {incident.time}</div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Traffic Signals */}
            {signals.map((signal) => (
              <Marker
                key={signal.id}
                position={[signal.lat, signal.lng]}
                icon={getSignalIcon(signal.status)}
              >
                <Popup>
                  <div className="text-xs">
                    <strong className="text-blue-600">{signal.name}</strong>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: getColor(signal.status) }}></span>
                      <span>Status: <strong>{signal.status.toUpperCase()}</strong></span>
                    </div>
                    <div>Time Left: <strong>{signal.duration}s</strong></div>
                    <div>Traffic Volume: <strong>{signal.trafficVolume}%</strong></div>
                    {signal.congested && (
                      <div className="text-red-500 mt-1">
                        Heavy congestion detected!
                      </div>
                    )}
                    {signal.status === "red" && (
                      <div className="text-gray-500 mt-1">
                        Est. Wait Time: {signal.waitTime}s
                      </div>
                    )}
                  </div>
                </Popup>
                <Circle
                  center={[signal.lat, signal.lng]}
                  radius={40}
                  pathOptions={{
                    fillColor: getColor(signal.status),
                    color: getColor(signal.status),
                    fillOpacity: 0.6,
                    weight: 2,
                  }}
                />
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 p-2 text-xs text-gray-500 flex justify-between items-center">
        <div>
          Active Signals: {signals.length} • Incidents: {trafficIncidents.length}
        </div>
        <div>
          Traffic Pattern: <span className="font-medium">{getTrafficPattern().toUpperCase()}</span>
        </div>
      </CardFooter>
    </Card>
  )
}