"use client";

import {
  Leaf,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Calendar,
  TrendingUp,
  Car,
  BarChart3,
  Download,
  RefreshCw,
  CircleDollarSign,
  BarChart,
  LineChart as LineChartIcon,
  ChevronUp,
  Zap,
  Target,
  Award,
  MapPin,
  Timer,
  BatteryCharging,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Weekly EV traffic data
const weeklyData = [
  { day: "Mon", evCount: 180, trend: "+5%" },
  { day: "Tue", evCount: 220, trend: "+8%" },
  { day: "Wed", evCount: 280, trend: "+12%" },
  { day: "Thu", evCount: 350, trend: "+15%" },
  { day: "Fri", evCount: 380, trend: "+16%" },
  { day: "Sat", evCount: 410, trend: "+18%" },
  { day: "Sun", evCount: 250, trend: "+10%" },
];

// Monthly EV traffic data (for chart)
const monthlyData = [
  { date: "May 1", evCount: 850, co2Saved: 3.2 },
  { date: "May 5", evCount: 920, co2Saved: 3.5 },
  { date: "May 10", evCount: 980, co2Saved: 3.7 },
  { date: "May 15", evCount: 1050, co2Saved: 4.0 },
  { date: "May 20", evCount: 1234, co2Saved: 4.2 },
];

// EV models data
const evModelData = [
  { model: "Tesla Model Y", count: 356, percentage: 28.8 },
  { model: "Tesla Model 3", count: 289, percentage: 23.4 },
  { model: "Ford Mustang Mach-E", count: 178, percentage: 14.4 },
  { model: "Hyundai IONIQ 5", count: 145, percentage: 11.7 },
  { model: "Kia EV6", count: 112, percentage: 9.1 },
  { model: "Other Models", count: 154, percentage: 12.6 },
];

// Charging station occupancy data
const chargingStationData = [
  { station: "Central Hub", total: 24, occupied: 18, available: 6 },
  { station: "Downtown Plaza", total: 16, occupied: 12, available: 4 },
  { station: "Westside Mall", total: 20, occupied: 8, available: 12 },
  { station: "North Station", total: 12, occupied: 10, available: 2 },
  { station: "East Park", total: 8, occupied: 3, available: 5 },
];

// Carbon goal progress data
const carbonGoalData = {
  current: 42,
  target: 100,
  lastWeek: 38,
  projected: "July 2026",
};

// Monthly comparison data
const monthlyComparisonData = [
  { month: "Jan", evCount: 720, lastYear: 320 },
  { month: "Feb", evCount: 780, lastYear: 350 },
  { month: "Mar", evCount: 840, lastYear: 380 },
  { month: "Apr", evCount: 920, lastYear: 420 },
  { month: "May", evCount: 1234, lastYear: 480 },
];

// Vehicle distribution data for pie chart
const vehicleDistribution = [
  { name: "EV", value: 35 },
  { name: "Fuel", value: 65 },
];

// Colors for the pie chart
const COLORS = ["#4ade80", "#e2e8f0"];

// Sustainability leaderboard data
const leaderboardData = [
  { intersection: "Central Station", evCount: 456, co2Saved: "1.2 tons", trend: "+12.3%" },
  { intersection: "Downtown Cross", evCount: 389, co2Saved: "0.9 tons", trend: "+8.7%" },
  { intersection: "West Bridge", evCount: 298, co2Saved: "0.7 tons", trend: "+5.2%" },
];

export default function EVAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("week");
  const [exportFormat, setExportFormat] = useState("pdf");
  const [selectedStation, setSelectedStation] = useState("all");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">EV Analytics</h1>
          <p className="text-muted-foreground">
            Tracking EV vehicle counts and progress toward carbon zero goals
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Today's Data</span>
          </Badge>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">EV Vehicles Today</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+12.3% from yesterday</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carbon Saved (Today)</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">
              tons of CO<sub>2</sub>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Stations</CardTitle>
            <BatteryCharging className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">98% operational</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carbon Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carbonGoalData.current}%</div>
            <div className="mt-2">
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div 
                  className="h-2 rounded-full bg-green-500"
                  style={{ 
                    width: `${carbonGoalData.current}%` 
                  }}
                ></div>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              <span className="text-emerald-500">+4% from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>EV Adoption Trend</CardTitle>
            <CardDescription>Daily EV traffic counts this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-2">
              <Button variant="outline" size="sm" className={timeRange === "week" ? "bg-primary text-primary-foreground" : ""}>
                Weekly
              </Button>
              <Button variant="outline" size="sm" className={timeRange === "month" ? "bg-primary text-primary-foreground" : ""}>
                Monthly
              </Button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="evCount" 
                    name="EV Count"
                    stroke="#4ade80" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Distribution</CardTitle>
            <CardDescription>EV vs conventional vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-80">
              <div className="relative">
                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <Pie
                      data={vehicleDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="none"
                    >
                      {vehicleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold">35%</div>
                  <div className="text-sm text-muted-foreground">EV Adoption</div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-8">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-400"></div>
                <span>EV (35%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-slate-200"></div>
                <span>Fuel (65%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sustainability Leaderboard</CardTitle>
            <CardDescription>Top intersections by EV traffic</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left font-medium">Intersection</th>
                  <th className="h-12 px-4 text-left font-medium">EV Count</th>
                  <th className="h-12 px-4 text-left font-medium">CO<sub>2</sub> Saved</th>
                  <th className="h-12 px-4 text-left font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 font-medium">{item.intersection}</td>
                    <td className="p-4">{item.evCount}</td>
                    <td className="p-4">{item.co2Saved}</td>
                    <td className="p-4 text-emerald-500">{item.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Carbon Impact Report</CardTitle>
          <CardDescription>CO2 emissions reduction from EV adoption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#4ade80" />
                <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="evCount" 
                  name="EV Count"
                  stroke="#4ade80" 
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="co2Saved" 
                  name="CO2 Saved (tons)"
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Download detailed sustainability metrics</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <span>PDF</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <span>Excel</span>
              </Button>
              <Button variant="default" size="sm" className="flex items-center gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>EV Model Distribution</CardTitle>
            <CardDescription>Most common EV models detected today</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80 pr-4">
              <div className="space-y-4">
                {evModelData.map((model, index) => (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{model.model}</p>
                          <p className="text-sm text-muted-foreground">
                            {model.count} vehicles detected
                          </p>
                        </div>
                        <Badge variant="outline" className="px-2 py-1">
                          {model.percentage}%
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div 
                            className="h-2 rounded-full bg-green-500"
                            style={{ 
                              width: `${model.percentage}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Charging Station Status</CardTitle>
            <CardDescription>Live occupancy rates at major charging stations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select value={selectedStation} onValueChange={setSelectedStation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stations</SelectItem>
                  {chargingStationData.map((station, index) => (
                    <SelectItem key={index} value={station.station}>{station.station}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ScrollArea className="h-72 pr-4">
              <div className="space-y-4">
                {chargingStationData.map((station, index) => (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{station.station}</p>
                          <p className="text-sm text-muted-foreground">
                            {station.available} of {station.total} spots available
                          </p>
                        </div>
                        <Badge variant={station.available > 0 ? "outline" : "destructive"} className="px-2 py-1">
                          {station.available > 0 ? "Available" : "Full"}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div 
                            className={`h-2 rounded-full ${station.available > 0 ? "bg-green-500" : "bg-red-500"}`}
                            style={{ 
                              width: `${(station.occupied / station.total) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>Occupancy</span>
                        <span>{Math.round((station.occupied / station.total) * 100)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}