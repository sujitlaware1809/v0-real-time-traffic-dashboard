"use client";
import { AlertCircle, Calendar, Download, Filter, Search, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ViolationList } from "@/components/violation-list"
import ViolationMap from "@/components/violation-map"
import { ViolationTrends } from "@/components/violation-trends"
import { ViolationTypes } from "@/components/violation-types"
import { useState } from "react"

export default function ViolationDetectionPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Violation Detection</h1>
          <p className="text-muted-foreground">AI-powered traffic violation monitoring and enforcement</p>
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
          <Button size="sm" className="h-8">
            <span>Live Violations</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">+5%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Detection Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+1.2%</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Enforcement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+3.8%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Recent Violations</CardTitle>
                <CardDescription>Latest detected traffic violations</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search violations..."
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
            <ViolationList />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Violation Types</CardTitle>
            <CardDescription>Distribution by violation category</CardDescription>
          </CardHeader>
          <CardContent>
            <ViolationTypes />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Violation Map</TabsTrigger>
          <TabsTrigger value="trends">Violation Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="mt-4">
          <ViolationMap />
        </TabsContent>
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Violation Trends</CardTitle>
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
              <ViolationTrends />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <CardTitle className="text-base">Enforcement Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All AI-detected violations require human verification before enforcement actions. Review the{" "}
            <a href="#" className="text-primary underline">
              standard operating procedures
            </a>{" "}
            for handling different violation types and severity levels.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}