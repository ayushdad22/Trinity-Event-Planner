"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateEventFabProps {
  onClick: () => void
  className?: string
}

export function CreateEventFab({ onClick, className }: CreateEventFabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-[1001] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95",
        className
      )}
      aria-label="Create new event"
    >
      <Plus className="h-6 w-6" />
    </button>
  )
}
