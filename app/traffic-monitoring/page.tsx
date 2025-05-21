"use client";

import { Download, Filter, MapPin, MoreHorizontal, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrafficTrends } from "@/components/traffic-trends";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the TrafficHeatmap component with no SSR
const TrafficHeatmap = dynamic(() => import("@/components/traffic-heatmap").then(mod => mod.TrafficHeatmap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center bg-muted">
      <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
      <span className="ml-2 text-gray-600">Loading heatmap...</span>
    </div>
  )
});

// Enhanced CCTV-style live camera feed component
const LiveCameraFeed = ({ id, status }: { id: number; status: string }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasSignal, setHasSignal] = useState(true);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      if (Math.random() < 0.05 && status === "Online") {
        setHasSignal(false);
        setTimeout(() => setHasSignal(true), 2000 + Math.random() * 3000);
      }
      
      if (Math.random() < 0.1 && status === "Online") {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 100 + Math.random() * 300);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  if (status !== "Online") {
    return (
      <div className="flex h-48 items-center justify-center bg-gray-800 text-gray-400">
        <div className="text-center">
          <p>Camera Offline</p>
          <p className="text-sm">Last connected: {Math.floor(Math.random() * 12) + 1} hours ago</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-48 w-full overflow-hidden bg-black">
      <div className={`relative h-full w-full ${glitchEffect ? 'animate-glitch' : ''}`}>
        <div className="absolute inset-0 bg-black opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:100%_2px]"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMDAiLz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGZpbGw9IiNmZmYiIHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        
        <div className="relative h-full w-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            className="h-full w-full object-cover opacity-90"
          >
            <source src={`/cctv-feed-${id % 5 + 1}.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
      
      <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-1.5 py-0.5 text-xs text-white font-mono">
        {currentTime.toLocaleTimeString()} | CAM {id.toString().padStart(2, '0')}
      </div>
      <div className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white animate-pulse">
        REC • LIVE
      </div>
      <div className="absolute right-2 top-2 rounded bg-black bg-opacity-70 px-1.5 py-0.5 text-xs text-white">
        {Math.floor(Math.random() * 24) + 1}FPS
      </div>
    </div>
  );
};

export default function TrafficMonitoringPage() {
  const [timePeriod, setTimePeriod] = useState("now");
  const [vehicleFilter, setVehicleFilter] = useState("all");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Traffic Monitoring</h1>
          <p className="text-muted-foreground">Real-time traffic surveillance and analysis</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
          <Button size="sm" className="h-8">
            <span>Live View</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Traffic Camera Network</CardTitle>
              <CardDescription>Live feeds from traffic cameras across the city</CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="downtown">Downtown</SelectItem>
                <SelectItem value="north">North District</SelectItem>
                <SelectItem value="east">East District</SelectItem>
                <SelectItem value="south">South District</SelectItem>
                <SelectItem value="west">West District</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: 1,
                  location: "Main St & 5th Ave",
                  status: "Online",
                  traffic: "Heavy",
                  lastUpdated: "Live",
                },
                {
                  id: 2,
                  location: "Broadway & 7th",
                  status: "Online",
                  traffic: "Medium",
                  lastUpdated: "Live",
                },
                {
                  id: 3,
                  location: "Park Ave & 3rd",
                  status: "Online",
                  traffic: "Light",
                  lastUpdated: "Live",
                },
                {
                  id: 4,
                  location: "River Rd & Oak St",
                  status: "Offline",
                  traffic: "Unknown",
                  lastUpdated: "2h ago",
                },
                {
                  id: 5,
                  location: "Highland & Market",
                  status: "Online",
                  traffic: "Heavy",
                  lastUpdated: "Live",
                },
                {
                  id: 6,
                  location: "Central & Union",
                  status: "Online",
                  traffic: "Medium",
                  lastUpdated: "Live",
                },
              ].map((camera) => (
                <Card key={camera.id} className="overflow-hidden">
                  <LiveCameraFeed id={camera.id} status={camera.status} />
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{camera.location}</h4>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant={camera.status === "Online" ? "outline" : "secondary"} className="text-xs">
                            {camera.status}
                          </Badge>
                          <Badge
                            variant={
                              camera.traffic === "Heavy"
                                ? "destructive"
                                : camera.traffic === "Medium"
                                  ? "default"
                                  : camera.traffic === "Light"
                                    ? "outline"
                                    : "secondary"
                            }
                            className="text-xs"
                          >
                            {camera.traffic}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{camera.lastUpdated}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              View All Cameras
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Density</CardTitle>
            <CardDescription>Current traffic conditions by area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {[
              { area: "Downtown", value: 85, level: "Heavy", color: "red" },
              { area: "North District", value: 60, level: "Medium", color: "amber" },
              { area: "East District", value: 30, level: "Light", color: "emerald" },
              { area: "South District", value: 55, level: "Medium", color: "amber" },
              { area: "West District", value: 75, level: "Heavy", color: "red" },
            ].map((item) => (
              <div key={item.area} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{item.area}</span>
                  </div>
                  <Badge variant={item.level === "Heavy" ? "destructive" : item.level === "Medium" ? "default" : "outline"}>
                    {item.level}
                  </Badge>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div 
                    className={`h-2 rounded-full bg-${item.color}-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Live Traffic Heatmap</TabsTrigger>
          <TabsTrigger value="trends">Traffic Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Traffic Heatmap</CardTitle>
                  <CardDescription>Real-time traffic density visualization</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select 
                    defaultValue="all"
                    value={vehicleFilter}
                    onValueChange={(value) => setVehicleFilter(value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="car">Cars Only</SelectItem>
                      <SelectItem value="truck">Trucks Only</SelectItem>
                      <SelectItem value="bus">Buses Only</SelectItem>
                      <SelectItem value="emergency">Emergency Vehicles</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TrafficHeatmap />
              
              {/* Heatmap Legend */}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-blue-400"></div>
                  <span className="text-sm">Low Traffic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-yellow-400"></div>
                  <span className="text-sm">Medium Traffic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-500"></div>
                  <span className="text-sm">High Traffic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-purple-500"></div>
                  <span className="text-sm">Congestion</span>
                </div>
              </div>
              
              {/* Traffic Incidents */}
              <div className="mt-6">
                <h3 className="font-medium">Recent Traffic Incidents</h3>
                <div className="mt-2 space-y-2">
                  <div className="rounded-md border border-red-200 bg-red-50 p-3">
                    <div className="flex items-start">
                      <div className="mr-2 rounded-full bg-red-500 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M12 9v4"></path>
                          <path d="M12 17h.01"></path>
                          <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Traffic Accident at Main St. & 5th Ave</h4>
                        <p className="text-xs text-gray-500">Reported 15 minutes ago - 2 vehicles involved</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                    <div className="flex items-start">
                      <div className="mr-2 rounded-full bg-amber-500 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M12 9v4"></path>
                          <path d="M12 17h.01"></path>
                          <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0 Z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Road Work on Broadway & 7th</h4>
                        <p className="text-xs text-gray-500">Ongoing until 5:00 PM - Lane closure in effect</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Traffic Trends Analysis</CardTitle>
                  <CardDescription>Historical traffic patterns and predictions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="7d">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TrafficTrends />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}