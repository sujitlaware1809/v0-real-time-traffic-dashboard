"use client"

import { useEffect, useState } from "react"
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
import { 
  AlertTriangle, 
  Clock, 
  Zap, 
  Layers, 
  Ambulance, 
  Siren, 
  Car, 
  Building, 
  Info, 
  Activity,
  Filter
} from "lucide-react"

// Type definitions
type IncidentType = "accident" | "medical" | "fire" | "police" | "hazard";
type IncidentSeverity = "critical" | "major" | "minor";
type EmergencyZoneType = "hospital" | "fire_station" | "police_station";

type Incident = {
  id: string;
  lat: number;
  lng: number;
  type: IncidentType;
  severity: IncidentSeverity;
  description: string;
  time: string;
  respondersDispatched: number;
  estimatedArrival: string;
};

type EmergencyZone = {
  id: string;
  lat: number;
  lng: number;
  type: EmergencyZoneType;
  name: string;
  radius: number;
  capacity: number;
  occupied: number;
  respondersAvailable: number;
};

// Custom icons for different incident types
const accidentIcon = new L.Icon({
  iconUrl: "/icons/accident.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const medicalIcon = new L.Icon({
  iconUrl: "/icons/medical.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const fireIcon = new L.Icon({
  iconUrl: "/icons/fire.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const policeIcon = new L.Icon({
  iconUrl: "/icons/police.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const hazardIcon = new L.Icon({
  iconUrl: "/icons/hazard.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

// Icons for emergency zones
const hospitalIcon = new L.Icon({
  iconUrl: "/icons/hospital.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
})

const fireStationIcon = new L.Icon({
  iconUrl: "/icons/fire_station.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
})

const policeStationIcon = new L.Icon({
  iconUrl: "/icons/police_station.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
})

// Function to get appropriate icon based on incident type
const getIncidentIcon = (type: IncidentType) => {
  switch (type) {
    case "accident": return accidentIcon;
    case "medical": return medicalIcon;
    case "fire": return fireIcon;
    case "police": return policeIcon;
    case "hazard": return hazardIcon;
    default: return accidentIcon;
  }
}

// Function to get appropriate icon based on emergency zone type
const getEmergencyZoneIcon = (type: EmergencyZoneType) => {
  switch (type) {
    case "hospital": return hospitalIcon;
    case "fire_station": return fireStationIcon;
    case "police_station": return policeStationIcon;
    default: return hospitalIcon;
  }
}

// Emergency response zones in a city (example with Mumbai locations)
const emergencyZones: EmergencyZone[] = [
  {
    id: "hospital-1",
    lat: 12.9352,
    lng: 77.6145,
    type: "hospital",
    name: "St. John's Hospital",
    radius: 500,
    capacity: 400,
    occupied: 250,
    respondersAvailable: 4,
  },
  {
    id: "hospital-2",
    lat: 12.9738,
    lng: 77.6050,
    type: "hospital",
    name: "Bowring and Lady Curzon Hospital",
    radius: 450,
    capacity: 300,
    occupied: 180,
    respondersAvailable: 2,
  },
  {
    id: "fire-1",
    lat: 12.9492,
    lng: 77.6423,
    type: "fire_station",
    name: "Jeevan Bhima Nagar Fire Station",
    radius: 800,
    capacity: 10,
    occupied: 6,
    respondersAvailable: 4,
  },
  {
    id: "police-1",
    lat: 12.9712,
    lng: 77.6416,
    type: "police_station",
    name: "Indiranagar Police Station",
    radius: 600,
    capacity: 20,
    occupied: 12,
    respondersAvailable: 6,
  },
  {
    id: "police-2",
    lat: 12.9236,
    lng: 77.5830,
    type: "police_station",
    name: "Jayanagar Police Station",
    radius: 550,
    capacity: 18,
    occupied: 10,
    respondersAvailable: 5,
  },
  {
    id: "fire-2",
    lat: 12.9575,
    lng: 77.7018,
    type: "fire_station",
    name: "Whitefield Fire Station",
    radius: 750,
    capacity: 12,
    occupied: 8,
    respondersAvailable: 3,
  },
];


// Sample incidents in Mumbai
const sampleIncidents: Incident[] = [
  {
    id: "inc-1",
    lat: 12.9719,
    lng: 77.6412,
    type: "accident",
    severity: "major",
    description: "Multiple vehicle crash on MG Road",
    time: "10:35 AM",
    respondersDispatched: 3,
    estimatedArrival: "4 minutes",
  },
  {
    id: "inc-2",
    lat: 12.9381,
    lng: 77.6139,
    type: "medical",
    severity: "critical",
    description: "Medical emergency in Koramangala",
    time: "11:03 AM",
    respondersDispatched: 2,
    estimatedArrival: "5 minutes",
  },
  {
    id: "inc-3",
    lat: 12.9710,
    lng: 77.5951,
    type: "fire",
    severity: "major",
    description: "Fire in commercial building on Brigade Road",
    time: "09:48 AM",
    respondersDispatched: 4,
    estimatedArrival: "3 minutes",
  },
  {
    id: "inc-4",
    lat: 12.9600,
    lng: 77.6380,
    type: "police",
    severity: "minor",
    description: "Protest disrupting traffic near Domlur",
    time: "10:15 AM",
    respondersDispatched: 2,
    estimatedArrival: "7 minutes",
  },
  {
    id: "inc-5",
    lat: 12.9986,
    lng: 77.7000,
    type: "hazard",
    severity: "minor",
    description: "Oil spill reported in Whitefield",
    time: "08:50 AM",
    respondersDispatched: 1,
    estimatedArrival: "8 minutes",
  },
];

// Get the color for incident severity
const getSeverityColor = (severity: IncidentSeverity) => {
  switch (severity) {
    case "critical": return "#D50000"
    case "major": return "#FF6D00"
    case "minor": return "#FFD600"
    default: return "#9E9E9E"
  }
}

// Get the color for emergency zone type
const getZoneColor = (type: EmergencyZoneType) => {
  switch (type) {
    case "hospital": return "#3949AB"
    case "fire_station": return "#D32F2F"
    case "police_station": return "#1976D2"
    default: return "#9E9E9E"
  }
}

// Function to generate dynamic incidents (for simulation)
const generateDynamicIncidents = (
  baseIncidents: Incident[], 
  currentIncidents: Incident[] = []
): Incident[] => {
  // Update existing incidents (decrease responder time)
  const updatedIncidents = currentIncidents.map(incident => {
    // Parse the estimated arrival time
    const estimatedMinutes = parseInt(incident.estimatedArrival.split(" ")[0]);
    if (estimatedMinutes <= 1) {
      // Remove incidents where responders have arrived (25% chance)
      if (Math.random() < 0.25) {
        return null;
      }
      // Keep arrival time at "arriving"
      return {
        ...incident,
        estimatedArrival: "arriving"
      };
    }
    
    // Decrease estimated time
    return {
      ...incident,
      estimatedArrival: `${estimatedMinutes - 1} minutes`
    };
  }).filter(Boolean) as Incident[];
  
  // Chance to add a new incident (10% chance each update)
  if (Math.random() < 0.1 && updatedIncidents.length < 10) {
    // Select a random base incident to use as template
    const baseIncident = baseIncidents[Math.floor(Math.random() * baseIncidents.length)];
    
    // Create a new incident with randomized position around the base
    const newIncident: Incident = {
      id: `inc-${Date.now()}`,
      lat: baseIncident.lat + (Math.random() * 0.02 - 0.01),
      lng: baseIncident.lng + (Math.random() * 0.02 - 0.01),
      type: baseIncident.type,
      severity: ["critical", "major", "minor"][Math.floor(Math.random() * 3)] as IncidentSeverity,
      description: baseIncident.description,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      respondersDispatched: Math.floor(Math.random() * 4) + 1,
      estimatedArrival: `${Math.floor(Math.random() * 10) + 1} minutes`,
    };
    
    updatedIncidents.push(newIncident);
  }
  
  return updatedIncidents;
};

// Auto-center map on the user's current location
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

export function AccidentMap() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [zones] = useState<EmergencyZone[]>(emergencyZones);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [mapMode, setMapMode] = useState<"standard" | "satellite">("standard");
  const [showZones, setShowZones] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeFilters, setActiveFilters] = useState<{
    accident: boolean;
    medical: boolean;
    fire: boolean;
    police: boolean;
    hazard: boolean;
  }>({
    accident: true,
    medical: true,
    fire: true,
    police: true,
    hazard: true,
  });

  // Initialize incidents and current time
  useEffect(() => {
    setIncidents(sampleIncidents);

    // Update current time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Update incidents at regular intervals
  useEffect(() => {
    if (!autoRefresh) return;

    const updateInterval = setInterval(() => {
      setIncidents((prev) => generateDynamicIncidents(sampleIncidents, prev));
    }, 3000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [autoRefresh]);

  // Filter incidents based on active filters
  const filteredIncidents = incidents.filter(
    (incident) => activeFilters[incident.type as keyof typeof activeFilters]
  );

  // Toggle a filter
  const toggleFilter = (filter: keyof typeof activeFilters) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  // Get counts by incident type
  const incidentCounts = {
    accident: incidents.filter(i => i.type === "accident").length,
    medical: incidents.filter(i => i.type === "medical").length,
    fire: incidents.filter(i => i.type === "fire").length,
    police: incidents.filter(i => i.type === "police").length,
    hazard: incidents.filter(i => i.type === "hazard").length,
  };

  // Get counts by severity
  const severityCounts = {
    critical: incidents.filter(i => i.severity === "critical").length,
    major: incidents.filter(i => i.severity === "major").length,
    minor: incidents.filter(i => i.severity === "minor").length,
  };

  // Get responder icon by type
  const getResponderIcon = (type: IncidentType) => {
    switch (type) {
      case "accident": return <Ambulance className="h-3 w-3" />;
      case "medical": return <Ambulance className="h-3 w-3" />;
      case "fire": return <Siren className="h-3 w-3" />;
      case "police": return <Car className="h-3 w-3" />;
      case "hazard": return <AlertTriangle className="h-3 w-3" />;
      default: return <Ambulance className="h-3 w-3" />;
    }
  };

  return (
    <Card className="relative overflow-hidden border-gray-200 shadow-lg">
      <CardHeader className="pb-1 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              Bengaluru Emergency Incident Map
              <Badge variant="outline" className="bg-red-100 text-red-800 animate-pulse">LIVE</Badge>
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
              variant={showZones ? "default" : "outline"} 
              className="cursor-pointer" 
              onClick={() => setShowZones(!showZones)}
            >
              <Building className="h-3 w-3 mr-1" />
              Zones
            </Badge>
          </div>
        </div>
        
        {/* Incident Status Summary */}
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
          <div 
            className={`flex items-center px-2 py-1 rounded cursor-pointer ${activeFilters.accident ? "bg-gray-200" : "opacity-50"}`}
            onClick={() => toggleFilter("accident")}
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
            <span className="font-medium">Accidents: {incidentCounts.accident}</span>
          </div>
          <div 
            className={`flex items-center px-2 py-1 rounded cursor-pointer ${activeFilters.medical ? "bg-gray-200" : "opacity-50"}`}
            onClick={() => toggleFilter("medical")}
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
            <span className="font-medium">Medical: {incidentCounts.medical}</span>
          </div>
          <div 
            className={`flex items-center px-2 py-1 rounded cursor-pointer ${activeFilters.fire ? "bg-gray-200" : "opacity-50"}`}
            onClick={() => toggleFilter("fire")}
          >
            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
            <span className="font-medium">Fire: {incidentCounts.fire}</span>
          </div>
          <div 
            className={`flex items-center px-2 py-1 rounded cursor-pointer ${activeFilters.police ? "bg-gray-200" : "opacity-50"}`}
            onClick={() => toggleFilter("police")}
          >
            <div className="w-2 h-2 rounded-full bg-blue-800 mr-1"></div>
            <span className="font-medium">Police: {incidentCounts.police}</span>
          </div>
          <div 
            className={`flex items-center px-2 py-1 rounded cursor-pointer ${activeFilters.hazard ? "bg-gray-200" : "opacity-50"}`}
            onClick={() => toggleFilter("hazard")}
          >
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
            <span className="font-medium">Hazards: {incidentCounts.hazard}</span>
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
        <div className="font-semibold mb-1">Incident Severity</div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{backgroundColor: getSeverityColor("critical")}}></span>
          <span>Critical ({severityCounts.critical})</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{backgroundColor: getSeverityColor("major")}}></span>
          <span>Major ({severityCounts.major})</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{backgroundColor: getSeverityColor("minor")}}></span>
          <span>Minor ({severityCounts.minor})</span>
        </div>
        
        {showZones && (
          <>
            <div className="font-semibold mt-2 mb-1">Emergency Zones</div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{backgroundColor: getZoneColor("hospital")}}></span>
              <span>Hospitals</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{backgroundColor: getZoneColor("fire_station")}}></span>
              <span>Fire Stations</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{backgroundColor: getZoneColor("police_station")}}></span>
              <span>Police Stations</span>
            </div>
          </>
        )}
      </div>

      <CardContent className="p-0">
        <div className="h-[400px] w-full">
          <MapContainer
            center={[12.9716, 77.5946]} // Bengaluru coordinates
 // Mumbai coordinates
            zoom={12}
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

            {/* Emergency Zones */}
            {showZones && zones.map((zone) => (
              <Circle
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={zone.radius}
                pathOptions={{
                  fillColor: getZoneColor(zone.type),
                  color: getZoneColor(zone.type),
                  fillOpacity: 0.15,
                  weight: 1,
                }}
              >
                <Tooltip direction="top">
                  <div className="text-xs">
                    <strong>{zone.name}</strong><br />
                    Type: {zone.type.replace("_", " ").toUpperCase()}<br />
                    Responders Available: {zone.respondersAvailable}<br />
                    {zone.type === "hospital" && `Capacity: ${zone.occupied}/${zone.capacity}`}
                  </div>
                </Tooltip>
              </Circle>
            ))}
            
            {/* Emergency Zone Markers */}
            {showZones && zones.map((zone) => (
              <Marker
                key={`marker-${zone.id}`}
                position={[zone.lat, zone.lng]}
                icon={getEmergencyZoneIcon(zone.type)}
              >
                <Popup>
                  <div className="text-xs">
                    <div className="font-bold text-blue-600">{zone.name}</div>
                    <div className="mt-1">Type: {zone.type.replace("_", " ").toUpperCase()}</div>
                    <div>Response Area: {(zone.radius / 1000).toFixed(1)} km</div>
                    <div>Responders Available: {zone.respondersAvailable}</div>
                    {zone.type === "hospital" && (
                      <div>
                        <div>Capacity: {zone.occupied}/{zone.capacity}</div>
                        <div className="mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full" 
                              style={{width: `${(zone.occupied / zone.capacity) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Incidents */}
            {filteredIncidents.map((incident) => (
              <Marker
                key={incident.id}
                position={[incident.lat, incident.lng]}
                icon={getIncidentIcon(incident.type)}
              >
                <Popup>
                  <div className="text-xs">
                    <div className="font-bold flex items-center gap-1" style={{color: getSeverityColor(incident.severity)}}>
                      <AlertTriangle className="h-3 w-3" />
                      {incident.type.toUpperCase()} - {incident.severity.toUpperCase()}
                    </div>
                    <div className="mt-1">{incident.description}</div>
                    <div className="text-gray-500 mt-1">Reported at {incident.time}</div>
                    <div className="mt-2 bg-gray-100 p-1 rounded">
                      <div className="flex items-center gap-1">
                        {getResponderIcon(incident.type)}
                        <span>Responders: {incident.respondersDispatched}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>ETA: {incident.estimatedArrival}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
                <Circle
                  center={[incident.lat, incident.lng]}
                  radius={50}
                  pathOptions={{
                    fillColor: getSeverityColor(incident.severity),
                    color: getSeverityColor(incident.severity),
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
          Active Incidents: {incidents.length} • Response Units: {zones.reduce((sum, zone) => sum + zone.respondersAvailable, 0)}
        </div>
        <div className="flex items-center">
          <Activity className="h-3 w-3 mr-1" />
          <span>Critical: {severityCounts.critical} • Major: {severityCounts.major} • Minor: {severityCounts.minor}</span>
        </div>
      </CardFooter>
    </Card>
  )
}