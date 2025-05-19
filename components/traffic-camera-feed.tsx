"use client"

import { cn } from "@/lib/utils"

interface TrafficCameraFeedProps {
  id: number
  status: string
}

export function TrafficCameraFeed({ id, status }: TrafficCameraFeedProps) {
  return (
    <div
      className={cn(
        "aspect-video w-full bg-muted flex items-center justify-center text-muted-foreground text-sm",
        status === "Offline" && "bg-muted/50 text-muted-foreground/50",
      )}
    >
      {status === "Online" ? `Camera Feed ${id}` : "Camera Offline"}
    </div>
  )
}
