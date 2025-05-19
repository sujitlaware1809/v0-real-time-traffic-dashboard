"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Simple chart components without function children
export const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("grid w-full gap-4", className)} ref={ref} {...props} />
  },
)
Chart.displayName = "Chart"

export const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("relative", className)} ref={ref} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: { name: string; color: string }[]
}

export const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ className, categories, ...props }, ref) => {
    return (
      <div className={cn("flex items-center space-x-2", className)} ref={ref} {...props}>
        {categories.map((category) => (
          <div key={category.name} className="flex items-center">
            <span className="mr-2 block h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
            <span className="text-sm font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    )
  },
)
ChartLegend.displayName = "ChartLegend"

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean
}

export const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ className, show, ...props }, ref) => {
    return (
      <div
        className={cn(
          "pointer-events-none absolute z-50 transition-opacity duration-100",
          show ? "opacity-100" : "opacity-0",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  categories?: { name: string; color: string }[]
}

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ className, value, categories, ...props }, ref) => {
    return (
      <div
        className={cn("rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none", className)}
        ref={ref}
        {...props}
      >
        {value && <div className="mb-1.5 text-sm font-semibold leading-none">{value}</div>}
        {categories?.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
              <span className="text-sm text-muted-foreground">{category.name}:</span>
            </div>
          </div>
        ))}
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"
