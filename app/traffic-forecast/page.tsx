"use client";

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Calendar,
  TrendingUp,
  Car,
  BarChart3,
  Download,
  RefreshCw,
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Dummy data for the traffic forecast
const forecastData = [
  { hour: "6 AM", vehicleCount: 350, isPeak: false },
  { hour: "7 AM", vehicleCount: 620, isPeak: true },
  { hour: "8 AM", vehicleCount: 780, isPeak: true },
  { hour: "9 AM", vehicleCount: 560, isPeak: true },
  { hour: "10 AM", vehicleCount: 420, isPeak: false },
  { hour: "11 AM", vehicleCount: 380, isPeak: false },
  { hour: "12 PM", vehicleCount: 450, isPeak: false },
  { hour: "1 PM", vehicleCount: 480, isPeak: false },
  { hour: "2 PM", vehicleCount: 410, isPeak: false },
  { hour: "3 PM", vehicleCount: 490, isPeak: false },
  { hour: "4 PM", vehicleCount: 620, isPeak: true },
  { hour: "5 PM", vehicleCount: 750, isPeak: true },
  { hour: "6 PM", vehicleCount: 680, isPeak: true },
  { hour: "7 PM", vehicleCount: 450, isPeak: false },
  { hour: "8 PM", vehicleCount: 320, isPeak: false },
];

// Filter only peak hours for the summary list
const peakHours = forecastData.filter(hour => hour.isPeak);

export default function TrafficForecastPage() {
  const [timeRange, setTimeRange] = useState("today");
  const [exportFormat, setExportFormat] = useState("csv");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Traffic Forecast</h1>
          <p className="text-muted-foreground">
            Predictive analytics for traffic flow and congestion management
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Today's Forecast</span>
          </Badge>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
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
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expected Peak Hours</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{peakHours.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">+1</span> compared to yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Vehicle Count</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(forecastData.reduce((sum, hour) => sum + hour.vehicleCount, 0) / forecastData.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-5%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Max Congestion</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">780</div>
            <p className="text-xs text-muted-foreground">
              Expected at <span className="text-amber-500">8 AM</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Possible Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">High risk</span> during peak hours
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Forecast Chart</CardTitle>
            <CardDescription>Predicted vehicle count by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="vehicleCount" 
                    name="Vehicle Count"
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      return payload.isPeak ? (
                        <svg x={cx - 6} y={cy - 6} width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="6" fill="#ef4444" />
                        </svg>
                      ) : (
                        <svg
  width="8"
  height="8"
  viewBox="0 0 8 8"
  fill="none"
  style={{ position: 'absolute', left: cx - 4, top: cy - 4 }}
>
  <circle cx="4" cy="4" r="4" fill="#8884d8" />
</svg>


                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-red-500"></div>
                <span>Peak Hours</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-purple-500"></div>
                <span>Regular Hours</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Hour Summary</CardTitle>
            <CardDescription>Hours with highest predicted traffic volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80 pr-4">
              <div className="space-y-4">
                {peakHours.map((peak, index) => (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{peak.hour}</p>
                          <p className="text-sm text-muted-foreground">
                            {peak.vehicleCount} vehicles expected
                          </p>
                        </div>
                        <Badge variant="destructive" className="px-2 py-1">
                          Peak
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-gray-100">
                          <div 
                            className="h-2 rounded-full bg-red-500"
                            style={{ 
                              width: `${(peak.vehicleCount / 800) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>Congestion Level</span>
                        <span>{Math.round((peak.vehicleCount / 800) * 100)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            <Button variant="outline" className="mt-4 w-full">
              View Detailed Breakdown
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Forecast Comparison</CardTitle>
          <CardDescription>Compare current forecast with historical data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-end space-x-2 mb-2">
            <Badge variant="outline" className="px-2 py-1">Today</Badge>
            <Badge variant="secondary" className="px-2 py-1">Last Week</Badge>
            <Badge variant="outline" className="px-2 py-1">Last Month</Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" allowDuplicatedCategory={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  data={forecastData}
                  dataKey="vehicleCount"
                  name="Today's Forecast"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  data={forecastData.map(item => ({ 
                    hour: item.hour, 
                    vehicleCount: item.vehicleCount * (0.9 + Math.random() * 0.2) 
                  }))}
                  dataKey="vehicleCount"
                  name="Last Week"
                  stroke="#82ca9d"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}