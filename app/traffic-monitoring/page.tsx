import { Download, Filter, MapPin, MoreHorizontal, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrafficCameraFeed } from "@/components/traffic-camera-feed"
import { TrafficHeatmap } from "@/components/traffic-heatmap"
import { TrafficTrends } from "@/components/traffic-trends"

export default function TrafficMonitoringPage() {
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
                  <TrafficCameraFeed id={camera.id} status={camera.status} />
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Downtown</span>
                </div>
                <Badge variant="destructive">Heavy</Badge>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[85%] rounded-full bg-red-500" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">North District</span>
                </div>
                <Badge>Medium</Badge>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[60%] rounded-full bg-amber-500" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">East District</span>
                </div>
                <Badge variant="outline">Light</Badge>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[30%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">South District</span>
                </div>
                <Badge>Medium</Badge>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[55%] rounded-full bg-amber-500" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">West District</span>
                </div>
                <Badge variant="destructive">Heavy</Badge>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[75%] rounded-full bg-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="heatmap">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="heatmap">Traffic Heatmap</TabsTrigger>
          <TabsTrigger value="trends">Traffic Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="heatmap" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>City Traffic Heatmap</CardTitle>
                  <CardDescription>Real-time traffic density visualization</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="now">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Current</SelectItem>
                      <SelectItem value="1h">Last Hour</SelectItem>
                      <SelectItem value="3h">Last 3 Hours</SelectItem>
                      <SelectItem value="6h">Last 6 Hours</SelectItem>
                      <SelectItem value="12h">Last 12 Hours</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TrafficHeatmap />
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
  )
}
