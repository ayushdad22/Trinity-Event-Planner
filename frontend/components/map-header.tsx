"use client"

import { useState } from "react"
import { Search, List, Map, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/events-data"
import { cn } from "@/lib/utils"

interface MapHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  viewMode: "map" | "list"
  onViewModeChange: (mode: "map" | "list") => void
  totalEvents: number
}

export function MapHeader({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  totalEvents,
}: MapHeaderProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="absolute left-0 right-0 top-0 z-[1000]">
      <div className="bg-background/95 backdrop-blur-md">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-10 border-border bg-input pl-10 text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "h-10 w-10 border-border",
                showFilters && "bg-primary text-primary-foreground"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <div className="flex h-10 overflow-hidden rounded-lg border border-border bg-input">
              <button
                onClick={() => onViewModeChange("map")}
                className={cn(
                  "flex items-center justify-center px-3 transition-colors",
                  viewMode === "map"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Map className="h-4 w-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={cn(
                  "flex items-center justify-center px-3 transition-colors",
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={cn(
                      "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-card/50 px-4 py-2">
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{totalEvents}</span> events near you
          </span>
          <span className="text-xs text-muted-foreground">New York City</span>
        </div>
      </div>
    </div>
  )
}
