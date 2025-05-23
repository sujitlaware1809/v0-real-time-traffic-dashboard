"use client";
import dynamic from 'next/dynamic';
import type { FC, ComponentType } from "react";
import { Car, Download, Filter, Plus, RefreshCw, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VehicleMap = dynamic(
  () => import("@/components/vehicle-map").then((mod) => mod.VehicleMap),
  { 
    ssr: false,
    loading: () => <div className="h-[400px] w-full flex items-center justify-center">Loading vehicle map...</div>
  }
);

const VehicleList = dynamic(
  () => import("@/components/vehicle-list").then((mod) => mod.VehicleList),
  { 
    ssr: false,
    loading: () => <div className="h-[400px] w-full flex items-center justify-center">Loading vehicle list...</div>
  }
);

const VehicleStats = dynamic(
  () => import("@/components/vehicle-stats").then((mod) => mod.VehicleStats),
  { 
    ssr: false,
    loading: () => <div className="h-[400px] w-full flex items-center justify-center">Loading vehicle stats...</div>
  }
);

const VehiclePage: FC = () => {
  // Your page implementation here
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page content */}
    </div>
  );
};

export default function VehicleManagementPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Management</h1>
          <p className="text-muted-foreground">Track and manage vehicles in the traffic network</p>
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
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span>Add Vehicle</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,853</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+3.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,486</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+5.8%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Flagged Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">+12%</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recognition Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+0.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Vehicle Database</CardTitle>
                <CardDescription>Search and manage registered vehicles</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by plate, model..."
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
            <VehicleList />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Types</CardTitle>
            <CardDescription>Distribution by vehicle category</CardDescription>
          </CardHeader>
          <CardContent>
            <VehicleStats />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Vehicle Map</TabsTrigger>
          <TabsTrigger value="analytics">Vehicle Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Live Vehicle Tracking</CardTitle>
                  <CardDescription>Real-time location of tracked vehicles</CardDescription>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="car">Cars</SelectItem>
                    <SelectItem value="truck">Trucks</SelectItem>
                    <SelectItem value="bus">Buses</SelectItem>
                    <SelectItem value="emergency">Emergency Vehicles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <VehicleMap />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Vehicle Analytics</CardTitle>
                  <CardDescription>Traffic patterns by vehicle type</CardDescription>
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
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Cars</span>
                  </div>
                  <span className="font-medium">68%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[68%] rounded-full bg-blue-500" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Trucks</span>
                  </div>
                  <span className="font-medium">14%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[14%] rounded-full bg-amber-500" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Buses</span>
                  </div>
                  <span className="font-medium">8%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[8%] rounded-full bg-green-500" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Motorcycles</span>
                  </div>
                  <span className="font-medium">7%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[7%] rounded-full bg-purple-500" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Emergency Vehicles</span>
                  </div>
                  <span className="font-medium">3%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[3%] rounded-full bg-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
