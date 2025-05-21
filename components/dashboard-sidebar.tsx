"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Camera,
  Car,
  ChevronRight,
  Home,
  LogOut,
  Settings,
  Shield,
  TrafficCone,
  TrendingUp, // Added this import
  Leaf, // Added Leaf import
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "Traffic Monitoring",
      href: "/traffic-monitoring",
      icon: Camera,
    },
    {
      title: "Violation Detection",
      href: "/violation-detection",
      icon: Shield,
    },
    {
      title: "Smart Signal Control",
      href: "/signal-control",
      icon: TrafficCone,
    },
    {
      title: "Accident Detection",
      href: "/accident-detection",
      icon: AlertTriangle,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Vehicle Management",
      href: "/vehicle-management",
      icon: Car,
    },
    {
      title: "Traffic Forecast",
      href: "/traffic-forecast",
      icon: TrendingUp, // Changed from Car to TrendingUp
    },
    {
      title: "EV Analytics",
      icon: Leaf,
      href: "/ev-analytics", // Changed from Car to Leaf
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-zinc-950 transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <Activity className="h-6 w-6 text-emerald-500" />
            <span>Zeex AI</span>
          </div>
        )}
        {collapsed && <Activity className="mx-auto h-6 w-6 text-emerald-500" />}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto text-white", collapsed && "rotate-180")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          {!collapsed && (
            <>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>ZA</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">Admin User</p>
                <p className="truncate text-xs text-zinc-400">admin@zeexai.com</p>
              </div>
            </>
          )}
          {collapsed && (
            <Avatar className="mx-auto">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>ZA</AvatarFallback>
            </Avatar>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="ml-auto text-zinc-400 hover:text-white">
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}