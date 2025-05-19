import { BarChart3, Calendar, Download, Filter, PieChart, RefreshCw, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrafficAnalytics } from "@/components/traffic-analytics"
import { ViolationAnalytics } from "@/components/violation-analytics"
import { AccidentAnalytics } from "@/components/accident-analytics"
import { PredictiveAnalytics } from "@/components/predictive-analytics"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive traffic data analysis and insights</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Traffic Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+3.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Speed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 mph</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+5.8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Violations</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Accidents</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-8%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="violations">Violation Analysis</TabsTrigger>
          <TabsTrigger value="accidents">Accident Analysis</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="traffic" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Traffic Flow Analysis</CardTitle>
                  <CardDescription>Comprehensive traffic patterns and trends</CardDescription>
                </div>
                <div className="flex items-center gap-2">
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
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TrafficAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="violations" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Violation Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of traffic violations</CardDescription>
                </div>
                <div className="flex items-center gap-2">
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
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ViolationAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="accidents" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Accident Analysis</CardTitle>
                  <CardDescription>Incident patterns and contributing factors</CardDescription>
                </div>
                <div className="flex items-center gap-2">
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
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AccidentAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="predictive" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Predictive Analytics</CardTitle>
                  <CardDescription>AI-powered traffic forecasting and risk assessment</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="24h">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Forecast period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6h">Next 6 Hours</SelectItem>
                      <SelectItem value="12h">Next 12 Hours</SelectItem>
                      <SelectItem value="24h">Next 24 Hours</SelectItem>
                      <SelectItem value="7d">Next 7 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <PredictiveAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Traffic management system performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Traffic Flow Efficiency</p>
                  <span className="text-sm text-emerald-500">92%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[92%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Signal Optimization</p>
                  <span className="text-sm text-emerald-500">87%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[87%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Violation Detection</p>
                  <span className="text-sm text-emerald-500">96%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[96%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Incident Response</p>
                  <span className="text-sm text-amber-500">78%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[78%] rounded-full bg-amber-500" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Prediction Accuracy</p>
                  <span className="text-sm text-emerald-500">94%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[94%] rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Impact</CardTitle>
            <CardDescription>Measurable improvements from AI traffic management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Travel Time Reduction</p>
                <p className="text-2xl font-bold text-emerald-500">-24%</p>
                <p className="text-xs text-muted-foreground">Compared to previous year</p>
              </div>

              <div className="space-y-2 rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Congestion Decrease</p>
                <p className="text-2xl font-bold text-emerald-500">-32%</p>
                <p className="text-xs text-muted-foreground">Compared to previous year</p>
              </div>

              <div className="space-y-2 rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Accident Reduction</p>
                <p className="text-2xl font-bold text-emerald-500">-18%</p>
                <p className="text-xs text-muted-foreground">Compared to previous year</p>
              </div>

              <div className="space-y-2 rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Emissions Reduction</p>
                <p className="text-2xl font-bold text-emerald-500">-15%</p>
                <p className="text-xs text-muted-foreground">Compared to previous year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
