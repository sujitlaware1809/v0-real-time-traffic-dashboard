import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Shield,
  TrafficCone,
  Truck,
  BarChart3,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CityMap } from "@/components/city-map"
import { TrafficOverview } from "@/components/traffic-overview"
import { ViolationSummary } from "@/components/violation-summary"
import { EmergencyAlerts } from "@/components/emergency-alerts"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Real-time traffic management and safety insights
          </p>
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

        <TabsContent value="traffic" className="mt-0">
  <Card className="overflow-hidden">
    <CardHeader className="pb-0 space-y-0">
      <CardTitle className="text-base">Traffic Density Trends</CardTitle>
      <CardDescription className="text-sm">24-hour traffic patterns across major intersections</CardDescription>
    </CardHeader>
    <CardContent className="pt-0">
      <TrafficOverview />
      <LineChart />
    </CardContent>
  </Card>
</TabsContent>

        <TabsContent value="violations" className="mt-4">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="mb-0 text-base">Violation Breakdown</CardTitle>
              <CardDescription className="mb-1 text-sm">Types and frequency of traffic violations</CardDescription>
            </CardHeader>
            <CardContent className="pt-1 space-y-6">
              <ViolationSummary />
              <BarChart />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Helmet Violations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Red Light Jumps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">16</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Overspeeding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">48</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </CardContent>
                </Card>
              </div>
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
                {[...Array(6)].map((_, i) => {
                  const signals = ["Optimal", "AI Optimized", "Manual Override", "Needs Attention"]
                  const loads = ["Low", "Medium", "High"]
                  const statuses = signals[i % signals.length]
                  const load = loads[i % loads.length]

                  return (
                    <Card key={i} className="overflow-hidden">
                      <div
                        className={cn(
                          "h-1.5",
                          load === "Low" && "bg-emerald-500",
                          load === "Medium" && "bg-amber-500",
                          load === "High" && "bg-red-500"
                        )}
                      />
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Signal #{i + 1}</p>
                            <p className="text-xs text-muted-foreground">Load: {load}</p>
                          </div>
                          <Badge
                            variant={
                              statuses === "Optimal"
                                ? "outline"
                                : statuses === "AI Optimized"
                                ? "secondary"
                                : statuses === "Manual Override"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {statuses}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
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
