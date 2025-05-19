import { ArrowUpRight, Clock, Download, Filter, RotateCw, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SignalControlMap } from "@/components/signal-control-map"
import { SignalPerformance } from "@/components/signal-performance"
import { SignalOptimization } from "@/components/signal-optimization"

export default function SignalControlPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Smart Signal Control</h1>
          <p className="text-muted-foreground">AI-optimized traffic signal management system</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2">
            <Switch id="auto-mode" defaultChecked />
            <Label htmlFor="auto-mode">AI Auto-Optimization</Label>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export Data</span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <Settings className="h-3.5 w-3.5" />
            <span>Configure</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">98%</span> operational
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI-Optimized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">87%</span> of total signals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Wait Time Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Energy Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Signal Network</CardTitle>
                <CardDescription>Real-time status of traffic signals across the city</CardDescription>
              </div>
              <div className="flex items-center gap-2">
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
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SignalControlMap />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Signal Status</CardTitle>
            <CardDescription>Current operational status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm">Optimal</span>
              </div>
              <span className="font-medium">98</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-sm">AI Optimizing</span>
              </div>
              <span className="font-medium">26</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-sm">Manual Override</span>
              </div>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm">Needs Attention</span>
              </div>
              <span className="font-medium">6</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-400" />
                <span className="text-sm">Offline</span>
              </div>
              <span className="font-medium">3</span>
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full">
                View Detailed Status
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="performance">Signal Performance</TabsTrigger>
          <TabsTrigger value="optimization">Optimization History</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Signal Performance Metrics</CardTitle>
                  <CardDescription>Efficiency and throughput analysis</CardDescription>
                </div>
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
              </div>
            </CardHeader>
            <CardContent>
              <SignalPerformance />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="optimization" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>AI Optimization History</CardTitle>
                  <CardDescription>Recent signal timing adjustments</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <RotateCw className="h-3.5 w-3.5" />
                  <span>Refresh</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SignalOptimization />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            title: "Main St & 5th Ave",
            status: "Optimal",
            lastOptimized: "10 minutes ago",
            waitTime: "-42%",
            throughput: "+38%",
          },
          {
            title: "Broadway & 7th",
            status: "AI Optimizing",
            lastOptimized: "In progress",
            waitTime: "-28%",
            throughput: "+24%",
          },
          {
            title: "Highland & Market",
            status: "Needs Attention",
            lastOptimized: "2 hours ago",
            waitTime: "+15%",
            throughput: "-8%",
          },
        ].map((intersection, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{intersection.title}</CardTitle>
                <Badge
                  variant={
                    intersection.status === "Optimal"
                      ? "outline"
                      : intersection.status === "AI Optimizing"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {intersection.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Last optimized: {intersection.lastOptimized}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Wait Time</p>
                  <p
                    className={`text-xl font-bold ${
                      intersection.waitTime.startsWith("-") ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {intersection.waitTime}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Throughput</p>
                  <p
                    className={`text-xl font-bold ${
                      intersection.throughput.startsWith("+") ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {intersection.throughput}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
