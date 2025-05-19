import { Activity, AlertTriangle, ArrowUpRight, Clock, Shield, TrafficCone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CityMap } from "@/components/city-map"
import { TrafficOverview } from "@/components/traffic-overview"
import { ViolationSummary } from "@/components/violation-summary"
import { EmergencyAlerts } from "@/components/emergency-alerts"
import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Real-time traffic management and safety insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Live Data</span>
          </Badge>
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Traffic Signals</CardTitle>
            <TrafficCone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">98%</span> operational
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Congestion Level</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Medium</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Violations Today</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-8%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">+2</span> active emergencies
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>City Traffic Map</CardTitle>
            <CardDescription>Real-time traffic density and incidents</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <CityMap />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Emergency Alerts</CardTitle>
            <CardDescription>Recent incidents requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <EmergencyAlerts />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="traffic">Traffic Overview</TabsTrigger>
          <TabsTrigger value="violations">Violation Summary</TabsTrigger>
          <TabsTrigger value="signals">Signal Status</TabsTrigger>
        </TabsList>
        <TabsContent value="traffic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Density Trends</CardTitle>
              <CardDescription>24-hour traffic patterns across major intersections</CardDescription>
            </CardHeader>
            <CardContent>
              <TrafficOverview />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="violations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Violation Breakdown</CardTitle>
              <CardDescription>Types and frequency of traffic violations</CardDescription>
            </CardHeader>
            <CardContent>
              <ViolationSummary />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Signal Performance</CardTitle>
              <CardDescription>Traffic signal efficiency and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { id: 1, name: "Main St & 5th Ave", status: "Optimal", load: "Medium" },
                  { id: 2, name: "Broadway & 7th", status: "AI Optimized", load: "High" },
                  { id: 3, name: "Park Ave & 3rd", status: "Manual Override", load: "Low" },
                  { id: 4, name: "River Rd & Oak St", status: "Optimal", load: "Medium" },
                  { id: 5, name: "Highland & Market", status: "Needs Attention", load: "High" },
                  { id: 6, name: "Central & Union", status: "Optimal", load: "Low" },
                ].map((signal) => (
                  <Card key={signal.id} className="overflow-hidden">
                    <div
                      className={cn(
                        "h-1.5",
                        signal.load === "Low" && "bg-emerald-500",
                        signal.load === "Medium" && "bg-amber-500",
                        signal.load === "High" && "bg-red-500",
                      )}
                    />
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{signal.name}</p>
                          <p className="text-xs text-muted-foreground">Load: {signal.load}</p>
                        </div>
                        <Badge
                          variant={
                            signal.status === "Optimal"
                              ? "outline"
                              : signal.status === "AI Optimized"
                                ? "secondary"
                                : signal.status === "Manual Override"
                                  ? "default"
                                  : "destructive"
                          }
                        >
                          {signal.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                View All Signals
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
