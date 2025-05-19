import { AlertTriangle, Calendar, Clock, Download, Filter, MapPin, RotateCw, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccidentMap } from "@/components/accident-map"
import { AccidentList } from "@/components/accident-list"
import { AccidentTrends } from "@/components/accident-trends"
import { EmergencyResponseTime } from "@/components/emergency-response-time"

export default function AccidentDetectionPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accident & Emergency Detection</h1>
          <p className="text-muted-foreground">Real-time incident monitoring and emergency response</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Filter by Date</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export Report</span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Live Incidents</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">+1</span> from 1 hour ago
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Incidents Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-8%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-18%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Detection Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+1.2%</span> from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Incident Map</CardTitle>
                <CardDescription>Real-time location of accidents and emergencies</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Incidents</SelectItem>
                    <SelectItem value="accident">Vehicle Accidents</SelectItem>
                    <SelectItem value="breakdown">Vehicle Breakdowns</SelectItem>
                    <SelectItem value="hazard">Road Hazards</SelectItem>
                    <SelectItem value="emergency">Medical Emergencies</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AccidentMap />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Emergencies</CardTitle>
              <Button variant="ghost" size="icon">
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Incidents requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                type: "Vehicle Accident",
                location: "Broadway & 7th Ave",
                time: "10 min ago",
                severity: "high",
                status: "Active",
              },
              {
                type: "Vehicle Breakdown",
                location: "Main St & 5th Ave",
                time: "25 min ago",
                severity: "medium",
                status: "Pending",
              },
              {
                type: "Road Hazard",
                location: "Highway 101 North",
                time: "45 min ago",
                severity: "medium",
                status: "Resolving",
              },
            ].map((emergency, index) => (
              <div key={index} className="rounded-lg border p-3">
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
                    <AlertTriangle className="h-4 w-4" />
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
              </div>
            ))}
            <Button variant="outline" className="mt-2 w-full">
              View All Incidents
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="incidents">Recent Incidents</TabsTrigger>
          <TabsTrigger value="trends">Incident Trends</TabsTrigger>
          <TabsTrigger value="response">Response Time</TabsTrigger>
        </TabsList>
        <TabsContent value="incidents" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Incident History</CardTitle>
                  <CardDescription>Comprehensive list of detected incidents</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search incidents..."
                      className="w-full rounded-md pl-8 md:w-[240px]"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AccidentList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Incident Trends Analysis</CardTitle>
                  <CardDescription>Historical patterns and predictions</CardDescription>
                </div>
                <Select defaultValue="30d">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <AccidentTrends />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="response" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Emergency Response Performance</CardTitle>
                  <CardDescription>Response time analysis by incident type and location</CardDescription>
                </div>
                <Select defaultValue="30d">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <EmergencyResponseTime />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
